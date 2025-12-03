"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutNebula() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current!;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.setProperty("--tiltX", `${dy * -6}deg`);
      el.style.setProperty("--tiltY", `${dx * 6}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      aria-label="About Control4 Georgia"
      className="relative min-h-[94svh] flex items-center justify-center"
    >
      {/* BACKDROP: animated mesh + particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 about-mesh opacity-[0.9]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="about-stars about-stars--a" />
          <div className="about-stars about-stars--b" />
        </div>
        {/* sweeping scanner */}
        <div className="about-scan" />
      </div>

      {/* CONTENT */}
      <div
        ref={wrapRef}
        className="relative z-10 px-6 w-full max-w-[1100px] text-center will-change-transform"
        style={{
          transform:
            "perspective(1000px) rotateX(var(--tiltX,0deg)) rotateY(var(--tiltY,0deg))",
          transition: "transform 400ms cubic-bezier(.2,.6,.2,1)",
        }}
      >
        <p className="text-xs tracking-[0.28em] uppercase text-white/70">
          Built in Georgia. Powered by Control4.
        </p>

        <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08]">
          Homes that <span className="text-[var(--color-accent)]">think</span>,<br />
          systems that <span className="text-[var(--color-primary)]">disappear</span>.
        </h1>

        <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto">
          Lighting, audio, climate and security—engineered as one calm, reliable
          experience. We design for humans, then harden for decades.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#pillars"
            className="btn-glow btn-glow--trio px-6 py-3 rounded-xl font-medium ring-1 ring-white/10"
          >
            See our craft
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition"
          >
            Speak with an engineer
          </Link>
        </div>

        {/* subtle bottom glow */}
        <div className="pointer-events-none mt-16 h-24 about-footglow" />
      </div>
    </section>
  );
}
