'use client';

import { useId, useState } from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

type Props = {
  className?: string;
};

const CONTACT_ITEMS = [
  {
    id: 'phone',
    label: 'Call us',
    value: '+995 511 22 33 66',
    href: 'tel:+995511223366',
    Icon: PhoneCall,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'info@technicalservice.ge',
    href: 'mailto:info@technicalservice.ge',
    Icon: Mail,
  },
  {
    id: 'office',
    label: 'Visit our office',
    value: 'Batumi, Georgia',
    href: 'https://maps.app.goo.gl/WTNAnMoYAZRASmRs7',
    Icon: MapPin,
  },
];

type SubmitStatus = 'idle' | 'loading' | 'ok' | 'err';

export default function ContactFormCard({ className = '' }: Props) {
  
  const uid = useId(); // ensures unique ids across page renders
  const id = (x: string) => `contact-${x}-${uid}`;

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [msg, setMsg] = useState('');
  const [demo, setDemo] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg('Submitting…');
    setStatus('loading');
    setMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // ✅ honeypot: if filled, silently succeed (anti-bot)
    if ((data.get('hp_field') || '').toString().trim()) {
      setStatus('ok');
      form.reset();
      setDemo(false);
      return;
    }

    const get = (name: string) => (data.get(name) || '').toString().trim();

    const firstName = get('first_name');
    const email = get('email');

    // ✅ same minimal validation style as homepage CTA
    if (!email || !firstName) {
      setStatus('err');
      setMsg('Please fill in your name and email.');
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: get('last_name'),
      email,
      phone: get('phone'),
      // ✅ match CTA behavior: always send a topic
      topic: 'Contact Page',
      // ✅ match CTA behavior: default message when empty
      message: get('message') || 'Lead submitted via contact page form.',
      // keep this key (CTA sends it too, just empty)
      company_size: get('company_size') || '',
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
        setMsg(body?.error || 'Something went wrong. Please try again in a moment.');
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
        aria-hidden="true"
        className="absolute -inset-x-6 -inset-y-8 md:-inset-x-8 md:-inset-y-10
                   rounded-4xl blur-2xl opacity-35
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
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent/70 shadow-[0_0_12px_rgba(0,194,255,.8)]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {/* honeypot: keep it off accessibility tree */}
          <input
            type="text"
            name="hp_field"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          />

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_60ms_both]">
            <input
              id={id('first_name')}
              name="first_name"
              placeholder=" "
              required
              autoComplete="given-name"
            />
            <label htmlFor={id('first_name')}>
              <span className="c4-label-text">First name</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_110ms_both]">
            <input
              id={id('last_name')}
              name="last_name"
              placeholder=" "
              autoComplete="family-name"
            />
            <label htmlFor={id('last_name')}>
              <span className="c4-label-text">Last name</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_160ms_both]">
            <input
              id={id('email')}
              name="email"
              type="email"
              placeholder=" "
              required
              autoComplete="email"
            />
            <label htmlFor={id('email')}>
              <span className="c4-label-text">Work email</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_210ms_both]">
            <input
              id={id('company_size')}
              name="company_size"
              placeholder=" "
              autoComplete="organization"
            />
            <label htmlFor={id('company_size')}>
              <span className="c4-label-text">Company size</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_260ms_both]">
            <input
              id={id('phone')}
              name="phone"
              type="tel"
              placeholder=" "
              autoComplete="tel"
              inputMode="tel"
            />
            <label htmlFor={id('phone')}>
              <span className="c4-label-text">Phone</span>
            </label>
          </div>

          <div className="c4-float motion-safe:animate-[c4-rise-in_640ms_cubic-bezier(0.22,0.8,0.2,1)_310ms_both]">
            <input
              id={id('topic')}
              name="topic"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor={id('topic')}>
              <span className="c4-label-text">Topic</span>
            </label>
          </div>

          <div className="c4-float c4-float--textarea md:col-span-2 motion-safe:animate-[c4-rise-in_680ms_cubic-bezier(0.22,0.8,0.2,1)_360ms_both]">
            <textarea
              id={id('message')}
              name="message"
              placeholder=" "
              autoComplete="off"
              rows={6}
            />
            <label htmlFor={id('message')}>
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
                aria-hidden="true"
                className="relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full bg-white/15 transition
                           before:content-[''] before:absolute before:left-0.5 before:h-5 before:w-5 before:rounded-full
                           before:bg-white/80 before:transition
                           peer-checked:bg-accent/40 peer-checked:before:translate-x-5"
              />
              <span>Schedule a demo call</span>
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-glow cursor-pointer btn-glow--trio rounded-full px-7 py-3 text-sm font-medium"
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

        {/* contact info rail */}
        <div className="mt-7 border-t border-white/5 pt-5 motion-safe:animate-[c4-rise-in_760ms_cubic-bezier(0.22,0.8,0.2,1)_480ms_both]">
          <div className="grid gap-3 sm:grid-cols-3">
            {CONTACT_ITEMS.map(({ id: k, label, value, href, Icon }) => (
              <a
                key={k}
                href={href}
                target={k === 'office' ? '_blank' : undefined}
                rel={k === 'office' ? 'noreferrer' : undefined}
                className="
                  group flex items-center gap-3 rounded-2xl px-3 py-3
                  bg-white/2 hover:bg-white/6
                  ring-1 ring-white/5 hover:ring-accent/40
                  transition
                  shadow-[0_0_0_rgba(0,0,0,0)]
                  hover:shadow-[0_0_24px_rgba(0,194,255,.35)]
                  cursor-pointer
                "
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 group-hover:bg-accent/30 transition">
                  <Icon className="h-4 w-4 text-accent/80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {label}
                  </span>
                  <span className="text-sm text-white/90 group-hover:text-white">
                    {value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}