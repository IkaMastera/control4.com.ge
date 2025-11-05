'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onRM = () => setPrefersReduced(mq.matches);
    onRM();
    mq.addEventListener?.('change', onRM);

    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      mq.removeEventListener?.('change', onRM);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <div
      aria-hidden={!show}
      className={`
        fixed z-[55] right-4 sm:right-6
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        transition-all duration-300
      `}
      style={{ bottom: '5.5rem' }}
    >
      <button
        type="button"
        onClick={goTop}
        aria-label="Back to top"
        className="
          cursor-pointer flex items-center justify-center
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-black/60 backdrop-blur-md text-white
          border border-white/15
          shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_22px_rgba(0,194,255,0.45)]
          hover:scale-105 active:scale-95 transition-transform
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF]/70
        "
      >
        <ArrowUp className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}