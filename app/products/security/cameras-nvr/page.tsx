"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/common/container";

/* --------- ANIMATION HELPERS --------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.06 * (custom as number),
    },
  }),
};

type InfoCard = {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

type ProductCard = InfoCard & {
  brochureHref?: string;
};

/* --------- DATA: CAMERAS & RECORDING --------- */

const CAMERAS_RECORDING_CARDS: InfoCard[] = [
  {
    id: "c4-surveillance-features",
    title: "Control4 Surveillance Features",
    body:
      "With Control4, you can remotely connect and command your home from virtually anywhere, whether inside the house or across the world. View live security camera footage on your television, Control4 touchscreens, and mobile devices. Control4 supports the same streaming capabilities utilized by popular high-performance surveillance cameras to deliver superior video quality and bandwidth savings, increasing efficiency and reliability.",
    imageSrc:
      "/images/products/security/security-cameras1.webp",
    imageAlt: "Homeowner viewing surveillance footage on a TV.",
  },
  {
    id: "exceptional-quality",
    title: "Exceptional Quality, Day or Night",
    body:
      "Luma cameras are available in Bullet, Turret, Dome, Fisheye, and PTZ formats up to 8MP resolution, with fixed and varifocal lens options. Depending on the location and environment, you can choose models with Color at Night technology or IR imagery for low-light settings. Some cameras also feature Active Deterrence with flashing lights and built-in speakers to help ward off unwanted guests.",
    imageSrc:
      "/images/products/security/security-cameras2.webp",
    imageAlt: "Collection of Luma surveillance cameras.",
  },
  {
    id: "capture-moment",
    title: "Capture the Moment, Review the Past",
    body:
      "Luma NVRs provide powerful all-around performance, recording higher-resolution cameras on every channel with up to 12MP on some models. They offer 4K HDMI output and intelligent analytics capabilities, with configurations up to 32 channels and as much as 144TB of total storage for long-term retention.",
    imageSrc:
      "/images/products/security/security-cameras3.webp",
    imageAlt: "Luma NVR on a rack with cameras.",
  },
  {
    id: "quality-peace-of-mind",
    title: "Quality Peace of Mind",
    body:
      "Luma products are all NDAA-compliant and rigorously tested in quality labs to ensure optimal performance. A Luma 3-Year Limited Warranty provides additional assurance that your surveillance system is built to protect what matters most.",
    imageSrc:
      "/images/products/security/security-cameras4.webp",
    imageAlt: "Luma surveillance hardware on a dark background.",
  },
];

/* --------- DATA: SURVEILLANCE AI --------- */

const SURVEILLANCE_AI_INTRO =
  "Luma Insights takes your home security to the next level with 24/7 AI-powered surveillance analytics, cloud video playback on Control4 touchscreens and apps, and smart notifications tailored to what matters most to you.";

const SURVEILLANCE_AI_CARDS: InfoCard[] = [
  {
    id: "ai-smart-surveillance",
    title: "Smart Surveillance AI for Control4 Devices",
    body:
      "Luma Insights is a subscription-based AI solution that delivers around-the-clock surveillance monitoring for your Control4 Chime Video Doorbell, DS2 Door Station, and Luma X10 and X20 IP cameras.",
    imageSrc:
      "/images/products/security/surveillance1.webp",
    imageAlt:
      "Luma cameras, NVR, video doorbell and mobile app running AI features.",
  },
  {
    id: "ai-real-time-alerts",
    title: "Real-Time Alerts",
    body:
      "Receive immediate, tailored alerts when someone or something enters a designated area. Each push notification includes a snapshot of the event, helping you instantly assess and respond as needed.",
    imageSrc:
      "/images/products/security/surveillance2.webp",
    imageAlt: "Smartphone showing real-time security alerts.",
  },
  {
    id: "ai-instant-access",
    title: "Instant Access Options",
    body:
      "Jump straight from an alert to the camera’s live view. Need to share what happened? Access 7 days of video clip history and share events via SMS, AirDrop, email and more. Improve notifications and AI accuracy by flagging false positives.",
    imageSrc:
      "/images/products/security/surveillance3.webp",
    imageAlt: "User reviewing recorded security clips on a device.",
  },
  {
    id: "ai-controls-empower",
    title: "Controls that Empower",
    body:
      "Enable or disable notifications for each trigger type on each camera individually, so you get alerted only about events that really matter to you.",
    imageSrc:
      "/images/products/security/surveillance4.webp",
    imageAlt: "Control4 app configuration screen for alerts.",
  },
  {
    id: "ai-person-detection",
    title: "Person Detection",
    body:
      "Be alerted when a person enters a private, restricted or dangerous area within the camera view instead of relying solely on generic motion-based alerts, dramatically reducing unnecessary notifications.",
    imageSrc:
      "/images/products/security/surveillance5.webp",
    imageAlt: "AI overlay highlighting a person in camera view.",
  },
  {
    id: "ai-vehicle-detection",
    title: "Vehicle Detection",
    body:
      "Monitor driveways, parking lots and private areas with real-time alerts for vehicle entry, helping you track arrivals and potential intrusions.",
    imageSrc:
      "/images/products/security/surveillance6.webp",
    imageAlt: "Vehicle entering a monitored driveway at night.",
  },
  {
    id: "ai-package-detection",
    title: "Package Detection",
    body:
      "Get notified the moment a package is detected or when one is removed. Stay on top of deliveries, pickups and potential package theft in real time.",
    imageSrc:
      "/images/products/security/surveillance7.webp",
    imageAlt: "Package at a doorstep captured by a doorbell camera.",
  },
  {
    id: "ai-animal-detection",
    title: "Animal Detection",
    body:
      "Whether it’s a family pet slipping out, deer in the garden or wildlife wandering through, smart alerts let you know whenever an animal passes by monitored areas.",
    imageSrc:
      "/images/products/security/surveillance8.webp",
    imageAlt: "Animal moving through a yard at night on camera.",
  },
  {
    id: "ai-cloud-storage",
    title: "Cloud Storage & Access",
    body:
      "Snapshots and video clips are stored in the Control4 Cloud for 7 days, so you can review any surveillance-triggered event at your convenience from Control4 Touchscreens or the Control4 app on iOS and Android.",
    imageSrc:
      "/images/products/security/surveillance9.webp",
    imageAlt: "Cloud icon with security footage thumbnails.",
  },
  {
    id: "ai-easy-retrieval",
    title: "Easy Retrieval & Sharing",
    body:
      "On the History page, quickly find images or clips by filtering by date, camera or event type. Press and hold any entry to share snapshots or video clips via SMS, email, AirDrop and more.",
    imageSrc:
      "/images/products/security/surveillance10.webp",
    imageAlt: "User browsing surveillance history timeline.",
  },
];

