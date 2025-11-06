'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MenuOverlay from './menu-overlay';
import { useLockBodyScroll } from '@/components/hooks/use-lock-body-scroll'

const NAV = [
  { href: '/', label: { ka: 'მთავარი', en: 'Home' } },
  { href: '/solutions', label: { ka: 'ქსელები', en: 'Solutions' } },
  { href: '/partners', label: { ka: 'პარტნიორები', en: 'Partners' } },
  { href: '/contact', label: { ka: 'კონტაქტი', en: 'Contact' } },
];

export default function HeaderDynamic() {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full',
          'backdrop-blur supports-[backdrop-filter]:bg-black/55',
          'bg-[rgba(9,12,18,0.72)]',
          scrolled ? 'shadow-[0_0_0_1px_rgba(0,194,255,.12),0_8px_24px_-8px_rgba(0,86,184,.25)]' : 'shadow-none',
          'transition-shadow duration-300',
          'relative',
        ].join(' ')}
        aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="h-full w-full opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent)] animate-c4-gradient bg-[radial-gradient(1200px_180px_at_10%_0%,#0056B8_0%,transparent_55%),radial-gradient(1200px_180px_at_90%_0%,#00C2FF_0%,transparent_55%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Control4 Georgia – Home">
            <span className="text-white text-xl font-semibold tracking-tight">
              Control<span className="text-[#00C2FF]">4</span><span className="text-white/80">.ge</span>
            </span>
            <span className="ml-1 h-1 w-1 rounded-full bg-[#00C2FF] group-hover:scale-125 transition" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-white/80 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:rounded-md"
              >
                <span className="pb-1">{item.label.en}</span>
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-[#0056B8] via-[#00C2FF] to-transparent transition-all duration-300 group-hover:w-full peer-hover:w-full" />
              </Link>
            ))}

            <div aria-label="Language" className="ml-2 rounded-full border border-white/10 px-2 py-1 text-xs text-white/70">
              KA · EN · RU
            </div>

            <Link
              href="/contact"
              className="ml-2 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[#0056B8] hover:bg-[#0a63cf] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-black transition"
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="global-menu"
            className="md:ml-4 inline-flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
          >
            <span className="uppercase tracking-wide">{open ? 'Close' : 'Menu'}</span>
            <span
              aria-hidden
              className={[
                'relative inline-block h-[12px] w-6',
                'before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-white before:transition',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-white after:transition',
                open
                  ? 'before:translate-y-[5px] before:rotate-45 after:-translate-y-[5px] after:-rotate-45'
                  : 'before:translate-y-0 after:translate-y-0',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen module */}
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}