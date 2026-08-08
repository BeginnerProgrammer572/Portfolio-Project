import { NextResponse } from 'next/server';

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (rateLog.get(ip) || []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT) {
    rateLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLog.set(ip, timestamps);
  return false;
}

function getClientIp(request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid JSON' }, { status: 400 });
  }

  const { name, email, message, website = '' } = body ?? {};

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ ok: false, error: 'name is required' }, { status: 422 });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'a valid email is required' },
      { status: 422 }
    );
  }
  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ ok: false, error: 'message is required' }, { status: 422 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (resendKey && toEmail) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: toEmail,
          reply_to: email,
          subject: `New message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error('Resend send failed:', emailRes.status, errText);
        return NextResponse.json(
          { ok: false, error: 'Could not send your message right now. Please try again shortly.' },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error('Resend request error:', err);
      return NextResponse.json(
        { ok: false, error: 'Could not send your message right now. Please try again shortly.' },
        { status: 502 }
      );
    }
  } else {
    console.log('\n--- Contact Form Submission ---');
    console.log(`From: ${name} <${email}>`);
    console.log(`Message:\n${message}`);
    console.log('-------------------------------\n');
  }

  return NextResponse.json({ ok: true });
}