/* --------- DATA: SMART LOCKS --------- */

const SMART_LOCKS_INTRO =
  "Compatible with your Control4 system, smart locks offer a virtual key to your home, letting you lock and unlock doors from anywhere in the world and alerting you to who is coming and going. Individual codes can be created and automated to trigger personalized welcome scenes and included in your Goodnight scene to ensure the home is secured as you climb into bed.";

const SMART_LOCK_CARDS: ProductCard[] = [
  {
    id: "baldwin-locks",
    title: "Baldwin Smart Locks",
    body:
      "Baldwin smart locks blend elegant design with advanced security features, offering keyless entry and remote control for peace of mind. Integrated with Control4, they let you manage access, monitor door status and create personalized entry codes for a secure and sophisticated home.",
    imageSrc:
      "/images/products/security/smartlock1.webp",
    imageAlt: "Baldwin smart lock installed on a front door.",
    brochureHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e35e046c5a918471366d7_baldwin-doorlock-brochure-rev-a.pdf",
  },
  {
    id: "kwikset-locks",
    title: "Kwikset Smart Locks",
    body:
      "Kwikset’s Home Connect Technology allows their door locks to work seamlessly with Control4 and wirelessly communicate with other devices. Multiple models and styles make Kwikset a popular choice for Control4 customers.",
    imageSrc:
      "/images/products/security/smartlock2.webp",
    imageAlt: "Kwikset smart lock in a modern interior.",
    brochureHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e35dd6252ae1a99ab2dee_kwikset-doorlock-brochure-rev-b.pdf",
  },
  {
    id: "yale-locks",
    title: "Yale Smart Locks",
    body:
      "Yale Real Living locks are backed by nearly 200 years of security expertise. Available in several styles and finishes, they provide privacy modes for extra security and allow granular control over user access privileges.",
    imageSrc: "/images/products/security/smartlock3.webp",
    imageAlt: "Yale smart lock on a contemporary door.",
    brochureHref: "https://cdn.prod.website-files.com/629926620ba03720384bebb3/682e382c782f711426ee8041_yale-brochure-rev-c.pdf",
  },
];

/* --------- DATA: MOTION & CONTACT SENSORS --------- */

const MOTION_SENSORS_INTRO =
  "Whether it’s the front porch, living room, garage or backyard, sensors are key in detecting motion inside or out. Sensors also provide feedback that lets you know if the door, garage door or gate is currently open or closed.";

const MOTION_SENSOR_CARDS: InfoCard[] = [
  {
    id: "wireless-motion",
    title: "Wireless Motion Sensors",
    body:
      "Wireless motion sensors communicate motion and ambient light events to a Control4 system. Based on room occupancy, you can trigger and control events throughout the home. Sensing motion and light inside and outside allows automations that respond intelligently to movement and changing light levels.",
    imageSrc:
      "/images/products/security/sensor1.webp",
    imageAlt: "Wireless motion sensor on a wall.",
  },
  {
    id: "contact-sensors",
    title: "Contact Sensors",
    body:
      "Packed with intelligent features, wireless contact sensors expand home automation possibilities — monitoring doors, gates and windows inside or outside the home. A simple example: a door sensor that, when opened, turns on the entry light.",
    imageSrc:
      "/images/products/security/sensor2.webp",
    imageAlt: "Door contact sensors in different finishes.",
  },
];

