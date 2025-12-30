import Link from "next/link";
import Container from "@/components/common/container";

export const metadata = {
  title: "3D Showroom — Under Construction | Control4 Georgia",
  description:
    "Our interactive 3D showroom is being built. Explore the 2D Interactive Showroom or contact us to schedule a live demo.",
};

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

export default function Showroom3DUnderConstructionPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--color-bg)]">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,194,255,0.20),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-72 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,86,184,0.22),transparent_62%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.0),rgba(2,6,23,0.92))]" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,194,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,86,184,0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle at 50% 18%, black 0%, black 38%, transparent 72%)",
        }}
      />

      {/* Hero */}
      <Container className="relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/35 px-4 py-2 text-xs text-sky-200/90">
            <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,194,255,0.65)]" />
            3D Showroom • Under Construction
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
            The 3D Interactive Showroom is being built.
          </h1>

          <p className="mt-4 text-pretty text-base text-slate-200/70 sm:text-lg">
            We’re crafting a premium 3D experience where you can explore rooms,
            trigger real smart-home scenarios, and feel the Control4 magic.
          </p>

          <p className="mt-2 text-sm text-slate-200/55">
            <span className="text-slate-200/80">KA:</span> 3D შოურუმი მზადდება — მალე დაგიბრუნდებით.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/showroom-360/interactive"
              className="btn-glow btn-glow--trio inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow transition"
            >
              Open 2D Interactive Showroom
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-sky-500/20 bg-slate-950/30 px-6 py-3 text-sm font-semibold text-slate-100/90 hover:border-sky-400/35 hover:bg-slate-950/45"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>

        {/* “3D-ish” construction module */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Left: 3D card */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/30 p-6 shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_40px_140px_-90px_rgba(0,194,255,0.45)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(0,194,255,0.18), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0,86,184,0.20), transparent 62%)",
              }}
            />

            {/* Floating wireframe "cube" */}
            <div className="relative mx-auto mt-2 grid place-items-center">
              <div className="c4-cubeWrap">
                <div className="c4-cube">
                  <span className="c4-face c4-face--front" />
                  <span className="c4-face c4-face--back" />
                  <span className="c4-face c4-face--right" />
                  <span className="c4-face c4-face--left" />
                  <span className="c4-face c4-face--top" />
                  <span className="c4-face c4-face--bottom" />
                </div>
                <div className="c4-ring" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold text-slate-100">
                Building the 3D layer
              </p>
              <p className="mt-1 text-sm text-slate-200/60">
                Interactive hotspots • scenario triggers • smooth performance
              </p>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-slate-200/55">
                <span>Progress</span>
                <span className="tabular-nums">In progress</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="c4-progress h-full w-[62%] rounded-full" />
              </div>
              <p className="mt-2 text-xs text-slate-200/45">
                Meanwhile, try the 2D showroom — it’s fully interactive.
              </p>
            </div>
          </div>

          {/* Right: What you can do now */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/15 bg-slate-950/22 p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 22% 20%, rgba(0,194,255,0.14), transparent 60%)",
              }}
            />

            <h2 className="relative text-lg font-semibold text-slate-100">
              What you can explore right now
            </h2>

            <ul className="relative mt-4 space-y-3 text-sm text-slate-200/70">
              {[
                "Room-by-room smart controls (lighting, heating, TV, etc.)",
                "Real visual overlays (floor heating, cinema, flooding, security)",
                "Smooth touchpanel UX that feels like real hardware",
                "Fast, premium performance — no junk animations",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300/80 shadow-[0_0_16px_rgba(0,194,255,0.5)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-6 rounded-2xl border border-sky-500/15 bg-slate-950/25 p-4">
              <p className="text-xs font-semibold tracking-widest text-slate-200/70">
                TIP
              </p>
              <p className="mt-2 text-sm text-slate-200/65">
                Use <span className="text-sky-200">Demonstration</span> mode to
                show the “wow” scenarios quickly during sales conversations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
