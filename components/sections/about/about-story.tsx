"use client";

import { useState } from "react";
import Container from "@/components/common/container";
import { motion, useReducedMotion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StoryCardData = {
  id: string;
  title: string;
  subtitle: string;
  backTitle: string;
  backLines: string[];
};

// --- Data ---
const CARDS: StoryCardData[] = [
  {
    id: "origins",
    title: "Built through practice.",
    subtitle:
      "17+ years of experience. Our foundation was built on real projects — learning constraints, solving problems, and delivering results before scaling up. Over time, this grew from residential projects into complex hotels, commercial spaces, and large-scale developments across Georgia.",
    backTitle: "Where we came from",
    backLines: [
      "Our foundation was shaped on real MEP projects.",
      "Each challenge strengthened our engineering discipline, problem-solving, and execution standards.",
      "Over time, this hands-on experience evolved from residential projects into complex hotels, commercial facilities, and large-scale developments across Georgia.",
    ],
  },
  {
    id: "method",
    title: "Clarity through engineering",
    subtitle:
      "When systems are engineered correctly, complexity becomes manageable and possibilities expand.",
    backTitle: "How we build",
    backLines: [
      "We design with structure, coordination, and long-term operation in mind — so projects move forward smoothly, without improvisation or compromise.",
      "Reliability over features: load, routing, grounding and networks come first.",
      "Well-designed systems stand the test of time.",
    ],
  },
  {
    id: "future",
    title: "Built locally. Measured globally.",
    subtitle:
      "We design systems to international standards, ensuring reliability and long-term performance. As we expand beyond Georgia, we help shape the next generation of building, automation, and integrated engineering.",
    backTitle: "Where we’re going",
    backLines: [
      "Built in Georgia, designed for global performance.",
      "Engineered for long-term operation, serviceability, and growth.",
      "Expanding internationally through advanced building, automation, and integrated engineering solutions.",
    ],
  },
];

function getTopLabel(id: string) {
  switch (id) {
    case "origins": return "Origins";
    case "method": return "How we build";
    default: return "Future";
  }
}

// --- Sub-Component: Flip Card ---
// Separating this makes the main logic much cleaner
function StoryCard({
  card,
  isActive,
  onToggle,
  reduceMotion,
}: {
  card: StoryCardData;
  isActive: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isActive}
        className={cn(
          "group relative w-full text-left perspective-1000",
          "rounded-3xl border border-white/10 bg-[#020617]",
          "shadow-[0_0_0_1px_rgba(15,23,42,0.75)]",
          "transition-shadow duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-0",
          "active:shadow-[0_0_52px_rgba(0,194,255,0.30)] active:border-accent/50",
          isActive
            ? "shadow-[0_0_42px_rgba(0,194,255,0.26)]"
            : "hover:shadow-[0_0_34px_rgba(0,194,255,0.18)]"
        )}
      >
        {/* Notebook Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.16),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,86,184,0.22),transparent_62%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.85)_100%)]" />
        </div>

        {/* 3D Flip Container */}
        <div className="relative min-h-[360px] rounded-3xl [perspective:1200px] lg:min-h-[380px]">
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d]",
              !reduceMotion && "motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              isActive ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
            )}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 grid h-full grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl px-6 py-8 [backface-visibility:hidden] sm:px-8 sm:py-9 lg:px-10 lg:py-11">
              <div className="flex items-center justify-between">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/60">
                  {getTopLabel(card.id)}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.72rem] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  Flip
                </span>
              </div>

              <div className="mt-10 max-w-[54ch] pb-16">
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-[1.4rem] lg:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-pretty text-white/75 lg:line-clamp-6">
                  {card.subtitle}
                </p>
              </div>

              {/* Footer Front */}
              <div className="absolute bottom-9 left-8 right-8 z-20 sm:bottom-11 sm:left-10 sm:right-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <p className="mt-4 text-xs text-white/50">
                  Click or press Enter to read details →
                </p>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 grid h-full grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl px-6 py-8 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-8 sm:py-9 lg:px-10 lg:py-11">
              <div className="flex items-center justify-between">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/60">
                  {card.backTitle}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.72rem] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  Back
                </span>
              </div>

              <div className="mt-10 max-w-[54ch] pb-16">
                <ul className="space-y-3 text-sm leading-relaxed text-white/80">
                  {card.backLines.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-pretty">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Back */}
              <div className="absolute bottom-9 left-8 right-8 sm:bottom-11 sm:left-10 sm:right-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <p className="mt-4 text-xs text-white/50">
                  Click or press Enter to return
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

// --- Main Component ---
export default function AboutStory() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <section
      aria-labelledby="about-story-heading"
      className="relative overflow-hidden border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Our story
          </div>

          <h2
            id="about-story-heading"
            className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            Nothing is impossible.{" "}
            <span className="block sm:inline">Everything is permitted.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Three short chapters of how we think, build and where we&apos;re
            taking Georgian engineering next.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <StoryCard
              key={card.id}
              card={card}
              isActive={activeId === card.id}
              onToggle={() => toggle(card.id)}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}