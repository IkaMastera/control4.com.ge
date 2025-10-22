'use client';

import Container from "../common/container";
import Image from "next/image";

type Brand = { name: string; file: string; width?: number; height?: number };


const BRANDS: Brand[] = [
  { name: 'Apple TV',      file: 'appletv.svg' },
  { name: 'Roku',          file: 'roku.svg' },
  { name: 'PlayStation 5', file: 'playstation5.svg' },
  { name: 'LG',            file: 'lg.svg' },
  { name: 'Samsung',       file: 'samsung.svg' },
  { name: 'Sony',          file: 'sony.svg' },
  { name: 'Bose',          file: 'bose.svg' },
  { name: 'Denon',         file: 'denon.svg' },
  { name: 'Yale',          file: 'yale.svg' },
  { name: 'Sonos',         file: 'sonos.svg' },
];

export default function BrandWall() {
  return (
    <section aria-labelledby="brands" className="bg-[var(--color-surface)]/40 py-16 sm:py-20">
      <Container>
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="text-sm tracking-[0.2em] uppercase text-white/60">
            Works with Control4 • ერთ სისტემაში, ათასობით მოწყობილობა
          </p>
          <h2 id="brands" className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
            Works with <span className="text-[var(--color-primary)]">Control4</span>
          </h2>
          <p className="mt-3 max-w-3xl text-white/70">
            Your system integrates popular devices—manage them with a tap, voice, or full automation.
            <span className="text-white/80"> • თქვენი Control4 სისტემა მუშაობს წამყვან ბრენდებთან სინქრონში.</span>
          </p>
        </div>

        {/* Grid (renders only what exists in BRANDS) */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10">
          {BRANDS.map((b) => (
            <li key={b.name} className="flex items-center justify-center">
              <Image
                src={`/logos/${b.file}`}
                alt={b.name}
                width={b.width ?? 160}
                height={b.height ?? 64}
                // visual balance for dark bg; SVGs stay crisp
                className="opacity-70 contrast-125 brightness-200 hover:opacity-100 transition-opacity duration-200"
                priority={false}
              />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-white/50">
          Logos are trademarks of their respective owners. Shown for compatibility context only.
        </p>
      </Container>
    </section>
  );
}