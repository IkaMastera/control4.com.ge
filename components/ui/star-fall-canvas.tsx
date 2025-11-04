'use client';

import { useEffect, useRef } from 'react';

type Mode = 'fall' | 'ambient';

type Props = {
  count?: number;
  zIndex?: number;
  speed?: number;
  maxSize?: number;
  mode?: Mode;
  shootingStarEverySec?: [min: number, max: number];
};

export default function StarfallCanvas({
  count = 80,
  zIndex = 0,
  speed = 40,
  maxSize = 2.4,
  mode = 'ambient',
  shootingStarEverySec,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    let w = 0, h = 0;

    type Star = {
      x: number; y: number;
      r: number;
      vx: number; vy: number
      tw: number; tc: number;
      phase: number; amp: number;
    };

    const stars: Star[] = Array.from({ length: count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * maxSize * 0.4 + maxSize * 0.6,
      vx: (Math.random() - 0.5) * 12,
      vy: speed * (0.6 + Math.random() * 0.8),
      tw: Math.random() * Math.PI * 2,
      tc: 0.8 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      amp: 0.004 + Math.random() * 0.012,
    }));

    let shooting: null | {
      x: number; y: number; life: number; vx: number; vy: number;
    } = null;
    let nextShootAt = 0;

    const scheduleNextShoot = (now: number) => {
      if (!shootingStarEverySec) return;
      const [a, b] = shootingStarEverySec;
      nextShootAt = now + (a + Math.random() * (b - a)) * 1000;
    };

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let last = performance.now();
    scheduleNextShoot(last);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        let X: number, Y: number;

        if (mode === 'fall') {
          s.x += (s.vx * dt) / Math.max(1, w);
          s.y += (s.vy * dt) / Math.max(1, h);
          if (s.y > 1.1) { s.y = -0.1; s.x = Math.random(); }
          if (s.x < -0.1) s.x = 1.1;
          if (s.x >  1.1) s.x = -0.1;
          X = s.x * w; Y = s.y * h;
        } else {
          s.phase += dt * (speed * 0.15);
          const dx = Math.sin(s.phase) * s.amp * w;
          const dy = Math.cos(s.phase * 0.9) * s.amp * h;
          X = s.x * w + dx;
          Y = s.y * h + dy;
        }

        s.tw += dt * 1.8;
        const alpha = 0.5 + Math.sin(s.tw) * 0.25 * s.tc;

        const g = ctx.createRadialGradient(X, Y, 0, X, Y, s.r * 5);
        g.addColorStop(0, `rgba(0,194,255,${0.5 * alpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(X, Y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
        ctx.beginPath();
        ctx.arc(X, Y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (shootingStarEverySec) {
        if (!shooting && now >= nextShootAt) {
          const fromLeft = Math.random() > 0.5;
          shooting = {
            x: fromLeft ? -0.05 * w : 1.05 * w,
            y: (0.15 + Math.random() * 0.35) * h,
            vx: (fromLeft ? 1 : -1) * (w * 1.6),
            vy: -h * (0.25 + Math.random() * 0.15),
            life: 0.6,
          };
          scheduleNextShoot(now);
        }
        if (shooting) {
          shooting.life -= dt;
          shooting.x += shooting.vx * dt;
          shooting.y += shooting.vy * dt;

          const tailLen = 160;
          const grd = ctx.createLinearGradient(
            shooting.x, shooting.y,
            shooting.x - shooting.vx * (tailLen / Math.hypot(shooting.vx, shooting.vy)),
            shooting.y - shooting.vy * (tailLen / Math.hypot(shooting.vx, shooting.vy))
          );
          grd.addColorStop(0, 'rgba(255,255,255,0.9)');
          grd.addColorStop(1, 'rgba(0,194,255,0)');

          ctx.strokeStyle = grd;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(
            shooting.x - shooting.vx * 0.06,
            shooting.y - shooting.vy * 0.06
          );
          ctx.stroke();

          if (shooting.life <= 0) shooting = null;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [count, speed, maxSize, mode, shootingStarEverySec]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex,
      }}
    />
  );
}