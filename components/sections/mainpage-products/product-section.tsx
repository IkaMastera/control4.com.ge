'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/reveal';

type Props = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
  heroImage: string;
  ctaLabel: string;
  topic: string;
  index: number;
  sticky?: boolean;
};

export default function ProductSection({
  id,
  slug,
  name,
  summary,
  bullets,
  heroImage,
  ctaLabel,
  topic,
  index,
}: Props) {
  const reverse = index % 2 === 1;

  return (
    <section
      id={slug}
      aria-labelledby={`${slug}-title`}
      style={{ scrollMarginTop: 'var(--header-h)' }}
      className="relative py-12"
    >
      <div
        className={`grid items-center gap-8 md:gap-12 md:grid-cols-2 ${
          reverse ? 'md:[&>div:first-child]:order-2' : ''
        }`}
      >
        {/* Media */}
        <Reveal y={22}>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/40">
            <Image
              src={heroImage}
              alt={name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal y={18} delay={90}>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/60">Control4</p>
            <h3 id={`${slug}-title`} className="mt-2 text-2xl md:text-3xl font-semibold">
              {name}
            </h3>
            <p className="mt-3 text-white/80">{summary}</p>

            <ul className="mt-4 space-y-2 text-white/85">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/#contact?topic=${encodeURIComponent(topic)}`}
              className="btn-glow btn-glow--trio mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium"
              aria-label={`${ctaLabel} — ${name}`}
            >
              {ctaLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}