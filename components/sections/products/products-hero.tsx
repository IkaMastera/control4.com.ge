"use client";

import Image from "next/image";
import Container from "@/components/common/container";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
    },
  },
};

const staggerChildren: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export default function ProductsHero() {
  return (
    <section className="relative bg-slate-950 pb-20 pt-10 text-slate-50">
      <Container className="space-y-16">
        {/* HERO CARD */}
        <motion.div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-b-[2.5rem] border-x border-b border-white/10 bg-slate-900/60"
          variants={fadeUpSlow}
          initial="hidden"
          animate="visible"
        >
          {/* Background image */}
          <div className="relative h-[480px] md:h-[550px] lg:h-[630px] w-full">
            <Image
              src="/images/product-bg.webp"
              alt="Smart home controllers, touchscreens, remotes and mobile app"
              fill
              priority
              className="object-cover"
            />

            {/* Dark-to-neon overlay for premium glow */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950/10 via-slate-950/40 to-slate-950/95" />

            {/* Bottom neon glow */}
            <div className="pointer-events-none absolute inset-x-16 bottom-[-70px] h-15 rounded-[5rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.85),rgba(15,23,42,0))] blur-2xl" />

            {/* Text stack */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-12 text-center"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="mb-4 h-[3px] w-44 rounded-full bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400 shadow-[0_0_28px_rgba(56,189,248,0.95)]"
                variants={fadeUp}
              />

              <motion.p
                className="text-[0.7rem] font-semibold tracking-[0.28em] text-sky-200/80"
                variants={fadeUp}
              >
                CONTROL4 PRODUCT CATALOG
              </motion.p>

              <motion.h1
                className="mt-2 max-w-2xl text-balance px-4 text-3xl font-semibold tracking-tight sm:text-4xl"
                variants={fadeUp}
              >
                All your smart-home hardware in one place
              </motion.h1>

              <motion.p
                className="mt-3 max-w-xl px-6 text-balance text-sm text-slate-200/80"
                variants={fadeUp}
              >
                Explore controllers, touchscreens, remotes, speakers, lighting
                and security devices that work together as a single ecosystem.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}