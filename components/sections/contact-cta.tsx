'use client';

import Image from 'next/image';
import Container from '@/components/common/container';

export default function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-[--color-bg] min-h-[120svh] md:min-h-[135svh] py-24 sm:py-32"
    >
      {/* Background: your sphere image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/contactBG.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-100"
        />
        <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-6%,transparent_42%,rgba(0,0,0,.28)_70%,rgba(0,0,0,.55)_100%)]" />
      </div>

      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-[--color-accent]">Contact</p>
          <h2 id="contact-cta-heading" className="mt-3 text-4xl font-semibold text-[--color-ink] sm:text-5xl">
            Power Your Home with Control4
          </h2>
          <p className="mt-4 text-base text-white/70">
            Access fast, reliable integration from certified Control4 experts in Georgia.
          </p>
        </div>

        {/* ====== Glowing glass card with corner beacons ====== */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <CornerDot className="-top-5 -left-5" />
          <CornerDot className="-top-5 -right-5" />
          <CornerDot className="-bottom-5 -left-5" />
          <CornerDot className="-bottom-5 -right-5" />

          {/* Card wrapper with glow and gradient edge */}
          <div className="relative rounded-[26px] p-[1px]">
            {/* Gradient edge (very subtle) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[26px]"
              style={{
                background: 'linear-gradient(180deg, rgba(0,194,255,.35), rgba(0,86,184,.35))',
                // Gradient border mask trick
                WebkitMask:
                  'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            {/* The card itself */}
            <form
              action="https://formspree.io/f/your-form-id" // TODO: replace
              method="POST"
              className="
                relative rounded-[24px] px-5 py-6 sm:p-8
                bg-white/[0.045] backdrop-blur-xl
                ring-1 ring-white/10
                shadow-[0_80px_220px_-80px_rgba(0,0,0,.95),0_0_60px_-20px_rgba(0,194,255,.20)]
              "
            >
              {/* Inner top glow strip (to catch the dome light) */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-t-[22px] bg-[radial-gradient(120%_50%_at_50%_0%,rgba(0,194,255,.16),transparent_70%)]" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name">
                  <input
                    name="firstName"
                    required
                    placeholder="Enter your first name"
                    className="w-full rounded-xl bg-white/7 px-3 py-3 text-white placeholder-white/45 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[--color-accent]/60"
                  />
                </Field>
                <Field label="Last Name">
                  <input
                    name="lastName"
                    required
                    placeholder="Enter your last name"
                    className="w-full rounded-xl bg-white/7 px-3 py-3 text-white placeholder-white/45 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[--color-accent]/60"
                  />
                </Field>
                <Field label="Work Email Address">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your work email"
                    className="w-full rounded-xl bg-white/7 px-3 py-3 text-white placeholder-white/45 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[--color-accent]/60"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    name="phone"
                    placeholder="+995 5XX XX XX XX"
                    className="w-full rounded-xl bg-white/7 px-3 py-3 text-white placeholder-white/45 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[--color-accent]/60"
                  />
                </Field>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-white/10" />

              {/* Toggle + Submit */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3">
                  {/* Decorative toggle (posts hidden field) */}
                  <input type="hidden" name="demo" value="yes" />
                  <span
                    className="relative h-6 w-11 rounded-full bg-[--color-accent]/60 ring-1 ring-white/10
                               after:absolute after:left-5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow
                               "
                    role="switch"
                    aria-checked="true"
                  />
                  <span className="text-sm text-white">
                    <span className="font-medium">Schedule a Demo Call</span>
                    <span className="ml-2 text-white/70">Arrange a demo with our team.</span>
                  </span>
                </label>

                <button
                  type="submit"
                  className="rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white shadow
                             transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60"
                >
                  Submit
                </button>
              </div>

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

/* ---------- Small helpers (local to this file) ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/75">{label}</span>
      {children}
    </label>
  );
}

function CornerDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full
                  bg-white/90 shadow-[0_0_16px_rgba(255,255,255,.6),0_0_36px_rgba(0,194,255,.45)]
                  ring-1 ring-white/30 ${className}`}
    />
  );
}