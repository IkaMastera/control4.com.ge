'use client';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  id?: string;
  className?: string;
  title?: string;
}>;

export default function DockStage({ id, className = '', title, children }: Props) {
  return (
    <section id={id} className={`relative ${className}`}>
      {/* top separator */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 right-0 h-[1px]
                   bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* panel */}
      <div
        className="
          relative rounded-3xl ring-1 ring-white/10 overflow-hidden
          bg-[#0F131A]
        "
      >
        <div
          aria-hidden
          className="absolute -inset-x-16 -top-24 h-40 blur-3xl opacity-40
                     bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,194,255,.25),transparent_70%)]"
        />

        <div
          aria-hidden
          className="absolute inset-0 opacity-[.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px, 56px 56px',
            maskImage:
              'radial-gradient(120% 100% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(120% 100% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        {title && (
          <div className="px-5 sm:px-7 pt-4">
            <p className="text-[10px] sm:text-xs tracking-[0.22em] text-white/60">
              {title}
            </p>
          </div>
        )}
        <div className="relative px-2 sm:px-4 py-6">
          {children}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px]
                     bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 right-0 h-[1px]
                   bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </section>
  );
}