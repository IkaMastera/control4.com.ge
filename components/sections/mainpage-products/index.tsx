'use client';

import ShowcaseHero from './showcase-hero';
import ProductSection from './product-section';
import ProductSeparator from './separator';
import { showcaseProducts } from '@/data/showcase-products';
import ProductDockMagnetic, { type DockItem } from './product-dock';
import Reveal from '@/components/ui/reveal';
import ProductScrollBackground from './product-scroll-background';

type ShowcaseItem = (typeof showcaseProducts)[number];

export default function ProductsShowcaseSection() {
  const dockItems: DockItem[] = showcaseProducts.map((p: ShowcaseItem) => ({
    id: String(p.id ?? p.slug ?? p.name),
    name: p.name,
    slug: p.slug,
    thumb: p.thumb || p.heroImage || '/images/placeholder.jpg',
  }));

  return (
    <section
      aria-label="Control4 Product Showcase"
      className="
        relative overflow-hidden
        text-white
        pb-20
      "
    >
      {/* BACKGROUND FOR THE WHOLE PRODUCTS AREA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Base dark background */}
        <div className="absolute inset-0 bg-[#02030a]" />

        {/* Strong blue glow behind products (main stage) */}
        <div
          className="
            absolute left-[-12%] top-[12%]
            h-[70%] w-[70%]
            bg-[radial-gradient(circle_at_left,
              rgba(0,86,184,0.95) 0%,
              rgba(0,86,184,0.55) 38%,
              transparent 78%
            )]
            opacity-90 blur-3xl
          "
        />

        {/* Blue floor under all product cards */}
        <div
          className="
            absolute inset-x-[-12%] -bottom-16 h-48
            bg-[radial-gradient(circle_at_bottom,
              rgba(0,86,184,0.85) 0%,
              rgba(0,86,184,0.45) 40%,
              transparent 80%
            )]
            opacity-90 blur-3xl
          "
        />

        {/* Very soft global tint so middle is not fully black */}
        <div
          className="
            absolute inset-x-[-10%] top-[35%] h-[40%]
            bg-[radial-gradient(circle_at_center,
              rgba(0,86,184,0.25),
              transparent 70%
            )]
            opacity-80 blur-[120px]
          "
        />
      </div>

      {/* HERO STRIP */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Reveal y={24}>
          <ShowcaseHero />
        </Reveal>
      </div>

      {/* PRODUCT DOCK (MAGNETIC STRIP) */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <Reveal y={24} delay={80}>
            <ProductScrollBackground
              id="products-dock"
              title="PRODUCT CATEGORIES"
            >
              <ProductDockMagnetic
                items={dockItems}
                cardWidth={260}
                mediaHeight={160}
              />
            </ProductScrollBackground>
          </Reveal>
        </div>
      </div>

      {/* INDIVIDUAL PRODUCT SECTIONS */}
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
              href={p.href}
            />
            {idx < showcaseProducts.length - 1 && <ProductSeparator />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}