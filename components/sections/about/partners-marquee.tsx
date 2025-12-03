export default function PartnersMarquee() {
  const items = ["Control4", "Pakedge", "Araknis", "Triad", "Luma", "Episode", "OvrC"];
  return (
    <section className="relative py-20">
      <p className="text-center text-sm uppercase tracking-[0.25em] text-white/60">
        Trusted Technology
      </p>
      <div className="mt-8 overflow-hidden">
        <div className="about-marquee">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="about-marquee-item">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
