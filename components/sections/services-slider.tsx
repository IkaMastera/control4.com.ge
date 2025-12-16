// app/components/sections/services-slider.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/common/container";
import { motion, useReducedMotion } from "framer-motion";
import {
  Lightbulb,
  Bell,
  Film,
  ThermometerSun,
  BatteryCharging,
  Blinds,
  MessageSquare,
  SlidersHorizontal,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RotatingWords from "../ui/rotating-words";

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

const SERVICES: Service[] = [
  {
    id: "energy",
    icon: BatteryCharging,
    title: "Energy Management",
    desc: "Take full control of your home’s energy performance. Optimize PV, battery storage, EV charging and overall consumption—automated through Control4 for efficient, sustainable living.",
  },
  {
    id: "alarm",
    icon: Bell,
    title: "Alarm & Security",
    desc: "Protect your home with a fully integrated security ecosystem. Arm or disarm, monitor in real time, and receive instant alerts from a single Control4 interface.",
  },
  {
    id: "media",
    icon: Film,
    title: "Multimedia",
    desc: "Experience whole-home audio and video in perfect harmony. Scenes, sources, and volume stay synchronized across every room—from music that follows you to cinematic video moments.",
  },
  {
    id: "hvac",
    icon: ThermometerSun,
    title: "HVAC & Climate",
    desc: "Effortless comfort, intelligently delivered. Control4 adjusts temperature, schedules, and sensors to keep every room comfortable and consistent throughout the day.",
  },
  {
    id: "lighting",
    icon: Lightbulb,
    title: "Lighting Control",
    desc: "Lighting that shapes the mood of your home. Smooth dimming, refined keypads, and personalized scenes bring elegance and balance to every space.",
  },
  {
    id: "shades",
    icon: Blinds,
    title: "Shades & Blinds",
    desc: "Elegant shading, effortlessly automated. Motorized shades move with natural light to improve comfort, privacy, and the character of every room.",
  },
  {
    id: "intercom",
    icon: MessageSquare,
    title: "Intercom Anywhere",
    desc: "Always within reach, from anywhere. Answer the door, talk between rooms, or unlock entry—whether you are at home or using your phone on the other side of the world.",
  },
  {
    id: "scenes",
    icon: SlidersHorizontal,
    title: "Smart Scenes",
    desc: "Perfect harmony with one touch. Control4 unites lighting, music, climate, and security in a single command that supports the flow of everyday living.",
  },
];

export default function ServicesSlider() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Watch which card is most visible and update the active index
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-card='service']"),
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!inView) return;

        const index = cards.findIndex((card) => card === inView.target);
        if (index !== -1) setActive(index);
      },
      {
        root: el,
        threshold: [0.6, 0.8, 0.95],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Track scroll position so we can show the progress bar
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll horizontally by approximately one card
  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-card='service']");
    const width = card ? card.getBoundingClientRect().width : 320;

    el.scrollBy({
      left: dir * (width + 24),
      behavior: "smooth",
    });
  };

  const dots = useMemo(
    () => Array.from({ length: SERVICES.length }),
    [],
  );

  return (
    <section className="relative bg-bg py-20 sm:py-24">
      <Container>
        {/* Heading row: section title + arrows */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between gap-6 sm:mb-12"
        >
          <div>
            <div className="mb-4 h-1 w-12 rounded-full bg-primary" />
            <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl w-[14ch]">
              Solutions &{" "}
              <RotatingWords
                words={[
                  "Functionalities",
                  "Automation",
                  "Comfort",
                  "Security",
                ]}
                interval={2200}
                className="text-primary"
              />
            </h2>
            <p className="mt-2 text-white/70">
              Smarter living and working with Control4 automation.
            </p>
          </div>

          {/* Slider arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/10 transition hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/10 transition hover:bg-white/20"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll track with snap cards */}
        <div
          ref={trackRef}
          className="group relative flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-none"
          // On desktop: use vertical wheel movement to scroll the row
          onWheel={(e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
              (e.currentTarget as HTMLDivElement).scrollLeft += e.deltaY;
            }
          }}
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.id}
              data-card="service"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="min-w-[280px] snap-center rounded-2xl border border-white/15 bg-surface/90 p-6 text-left shadow-sm transition hover:border-white/30 hover:bg-surface sm:min-w-[320px] md:min-w-[360px] sm:p-7"
            >
              {/* Icon circle with soft halo */}
              <div className="relative mx-auto mb-5 grid size-36 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <service.icon className="h-9 w-9 text-white/90" />
                <span className="absolute right-4 top-4 inline-block size-4 rounded-full bg-primary shadow-[0_0_0_3px_rgba(0,0,0,0.25)]" />
              </div>

              {/* Title and description */}
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/75">
                {service.desc}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Progress + dots + CTA row */}
        <div className="mt-10 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
          {/* Mobile dots: one card per view */}
          <div className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 md:hidden">
            {dots.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to item ${i + 1}`}
                onClick={() => {
                  const el = trackRef.current;
                  if (!el) return;
                  const card =
                    el.querySelectorAll<HTMLElement>(
                      "[data-card='service']",
                    )[i];
                  card?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                  });
                }}
                className={`h-2 w-2 cursor-pointer rounded-full transition ${
                  i === active
                    ? "scale-110 bg-white"
                    : "bg-white/40 hover:scale-110 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Desktop progress bar */}
          <div className="hidden min-w-[260px] items-center gap-3 md:flex">
            <div
              className="relative h-2 w-[260px] cursor-pointer overflow-hidden rounded-full bg-white/10"
              onClick={(e) => {
                const el = trackRef.current;
                if (!el) return;

                const rect = (
                  e.currentTarget as HTMLDivElement
                ).getBoundingClientRect();
                const pct = Math.min(
                  1,
                  Math.max(0, (e.clientX - rect.left) / rect.width),
                );
                const max = el.scrollWidth - el.clientWidth;

                el.scrollTo({
                  left: pct * max,
                  behavior: "smooth",
                });
              }}
              aria-label="Scroll services"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              {/* Filled part of the bar */}
              <div
                className="absolute inset-y-0 left-0 bg-primary/40"
                style={{
                  width: `${progress * 100}%`,
                  transition: "width 200ms ease",
                }}
              />
              {/* Handle circle */}
              <div
                className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgba(0,0,0,0.25)]"
                style={{
                  left: `calc(${progress * 100}% - 6px)`,
                  transition: "left 200ms ease",
                }}
              />
            </div>
            <span className="text-sm text-white/60 tabular-nums">
              {active + 1} / {SERVICES.length}
            </span>
          </div>

          {/* CTA button to Solutions page */}
          <a
            href="/solutions"
            className="btn-glow inline-flex items-center gap-2 self-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:self-auto"
          >
            Discover Functionalities
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}