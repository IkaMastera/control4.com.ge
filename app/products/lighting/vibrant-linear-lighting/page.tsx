"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* --- MOTION HELPERS --- */

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

const staggerSection: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* --- TYPES --- */

type InfoCard = {
  id: string;
  title: string;
  body: string;
  body2?: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: string[];
};

/* --- DATA --- */

const PRIMARY_CARDS: InfoCard[] = [
  {
    id: "beyond-bulb",
    title: "Beyond the Bulb",
    body:
      "Control4 Vibrant Lighting solutions shine new light on the potential of any space. Fully integrated temperature, color, and brightness elevate an environment into an automated personal experience.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant1.webp",
    imageAlt: "Modern kitchen with integrated linear lighting accents.",
  },
  {
    id: "daylight",
    title: "Seize the Day with Daylight",
    body:
      "Daylight automatically adjusts the brightness and color temperature of fully tunable white (CCT) LEDs to mimic the natural light cycle of the sun, supporting circadian health.",
    body2:
      "Lights start warm and dim with sunrise, then gradually brighten and cool through the day before warming and dimming again in the evening, matching the natural rhythm of the sun.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant2.webp",
    imageAlt:
      "Different rooms showing changing color temperature throughout the day.",
  },
  {
    id: "multi-dimensional",
    title: "The Multi-Dimensional Lighting Advantage",
    body:
      "The Vibrant Linear Lighting system pairs high-quality LED strips with aluminum extrusions to create a premium diffusion experience.",
    body2:
      "Felt more than it is seen, linear lighting from Vibrant erases harsh shadows and highlights architectural details, adding an accent layer that transforms flat spaces into fully personalized environments.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant3.webp",
    imageAlt: "Linear profiles emphasizing architectural lines in a living space.",
  },
  {
    id: "dynamic-lighting",
    title: "Dynamic Lighting",
    body:
      "Beyond the bulb lies the opportunity to enable lighting experiences that support lifestyle choices and the functional needs of a space — something simple dimmers cannot match.",
    body2:
      "Add splashes of color for celebrations, or automate subtle, incremental sun transitions with warm-to-cool white ambient light for circadian alignment.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant4.webp",
    imageAlt: "Room with colorful accent lighting and tunable white ambient light.",
  },
];

const SECONDARY_CARDS: InfoCard[] = [
  {
    id: "bespoke-ambiance",
    title: "Bespoke Ambiance",
    body:
      "Vibrant Linear Lighting works beautifully in both residential and commercial spaces.",
    body2:
      "A thoughtful layout combined with your preferred automated colors, hues, and temperatures can energize a workspace just as easily as it can create a calm wellness retreat — any mood is just a few scenes away.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant7.webp",
    imageAlt: "Restaurant bar and lounge with layered linear lighting.",
  },
  {
    id: "sophisticated-components",
    title: "Sophisticated Components",
    body:
      "Vibrant uses only high-end, single-bin, temperature-validated diodes across the line-up.",
    body2:
      "With a 90+ color rendering index, the system delivers authentic, rich colors so finishes, fabrics, and artwork look exactly as they should.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant5.webp",
    imageAlt: "Close-up of high quality LED diode and extrusion hardware.",
  },
  {
    id: "versatile",
    title: "Thoughtfully Versatile",
    body:
      "Vibrant Linear Lighting is highly adaptable, friendly to most surfaces, and easy to install. Slim 12 mm extrusion mounts fit into tight clearances, while aluminum profiles dissipate heat and diffuse light through a frosted lens.",
    body2:
      "It’s designed for seamless Control4 integration via phase dimming, DMX, DALI, and the new Zigbee Control Module, so you can treat it like any other native lighting load in the project.",
    imageSrc: "/images/products/vibrant-linear-lighting/vibrant6.webp",
    imageAlt: "LED profiles installed in cabinetry and stair details.",
    features: [
      "Fixed Color LEDs: 2700K, 3000K, 4000K",
      "Fixed Color Diffusing LEDs: 2700K, 3000K, 4000K",
      "Warm Dimming and Fully Tunable White LEDs",
      "RGBW and RGBTW linear LEDs",
      "Outdoor Fixed (2700K, 3000K, 4000K) and Outdoor RGBW LEDs",
    ],
  },
];

export default function VibrantLinearLightingPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.4),transparent_60%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.9),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.2),rgba(15,23,42,1))]" />

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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)] lg:items-center">
          {/* hero media */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-sky-500/25 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.9)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/products/vibrant-linear-lighting/vibrant-linear-lighting-bg.webp"
                alt="Vibrant linear lighting highlighting a modern interior."
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Vibrant Linear Lighting
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Beyond the bulb, into atmosphere
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  Transform coves, cabinets, steps, and ceilings into a
                  responsive layer of light that follows your rhythm — not just
                  on and off, but color, temperature, and mood.
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
              Linear lighting, fully integrated
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Vibrant Linear Lighting takes Control4 scenes beyond traditional
              downlights. By tying LED strips, profiles, and controls straight
              into the automation system, the light in each room becomes a
              dynamic part of comfort, wellness, and design.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              From circadian Daylight schedules to rich accent colors for
              events, Vibrant is built to feel invisible in the hardware and
              unforgettable in the experience.
            </p>
          </motion.div>
        </div>

        {/* LOOKBOOK CTA */}
        <motion.div
          className="mt-14 overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/70 p-5 shadow-[0_22px_60px_rgba(2,6,23,0.9)] sm:p-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-950 sm:h-40 sm:w-64">
              <Image
                src="/images/products/vibrant-linear-lighting/vibrant-lookbook.webp"
                alt="Vibrant Linear Lighting lookbook cover in a modern kitchen."
                fill
                sizes="(min-width: 640px) 256px, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-base font-semibold text-sky-50">
                Vibrant Lookbook
              </h2>
              <p className="text-sm text-slate-200/85">
                Explore real-world applications, design ideas, and automation
                examples that show how Vibrant Linear Lighting transforms
                kitchens, living rooms, spas, and commercial spaces.
              </p>
              <div className="pt-1">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e2fd88d39dfa9e9ad7368_C4_Vibrant_Look_Book.pdf"
                  className="inline-flex items-center rounded-full bg-sky-500/90 px-6 py-2 text-sm font-medium text-sky-950 hover:bg-sky-400"
                >
                  Download lookbook
                  <span className="ml-1 text-xs">↓</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PRIMARY CARDS */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-2"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {PRIMARY_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/90 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
            >
              {/* image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[0.7rem] uppercase tracking-[0.22em] text-slate-500/70">
                    Image coming soon
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
              </div>

              {/* text */}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-base font-semibold text-sky-50">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                  {card.body}
                </p>
                {card.body2 && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                    {card.body2}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* SECONDARY CARDS */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-3"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {SECONDARY_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/90 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[0.7rem] uppercase tracking-[0.22em] text-slate-500/70">
                    Image coming soon
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-base font-semibold text-sky-50">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                  {card.body}
                </p>
                {card.body2 && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                    {card.body2}
                  </p>
                )}

                {card.features && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200/80">
                    {card.features.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}