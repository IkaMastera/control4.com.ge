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

type Service = {
  id: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  title: { en: string; ka: string };
  desc: { en: string; ka: string };
};

const SERVICES: Service[] = [
  {
    id: "energy",
    icon: BatteryCharging,
    title: { en: "Energy Management", ka: "ენერგიის მართვა" },
    desc: {
      en: "Optimize PV, storage and charging to cut bills and power smart living.",
      ka: "ოპტიმიზაცია მზის პანელებისა და ბატარეების—ენერგოეფექტური ჭკვიანი ცხოვრება.",
    },
  },
  {
    id: "alarm",
    icon: Bell,
    title: { en: "Alarm & Security", ka: "სიგნალიზაცია და უსაფრთხოება" },
    desc: {
      en: "Arm, monitor and receive alerts in one app—integrated with Control4.",
      ka: "მთელი უსაფრთხოება ერთი აპიდან—Control4 ინტეგრაციით.",
    },
  },
  {
    id: "media",
    icon: Film,
    title: { en: "Multimedia", ka: "მულტიმედია" },
    desc: {
      en: "Whole-home audio/video with scenes, sources and volume in sync.",
      ka: "სრული სახლის აუდიო/ვიდეო—სცენები, წყაროები და ხმა სინქრონში.",
    },
  },
  {
    id: "hvac",
    icon: ThermometerSun,
    title: { en: "HVAC & Climate", ka: "კონდინცირება და კლიმატი" },
    desc: {
      en: "Precise climate control with schedules, sensors and smart recovery.",
      ka: "ზუსტი ტემპერატურის მართვა გრაფიკებითა და სენსორებით.",
    },
  },
  {
    id: "lighting",
    icon: Lightbulb,
    title: { en: "Lighting Control", ka: "განათების მართვა" },
    desc: {
      en: "Dimmable circuits, keypads and scenes—comfort that follows you.",
      ka: "დიმირება, კიპედები და სცენები—კომფორტი, რომელიც მიყვება თქვენ.",
    },
  },
  {
    id: "shades",
    icon: Blinds,
    title: { en: "Shades & Blinds", ka: "ფარდები და ჟალუზები" },
    desc: {
      en: "Automated shades tied to light and temperature for perfect ambience.",
      ka: "ავტომატური ფარდები განათებასთან და ტემპერატურასთან სინქრონში.",
    },
  },
  {
    id: "intercom",
    icon: MessageSquare,
    title: { en: "Intercom Anywhere", ka: "ინტერკომი ყველგან" },
    desc: {
      en: "Door stations and room-to-room calls from your phone or touch panels.",
      ka: "კარის პანელები და ოთახებს შორის ზარები ტელეფონიდან ან პანელებიდან.",
    },
  },
  {
    id: "scenes",
    icon: SlidersHorizontal,
    title: { en: "Smart Scenes", ka: "ჭკვიანი სცენები" },
    desc: {
      en: "One tap sets lighting, music, climate and security for any moment.",
      ka: "ერთი დაჭერა—განათება, მუსიკა, კლიმატი და უსაფრთხოება სინქრონში.",
    },
  },
];

