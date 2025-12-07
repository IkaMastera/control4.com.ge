"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/common/container";
import { ArrowUpRight } from "lucide-react";

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

  // Kept for future use, not rendered now
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
    videoMp4: "/videos/smarthome-loop2.mp4",
    videoFit: "cover",
    videoScale: 1,
    tagline: "WHOLE-HOME AUTOMATION • EVERYTHING WORKS TOGETHER",
  },

  {
    id: "energy",
    eyebrow: "The central intelligence behind",
    title: "Your home’s",
    highlight: "brain",
    body:
      "The Core 5 processes every command instantly - orchestrating lighting, audio, climate, security, and scenes with enterprise-grade reliability. Quiet. Powerful. Always on.",
    videoMp4: "/videos/core5-loop.mp4",
    videoWebm: "/videos/core5-loop.webm",
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
    videoMp4: "/videos/touchpad-loop.mp4",
    videoFit: "cover",
    videoScale: 1,
    tagline: "TOUCH PANEL • YOUR HOME AT YOUR FINGERTIPS",
  }
];

export default function HeroSticky() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let rAF = 0;
    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const scrolled = Math.min(
          1,
          Math.max(
            0,
            (viewportH - rect.top - viewportH * 0.05) /
              (wrap.offsetHeight - viewportH)
          )
        );

        const idx = Math.min(
          PANES.length - 1,
          Math.max(0, Math.floor(scrolled * PANES.length))
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
  }, []);

  return (
    <section
      id="hero-sticky"
      aria-label="Control4 Product Hero"
      className="relative z-0 bg-[var(--color-bg)]"
    >
      <div
        ref={wrapRef}
        className="relative z-0 h-[500vh] sm:h-[560vh] rounded-none"
      >
        <Container className="sticky top-[var(--header-h,72px)] h-[calc(92.5svh-var(--header-h,72px))] py-4 sm:py-6">
          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-[0.42fr_1fr]">
            {/* LEFT PANEL */}
            <div
              className="
                rounded-2xl bg-[var(--color-surface)]/80 ring-1 ring-white/10
                p-6 sm:p-8 md:p-10 pb-12 md:pb-14 pb-safe
                flex flex-col justify-between overflow-hidden z-0
              "
            >
              <div className="relative min-h-0 z-0">
                {PANES.map((p, i) => (
                  <div
                    key={p.id}
                    aria-hidden={active !== i}
                    className={`
                      absolute inset-0 transition-all duration-500
                      ${
                        active === i
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }
                    `}
                  >
                    <h2 className="text-white/90 text-base tracking-[0.15em] uppercase">
                      {p.eyebrow}{" "}
                      <span className="text-[var(--color-accent)]">•</span>
                    </h2>
                    <h3 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight text-white">
                      {p.title}{" "}
                      <span className="text-[var(--color-accent)]">
                        {p.highlight}
                      </span>
                    </h3>
                    <div className="my-5 h-px w-full bg-white/15" />
                    <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                className="
                  mt-8 inline-flex items-center justify-center gap-2 self-start
                  rounded-xl border border-[var(--color-accent)]/60 px-4 py-3
                  text-sm font-medium text-white hover:bg-[var(--color-accent)]/15
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 mb-4
                "
              >
                Order Today <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* RIGHT PANEL – per-pane video behaviour */}
            <div
              className="
                relative rounded-2xl ring-1 ring-white/10
                bg-black overflow-hidden
              "
            >
              {PANES.map((p, i) => (
                <div
                  key={p.id}
                  className={`
                    absolute inset-0 transition-all duration-500
                    ${
                      active === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                  `}
                >
                  <div className="relative h-full w-full">
                    {p.badgeSrc && (
                      <img
                        src={p.badgeSrc}
                        alt={p.badgeAlt || ""}
                        className="absolute right-4 top-4 z-10 w-20"
                        loading="lazy"
                      />
                    )}

                    <video
                      className={`
                        h-full w-full
                        ${
                          p.videoFit === "contain"
                            ? "object-contain bg-black"
                            : p.videoFit === "fill"
                            ? "object-fill"
                            : "object-cover"
                        }
                      `}
                      style={{
                        transform:
                          p.videoScale && p.videoScale !== 1
                            ? `scale(${p.videoScale})`
                            : undefined,
                        transformOrigin: "center",
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      {p.videoWebm && (
                        <source src={p.videoWebm} type="video/webm" />
                      )}
                      <source src={p.videoMp4} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
