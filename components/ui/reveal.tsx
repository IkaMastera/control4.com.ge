'use client';

import React, { useEffect, useRef } from 'react';


type Props = {
  as?: React.ElementType;        // ← simple and safe
  children: React.ReactNode;
  className?: string;
  delay?: number;                // ms
  y?: number;                    // px
  x?: number;                    // px
  once?: boolean;
};

export default function Reveal({
  as: As = 'div',
  children,
  className = '',
  delay = 0,
  y = 16,
  x = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef: React.RefCallback<HTMLElement> = (node: HTMLElement | null) => {
  ref.current = node;
};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          if (once) io.unobserve(el);
        } else if (!once) {
          el.classList.remove('is-in');
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

    return (
        <As
            ref={setRef}
            data-reveal
            style={
            {
                '--reveal-delay': `${delay}ms`,
                '--reveal-y': `${y}px`,
                '--reveal-x': `${x}px`,
            } as React.CSSProperties
            }
            className={className}
        >
            {children}
        </As>
    );
}