export default function ServicesSlider() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Observe current snap card for active indicator
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card='service']"));
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!inView) return;
        const i = cards.findIndex((c) => c === inView.target);
        if (i !== -1) setActive(i);
      },
      { root: el, threshold: [0.6, 0.8, 0.95] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

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

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card='service']");
    const w = card ? card.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (w + 24), behavior: "smooth" });
  };

  const dots = useMemo(() => Array.from({ length: SERVICES.length }), []);

  return (
    <section className="relative bg-[var(--color-bg)] py-20 sm:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 sm:mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <div className="h-1 w-12 rounded-full bg-[var(--color-primary)] mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Solutions & Functionalities
            </h2>
            <p className="mt-2 text-white/70">
              Control4 systems tailored for Georgian homes and businesses.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="grid size-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="grid size-10 place-items-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Slider track */}
        <div
          ref={trackRef}
          className="
            group relative
            flex gap-6 overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            pb-2
            scrollbar-none
          "
          // allow wheel to pan horizontally on desktop
          onWheel={(e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
              (e.currentTarget as HTMLDivElement).scrollLeft += e.deltaY;
            }
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.id}
              data-card="service"
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="
                snap-center
                min-w-[280px] sm:min-w-[320px] md:min-w-[360px]
                rounded-2xl border border-white/10
                bg-[color-mix(in_oklab,var(--color-surface),#ffffff_2%)]
                p-6 sm:p-7
                hover:border-white/20 hover:bg-white/[0.03]
                transition
              "
            >
              {/* Icon circle */}
              <div
                className="
                  relative mx-auto mb-5 grid size-36 place-items-center
                  rounded-full bg-white/[0.04] ring-1 ring-white/10
                "
              >
                <s.icon className="h-9 w-9 text-white/90" />
                {/* accent dot */}
                <span className="absolute right-4 top-4 inline-block size-4 rounded-full bg-[var(--color-primary)] shadow-[0_0_0_3px_rgba(0,0,0,0.25)]" />
              </div>

              {/* Title + copy */}
              <h3 className="text-xl font-semibold text-white">{s.title.en}</h3>
              <p className="text-white/70 text-sm">{s.title.ka}</p>

              <p className="mt-3 text-white/70 leading-relaxed">{s.desc.en}</p>
              <p className="text-white/60 text-sm">{s.desc.ka}</p>
            </motion.article>
          ))}
        </div>

        {/* Dots + CTA */}
        {/* Progress (md+) + Dots (sm) + CTA */}
        <div className="mt-10 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">

        {/* Mobile dots (one card per view) */}
        <div className="flex items-center justify-center gap-2 rounded-full bg-white/5 px-3 py-2 md:hidden">
            {dots.map((_, i) => (
            <button
                key={i}
                aria-label={`Go to item ${i + 1}`}
                onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const card = el.querySelectorAll<HTMLElement>("[data-card='service']")[i];
                card?.scrollIntoView({ behavior: "smooth", inline: "center" });
                }}
                className={`h-2 w-2 rounded-full transition cursor-pointer ${
                i === active ? "bg-white scale-110" : "bg-white/40 hover:bg-white/70 hover:scale-110"
                }`}
                style={{ transition: "all 0.2s ease" }}
            />
            ))}
        </div>

        {/* Desktop progress rail */}
        <div className="hidden md:flex items-center gap-3 min-w-[260px]">
            <div
            className="relative h-2 w-[260px] rounded-full bg-white/10 overflow-hidden cursor-pointer"
            onClick={(e) => {
                const el = trackRef.current;
                if (!el) return;
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                const max = el.scrollWidth - el.clientWidth;
                el.scrollTo({ left: pct * max, behavior: "smooth" });
            }}
            aria-label="Scroll services"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            >
            {/* fill */}
            <div
                className="absolute inset-y-0 left-0 bg-[var(--color-primary)]/40"
                style={{ width: `${progress * 100}%`, transition: "width 200ms ease" }}
            />
            {/* pill */}
            <div
                className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_0_3px_rgba(0,0,0,0.25)]"
                style={{ left: `calc(${progress * 100}% - 6px)`, transition: "left 200ms ease" }}
            />
            </div>
            <span className="text-white/60 text-sm tabular-nums">
            {active + 1} / {SERVICES.length}
            </span>
        </div>

        {/* CTA */}
        <a
            href="/solutions"
            className="
            inline-flex items-center gap-2 self-center md:self-auto
            rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium
            text-white hover:opacity-95 focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white/60
            "
        >
            Discover Functionalities
            <ArrowRight className="h-4 w-4" />
        </a>
        </div>
      </Container>
    </section>
  );
}