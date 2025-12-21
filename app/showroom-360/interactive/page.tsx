"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/container";
import {
  type LucideIcon,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Droplets,
  Film,
  ThermometerSnowflake,
  Wind,
  Music,
  Blinds,
  LampCeiling,
  Lightbulb,
  MonitorPlay,
  Heater,
  Palette,
  Power,
} from "lucide-react";

type RoomId = "kitchen" | "living" | "bedroom" | "bathroom" | "office" | "demo";
type FeatureId =
  | "mainLighting"
  | "backLighting"
  | "curtains"
  | "warmFloor"
  | "music"
  | "ac"
  | "tv"
  | "bedHeaters"
  | "bedLed"
  | "pcOn"
  | "security"
  | "antiFloodKitchen"
  | "antiFloodBathroom"
  | "cinema";

type Feature = {
  id: FeatureId;
  label: string;
  sub?: string;
  Icon: LucideIcon;
};

const ROOMS: { id: RoomId; label: string }[] = [
  { id: "kitchen", label: "Kitchen" },
  { id: "living", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "office", label: "Office" },
  { id: "demo", label: "Demonstration" },
];

/**
 * capabilities:
 * - Warm Floor: Kitchen, Living, Bedroom, Bathroom
 * - Main Lighting: Kitchen, Living, Bathroom
 * - Back Lighting: Kitchen only
 * - Curtain: Kitchen, Bathroom, Bedroom
 * - Music: Kitchen
 * - AC: Kitchen, Living, Bedroom, Office
 * - TV: Living room
 * Demo tab: Security, Anti-flood kitchen, Anti-flood bathroom, Cinema scenario.
 */
const ROOM_FEATURES: Record<Exclude<RoomId, "demo">, Feature[]> = {
  kitchen: [
    { id: "mainLighting", label: "Main lighting", sub: "Chandelier glow", Icon: LampCeiling },
    { id: "backLighting", label: "Back lighting", sub: "Under-cabinet", Icon: Lightbulb },
    { id: "curtains", label: "Curtains", sub: "Open / close", Icon: Blinds },
    { id: "warmFloor", label: "Warm floor", sub: "Heat pulse", Icon: ThermometerSnowflake },
    { id: "music", label: "Music", sub: "Kitchen speaker", Icon: Music },
    { id: "ac", label: "Air conditioner", sub: "Wind animation", Icon: Wind },
  ],
  living: [
    { id: "mainLighting", label: "Main lighting", sub: "Ambient", Icon: LampCeiling },
    { id: "warmFloor", label: "Warm floor", sub: "Heat pulse", Icon: ThermometerSnowflake },
    { id: "tv", label: "TV", sub: "Power on", Icon: MonitorPlay },
    { id: "ac", label: "Air conditioner", sub: "Wind animation", Icon: Wind },
  ],
  bedroom: [
    { id: "curtains", label: "Blinds / curtains", sub: "Shades down", Icon: Blinds },
    { id: "warmFloor", label: "Warm floor", sub: "Heat pulse", Icon: ThermometerSnowflake },
    { id: "bedHeaters", label: "Radiators (2x)", sub: "Warm up", Icon: Heater },
    { id: "bedLed", label: "Bed LED", sub: "Ambient backlight", Icon: Palette },
    { id: "ac", label: "Air conditioner", sub: "Wind animation", Icon: Wind },
  ],
  bathroom: [
    { id: "mainLighting", label: "Main lighting", sub: "Wall bulb glow", Icon: Lightbulb },
    { id: "curtains", label: "Blinds", sub: "Bathroom shade", Icon: Blinds },
    { id: "warmFloor", label: "Warm floor", sub: "Heat pulse", Icon: ThermometerSnowflake },
  ],
  office: [
    { id: "ac", label: "Air conditioner", sub: "Wind animation", Icon: Wind },
    { id: "pcOn", label: "PC / Monitors", sub: "Turn on", Icon: Power },
  ],
};

const DEMO_FEATURES: Feature[] = [
  { id: "security", label: "Security", sub: "Alarm mode", Icon: ShieldAlert },
  { id: "antiFloodKitchen", label: "Anti-flood kitchen", sub: "Leak detected", Icon: Droplets },
  { id: "antiFloodBathroom", label: "Anti-flood bathroom", sub: "Leak detected", Icon: Droplets },
  { id: "cinema", label: "Cinema scenario", sub: "Curtains + TV + lighting", Icon: Film },
];

