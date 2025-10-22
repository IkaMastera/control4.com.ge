'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion'
import Container from "@/components/common/container";

const nav = [
    { href: '/', label: 'Home' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/partners', label: 'Partners' },
    { href: '/contact', label: 'Contact'},
];

export default function Header() {
    const pathname = usePathname();
    const [lang, setLang] = useState<'KA' | 'EN' | 'RU'>('KA');

    return (
        <header className='fixed w-full top-0 z-50 border-b border-white/5 bg-[color:var(--color-bg)]/80 backdrop-blur'>
            <Container>
                <div className='flex h-16 items-center justify-between gap-3'>
                    {/* Logo */}
                    <Link href="/" aria-label="Control4 Georgia" className="text-2xl font-semibold tracking-tight text-white">
                      <span>Control</span>
                      <span className='text-accent'>4</span>
                      <span>.ge</span>
                    </Link>

                    {/* Nav */}
                    <nav aria-label="Main" className="hidden md:block">
                        <ul className='flex items-center gap-6'>
                            {nav.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link 
                                            href={item.href}
                                            className='relative block rounded-xl px-4 py-2 text-sm text-white/85 transition-colors hover:text-white'
                                        >
                                            {active && (
                                                <motion.span
                                                  layoutId="navActive"
                                                  className='absolute inset-0 -z-10 rounded-xl bg-accent/10 ring-1 ring-accent/40'
                                                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                                />
                                            )}
                                            <span className={active ? 'text-accent' : ''}>{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Right side: locale + CTA */}
                    <div className='flex items-center gap-3'>
                        {/* Locale stub (no i18n yet) */}
                        <div role="group" aria-label="Language" className="relative flex overflow-hidden rounded-full border border-white/10">
                          {(['KA', 'EN', 'RU'] as const).map((lng) => (
                            <button 
                             key={lng}
                             type="button" 
                             onClick={() => setLang(lng)} 
                             className="relative px-3 py-1.5 text-xs text-white/80 transition-colors hover:text-white"
                             aria-pressed={lang === lng}
                             >
                                {lang === lng && (
                                    <motion.span
                                        layoutId="langActive"
                                        className='absolute inset-0 -z-10 rounded-full bg-white/10'
                                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                    />
                                )}
                                {lng}
                            </button>
                          ))}
                        </div>

                        <Link href="/contact" className="hidden rounded-2xl bg-primary px-5 py-2.5 text-sm text-white shadow transition-all
                                                         hover:shadow-lg hover:opacity-95 hover:-translate-y-0.5
                                                         focus-visible:ring-2 focus-visible:ring-accent/60 focus:outline-none md:inline-block">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Mobile nav row */}
                <nav aria-label='Main' className='md:hidden py-2'>
                    <ul className='flex flex-wrap gap-x-4 gap-y-2'>
                        {nav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className='text-sm text-white/80 hover:text-white'>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}