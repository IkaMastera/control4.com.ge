"use client";

import { useState, KeyboardEvent } from "react";
import Container from "@/components/common/container";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  id: string;
  order: string;
  label: string;
  title: string;
  kicker: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    id: "consultation",
    order: "01",
    label: "Consultation & Requirements",
    title: "We start with your building, not with devices.",
    kicker:
      "We listen, map your spaces and understand how you actually live and work.",
    bullets: [
      "On-site or remote consultation to understand goals, pain points and budget.",
      "Review of existing drawings, systems and infrastructure.",
      "Defined scope: what should be automated, protected, monitored and controlled.",
    ],
  },
  {
    id: "engineering",
    order: "02",
    label: "Engineering & System Design",
    title: "Systems first: fire, HVAC, BMS, smart home and networking as one design.",
    kicker: "We translate requirements into drawings, wiring plans and control logic.",
    bullets: [
      "Detailed engineering for fire systems, HVAC, BMS, smart home and network layers.",
      "Load calculations, cable routing, panel design and device selection.",
      "Clear documentation so the project can be built, tested and maintained for years.",
    ],
  },
  {
    id: "installation",
    order: "03",
    label: "Installation & Programming",
    title: "Clean wiring, clean racks, clean logic.",
    kicker:
      "Our teams install, label, terminate and program according to the design.",
    bullets: [
      "On-site installation, wiring and device placement according to drawings.",
      "Racks, panels and field devices are labelled and documented.",
      "Programming of Control4, BMS controllers and integrations between subsystems.",
    ],
  },
  {
    id: "testing",
    order: "04",
    label: "Testing & Tuning",
    title: "We don’t hand over until it feels effortless.",
    kicker:
      "Every scenario is tested under real conditions before we call it complete.",
    bullets: [
      "Functional testing of fire, HVAC, BMS and smart home scenes.",
      "Fine-tuning of response times, user interfaces and automations.",
      "Training sessions so owners, managers and staff are confident using the system.",
    ],
  },
  {
    id: "support",
    order: "05",
    label: "Long-term Support",
    title: "We stay responsible for what we build.",
    kicker:
      "Systems are monitored, updated and extended as buildings and needs evolve.",
    bullets: [
      "Ongoing support, diagnostics and configuration updates.",
      "Planned maintenance for critical systems where downtime is not acceptable.",
      "Options for future expansions, new devices and software integrations.",
    ],
  },
];

const navVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const detailVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

export default function AboutProcess() {
  const [activeId, setActiveId] = useState<string>(
    STEPS[0]?.id ?? "consultation",
  );

  const activeStep = STEPS.find((step) => step.id === activeId) ?? STEPS[0];
  const activeIndex = Math.max(
    0,
    STEPS.findIndex((step) => step.id === activeId),
  );

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  const handleKeyDown =
    (id: string) =>
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect(id);
      }
    };

  const progressPercent =
    STEPS.length > 1 ? (activeIndex / (STEPS.length - 1)) * 100 : 0;

  return (
    <motion.section
      className="
        relative
        border-t border-white/5
        bg-[#020617]
        py-16 sm:py-20 lg:py-24
        overflow-hidden
      "
      aria-labelledby="about-process-heading"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        {/* Header */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/45">
            HOW WE WORK
          </p>
          <h2
            id="about-process-heading"
            className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white"
          >
            A clear process from first call to long-term support.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70">
            We treat every project as an engineered system — from consultation,
            through design and installation, to testing and long-term
            responsibility.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* LEFT: timeline / step navigation */}
          <motion.div
            className="lg:w-[48%] space-y-8"
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            {/* Desktop / tablet horizontal timeline */}
            <div className="hidden sm:block" aria-hidden="false">
              <div className="relative">
                {/* base line */}
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />

                {/* shimmering line overlay */}
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
                  <div
                    className="
                      h-full
                      bg-linear-to-r from-accent via-accent to-primary
                      opacity-40
                      animate-[process-line-shimmer_18s_ease-in-out_infinite]
                    "
                  />
                </div>

                {/* active progress line */}
                <div className="absolute left-0 top-1/2 h-px -translate-y-1/2">
                  <div
                    className="
                      h-full
                      bg-linear-to-r from-accent to-primary
                    "
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* nodes */}
                <div className="relative flex justify-between">
                  {STEPS.map((step) => {
                    const isActive = step.id === activeId;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleSelect(step.id)}
                        onKeyDown={handleKeyDown(step.id)}
                        className="
                          group
                          relative flex flex-col items-center
                          pt-7
                          focus:outline-none
                        "
                      >
                        {/* node */}
                        <span
                          className={`
                            relative flex h-5 w-5 items-center justify-center rounded-full
                            border
                            transition-all duration-300
                            ${
                              isActive
                                ? "border-accent bg-accent/20 shadow-[0_0_18px_rgba(0,194,255,0.7)]"
                                : "border-white/30 bg-[#020617] group-hover:border-accent/80"
                            }
                          `}
                        >
                          <span
                            className={`
                              block h-2.5 w-2.5 rounded-full
                              transition-all duration-300
                              ${
                                isActive
                                  ? "bg-accent"
                                  : "bg-white/40 group-hover:bg-accent/90"
                              }
                            `}
                          />
                          {/* inner moving glow */}
                          <span
                            className={`
                              pointer-events-none absolute inset-0 rounded-full
                              opacity-40
                              ${
                                isActive
                                  ? "animate-[process-node-orbit_10s_ease-in-out_infinite]"
                                  : ""
                              }
                            `}
                          />
                        </span>

                        {/* label */}
                        <span className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                          {step.order} · {step.label.split("&")[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile: vertical step list */}
            <div className="sm:hidden space-y-2" aria-hidden="false">
              {STEPS.map((step) => {
                const isActive = step.id === activeId;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelect(step.id)}
                    onKeyDown={handleKeyDown(step.id)}
                    className={`
                      w-full rounded-2xl border px-4 py-3 text-left text-xs
                      transition-colors duration-200
                      ${
                        isActive
                          ? "border-accent bg-white/6 text-white"
                          : "border-white/10 bg-white/3 text-white/70"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold tracking-[0.18em] uppercase">
                        {step.order}
                      </span>
                      <span className="flex-1 text-[0.75rem] text-right">
                        {step.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: active step detail card */}
          <div className="lg:flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                variants={detailVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/2
                  px-6 py-7 sm:px-8 sm:py-9
                  shadow-[0_0_0_1px_rgba(15,23,42,0.7)]
                  transition-shadow duration-300
                "
              >
                {/* subtle gradient glow */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      absolute -inset-10
                      opacity-35
                      bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(0,86,184,0.45),transparent_60%)]
                    "
                  />
                </div>

                <div className="relative space-y-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {activeStep.order} · {activeStep.label}
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80">
                    {activeStep.kicker}
                  </p>

                  <ul className="mt-3 space-y-2.5 text-sm text-white/80">
                    {activeStep.bullets.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}