"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldAlert, Droplets, AlertTriangle } from "lucide-react";

export type ToastKind = "security" | "flood" | "generic";

export type TouchscreenToastState =
  | null
  | {
      kind: ToastKind;
      title: string;
      message: string;
      durationMs?: number; // default 3000
    };

function kindMeta(kind: ToastKind) {
  if (kind === "security") {
    return {
      Icon: ShieldAlert,
      accent:
        "border-red-500/35 text-red-100 shadow-[0_0_0_1px_rgba(239,68,68,0.14),0_18px_44px_-24px_rgba(239,68,68,0.85)]",
      badge: "bg-red-500/15 text-red-200 border-red-500/30",
    };
  }
  if (kind === "flood") {
    return {
      Icon: Droplets,
      accent:
        "border-cyan-400/30 text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_18px_44px_-24px_rgba(34,211,238,0.75)]",
      badge: "bg-cyan-400/12 text-cyan-200 border-cyan-400/25",
    };
  }
  return {
    Icon: AlertTriangle,
    accent:
      "border-sky-400/28 text-slate-100 shadow-[0_0_0_1px_rgba(56,189,248,0.10),0_18px_44px_-24px_rgba(56,189,248,0.65)]",
    badge: "bg-sky-500/10 text-sky-200 border-sky-400/20",
  };
}

export default function TouchscreenToast({
  toast,
  onDone,
}: {
  toast: TouchscreenToastState;
  onDone: () => void;
}) {
  return (
    <AnimatePresence>
      {toast && (
        <ToastInner
          key={`${toast.kind}:${toast.title}:${toast.message}`}
          toast={toast}
          onDone={onDone}
        />
      )}
    </AnimatePresence>
  );
}

function ToastInner({
  toast,
  onDone,
}: {
  toast: NonNullable<TouchscreenToastState>;
  onDone: () => void;
}) {
  const { Icon, accent, badge } = kindMeta(toast.kind);
  const duration = toast.durationMs ?? 3000;

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // start timer ONLY once per mount
    timerRef.current = window.setTimeout(onDone, duration);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [duration, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute left-1/2 top-3 z-30 w-[92%] -translate-x-1/2 sm:w-[86%]"
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl border bg-slate-950/55 backdrop-blur-xl",
          "px-4 py-3",
          accent,
        ].join(" ")}
      >
        {/* subtle animated sheen */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-60"
          animate={{ x: ["-30%", "130%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 35%, transparent 70%)",
            transform: "skewX(-18deg)",
          }}
        />

        <div className="relative flex items-start gap-3">
          <div className={`mt-0.5 grid h-10 w-10 place-items-center rounded-xl border ${badge}`}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-xs font-semibold tracking-widest text-slate-100/90">
                {toast.title}
              </p>
              <span className="shrink-0 text-[11px] text-slate-200/45">now</span>
            </div>

            <p className="mt-1 line-clamp-2 text-xs text-slate-200/70">{toast.message}</p>

            {/* tiny progress bar (feels like OS toast) */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-full bg-white/30"
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}