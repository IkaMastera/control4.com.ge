'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

type Node = { x: number; y: number; vx: number; vy: number; boot: number };

export default function AetherHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = canvasRef.current!;
    const ctx = el.getContext('2d', { alpha: true })!;
    let w = 0, h = 0, t = 0;
    let nodes: Node[] = [];
    let mouseX = 0, mouseY = 0, tiltX = 0, tiltY = 0;
    let mounted = true;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = el.clientWidth; h = el.clientHeight;
      el.width = Math.floor(w * dpr); el.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.min(240, Math.max(140, Math.floor((w * h) / 26000)));
      nodes = Array.from({ length: base }, (_, i) => {
        const ang = Math.random() * Math.PI * 2;
        const sp = 0.08 + Math.random() * 0.28;
        return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, boot: i * (reduceMotion ? 0 : 3.5) };
      });
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width - 0.5;
      mouseY = (e.clientY - r.top) / r.height - 0.5;
    };

    const step = () => {
      t += 1;
      tiltX += ((reduceMotion ? 0 : mouseY * -6) - tiltX) * 0.06;
      tiltY += ((reduceMotion ? 0 : mouseX * 6) - tiltY) * 0.06;

      ctx.clearRect(0, 0, w, h);

      // vignette
      const g = ctx.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.8);
      g.addColorStop(0, 'rgba(0,194,255,0.12)');
      g.addColorStop(1, 'rgba(13,17,23,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      ctx.save();
      if (!reduceMotion) {
        ctx.translate((tiltY / 6) * 20, (tiltX / 6) * 20);
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (t > n.boot) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const d = Math.sqrt(d2);
            const o = Math.max(0, 1 - d / 130);
            ctx.strokeStyle = `rgba(128,200,255,${0.08 * o})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // nodes + aura
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const s = 1.2 + Math.sin((t + i * 7) * 0.02) * 0.15;
        ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(n.x, n.y, s, 0, Math.PI * 2); ctx.fill();
        const a = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
        a.addColorStop(0, 'rgba(0,194,255,0.32)'); a.addColorStop(1, 'rgba(0,194,255,0)');
        ctx.fillStyle = a; ctx.beginPath(); ctx.arc(n.x, n.y, 14, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      if (mounted) raf.current = requestAnimationFrame(step);
    };

    const init = () => { resize(); step(); };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    init();
    return () => { if (raf.current) cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[94svh] grid place-items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 px-6 text-center max-w-[1100px]">
        <p className="text-xs tracking-[0.28em] uppercase text-white/70">Built in Georgia. Powered by Control4.</p>
        <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08]">
          Homes that <span className="text-[var(--color-accent)]">think</span>, systems that <span className="text-[var(--color-primary)]">disappear</span>.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto">Lighting, audio, climate and security—engineered as one calm, reliable experience. We design for humans, then harden for decades.</p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <a href="#pillars" className="btn-glow btn-glow--trio px-6 py-3 rounded-xl font-medium ring-1 ring-white/10">See our craft</a>
          <a href="#leadership" className="px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">Meet the team</a>
        </div>
        <div className="pointer-events-none mt-16 h-24 about-footglow" />
      </div>
    </section>
  );
}
