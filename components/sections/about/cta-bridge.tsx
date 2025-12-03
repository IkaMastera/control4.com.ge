import Link from 'next/link';

export default function CtaBridge() {
  return (
    <section className="relative py-28 px-6">
      <div aria-hidden className="about-bridge" />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold">Ready to build a calm, powerful home?</h2>
        <p className="mt-4 text-white/70">Talk directly with our engineering team. We’ll make technology feel simple.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/contact" className="btn-glow btn-glow--trio px-6 py-3 rounded-xl ring-1 ring-white/10">Start a project</Link>
          <a href="#pillars" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">See how we work</a>
        </div>
      </div>
    </section>
  );
}
