import Link from "next/link";
import Container from "@/components/common/container";
import { ArrowUpRight, Sparkles, Cuboid, ScanEye } from "lucide-react";

export const metadata = {
  title: "360° Showroom | Control4 Georgia",
  description:
    "Explore Control4 in two ways: a guided 2D interactive demo and a real 3D Giraffe360 tour.",
};

const CARDS = [
  {
    title: "2D Interactive Showroom",
    subtitle: "Hands-on demo of smart home functions",
    desc: "Trigger lighting, heating, curtains, music, TV, AC and scenarios — and watch the home respond.",
    href: "/showroom-360/interactive",
    Icon: Cuboid,
    badge: "Recommended",
  },
  {
    title: "3D Showroom",
    subtitle: "Real space. Real immersion.",
    desc: "Walk through a real interior captured in 3D and explore Control4 touchpoints in context.",
    href: "/showroom-360/interactive3d",
    Icon: ScanEye,
    badge: "Live Tour",
  },
];

export default function ShowroomHubPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--color-bg)]">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,194,255,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,86,184,0.24),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(2,6,23,0.0),rgba(2,6,23,0.88))]" />
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

      <Container className="relative z-10 py-14 sm:py-18 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-slate-900/40 px-4 py-2 text-xs text-sky-200/90 shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            360° Showroom
          </div>

          <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            Choose your <span className="text-sky-300">experience</span>
          </h1>

          <p className="mt-4 text-pretty text-sm leading-6 text-slate-300/90 sm:text-base sm:leading-7">
            Start with the interactive demo to understand capabilities fast — or jump straight
            into a real 3D tour.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {CARDS.map(({ title, subtitle, desc, href, Icon, badge }) => (
            <Link
              key={href}
              href={href}
              className="
                group relative overflow-hidden rounded-2xl border border-sky-500/20
                bg-slate-950/45 p-6 shadow-[0_0_0_1px_rgba(56,189,248,0.07),0_30px_90px_-70px_rgba(0,194,255,0.55)]
                transition hover:border-sky-400/35 hover:bg-slate-950/55
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60
              "
            >
              {/* glows */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-sky-500/10 blur-2xl opacity-70 transition group-hover:opacity-95" />
                <div className="absolute -right-14 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-2xl opacity-70 transition group-hover:opacity-95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,194,255,0.12),transparent_55%)]" />
              </div>

              {/* badge */}
              <div className="relative flex items-start justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-900/35 px-3 py-1 text-[11px] text-sky-100/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/90" />
                  {badge}
                </div>

                <span className="inline-flex items-center gap-2 text-xs text-slate-300/70">
                  Open <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="relative mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-500/20 bg-slate-900/30">
                  <Icon className="h-5 w-5 text-sky-200" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-100">{title}</p>
                  <p className="mt-0.5 text-xs text-slate-300/70">{subtitle}</p>
                </div>
              </div>

              <p className="relative mt-4 text-sm leading-6 text-slate-300/85">
                {desc}
              </p>

              {/* premium underline */}
              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-sky-400/35 to-transparent opacity-70" />

              {/* subtle “scan” line */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-3 rounded-2xl border border-sky-500/15 bg-slate-950/35 p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-500/20 bg-slate-900/30">
              <ScanEye className="h-5 w-5 text-sky-200" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-100">Want a guided recommendation?</p>
              <p className="text-xs text-slate-300/70">We’ll help you choose the right demo for your project.</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="btn-glow btn-glow--trio inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            Talk to an Integrator
          </Link>
        </div>
      </Container>
    </main>
  );
}