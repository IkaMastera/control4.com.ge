'use client';

import { useEffect, useRef } from 'react';
const PILLARS = [
  { title: 'Unified by design', body: 'One interface, one brain. Scenes that blend light, sound, comfort and security—without juggling apps.' },
  { title: 'Reliability first', body: 'Industrial-grade networking, disciplined power, documented racks. Built to run quietly for years.' },
  { title: 'Human control', body: 'Keypads, voice, phone, remote—your choice. Tech should feel like furniture, not friction.' },
];

export default function AboutPillars() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    const obs = new IntersectionObserver((io) => io.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-in')), { threshold: 0.2 });
    el.querySelectorAll('[data-reveal]').forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pillars" className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Our craft in three signals</h2>
        <p className="mt-4 text-white/70">Clear thinking, clean wiring, calm experiences.</p>
      </div>
      <div ref={ref} className="mt-14 mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <article key={p.title} data-reveal className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-7 translate-y-6 opacity-0 transition-all duration-700 will-change-transform" style={{ transitionDelay: `${i * 120}ms` }}>
            <svg aria-hidden viewBox="0 0 300 200" className="absolute -inset-2 opacity-[0.22] group-hover:opacity-40 transition">
              <defs><linearGradient id={`lg-${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00C2FF" /><stop offset="100%" stopColor="#0056B8" /></linearGradient></defs>
              <path d="M10 170 C100 130, 160 120, 290 40" fill="none" stroke={`url(#lg-${i})`} strokeWidth="3" strokeLinecap="round" className="animate-[trace_6s_linear_infinite]" pathLength={1} strokeDasharray="0.12 0.88" />
            </svg>
            <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(56,189,248,0.45)]" />
            <h3 className="relative z-10 text-xl font-semibold">{p.title}</h3>
            <p className="relative z-10 mt-3 text-white/70">{p.body}</p>
            <div className="absolute inset-0 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.55)] transition" />
          </article>
        ))}
      </div>
    </section>
  );
}
