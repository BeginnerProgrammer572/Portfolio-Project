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
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Not configured yet — behave like the Resend fallback and let requests
    // through rather than breaking the form during setup.
    return true;
  }
  if (typeof token !== 'string' || !token) {
    return false;
  }

  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip && ip !== 'unknown') {
      params.set('remoteip', ip);
    }

    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const data = await verifyRes.json();
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification request failed:', err);
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 100, email: 254, message: 5000 };

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_LENGTH.email && EMAIL_RE.test(trimmed);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid JSON' }, { status: 400 });
  }

  const { name, email, message, website = '', turnstileToken } = body ?? {};

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    name.trim().length > MAX_LENGTH.name
  ) {
    return NextResponse.json({ ok: false, error: 'name is required' }, { status: 422 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'a valid email is required' },
      { status: 422 }
    );
  }
  if (
    typeof message !== 'string' ||
    message.trim().length === 0 ||
    message.trim().length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ ok: false, error: 'message is required' }, { status: 422 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: 'Verification failed. Please try again.' },
      { status: 422 }
    );
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
