"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

// simple fade-up animation (typed so TS is happy)
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

type FeatureCard = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
  specHref?: string;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "voice",
    eyebrow: "Innovative voice functionality",
    title: "A Dynamic Duo",
    body:
      "Halo’s voice control is designed around how people actually watch TV. The same remote gives you push-to-talk access to the two most requested assistants, so you can control both your entertainment and your smart home without swapping remotes.",
    bullets: [
      "Use Siri when you are watching through Apple TV – push-to-talk for the Siri Remote.",
      "Use Xfinity Voice when you are watching Xfinity – push-to-talk for the Xfinity Voice Remote.",
      "Keep a single Halo or Halo Touch on the coffee table while other remotes stay in the drawer.",
    ],
    imageSrc: "/images/products/interfaces/halo/halo-voice.webp",
    imageAlt: "Halo remote highlighting voice assistant button.",
  },
  {
    id: "halo-touch",
    eyebrow: "Halo Touch",
    title: "Premium Remote Perfected",
    body:
      "Halo Touch combines a bright touch display with a full set of hard buttons in a slim aluminum chassis. It feels premium in the hand and gives fast access to your most-used devices, scenes and content.",
    bullets: [
      "Available in Black or Silver with a brushed aluminum chassis.",
      "3.2\" capacitive touch LCD plus a familiar set of hard, backlit buttons.",
      "Navigate devices, media, Favorites and custom scenes with a rich graphical UI.",
      "Quick-access Watch, Listen and Now Playing pages from the sleep screen.",
      "Use one-handed or in the dark thanks to tactile, backlit buttons that are always ready.",
    ],
    imageSrc: "/images/products/interfaces/halo/halo-touch.webp",
    imageAlt: "Halo Touch remote in black and silver.",
  },
  {
    id: "halo",
    eyebrow: "Halo",
    title: "Evolution of the Everyday Remote",
    body:
      "Halo refines the classic living-room remote with a color screen, smart labeling and shortcuts tuned for real homes. It keeps things simple while still giving full control over devices, scenes and media.",
    bullets: [
      "2.8\" full-color non-touch LCD for devices, media, favorites and automations.",
      "Three custom hard buttons with digital labels for quick, clearly named actions.",
      "New Color Shortcut button maps red / green / blue / yellow functions to 2, 4, 6 and 8.",
      "Complete set of hard, backlit buttons for confident control without looking down.",
    ],
    imageSrc: "/images/products/interfaces/halo/halo-remote.webp",
    imageAlt: "Standard Halo remotes lined up together.",
  },
];

export default function HaloRemotesPage() {
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
                src="/images/products/interfaces/halo/halo-hero.webp"
                alt="Control4 Halo and Halo Touch remotes hero image."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Remotes
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Halo&nbsp;&amp; Halo Touch
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  Next-generation handheld interfaces for the whole home, with
                  rich media browsing, dual voice assistants and deep smart-home
                  control in a single remote.
                </p>
              </div>
            </div>
          </motion.div>

          {/* hero text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Say hello to Halo
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              The Halo Family of Remotes is engineered for next-generation
              interaction, including dynamic access to dual voice assistants
              from a single button. The interface is designed to be intuitive
              enough for casual users while still exposing powerful controls for
              lighting, climate, scenes and media.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              Halo and Halo Touch bring an elegantly understated design that
              fits into any living space. From tech-lovers to first-time smart
              home users, Halo feels natural in the hand and turns everyday
              control into a refined experience.
            </p>
          </motion.div>
        </div>

        {/* feature cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {FEATURE_CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
            >
              {/* image strip */}
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
                {card.eyebrow && (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sky-400/80">
                    {card.eyebrow}
                  </p>
                )}
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
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}