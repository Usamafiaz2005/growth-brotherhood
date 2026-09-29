import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'leads.json');
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL;

function readLeads() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return [];
}

function writeLeads(leads: unknown[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
  } catch {
    // ignore in serverless environments
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const lead = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      source: 'website',
    };

    // If Resend email delivery is configured, dispatch notification email
    if (RESEND_API_KEY && LEAD_NOTIFY_EMAIL) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'leads@growthbrotherhood.com',
            to: LEAD_NOTIFY_EMAIL,
            subject: `New Lead: ${(body as Record<string, string>).name || 'Unknown'}`,
            text: JSON.stringify(lead, null, 2),
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.warn('Resend email dispatch warning:', errText);
        }
      } catch (emailErr) {
        console.warn('Resend email dispatch error:', emailErr);
      }
    }

    // Also persist locally when filesystem is writable
    const leads = readLeads();
    leads.push(lead);
    writeLeads(leads);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}

export async function GET() {
  const leads = readLeads();
  return NextResponse.json({ leads, count: leads.length });
}
