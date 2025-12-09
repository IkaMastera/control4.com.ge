'use client';

import type { ReactNode } from 'react';

type ProductScrollBackgroundProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function ProductScrollBackground({
  id,
  title,
  children,
  className,
}: ProductScrollBackgroundProps) {
  const labeledBy = title && id ? `${id}-label` : undefined;

  return (
    <div
      id={id}
      aria-labelledby={labeledBy}
      className={className ?? ''}
    >
      <div
        className="
          relative overflow-hidden
          rounded-4xl
          border border-white/10
          bg-[#050812]
          shadow-[0_24px_60px_rgba(0,0,0,0.85)]
        "
      >
        {/* Background effects behind the products */}
        <div className="pointer-events-none absolute inset-0">

          {/* TOP DARK BLUE GLOW (replaced the old bright cyan) */}
          <div
            className="
              absolute inset-x-[-120px] -top-20 h-72
              bg-[radial-gradient(circle_at_top,rgba(0,86,184,0.40),transparent_65%)]
              opacity-80
            "
          />

          {/* Left vertical glow line */}
          <div
            className="
              absolute inset-y-8 left-0 w-0.5
              bg-linear-to-b from-transparent via-primary to-transparent
              opacity-70
            "
          />

          {/* Right vertical glow line */}
          <div
            className="
              absolute inset-y-8 right-0 w-0.5
              bg-linear-to-b from-transparent via-accent to-transparent
              opacity-70
            "
          />

          {/* Top small highlight line */}
          <div
            className="
              absolute inset-x-6 top-0 h-px
              bg-linear-to-r from-transparent via-accent to-transparent
              opacity-75
            "
          />

          {/* Bottom shadow so products sit deeper into the dark area */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Foreground content where cards and products are shown */}
        <div className="relative px-6 sm:px-8 pt-6 sm:pt-7 pb-4 sm:pb-5">
          {title && (
            <p
              id={labeledBy}
              className="
                text-[11px] sm:text-xs
                uppercase tracking-[0.28em]
                text-white/70
              "
            >
              {title}
            </p>
          )}

          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
