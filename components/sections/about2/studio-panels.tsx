'use client';

import { useEffect, useRef } from 'react';

const PANELS = [
  { t: 'Lighting Scenes', i: '/images/about/panels/lighting.jpg', d: 'Day, evening, party — mapped to real life.' },
  { t: 'Whole-Home Audio', i: '/images/about/panels/audio.jpg', d: 'Rooms that group and ungroup with ease.' },
  { t: 'Security + Intercom', i: '/images/about/panels/security.jpg', d: 'Open gate, see door, speak, log — one flow.' },
  { t: 'Climate + Shades', i: '/images/about/panels/climate.jpg', d: 'Comfort that anticipates and saves energy.' },
];

export default function StudioPanels() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // SSR / hot-reload safety
    if (typeof window === 'undefined') return;
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
    if (items.length === 0) return;

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      items.forEach((it) => {
        const rr = it.getBoundingClientRect();
        const cx = rr.left + rr.width / 2 - r.left;
        const cy = rr.top + rr.height / 2 - r.top;
        const dx = x - cx;
        const dy = y - cy;
        const m = Math.max(0, 1 - Math.hypot(dx, dy) / 480);
        it.style.setProperty('--tx', `${dx * 0.02 * m}px`);
        it.style.setProperty('--ty', `${dy * 0.02 * m}px`);
      });
    };

    root.addEventListener('mousemove', onMove);
    return () => {
      root.removeEventListener('mousemove', onMove);
      // cleanup transforms to avoid stale inline styles after fast refresh
      items.forEach((it) => {
        it.style.removeProperty('--tx');
        it.style.removeProperty('--ty');
      });
    };
  }, []);

  return (
    <section className="relative px-6 py-28">
      <div ref={ref} className="mx-auto max-w-6xl grid gap-5 md:grid-cols-2">
        {PANELS.map((p) => (
          <figure
            key={p.t}
            data-panel
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1524] aspect-[16/10] will-change-transform"
            style={{
              transform: 'translate(var(--tx,0), var(--ty,0))',
              transition: 'transform 240ms cubic-bezier(.2,.6,.2,1)',
            }}
          >
            <img
              src={p.i}
              alt={p.t}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6">
              <p className="text-lg font-semibold">{p.t}</p>
              <p className="text-white/70 text-sm">{p.d}</p>
            </figcaption>
            <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(56,189,248,0.45)]" />
          </figure>
        ))}
      </div>
    </section>
  );
}
