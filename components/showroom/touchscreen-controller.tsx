"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wifi, BatteryFull } from "lucide-react";
import type { Feature, FeatureId, RoomId } from "@/app/showroom-360/interactive/showroom-data";
import TouchscreenToast, { type TouchscreenToastState } from "@/components/showroom/touchscreen-popup";
import type { RoomAcState } from "@/app/showroom-360/interactive/page";

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Status: Wi-Fi (subtle pulse + tap ping) */
function StatusWifi() {
  const [ping, setPing] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setPing((p) => p + 1)}
      className="relative grid place-items-center rounded-md p-1 focus:outline-none"
      aria-label="Wi-Fi status"
    >
      <Wifi className="h-4 w-4 text-slate-200/65" />
      <span
        key={ping}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md animate-[ping_0.7s_ease-out_1]"
        style={{ boxShadow: "0 0 0 0 rgba(0,194,255,0.35)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-full opacity-20 animate-[pulse_2.2s_ease-in-out_infinite]"
      />
    </button>
  );
}

/** Status: Battery (micro sweep + tap ping) */
function StatusBattery() {
  const [flash, setFlash] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setFlash((f) => f + 1)}
      className="relative grid place-items-center rounded-md p-1 focus:outline-none"
      aria-label="Battery status"
    >
      <BatteryFull className="h-4 w-4 text-slate-200/65" />
      <span
        key={flash}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md animate-[ping_0.6s_ease-out_1]"
        style={{ boxShadow: "0 0 0 0 rgba(56,189,248,0.30)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-sky-300/30 animate-[batterySweep_2.8s_ease-in-out_infinite]"
      />
    </button>
  );
}

function TouchToggle({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden
      className={cx(
        "relative shrink-0 rounded-full border transition",
        "h-7 w-[56px] sm:h-7 sm:w-[56px] md:h-8 md:w-[62px]",
        "overflow-hidden",
        on ? "border-sky-300/40 bg-sky-500/15" : "border-sky-500/18 bg-slate-900/30"
      )}
    >
      <div
        className={cx(
          "absolute top-1/2 -translate-y-1/2 rounded-full transition",
          "h-5 w-5 md:h-5.5 md:w-5.5",
          on
            ? "right-1 bg-sky-200/90 shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_10px_25px_-18px_rgba(56,189,248,0.8)]"
            : "left-1 bg-slate-200/55"
        )}
      />
    </div>
  );
}

function FeatureTile({
  feature,
  on,
  onToggle,
}: {
  feature: Feature;
  on: boolean;
  onToggle: () => void;
}) {
  const Icon = feature.Icon;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 36 }}
      className={cx(
        "group relative w-full min-w-0 text-left focus:outline-none",
        "rounded-[26px] border transition",
        "focus-visible:ring-2 focus-visible:ring-sky-300/50 focus-visible:ring-offset-0",
        "min-h-[112px] p-4",
        "sm:min-h-[136px] sm:p-4",
        "md:min-h-[156px] md:p-5",
        on
          ? "border-sky-400/35 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,0.10)]"
          : "border-sky-500/15 bg-slate-950/25 hover:border-sky-400/25 hover:bg-slate-950/35"
      )}
    >
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 rounded-[26px] transition",
          on ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        )}
        style={{
          background: "radial-gradient(circle at 35% 25%, rgba(0,194,255,0.14), transparent 62%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={cx(
            "grid shrink-0 place-items-center rounded-2xl border transition",
            "h-12 w-12 md:h-14 md:w-14",
            on ? "border-sky-400/30 bg-sky-500/10" : "border-sky-500/14 bg-slate-950/25"
          )}
        >
          <Icon className={cx("h-6 w-6 md:h-7 md:w-7", on ? "text-sky-200" : "text-slate-200/80")} />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          <span
            className={cx(
              "shrink-0 whitespace-nowrap font-semibold tracking-wide",
              "text-xs md:text-[13px]",
              on ? "text-sky-200" : "text-slate-300/70"
            )}
            style={{ letterSpacing: "0.08em" }}
          >
            {on ? "ON" : "OFF"}
          </span>
          <TouchToggle on={on} />
        </div>
      </div>

      <div className="relative mt-4 md:mt-5">
        <p className="text-[15px] font-semibold leading-tight text-slate-100 md:text-[16px]">
          {feature.label}
        </p>
      </div>
    </motion.button>
  );
}

// ---- toast rules (ONLY logic, no design changes) ----
function isSecurityFeature(id: FeatureId) {
  return id === ("security" as FeatureId);
}

