'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ShowcaseHero() {
  return (
    <section
      aria-label="Product Showcase Hero"
      className="relative isolate overflow-hidden rounded-3xl bg-black ring-1 ring-white/10"
    >
      <div className="relative aspect-[16/7] w-full">
        <Image
          src="/images/hero.jpg"
          alt="Control4 smart home — cinematic hero"
          fill
          priority
          className="object-cover opacity-95"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
        <div className="pointer-events-auto max-w-2xl">
          <p className="text-sm uppercase tracking-wide text-white/70">Control4</p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Inspired by the home. Crafted for life. Tailored to you.
          </h2>
          <p className="mt-3 text-white/80 max-w-xl">
            A single, elegant system that connects lighting, audio, video, comfort, and security into one experience.
          </p>

          <Link
            href="#products-dock"
            className="btn-glow btn-glow--trio mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Discover Products
          </Link>
        </div>
      </div>
    </section>
  );
}