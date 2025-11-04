'use client';

import { useEffect, useRef } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  /** ms */
  delay?: number;
  /** px offsets for slide-in */
  y?: number;
  x?: number;
  /** reveal again when leaving/entering */
  once?: boolean;
};

export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 16,
  x = 0,
  once = true,
}: Props) {
  const Tag = as as any;
  const ref = useRef<HTMLElement | null>(null);

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
    <Tag
      ref={ref as any}
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
    </Tag>
  );
}