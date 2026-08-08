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
    <section id="contact" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="section-label mb-4">Spec — 007 / Contact</p>
        <h2 className="mb-8 font-display text-3xl font-bold text-paper">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <label htmlFor="name" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">Name</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-paper outline-none focus:border-trace" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-paper outline-none focus:border-trace" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate">Message</label>
            <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} className="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-paper outline-none focus:border-trace" />
          </div>
          <button type="submit" disabled={status === 'sending'} className="rounded-sm bg-trace px-5 py-2.5 font-mono text-sm font-medium uppercase tracking-widest text-blueprint transition-opacity hover:opacity-90 disabled:opacity-50">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' && <p className="font-mono text-sm text-trace">Sent — thanks, I'll get back to you.</p>}
          {status === 'error' && <p className="font-mono text-sm text-copper">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
