"use client";

import Container from "@/components/common/container";
import { motion } from "framer-motion";

export default function AboutStats() {
  // Stagger settings
  const cardStagger = 0.12;
  const chipStagger = 0.06;

  const projects = [
    "Sheraton",
    "Marriott",
    "Radisson Batumi",
    "Radisson Tbilisi",
    "Next Batumi",
    "BAU Hospital",
    "Batumi Mall",
    "Sarfi Casino",
    "Upcoming projects in Dubai",
    "Tbilisi",
    "Bakuriani",
    "Kakheti",
    "Batumi",
    "Turkey",
  ];

  return (
    <motion.section
      className="
        relative
        border-t border-white/5
        bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.10),transparent_55%),#020617]
        py-16 sm:py-20 lg:py-24
        overflow-hidden
      "
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="max-w-3xl"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/45">
            TEAM CREDIBILITY
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Trusted on Georgia’s most demanding projects.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70">
            For over 17 years, our engineering team has designed and delivered
            fire systems, smart home automation, HVAC control and BMS
            infrastructure for hotels, hospitals, malls and high-end
            residences across Georgia and beyond.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div
          className="
            mt-10 grid gap-5
            sm:grid-cols-3
          "
        >
          {[
            {
              label: "Years of engineering experience",
              value: "17+",
              detail:
                "Leading fire, HVAC, BMS and smart automation projects across Georgia.",
            },
            {
              label: "Specialists under one roof",
              value: "30+",
              detail:
                "Engineers, technicians and programmers aligned on one integrated design.",
            },
            {
              label: "Engineering hours invested",
              value: "100 000+",
              detail:
                "Designing, wiring, commissioning and maintaining critical building systems.",
            },
          ].map((card, i) => (
            <StatCard
              key={i}
              label={card.label}
              value={card.value}
              detail={card.detail}
              delay={0.2 + i * cardStagger}
            />
          ))}
        </div>

        {/* PROJECT CHIPS WITH SEQUENTIAL ANIMATION */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            SELECT LANDMARK PROJECTS
          </p>

          <motion.div
            className="
              mt-4 flex flex-wrap gap-x-4 gap-y-2
              text-sm text-white/70
            "
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: chipStagger,
                },
              },
            }}
          >
            {projects.map((name) => (
              <motion.span
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="
                  relative
                  rounded-full
                  bg-white/5
                  px-3 py-1
                  text-xs sm:text-[0.8rem]
                  text-white/75
                  backdrop-blur
                  border border-white/10
                  hover:border-accent/60
                  hover:text-white
                  transition-colors
                "
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  delay: number;
};

function StatCard({ label, value, detail, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-white/2
        px-5 py-6 sm:px-6 sm:py-7
        shadow-[0_0_0_1px_rgba(15,23,42,0.7)]
        transition-shadow
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_0_40px_rgba(0,194,255,0.25)]
      "
    >
      {/* subtle top accent line */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0 h-px
          bg-linear-to-r from-transparent via-accent to-transparent
          opacity-40
          group-hover:opacity-80
          transition-opacity duration-300
        "
      />

      <div className="text-3xl sm:text-4xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="mt-3 text-xs sm:text-sm text-white/65">{detail}</p>
    </motion.div>
  );
}