function isFloodFeature(id: FeatureId) {
  const s = String(id).toLowerCase();
  return s.includes("flood");
}

// ✅ AC helpers
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type AcMode = "cool" | "heat" | "dry";
type FanSpeed = 1 | 2 | 3 | 4 | 5;

function modeLabel(m: AcMode) {
  return m === "cool" ? "COOL" : m === "heat" ? "HEAT" : "DRY";
}

export default function TouchscreenController({
  room,
  setRoom,
  rooms,
  features,
  activeFeature,
  setActiveFeature,
  acByRoom,
  setAcByRoom,
}: {
  room: RoomId;
  setRoom: (r: RoomId) => void;
  rooms: { id: RoomId; label: string }[];
  features: Feature[];
  activeFeature: FeatureId | null;
  setActiveFeature: (v: FeatureId | null) => void;

  // ✅ NEW (only for AC)
  acByRoom: Record<RoomId, RoomAcState>;
  setAcByRoom: React.Dispatch<React.SetStateAction<Record<RoomId, RoomAcState>>>;
}) {
  const [toast, setToast] = useState<TouchscreenToastState>(null);

  const toastLockRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  const triggerToastIfNeeded = (turningOnId: FeatureId) => {
    if (toastLockRef.current) return;

    if (isSecurityFeature(turningOnId)) {
      toastLockRef.current = true;

      setToast({
        kind: "security",
        title: "INTRUDER ALERT",
        message: "Security alarm triggered. Cameras recording.",
        durationMs: 5000,
      });

      const t = window.setTimeout(() => {
        setToast(null);
        const t2 = window.setTimeout(() => {
          toastLockRef.current = false;
        }, 300);
        timersRef.current.push(t2);
      }, 5000);

      timersRef.current.push(t);
      return;
    }

    if (isFloodFeature(turningOnId)) {
      toastLockRef.current = true;

      setToast({
        kind: "flood",
        title: "WATER LEAK DETECTED",
        message: "Leak detected. Water supply is shutting off.",
        durationMs: 5000,
      });

      const t = window.setTimeout(() => {
        setToast(null);
        const t2 = window.setTimeout(() => {
          toastLockRef.current = false;
        }, 300);
        timersRef.current.push(t2);
      }, 5000);

      timersRef.current.push(t);
      return;
    }
  };

  // ✅ AC state for current room
  const ac = acByRoom[room];

  const setAc = (patch: Partial<RoomAcState>) => {
    setAcByRoom((prev) => ({
      ...prev,
      [room]: { ...prev[room], ...patch },
    }));
  };

  const showAcPanel = activeFeature === "ac" && ac?.on;

  // ✅ Status temperature rule: show AC set temp only if AC is ON in this room
  const statusTemp = ac?.on ? `${ac.temp}°` : "23°";

  return (
    <div className="relative w-full max-w-[calc(100vw-24px)]">
      <div className="relative overflow-hidden rounded-[54px] bg-[#050A12] shadow-[0_30px_120px_-60px_rgba(0,194,255,0.55)]">
        <div className="pointer-events-none absolute inset-0 rounded-[54px] ring-1 ring-white/10" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[54px]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 35%, rgba(0,0,0,0.0) 65%)",
            opacity: 0.55,
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(0,194,255,0.18), transparent 50%), radial-gradient(circle at 70% 85%, rgba(0,86,184,0.16), transparent 55%)",
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-12 rounded-full bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]" />
            <div className="h-2 w-2 rounded-full bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
          </div>
        </div>

        <div className="relative p-3">
          <div className="relative overflow-hidden rounded-[44px] border border-sky-500/18 bg-slate-950/40 shadow-[0_0_0_1px_rgba(56,189,248,0.07),0_30px_90px_-70px_rgba(0,194,255,0.55)]">
            <div className="pointer-events-none absolute inset-0 rounded-[44px] border border-white/10" />
            <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_35%_20%,rgba(0,194,255,0.12),transparent_55%)]" />
            <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_70%_80%,rgba(0,86,184,0.14),transparent_60%)]" />

            <div className="relative m-2 overflow-hidden rounded-[36px] bg-slate-950/70">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 38%, rgba(255,255,255,0.00) 62%)",
                  opacity: 0.45,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 22% 12%, rgba(0,194,255,0.10), transparent 55%)",
                  opacity: 0.75,
                  mixBlendMode: "screen",
                }}
              />

              {/* ✅ toast overlay (no design changes) */}
              <TouchscreenToast toast={toast} onDone={() => setToast(null)} />

              <div className="relative border-b border-sky-500/12 bg-slate-950/40 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-200/70">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400/70 shadow-[0_0_18px_rgba(56,189,248,0.55)]" />
                      {statusTemp} <span className="text-slate-200/45">Georgia</span>
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-100/90">
                    {rooms.find((r) => r.id === room)?.label}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-200/60">
                    <span className="tabular-nums">12:38</span>
                    <span className="opacity-70">⌁</span>
                    <StatusWifi />
                    <StatusBattery />
                  </div>
                </div>
              </div>

              <div className="relative p-5">
                <div className="grid grid-cols-3 gap-3">
                  {rooms.map((r) => {
                    const selected = r.id === room;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRoom(r.id)}
                        className={cx(
                          "min-w-0 rounded-2xl border px-4 py-3 text-xs font-semibold transition",
                          "whitespace-normal break-words leading-tight",
                          selected
                            ? "border-sky-400/35 bg-sky-500/10 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.10)]"
                            : "border-sky-500/16 bg-slate-900/20 text-slate-200/80 hover:border-sky-400/22 hover:bg-slate-900/28"
                        )}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-200/55">Quick Controls</p>
                  <p className="text-xs text-slate-200/35">Tap to toggle</p>
                </div>

                {/* ✅ NEW: AC Panel (appears only for AC ON) */}
                {showAcPanel && (
                  <div className="mt-4 rounded-[26px] border border-sky-500/15 bg-slate-950/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold tracking-widest text-slate-200/70" style={{ letterSpacing: "0.08em" }}>
                        AIR CONDITIONER
                      </p>
                      <p className="text-xs text-slate-200/40">Settings</p>
                    </div>

                    {/* Mode */}
                    <div className="mt-3 flex gap-2">
                      {(["cool", "heat", "dry"] as AcMode[]).map((m) => {
                        const active = ac.mode === m;
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setAc({ mode: m })}
                            className={cx(
                              "flex-1 rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                              active
                                ? "border-sky-400/35 bg-sky-500/10 text-sky-100"
                                : "border-sky-500/16 bg-slate-900/20 text-slate-200/75 hover:border-sky-400/22 hover:bg-slate-900/28"
                            )}
                          >
                            {modeLabel(m)}
                          </button>
                        );
                      })}
                    </div>

                    {/* Temperature */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-200/55">Temperature</p>
                        <p className="text-xs font-semibold text-sky-200/90">{ac.temp}°C</p>
                      </div>

                      <input
                        className="mt-2 w-full accent-sky-400"
                        type="range"
                        min={15}
                        max={35}
                        value={ac.temp}
                        onChange={(e) => setAc({ temp: clamp(Number(e.target.value), 15, 35) })}
                      />

                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-200/35">
                        <span>15°</span>
                        <span>35°</span>
                      </div>
                    </div>

                    {/* Fan */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-200/55">Fan speed</p>
                        <p className="text-xs text-slate-200/40">{ac.fan}/5</p>
                      </div>

                      <div className="mt-2 grid grid-cols-5 gap-2">
                        {([1, 2, 3, 4, 5] as FanSpeed[]).map((n) => {
                          const active = ac.fan === n;
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setAc({ fan: n })}
                              className={cx(
                                "rounded-2xl border py-2 text-xs font-semibold transition",
                                active
                                  ? "border-sky-400/35 bg-sky-500/10 text-sky-100"
                                  : "border-sky-500/16 bg-slate-900/20 text-slate-200/70 hover:border-sky-400/22 hover:bg-slate-900/28"
                              )}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4 md:gap-5">
                  {features.map((f) => {
                    const on = activeFeature === f.id;

                    return (
                      <FeatureTile
                        key={f.id}
                        feature={f}
                        on={on}
                        onToggle={() => {
                          const next = on ? null : f.id;

                          // ✅ turn OFF AC if we are leaving AC (because single activeFeature model)
                          if (activeFeature === "ac" && next !== "ac") {
                            setAc({ on: false });
                          }

                          // ✅ AC behavior (per-room)
                          if (f.id === "ac") {
                            if (next) {
                              setAc({ on: true });      // turning ON
                              setActiveFeature("ac");
                            } else {
                              setAc({ on: false });     // turning OFF
                              setActiveFeature(null);
                            }
                            return;
                          }

                          // toast ONLY when turning ON (unchanged)
                          if (next) triggerToastIfNeeded(next);

                          setActiveFeature(next);
                        }}
                      />
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <div className="h-1.5 w-28 rounded-full bg-white/10" />
                </div>

                <p className="mt-4 text-center text-xs text-slate-200/35">
                  Control demo — room state animations
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}