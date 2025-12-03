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
          rounded-[32px]
          border border-white/10
          bg-[#050812]
          shadow-[0_24px_60px_rgba(0,0,0,0.85)]
        "
      >
        {/* Ambient background: no grid, only glows & glass */}
        <div className="pointer-events-none absolute inset-0">
          {/* Top cyan wash */}
          <div
            className="
              absolute inset-x-[-120px] top-[-80px] h-72
              bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.45),transparent_65%)]
              opacity-80
            "
          />

          {/* Side accent beams */}
          <div
            className="
              absolute inset-y-8 left-0 w-[2px]
              bg-gradient-to-b from-transparent via-[#0056B8] to-transparent
              opacity-70
            "
          />
          <div
            className="
              absolute inset-y-8 right-0 w-[2px]
              bg-gradient-to-b from-transparent via-[#00C2FF] to-transparent
              opacity-70
            "
          />

          {/* Top highlight line */}
          <div
            className="
              absolute inset-x-6 top-0 h-px
              bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent
              opacity-75
            "
          />

          {/* Bottom vignette so cards sit into darkness */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Foreground content */}
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