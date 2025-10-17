"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/container";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[var(--color-surface)] text-[var(--color-ink)] py-24 sm:py-32"
    >
      <Container className="max-w-4xl">
        {/* Accent line + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="h-1 w-12 rounded-full bg-[var(--color-primary)] mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Control4 Georgia
          </h2>
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-white/80 leading-relaxed"
        >
          <strong>Control4 Georgia</strong> operates under{' '}
          <strong>Technical Service Company</strong> an engineering firm led by
          <strong> Mamuka and Tamta</strong>, specializing in smart system integration, fire safety,
          and advanced building automation across Georgia. Our mission is to bring
          <span className="text-[var(--color-accent)] font-medium">
            {' '}intelligent comfort, security, and control{' '}
          </span>
          into homes and businesses through world-class Control4 solutions, tailored for
          the local environment.
        </motion.p>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <a
            href="/contact"
            className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </motion.div>
      </Container>
    </section>
  );
}