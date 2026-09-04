import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'leads.json');

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
    // ignore
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      source: 'website',
    };

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
