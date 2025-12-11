"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* --- ANIMATIONS (typed correctly, no TS errors) --- */

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

type StoryCard = {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

type ProductCard = {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  specHref?: string;
};

/* --- DATA --- */

// 4 big story cards
const STORY_CARDS: StoryCard[] = [
  {
    id: "engineered-performance",
    title: "Engineered for Performance",
    body:
      "Triad's acoustic philosophy is simple: reproduce sound as faithfully as possible. Speakers are voiced to sound completely natural and neutral in the vocal range, with spacious, detailed high frequencies. You are not meant to hear the speaker itself, only the performance. The result is the legendary Triad sound – clarity, accuracy and detail that reveal everything in the mix, from subtle ambience to explosive effects.",
    imageSrc: "/images/products/triad-speakers/triad-speaker1.webp",
    imageAlt: "Triad speakers in a dark listening room.",
  },
  {
    id: "custom-built",
    title: "Custom-Built Speakers",
    body:
      "Triad offers complete customization across architectural, on-wall and in-room loudspeakers. Every project is different, so speakers are built-to-order for the exact space – from cabinet dimensions and mounting, to finishes that match walls, millwork or furniture. What never changes is the sound: even the most complex custom pieces still deliver reference-grade Triad performance.",
    imageSrc: "/images/products/triad-speakers/triad-speaker2.webp",
    imageAlt: "Close-up of custom-built Triad speakers.",
  },
  {
    id: "designed-usa",
    title: "Designed and Built in the USA",
    body:
      "For more than 40 years, Triad speakers have been designed and manufactured in Portland, Oregon. Engineering, fabrication and assembly under one roof allows tight control over quality and consistency. This in-house process lets Triad focus on what matters most: spectacular sound, beautiful industrial design, and custom options that make each system a perfect fit for the client and the room it lives in.",
    imageSrc: "/images/products/triad-speakers/triad-speaker3.webp",
    imageAlt: "Triad factory in Portland, Oregon.",
  },
  {
    id: "immersive-home-theater",
    title: "Immersive Home Theater Sound",
    body:
      "Triad delivers immersive entertainment in dedicated theaters and media rooms. Solutions support Dolby Atmos, DTS:X and Auro-3D with carefully engineered sealed-box designs that keep sound precise and controlled. Triad Design Services can specify the ideal layout and speakers for your room, tuning the system to the exact dimensions and seating layout of the space.",
    imageSrc: "/images/products/triad-speakers/triad-speaker5.webp",
    imageAlt: "Home theater with Triad surround system.",
  },
];

// 3 product-style cards
const PRODUCT_CARDS: ProductCard[] = [
  {
    id: "custom-soundbars",
    title: "Custom Soundbars",
    body:
      "Triad’s handcrafted soundbars pair beautifully with any TV, providing far better sound than the TV speakers. Built-to-order up to 86\" long, with custom paint matching and real-wood veneers, they blend into walls, millwork and decor while delivering powerful, detailed audio for media rooms, family rooms and bedrooms.",
    imageSrc: "/images/products/triad-speakers/triad-speaker6.webp",
    imageAlt: "Custom Triad soundbar mounted under a TV.",
    specHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3dc26c9c3c8f6dc7bd06_Triad_Soundbar_Datasheet.pdf",
  },
  {
    id: "every-room-audio",
    title: "Every Room Audio",
    body:
      "Triad multi-room speakers are engineered to exact specifications and carefully assembled for consistent, high-quality sound in every space – from the kitchen to the garage and even the bathroom. In-ceiling, in-wall, on-wall and in-room models let you place great sound anywhere in and around the home.",
    imageSrc: "/images/products/triad-speakers/triad-speaker7.webp",
    imageAlt: "In-ceiling and in-wall Triad speakers in a home.",
  },
  {
    id: "outdoor-audio",
    title: "Outdoor Audio",
    body:
      "Triad amplifier and speaker combinations bring rich, even sound to patios, gardens and large estates. Ultra-Wide Dispersion drivers give smooth coverage without loud hot spots, often with fewer speakers. Enjoy music while entertaining, relaxing, or keeping an ear on the game – all with sound that feels natural outdoors.",
    imageSrc: "/images/products/triad-speakers/triad-speaker4.webp",
    imageAlt: "Outdoor Triad speakers in a landscaped garden.",
  },
];

export default function TriadSpeakersPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glow  */}
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

        {/* HERO – using your triad-speakers.webp image */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] lg:items-center">
          {/* hero media */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-sky-500/25 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/products/triad-speakers.webp"
                alt="Triad speakers hero visual."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Speakers
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Triad Speakers
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  High-performance loudspeakers for every room, theater and
                  outdoor space – tuned to disappear into the room and leave
                  only the sound.
                </p>
              </div>
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
              World-class loudspeaker engineering
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Triad loudspeakers bring cinema-grade performance into real homes
              without compromise. From Dolby Atmos theater systems to discreet
              in-ceiling speakers for living spaces, Triad focuses on accurate,
              controlled sound that feels natural at any level.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              With in-house design and manufacturing in Portland, Oregon, every
              speaker is tuned, finished and assembled to tight standards. The
              result is a system that is easy to live with day to day and still
              delivers serious impact when it is time to turn things up.
            </p>
          </motion.div>
        </div>

        {/* 4 story cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerGrid}
          className="mt-16 grid gap-8 lg:grid-cols-2"
        >
          {STORY_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/85 p-6 shadow-[0_22px_60px_rgba(2,6,23,0.9)] sm:p-7"
            >
              {/* image strip at top */}
              <div className="mb-4 -mx-4 -mt-4 h-28 overflow-hidden rounded-t-3xl border-b border-sky-500/10 bg-slate-900/80 sm:-mx-5 sm:h-32">
                {card.imageSrc ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt ?? card.title}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-slate-950/60" />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-[0.7rem] uppercase tracking-[0.22em] text-slate-500/70">
                    Image coming soon
                  </div>
                )}
              </div>

              <h2 className="text-base font-semibold text-sky-50">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                {card.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* product cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerGrid}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {PRODUCT_CARDS.map((card) => (
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
                <h3 className="text-sm font-semibold text-sky-50">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                  {card.body}
                </p>

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

        {/* Visit Triad CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 flex flex-col items-center rounded-3xl border border-sky-500/15 bg-slate-900/60 px-6 py-10 text-center sm:px-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            Visit the Triad website
          </p>
          <p className="mt-3 max-w-xl text-sm text-slate-200/80">
            Learn more about Triad speakers, finishes and full product lines
            directly from the manufacturer.
          </p>
          <Link
            href="https://www.triadspeakers.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center rounded-full border border-sky-400/70 px-8 py-2.5 text-sm font-medium text-sky-100 hover:border-sky-300 hover:text-sky-50"
          >
            Visit Triad
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}