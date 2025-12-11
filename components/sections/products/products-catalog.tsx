"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* ---- TYPES ---- */

type CatalogCategoryId =
  | "all"
  | "audio"
  | "comfort"
  | "controllers"
  | "interfaces"
  | "security"
  | "lighting";

type Product = {
  id: string;
  name: string;
  description: string;
  category: CatalogCategoryId;
  href: string;
  imageSrc?: string; // optional image for the card
  imageAlt?: string; // optional alt text
};

/* ---- DATA ---- */

const CATEGORIES: { id: CatalogCategoryId; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "audio", label: "Audio & Video" },
  { id: "comfort", label: "Comfort" },
  { id: "controllers", label: "Controllers" },
  { id: "interfaces", label: "Interfaces" },
  { id: "security", label: "Security & Surveillance" },
  { id: "lighting", label: "Smart Lighting & Control" },
];

// no TVs, no thermostats, no door stations here
const PRODUCTS: Product[] = [
  {
    id: "triad-audio",
    name: "Triad Audio Electronics",
    category: "audio",
    href: "/products/audio-video/triad-audio-electronics",
    description:
      "High-performance amplifiers and matrices that give clean sound to every room and speaker zone in the home.",
    imageSrc: "/images/products/triad-audio.png",
    imageAlt: "Triad audio electronics stack.",
  },
  {
    id: "triad-speakers",
    name: "Triad Speakers",
    category: "audio",
    href: "/products/audio-video/triad-speakers",
    description:
      "Architectural and in-room speakers tuned for detail, clarity, and even coverage in living rooms, cinemas, and outdoor spaces.",
    imageSrc: "/images/products/triad-speakers-main-catalog.webp",
  },
  {
    id: "vibrant-linear-lighting",
    name: "Vibrant Linear Lighting",
    category: "lighting",
    href: "/products/lighting/vibrant-linear-lighting",
    description:
      "LED strip lighting for coves, stairs, and furniture accents, fully dimmable and tied into scenes for any mood.",
    imageSrc: "/images/products/vibrant-linear-lighting-main-catalog.webp",
  },
  {
    id: "lighting-keypads",
    name: "Keypads & Dimmers",
    category: "lighting",
    href: "/products/lighting/keypads-dimmers",
    description:
      "Smart keypads that replace normal switches and give one-touch scenes like Movie Night, Away, or Good Morning.",
    imageSrc: "/images/products/keypads-main-catalog.webp",
  },
  {
    id: "comfort-controls",
    name: "Comfort Controls",
    category: "comfort",
    href: "/products/comfort/comfort-controls",
    description:
      "Fan and fireplace control that keeps rooms at the right temperature while still saving energy in the background.",
    imageSrc: "/images/products/comfort-control-main-catalog.webp",
  },
  {
    id: "controllers-core",
    name: "Core Controllers",
    category: "controllers",
    href: "/products/controllers/core-controllers",
    description:
      "The brain of the smart home, running all lighting, AV, security, and integrations on one stable and secure platform.",
    imageSrc: "/images/products/controllers-bg.webp",
  },
  {
    id: "touchscreens",
    name: "Touchscreens",
    category: "interfaces",
    href: "/products/interfaces/touchscreens",
    description:
      "Wall and tabletop touchscreens that show the full home UI for lighting, music, security, intercom, and more.",
    imageSrc: "/images/products/touchscreen-main-catalog.webp",
  },
  {
    id: "remotes",
    name: "Halo Remotes",
    category: "interfaces",
    href: "/products/interfaces/halo-remotes",
    description:
      "Premium handheld remotes that control TV, lights, music, and scenes with hard buttons and a bright screen.",
    imageSrc: "/images/products/halo-remote-main-catalog.webp",
  },
  {
    id: "security-suite",
    name: "Cameras & NVR",
    category: "security",
    href: "/products/security/cameras-nvr",
    description:
      "Indoor and outdoor cameras plus recorders that integrate alarms, notifications, and playback into the main app.",
    imageSrc: "/images/products/security-nrv-main-catalog.webp",
  },
  {
    id: "video-doorbells",
    name: "Video Doorbells",
    category: "security",
    href: "/products/security/video-doorbells",
    description:
      "See and speak with visitors from anywhere with smart alerts, motion detection, and seamless integration into your Control4 system.",
    imageSrc: "/images/products/video-doorbell-main-catalog.webp",
    imageAlt: "Control4 video doorbells in black and silver.",
  },
];

