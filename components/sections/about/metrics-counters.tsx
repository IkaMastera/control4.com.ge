'use client';

import { useEffect, useRef } from 'react';

const METRICS = [
  { k: 'Years Engineering', v: 17 },
  { k: 'Control4 Projects', v: 100 },
  { k: 'Avg. Uptime', v: 99.98, suffix: '%' },
  { k: 'Response SLA', v: 24, suffix: 'h' },
];

export default function MetricsCounters() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const nums = Array.from(el.querySelectorAll('[data-num]')) as HTMLElement[];
    const obs = new IntersectionObserver((io) => {
      io.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target as HTMLElement;
        const end = Number(n.dataset.value);
        let cur = 0, start = performance.now();
        const dur = 1100;
        const tick = (ts: number) => {
          const p = Math.min(1, (ts - start) / dur);
          cur = end * (0.5 - 0.5 * Math.cos(Math.PI * p));
          n.textContent = (Math.round(cur * 100) / 100).toString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(n);
      });
    }, { threshold: 0.25 });
    nums.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20">
      <div ref={ref} className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {METRICS.map((m) => (
          <div key={m.k} className="rounded-2xl border border-white/10 bg-[#0F1524] p-6 text-center">
            <div className="text-4xl font-semibold tracking-tight">
              <span data-num data-value={m.v}></span>{m.suffix ?? ''}
            </div>
            <p className="mt-2 text-white/70">{m.k}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
