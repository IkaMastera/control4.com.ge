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

export default function ProductsShowcase() {
  return (
    <section aria-labelledby="products-heading" className="relative bg-[--color-bg] py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Sticky intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-widest text-[--color-accent]">Products</p>
            <h2 id="products-heading" className="mt-2 text-3xl md:text-4xl font-semibold text-[--color-ink]">
              Control4 — Premium Smart Home Line
            </h2>
            <p className="mt-3 text-white/70">
              კონტროლ4 — ჭკვიანი სახლის პრემიუმ მოწყობილობები. ერთიანი ეკოსისტემა განათებისთვის,
              უსაფრთხოებისთვის, აუდიო/ვიდეოსთვის და წვდომისთვის.
            </p>

            {/* Non-functional chips now; wire to filters later */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Controllers","Climate","Security","Audio/Video","Lighting","Intercom"].map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right grid */}
        <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={item.href ?? "#"}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[--color-surface] aspect-[16/10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60"
                aria-label={`${item.title_en} / ${item.title_ka}`}
              >
                {/* image */}
                <Image
                  src={item.img}
                  alt={`${item.title_en} / ${item.title_ka}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={i === 0}
                />

                {/* tonal unifier (duotone-ish) */}
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply opacity-[0.92] transition-opacity duration-500 group-hover:opacity-[0.88]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,86,184,0.28) 0%, rgba(0,194,255,0.20) 40%, rgba(0,0,0,0.35) 100%)",
                  }}
                />

                {/* bottom gradient for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                {/* caption */}
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="flex items-center justify-between">
                    <div className="backdrop-blur-sm bg-black/35 rounded-xl px-3 py-2 ring-1 ring-white/10">
                      <div className="text-white font-semibold leading-tight">{item.title_en}</div>
                      <div className="text-white/80 text-xs leading-tight">{item.title_ka}</div>
                    </div>
                    {/* arrow */}
                    <div className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white/90 transition-all group-hover:translate-x-0.5 group-hover:bg-white/15">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}