'use client';

import Container from '@/components/common/container';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

type Brand = { name: string; file: string; width?: number; height?: number };

const BRANDS: Brand[] = [
  { name: 'Apple TV', file: 'appletv.svg' },
  { name: 'Roku', file: 'roku.svg' },
  { name: 'PlayStation 5', file: 'playstation5.svg' },
  { name: 'LG', file: 'lg.svg' },
  { name: 'Samsung', file: 'samsung.svg' },
  { name: 'Sony', file: 'sony.svg' },
  { name: 'Bose', file: 'bose.svg' },
  { name: 'Denon', file: 'denon.svg' },
  { name: 'Yale', file: 'yale.svg' },
  { name: 'Sonos', file: 'sonos.svg' },
];

export default function BrandWall() {
  const prefersReduced = useReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = spotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  const onLeave = () => {
    const el = spotRef.current;
    if (!el) return;
    // park spotlight off-canvas
    el.style.setProperty('--mx', `-1000px`);
    el.style.setProperty('--my', `-1000px`);
  };

  return (
    <section
      aria-labelledby="brands"
      className="relative overflow-hidden bg-[var(--color-surface)]/40 py-16 sm:py-20"
    >
      {/* Tech grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)',
          maskImage:
            'radial-gradient(1200px 1200px at 50% 10%, rgba(0,0,0,0.55), transparent 70%)',
        }}
      />

      <Container>
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-white/60">
            Works with Control4 • ერთ სისტემაში, ათასობით მოწყობილობა
          </p>
          <h2 id="brands" className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
            Works with <span className="text-[var(--color-primary)]">Control4</span>
          </h2>
          <p className="mt-3 max-w-3xl text-white/75">
            Your system integrates popular devices—manage them with a tap, voice, or full
            automation. <span className="text-white/80">• Control4 სისტემები მუშაობს წამყვან ბრენდებთან.</span>
          </p>
        </div>

        {/* Spotlight wrapper */}
        <div
          ref={spotRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative rounded-2xl p-6 sm:p-8 ring-1 ring-white/10 bg-[var(--color-bg)]/30"
          style={
            prefersReduced
              ? undefined
              : {
                  // radial spotlight revealing max brightness under cursor
                  WebkitMaskImage:
                    'radial-gradient(240px 240px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
                  maskImage:
                    'radial-gradient(240px 240px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
                  transition: 'mask-position 120ms ease-out',
                }
          }
        >
          {/* Grid */}
          <ul
            className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
              gap-x-8 gap-y-12 sm:gap-y-14
            "
          >
            {BRANDS.map((b, idx) => (
              <motion.li
                key={b.name}
                className="flex items-center justify-center"
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: prefersReduced ? 0 : idx * 0.04 }}
              >
                <Image
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  width={b.width ?? 180}
                  height={b.height ?? 72}
                  // Make logos crisp/bright on dark
                  className="
                    contrast-125 brightness-[2.1] invert
                    opacity-80 hover:opacity-100
                    transition-opacity duration-200
                    will-change-opacity
                  "
                  priority={false}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs text-white/50">
          Logos are trademarks of their respective owners. Shown for compatibility context only.
        </p>
      </Container>
    </section>
  );
}