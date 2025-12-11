// sections/products/product-dock.tsx
'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type DockItem = {
  id: string;
  name: string;
  slug: string;
  thumb: string;
};

type DockProps = {
  items: DockItem[];
  cardWidth?: number;
  mediaHeight?: number;
  gap?: number;
  pageBy?: number;
  animMs?: number;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProductDockMagnetic({
  items,
  cardWidth = 260,
  mediaHeight = 160,
  gap = 20,
  pageBy = 2,
  animMs = 360,
}: DockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRunning = useRef(false);

  const triple = useMemo(() => [...items, ...items, ...items], [items]);

  const itemSpan = cardWidth + gap;
  const blockWidth = items.length * itemSpan;
  const GUARD = itemSpan;
  const step = itemSpan * pageBy;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = blockWidth;
    el.style.scrollBehavior = prev || '';
  }, [blockWidth]);

 
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ticking = false;

    const correctIfNeeded = () => {
      if (!el) return;

      if (animRunning.current) return;

      const x = el.scrollLeft;
      if (x < blockWidth - GUARD) {
        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = x + blockWidth;
        el.style.scrollBehavior = prev || '';
      } else if (x >= blockWidth * 2 + GUARD) {
        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = x - blockWidth;
        el.style.scrollBehavior = prev || '';
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        correctIfNeeded();
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [blockWidth, GUARD]);

  const animateScrollTo = (targetLeft: number) =>
    new Promise<void>((resolve) => {
      const el = trackRef.current!;
      const start = el.scrollLeft;
      const dist = targetLeft - start;
      if (Math.abs(dist) < 0.5) {
        el.scrollLeft = targetLeft;
        resolve();
        return;
      }

      const snapPrev = el.style.scrollSnapType;
      el.style.scrollSnapType = 'none';

      animRunning.current = true;
      const t0 = performance.now();

      const frame = () => {
        const t = clamp01((performance.now() - t0) / animMs);
        const v = start + dist * easeOutCubic(t);
        el.scrollLeft = v;

        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          el.scrollLeft = targetLeft;
          el.style.scrollSnapType = snapPrev || '';
          animRunning.current = false;
          resolve();
        }
      };

      requestAnimationFrame(frame);
    });

  const correctAfterAnim = () => {
    const el = trackRef.current!;
    const x = el.scrollLeft;
    if (x < blockWidth - GUARD) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = x + blockWidth;
      el.style.scrollBehavior = '';
    } else if (x >= blockWidth * 2 + GUARD) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = x - blockWidth;
      el.style.scrollBehavior = '';
    }
  };

  // Arrow paging
  const page = async (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el || animRunning.current) return;

    const target = el.scrollLeft + dir * step;
    await animateScrollTo(target);
    correctAfterAnim();
  };

  return (
    <nav aria-label="Product dock" className="mt-6">
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => page(-1)}
          className="
            absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-12 h-12 md:w-11 md:h-11 rounded-full
            text-white cursor-pointer
            bg-black/55 backdrop-blur-xl
            border border-white/15
            shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_18px_rgba(0,194,255,0.45)]
            ring-1 ring-white/10
            transition-all duration-200
            hover:scale-105 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_28px_rgba(0,194,255,0.7)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
            active:scale-95
            opacity-95 group-hover:opacity-100
          "
        >
          <ChevronLeft className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Next"
          onClick={() => page(1)}
          className="
            absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-30
            flex items-center justify-center
            w-12 h-12 md:w-11 md:h-11 rounded-full
            text-white cursor-pointer
            bg-black/55 backdrop-blur-xl
            border border-white/15
            shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_18px_rgba(0,194,255,0.45)]
            ring-1 ring-white/10
            transition-all duration-200
            hover:scale-105 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_28px_rgba(0,194,255,0.7)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
            active:scale-95
            opacity-95 group-hover:opacity-100
          "
        >
          <ChevronRight className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="
            relative flex overflow-x-auto
            px-4 py-6 scrollbar-none
          "
          style={{ columnGap: gap } as React.CSSProperties}
        >
          {triple.map((it, i) => (
            <Link
              key={`${it.id}-${i}`}
              href={`#${it.slug}`}
              className="shrink-0"
              style={{ width: cardWidth }}
            >
              <MagneticCard
                title={it.name}
                image={it.thumb}
                width={cardWidth}
                height={mediaHeight}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}


function MagneticCard({
  title,
  image,
  width = 260,
  height = 160,
}: {
  title: string;
  image: string;
  width?: number;
  height?: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const pxRaw = useMotionValue(0.5);
  const pyRaw = useMotionValue(0.5);

  const px = useSpring(pxRaw, { stiffness: 220, damping: 26, mass: 0.7 });
  const py = useSpring(pyRaw, { stiffness: 220, damping: 26, mass: 0.7 });

  const translateMax = 12;
  const intensity = useTransform([px, py], ([x, y]: number[]) => {
    const dx = x - 0.5;
    const dy = y - 0.5;
    const d = Math.hypot(dx, dy);
    return (1 - Math.min(1, d / 0.5)) ** 2;
  });

  const tx = useTransform([px, intensity], ([x, t]: number[]) =>
    prefersReduced ? 0 : (x - 0.5) * translateMax * t
  );
  const ty = useTransform([py, intensity], ([y, t]: number[]) =>
    prefersReduced ? 0 : (y - 0.5) * translateMax * t
  );
  const rotateX = useTransform(py, (y: number) =>
    prefersReduced ? 0 : (0.5 - y) * 10
  );
  const rotateY = useTransform(px, (x: number) =>
    prefersReduced ? 0 : (x - 0.5) * 10
  );
  const scale = useTransform(intensity, (t: number) =>
    prefersReduced ? 1 : 1 + t * 0.03
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = clamp01((e.clientX - r.left) / r.width);
    const y = clamp01((e.clientY - r.top) / r.height);
    pxRaw.set(x);
    pyRaw.set(y);
  };
  const handleLeave = () => {
    pxRaw.set(0.5);
    pyRaw.set(0.5);
  };

  const cardStyle: MotionStyle = {
    width,
    transformStyle: 'preserve-3d',
    translateX: tx,
    translateY: ty,
    rotateX,
    rotateY,
    scale,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={cardStyle}
      className="
        group relative rounded-2xl ring-1 ring-white/10
        bg-black/45 overflow-hidden
        will-change-transform
      "
    >
      {/* Media */}
      <div className="relative" style={{ width, height }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:768px) 280px, 260px"
          className="
            object-cover select-none
            will-change-transform
            [image-rendering:-webkit-optimize-contrast]
            backface-hidden
            transform-[translateZ(0)]
          "
          draggable={false}
          priority={false}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute left-6 right-6 -bottom-2 h-2.5
                    rounded-full blur-md opacity-60"
          style={{
            background: 'linear-gradient(90deg, #00C2FF33, #0056B833)'
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,194,255,.28), rgba(0,86,184,.28))',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px'
          }}
        />
        
        <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="px-4 py-3 text-sm text-white/90 font-medium text-center">
        {title}
      </div>
    </motion.div>
  );
}