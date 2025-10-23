import Image from "next/image";

type Item = {
  id: string;
  title_en: string;
  title_ka: string;
  img: string;
  href?: string;
};

const items: Item[] = [
  { id: "controllers", title_en: "Core Controllers",   title_ka: "კონტროლერები (Core)", img: "/images/controllers.jpg" },
  { id: "climate",     title_en: "Climate Control",    title_ka: "კლიმატის კონტროლი",     img: "/images/climate.jpg" },
  { id: "security",    title_en: "Security & Cameras", title_ka: "უსაფრთხოება და კამერები", img: "/images/security.jpg" },
  { id: "audio",       title_en: "Audio & Video",      title_ka: "აუდიო და ვიდეო",        img: "/images/audio.jpg" },
  { id: "lighting",    title_en: "Smart Lighting",     title_ka: "ჭკვიანი განათება",        img: "/images/lighting.jpg" },
  { id: "intercom",    title_en: "Intercom & Access",  title_ka: "ინტერკომი და წვდომა",     img: "/images/intercom.jpg" },
];

export default function ProductsRail() {
  return (
    <section aria-labelledby="products-rail-heading" className="relative py-20 bg-[--color-bg]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-[--color-accent]">Products</p>
        <h2 id="products-rail-heading" className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-[--color-ink]">
          Control4 — Premium Smart Home Line
          <span className="block text-sm md:text-base font-normal text-white/60">
            კონტროლ4 — ჭკვიანი სახლის პრემიუმ მოწყობილობები
          </span>
        </h2>
      </div>

      {/* Rail */}
      <div className="relative mt-10">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[--color-bg] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[--color-bg] to-transparent z-10" />

        <ul
          aria-roledescription="carousel"
          className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 overflow-x-auto snap-x snap-mandatory flex gap-6 md:gap-8 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {/* hide scrollbar webkit */}
          <style>{`.snap-x::-webkit-scrollbar{display:none}`}</style>

          {items.map((item, i) => (
            <li key={item.id} className="snap-center shrink-0">
              <a
                href={item.href ?? "#"}
                className="group relative block w-[78vw] sm:w-[56vw] md:w-[420px] aspect-[4/3] rounded-2xl ring-1 ring-white/10 overflow-hidden bg-[--color-surface] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60"
                aria-label={`${item.title_en} / ${item.title_ka}`}
              >
                <Image
                  src={item.img}
                  alt={`${item.title_en} / ${item.title_ka}`}
                  fill
                  sizes="(max-width:640px) 78vw, (max-width:1024px) 56vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={i === 0}
                />
                {/* subtle blue vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(0,98,255,0.18),transparent_60%)] mix-blend-screen" />

                {/* caption */}
                <div className="absolute left-3 bottom-3 md:left-4 md:bottom-4">
                  <div className="backdrop-blur-sm bg-black/40 text-white rounded-xl px-3 py-2 ring-1 ring-white/10">
                    <div className="text-[13px] md:text-sm font-semibold">{item.title_en}</div>
                    <div className="text-[11px] md:text-xs text-white/80">{item.title_ka}</div>
                  </div>
                </div>

                {/* hover parallax overlay lines (tiny movement) */}
                <div className="pointer-events-none absolute inset-0 transition-transform duration-500 group-hover:translate-y-[-2px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}