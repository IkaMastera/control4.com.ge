'use client';

import Image from 'next/image';
import Container from '@/components/common/container';
import StarfallCanvas from '../ui/star-fall-canvas';

export default function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-[--color-bg] min-h-[120svh] md:min-h-[135svh] py-24 sm:py-32"
    >
      {/* Background: your sphere image */}
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

      <StarfallCanvas
        mode="ambient"
        count={30}
        speed={4}
        maxSize={2.2}
        zIndex={1}
      />

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
              <div className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-t-[22px] bg-[radial-gradient(120%_50%_at_50%_0%,rgba(0,194,255,.16),transparent_70%)]" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div className="c4-float">
                  <input
                    name="firstName"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label><span className="c4-label-text">First Name</span></label>
                </div>

                {/* Last Name */}
                <div className="c4-float">
                  <input
                    name="lastName"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label><span className="c4-label-text">Last Name</span></label>
                </div>

                {/* Email (span both on small screens) */}
                <div className="c4-float sm:col-span-2">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label><span className="c4-label-text">Work Email Address</span></label>
                </div>

                {/* Phone */}
                <div className="c4-float">
                  <input
                    name="phone"
                    inputMode="tel"
                    placeholder=" "
                    className="w-full rounded-xl bg-white/7 text-white outline-none"
                  />
                  <label><span className="c4-label-text">Phone</span></label>
                </div>
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
                  className="btn-glow rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white shadow
                             transition-all"
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