// --- MASKS (CSS clip-path polygons)
const MASKS: Record<RoomId, { polygon: string; hint: string }> = {
  kitchen: {
    // Kitchen / dining floor only
    // 1️⃣ top-left near window
    // 2️⃣ top-right near kitchen counter
    // 3️⃣ right edge near hallway wall
    // 4️⃣ bottom-right (before living opening)
    // 5️⃣ bottom-left near dining
    polygon: "polygon(30% 70%, 30% 70%, 0% 0%, 53% 47%, 15% 85%)",
    hint: "Kitchen floor only",
  },
  living: {
    polygon: `polygon(
      50% 50%, /* top-left (under kitchen wall) */
      52% 48%, /* top-right (before hallway) */
      70% 64%, /* angled wall toward office */
      78% 85%, /* bottom-right */
      12% 92%  /* bottom-left */
    )`,
    hint: "Living room only",
  },
  bathroom: {
    polygon: "polygon(48% 12%, 73% 12%, 73% 33%, 56% 36%, 52% 28%)",
    hint: "Top center (bathroom)",
  },
  bedroom: {
    polygon: "polygon(70% 18%, 98% 15%, 98% 70%, 70% 72%, 62% 55%)",
    hint: "Right side (bedroom)",
  },
  office: {
    polygon: "polygon(62% 60%, 78% 58%, 92% 70%, 86% 94%, 60% 92%)",
    hint: "Bottom-right nook (office)",
  },
  demo: {
    polygon: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    hint: "Whole home (demo overlays)",
  },
};

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

