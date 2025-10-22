"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/common/container";
import { ArrowUpRight } from "lucide-react";

type Pane = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string; // highlighted phrase inside title
  body: string;
  videoMp4: string;
  videoWebm?: string;
  badgeSrc?: string;
  badgeAlt?: string;
};

const PANES: Pane[] = [
  {
    id: "award",
    eyebrow: "Reinventing micro-mobility with",
    title: "Award winning",
    highlight: "design",
    body:
      "Our mission is to close the gap between a scooter and a bike. The product is the lightest in its category, designed to be agile and fun for everyone to ride.",
    videoMp4:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.mp4",
    videoWebm:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.webm",
    badgeSrc:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65b0dc37d226a551affbf2ea_GDA24_HO_WINNER_MC_RGB.webp",
    badgeAlt: "German Design Award 2024",
  },
  {
    id: "energy",
    eyebrow: "Best in class energy management for",
    title: "optimal",
    highlight: "autonomy",
    body:
      "3 riding modes — eco, normal and boost — offering long range on a single charge with a swappable battery.",
    videoMp4:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.mp4",
    videoWebm:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.webm",
  },
  {
    id: "durable",
    eyebrow: "Durable and effortless,",
    title: "all the",
    highlight: "way",
    body:
      "Years of engineering, stripping away unnecessary components to deliver a simple, efficient experience.",
    videoMp4:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.mp4",
    videoWebm:
      "https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.webm",
  },
];

export default function HeroSticky() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Compute active pane based on scroll progress through the tall wrapper
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let rAF = 0;
    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const total = wrap.scrollHeight - viewportH; // ~height we traverse
        // position from 0..1 within this section
        const scrolled = Math.min(
          1,
          Math.max(0, (viewportH - rect.top - viewportH * 0.05) / (wrap.offsetHeight - viewportH))
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
    <section id="hero-sticky" aria-label="Sticky Hero" className="relative z-0 bg-[var(--color-bg)]">
      <div
        ref={wrapRef}
        className="
          relative
          z-0
          h-[500vh] sm:h-[560vh]
          rounded-none
        "
      >
        <Container className="sticky top-[var(--header-h,72px)] h-[calc(100svh-var(--header-h,72px))] py-4 sm:py-6">
          {/* grid: left text, right media */}
          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-[0.42fr_1fr]">
            {/* LEFT: stacked texts (fade cross) */}
            <div className="
            rounded-2xl bg-[var(--color-surface)]/80 ring-1 ring-white/10
            p-6 sm:p-8 md:p-10 pb-12 md:pb-14 pb-safe
            flex flex-col justify-between overflow-hidden z-0
            ">
              <div className="relative min-h-0 z-0">
                {PANES.map((p, i) => (
                  <div
                    key={p.id}
                    aria-hidden={active !== i}
                    className={`
                      absolute inset-0 transition-all duration-500
                      ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                  >
                    <h2 className="text-white/90 text-base tracking-[0.15em] uppercase">
                      {p.eyebrow}{" "}
                      <span className="text-[var(--color-accent)]">•</span>
                    </h2>
                    <h3 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight text-white">
                      {p.title} <span className="text-[var(--color-accent)]">{p.highlight}</span>
                    </h3>
                    <div className="my-5 h-px w-full bg-white/15" />
                    <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
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

            {/* RIGHT: stacked videos (fade/swap) */}
            <div
              className="
                relative overflow-hidden rounded-2xl ring-1 ring-white/10
                bg-[var(--color-surface)]
              "
            >
              {PANES.map((p, i) => (
                <div
                  key={p.id}
                  className={`
                    absolute inset-0 transition-all duration-500
                    ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  {/* badge (optional) */}
                  {p.badgeSrc && (
                    <img
                      src={p.badgeSrc}
                      alt={p.badgeAlt || ""}
                      className="absolute right-4 top-4 z-10 w-20"
                      loading="lazy"
                    />
                  )}

                  <video
                    className="h-full w-full object-cover z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster=""
                  >
                    <source src={p.videoMp4} type="video/mp4" />
                    {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
                  </video>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}