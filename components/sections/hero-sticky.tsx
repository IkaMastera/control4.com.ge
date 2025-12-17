"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/common/container";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

type VideoFit = "cover" | "contain" | "fill";

type Pane = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  videoMp4: string;
  videoWebm?: string;
  badgeSrc?: string;
  badgeAlt?: string;
  videoFit?: VideoFit;
  videoScale?: number;
  features?: string[];
  tagline?: string;
};

const PANES: Pane[] = [
  {
    id: "award",
    eyebrow: "A smarter way to live with",
    title: "A fully connected",
    highlight: "home",
    body:
      "Experience a home where every system works together in perfect harmony - Lighting, HVAC, Audio, Video & TV, Security, Access Control, Blinds, Energy Systems, Sensors, and Networking - all unified through one intelligent platform. A seamless ecosystem that enhances comfort and simplifies everyday living.",
    videoWebm: "/videos/smarthome-loop2.webm",
    videoMp4: "/videos/smarthome-loop2.mp4",
    videoFit: "cover",
    videoScale: 1.08,
    tagline: "WHOLE-HOME AUTOMATION • EVERYTHING WORKS TOGETHER",
  },
  {
    id: "energy",
    eyebrow: "The central intelligence behind",
    title: "Your home’s",
    highlight: "brain",
    body:
      "The Core 5 processes every command instantly - orchestrating lighting, audio, climate, security, and scenes with enterprise-grade reliability. Quiet. Powerful. Always on.",
    videoWebm: "/videos/core5-loop.webm",
    videoMp4: "/videos/core5-loop.mp4",
    videoFit: "fill",
    videoScale: 1,
    tagline: "CORE 5 CONTROLLER • THE ENGINE OF YOUR SMART HOME",
  },
  {
    id: "durable",
    eyebrow: "Effortless control through",
    title: "One elegant",
    highlight: "touch panel",
    body:
      "Your home's entire intelligence at your fingertips. The Touch Panel gives you seamless control of lighting, HVAC, audio, video, security, access, and scenes — all through a beautifully responsive, always-ready interface designed for modern living.",
    videoWebm: "/videos/touchpad-loop.webm",
    videoMp4: "/videos/touchpad-loop.mp4",
    videoFit: "cover",
    videoScale: 1,
    tagline: "TOUCH PANEL • YOUR HOME AT YOUR FINGERTIPS",
  },
];

const MOBILE_PANE_INDEX = 1; // Core 5 only on mobile

function fitClass(fit?: VideoFit) {
  if (fit === "contain") return "object-contain bg-black";
  if (fit === "fill") return "object-fill";
  return "object-cover";
}

