import Link from "next/link";
import Showroom2DCore from "@/components/showroom/showroom-2d-core";

export default function Showroom2DHomeSection() {
  return (
    <section className="relative overflow-hidden bg-bg pt-0.5">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-6 h-24 opacity-70"
          />

          <div className="relative flex items-end justify-between gap-6 pt-3">
            {/* LEFT */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-sky-300/80">
                SHOWROOM
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                2D Interactive Showroom
              </h2>
            </div>

            {/* RIGHT */}
            <Link
              href="/showroom-360"
              className="group inline-flex items-center gap-2 text-sm font-medium text-sky-300/85 transition hover:text-sky-300"
            >
              Open full experience
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* soft divider */}
          <div
            aria-hidden
            className="mt-5 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.06), rgba(0,194,255,0.25), rgba(255,255,255,0.04))",
            }}
          />
        </div>
      </div>

      {/* INTERACTIVE */}
      <Showroom2DCore compact />
    </section>
  );
}