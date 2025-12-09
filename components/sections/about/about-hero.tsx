"use client";

import Container from "@/components/common/container";
import AboutHeroBlobLayer from "./about-hero-blob-layer";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]
        overflow-hidden
        scroll-mt-24
      "
    >
      <AboutHeroBlobLayer />

      <div
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.55),transparent_55%),
             radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.55),transparent_60%)]
        "
      />

      {/* Content */}
      <Container
        className="
          relative z-10
          pt-24 pb-14
          sm:pt-24 sm:pb-16
          lg:pt-28 lg:pb-20
        "
      >
        <div
          className="
            grid gap-10
            lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
            items-center
          "
        >
          {/* TEXT BLOCK – slides in from left */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/55">
              Control 4 Georgia
            </p>

            <h1
              className="
                mt-4
                text-3xl sm:text-4xl lg:text-5xl
                font-semibold
                leading-tight
                tracking-tight
              "
            >
              We design the{" "}
              <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
                intelligent systems
              </span>{" "}
              that power modern living.
            </h1>

            <div className="mt-5 space-y-3 text-sm sm:text-base text-white/80">
              <p>
                For 17 years, we’ve engineered the hidden infrastructure behind
                high-performance buildings – fire protection systems, smart home
                automation, HVAC control, BMS logic, secure electrical design,
                and enterprise-grade networking. Our work stays invisible, but
                its impact is felt every day: stability, safety, comfort, and
                effortless control.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-xs sm:text-sm text-white/70">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                FIRE SYSTEMS · HVAC · BMS
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                CONTROL4 AUTOMATION
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                ENGINEERING-LED DESIGN
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE – slides in from right (only on large screens) */}
          <motion.div
            className="
              hidden lg:block
              h-[260px] xl:h-80
            "
            aria-hidden="true"
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      </Container>
    </section>
  );
}