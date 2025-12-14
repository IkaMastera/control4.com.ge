"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/container";

/* ---------------- TYPES ---------------- */

type VariantId = "lux" | "contemporary";

type MediaBlock =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; srcMp4: string; poster?: string };

type CardItem = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  href?: string; 
};

type SpecLink = {
  id: string;
  label: string;
  href: string;
  targetBlank?: boolean;
};

type PageVariant = {
  label: string;
  hero: {
    title: string;
    body: string[];
    cta: { label: string; href: string; targetBlank?: boolean };
    imageSrc: string;
    imageAlt: string;
  };
  media: {
    title: string;
    subtitle?: string;
    block: MediaBlock;
  };
  cardsHeading: { title: string; body?: string };
  cards: CardItem[];
  specsHeading: { title: string; body?: string };
  specs: SpecLink[];
};

/* ---------------- DATA ---------------- */
const VARIANTS: Record<VariantId, PageVariant> = {
  lux: {
    label: "Lux",
    hero: {
      title: "BRINGING ELEGANCE TO LIGHT",
      body: [
        "Elegance manifests in various ways, with its true essence rooted not just in exquisite materials or precise craftsmanship but in the feelings it inspires. Enter Lux, a collection of keypads, dimmers, switches, and outlets designed to enhance luxury spaces.",
        "Lux showcases a refined aesthetic that seamlessly blends style and functionality. It provides an extensive selection of design options, including premium metal faceplates and a variety of finishes and colors. The distinctive buttons not only improve usability but also enhance the overall look.",
        "With metallic plate choices like Antique Bronze, Chrome, Satin Nickel, and Venetian Bronze, you can create stunning designs. Ultimately, this combination of beauty and functionality creates a lasting sense of sophistication and emotional connection in every space.",
      ],
      cta: { label: "View Look Book", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3e6a69d43b24d7c77270_Control4%20Lux%20Spec%20Guide.pdf" },
      imageSrc: "/images/products/lighting/lux-hero.webp",
      imageAlt: "Lux premium lighting controls hero image",
    },

    media: {
      title: "Let There Be Lux",
      subtitle: "A refined lighting experience designed for premium spaces.",
      block: {
        type: "image",
        src: "/images/products/lighting/lux-hero2.webp",
        alt: "Lux lifestyle image",
      },
    },

    cardsHeading: {
      title: "Lux Components",
      body: "A cohesive lineup of keypads, dimmers, switches, outlets, and centralized lighting options.",
    },

    cards: [
      {
        id: "lux-keypads",
        title: "Lux Keypads",
        body: "Transform a standard light switch into a fully customizable keypad dimmer or switch, combining flexible control with premium design.",
        imageSrc: "/images/products/lighting/lux1.webp",
        imageAlt: "Lux keypads product visual",
      },
      {
        id: "lux-universal-dimmers",
        title: "Lux Universal Dimmers",
        body: "A dimmer for virtually any load type, reducing guesswork and staying compatible even if the load changes later.",
        imageSrc: "/images/products/lighting/lux2.webp",
        imageAlt: "Lux universal dimmer product visual",
      },
      {
        id: "lux-switches",
        title: "Lux Switches",
        body: "On/off control for virtually every type of load, including LEDs, transformers, fluorescents, and motors like fans or ventilation.",
        imageSrc: "/images/products/lighting/lux3.webp",
        imageAlt: "Lux switch product visual",
      },
      {
        id: "lux-wired-keypad",
        title: "Lux Wired Keypad",
        body: "An elegant interface for lights, scenes, music, and security with custom backlit engraving and deep configuration flexibility.",
        imageSrc: "/images/products/lighting/lux4.webp",
        imageAlt: "Lux wired keypad product visual",
      },
      {
        id: "lux-outlets",
        title: "Lux Outlets",
        body: "Designed to complement Lux devices for a cohesive look—especially in kitchens and bathrooms for a polished, refined finish.",
        imageSrc: "/images/products/lighting/lux5.webp",
        imageAlt: "Lux outlets product visual",
      },
      {
        id: "lux-central-modules",
        title: "Centralized Lighting Modules",
        body: "Moves load control to a central panel to eliminate wall clutter while keeping full control from keypads, touchscreens, app, and remotes.",
        imageSrc: "/images/products/lighting/lux6.webp",
        imageAlt: "Centralized lighting modules visual",
      },
      {
        id: "lux-central-panels",
        title: "Centralized Lighting Panels",
        body: "2-slot and 5-slot panels house centralized components with easy access to status LEDs and load testing for maintenance.",
        imageSrc: "/images/products/lighting/lux7.webp",
        imageAlt: "Centralized lighting panels visual",
      },
    ],

    specsHeading: {
      title: "Specs & Documents",
      body: "Download technical documents for centralized lighting and panels.",
    },
    specs: [
      { id: "spec-8ch-dimmer", label: "8-Channel Dimmer Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c15f48621fe44737a0e_8-channel-dimmer-data-sheet-rev-f.pdf" },
      { id: "spec-8ch-010v", label: "8-Channel 0-10V Dimmer Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2cad5848747a9d117663_8-channel-0-10v-dimmer-data-sheet-rev-b.pdf" },
      { id: "spec-8ch-relay", label: "8-Channel Relay Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c14ac2821a50958fc0f_8-channel-relay-data-sheet-rev-f.pdf" },
      { id: "spec-8port-switch", label: "8-Port Ethernet Switch Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c14e3f5f57b6c010e8a_8-port-ethernet-switch-data-sheet-rev-b.pdf" },
      { id: "spec-panel", label: "Lighting Panel Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c4ba156111473a61234_2-slot-and-5-slot-panels-data-sheet-rev-a.pdf" },
    ],
  },

  contemporary: {
    label: "Contemporary",
    hero: {
      title: "SMART LIGHTING, PERFECTLY CONTROLLED",
      body: [
        "Smart lighting subtly influences ambiance, complements décor, and adds convenience, security, and energy efficiency.",
        "Brighten or dim a room—or the entire house—with a single touch. Or automate lighting to respond to life without any touch at all.",
        "It’s not just smart. It’s brilliant.",
      ],
      cta: { label: "View Look Book", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2f36e0cc5ae306fb3e09_Control4_Lighting_Solutions_Brochure.pdf" },
      imageSrc: "/images/products/lighting/conteporary-hero.webp",
      imageAlt: "Contemporary smart lighting controls hero image",
    },

    media: {
      title: "Modern Control, Minimal Aesthetic",
      subtitle: "Clean lines, flexible configurations, reliable daily control.",
      block: {
        type: "image",
        src: "/images/products/lighting/conteporary-hero2.webp",
        alt: "Contemporary lifestyle image",
      },
    },

    cardsHeading: {
      title: "Contemporary Components",
      body: "Keypads, dimmers, switches, fan control, outlets, and centralized lighting—built for real-world use.",
    },

    cards: [
      {
        id: "con-keypad-dimmer",
        title: "Keypad Dimmer",
        body: "Configurable to control music, garage doors, security, lights, and more with elegant backlit engraving and premium tactile response.",
        imageSrc: "/images/products/lighting/conteporary1.webp",
        imageAlt: "Wireless keypad dimmer product visual",
      },
      {
        id: "con-wired-keypad",
        title: "Wired Keypad",
        body: "Flexible button configuration with a stunning UI for lights, scenes, music, and security—endless possibilities.",
        imageSrc: "/images/products/lighting/conteporary2.webp",
        imageAlt: "Wired keypad product visual",
      },
      {
        id: "con-adaptive-phase-dimmer",
        title: "Adaptive Phase Dimmer",
        body: "The dimmer for virtually any load type, compatible with many dimmable LEDs, halogens, transformers, and fluorescents.",
        imageSrc: "/images/products/lighting/conteporary3.webp",
        imageAlt: "Adaptive phase dimmer product visual",
      },
      {
        id: "con-switches",
        title: "Switches",
        body: "Handles high inrush loads and supports on/off control for a wide range of lighting and motor loads.",
        imageSrc: "/images/products/lighting/conteporary4.webp",
        imageAlt: "Switch product visual",
      },
      {
        id: "con-fan-speed",
        title: "Fan Speed Controller",
        body: "Quiet fan speed control with dedicated buttons and easy integration into schedules, energy management, and automation events.",
        imageSrc: "/images/products/lighting/conteporary5.webp",
        imageAlt: "Fan speed controller product visual",
      },
      {
        id: "con-plugin",
        title: "Wireless Plug-In Dimmer and Switch",
        body: "A simple way to control plug-in lights and devices—perfect for expanding rooms and functions over time.",
        imageSrc: "/images/products/lighting/conteporary6.webp",
        imageAlt: "Plug-in dimmer and switch product visual",
      },
      {
        id: "con-outlet-switch",
        title: "Outlet Switch",
        body: "Invisibly control lamps and plug-in devices with one always-on outlet and one switched outlet, plus Zigbee built-in.",
        imageSrc: "/images/products/lighting/conteporary7.webp",
        imageAlt: "Outlet switch product visual",
      },
      {
        id: "con-central-modules",
        title: "Centralized Lighting Modules",
        body: "Centralizes load control for cleaner walls while maintaining full control from interfaces, scenes, and automation.",
        imageSrc: "/images/products/lighting/conteporary8.webp",
        imageAlt: "Centralized lighting modules visual",
      },
      {
        id: "con-central-panels",
        title: "Centralized Lighting Panels",
        body: "2-slot and 5-slot panels for centralized lighting systems with easy access to channel status and load testing.",
        imageSrc: "/images/products/lighting/conteporary9.webp",
        imageAlt: "Centralized lighting panels visual",
      },
    ],

    specsHeading: {
      title: "Specs & Documents",
      body: "Download technical documents for centralized lighting and panels.",
    },
    specs: [
      { id: "spec-8ch-dimmer", label: "8-Channel Dimmer Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c15f48621fe44737a0e_8-channel-dimmer-data-sheet-rev-f.pdf" },
      { id: "spec-8ch-010v", label: "8-Channel 0-10V Dimmer Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2cad5848747a9d117663_8-channel-0-10v-dimmer-data-sheet-rev-b.pdf" },
      { id: "spec-8ch-relay", label: "8-Channel Relay Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c14ac2821a50958fc0f_8-channel-relay-data-sheet-rev-f.pdf" },
      { id: "spec-8port-switch", label: "8-Port Ethernet Switch Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c14e3f5f57b6c010e8a_8-port-ethernet-switch-data-sheet-rev-b.pdf" },
      { id: "spec-panel", label: "Lighting Panel Specs", href: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2c4ba156111473a61234_2-slot-and-5-slot-panels-data-sheet-rev-a.pdf" },
    ],
  },
};

/* ---------------- UI HELPERS ---------------- */

function SmartMedia({ block }: { block: MediaBlock }) {
  if (block.type === "video") {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/80 ring-1 ring-slate-900/70">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={block.poster}
        >
          <source src={block.srcMp4} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/80 ring-1 ring-slate-900/70">
      <Image src={block.src} alt={block.alt} fill className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function LightingKeypadsPage() {
  const [variantId, setVariantId] = useState<VariantId>("lux");

  const v = useMemo(() => VARIANTS[variantId], [variantId]);

  return (
    <section className="relative overflow-hidden border-t border-sky-500/15 bg-slate-950">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)] opacity-70" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),transparent_60%)] opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.12),rgba(2,6,23,1))]" />

        <Container className="relative z-10 py-10 lg:py-16">
            {/* back link */}
            <div className="mb-6">
            <Link href="/products" className="text-sm text-sky-300/90 hover:text-sky-200">
                ← Back to Product Catalog
            </Link>
            </div>

            {/* variant switch */}
            <div className="mb-8 flex items-center gap-2">
            {(["lux", "contemporary"] as VariantId[]).map((id) => {
                const active = variantId === id;
                return (
                <button
                    key={id}
                    type="button"
                    onClick={() => setVariantId(id)}
                    className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    active
                        ? "border-sky-400/40 bg-sky-400/10 text-sky-50"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/8 hover:text-sky-50",
                    ].join(" ")}
                >
                    {VARIANTS[id].label}
                </button>
                );
            })}
            </div>

            {/* HERO */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/70 ring-1 ring-slate-900/70">
                <div className="relative aspect-[16/10] w-full">
                    <Image
                    src={v.hero.imageSrc}
                    alt={v.hero.imageAlt}
                    fill
                    className="object-cover"
                    priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sky-400/80">
                Smart Lighting
                </p>

                <h1 className="mt-3 text-2xl font-semibold text-sky-50">{v.hero.title}</h1>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300/85">
                {v.hero.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                ))}
                </div>

                <div className="mt-6">
                <Link
                    rel="noopener noreferrer"
                    href={v.hero.cta.href}
                    target={v.hero.cta.targetBlank ? "_blank" : undefined}
                    className="inline-flex items-center rounded-xl border border-sky-400/25 bg-sky-400/10 px-4 py-2.5 text-sm font-medium text-sky-100 hover:bg-sky-400/15"
                >
                    {v.hero.cta.label}
                    <span className="ml-2 text-xs">→</span>
                </Link>
                </div>
            </div>
            </div>

            {/* MEDIA SECTION */}
            <div className="mt-14">
            <h2 className="text-lg font-semibold text-sky-50">{v.media.title}</h2>

            {v.media.subtitle ? (
                <p className="mt-2 max-w-3xl text-sm text-slate-400/85">{v.media.subtitle}</p>
            ) : null}

            <div className="mt-5">
                <SmartMedia block={v.media.block} />
            </div>
            </div>

            {/* CARDS */}
            <div className="mt-16">
            <div className="mb-7">
                <h2 className="text-lg font-semibold text-sky-50">{v.cardsHeading.title}</h2>
                {v.cardsHeading.body ? (
                <p className="mt-2 max-w-3xl text-sm text-slate-400/85">
                    {v.cardsHeading.body}
                </p>
                ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {v.cards.map((c) => (
                <article
                    key={c.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-sky-500/12 bg-slate-950/80 p-4 shadow-[0_18px_40px_rgba(2,6,23,0.9)] ring-1 ring-slate-900/70 transition-transform duration-200 hover:-translate-y-[3px]"
                >
                    <div className="mb-3 overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-800/70">
                    <div className="relative aspect-[16/10] w-full">
                        <Image src={c.imageSrc} alt={c.imageAlt} fill className="object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    </div>
                    </div>

                    <h3 className="text-sm font-semibold text-sky-50">{c.title}</h3>
                    <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-slate-300/85">
                    {c.body}
                    </p>

                    {c.href ? (
                    <div className="mt-3">
                        <Link
                        href={c.href}
                        className="inline-flex items-center text-[0.86rem] font-medium text-sky-400 transition-colors group-hover:text-sky-300"
                        >
                        Explore
                        <span className="ml-1 inline-block translate-x-0 text-xs transition-transform group-hover:translate-x-0.5">
                            →
                        </span>
                        </Link>
                    </div>
                    ) : null}
                </article>
                ))}
            </div>
            </div>

            {/* SPECS / DOWNLOADS */}
            <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-lg font-semibold text-sky-50">{v.specsHeading.title}</h2>

            {v.specsHeading.body ? (
                <p className="mt-2 max-w-3xl text-sm text-slate-400/85">{v.specsHeading.body}</p>
            ) : null}

            <div className="mt-6 grid gap-3 md:grid-cols-2">
                {v.specs.map((s) => (
                <Link
                    rel="noopener noreferrer"
                    key={s.id}
                    href={s.href}
                    target={s.targetBlank ? "_blank" : undefined}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/8"
                >
                    <span>{s.label}</span>
                    <span className="text-sky-300">→</span>
                </Link>
                ))}
            </div>
            </div>
        </Container>
    </section>
  );
}