/* --------- PAGE COMPONENT --------- */

export default function CamerasNvrPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.4),transparent_60%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(8,47,73,0.95),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.25),rgba(15,23,42,1))]" />

      <Container className="relative z-10 pb-20 pt-10 lg:pb-28 lg:pt-16">
        {/* Back link */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
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
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-sky-500/25 bg-slate-900/40 shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/products/security/security-hero.webp"
                alt="Luma cameras, NVR and mobile apps on a dark background."
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
                  Security & Surveillance
                </p>
                <h1 className="text-2xl font-semibold text-sky-50 sm:text-3xl">
                  Cameras &amp; NVR
                </h1>
                <p className="max-w-xl text-xs text-slate-300/85 sm:text-sm">
                  Keep your home or business safe with AI-ready Luma cameras,
                  recorders and Control4 automation that brings everything into
                  one smart security platform.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-400/80">
              Cameras and Recording
            </p>
            <p className="text-sm leading-relaxed text-slate-200/90">
              Surveillance cameras and network video recorders (NVRs) bolster
              the security of your home or business. With Control4, it&apos;s
              easy to check in from anywhere in the world — right from your
              smartphone — and capture critical moments in incredible detail
              with Luma Surveillance.
            </p>
          </motion.div>
        </div>

        {/* Jump nav */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 text-xs text-slate-300/80"
        >
          <p className="mb-2 font-semibold tracking-[0.22em] text-sky-300/80">
            JUMP TO
          </p>
          <div className="flex flex-wrap gap-4 text-[0.78rem]">
            <a href="#cameras-recording" className="text-sky-400 hover:text-sky-300">
              → Cameras &amp; Recording
            </a>
            <a href="#surveillance-ai" className="text-sky-400 hover:text-sky-300">
              → Surveillance AI
            </a>
            <a href="#smart-locks" className="text-sky-400 hover:text-sky-300">
              → Smart Locks
            </a>
            <a href="#motion-sensors" className="text-sky-400 hover:text-sky-300">
              → Motion &amp; Contact Sensors
            </a>
          </div>
        </motion.div>

        {/* CAMERAS & RECORDING CARDS */}
        <section id="cameras-recording" className="mt-14">
          <motion.h2
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-lg font-semibold text-sky-50"
          >
            Cameras &amp; Recording
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-6 grid gap-8 lg:grid-cols-2"
          >
            {CAMERAS_RECORDING_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                custom={index}
                variants={fadeUp}
                className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_22px_60px_rgba(2,6,23,0.9)]"
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
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

        {/* SURVEILLANCE AI */}
        <section id="surveillance-ai" className="mt-16">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              Surveillance AI
            </p>
            <h2 className="mt-2 text-lg font-semibold text-sky-50">
              Luma Insights for smarter security
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              {SURVEILLANCE_AI_INTRO}
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
            className="mt-8 grid gap-8 md:grid-cols-2"
          >
            {SURVEILLANCE_AI_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                custom={index}
                variants={fadeUp}
                className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_20px_55px_rgba(2,6,23,0.9)]"
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

        {/* SMART LOCKS */}
        <section id="smart-locks" className="mt-16">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              Smart Locks
            </p>
            <h2 className="mt-2 text-lg font-semibold text-sky-50">
              Virtual keys and secure scenes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              {SMART_LOCKS_INTRO}
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
            {SMART_LOCK_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                custom={index}
                variants={fadeUp}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_20px_55px_rgba(2,6,23,0.9)]"
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

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-sky-50">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                    {card.body}
                  </p>

                  {card.brochureHref && (
                    <div className="mt-4 pt-1">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={card.brochureHref}
                        className="inline-flex items-center text-sm font-medium text-sky-400 hover:text-sky-300"
                      >
                        Download brochure
                        <span className="ml-1 text-xs">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* MOTION & CONTACT SENSORS */}
        <section id="motion-sensors" className="mt-16">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              Motion &amp; Contact Sensors
            </p>
            <h2 className="mt-2 text-lg font-semibold text-sky-50">
              Automations that react to the real world
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              {MOTION_SENSORS_INTRO}
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
            className="mt-8 grid gap-8 md:grid-cols-2"
          >
            {MOTION_SENSOR_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                custom={index}
                variants={fadeUp}
                className="flex flex-col overflow-hidden rounded-3xl border border-sky-500/18 bg-slate-950/85 shadow-[0_20px_55px_rgba(2,6,23,0.9)]"
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