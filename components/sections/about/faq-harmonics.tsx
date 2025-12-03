'use client';

import { useState } from 'react';

const QA = [
  { q: 'How long does a typical project take?', a: 'Small apartments ~2–4 weeks; villas ~6–12 weeks depending on wiring and scope.' },
  { q: 'Can you integrate my existing devices?', a: 'Yes—after an audit. We map compatibility, network quality, and UX impact.' },
  { q: 'What happens if the internet goes down?', a: 'Core scenes continue on local network. Remote features pause until online.' },
  { q: 'Do you provide maintenance?', a: 'Yes—tiered SLAs with remote monitoring and scheduled tune-ups.' },
];

export default function FaqHarmonics() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Questions, answered</h2>
        <p className="mt-4 text-white/70">Transparent, calm, and practical.</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0F1524]">
        {QA.map((i, idx) => (
          <details key={i.q} open={open === idx} onClick={(e)=>{ e.preventDefault(); setOpen(open===idx?null:idx); }} className="group">
            <summary className="flex items-center justify-between gap-4 cursor-pointer select-none p-5">
              <h3 className="font-semibold">{i.q}</h3>
              <span className={`transition-transform ${open===idx?'rotate-45':''}`}>+</span>
            </summary>
            <div className="px-5 pb-5 text-white/70 animate-[accordion_.35s_cubic-bezier(.2,.6,.2,1)]">{i.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
