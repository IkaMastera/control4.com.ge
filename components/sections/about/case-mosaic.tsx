export default function CaseMosaic() {
  const items = [
    { t: 'Lighting Scenes', i: '/images/about/cases/lighting.jpg', d: 'Sunrise/party/night paths that feel natural.' },
    { t: 'Whole-home Audio', i: '/images/about/cases/audio.jpg', d: 'Room groups and profiles for the family.' },
    { t: 'Security & Intercom', i: '/images/about/cases/security.jpg', d: 'Open gate, see door, speak, record—one flow.' },
    { t: 'Climate & Shades', i: '/images/about/cases/climate.jpg', d: 'Comfort that anticipates and saves energy.' },
  ];
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">What it feels like</h2>
        <p className="mt-4 text-white/70">A system that fades into your day.</p>
      </div>

      <div className="mx-auto mt-14 max-w-6xl grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((c)=>(
          <figure key={c.t} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1524] aspect-[4/5]">
            <img src={c.i} alt={c.t} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-lg font-semibold">{c.t}</p>
              <p className="text-white/70 text-sm">{c.d}</p>
            </figcaption>
            <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(56,189,248,0.45)]" />
          </figure>
        ))}
      </div>
    </section>
  );
}
