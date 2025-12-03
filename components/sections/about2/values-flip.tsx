const CARDS = [
  {
    t: 'Simplicity',
    b: 'Clear interfaces. Scenes that feel natural. Zero friction.',
  },
  {
    t: 'Reliability',
    b: 'Disciplined networks, power, and documentation for decades.',
  },
  {
    t: 'Craft',
    b: 'Engineered by specialists, refined by designers, supported by people.',
  },
];

export default function ValuesFlip() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">What defines our work</h2>
        <p className="mt-4 text-white/70">Not features — principles.</p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <button
            key={c.t}
            className="vals group relative perspective rounded-2xl focus:outline-none"
            aria-label={c.t}
          >
            <div className="vals-inner rounded-2xl">
              <div className="vals-face vals-front">
                <h3 className="text-xl font-semibold">{c.t}</h3>
                <span className="led" />
              </div>
              <div className="vals-face vals-back">
                <p className="text-white/80">{c.b}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
