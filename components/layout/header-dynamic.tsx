'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuOverlay from './menu-overlay';
import LangSwitcher from './lang-switcher';
import { useLockBodyScroll } from '@/components/hooks/use-lock-body-scroll'

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
          'fixed top-0 z-50 w-full',
          'bg-[rgba(9,12,18,0.72)] backdrop-blur supports-[backdrop-filter]:bg-black/55',
          scrolled ? 'shadow-[0_0_0_1px_rgba(0,194,255,.14),0_10px_30px_-12px_rgba(0,86,184,.35)]' : 'shadow-none',
          'transition-shadow duration-300',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="h-full w-full opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)] animate-c4-gradient bg-[radial-gradient(1200px_180px_at_12%_0%,#0056B8_0%,transparent_55%),radial-gradient(1200px_180px_at_88%_0%,#00C2FF_0%,transparent_55%)]" />
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2" aria-label="Control4 Georgia – Home">
            <span className="text-white text-xl font-semibold tracking-tight">
              Control<span className="text-[#00C2FF]">4</span><span className="text-white/80">.ge</span>
            </span>
            <span
              aria-hidden
              className={[
                'ml-1 h-1 w-1 rounded-full bg-[#00C2FF] transition-transform duration-300',
                scrolled ? 'scale-125 shadow-[0_0_12px_2px_rgba(0,194,255,.6)]' : 'scale-100',
              ].join(' ')}
            />
          </Link>


          <div className="flex items-center gap-2">

            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/showroom-360"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 transition"
              >
                360° Showroom
              </Link>
              <Link
                href="/price-calculator"
                className="rounded-full border border-[#00C2FF]/30 bg-[#0056B8] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0a63cf] transition"
              >
                Price Calculator
              </Link>
            </div>

            {/* Language */}
            <div className="hidden sm:block">
              <LangSwitcher current="ka" />
            </div>

            {/* Menu / Close */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="global-menu"
              className="ml-1 inline-flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
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
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}