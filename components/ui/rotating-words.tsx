'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Props = {
  words: string[];
  interval?: number; // ms
  className?: string;
};

export default function RotatingWords({ words, interval = 2200, className }: Props) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const liveRef = useRef<HTMLSpanElement>(null);

  // Rotate words
  useEffect(() => {
    if (prefersReduced || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [interval, prefersReduced, words.length]);

  // Screen reader live region update
  useEffect(() => {
    if (!liveRef.current) return;
    liveRef.current.textContent = words[index];
  }, [index, words]);

  return (
    <span className={`relative inline-block align-baseline ${className || ''}`}>
      {/* Visual animation */}
      <span aria-hidden className="relative inline-block min-w-[8ch]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="inline-block"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Accessibility */}
      <span aria-live="polite" className="sr-only" ref={liveRef} />
    </span>
  );
}