'use client';

import React from 'react';

type Props = {
  count?: number;
  zIndex?: number;
};

export default function Starfall({ count = 60, zIndex = 0 }: Props) {
  return (
    <div
      aria-hidden
      className="starfall pointer-events-none absolute inset-0"
      style={{ zIndex }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const drift = (Math.random() - 0.5) * 30;
        const dur = 6 + Math.random() * 8;
        const delay = -(Math.random() * dur);
        const opacity = 0.6 + Math.random() * 0.35; 

        return (
          <span
            key={i}
            className="starfall__star"
            style={
              {
                '--left': `${left}%`,
                '--size': `${size}px`,
                '--drift': `${drift}px`,
                '--dur': `${dur}s`,
                '--delay': `${delay}s`,
                '--alpha': opacity,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}