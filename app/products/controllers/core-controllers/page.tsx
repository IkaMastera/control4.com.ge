"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

// simple fade-up animation for single elements
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

type ControllerItem = {
  id: string;
  name: string;
  label: string;
  intro: string;
  bullets: string[];
  specHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const CONTROLLERS: ControllerItem[] = [
  {
    id: "core-controllers",
    name: "CORE Controllers",
    label: "Foundation for next-generation systems",
    intro:
      "CORE Controllers act as the main brain of the system. They connect all smart devices, scenes and services into one reliable platform.",
    bullets: [
      "High-resolution audio with multiple rooms of streaming from services such as Apple Music, Spotify, Pandora, iHeartRadio, SiriusXM and more.",
      "Voice control support with Apple HomeKit, Amazon Alexa and Google Assistant.",
      "Control4 Connect for remote access from the Control4 App on iOS, Android and Apple Watch.",
      "Cloud features like proactive alerts, Intercom Anywhere, Apple Music integration, routines and secure cloud backups.",
    ],
    imageSrc: "/images/products/core-controllers/core-controllers1.webp",
    imageAlt: "Rack of Control4 Core Controllers.",
  },
  {
    id: "core-5",
    name: "CORE 5",
    label: "Powerhouse for any deployment",
    intro:
      "The flagship controller for large, complex smart-home and smart-building projects.",
    bullets: [
      "Ideal for large systems with many rooms and devices.",
      "Seven independent zones of high-resolution audio with very fine EQ control.",
      "4K HDMI output to show a full on-screen UI on the TV.",
      "Built-in Wi-Fi, Zigbee and Z-Wave radios for wireless smart devices.",
      "With a Connect subscription, adds remote access, Intercom Anywhere and voice integrations.",
    ],
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e30309ea251d3e0fba97f_core-5-data-sheet-rev-c.pdf",
    imageSrc: "/images/products/core-controllers/core5-controller.webp",
    imageAlt: "Close-up of CORE 5 in a rack.",
  },
  {
    id: "core-3",
    name: "CORE 3",
    label: "Balance of power and price",
    intro:
      "A strong mid-range controller that mixes multi-room audio and smart automation at a very efficient price point.",
    bullets: [
      "Great for medium sized homes and light commercial systems.",
      "Four audio zones with high-resolution streaming and EQ control.",
      "4K HDMI video output for on-screen navigation.",
      "Wi-Fi, Zigbee and Z-Wave for flexible wireless device support.",
      "Connect subscription adds remote access, Intercom Anywhere and voice integrations.",
    ],
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e308c631d8234e954490d_core-3-data-sheet-rev-d.pdf",
    imageSrc: "/images/products/core-controllers/core3-controller.webp",
    imageAlt: "CORE 3 controller on a dark surface.",
  },
  {
    id: "core-1",
    name: "CORE 1",
    label: "Built for any and every room",
    intro:
      "A compact controller that brings entertainment and automation to individual rooms, apartments or focused areas.",
    bullets: [
      "Best fit for small systems and room-by-room upgrades.",
      "Two zones of high-resolution audio with EQ control.",
      "4K HDMI output for on-screen UI on the TV.",
      "Wi-Fi and Zigbee radios for smart device control.",
      "Connect subscription unlocks remote access, Intercom Anywhere and voice integrations.",
    ],
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e30ad3c24982263618a70_core-1-data-sheet-rev-d.pdf",
    imageSrc: "/images/products/core-controllers/core1-controller.webp",
    imageAlt: "CORE 1 controller on a table.",
  },
  {
    id: "core-lite-bundle",
    name: "CORE lite Bundle",
    label: "Single-room bundles with your favorite remote",
    intro:
      "An easy entry point into the Control4 experience, perfect for single rooms, media spaces or extending automation into new areas.",
    bullets: [
      "Designed for single-room systems or remote zones.",
      "CORE lite gives device control, automation, on-screen UI, high-resolution audio and cloud services.",
      "Bundles let you choose the ideal remote: Halo Touch, Halo, Neeo or SR-260.",
    ],
    specHref: "#core-lite-spec",
    imageSrc: "/images/products/core-controllers/corelite-bundle.webp",
    imageAlt: "Group of Control4 remotes with a CORE controller.",
  },
  {
    id: "ca-10",
    name: "CA-10 Controller",
    label: "Automation server for serious performance",
    intro:
      "A dedicated automation server for the biggest and most demanding projects where uptime is critical.",
    bullets: [
      "Recommended for very large systems with hundreds or thousands of devices.",
      "Redundant design with multiple fail-safes to keep the system running even if a PSU, network port, SSD or cooling fan fails.",
      "Built to run mission-critical automation with a long warranty and service life.",
    ],
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e3096f1e798920f897562_ca-10-automation-controller-data-sheet-rev-b.pdf",
    imageSrc: "/images/products/core-controllers/core-ca10-controller.webp",
    imageAlt: "CA-10 automation server in a rack.",
  },
  {
    id: "ca-1",
    name: "CA-1 Controller",
    label: "Minimal controller to add automation anywhere",
    intro:
      "A simple, cost-effective way to add smart control for lighting, comfort and security devices in small or satellite spaces.",
    bullets: [
      "Great as a starter controller or for remote locations in a larger project.",
      "Controls devices over the network, via serial (for security panels) and wirelessly over Wi-Fi and Zigbee.",
      "Can be expanded with Z-Wave support when needed.",
    ],
    specHref:
      "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e30a04f4820484bddc3c0_ca-1-automation-controller-data-sheet-rev-b.pdf",
    imageSrc: "/images/products/core-controllers/core-ca1-controller.webp",
    imageAlt: "CA-1 controller on a desk next to decor.",
  },
];

export default function ControllersPage() {
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
            className="overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/products/core-controllers/core-hero.webp"
                alt="Control4 Core Controllers hero group shot."
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Controllers
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Core Controllers
                </h1>
                <p className="max-w-xl text-xs text-slate-300/80 sm:text-sm">
                  The central processors that keep every light, scene, speaker,
                  and sensor working together as one smart system.
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
              Why controllers matter
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Control4 controllers bring all your smart devices into a single,
              coordinated system. They handle personalised automation, simple
              control from touchscreens, apps or voice, and fast access to your
              favourite ways of interacting with the home.
            </p>
            <p className="text-sm leading-relaxed text-slate-200/80">
              Behind the scenes they manage hundreds of devices, many rooms of
              audio and video, climate control, lighting scenes and custom logic
              built for your lifestyle. They also enable high-resolution audio
              streaming, user profiles, Intercom Anywhere, secure remote access
              and proactive system alerts.
            </p>
          </motion.div>
        </div>

        {/* CONTROLLERS GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="mt-14 grid gap-8 items-stretch md:grid-cols-2"
        >
          {CONTROLLERS.map((item) => (
            <motion.article
              key={item.id}
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
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                </div>
              )}

              {/* text + CTA */}
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
                  {item.intro}
                </p>

                <ul className="mt-1 space-y-1.5 text-sm text-slate-300/90">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-sky-400/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

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