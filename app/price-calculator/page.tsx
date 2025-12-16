// app/calculator/page.tsx
"use client";

import { useMemo, useState } from "react";
import Container from "@/components/common/container";
import {
  getOffer,
  recommendTier,
  formatUsd,
  type Needs,
} from "@/lib/calculator/package-engine";
import { AREA_BRACKETS, type PackageTier } from "@/data/pricing-packages";
import {
  Lightbulb,
  PanelTop,
  Volume2,
  Lock,
  Blinds,
  Mic,
  Home,
  Ruler,
  Sparkles,
  Send,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

function tierLabel(t: PackageTier) {
  if (t === "essential") return "Essential";
  if (t === "comfort") return "Comfort";
  return "Premium";
}

function tierDesc(t: PackageTier) {
  if (t === "essential") return "Core automation starter pack";
  if (t === "comfort") return "Dimmable lighting + touch control";
  return "Full lifestyle package";
}

/* ---------------------------
   Motion (noticeable + premium)
--------------------------- */

const easeOut = [0.16, 1, 0.3, 1] as const;

const REVEAL_Y = 26;
const BLUR_IN = "blur(10px)";
const BLUR_OUT = "blur(0px)";

const pageIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const heroIn: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y, filter: BLUR_IN },
  visible: {
    opacity: 1,
    y: 0,
    filter: BLUR_OUT,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y, scale: 0.985, filter: BLUR_IN },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: BLUR_OUT,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const blockIn: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: BLUR_OUT,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.99, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: BLUR_OUT,
    transition: { duration: 0.42, ease: easeOut },
  },
};

const microHover = {
  hover: { y: -3, scale: 1.012 },
  tap: { scale: 0.988 },
};

