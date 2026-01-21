"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/common/container";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import TouchscreenController from "@/components/showroom/touchscreen-controller";
import HouseCanvas from "@/components/showroom/house-canvas";

import {
  type RoomId,
  type FeatureId,
  ROOMS,
  ROOM_FEATURES,
  DEMO_FEATURES,
  MASKS,
  VIDEO_BY_ROOM_FEATURE,
} from "./showroom-data";

const pageWrap: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const panelSwap: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

type AcMode = "cool" | "heat" | "dry";
type FanSpeed = 1 | 2 | 3 | 4 | 5;

export type RoomAcState = {
  on: boolean;
  mode: AcMode;
  temp: number; // 15..35
  fan: FanSpeed;
};

export default function Showroom360InteractivePage() {
  const [room, setRoom] = useState<RoomId>("kitchen");
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);

  // ✅ NEW: AC settings per room (minimal, isolated)
  const [acByRoom, setAcByRoom] = useState<Record<RoomId, RoomAcState>>(() => ({
    kitchen: { on: false, mode: "cool", temp: 22, fan: 3 },
    living: { on: false, mode: "cool", temp: 22, fan: 3 },
    bedroom: { on: false, mode: "cool", temp: 22, fan: 3 },
    bathroom: { on: false, mode: "cool", temp: 22, fan: 3 }, // not used (no AC feature), harmless
    office: { on: false, mode: "cool", temp: 22, fan: 3 },
    demo: { on: false, mode: "cool", temp: 22, fan: 3 }, // not used, harmless
  }));

  const features = useMemo(() => {
    if (room === "demo") return DEMO_FEATURES;
    return ROOM_FEATURES[room];
  }, [room]);

  const roomMask = MASKS[room];

  const activeVideoSrc = activeFeature ? VIDEO_BY_ROOM_FEATURE[room]?.[activeFeature] : undefined;

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
          maskImage: "radial-gradient(circle at 50% 22%, black 0%, black 34%, transparent 72%)",
        }}
      />

      <Container className="relative z-10 py-10 sm:py-12 lg:py-14">
        <motion.div variants={pageWrap} initial="hidden" animate="show">
          {/* top bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/showroom-360"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-500/20 bg-slate-950/35 px-4 py-2 text-sm font-semibold text-slate-100/90 hover:border-sky-400/35 hover:bg-slate-950/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <div className="inline-flex pt-1 items-center gap-2 rounded-full border border-sky-500/25 bg-slate-900/40 px-4 py-2 text-xs text-sky-200/90">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              2D Interactive Showroom
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[480px_1fr] xl:grid-cols-[520px_1fr]">
            <section className="order-1 w-full sm:px-0">
              <div className="w-full max-w-[420px] sm:max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={room}
                    variants={panelSwap}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                  >
                    <TouchscreenController
                      room={room}
                      setRoom={(r) => {
                        setRoom(r);
                        setActiveFeature(null);
                      }}
                      rooms={ROOMS}
                      features={features}
                      activeFeature={activeFeature}
                      setActiveFeature={setActiveFeature}
                      acByRoom={acByRoom}
                      setAcByRoom={setAcByRoom}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            <section className="order-2 w-full sm:px-0">
              <div className="w-full max-w-[680px] sm:max-w-none">
                <HouseCanvas
                  room={room}
                  roomMask={roomMask}
                  activeFeature={activeFeature}
                  activeVideoSrc={activeVideoSrc}
                />
              </div>
            </section>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}