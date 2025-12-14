"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

// simple fade-up animation
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

type TouchscreenCard = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
  specHref?: string;
};

const TOUCHSCREEN_CARDS: TouchscreenCard[] = [
  {
    id: "features",
    title: "Always-On, Purpose-Built Control",
    body:
      "Unlike phones or tablets, T4 touchscreens are always connected and ready. A quick glance shows the status of the whole property, and a tap gives direct control over lighting, security, music, temperature, and more. In homes, restaurants, boardrooms, and other commercial spaces, they simplify even the most complex AV and automation systems.",
    bullets: [
      "Browse playlists and media with a simple swipe and bold cover art.",
      "Adjust scenes, color-capable lighting, climate and security from a single screen.",
      "Use Access Agent to lock or password-protect controls so only the right people can make changes.",
    ],
    imageSrc: "/images/products/touchscreens/touchscreen1.webp",
    imageAlt: "Control4 touchscreen showing whole-home status.",
  },
  {
    id: "tabletop-inwall",
    title: "Tabletop or In-Wall, 8\" or 10\"",
    body:
      "The 8\" and 10\" T4 touchscreens bring total system control to where you actually live and work. Their clean tablet-style design and crisp high-resolution graphics look good on a table, a counter or mounted in a hallway. They are ideal for whole-home communication, intercom and everyday control.",
    bullets: [
      "Available as portable tabletop models on a rechargeable dock or as in-wall touchscreens.",
      "Glossy black or white finishes to match modern interiors.",
      "Perfect for high-traffic areas where quick access to lighting, security and intercom matters.",
    ],
    imageSrc: "/images/products/touchscreens/touchscreen2.webp",
    imageAlt: "Tabletop Control4 touchscreen on a counter.",
    specHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e30db1c02a99481189988_t4-series-touchscreen-data-sheet-rev-d.pdf",
  },
];

export default function TouchscreensPage() {
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
                src="/images/products/touchscreens/touchscreen-hero.webp"
                alt="Control4 T4 touchscreen on a table."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Touchscreens
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  T4 Touchscreens
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  Dedicated, always-on control for the entire home or business —
                  designed to be beautiful on the wall or on the table.
                </p>
              </div>
            </div>
          </motion.div>

          {/* hero copy – your long paragraph, trimmed */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Complete view of your home
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Control4 Touchscreens offer a complete view and dedicated control
              of your entire property. Unlike traditional tablets or phones,
              there is no app to find and launch — control is instantaneous.
              Manage lighting, security, music, TVs, temperature, shades and
              more from one place.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              Bright high-resolution screens, fast processors, advanced
              microphone arrays and built-in speakers make them ideal for
              security cameras, video doorbells and room-to-room intercom. Choose
              8&quot; or 10&quot; models in glossy black or white, as tabletop or
              in-wall, to fit each space perfectly.
            </p>
          </motion.div>
        </div>

        {/* cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-8 lg:grid-cols-2"
        >
          {TOUCHSCREEN_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
            >
              {/* image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>

              {/* text */}
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-sky-50">
                  {card.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-200/85">
                  {card.body}
                </p>
                {card.bullets && (
                  <ul className="mt-1 space-y-1.5 text-sm text-slate-300/90">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-sky-400/80" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {card.specHref && (
                  <div className="mt-4 pt-1">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={card.specHref}
                      className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-sky-300"
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