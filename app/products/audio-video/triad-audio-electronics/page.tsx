"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* --- SIMPLE ANIMATION VARIANTS --- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.08 * (custom ?? 0),
    },
  }),
};

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* --- TYPES --- */

type TriadItem = {
  id: string;
  name: string;
  label: string;
  body: string;
  specHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

/* --- DATA (TEXT PARAPHRASED BUT SAME MEANING) --- */

const TRIAD_ITEMS: TriadItem[] = [
  {
    id: "amplifiers",
    name: "Amplifiers",
    label: "Clean, controlled power for every zone",
    body:
      "For single rooms or many audio zones, Triad amplifiers supply the stable power your speakers need. " +
      "With different models for different loads and headroom, you can choose the right amp for anything " +
      "from a simple living room to a demanding multi-room system.",
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3f4a906bbc17bc064282_Triad_Amps_Datasheet.pdf",
    imageSrc: "/images/products/triad-audio-electronics/amplifiers.webp",
    imageAlt: "Rack-mounted Triad amplifiers on a light background.",
  },
  {
    id: "streaming-amps",
    name: "Streaming Amplifiers",
    label: "High-resolution audio without the cable mess",
    body:
      "Triad streaming amplifiers bring powerful, detailed sound straight from your favourite services and " +
      "sources. They are built for high-resolution playback while keeping wiring simple, so you do not need " +
      "extra boxes or long analog runs around the home.",
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3f6830fec6cf3d214d1e_Streaming%20Amplifiers%20.pdf",
    imageSrc: "/images/products/triad-audio.png",
    imageAlt: "Compact Triad streaming amplifier on a neutral background.",
  },
  {
    id: "matrix-switches",
    name: "Matrix Switches",
    label: "Route audio anywhere, stay perfectly in sync",
    body:
      "Triad matrix switches let you send high-quality audio from many sources to many rooms at once. " +
      "They keep levels matched and routing clear, so every Triad speaker in the system receives the " +
      "right signal, optimised for how the space is designed and used.",
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3f76c89772dab9d3a902_Triad%20Audio%20Matrix%20Switches_Datasheet.pdf",
    imageSrc: "/images/products/triad-audio-electronics/triad-matrix.webp",
    imageAlt: "Triad audio matrix switch with many input and output ports.",
  },
];

/* --- PAGE COMPONENT --- */

export default function TriadAudioElectronicsPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.2),rgba(15,23,42,1))]" />

      <Container className="relative z-10 pb-20 pt-10 lg:pb-28 lg:pt-16">
        {/* BACK LINK */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
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
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-[16/9] w-full">
              {/* replace src with your Gemini 3 Pro hero image */}
              <Image
                src="/images/products/triad-audio-electronics/triad-audio-electronics-bg.webp"
                alt="Triad audio electronics hero shot."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Triad Audio Electronics
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Power, clarity, and control for every speaker zone
                </h1>
                <p className="max-w-xl text-xs text-slate-300/80 sm:text-sm">
                  Amplifiers, streaming amps, and matrix switches designed to
                  work together with Triad speakers and the Control4 platform,
                  so music fills every space cleanly and reliably.
                </p>
              </div>
            </div>
          </motion.div>

          {/* hero text */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Triad in the system
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Triad electronics are built to be the audio backbone of a
              Control4 project. They keep power clean, routing organised, and
              sources easy to manage, from background music to cinema-level
              sound.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              In a finished rack, amplifiers, streaming amps, and matrix
              switches behave like one system: simple to control for the
              customer, and predictable for installers when they need to grow,
              service, or tune the project later.
            </p>
          </motion.div>
        </div>

        {/* TRIAD CARDS */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {TRIAD_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              custom={index}
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/80 shadow-[0_20px_60px_rgba(2,6,23,0.9)]"
            >
              {/* image */}
              {item.imageSrc && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                </div>
              )}

              {/* text block */}
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <div>
                  <h2 className="text-base font-semibold text-sky-50">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-sky-400/80">
                    {item.label}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-200/85">
                  {item.body}
                </p>

                {/* pin spec link at bottom of card */}
                {item.specHref && (
                  <div className="mt-auto pt-3">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.specHref}
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
