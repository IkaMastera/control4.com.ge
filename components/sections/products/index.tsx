'use client';

import { showcaseProducts } from "@/data/showcase-products";
import ShowcaseHero from './showcase-hero';
import ProductDockPlaceholder from './product-dock';
import ProductSection from './product-section';
import ProductSeparator from './separator';

export default function ProductsShowcaseSection() {
  return (
    <section aria-label="Control4 Product Showcase" className="text-white pb-20 space-y-10 md:space-y-14">
      {/* 1) Full-width hero */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <ShowcaseHero />
      </div>

      {/* 2) Dock (full-width band) */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <ProductDockPlaceholder
            items={showcaseProducts.map(p => ({
              id: p.id, name: p.name, slug: p.slug, thumb: p.thumb
            }))}
          />
        </div>
      </div>

      {/* 3) Product cards (with padding) */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {showcaseProducts.map((p, idx) => (
          <div key={p.id}>
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
          </div>
        ))}
      </div>
    </section>
  );
}