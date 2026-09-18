import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = {
      ...body,
      createdAt: new Date().toISOString(),
      source: 'website',
    };

    if (!RESEND_API_KEY || !LEAD_NOTIFY_EMAIL) {
      console.error('Lead capture is not configured: missing RESEND_API_KEY or LEAD_NOTIFY_EMAIL');
      return NextResponse.json(
        { success: false, error: 'Lead capture not configured' },
        { status: 500 }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@yourdomain.com',
        to: LEAD_NOTIFY_EMAIL,
        subject: `New lead: ${lead.name || 'Unknown'}`,
        text: JSON.stringify(lead, null, 2),
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error('Lead email send failed:', errText);
      return NextResponse.json(
        { success: false, error: 'Failed to deliver lead notification' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}
