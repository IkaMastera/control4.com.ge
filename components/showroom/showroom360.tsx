"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Home, Flame, Lightbulb, Blinds, Music2, Wind, Tv, ShieldAlert, Droplets, Film, Briefcase, Bath } from "lucide-react";

type RoomKey = "kitchen" | "living" | "bedroom" | "bathroom" | "office" | "demo";

type ActionKey =
  | "warmFloor"
  | "mainLight"
  | "backLight"
  | "curtains"
  | "blinds"
  | "music"
  | "ac"
  | "tv"
  | "security"
  | "antiFloodKitchen"
  | "antiFloodBathroom"
  | "cinema";

type Action = {
  key: ActionKey;
  label: string;
  icon: React.ReactNode;
  hint?: string;
};

type Room = {
  key: RoomKey;
  label: string;
  subtitle: string;
  actions: Action[];
};

export default function Showroom360() {
  const [room, setRoom] = useState<RoomKey>("living");
  const [activeAction, setActiveAction] = useState<ActionKey | null>(null);

  // Later: replace this with your animation start logic
  const trigger = (a: ActionKey) => {
    setActiveAction(a);
    // TODO: start overlay video / mask / effect for (room, a)
  };

  const rooms: Room[] = useMemo(
    () => [
      {
        key: "kitchen",
        label: "Kitchen",
        subtitle: "Dining • Backlight • Music",
        actions: [
          { key: "mainLight", label: "Main lighting", icon: <Lightbulb className="h-5 w-5" />, hint: "Chandelier on" },
          { key: "backLight", label: "Backlight", icon: <Lightbulb className="h-5 w-5" />, hint: "Sink & shelves glow" },
          { key: "curtains", label: "Curtains", icon: <Blinds className="h-5 w-5" />, hint: "Close curtains" },
          { key: "warmFloor", label: "Warm floor", icon: <Flame className="h-5 w-5" />, hint: "Red pulse tiles" },
          { key: "music", label: "Music", icon: <Music2 className="h-5 w-5" />, hint: "Notes / speaker glow" },
          { key: "ac", label: "Air conditioner", icon: <Wind className="h-5 w-5" />, hint: "Cold airflow" },
        ],
      },
      {
        key: "living",
        label: "Living room",
        subtitle: "Curtains • TV • AC",
        actions: [
          { key: "mainLight", label: "Main lighting", icon: <Lightbulb className="h-5 w-5" /> },
          { key: "curtains", label: "Curtains", icon: <Blinds className="h-5 w-5" />, hint: "Orange fabric closes → turns gray" },
          { key: "warmFloor", label: "Warm floor", icon: <Flame className="h-5 w-5" /> },
          { key: "tv", label: "TV", icon: <Tv className="h-5 w-5" />, hint: "TV turns on" },
          { key: "ac", label: "Air conditioner", icon: <Wind className="h-5 w-5" /> },
        ],
      },
      {
        key: "bedroom",
        label: "Bedroom",
        subtitle: "Blinds • Heaters • AC",
        actions: [
          { key: "blinds", label: "Blinds", icon: <Blinds className="h-5 w-5" />, hint: "Two small window blinds close" },
          { key: "curtains", label: "Curtain", icon: <Blinds className="h-5 w-5" />, hint: "Main curtain closes" },
          { key: "warmFloor", label: "Warm floor", icon: <Flame className="h-5 w-5" /> },
          { key: "mainLight", label: "Bed backlight", icon: <Lightbulb className="h-5 w-5" />, hint: "Back of bed glow (RGB later)" },
          { key: "ac", label: "Air conditioner", icon: <Wind className="h-5 w-5" /> },
        ],
      },
      {
        key: "bathroom",
        label: "Bathroom",
        subtitle: "Blinds • Anti-leak",
        actions: [
          { key: "mainLight", label: "Wall bulb", icon: <Lightbulb className="h-5 w-5" />, hint: "Warm yellow glow" },
          { key: "blinds", label: "Blinds", icon: <Blinds className="h-5 w-5" /> },
          { key: "warmFloor", label: "Warm floor", icon: <Flame className="h-5 w-5" /> },
          { key: "antiFloodBathroom", label: "Anti-leak", icon: <Droplets className="h-5 w-5" />, hint: "Leak detected notification (demo style)" },
        ],
      },
      {
        key: "office",
        label: "Office",
        subtitle: "Work • AC",
        actions: [
          { key: "ac", label: "Air conditioner", icon: <Wind className="h-5 w-5" /> },
        ],
      },
      {
        key: "demo",
        label: "Demonstration",
        subtitle: "Scenarios",
        actions: [
          { key: "security", label: "Security", icon: <ShieldAlert className="h-5 w-5" />, hint: "Alarm + red house + burglar" },
          { key: "antiFloodKitchen", label: "Anti-flood kitchen", icon: <Droplets className="h-5 w-5" />, hint: "Sink overflow + leak alert" },
          { key: "antiFloodBathroom", label: "Anti-flood bathroom", icon: <Droplets className="h-5 w-5" />, hint: "Bathtub overflow + leak alert" },
          { key: "cinema", label: "Cinema scenario", icon: <Film className="h-5 w-5" />, hint: "Curtains close + TV on + warm floor + light" },
        ],
      },
    ],
    []
  );

  const activeRoom = rooms.find((r) => r.key === room)!;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* PHONE PANEL */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-sky-500/15 bg-slate-950/70 p-4 shadow-[0_0_60px_rgba(56,189,248,0.12)] backdrop-blur">
              {/* tabs */}
              <div className="flex flex-wrap gap-2">
                <RoomTab active={room === "kitchen"} onClick={() => setRoom("kitchen")} icon={<Home className="h-4 w-4" />} label="Kitchen" />
                <RoomTab active={room === "living"} onClick={() => setRoom("living")} icon={<Home className="h-4 w-4" />} label="Living" />
                <RoomTab active={room === "bedroom"} onClick={() => setRoom("bedroom")} icon={<Home className="h-4 w-4" />} label="Bedroom" />
                <RoomTab active={room === "bathroom"} onClick={() => setRoom("bathroom")} icon={<Bath className="h-4 w-4" />} label="Bathroom" />
                <RoomTab active={room === "office"} onClick={() => setRoom("office")} icon={<Briefcase className="h-4 w-4" />} label="Office" />
                <RoomTab active={room === "demo"} onClick={() => setRoom("demo")} icon={<ShieldAlert className="h-4 w-4" />} label="Demo" />
              </div>

              <div className="mt-4">
                <div className="text-sm text-sky-200/90">{activeRoom.label}</div>
                <div className="text-xs text-slate-300/70">{activeRoom.subtitle}</div>
              </div>

              {/* buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {activeRoom.actions.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => trigger(a.key)}
                    className={[
                      "group rounded-2xl border border-sky-500/15 bg-slate-900/40 p-3 text-left",
                      "hover:border-sky-400/25 hover:bg-slate-900/55",
                      "transition",
                      activeAction === a.key ? "ring-1 ring-sky-400/40" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2 text-slate-100">
                      <span className="text-sky-300/90">{a.icon}</span>
                      <span className="text-sm">{a.label}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-300/60">
                      {a.hint ?? "Tap to trigger"}
                    </div>
                  </button>
                ))}
              </div>

              {/* status */}
              <div className="mt-4 rounded-2xl border border-white/5 bg-black/30 p-3">
                <div className="text-xs text-slate-300/70">Status</div>
                <div className="mt-1 text-sm text-slate-100">
                  {activeAction ? (
                    <span>
                      Triggered: <span className="text-sky-300">{activeAction}</span>
                    </span>
                  ) : (
                    <span className="text-slate-300/70">Waiting for input…</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* HOUSE RENDER */}
          <div className="relative">
            <div className="relative w-full overflow-hidden rounded-3xl border border-sky-500/15 bg-white">
              {/* lock aspect ratio so future video overlays align */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/showroom/house-base.png"
                  alt="3D showroom house"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-contain"
                />

                {/* Overlay placeholder (later videos/masks go here) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeAction ? 1 : 0 }}
                  className="pointer-events-none absolute inset-0"
                >
                  {/* subtle glow as “proof” state is working */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_70%,rgba(56,189,248,0.18),transparent_55%)]" />
                </motion.div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-400">
              Next step: add per-action overlay layers (video + clip-path masks) without moving layout.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
        active
          ? "border-sky-400/35 bg-sky-500/10 text-sky-200"
          : "border-white/10 bg-white/5 text-slate-200/80 hover:border-sky-500/20 hover:bg-white/7",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}