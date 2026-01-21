"use client";

import { useMemo, useState } from "react";
import Container from "@/components/common/container";
import { AnimatePresence, motion, type Variants } from "framer-motion";

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
} from "@/app/showroom-360/interactive/showroom-data";

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

type Props = {
  /** if true: smaller vertical padding for embedding inside homepage */
  compact?: boolean;
  className?: string;
};

export default function Showroom2DCore({ compact = false, className }: Props) {
  const [room, setRoom] = useState<RoomId>("kitchen");
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);

  const [acByRoom, setAcByRoom] = useState<Record<RoomId, RoomAcState>>(() => ({
    kitchen: { on: false, mode: "cool", temp: 22, fan: 3 },
    living: { on: false, mode: "cool", temp: 22, fan: 3 },
    bedroom: { on: false, mode: "cool", temp: 22, fan: 3 },
    bathroom: { on: false, mode: "cool", temp: 22, fan: 3 }, // harmless
    office: { on: false, mode: "cool", temp: 22, fan: 3 },
    demo: { on: false, mode: "cool", temp: 22, fan: 3 }, // harmless
  }));

  const features = useMemo(() => {
    if (room === "demo") return DEMO_FEATURES;
    return ROOM_FEATURES[room];
  }, [room]);

  const roomMask = MASKS[room];

  const activeVideoSrc = activeFeature
    ? VIDEO_BY_ROOM_FEATURE[room]?.[activeFeature]
    : undefined;

  return (
    <section className={`relative overflow-hidden bg-bg ${className ?? ""}`}>
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

      <Container className={`relative z-10 ${compact ? "py-8 sm:py-10" : "py-10 sm:py-12 lg:py-14"}`}>
        <motion.div variants={pageWrap} initial="hidden" animate="show">
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
    </section>
  );
}