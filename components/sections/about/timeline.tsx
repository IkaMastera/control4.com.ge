"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { k: "Discovery", v: "Walkthrough, goals, constraints, budget, timeline." },
  { k: "Design", v: "Wiring plans, rack layouts, scenes, UX, documentation." },
  { k: "Build", v: "Cabling, racks, terminations, labeling, QA." },
  { k: "Program", v: "Scenes, logic, voice, remote access, notifications." },
  { k: "Handover", v: "Training, docs, support pathways, maintenance." },
];

export default function AboutTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const nodes = Array.from(el.querySelectorAll("[data-node]")) as HTMLElement[];
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight)));
      el.style.setProperty("--p", progress.toString());
      nodes.forEach((n, i) => {
        const t = (i + 1) / nodes.length;
        n.classList.toggle("is-lit", progress >= t - 0.03);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Our process, on rails</h2>
        <p className="mt-4 text-white/70">
          Built to remove surprises and preserve momentum.
        </p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto mt-14 max-w-4xl about-rail"
      >
        {/* rail line */}
        <div aria-hidden className="about-rail-line" />

        {STEPS.map((s, i) => (
          <div key={s.k} className="about-rail-row">
            <div className="about-rail-node" data-node />
            <div className="about-rail-copy">
              <h3 className="text-lg font-semibold">{s.k}</h3>
              <p className="text-white/70">{s.v}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