export default function CalculatorPage() {
  const prefersReducedMotion = useReducedMotion();

  const [areaSqm, setAreaSqm] = useState<number>(50);

  const [needs, setNeeds] = useState<Needs>({
    dimmableLighting: false,
    touchPanel: false,
    audioForTv: false,
    smartLock: false,
    curtainControl: false,
    sensorsOrVoice: false,
  });

  const recommended = useMemo(() => recommendTier(needs), [needs]);

  const [tier, setTier] = useState<PackageTier>("essential");
  const activeTier = tier;

  const [isManualTier, setIsManualTier] = useState(false);
  const effectiveTier = isManualTier ? activeTier : recommended;

  const { offer } = useMemo(
    () => getOffer(effectiveTier, areaSqm),
    [effectiveTier, areaSqm]
  );

  const bracketLabel = useMemo(() => {
    const a = Math.max(0, Math.floor(areaSqm || 0));
    const b =
      AREA_BRACKETS.find((x) => a >= x.minSqm && a <= x.maxSqm) ??
      AREA_BRACKETS[2];
    return b.label;
  }, [areaSqm]);

  function toggle<K extends keyof Needs>(key: K) {
    setNeeds((p) => ({ ...p, [key]: !p[key] }));
  }

  // ---------------------------
  // Lead form state + submit
  // ---------------------------

  const [leadStatus, setLeadStatus] = useState<
    "idle" | "loading" | "ok" | "err"
  >("idle");
  const [leadMsg, setLeadMsg] = useState("");

  const [lead, setLead] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadStatus("loading");
    setLeadMsg("");

    const name = lead.name.trim();
    const phone = lead.phone.trim();
    const email = lead.email.trim();
    const note = lead.note.trim();

    if (!name || !phone || !Number.isFinite(areaSqm) || areaSqm <= 0) {
      setLeadStatus("err");
      setLeadMsg("Please enter your name, phone, and area.");
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          note: note || undefined,
          areaSqm,
          tier: effectiveTier,
          recommendedTier: recommended,
          needs,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as
        | { ok: true }
        | { ok: false; error?: string };

      if (!res.ok || !data || data.ok !== true) {
        throw new Error(
          (data as { ok: false; error?: string })?.error || "Failed to send."
        );
      }

      setLeadStatus("ok");
      setLeadMsg("Sent! We will contact you soon.");
      setLead((p) => ({ ...p, note: "" }));
    } catch (err) {
      setLeadStatus("err");
      setLeadMsg(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  return (
    <main className="min-h-screen bg-bg text-ink pb-16">
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
        variants={pageIn}
      >
        <Container className="pt-24 lg:pt-28">
          <motion.section
            className="mb-10"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.6 }}
            variants={heroIn}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">
              CALCULATOR · გამოთვლა
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Smart Home Package Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/70">
              Choose what you want (Yes/No), enter your home size, and we’ll show
              the recommended package with a clear included-systems list.
            </p>
          </motion.section>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start">
            {/* LEFT */}
            <motion.div
              className="space-y-8 rounded-2xl bg-surface/70 border border-white/5 p-5 sm:p-6 lg:p-7 backdrop-blur-md"
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.35 }}
              variants={cardIn}
            >
              {/* Needs */}
              <div>
                <h2 className="text-sm font-semibold text-white mb-3">
                  1. What do you want? · რა გსურთ?
                </h2>

                <motion.div
                  className="grid gap-3 sm:grid-cols-2"
                  variants={staggerGrid}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <NeedToggle
                    icon={<Lightbulb className="w-4 h-4 text-primary" />}
                    title="Dimmable lighting"
                    subtitle="Smooth brightness + scenes"
                    checked={needs.dimmableLighting}
                    onClick={() => toggle("dimmableLighting")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                  <NeedToggle
                    icon={<PanelTop className="w-4 h-4 text-primary" />}
                    title="Touch panel"
                    subtitle="Wall/table touch control"
                    checked={needs.touchPanel}
                    onClick={() => toggle("touchPanel")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                  <NeedToggle
                    icon={<Volume2 className="w-4 h-4 text-primary" />}
                    title="Audio for TV"
                    subtitle="Soundbar / speakers"
                    checked={needs.audioForTv}
                    onClick={() => toggle("audioForTv")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                  <NeedToggle
                    icon={<Lock className="w-4 h-4 text-primary" />}
                    title="Smart door lock"
                    subtitle="Integration in Control4"
                    checked={needs.smartLock}
                    onClick={() => toggle("smartLock")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                  <NeedToggle
                    icon={<Blinds className="w-4 h-4 text-primary" />}
                    title="Curtain control"
                    subtitle="Automated curtains"
                    checked={needs.curtainControl}
                    onClick={() => toggle("curtainControl")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                  <NeedToggle
                    icon={<Mic className="w-4 h-4 text-primary" />}
                    title="Sensors / Voice"
                    subtitle="Occupancy + assistant"
                    checked={needs.sensorsOrVoice}
                    onClick={() => toggle("sensorsOrVoice")}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                </motion.div>

                <motion.div
                  className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4"
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.6 }}
                  variants={blockIn}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white">
                        Recommended package:{" "}
                        <span className="text-sky-200">
                          {tierLabel(recommended)}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Based on your selected needs (you can override it below).
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Basics */}
              <div>
                <h2 className="text-sm font-semibold text-white mb-3">
                  2. Basic info · ძირითადი ინფორმაცია
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.5 }}
                    variants={blockIn}
                  >
                    <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                      Area (m²) / ფართობი (მ²)
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="number"
                        min={20}
                        max={1000}
                        value={areaSqm}
                        onChange={(e) => setAreaSqm(Number(e.target.value || 0))}
                        className="w-full pl-10 rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-white/45">
                      Bracket:{" "}
                      <span className="text-white/65">{bracketLabel}</span>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.5 }}
                    variants={blockIn}
                  >
                    <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                      Package / პაკეტი
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["essential", "comfort", "premium"] as PackageTier[]).map(
                        (t) => {
                          const active = effectiveTier === t;
                          return (
                            <motion.button
                              key={t}
                              type="button"
                              onClick={() => {
                                setTier(t);
                                setIsManualTier(true);
                              }}
                              whileHover={
                                prefersReducedMotion ? undefined : microHover.hover
                              }
                              whileTap={
                                prefersReducedMotion ? undefined : microHover.tap
                              }
                              transition={{ duration: 0.18, ease: easeOut }}
                              className={[
                                "rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm transition",
                                "bg-black/40 hover:bg-black/60",
                                active
                                  ? "border-primary/80 shadow-lg shadow-primary/20"
                                  : "border-white/10",
                              ].join(" ")}
                            >
                              <div className="font-medium text-white">
                                {tierLabel(t)}
                              </div>
                              <div className="text-[11px] text-white/60 mt-0.5">
                                {tierDesc(t)}
                              </div>
                            </motion.button>
                          );
                        }
                      )}
                    </div>

                    {!isManualTier ? (
                      <p className="mt-2 text-[11px] text-white/45">
                        Auto-selected from your needs.
                      </p>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={() => setIsManualTier(false)}
                        whileHover={
                          prefersReducedMotion ? undefined : microHover.hover
                        }
                        whileTap={
                          prefersReducedMotion ? undefined : microHover.tap
                        }
                        transition={{ duration: 0.18, ease: easeOut }}
                        className="mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium btn-glow btn-glow--trio"
                      >
                        Use recommended package
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT – RESULT */}
            <aside className="space-y-4">
              <motion.div
                className="rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/20 via-surface/90 to-black/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,86,184,0.45)]"
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.35 }}
                variants={cardIn}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-primary/40 mb-2">
                  ESTIMATE · სავარაუდო ბიუჯეტი
                </p>

                <h2 className="text-sm font-semibold text-white mb-4">
                  {tierLabel(effectiveTier)} package · {bracketLabel}
                </h2>

                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-semibold text-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${effectiveTier}-${areaSqm}-${offer.usdBudget}`}
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, y: 10, filter: "blur(8px)" }
                        }
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 1, y: 0, filter: "blur(0px)" }
                        }
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 0, y: -10, filter: "blur(8px)" }
                        }
                        transition={{ duration: 0.35, ease: easeOut }}
                        className="inline-block"
                      >
                        {formatUsd(offer.usdBudget)}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Approximate package budget in USD. Final quote depends on
                    on-site survey and exact project conditions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/70">
                    <Home className="w-3.5 h-3.5 text-primary/70" />
                    {areaSqm} m²
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/70">
                    <Sparkles className="w-3.5 h-3.5 text-primary/70" />
                    Recommended: {tierLabel(recommended)}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2">
                  Included systems
                </h3>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.ul
                    key={offer.included.join("|")}
                    className="space-y-2 text-xs sm:text-sm text-white/70"
                    variants={staggerGrid}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "visible"}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 0, y: 10, filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.35, ease: easeOut }}
                  >
                    {offer.included.map((item) => (
                      <motion.li
                        key={item}
                        variants={itemIn}
                        whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                        transition={{ duration: 0.18, ease: easeOut }}
                        className="rounded-lg border border-white/10 bg-black/25 px-3 py-2"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>

                <p className="mt-4 text-[11px] text-white/50">
                  This package estimate is a guideline. Exact devices and layout
                  may change after on-site survey.
                </p>
              </motion.div>

              {/* FORM CARD */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-surface/80 p-4 sm:p-5"
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.35 }}
                variants={cardIn}
              >
                <h3 className="text-sm font-semibold text-white mb-2">
                  Send this estimate · გაგზავნა
                </h3>
                <p className="text-xs sm:text-sm text-white/65 mb-4">
                  Fill the form and we’ll contact you with a detailed
                  consultation.
                </p>

                <form onSubmit={submitLead} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                        Name *
                      </label>
                      <input
                        value={lead.name}
                        onChange={(e) =>
                          setLead((p) => ({ ...p, name: e.target.value }))
                        }
                        className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                        Phone *
                      </label>
                      <input
                        value={lead.phone}
                        onChange={(e) =>
                          setLead((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                        placeholder="+995..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                      Email
                    </label>
                    <input
                      value={lead.email}
                      onChange={(e) =>
                        setLead((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                      placeholder="optional"
                      inputMode="email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                      Note (optional)
                    </label>
                    <textarea
                      value={lead.note}
                      onChange={(e) =>
                        setLead((p) => ({ ...p, note: e.target.value }))
                      }
                      className="min-h-[90px] w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                      placeholder="Renovation stage, must-have rooms, etc."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    whileHover={
                      prefersReducedMotion || leadStatus === "loading"
                        ? undefined
                        : microHover.hover
                    }
                    whileTap={
                      prefersReducedMotion || leadStatus === "loading"
                        ? undefined
                        : microHover.tap
                    }
                    transition={{ duration: 0.18, ease: easeOut }}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold btn-glow btn-glow--trio disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {leadStatus === "loading" ? "Sending..." : "Send request"}
                  </motion.button>

                  {leadMsg ? (
                    <p
                      className={[
                        "text-xs",
                        leadStatus === "ok"
                          ? "text-emerald-300/90"
                          : "text-rose-300/90",
                      ].join(" ")}
                    >
                      {leadMsg}
                    </p>
                  ) : null}

                  <p className="text-[11px] text-white/45">
                    By sending this request you agree we can contact you about
                    your inquiry.
                  </p>
                </form>
              </motion.div>
            </aside>
          </section>
        </Container>
      </motion.div>
    </main>
  );
}

function NeedToggle(props: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  onClick: () => void;
  prefersReducedMotion: boolean;
}) {
  const { icon, title, subtitle, checked, onClick, prefersReducedMotion } = props;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={itemIn}
      whileHover={prefersReducedMotion ? undefined : microHover.hover}
      whileTap={prefersReducedMotion ? undefined : microHover.tap}
      transition={{ duration: 0.18, ease: easeOut }}
      className={[
        "w-full rounded-xl border px-4 py-3 text-left transition",
        "bg-black/35 hover:bg-black/55",
        checked
          ? "border-primary/80 shadow-lg shadow-primary/15"
          : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
            {icon}
          </span>
          <div>
            <div className="text-sm font-medium text-white">{title}</div>
            <div className="text-[11px] text-white/60 mt-0.5">{subtitle}</div>
          </div>
        </div>

        <span
          className={[
            "mt-1 inline-flex h-6 w-11 items-center rounded-full border transition",
            checked
              ? "justify-end border-primary/70 bg-primary/25"
              : "justify-start border-white/15 bg-white/5",
          ].join(" ")}
          aria-hidden="true"
        >
          <motion.span
            layout={prefersReducedMotion ? false : true}
            transition={{ duration: 0.22, ease: easeOut }}
            className={[
              "h-5 w-5 rounded-full transition",
              checked ? "bg-sky-200" : "bg-white/50",
            ].join(" ")}
          />
        </span>
      </div>
    </motion.button>
  );
}