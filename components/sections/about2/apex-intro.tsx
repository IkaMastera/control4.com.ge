'use client';

import { useEffect, useRef } from 'react';

export default function ApexIntro() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)));
      el.style.setProperty('--p', String(p));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[92svh] grid place-items-center px-6 overflow-hidden"
      aria-label="About Control4 Georgia"
    >
      {/* kinetic beams */}
      <div aria-hidden className="absolute inset-0">
        <div className="apx-beams" />
        <div className="apx-grid" />
      </div>

      {/* headline */}
      <div className="relative z-10 text-center max-w-[1100px]">
        <p className="text-xs tracking-[0.28em] uppercase text-white/70">Georgia • Control4 Partner</p>
        <h1 className="apx-ink mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06]">
          Precision <span className="text-[var(--color-accent)]">engineering</span>,<br />
          human <span className="text-[var(--color-primary)]">experience</span>.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto">
          Lighting, audio, climate, security — one calm system. Built like infrastructure, felt like home.
        </p>
        <div className="mx-auto mt-10 h-[3px] w-64 rounded-full apx-underline" />
      </div>
    </section>
  );
}
