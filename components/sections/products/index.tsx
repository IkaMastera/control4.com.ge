'use client';

import ShowcaseHero from './showcase-hero';
import ProductSection from './product-section';
import ProductSeparator from './separator';
import { showcaseProducts } from '@/data/showcase-products';
import ProductDockMagnetic, { type DockItem } from './product-dock';
import Reveal from '@/components/ui/reveal';

type ShowcaseItem = typeof showcaseProducts[number];

export default function ProductsShowcaseSection() {
  const dockItems: DockItem[] = showcaseProducts.map((p: ShowcaseItem) => ({
    id: String(p.id ?? p.slug ?? p.name),
    name: p.name,
    slug: p.slug,
    thumb: p.thumb || p.heroImage || '/images/placeholder.jpg',
  }));

  return (
    <section aria-label="Control4 Product Showcase" className="text-white pb-20 space-y-10 md:space-y-14">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Reveal y={24}>
          <ShowcaseHero />
        </Reveal>
      </div>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <Reveal y={24} delay={80}>
            <ProductDockMagnetic
              items={dockItems}
              cardWidth={260}
              mediaHeight={160}
            />
          </Reveal>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {showcaseProducts.map((p, idx) => (
          <Reveal key={p.id} y={28}>
            <ProductSection
              id={p.id}
              slug={p.slug}
              name={p.name}
              summary={p.summary}
              bullets={p.bullets}
              heroImage={p.heroImage}
              ctaLabel={p.ctaLabel}
              topic={p.topic}
              index={idx}
            />
            {idx < showcaseProducts.length - 1 && <ProductSeparator />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}