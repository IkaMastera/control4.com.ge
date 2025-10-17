"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/common/container";
import { ArrowDown, ArrowUp } from "lucide-react";

type Slide = {
    id: string;
    image?: string;
    video?: { src: string; type?: string; poster?: string };
    eyebrow: { ka: string; en: string };
    title: { ka: string; en: string };
    subtitle: { ka: string; en: string };
    primaryCta: { label: { ka: string; en: string }; href: string };
    secondaryCta?: { label: {ka: string; en: string}; href: string };
};

const SLIDES: Slide[] = [
  {
    id: "knows-you",
    image: "/media/hero/livingroom-ambient.jpg", // swap later
    eyebrow: { ka: "ჭკვიანი ცხოვრება", en: "Smart Living" },
    title: { ka: "სახლი, რომელიც გიცნობთ", en: "A Home That Knows You" },
    subtitle: {
      ka: "Control4 აერთიანებს განათებას, დიდწილად, უსაფრთხოებასა და მუსიკას თქვენს რიტმზე.",
      en: "Control4 orchestrates lights, climate, security and music around your rhythm.",
    },
    primaryCta: { label: { ka: "სისტემების ნახვა", en: "Explore Systems" }, href: "/solutions" },
    secondaryCta: { label: { ka: "კონსულტაცია", en: "Request Consultation" }, href: "/contact" },
  },
  {
    id: "one-app",
    video: {
      src: "/media/hero/soft-pan.mp4", // optional loop; placeholder
      type: "video/mp4",
      poster: "/media/hero/soft-pan-poster.jpg",
    },
    eyebrow: { ka: "ერთ აპში ყველაფერი", en: "One App. Total Control." },
    title: { ka: "ყველაფერი დაკავშირებულია", en: "Everything, Connected." },
    subtitle: {
      ka: "განათება, მუსიკა, ფარდები და უსაფრთხოება — ერთი შეხებით.",
      en: "Lighting, music, shades, and security — all a tap away.",
    },
    primaryCta: { label: { ka: "დემოს ნახვა", en: "See It in Action" }, href: "/demo" },
    secondaryCta: { label: { ka: "ინსტალატორი საქართველოში", en: "Control4 in Georgia" }, href: "/partners" },
  },
  {
    id: "georgia",
    image: "/media/hero/tbilisi-interior.jpg",
    eyebrow: { ka: "შექმნილი საქართველოსთვის", en: "Tailored for Georgia" },
    title: { ka: "პარტნიორი Control4 საქართველოში", en: "Your Control4 Partner in Georgia" },
    subtitle: {
      ka: "პრემიუმ აუტომაცია თანამედროვე ბინებსა და ვილებისთვის მთელი ქვეყნის მაშტაბით.",
      en: "Premium automation for modern apartments and villas across the country.",
    },
    primaryCta: { label: { ka: "დაწყება", en: "Start Your Project" }, href: "/contact" },
    secondaryCta: { label: { ka: "რატომ Control4", en: "Why Control4" }, href: "/why-control4" },
  },
];

export default function HeroSnap() {
  const snapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  // Observe which slide is centered to update bullets/controls
  useEffect(() => {
    const root = snapRef.current;
    if (!root) return;

    const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-snap='panel']"));

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const newIdx = slides.findIndex((el) => el === vis.target);
        if (newIdx !== -1) setIndex(newIdx);
      },
      { root, threshold: [0.5, 0.75, 0.95] }
    );

    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = useCallback((i: number) => {
    const root = snapRef.current;
    if (!root) return;
    const slides = root.querySelectorAll<HTMLElement>("[data-snap='panel']");
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    slides[clamped]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, []);

  const next = () => scrollTo(index + 1);
  const prev = () => scrollTo(index - 1);

  return (
    <section aria-label="Control4 Hero" className="relative isolate">
      {/* snap container */}
      <div
        ref={snapRef}
        className="relative h-[calc(100svh-0px)] overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-none"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            data-snap="panel"
            className="relative snap-start h-[100svh] w-full"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
          >
            {/* media */}
            <div className="absolute inset-0 -z-10">
              {s.video ? (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={s.video.poster}
                >
                  <source src={s.video.src} type={s.video.type || "video/mp4"} />
                </video>
              ) : (
                <img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )}
              {/* gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
            </div>

            {/* content */}
            <Container className="h-full flex items-center">
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ amount: 0.6, once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl text-white"
              >
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/70">
                  {s.eyebrow.ka} • {s.eyebrow.en}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
                  {s.title.en}
                  <span className="block text-white/80 text-2xl sm:text-3xl mt-3">{s.title.ka}</span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-white/80">
                  {s.subtitle.en}
                  <span className="block">{s.subtitle.ka}</span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={s.primaryCta.href}
                    className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {s.primaryCta.label.en} • {s.primaryCta.label.ka}
                  </a>
                  {s.secondaryCta && (
                    <a
                      href={s.secondaryCta.href}
                      className="rounded-full border border-white/30 bg-white/0 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {s.secondaryCta.label.en} • {s.secondaryCta.label.ka}
                    </a>
                  )}
                </div>
              </motion.div>
            </Container>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
        {/* bullets */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Prev/Next arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-3 right-3 flex items-center justify-between">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto grid place-items-center rounded-full bg-black/40 p-2 backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto grid place-items-center rounded-full bg-black/40 p-2 backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ArrowDown className="h-5 w-5 text-white" />
        </button>
      </div>
    </section>
  );
}