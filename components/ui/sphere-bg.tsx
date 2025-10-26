// components/ui/sphere-bg.tsx
"use client";

import { useEffect, useState } from "react";

export default function SphereBG() {
  const [okMotion, setOkMotion] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOkMotion(!mq.matches);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Main sphere */}
      <div
        className="absolute -top-40 left-1/2 h-[1100px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{
          background:
            `
            radial-gradient(closest-side, rgba(0,194,255,0.18), transparent 70%),
            radial-gradient(closest-side at 50% 60%, rgba(0,86,184,0.55), rgba(0,22,44,0.00) 70%),
            conic-gradient(from 200deg at 50% 40%, rgba(255,255,255,0.18), rgba(0,0,0,0.0) 30%, rgba(255,255,255,0.12) 60%, rgba(0,0,0,0.0))
            `,
          boxShadow:
            "0 0 120px 20px rgba(0,194,255,0.25), inset 0 0 120px rgba(0,86,184,0.35)",
          filter: "blur(0.2px)",
        }}
      />

      {/* Orbital lines */}
      <div className="absolute left-1/2 top-[-120px] -translate-x-1/2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: 900 + i * 140 + "px",
              height: 900 + i * 140 + "px",
              left: -(900 + i * 140) / 2 + "px",
              top: 0,
              boxShadow: "0 0 40px rgba(0,194,255,0.05) inset",
            }}
          />
        ))}
      </div>
      
      <div
        className="absolute left-1/2 top-[-120px] h-[900px] w-[900px] -translate-x-1/2 opacity-70 [mask-image:radial-gradient(circle at 50% 50%,#000_70%,transparent_75%)]"
        style={{
          backgroundImage:
            `radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
             radial-gradient(rgba(0,194,255,0.10) 1px, transparent 1px)`,
          backgroundSize: "24px 24px, 24px 24px",
          backgroundPosition: "0 0, 12px 12px",
          transform: okMotion ? "translateZ(0)" : undefined,
          animation: okMotion ? "nebGrid 18s linear infinite" : undefined,
        }}
      />
      <style jsx>{`
        @keyframes nebGrid {
          from { transform: translate(-8px, -6px) }
          to   { transform: translate(16px, 12px) }
        }
      `}</style>
    </div>
  );
}