'use client';

import { useState } from 'react';

type Props = {
  className?: string;
};

export default function ContactFormCard({ className = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>(
    'idle'
  );
  const [msg, setMsg] = useState('');
  const [demo, setDemo] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: if filled, silently succeed
    if (data.get('company')) {
      setStatus('ok');
      form.reset();
      setDemo(false);
      return;
    }

    const payload = {
      first_name: (data.get('first_name') || '').toString(),
      last_name: (data.get('last_name') || '').toString(),
      email: (data.get('email') || '').toString(),
      company_size: (data.get('company_size') || '').toString(),
      phone: (data.get('phone') || '').toString(),
      topic: (data.get('topic') || '').toString(),
      message: (data.get('message') || '').toString(),
      schedule_demo: demo,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('ok');
        setMsg('Thanks! We’ll get back to you shortly.');
        form.reset();
        setDemo(false);
      } else {
        const body = await res.json().catch(() => null);
        setStatus('err');
        setMsg(
          body?.error || 'Something went wrong. Please try again in a moment.'
        );
      }
    } catch (err) {
      console.error(err);
      setStatus('err');
      setMsg('Network error. Please try again.');
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* glow behind the card */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-8 md:-inset-x-8 md:-inset-y-10
                   rounded-[2rem] blur-2xl opacity-35
                   bg-[radial-gradient(closest-side,rgba(0,194,255,.35),transparent_60%)]
                   pointer-events-none"
      />

      {/* glass card */}
      <div
        className="
          mx-auto rounded-[1.75rem]
          border border-white/10 ring-1 ring-white/5
          bg-black/55 backdrop-blur-xl
          p-6 sm:p-8 md:p-10
          shadow-[0_18px_60px_rgba(0,0,0,.5),0_0_24px_rgba(0,194,255,.12)]
          animate-contact-float
        "
      >
        {/* small “lights” */}
        <div className="flex items-center gap-2 pb-5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#00C2FF]/70 shadow-[0_0_12px_rgba(0,194,255,.8)]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {/* honeypot */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* fields unchanged */}
          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_60ms_both]">
            <input id="first_name" name="first_name" placeholder=" " required />
            <label htmlFor="first_name">
              <span className="c4-label-text">First name</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_110ms_both]">
            <input id="last_name" name="last_name" placeholder=" " />
            <label htmlFor="last_name">
              <span className="c4-label-text">Last name</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_160ms_both]">
            <input id="email" name="email" type="email" placeholder=" " required />
            <label htmlFor="email">
              <span className="c4-label-text">Work email</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_210ms_both]">
            <input id="company_size" name="company_size" placeholder=" " />
            <label htmlFor="company_size">
              <span className="c4-label-text">Company size</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_260ms_both]">
            <input id="phone" name="phone" type="tel" placeholder=" " />
            <label htmlFor="phone">
              <span className="c4-label-text">Phone</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_310ms_both]">
            <input id="topic" name="topic" placeholder=" " />
            <label htmlFor="topic">
              <span className="c4-label-text">Topic</span>
            </label>
          </div>

          <div className="c4-float c4-float--textarea md:col-span-2 motion-safe:animate-[c4-rise-in_680ms_cubic-bezier(0.22,0.8,0.2,1)_360ms_both]">
            <textarea id="message" name="message" placeholder=" " />
            <label htmlFor="message">
              <span className="c4-label-text">Message</span>
            </label>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1 motion-safe:animate-[c4-rise-in_720ms_cubic-bezier(0.22,0.8,0.2,1)_420ms_both]">
            <label className="flex items-center gap-3 text-sm text-white/80 select-none">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={demo}
                onChange={(e) => setDemo(e.target.checked)}
              />
              <span
                aria-hidden
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/15 transition
                           before:content-[''] before:absolute before:left-0.5 before:h-5 before:w-5 before:rounded-full
                           before:bg-white/80 before:transition
                           peer-checked:bg-[#00C2FF]/40 peer-checked:before:translate-x-5"
              />
              <span>Schedule a demo call</span>
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-glow btn-glow--trio rounded-full px-7 py-3 text-sm font-medium"
            >
              {status === 'loading' ? 'Submitting…' : 'Submit'}
            </button>
          </div>

          {status !== 'idle' && (
            <div className="md:col-span-2 -mt-1 text-sm">
              <span
                className={
                  status === 'ok'
                    ? 'text-emerald-400'
                    : status === 'err'
                    ? 'text-red-400'
                    : 'text-white/70'
                }
              >
                {msg}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}