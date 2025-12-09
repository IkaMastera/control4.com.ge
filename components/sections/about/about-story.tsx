"use client";

import { useState, KeyboardEvent } from "react";
import Container from "@/components/common/container";
import { motion } from "framer-motion";

type StoryCard = {
  id: string;
  title: string;
  subtitle: string;
  backTitle: string;
  backLines: string[];
};

const CARDS: StoryCard[] = [
  {
    id: "origins",
    title: "From local jobs to landmark systems.",
    subtitle:
      "17+ years going from apartments and small sites to Georgia’s biggest hotels, malls and hospitals.",
    backTitle: "Where we came from",
    backLines: [
      "Started with fire systems and electrical work on local projects.",
      "Grew into full-stack engineering: fire, HVAC, BMS, networking and smart home.",
      "Trusted on Sheraton, Marriott, Radisson, BAU Hospital, Batumi Mall and more.",
    ],
  },
  {
    id: "method",
    title: "Systems first, not devices.",
    subtitle:
      "We treat every constraint as an engineering problem — not something to patch later on site.",
    backTitle: "How we build",
    backLines: [
      "Clean drawings, clean wiring, clean logic. No guesswork on site.",
      "Reliability over features: load, routing, grounding and networks come first.",
      "Every device must earn its place in the design.",
    ],
  },
  {
    id: "future",
    title: "Georgian engineering, global standards.",
    subtitle:
      "Nothing is impossible, everything is permitted — if it is engineered properly.",
    backTitle: "Where we’re going",
    backLines: [
      "Expanding from Georgia to Dubai, Turkey and beyond.",
      "Building systems that can be serviced and extended for 10+ years.",
      "Proving that projects built in Georgia can run at world-class level.",
    ],
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function AboutStory() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown =
    (id: string) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard(id);
      }
    };

  return (
    <motion.section
      className="
        relative
        border-t border-white/5
        bg-[#020617]
        py-16 sm:py-20 lg:py-24
        overflow-hidden
      "
      aria-labelledby="about-story-heading"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Our story
          </div>

          <h2
            id="about-story-heading"
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white"
          >
            Nothing is impossible.{" "}
            <span className="block sm:inline">Everything is permitted.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Three short chapters of how we think, build and where we&apos;re
            taking Georgian engineering next.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="
            grid gap-8
            sm:grid-cols-3
          "
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {CARDS.map((card) => {
            const isActive = activeId === card.id;

            return (
              <motion.div
                key={card.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${card.title} – ${
                  isActive ? "details open" : "details closed"
                }`}
                variants={cardVariants}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={
                  "story-card group relative min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] cursor-pointer rounded-3xl border border-white/10 bg-linear-to-b from-[#020617] via-[#050816] to-[#020617] p-px " +
                  "shadow-[0_0_0_1px_rgba(15,23,42,0.7)] transition-shadow duration-300 " +
                  (isActive
                    ? "story-card--flipped shadow-[0_0_40px_rgba(0,194,255,0.35)]"
                    : "hover:shadow-[0_0_30px_rgba(0,194,255,0.22)] focus-visible:shadow-[0_0_30px_rgba(0,194,255,0.3)]")
                }
                onClick={() => toggleCard(card.id)}
                onKeyDown={handleKeyDown(card.id)}
              >
                <div
                  className="
                    story-card-inner
                    relative h-full
                    rounded-[1.4rem]
                    bg-[#020617]
                    px-8 py-10 sm:px-10 sm:py-12
                    transition-transform duration-300
                    group-hover:-translate-y-1
                  "
                >
                  {/* animated glow background */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      rounded-[1.4rem]
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        absolute -inset-10
                        opacity-40
                        bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.45),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,86,184,0.55),transparent_60%)]
                        animate-[story-orbit_16s_ease-in-out_infinite]
                      "
                    />
                  </div>

                  {/* FRONT */}
                  <div className="story-card-face relative flex h-full flex-col justify-end">
                    <div className="mb-auto">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {card.id === "origins"
                          ? "Origins"
                          : card.id === "method"
                          ? "How we build"
                          : "Future"}
                      </p>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/80">
                      {card.subtitle}
                    </p>

                    <p className="mt-4 text-xs text-[#9CA3AF]">
                      Click or press Enter to flip.
                    </p>
                  </div>

                  {/* BACK */}
                  <div className="story-card-face story-card-back relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {card.backTitle}
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                        {card.backLines.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-5 text-xs text-[#9CA3AF]">
                      Click or press Enter again to go back.
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </motion.section>
  );
}
