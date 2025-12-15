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
  { name: 'Amazon Fire TV', file: 'amazonfiretv.svg' },
  { name: 'DirecTV', file: 'DirecTV.svg' },

  { name: 'LG', file: 'lg.svg' },
  { name: 'Samsung', file: 'samsung.svg' },
  { name: 'Sony', file: 'sony.svg' },
  { name: 'Bose', file: 'bose.svg' },
  { name: 'Denon', file: 'denon.svg' },

  { name: 'Yale', file: 'yale.svg' },
  { name: 'Sonos', file: 'sonos.svg' },
  { name: 'Ubiquiti', file: 'ubiquiti.svg' },
  { name: 'Philips Hue', file: 'philipshue.svg' },
  { name: 'Panasonic', file: 'panasonic.svg' },
  { name: 'Google', file: 'google.svg' },

  { name: 'Dashlane', file: 'dashlane.svg' },
  { name: 'Dish', file: 'dish.svg' },
  { name: 'Harman', file: 'harman.svg' },
  { name: 'Honeywell', file: 'honeywell.svg' },
  { name: 'Kwikset', file: 'kwiksete.svg' },
  { name: 'Lutron', file: 'lutron.svg' },
  { name: 'Sharp', file: 'sharp.svg' },
  { name: 'Somfy', file: 'somfy.svg' },
  { name: 'Xbox', file: 'Xbox.svg' },
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
    // park spotlight off-canvas so the panel returns to calm state
    el.style.setProperty('--mx', `-1000px`);
    el.style.setProperty('--my', `-1000px`);
  };

  return (
    <section
      aria-labelledby="brands"
      className="relative overflow-hidden bg-surface/40 py-16 sm:py-20"
    >
      {/* Tech grid background behind everything */}
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
            Works with Control4 • One System, Thousands of Devices
          </p>
          <h2
            id="brands"
            className="mt-2 text-3xl sm:text-4xl font-semibold text-white"
          >
            Works with <span className="text-primary">Control4</span>
          </h2>
          <p className="mt-3 max-w-3xl text-white/75">
            Control4 works effortlessly with the world-leading brands - giving
            you simple, unified control of all your favorite devices in one
            place.
          </p>
        </div>

        {/* Spotlight wrapper – this is the panel we make more visible */}
        <div
          ref={spotRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="
            relative overflow-hidden
            rounded-2xl p-6 sm:p-8
            ring-1 ring-white/15
            bg-[color-mix(in_oklab,var(--color-surface),#000000_22%)]
            shadow-[0_24px_60px_rgba(0,0,0,0.85)]
          "
          style={
            prefersReduced
              ? undefined
              : {
                  // radial spotlight that reveals more brightness under the cursor
                  WebkitMaskImage:
                    'radial-gradient(240px 240px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
                  maskImage:
                    'radial-gradient(240px 240px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
                  transition: 'mask-position 120ms ease-out',
                }
          }
        >
          {/* Soft inner glow so the panel reads as a card, not just flat bg */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              rounded-2xl
              bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_65%)]
              opacity-90
            "
          />

          {/* Grid of logos */}
          <ul
            className="
              relative
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
                transition={{
                  duration: 0.45,
                  delay: prefersReduced ? 0 : idx * 0.04,
                }}
              >
                <Image
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  width={120}
                  height={48}
                  className="
                    w-[80px] sm:w-[90px] md:w-[100px]
                    h-auto
                    contrast-125 brightness-[2.1] invert
                    opacity-70 hover:opacity-100
                    transition-opacity duration-200
                    will-change-opacity
                  "
                  loading="lazy"
                />
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs text-white/50">
          Logos are trademarks of their respective owners. Shown for
          compatibility context only.
        </p>
      </Container>
    </section>
  );
}