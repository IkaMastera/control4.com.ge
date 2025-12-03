'use client';

import { useEffect, useRef } from 'react';

const STACK = [
  'Control4 OS', 'Pakedge Networking', 'Araknis', 'Triad Audio', 'Luma', 'Episode',
  'PoE / UPS', 'Structured Cabling', 'Rack Design', 'Comms & VLANs', 'Remote OvrC', 'Keypads & Scenes'
];

export default function TechGridWaves() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)));
      el.style.setProperty('--wave', String(p));
    };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Our stack, tuned</h2>
        <p className="mt-4 text-white/70">From cables to cloud, each layer matters.</p>
      </div>

      <div ref={ref} className="mx-auto mt-14 max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((s, i) => (
          <div key={s} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0F1524] p-6">
            <div className="absolute -inset-0.5 opacity-30 pointer-events-none tech-wave" style={{ animationDelay: `${i * 90}ms` }} />
            <p className="relative z-10 font-semibold">{s}</p>
            <p className="relative z-10 mt-2 text-sm text-white/70">Engineered for resiliency and clarity.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
