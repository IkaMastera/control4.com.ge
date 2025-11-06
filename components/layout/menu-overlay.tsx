'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About' },
  { href: '/ai', label: 'AI & Automations' },
  { href: '/contact', label: 'Say Hello' },
];

export default function MenuOverlay({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;

    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !el.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  return (
    <div
      id="global-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[60] transition-[opacity,visibility] duration-300',
        open ? 'opacity-100 visible' : 'opacity-0 invisible',
      ].join(' ')}
    >
      <div className="absolute inset-0 -z-10 bg-[#0B1220]">
        <div className="absolute inset-0 animate-c4-gradient-hero opacity-[0.92] [background:radial-gradient(1200px_900px_at_5%_10%,#0056B8_0%,transparent_60%),radial-gradient(1200px_900px_at_95%_15%,#00C2FF_0%,transparent_60%),linear-gradient(180deg,#0B1220_0%,#0D1117_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative mx-auto flex h-full max-w-[1400px] flex-col gap-8 px-6 sm:px-10"
      >
        <div className="flex items-center justify-between pt-6">
          <Link href="/" onClick={onClose} className="text-white text-xl font-semibold">
            Control<span className="text-[#00C2FF]">4</span>.ge
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="group inline-flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
          >
            <span className="uppercase tracking-wide">Close</span>
            <span
              aria-hidden
              className="relative inline-block h-[12px] w-6 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-white after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-white before:translate-y-[5px] before:rotate-45 after:-translate-y-[5px] after:-rotate-45"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
          <ul className="md:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 mt-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="group relative block text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] text-white/95 hover:text-white transition-colors"
                >
                  {l.label}
                  <span className="mt-2 block h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-white/90" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-6 text-white/85 mt-8">
            <p className="text-sm uppercase tracking-widest text-white/60">
              We integrate smart systems across Georgia.
            </p>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="hover:underline" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a className="hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="hover:underline" href="https://wa.me/995" target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
            <div className="pt-4 text-xs text-white/55">
              © {new Date().getFullYear()} Control4 Georgia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}