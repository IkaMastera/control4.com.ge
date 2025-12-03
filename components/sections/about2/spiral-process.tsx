'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = ['Discovery', 'Design', 'Build', 'Program', 'Handover'];

export default function SpiralProcess() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current!;
    const dots = Array.from(el.querySelectorAll('[data-dot]')) as HTMLElement[];

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)));
      const idx = Math.min(dots.length - 1, Math.max(0, Math.floor(p * dots.length)));
      setActive(idx);
      dots.forEach((d, i) => d.classList.toggle('dot-on', i <= idx));
    };

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">How we deliver</h2>
        <p className="mt-4 text-white/70">A calm sequence, built on documentation and QA.</p>
      </div>

      <div ref={ref} className="mx-auto mt-12 max-w-[820px] aspect-square relative spiral">
        {[...Array(36)].map((_, i) => (
          <span key={i} data-dot className="spiral-dot" style={{ ['--i' as any]: i }} />
        ))}
        <div className="spiral-center">
          <p className="text-sm uppercase tracking-[0.22em] text-white/70">Stage</p>
          <h3 className="mt-1 text-2xl font-semibold">{STEPS[Math.min(STEPS.length - 1, Math.floor(active / 7))]}</h3>
        </div>
      </div>
    </section>
  );
}
