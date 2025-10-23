import Image from "next/image";
import styles from "./products-parallax.module.css";

type Card = {
  id: string;
  title_en: string;
  title_ka: string;
  img: string;
  depth?: string; // class name modifier
};

const cards: Card[] = [
  { id: "controllers", title_en: "Core Controllers",   title_ka: "კონტროლერები (Core)", img: "/images/controllers.jpg", depth: styles.slower },
  { id: "climate",     title_en: "Climate Control",    title_ka: "კლიმატის კონტროლი",     img: "/images/climate.jpg",     depth: styles.faster },
  { id: "security",    title_en: "Security & Cameras", title_ka: "უსაფრთხოება და კამერები", img: "/images/security.jpg",    depth: styles.vertical },
  { id: "audio",       title_en: "Audio & Video",      title_ka: "აუდიო და ვიდეო",        img: "/images/audio.jpg",       depth: styles.slowerDown },
  { id: "lighting",    title_en: "Smart Lighting",     title_ka: "ჭკვიანი განათება",        img: "/images/lighting.jpg",    depth: styles.faster1 },
  { id: "intercom",    title_en: "Intercom & Access",  title_ka: "ინტერკომი და წვდომა",     img: "/images/intercom.jpg",    depth: styles.last },
];

export default function ProductsParallax() {
  return (
    <section className={`${styles.external} bg-[--color-bg]`} aria-labelledby="products-parallax-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20">
        <p className="text-xs uppercase tracking-widest text-[--color-accent]">Products</p>
        <h2 id="products-parallax-heading" className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-[--color-ink]">
          Control4 — Premium Smart Home Line
          <span className="block text-sm md:text-base font-normal text-white/60">
            კონტროლ4 — ჭკვიანი სახლის პრემიუმ მოწყობილობები
          </span>
        </h2>
      </div>

      <div className={styles.wrapper} role="region" aria-label="Scrollable product images">
        {cards.map((c) => (
          <div key={c.id} className={`${styles.card} ${c.depth ?? ""}`}>
            <div className={styles.link} aria-label={`${c.title_en} / ${c.title_ka}`} role="img">
              <Image
                src={c.img}
                alt={`${c.title_en} / ${c.title_ka}`}
                width={800}
                height={600}
                className={styles.img}
                priority={c.id === "controllers"}
              />
              <span className={styles.caption}>{c.title_en} · {c.title_ka}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}