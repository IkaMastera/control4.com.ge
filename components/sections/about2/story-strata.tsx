'use client';

import { useEffect, useRef } from 'react';

const FACTS = [
  { k: 'Years in Engineering', v: 17 },
  { k: 'Projects Delivered', v: 120 },
  { k: 'Avg. Uptime', v: 99.98, suffix: '%' },
];

export default function StoryStrata() {
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrap.current!;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)));
      el.style.setProperty('--par', String(p));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nums = Array.from(document.querySelectorAll('[data-count]')) as HTMLElement[];
    const obs = new IntersectionObserver((io) => {
      io.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target as HTMLElement;
        const end = Number(n.dataset.value);
        let cur = 0;
        const start = performance.now();
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
    }, { threshold: 0.4 });
    nums.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-24 sm:py-28 px-6">
      <div ref={wrap} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start">
          <div className="relative">
            <div className="strata layer-a" />
            <div className="strata layer-b" />
            <div className="strata layer-c" />
            <h2 className="relative z-10 text-4xl font-semibold">Who we are</h2>
            <p className="relative z-10 mt-5 text-white/75 leading-relaxed">
              We’re a focused Control4 integrator led by engineers. Our work spans electrical, fire, HVAC,
              and BMS — and it shows in the way we plan, document, and support every system we install.
              We design for **invisible complexity** and **visible comfort**.
            </p>
          </div>

          <div className="grid gap-4">
            {FACTS.map((f) => (
              <div key={f.k} className="rounded-2xl border border-white/10 bg-[#0F1524] p-6">
                <div className="text-4xl font-semibold tracking-tight">
                  <span data-count data-value={f.v}></span>{f.suffix ?? ''}
                </div>
                <p className="mt-1 text-white/65">{f.k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
