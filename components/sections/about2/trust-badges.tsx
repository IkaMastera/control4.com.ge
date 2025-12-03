export default function TrustBadges() {
  const items = ['Control4', 'Pakedge', 'Araknis', 'Triad', 'Luma', 'Episode', 'OvrC'];
  return (
    <section className="relative py-20">
      <p className="text-center text-sm uppercase tracking-[0.25em] text-white/60">Trusted Technology</p>
      <div className="mt-8 overflow-hidden">
        <div className="brands-marquee">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="brand-chip">{t}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-6">
        {['Certified Partner', 'Documented QA', 'Secure Networking', '24/7 Support'].map((b) => (
          <div key={b} className="badge">
            <span className="shine" />
            <p className="font-semibold">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
