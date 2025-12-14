"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* ---------- ANIMATION HELPERS ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.06 * custom,
    },
  }),
};

type FeatureCard = {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

/* ---------- DATA ---------- */

const CORE_FEATURE_CARDS: FeatureCard[] = [
  {
    id: "smart-motion",
    title: "Stay in the Know with Smart Motion Detection & Alerts",
    body:
      "With motion detection, you are instantly notified that a package has been delivered, even if the bell is not pressed. Video snapshots can be delivered directly to your mobile device or Control4 Touchscreen when someone rings Chime, whether you’re inside or on the go. If you miss a notification, you can still access seven days of snapshots and video recordings.",
    imageSrc:
      "/images/products/security/video1.webp",
    imageAlt: "Notification from a video doorbell on a smartphone screen.",
  },
  {
    id: "motion-zones",
    title: "Customizable Motion Zones & Smart Alerts",
    body:
      "Chime includes five adjustable motion zones so you don’t get notified for every car that drives by. Your integrator can configure snapshots or recordings whenever someone steps into a specific zone and trigger outdoor lighting when motion is detected on the porch. Your Control4 system can even turn lights on automatically when a person is detected after a certain time of night.",
    imageSrc:
      "/images/products/security/video2.webp",
    imageAlt: "Camera view with overlaid motion detection zones.",
  },
  {
    id: "engineering-elegance",
    title: "The Perfect Blend of Engineering and Elegance",
    body:
      "First impressions matter, even at the front door. Chime is available in black and nickel finishes for a luxurious appearance, while crisp, natural two-way audio and high-definition video provide user-friendly communication. Night mode keeps the image clear in low light, and the 180-degree field of view lets you monitor more than just the porch.",
    imageSrc:
      "/images/products/security/video4.webp",
    imageAlt: "Control4 Chime doorbells in black and nickel finishes.",
  },
];

const EXPERIENCE_CARDS: FeatureCard[] = [
  {
    id: "touchscreens-companion",
    title: "Control4 Touchscreens are a Perfect Companion",
    body:
      "A large, high-resolution screen lets you see who’s at the door from across the room without reaching for your phone. When Chime is pressed or motion is detected, video can pop up on every Control4 Touchscreen so everyone can see who’s there. You can also call into any touchscreen from the Control4 App, or broadcast a message to every touchscreen when it’s time for dinner.",
    imageSrc:
      "/images/products/security/video3.webp",
    imageAlt: "Control4 touchscreen showing live video from the doorbell.",
  },
  {
    id: "enabled-by-connect",
    title: "Enabled by Control4 Connect",
    body:
      "A Control4 Connect subscription unlocks hands-on personalization, voice control, and remote access to your Control4 Smart Home. Connect enables Intercom Anywhere so you can use your phone to monitor and communicate with touchscreens throughout the home, and provides 7 days of cloud storage for Chime snapshots and video recordings.",
    imageSrc:
      "/images/products/security/video6.webp",
    imageAlt: "Control4 app interface representing Connect subscription.",
  },
  {
    id: "luma-insights",
    title: "Premiere AI with Luma Insights",
    body:
      "Integration with Luma Insights adds premium AI that detects people, packages or vehicles in predefined areas. When something is detected, you receive a proactive alert with a snapshot and a deep link to the video clip or live stream. Snapshots and clips are stored in the cloud for 7 days and are easily accessed from Control4 Touchscreens or the Control4 App.",
    imageSrc:
      "/images/products/security/video5.webp",
    imageAlt:
      "AI surveillance interface highlighting people, vehicles and packages.",
  },
];

/* ---------- PAGE ---------- */

export default function VideoDoorbellsPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.95),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.25),rgba(15,23,42,1))]" />

      <Container className="relative z-10 pb-20 pt-10 lg:pb-28 lg:pt-16">
        {/* back link */}
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
          {/* hero media */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="overflow-hidden rounded-3xl border border-sky-500/25 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/products/security/video-doorbell-hero.webp"
                alt="Control4 Chime video doorbell with live video shown on a phone."
                fill
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Security &amp; Surveillance
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Video Doorbells (Chime)
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  Chime is the video doorbell built for the Control4 Smart Home,
                  combining secure entry, whole-home automation and clear
                  two-way communication in one elegant device.
                </p>
              </div>
            </div>
          </motion.div>

          {/* hero copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Your Smart Home Deserves a Smarter Doorbell
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Chime is a video doorbell designed and built specifically for
              Control4. It gives you everything you expect from a modern doorbell
              and then goes further, tying straight into lighting, security,
              locks and scenes for tighter protection and effortless control.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/85">
              Running late or expecting a delivery? Answer from anywhere and
              control from everywhere — disarm the alarm, turn on lights, or open
              the garage so guests and couriers can step safely inside, then lock
              the door behind them, all from the same app.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e32711ef894b9b18b8d64_Control4-Chime-Data-Sheet-rev-b.pdf"
                className="inline-flex items-center rounded-full border border-sky-400/80 px-4 py-2 font-medium text-sky-100 hover:border-sky-300 hover:text-sky-50"
              >
                View spec sheet
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3272b6b3f7425c57c2f2_Control4-Chime-Trifold-rev-a.pdf"
                className="inline-flex items-center rounded-full border border-sky-400/40 px-4 py-2 font-medium text-sky-100/80 hover:border-sky-300/80 hover:text-sky-50"
              >
                View brochure
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ANSWER ANYWHERE SECTION */}
        <section className="mt-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl"
          >
            <h2 className="text-lg font-semibold text-sky-50">
              Answer From Anywhere, Control From Everywhere
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              Chime is a convenient way to keep your home safe and secure. When a
              guest rings, you can answer and disarm the alarm, turn on pathway
              lighting or open the garage to let them in. When a package is
              delivered, you can unlock the door so it can be placed safely
              inside, then lock it again as the courier leaves — all inside the
              same Control4 experience.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
              No other video doorbell offers this level of tight integration with
              Control4. Porch pirates don&apos;t stand a chance.
            </p>
          </motion.div>
        </section>

        {/* CORE FEATURE CARDS */}
        <section className="mt-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {CORE_FEATURE_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                variants={fadeUp}
                custom={index}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
              >
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-sm font-semibold text-sky-50">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE / ECOSYSTEM CARDS */}
        <section className="mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl"
          >
            <h2 className="text-lg font-semibold text-sky-50">
              Part of a Complete Security Ecosystem
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              Chime becomes even more powerful when paired with Control4
              Touchscreens, Connect services, and Luma Insights AI — giving you
              whole-home communication, remote access, and advanced detection in
              one unified interface.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-8 grid gap-8 md:grid-cols-3"
          >
            {EXPERIENCE_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                variants={fadeUp}
                custom={index}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
              >
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-sm font-semibold text-sky-50">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </Container>
    </section>
  );
}