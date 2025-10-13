'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
        <header className='sticky top-0 z-50 border-b border-white/5 bg-[color:var(--color-bg)]/80 backdrop-blur'>
            <Container>
                <div className='flex h-16 items-center justify-between gap-3'>
                    {/* Logo */}
                    <Link href="/" aria-label="Control4 Georgia" className="font-semibold tracking-tight text-white">
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
                                        <Link href={item.href} className={`text-sm ${active ? 'text-accent' : 'text-white/80 hover:text-white'} transition`}>
                                           {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Right side: locale + CTA */}
                    <div className='flex items-center gap-3'>
                        {/* Locale stub (no i18n yet) */}
                        <div role="group" aria-label="Language" className="flex overflow-hidden rounded-full border border-white/10">
                          {['KA', 'EN', 'RU'].map((lng, i) => (
                            <button key={lng} type="button" className={`px-3 py-1.5 text-xs ${ i === 0 ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`} aria-pressed={i === 0}>
                                {lng}
                            </button>
                          ))}
                        </div>

                        <Link href="/contact" className='hidden rounded-2xl bg-primary px-4 py-2 text-sm text-white shadow hover:opacity-90 md:inline-block'>
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