/* ---- FRAMER MOTION VARIANTS ---- */

/* cards container – controls stagger for left→right reveal */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.08, // cards come one by one
    },
  },
};

/* each card – slide in from the left */
const cardVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* catalog container – whole rail fades in and then children are staggered */
const catalogContainerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.05,
      staggerChildren: 0.06, // items appear top → down
    },
  },
};

/* catalog item – small slide from top */
const catalogItemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

/* ---- MAIN COMPONENT ---- */

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] =
    useState<CatalogCategoryId>("all");

  // filter cards by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="product-catalog"
      className="relative overflow-hidden border-t border-sky-500/15 bg-slate-950"
    >
      {/* soft glow in background */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.1),rgba(15,23,42,1))]" />

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="mb-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-400/80">
            Product Catalog
          </p>
          <h2 className="mt-3 text-xl font-semibold text-sky-50">
            Browse by category
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400/80">
            Use these sections to jump into detailed product cards. Each card
            links to a dedicated hardware page.
          </p>
        </div>

        <div className="lg:flex lg:items-start lg:gap-10">
          {/* LEFT RAIL */}
          <aside className="mb-10 lg:mb-0 lg:w-64 lg:shrink-0">
            <motion.div
              className="border-l border-sky-500/40 pl-4 lg:sticky lg:top-28"
              variants={catalogContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.nav className="space-y-1 text-sm">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      variants={catalogItemVariants}
                      onClick={() => setActiveCategory(cat.id)}
                      className={[
                        "group flex w-full items-center gap-2 py-1.5 text-left transition-colors",
                        isActive
                          ? "text-sky-50"
                          : "text-slate-400 hover:text-sky-100",
                      ].join(" ")}
                    >
                      {/* small line on the left of each item */}
                      <span
                        className={[
                          "h-px rounded transition-all",
                          isActive
                            ? "w-7 bg-sky-400/90"
                            : "w-4 bg-slate-600/70 group-hover:w-6 group-hover:bg-sky-400/80",
                        ].join(" ")}
                      />
                      <span className="text-[0.82rem] tracking-wide">
                        {cat.label}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.nav>
            </motion.div>
          </aside>

          {/* RIGHT SIDE – cards sit to the right of catalog on desktop */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProducts.map((product) => (
                <motion.article
                  key={product.id}
                  variants={cardVariants}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 190, damping: 20 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sky-500/12 bg-slate-950/80 p-4 shadow-[0_18px_40px_rgba(2,6,23,0.9)] ring-1 ring-slate-900/70"
                >
                  {/* image or placeholder */}
                  {product.imageSrc ? (
                    <div className="mb-3 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-800/70">
                      <div className="relative h-full w-full">
                        <Image
                          src={product.imageSrc}
                          alt={product.imageAlt ?? product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-sky-900/60 ring-1 ring-slate-800/70">
                      <div className="flex h-full w-full items-center justify-center text-[0.68rem] uppercase tracking-[0.2em] text-slate-500/70">
                        Product image
                      </div>
                    </div>
                  )}

                  <h3 className="text-sm font-semibold text-sky-50">
                    {product.name}
                  </h3>

                  <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-slate-300/85">
                    {product.description}
                  </p>

                  <div className="mt-3">
                    <Link
                      href={product.href}
                      className="inline-flex items-center text-[0.86rem] font-medium text-sky-400 transition-colors group-hover:text-sky-300"
                    >
                      Explore
                      <span className="ml-1 inline-block translate-x-0 text-xs transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}