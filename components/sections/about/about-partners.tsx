"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/common/container";
import Image from "next/image";
import { motion } from "framer-motion";

type PartnerLogo = {
  name: string;
  src: string;
  // optional per-logo cap (helps huge wordmark SVGs)
  maxW?: number; // px
};

const LOGOS: PartnerLogo[] = [
  { name: "Apple TV", src: "/logos/appletv.svg", maxW: 150 },
  { name: "Amazon Fire TV", src: "/logos/amazonfiretv.svg", maxW: 175 },
  { name: "Google", src: "/logos/google.svg", maxW: 150 },

  { name: "Bose", src: "/logos/bose.svg", maxW: 140 },
  { name: "Denon", src: "/logos/denon.svg", maxW: 155 },
  { name: "Sonos", src: "/logos/sonos.svg", maxW: 150 },
  { name: "Sony", src: "/logos/sony.svg", maxW: 150 },
  { name: "LG", src: "/logos/lg.svg", maxW: 110 },
  { name: "Samsung", src: "/logos/samsung.svg", maxW: 165 },
  { name: "Sharp", src: "/logos/sharp.svg", maxW: 190 },
  { name: "Panasonic", src: "/logos/panasonic.svg", maxW: 190 },

  { name: "PlayStation 5", src: "/logos/playstation5.svg", maxW: 190 },
  { name: "Xbox", src: "/logos/Xbox.svg", maxW: 135 },
  { name: "Roku", src: "/logos/roku.svg", maxW: 135 },

  { name: "Ubiquiti", src: "/logos/ubiquiti.svg", maxW: 175 },
  { name: "Lutron", src: "/logos/lutron.svg", maxW: 175 },
  { name: "Philips Hue", src: "/logos/philipshue.svg", maxW: 150 },
  { name: "Somfy", src: "/logos/somfy.svg", maxW: 165 },
  { name: "Kwikset", src: "/logos/kwiksete.svg", maxW: 190 },
  { name: "Honeywell", src: "/logos/honeywell.svg", maxW: 195 },
  { name: "Harman", src: "/logos/harman.svg", maxW: 175 },

  { name: "DirecTV", src: "/logos/DirecTV.svg", maxW: 170 },
  { name: "Dish", src: "/logos/dish.svg", maxW: 170 },

  { name: "Dashlane", src: "/logos/dashlane.svg", maxW: 170 },
  { name: "Yale", src: "/logos/yale.svg", maxW: 130 },
];

function LogoRow({ items }: { items: PartnerLogo[] }) {
  return (
    <div className="flex items-center">
      {items.map((logo, i) => (
        <div
          key={`${logo.name}-${i}`}
          className="group flex items-center justify-center px-10"
        >
          {/* Fixed logo box → Image uses fill → no width/height warnings */}
          <div
            className="
              relative
              h-10 sm:h-12 lg:h-14
              w-[220px]
              flex items-center justify-center
            "
            style={{ maxWidth: logo.maxW ? `${logo.maxW}px` : undefined }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="220px"
              className="
                object-contain
                brightness-0 invert
                opacity-65
                group-hover:opacity-100
                transition-opacity duration-300
              "
              // helps reduce initial decode jank
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPartners() {
  const [ready, setReady] = useState(false);

  // start marquee after mount + 1 frame (prevents first-refresh “jump”)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const items = useMemo(() => LOGOS, []);

  return (
    <section
      className="
        relative
        border-t border-white/5
        py-16 sm:py-20 lg:py-24
        overflow-hidden
      "
      aria-labelledby="about-partners-heading"
    >
      <Container>
        {/* Animate only the header, NOT the marquee container */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-white/45">
            Certifications & Partnerships
          </p>
          <h2
            id="about-partners-heading"
            className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white"
          >
            Trusted by globally recognized technology brands.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            We design around proven international ecosystems — from premium audio and
            video to rock-solid networking and access control.
          </p>
        </motion.div>
      </Container>

      <div className="relative w-full overflow-hidden">
        <div
          className={`
            c4-partner-track
            ${ready ? "c4-partner-track--run" : ""}
          `}
          aria-hidden={!ready}
        >
          <LogoRow items={items} />
          <LogoRow items={items} />
        </div>
      </div>
    </section>
  );
}