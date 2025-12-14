"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* --- ANIMATIONS (typed, no function variants) --- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* --- TYPES --- */

type ComfortCard = {
  id: string;
  title: string;
  intro: string;
  bullets?: string[];
  imageSrc?: string;
  imageAlt?: string;
  specHref?: string;
};

/* --- DATA --- */

const COMFORT_CARDS: ComfortCard[] = [
  {
    id: "fan-speed",
    title: "Variable Fan Speed Controllers",
    intro:
      "Enjoy quiet, precise fan control with a clean keypad that looks great in modern interiors. Variable Fan Speed Controllers bring ceiling fans into the same smart scenes and schedules as the rest of your home.",
    bullets: [
      "Integrate fans into climate schedules, energy management and automation scenes.",
      "Four fan speed buttons plus a dedicated Off button for simple, intuitive control.",
      "Continuously measures the energy used by the fan for better insight and efficiency.",
      "Available in up to nine designer colours and finishes to match your keypads and décor.",
    ],
    imageSrc: "/images/products/comfort-controls/comfort-control2.webp",
    imageAlt: "Smart keypad controlling a ceiling fan.",
    specHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3bfe4e36df04abce6583_156_24_LuxLighting_SpecSheet_C4-L-4SF120.pdf",
  },
  {
    id: "fireplace-switch",
    title: "Fireplace Switches",
    intro:
      "The Control4 Lux Fireplace Switch adds elegant, wireless control to gas fireplaces and other millivolt-powered systems. A smart relay inside the keypad makes it easy to bring the fireplace into scenes and safety logic.",
    bullets: [
      "Independently isolated relay for millivolt systems or DC power rail loads.",
      "Beautiful, low-profile keypad that matches the rest of the Control4 lighting range.",
      "Trigger the fireplace from scenes like Relax, Movie Night or Good Morning.",
      "Helps improve safety by tying the fireplace into occupancy and lockout logic.",
    ],
    imageSrc: "/images/products/comfort-controls/comfort-control3.webp",
    imageAlt: "Modern fireplace controlled by a smart switch.",
    specHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3c1ecc0584d5fa4bd36f_156_24_LuxLighting_SpecSheet_C4-L-FSW.pdf",
  },
];

export default function ComfortControlsPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.25),rgba(15,23,42,1))]" />

      <Container className="relative z-10 pb-20 pt-10 lg:pb-28 lg:pt-16">
        {/* back link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-medium text-sky-400/80 hover:text-sky-300"
          >
            ← Back to product catalog
          </Link>
        </motion.div>

        {/* HERO */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] lg:items-center">
          {/* hero image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-sky-500/25 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/products/comfort-controls/comfort-control1.webp"
                alt="Bright living room with a modern fireplace."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
            </div>
          </motion.div>

          {/* hero copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Comfort Controls
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Imagine walking into your home and feeling it respond to you — the
              ceiling fan starts to spin, and the fireplace flickers to life,
              wrapping the room in warmth. Comfort controls like automated fans
              and fireplace systems add convenience, improve energy use, and
              create a welcoming atmosphere.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              With Control4 comfort devices, these little details become part of
              your scenes and schedules, working quietly in the background so
              every room feels just right when you step inside.
            </p>
          </motion.div>
        </div>

        {/* PRODUCT CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerGrid}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {COMFORT_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
            >
              {/* image area */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[0.7rem] uppercase tracking-[0.22em] text-slate-500/70">
                    Image coming soon
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>

              {/* text */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-sky-50">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                  {card.intro}
                </p>

                {card.bullets && card.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-200/85">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-sky-400/80" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {card.specHref && (
                  <div className="mt-4 mt-auto pt-1">
                    <Link
                      href={card.specHref}
                      className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-sky-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View spec sheet
                      <span className="ml-1 text-xs">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
