'use client';

import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Could not reach the server. Try again.');
    }
  }

  return (
    <section id="contact" className="px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">// contact</p>
        <h2 className="mb-8 text-xl font-semibold text-ink">Get in touch</h2>
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
          <button type="submit" disabled={status === 'sending'} className="rounded-md bg-link px-5 py-2.5 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' && <p className="font-mono text-sm text-diffgreen">Sent — thanks, I'll get back to you.</p>}
          {status === 'error' && <p className="font-mono text-sm text-tagrobotics">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
