'use client';

import { useEffect, useRef } from 'react';

const LEADS = [
  { name: 'Mamuka', role: 'Lead Systems Engineer', img: '/images/about/mamuka.jpg' },
  { name: 'Tamta', role: 'Operations & Experience', img: '/images/about/tamta.jpg' },
  { name: 'Team', role: 'Control4 Certified', img: '/images/about/team.jpg' },
];

export default function LeadershipMagnet() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[];
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      cards.forEach((c) => {
        const cr = c.getBoundingClientRect();
        const cx = cr.left + cr.width / 2 - r.left;
        const cy = cr.top + cr.height / 2 - r.top;
        const dx = x - cx, dy = y - cy, dist = Math.hypot(dx, dy);
        const m = Math.max(0, 1 - dist / 360);
        c.style.setProperty('--tx', `${(dx / dist || 0) * m * 8}px`);
        c.style.setProperty('--ty', `${(dy / dist || 0) * m * 8}px`);
        c.style.setProperty('--rot', `${(dx / 50) * m}deg`);
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="leadership" className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Leadership & culture</h2>
        <p className="mt-4 text-white/70">Engineering discipline. Design taste. Human service.</p>
      </div>

      <div ref={ref} className="mx-auto mt-14 max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEADS.map((p, i) => (
          <figure key={p.name} data-card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1524] aspect-[4/5] transition-transform will-change-transform" style={{ transform: 'translate(var(--tx,0), var(--ty,0)) rotate(var(--rot,0))', transitionDuration: '260ms' }}>
            <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6">
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-white/70 text-sm">{p.role}</p>
            </figcaption>
            <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(56,189,248,0.45)]" />
          </figure>
        ))}
      </div>
    </section>
  );
}
