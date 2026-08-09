'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const SESSION_KEY = 'contact-submit-count';
const MAX_SUBMISSIONS = 3;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    setSubmitCount(Number(sessionStorage.getItem(SESSION_KEY)) || 0);
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    window.onTurnstileVerified = (token) => setTurnstileToken(token);
    window.onTurnstileExpired = () => setTurnstileToken('');
    return () => {
      delete window.onTurnstileVerified;
      delete window.onTurnstileExpired;
    };
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetTurnstile() {
    setTurnstileToken('');
    if (window.turnstile) {
      window.turnstile.reset();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        resetTurnstile();
        return;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '', website: '' });
      resetTurnstile();
      const next = submitCount + 1;
      setSubmitCount(next);
      sessionStorage.setItem(SESSION_KEY, String(next));
    } catch {
      setStatus('error');
      setErrorMsg('Could not reach the server. Try again.');
    }
  }

  const limitReached = submitCount >= MAX_SUBMISSIONS;
  const verificationPending = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  return (
    <section id="contact" className="px-6 py-14">
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      )}
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">// contact</p>
        <h2 className="mb-8 text-xl font-semibold text-ink">Get in touch</h2>
        {limitReached ? (
          <p className="font-mono text-sm text-muted">
            You&apos;ve sent a few messages already — I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div>
              <label htmlFor="name" className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Name</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full rounded-md border border-muted bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-link focus-visible:ring-2 focus-visible:ring-link/40" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Email</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-md border border-muted bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-link focus-visible:ring-2 focus-visible:ring-link/40" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Message</label>
              <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} className="w-full rounded-md border border-muted bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-link focus-visible:ring-2 focus-visible:ring-link/40" />
            </div>
            {TURNSTILE_SITE_KEY && (
              <div
                className="cf-turnstile"
                data-sitekey={TURNSTILE_SITE_KEY}
                data-callback="onTurnstileVerified"
                data-expired-callback="onTurnstileExpired"
              />
            )}
            <button type="submit" disabled={status === 'sending' || verificationPending} className="rounded-md bg-link px-5 py-2.5 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && <p className="font-mono text-sm text-diffgreen">Sent — thanks, I'll get back to you.</p>}
            {status === 'error' && <p className="font-mono text-sm text-tagrobotics">{errorMsg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
