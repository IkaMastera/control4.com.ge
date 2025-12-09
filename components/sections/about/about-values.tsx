"use client";

import Container from "@/components/common/container";
import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Reliability over features.",
    text: "Features impress. Reliability keeps systems stable for years.",
  },
  {
    title: "Clean wiring = clean logic.",
    text: "A stable system always begins with neat racks, structured routing, and proper grounding.",
  },
  {
    title: "Every device must earn its place.",
    text: "If it doesn’t improve safety, comfort, or consistency, it doesn’t belong in the design.",
  },
  {
    title: "Design for the future, not today.",
    text: "We engineer systems that scale for 10+ years without rewiring or redesigning everything.",
  },
  {
    title: "Transparent communication.",
    text: "Clear drawings, clear logic, clear expectations — no surprises, no guesswork.",
  },
  {
    title: "Engineering before aesthetics.",
    text: "A beautiful project is the result of engineering excellence — not a substitute for it.",
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function AboutValues() {
  return (
    <motion.section
      className="
        relative
        border-t border-white/5
        bg-[#020617]
        py-20 sm:py-24 lg:py-28
        overflow-hidden
      "
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/45">
            OUR PRINCIPLES
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            How we think.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl mx-auto">
            The engineering mindsets that shape every system we design, build and support.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {VALUES.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="
                group relative rounded-2xl overflow-hidden
                border border-white/10
                bg-linear-to-b from-[#020617] via-[#03091A] to-[#020617]
                p-6
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(0,194,255,0.25)]
                hover:-translate-y-1
              "
            >
              {/* Left neon border */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-accent/80" />

              {/* Subtle glowing orb behind text */}
              <div
                className="
                  absolute inset-0 opacity-15
                  bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.25),transparent_70%)]
                  group-hover:opacity-25 transition-opacity duration-300
                "
              />

              {/* Micro-grid overlay */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-[0.06]
                  bg-[linear-gradient(to_right,#fff1_1px,transparent_1px),linear-gradient(to_bottom,#fff1_1px,transparent_1px)]
                  bg-size-[22px_22px]
                "
              />

              {/* Content */}
              <h3 className="relative text-white font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="relative text-white/70 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}