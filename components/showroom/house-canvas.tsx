"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FeatureId, RoomId } from "@/app/showroom-360/interactive/showroom-data";
import { MASKS } from "@/app/showroom-360/interactive/showroom-data";

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

function VideoOverlay({ src, show, loop = true }: { src: string; show: boolean; loop?: boolean }) {
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

  const type = src.endsWith(".webm") ? "video/webm" : "video/mp4";

  return (
    <video
      ref={ref}
      className={cx(
        "absolute inset-0 object-fill h-full w-full transition-opacity duration-200",
        show ? "opacity-100" : "opacity-0"
      )}
      muted
      playsInline
      loop={loop}
      preload="metadata"
    >
      <source src={src} type={type} />
    </video>
  );
}

export default function HouseCanvas({
  room,
  roomMask,
  activeFeature,
  activeVideoSrc,
}: {
  room: RoomId;
  roomMask: { polygon: string; hint: string };
  activeFeature: FeatureId | null;
  activeVideoSrc?: string;
}) {
  const showVideo = Boolean(activeVideoSrc && activeFeature);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-slate-950/25 shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
      <div className="relative w-full aspect-[16/10] min-h-[225px] max-h-[720px]">
        {/* base house */}
        <Image
          src="/images/360showroom/base-house.webp"
          alt="Interactive showroom base house"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
        />

        {/* overlay layer */}
        <div
          aria-hidden
          className={cx(
            "pointer-events-none absolute inset-0 transition",
            activeFeature ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              clipPath:
              room === "demo" ||
              room === "office" ||
              (room === "bedroom" &&
                (activeFeature === "bedLed" || activeFeature === "bedHeaters")) ||
              (room === "living" &&
                (activeFeature === "tv" || activeFeature === "mainLighting")) ||
              (room === "kitchen" &&
                (activeFeature === "mainLighting" || activeFeature === "backLighting"))
                ? MASKS.demo.polygon
                : roomMask.polygon,
            }}
          >
            {/* ================= EXISTING VIDEO / GRADIENT LOGIC ================= */}
            {activeVideoSrc ? (
              <div
                className="absolute inset-0"
                style={{
                  mixBlendMode: "screen",
                  filter: "saturate(1.15) contrast(1.05)",
                }}
              >
                <VideoOverlay key={activeVideoSrc} src={activeVideoSrc} show={showVideo} loop />
              </div>
            ) : (
              <div
                className="absolute inset-0"
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
            )}

            {/* ========================================================= */}
            {/* ✅ NEW: BED LED — localized glow (NO polygon, NO video) */}
            {/* ========================================================= */}
            {room === "bedroom" && activeFeature === "bedLed" && (
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 68%, rgba(0,194,255,0.32), transparent 55%)",
                  mixBlendMode: "screen",
                  filter: "blur(2px)",
                }}
              />
            )}
            {/* ======================= END NEW ======================= */}
          </div>
        </div>

        {/* label */}
        <div className="absolute left-4 top-4 rounded-full border border-sky-500/20 bg-slate-950/45 px-3 py-1.5 text-xs text-slate-200/80">
          Mask: <span className="text-sky-200">{room}</span>{" "}
          <span className="text-slate-400/70">• {roomMask.hint}</span>
        </div>
      </div>
    </div>
  );
}