export default function HeroSticky() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [storyMode, setStoryMode] = useState(false);

  // story mode only on md+ (iPad and up)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setStoryMode(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  // Scroll-driven active pane (md+ only)
  useEffect(() => {
    if (!storyMode) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    let rAF = 0;

    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const effectiveHeight = Math.max(1, wrap.offsetHeight - viewportH * 0.7);

        const scrolled = Math.min(
          1,
          Math.max(0, (viewportH - rect.top - viewportH * 0.05) / effectiveHeight),
        );

        const idx = Math.min(
          PANES.length - 1,
          Math.max(0, Math.floor(scrolled * PANES.length)),
        );

        setActive(idx);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [storyMode]);

  // Scroll to pane (md+ story mode)
  const scrollToPane = (index: number) => {
    if (!storyMode) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const viewportH = window.innerHeight;
    const wrapRect = wrap.getBoundingClientRect();
    const wrapTop = wrapRect.top + window.scrollY;
    const wrapHeight = wrap.offsetHeight;

    const effectiveHeight = Math.max(1, wrapHeight - viewportH * 0.7);
    const segment = 1 / PANES.length;
    const scrolledTarget = segment * (index + 0.5);

    const newScrollY =
      wrapTop - viewportH * 0.95 + scrolledTarget * effectiveHeight;

    window.scrollTo({ top: newScrollY, behavior: "smooth" });
  };

  // MOBILE (<md): Core 5 only
  if (!storyMode) {
    const p = PANES[MOBILE_PANE_INDEX];

    return (
      <section
        id="hero-sticky"
        aria-label="Control4 Product Hero"
        className="relative z-0 bg-bg"
      >
        <Container className="py-4 sm:py-6">
          <div className="grid grid-cols-1 gap-6">
            {/* TEXT */}
            <motion.div
              className="
                rounded-2xl bg-surface/80 ring-1 ring-white/10
                p-6 sm:p-8
              "
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-white/80 sm:text-sm">
                {p.eyebrow} <span className="text-accent">•</span>
              </h2>

              <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {p.title} <span className="text-accent">{p.highlight}</span>
              </h3>

              {/* no dots on mobile */}

              <div className="my-5 h-px w-full bg-white/15" />

              <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                {p.body}
              </p>

              <a
                href="/price-calculator"
                className="
                  mt-7 inline-flex items-center justify-center gap-2
                  rounded-xl border border-accent/60 px-4 py-3
                  text-sm font-medium text-white hover:bg-accent/15
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
              >
                Order Today <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* VIDEO */}
            <motion.div
              className="
                relative overflow-hidden rounded-2xl bg-black ring-1 ring-white/10
                h-[240px] sm:h-[320px]
              "
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <video
                className={`absolute inset-0 h-full w-full object-center ${fitClass(p.videoFit)}`}
                style={{
                  transform:
                    p.videoScale && p.videoScale !== 1 ? `scale(${p.videoScale})` : undefined,
                  transformOrigin: "center",
                }}
                autoPlay
                muted
                loop
                playsInline
              >
                {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
                <source src={p.videoMp4} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </Container>
      </section>
    );
  }

  // Tablet/Desktop (md+): sticky story
  return (
    <section
      id="hero-sticky"
      aria-label="Control4 Product Hero"
      className="relative z-0 bg-bg"
    >
      <div
        ref={wrapRef}
        className="
          relative z-0 rounded-none
          md:h-[360vh] lg:h-[420vh] xl:h-[480vh]
        "
      >
        <Container
          className="
            py-4 sm:py-6
            md:sticky md:top-(--header-h,72px)
            md:h-[calc(92.5svh-var(--header-h,72px))]
          "
        >
          <div
            className="
              relative grid h-full gap-6
              md:grid-rows-[1fr_1fr] md:grid-cols-1
              lg:grid-rows-1 lg:grid-cols-[0.42fr_1fr]
            "
          >
            {/* LEFT PANEL */}
            <motion.div
              className="
                relative z-0 min-h-0
                flex flex-col justify-between overflow-hidden
                rounded-2xl bg-surface/80 ring-1 ring-white/10
                p-6 sm:p-8 md:p-10 pb-12 md:pb-14 pb-safe
              "
              initial={{ opacity: 0, x: -40, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative z-0 min-h-0">
                {PANES.map((p, i) => (
                  <div
                    key={p.id}
                    aria-hidden={active !== i}
                    className={`
                      absolute inset-0
                      transition-all duration-500
                      ${
                        active === i
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0 pointer-events-none"
                      }
                    `}
                  >
                    <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-white/80 sm:text-sm">
                      {p.eyebrow} <span className="text-accent">•</span>
                    </h2>

                    <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                      {p.title} <span className="text-accent">{p.highlight}</span>
                    </h3>

                    {/* DOT NAV (visible on tablets; desktop uses left rail) */}
                    <div className="mt-3 flex gap-2 lg:hidden pointer-events-auto">
                      {PANES.map((pane, index) => (
                        <button
                          key={pane.id}
                          type="button"
                          aria-label={`Go to ${pane.title}`}
                          aria-pressed={index === active}
                          onClick={() => scrollToPane(index)}
                          className={`
                            h-3.5 w-3.5 cursor-pointer rounded-full border border-white/30 transition
                            ${
                              index === active
                                ? "scale-110 bg-accent shadow-[0_0_0_4px_rgba(0,194,255,0.35)]"
                                : "bg-white/10 hover:bg-white/40"
                            }
                          `}
                        />
                      ))}
                    </div>

                    <div className="my-5 h-px w-full bg-white/15" />

                    <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/price-calculator"
                className="
                  mt-8 mb-1 inline-flex items-center justify-center gap-2 self-start
                  rounded-xl border border-accent/60 px-4 py-3
                  text-sm font-medium text-white hover:bg-accent/15
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
              >
                Order Today <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* RIGHT PANEL (video) */}
            <motion.div
              className="
                relative min-h-0 overflow-hidden rounded-2xl bg-black
                ring-1 ring-white/10
              "
              initial={{ opacity: 0, x: 40, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
            >
              {PANES.map((p, i) => (
                <div
                  key={p.id}
                  aria-hidden={active !== i}
                  className={`
                    absolute inset-0 transition-all duration-500
                    ${
                      active === i
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0 pointer-events-none"
                    }
                  `}
                >
                  <div className="relative h-full w-full">
                    {p.badgeSrc && (
                      <Image
                        src={p.badgeSrc}
                        alt={p.badgeAlt || ""}
                        width={80}
                        height={80}
                        className="absolute right-4 top-4 z-10 w-20"
                      />
                    )}

                    <video
                      className={`absolute inset-0 h-full w-full object-center ${fitClass(p.videoFit)}`}
                      style={{
                        transform:
                          p.videoScale && p.videoScale !== 1 ? `scale(${p.videoScale})` : undefined,
                        transformOrigin: "center",
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
                      <source src={p.videoMp4} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* DESKTOP VERTICAL DOT NAV – lg+ */}
            <div className="pointer-events-none absolute inset-y-0 -left-10 hidden lg:flex">
              <div className="pointer-events-auto flex flex-col items-center justify-center gap-4">
                {PANES.map((pane, index) => (
                  <button
                    key={pane.id}
                    type="button"
                    aria-label={`Go to ${pane.title}`}
                    aria-pressed={index === active}
                    onClick={() => scrollToPane(index)}
                    className={`
                      h-4 w-4 rounded-full border cursor-pointer border-white/30 transition
                      ${
                        index === active
                          ? "scale-125 bg-accent shadow-[0_0_0_6px_rgba(0,194,255,0.35)]"
                          : "bg-white/10 hover:bg-white/40"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}