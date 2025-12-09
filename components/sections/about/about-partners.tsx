"use client";

import Container from "@/components/common/container";
import Image from "next/image";
import { motion } from "framer-motion";

type PartnerLogo = {
  name: string;
  src: string;
};

const LOGOS: PartnerLogo[] = [
  { name: "Bose", src: "/logos/bose.svg" },
  { name: "Denon", src: "/logos/denon.svg" },
  { name: "LG", src: "/logos/lg.svg" },
  { name: "PlayStation 5", src: "/logos/playstation5.svg" },
  { name: "Roku", src: "/logos/roku.svg" },
  { name: "Samsung", src: "/logos/samsung.svg" },
  { name: "Sonos", src: "/logos/sonos.svg" },
  { name: "Sony", src: "/logos/sony.svg" },
  { name: "Ubiquiti", src: "/logos/ubiquiti.svg" },
  { name: "Yale", src: "/logos/yale.svg" },
  { name: "Apple TV", src: "/logos/appletv.svg" },
];

export default function AboutPartners() {
  // duplicate for seamless marquee
  const items = [...LOGOS, ...LOGOS];

  return (
    <motion.section
      className="
        relative
        border-t border-white/5
        bg-[#020617]
        py-16 sm:py-20 lg:py-24
        overflow-hidden
      "
      aria-labelledby="about-partners-heading"
      initial={{ opacity: 0, y: 72 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/45">
            Certifications & Partnerships
          </p>
          <h2
            id="about-partners-heading"
            className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white"
          >
            Trusted by leading audio, video and networking brands.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            We design around proven global ecosystems — from premium audio and
            video to rock-solid networking and access control.
          </p>
        </div>
      </Container>

      {/* Full-width marquee */}
      <div className="relative w-full overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#020617] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#020617] to-transparent" />

        <div className="partner-track flex items-center whitespace-nowrap w-max">
          {items.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group flex items-center justify-center px-10"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={48}
                className="
                  h-9 sm:h-11 lg:h-12
                  w-auto
                  brightness-0 invert
                  opacity-65
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}