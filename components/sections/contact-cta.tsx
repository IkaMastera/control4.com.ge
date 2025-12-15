'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/common/container';
import StarfallCanvas from '../ui/star-fall-canvas';

type SubmitStatus = 'idle' | 'loading' | 'ok' | 'err';

export default function ContactCTA() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [msg, setMsg] = useState('');
  const [scheduleDemo, setScheduleDemo] = useState(true);

  // ✅ ensures unique IDs even if component is rendered multiple times
  const uid = useId();

  const ids = {
    firstName: `${uid}-first-name`,
    lastName: `${uid}-last-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    message: `${uid}-message`,
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = (data.get('email') || '').toString().trim();
    const firstName = (data.get('firstName') || '').toString().trim();

    if (!email || !firstName) {
      setStatus('err');
      setMsg('Please fill in your name and email.');
      return;
    }

    const messageText =
      (data.get('message') || '').toString().trim() ||
      'Lead submitted via homepage contact card.';

    const payload = {
      first_name: firstName,
      last_name: (data.get('lastName') || '').toString().trim(),
      email,
      phone: (data.get('phone') || '').toString().trim(),
      topic: 'Homepage CTA',
      message: messageText,
      company_size: '',
      schedule_demo: scheduleDemo,
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
        setScheduleDemo(true);
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
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-[--color-bg] min-h-[120svh] md:min-h-[135svh] py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/contactBG.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-100"
        />
        <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-6%,transparent_42%,rgba(0,0,0,.28)_70%,rgba(0,0,0,.55)_100%)]" />
      </div>

      <StarfallCanvas mode="ambient" count={30} speed={4} maxSize={2.2} zIndex={1} />

      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-[--color-accent]">Contact</p>
          <h2
            id="contact-cta-heading"
            className="mt-3 text-4xl font-semibold text-[--color-ink] sm:text-5xl"
          >
            Power Your Home with Control4
          </h2>
          <p className="mt-4 text-base text-white/70">
            Access fast, reliable integration from certified Control4 experts in Georgia.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <CornerDot className="-top-5 -left-5" />
          <CornerDot className="-top-5 -right-5" />
          <CornerDot className="-bottom-5 -left-5" />
          <CornerDot className="-bottom-5 -right-5" />

          <div className="relative rounded-[26px] p-px">
            <div
              className="pointer-events-none absolute inset-0 rounded-[26px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,194,255,.35), rgba(0,86,184,.35))',
                WebkitMask:
                  'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl px-5 py-6 sm:p-8
                         bg-white/4.5 backdrop-blur-xl
                         ring-1 ring-white/10
                         shadow-[0_80px_220px_-80px_rgba(0,0,0,.95),0_0_60px_-20px_rgba(0,194,255,.20)]"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-t-[22px] bg-[radial-gradient(120%_50%_at_50%_0%,rgba(0,194,255,.16),transparent_70%)]" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div className="c4-float">
                  <input
                    id={ids.firstName}
                    name="firstName"
                    autoComplete="given-name"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label htmlFor={ids.firstName}>
                    <span className="c4-label-text">First Name</span>
                  </label>
                </div>

                {/* Last Name */}
                <div className="c4-float">
                  <input
                    id={ids.lastName}
                    name="lastName"
                    autoComplete="family-name"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label htmlFor={ids.lastName}>
                    <span className="c4-label-text">Last Name</span>
                  </label>
                </div>

                {/* Email */}
                <div className="c4-float sm:col-span-2">
                  <input
                    id={ids.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label htmlFor={ids.email}>
                    <span className="c4-label-text">Work Email Address</span>
                  </label>
                </div>

                {/* Phone */}
                <div className="c4-float">
                  <input
                    id={ids.phone}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label htmlFor={ids.phone}>
                    <span className="c4-label-text">Phone</span>
                  </label>
                </div>

                {/* Message */}
                <div className="c4-float sm:col-span-2">
                  <textarea
                    id={ids.message}
                    name="message"
                    autoComplete="off"
                    placeholder=" "
                    rows={5}
                    className="w-full rounded-xl bg-white/7 text-white outline-none resize-none min-h-[180px] sm:min-h-[200px]"
                  />
                  <label htmlFor={ids.message}>
                    <span className="c4-label-text">Message</span>
                  </label>
                </div>
              </div>

              <div className="my-4 border-t border-white/10" />

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setScheduleDemo((v) => !v)}
                    className={`cursor-pointer relative flex h-7 w-14 items-center rounded-full transition-colors duration-200 ease-out ${
                      scheduleDemo ? 'bg-primary' : 'bg-white/10'
                    }`}
                    role="switch"
                    aria-checked={scheduleDemo}
                    aria-label="Schedule a demo call"
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.4)] transition-transform duration-200 ease-out ${
                        scheduleDemo ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <span className="text-sm text-white">
                    <span className="font-medium">Schedule a demo call</span>
                    <span className="ml-2 text-white/70">Arrange a demo with our team.</span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="cursor-pointer btn-glow rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-all disabled:opacity-70"
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit'}
                </button>
              </div>

              {status !== 'idle' && (
                <p
                  className={`mt-3 text-center text-xs ${
                    status === 'ok' ? 'text-emerald-400' : status === 'err' ? 'text-red-400' : 'text-white/60'
                  }`}
                >
                  {msg}
                </p>
              )}

              <p className="mt-4 text-center text-xs text-white/60">
                By contacting us, you agree to our <span className="text-white">Terms</span> and{' '}
                <span className="text-white">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CornerDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full
                  bg-white/90 shadow-[0_0_16px_rgba(255,255,255,.6),0_0_36px_rgba(0,194,255,.45)]
                  ring-1 ring-white/30 ${className}`}
    />
  );
}