import Link from "next/link";
import Container from "@/components/common/container";

export const metadata = {
  title: "360° Showroom — Under Construction | Control4 Georgia",
  description:
    "Our 360° Showroom is being built. Check back soon for an immersive Control4 experience.",
};

export default function Showroom360UnderConstructionPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--color-bg)]">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,194,255,0.25),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,86,184,0.28),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.0),rgba(2,6,23,0.85))]" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,194,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,86,184,0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at 50% 30%, black 0%, black 35%, transparent 72%)",
        }}
      />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-slate-900/40 px-4 py-2 text-xs text-sky-200/90 shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            360° Showroom • Work in progress
          </div>

          {/* title */}
          <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            Under <span className="text-sky-300">Construction</span>
          </h1>

          <p className="mt-4 text-pretty text-sm leading-6 text-slate-300/90 sm:text-base sm:leading-7">
            We’re building an immersive 360° experience so you can explore Control4
            systems like you’re standing in the room. This page will go live soon.
          </p>

          {/* animated “scanner” card */}
          <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-950/40 p-6 shadow-[0_0_0_1px_rgba(56,189,248,0.07),0_30px_80px_-60px_rgba(0,194,255,0.55)] sm:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,194,255,0.18),transparent_55%)]" />
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-2xl" />
              <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-blue-600/10 blur-2xl" />
            </div>

            {/* scanner line */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent animate-[scan_2.6s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_center,rgba(0,194,255,0.08),transparent_60%)]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs text-slate-300/80">Status</p>
                  <p className="mt-1 text-sm font-medium text-sky-100">
                    Environment rendering in progress
                  </p>
                </div>

                {/* tiny loading dots */}
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-300/80 animate-[blink_1.1s_ease-in-out_infinite]" />
                  <span className="h-2 w-2 rounded-full bg-sky-300/60 animate-[blink_1.1s_ease-in-out_infinite_0.18s]" />
                  <span className="h-2 w-2 rounded-full bg-sky-300/40 animate-[blink_1.1s_ease-in-out_infinite_0.36s]" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Scene", v: "Showroom v1" },
                  { k: "Mode", v: "Cinematic" },
                  { k: "ETA", v: "Soon™" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-xl border border-sky-500/15 bg-slate-900/25 px-4 py-3"
                  >
                    <p className="text-[11px] text-slate-300/70">{item.k}</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="btn-glow btn-glow--trio inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white sm:w-auto"
                >
                  Back to Home
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-sky-500/25 bg-slate-900/30 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-400/40 hover:bg-slate-900/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>

              <p className="mt-5 text-center text-xs text-slate-400/80">
                Tip: If you’re ready to build your smart home now, we can start with a
                quick consultation.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* local keyframes */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateY(0); opacity: .2; }
          45%  { opacity: .75; }
          50%  { transform: translateY(320px); opacity: .85; }
          55%  { opacity: .75; }
          100% { transform: translateY(0); opacity: .2; }
        }
        @keyframes blink {
          0%, 100% { transform: translateY(0); opacity: .35; }
          50%      { transform: translateY(-1px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ping,
          [class*="animate-[scan"],
          [class*="animate-[blink"] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
