'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Container from '@/components/common/container';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [lang, setLang] = useState<'KA' | 'EN' | 'RU'>('KA');
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware compact mode
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.2 });

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b border-white/5 backdrop-blur',
        'transition-all duration-300',
        scrolled ? 'bg-[color:var(--color-bg)]/85 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.6)]' : 'bg-[color:var(--color-bg)]/65',
      ].join(' ')}
    >
      {/* Reading progress */}
      <motion.span
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-[color:var(--color-accent)]/70"
      />
      {/* subtle top hairline */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/5" />

      <Container>
        <div className={`flex items-center justify-between gap-3 transition-[height] duration-300 ${scrolled ? 'h-12' : 'h-16'}`}>
          {/* Logo */}
          <Link
            href="/"
            aria-label="Control4 Georgia"
            className="relative text-2xl font-semibold tracking-tight text-white"
          >
            <span>Control</span>
            <span className="text-accent">4</span>
            <span>.ge</span>
            {/* tiny accent dot “sensor” */}
            <span
              aria-hidden
              className="absolute -right-2 bottom-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]/90 shadow-[0_0_12px_rgba(0,194,255,.6)]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="relative flex items-center gap-1.5 rounded-xl bg-white/0 p-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className="relative block rounded-xl px-4 py-2 text-sm text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60"
                    >
                      {active && (
                        <>
                          <motion.span
                            layoutId="navActive"
                            className="absolute inset-0 -z-10 rounded-xl bg-[color:var(--color-accent)]/10 ring-1 ring-[color:var(--color-accent)]/40"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                          <motion.span
                            layoutId="navUnderline"
                            className="absolute -bottom-[3px] left-3 right-3 h-[2px] rounded-full bg-[color:var(--color-accent)]/70"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        </>
                      )}
                      <span className={active ? 'text-accent' : ''}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: locale + CTA */}
          <div className="flex items-center gap-3">
            {/* Language pill (visual only for now) */}
            <div role="group" aria-label="Language" className="relative flex overflow-hidden rounded-full border border-white/10">
              {(['KA', 'EN', 'RU'] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLang(lng)}
                  className="relative px-3 py-1.5 text-xs text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60"
                  aria-pressed={lang === lng}
                >
                  {lang === lng && (
                    <motion.span
                      layoutId="langActive"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    />
                  )}
                  {lng}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              className="btn-glow hidden md:inline-block rounded-2xl bg-primary px-5 py-2.5 text-sm text-white shadow transition-all
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile nav row */}
        <nav aria-label="Main" className="md:hidden py-2">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm hover:text-white ${active ? 'text-accent' : 'text-white/80'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}