'use client';

import { useEffect, useRef } from 'react';

export default function SignatureLine() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current!;
    const path = svg.querySelector('path') as SVGPathElement;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const obs = new IntersectionObserver((io) => {
      io.forEach((e) => {
        if (!e.isIntersecting) return;
        path.classList.add('sig-in');
        obs.disconnect();
      });
    }, { threshold: 0.4 });
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative px-6 py-16">
      <svg
        ref={ref}
        viewBox="0 0 1200 180"
        className="mx-auto max-w-[1100px] w-full h-[140px] opacity-80"
        aria-hidden
      >
        <defs>
          <linearGradient id="sig" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00C2FF" />
            <stop offset="100%" stopColor="#0056B8" />
          </linearGradient>
        </defs>
        <path
          d="M20,120 C180,60 280,140 420,90 C580,30 720,160 900,90 C1040,35 1140,130 1180,90"
          fill="none"
          stroke="url(#sig)"
          strokeWidth="3"
          strokeLinecap="round"
          className="signature-path"
        />
      </svg>
    </section>
  );
}
