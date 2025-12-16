'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = { open: boolean; onClose: () => void };

const LINKS = [
  { href: '/showroom-360', label: '360° Showroom' },
  { href: '/price-calculator', label: 'Price Calculator' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function MenuOverlay({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ESC to close (no outside-click close)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // ✅ bulletproof scroll lock: store previous values only when opening
  const prevOverflowRef = useRef<{ body: string; html: string } | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    const html = document.documentElement;

    if (open) {
      // store once (only first time we lock)
      if (!prevOverflowRef.current) {
        prevOverflowRef.current = {
          body: body.style.overflow,
          html: html.style.overflow,
        };
      }

      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      return;
    }

    // restore when closing
    if (prevOverflowRef.current) {
      body.style.overflow = prevOverflowRef.current.body;
      html.style.overflow = prevOverflowRef.current.html;
      prevOverflowRef.current = null;
    }
  }, [open, mounted]);

  // extra safety: restore if component unmounts mid-lock
  useEffect(() => {
    return () => {
      const prev = prevOverflowRef.current;
      if (!prev) return;
      document.body.style.overflow = prev.body;
      document.documentElement.style.overflow = prev.html;
      prevOverflowRef.current = null;
    };
  }, []);

  if (!mounted && !open) return null;

  const base = 140; // stagger base

  return (
    <div
      id="global-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[999] isolate',
        open ? 'pointer-events-auto' : 'pointer-events-none',
        mounted ? 'visible' : 'invisible',
      ].join(' ')}
    >
      {/* PANEL */}
      <div
        className={[
          'absolute inset-x-0 top-0 h-[100dvh]',
          // ✅ allow scroll on short viewports
          'overflow-y-auto overscroll-contain',
          'bg-[#0B1220] border-b border-white/10',
          open
            ? 'motion-safe:animate-[c4-drop-bounce_820ms_cubic-bezier(.2,.8,.16,1)_both]'
            : 'motion-safe:animate-[c4-drop-bounce-out_360ms_cubic-bezier(.4,0,.2,1)_both]',
        ].join(' ')}
        style={{
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        {/* background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1400px_900px_at_8%_0%,#0056B8_0%,transparent_60%),radial-gradient(1400px_900px_at_92%_0%,#00C2FF_0%,transparent_60%),linear-gradient(180deg,#0B1220_0%,#0D1117_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-linear-to-t from-black/45 to-transparent" />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 sm:px-10">
          {/* Top bar – safe-area aware */}
          <div
            className="flex items-center justify-between"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)',
            }}
          >
            <Link
              href="/"
              onClick={onClose}
              aria-label="Control4 Georgia — Home"
              className="text-white text-xl font-semibold"
              style={
                open
                  ? {
                      animation: `c4-spring-down-far 560ms cubic-bezier(.2,.8,.16,1) ${
                        base + 40
                      }ms both`,
                    }
                  : { transform: 'translateY(-12vh)' }
              }
            >
              Control<span className="text-accent">4</span>.ge
            </Link>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="group shrink-0 inline-flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
              style={
                open
                  ? {
                      animation: `c4-spring-down-far 560ms cubic-bezier(.2,.8,.16,1) ${
                        base + 80
                      }ms both`,
                    }
                  : { transform: 'translateY(-12vh)' }
              }
            >
              <span className="uppercase tracking-wide">Close</span>
              <span
                aria-hidden
                className="relative inline-block h-3 w-6
                 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-white
                 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-white
                 before:translate-y-[5px] before:rotate-45 after:-translate-y-[5px] after:-rotate-45"
              />
            </button>
          </div>

          {/* Content */}
          <div
            className={[
              'grid grid-cols-1 items-start gap-10 pb-10',
              'md:grid-cols-3 md:gap-16',
              '[@media(max-height:720px)]:gap-8',
              // ✅ keep content above WhatsApp FAB + safe area
              'pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)]',
              'md:pb-[calc(env(safe-area-inset-bottom,0px)+2.5rem)]',
            ].join(' ')}
          >
            {/* LEFT: links */}
            <div className="mt-4 md:col-span-2">
              <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                {LINKS.map((l, i) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="group relative block font-semibold leading-[1.05] text-white/95 transition-colors hover:text-white"
                      style={
                        open
                          ? {
                              animation: `c4-spring-up-far 640ms cubic-bezier(.2,.8,.16,1) ${
                                base + 160 + i * 90
                              }ms both`,
                              fontSize: 'clamp(2.25rem, 7.2vw, 4.5rem)',
                            }
                          : {
                              transform: 'translateY(40vh)',
                              fontSize: 'clamp(2.25rem, 7.2vw, 4.5rem)',
                            }
                      }
                    >
                      {l.label}
                      <span className="mt-2 block h-[3px] w-0 bg-white/90 transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: video + meta + social */}
            <div
              className="mt-2 flex flex-col gap-6"
              style={
                open
                  ? {
                      animation: `c4-spring-right-far 580ms cubic-bezier(.2,.8,.16,1) ${
                        base + 220
                      }ms both`,
                    }
                  : { transform: 'translateX(50vw)' }
              }
            >
              <div
                className="rounded-2xl border border-white/10 bg-black/30 p-3"
                style={
                  open
                    ? {
                        animation: `c4-spring-right-far 600ms cubic-bezier(.2,.8,.16,1) ${
                          base + 260
                        }ms both`,
                      }
                    : { transform: 'translateX(50vw)' }
                }
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="/videos/dropdown-menu-video2.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>

              <p className="mb-1 text-xs tracking-[0.22em] text-white/60 uppercase">
                Smart Systems for Premium Homes & Venues.
              </p>

              <ul
                className="flex gap-4"
                style={
                  open
                    ? {
                        animation: `c4-spring-right-far 640ms cubic-bezier(.2,.8,.16,1) ${
                          base + 420
                        }ms both`,
                      }
                    : { transform: 'translateX(50vw)' }
                }
              >
                {[
                  {
                    href: 'https://instagram.com',
                    icon: 'fa-instagram',
                    fill: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#cc2366]',
                  },
                  {
                    href: 'https://facebook.com',
                    icon: 'fa-facebook-f',
                    fill: 'bg-[#3b5999]',
                  },
                  {
                    href: 'https://linkedin.com',
                    icon: 'fa-linkedin-in',
                    fill: 'bg-[#0077b5]',
                  },
                  {
                    href: 'https://wa.me/995511223366',
                    icon: 'fa-whatsapp',
                    fill: 'bg-[#25D366]',
                  },
                ].map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white text-[#0B1220] transition-all duration-500 overflow-hidden"
                      aria-label={s.icon.replace('fa-', '')}
                    >
                      <i
                        className={`fab ${s.icon} text-2xl relative z-10 transition-transform duration-700 group-hover:rotate-360 group-hover:text-white`}
                      />
                      <span
                        className={`absolute inset-0 top-full ${s.fill} transition-all duration-500 group-hover:top-0`}
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div
                className="pt-2 text-xs text-white/55"
                style={
                  open
                    ? {
                        animation: `c4-spring-right-far 560ms cubic-bezier(.2,.8,.16,1) ${
                          base + 700
                        }ms both`,
                      }
                    : { transform: 'translateX(50vw)' }
                }
              >
                © {new Date().getFullYear()} Control4 Georgia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}