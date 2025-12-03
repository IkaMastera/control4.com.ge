import Link from 'next/link';

export default function FinaleBridge() {
  return (
    <section className="relative py-28 px-6">
      <div aria-hidden className="bridge" />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold">Let’s build something calm and powerful.</h2>
        <p className="mt-4 text-white/70">Speak directly with an engineer. We’ll design to your life, not the other way around.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/contact" className="btn-glow btn-glow--trio px-6 py-3 rounded-xl ring-1 ring-white/10">Start a project</Link>
          <a href="#values" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">See our values</a>
        </div>
      </div>
    </section>
  );
}
