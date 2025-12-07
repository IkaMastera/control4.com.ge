import Container from "@/components/common/container";
import AboutHeroVideoLayer from "./about-hero-video-layer";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]
        overflow-hidden
        scroll-mt-24
      "
    >
      {/* Background looping video with crossfade */}
      <AboutHeroVideoLayer />

      {/* Overlay for readability */}
      <div
        className="
          pointer-events-none
          absolute inset-0 z-10
          bg-gradient-to-r
          from-black/85
          via-black/65
          to-black/15
        "
      />

      {/* Content */}
      <Container
        className="
          relative z-20
          pt-24 pb-14
          sm:pt-24 sm:pb-16
          lg:pt-28 lg:pb-20
        "
      >
        <div
          className="
            grid gap-10
            lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]
            items-center
          "
        >
          {/* TEXT BLOCK */}
          <div className="max-w-xl">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/55">
              ABOUT CONTROL4 GEORGIA
            </p>

            <h1
              className="
                mt-4
                text-3xl sm:text-4xl lg:text-5xl
                font-semibold
                leading-tight
                tracking-tight
              "
            >
              We design the{" "}
              <span className="bg-gradient-to-r from-[#00C2FF] to-[#0056B8] bg-clip-text text-transparent">
                invisible layer
              </span>{" "}
              of your home.
            </h1>

            <div className="mt-5 space-y-3 text-sm sm:text-base text-white/80">
              <p>
                EN: We engineer the wiring, racks, networks and logic behind
                your lights, climate, audio and security — so on the surface
                everything feels calm, fast and effortless.
              </p>
              <p className="text-white/70">
                KA: ჩვენ ვაპროექტებთ გაყვანილობას, რექებს, ქსელებს და ლოგიკას
                თქვენი განათების, კლიმატის, აუდიოს და უსაფრთხოების სისტემებისთვის —
                რომ ზედაპირზე ყველაფერი იყოს მშვიდი, სწრაფი და მარტივი
                გამოსაყენებელი.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-xs sm:text-sm text-white/70">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                WHOLE-HOME AUTOMATION
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                ENGINEERING-LED DESIGN
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
                LOCAL SUPPORT · KA · RU · EN
              </span>
            </div>
          </div>

          {/* Right side breathing room for the orb */}
          <div
            className="
              hidden lg:block
              h-[260px] xl:h-[320px]
            "
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  );
}