/** ✅ VIDEO OVERLAY */
function VideoOverlay({ src, show, loop = false }: { src: string; show: boolean; loop?: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (show) {
      v.currentTime = 0;
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [show, src]);

  return (
    <video
      ref={ref}
      className={cx(
        "absolute inset-0 h-full w-full object-contain transition-opacity duration-200",
        show ? "opacity-100" : "opacity-0"
      )}
      muted
      playsInline
      loop={loop}
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/**
 * Map per-room feature → video source.
 * This scales cleanly for future features.
 */
const VIDEO_BY_ROOM_FEATURE: Partial<Record<RoomId, Partial<Record<FeatureId, string>>>> = {
  living: {
    warmFloor: "/videos/showroom360/living-room-heating.mp4",
  },
  kitchen: {
    warmFloor: "/videos/showroom360/living-room-heating.mp4",
  },
  // bedroom: { bedHeaters: "...", bedLed: "...", curtains: "..." },
  // bathroom: { warmFloor: "...", curtains: "..." },
  // office: { pcOn: "...", ac: "..." },
};

export default function Showroom360InteractivePage() {
  const [room, setRoom] = useState<RoomId>("kitchen");
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);

  const features = useMemo(() => {
    if (room === "demo") return DEMO_FEATURES;
    return ROOM_FEATURES[room];
  }, [room]);

  const roomMask = MASKS[room];

  // Debug mask visibility flag (turn off when finished)
  const SHOW_DEBUG_MASK = true;

  // Determine if current (room, activeFeature) has a video
  const activeVideoSrc =
    activeFeature ? VIDEO_BY_ROOM_FEATURE[room]?.[activeFeature] : undefined;

  const showVideo = Boolean(activeVideoSrc && activeFeature);

  return (
    <main className="relative overflow-hidden bg-[var(--color-bg)]">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,194,255,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,86,184,0.22),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.0),rgba(2,6,23,0.90))]" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,194,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,86,184,0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at 50% 22%, black 0%, black 34%, transparent 72%)",
        }}
      />

      <Container className="relative z-10 py-10 sm:py-12 lg:py-14">
        {/* top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/showroom-360"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/20 bg-slate-950/35 px-4 py-2 text-sm font-semibold text-slate-100/90 hover:border-sky-400/35 hover:bg-slate-950/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-slate-900/40 px-4 py-2 text-xs text-sky-200/90">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            2D Interactive Showroom
          </div>
        </div>

        {/* layout */}
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* PHONE */}
          <section className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-950/45 shadow-[0_0_0_1px_rgba(56,189,248,0.07),0_30px_90px_-70px_rgba(0,194,255,0.55)]">
            {/* phone header */}
            <div className="border-b border-sky-500/15 bg-slate-950/50 p-4">
              <p className="text-xs text-slate-300/70">Controller</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">
                {room === "demo" ? "Demonstration" : ROOMS.find((r) => r.id === room)?.label}
              </p>
            </div>

            {/* room tabs */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {ROOMS.map((r) => {
                  const selected = r.id === room;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRoom(r.id);
                        setActiveFeature(null);
                      }}
                      className={cx(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        selected
                          ? "border-sky-400/50 bg-sky-500/10 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.08)]"
                          : "border-sky-500/20 bg-slate-900/25 text-slate-200/80 hover:border-sky-400/35 hover:bg-slate-900/35"
                      )}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

              {/* features */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {features.map((f) => {
                  const on = activeFeature === f.id;
                  const Icon = f.Icon;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFeature((prev) => (prev === f.id ? null : f.id))}
                      className={cx(
                        "group rounded-2xl border p-3 text-left transition",
                        on
                          ? "border-sky-400/45 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,0.10)]"
                          : "border-sky-500/15 bg-slate-900/25 hover:border-sky-400/30 hover:bg-slate-900/35"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cx(
                            "grid h-10 w-10 place-items-center rounded-xl border transition",
                            on
                              ? "border-sky-400/40 bg-sky-500/10"
                              : "border-sky-500/15 bg-slate-950/25 group-hover:border-sky-400/25"
                          )}
                        >
                          <Icon className={cx("h-5 w-5", on ? "text-sky-200" : "text-slate-200/80")} />
                        </div>

                        <div className="min-w-0">
                          <p className={cx("text-sm font-semibold", on ? "text-slate-100" : "text-slate-100/90")}>
                            {f.label}
                          </p>
                          {f.sub && <p className="mt-0.5 text-xs text-slate-300/65">{f.sub}</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* tiny hint */}
              <div className="mt-4 rounded-2xl border border-sky-500/15 bg-slate-950/25 p-3">
                <p className="text-xs text-slate-300/70">
                  Tip: Videos are mapped per room+feature. Masks clip the animation to the correct area.
                </p>
              </div>
            </div>
          </section>

          {/* HOUSE CANVAS */}
          <section className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-950/25 shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
            <div className="relative aspect-[16/9] w-full">
              {/* base house */}
              <Image
                src="/images/360showroom/base-house.webp"
                alt="Interactive showroom base house"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain"
              />

              {/* DEBUG: room mask outline */}
              {SHOW_DEBUG_MASK && (
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90">
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: roomMask.polygon,
                      border: "1px solid rgba(56,189,248,0.45)",
                      boxShadow: "inset 0 0 0 1px rgba(56,189,248,0.18)",
                    }}
                  />
                </div>
              )}

              {/* Overlay: animation layer */}
              <div
                aria-hidden
                className={cx(
                  "pointer-events-none absolute inset-0 transition",
                  activeFeature ? "opacity-100" : "opacity-0"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{ clipPath: room === "demo" ? MASKS.demo.polygon : roomMask.polygon }}
                >
                  {/* ✅ VIDEO when available */}
                  {activeVideoSrc && (
                    <div
                      className="absolute inset-0"
                      style={{
                        mixBlendMode: "screen",
                        filter: "saturate(1.15) contrast(1.05)",
                      }}
                    >
                      <VideoOverlay src={activeVideoSrc} show={showVideo} loop={true} />
                    </div>
                  )}

                  {/* ✅ Fallback glow only when NO video */}
                  {!activeVideoSrc && (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(0,194,255,0.22),transparent_55%)]" />

                      <div
                        className={cx(
                          "absolute inset-0",
                          activeFeature === "warmFloor" && "animate-[heat_1.8s_ease-in-out_infinite]",
                          activeFeature === "security" && "animate-[alarm_1.0s_ease-in-out_infinite]",
                          activeFeature === "music" && "animate-[pulse_1.6s_ease-in-out_infinite]",
                          activeFeature === "cinema" && "animate-[cinema_2.4s_ease-in-out_infinite]"
                        )}
                        style={{
                          background:
                            activeFeature === "warmFloor"
                              ? "radial-gradient(circle at 50% 60%, rgba(255,120,0,0.35), transparent 60%)"
                              : activeFeature === "security"
                              ? "radial-gradient(circle at 50% 50%, rgba(255,60,60,0.38), transparent 62%)"
                              : activeFeature === "music"
                              ? "radial-gradient(circle at 60% 40%, rgba(0,194,255,0.28), transparent 60%)"
                              : "radial-gradient(circle at 40% 40%, rgba(200,120,255,0.26), transparent 62%)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* label */}
              <div className="absolute left-4 top-4 rounded-full border border-sky-500/20 bg-slate-950/45 px-3 py-1.5 text-xs text-slate-200/80">
                Mask: <span className="text-sky-200">{room}</span>{" "}
                <span className="text-slate-400/70">• {roomMask.hint}</span>
              </div>
            </div>
          </section>
        </div>
      </Container>

      {/* local keyframes */}
      <style>{`
        @keyframes heat {
          0%   { opacity: .25; transform: scale(1.00); }
          50%  { opacity: .75; transform: scale(1.02); }
          100% { opacity: .25; transform: scale(1.00); }
        }
        @keyframes alarm {
          0%   { opacity: .15; }
          50%  { opacity: .80; }
          100% { opacity: .15; }
        }
        @keyframes pulse {
          0%   { opacity: .20; transform: scale(1.00); }
          50%  { opacity: .65; transform: scale(1.03); }
          100% { opacity: .20; transform: scale(1.00); }
        }
        @keyframes cinema {
          0%   { opacity: .18; }
          50%  { opacity: .55; }
          100% { opacity: .18; }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-["] { animation: none !important; }
        }
      `}</style>
    </main>
  );
}