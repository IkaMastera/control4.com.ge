'use client';

import { useMemo } from 'react';

type Locale = 'ka' | 'en' | 'ru';

type Props = {
  message?: { ka?: string; en?: string; ru?: string };
  locale?: Locale;
  fixed?: boolean;
  className?: string;
};

export default function WhatsAppFAB({
  message,
  locale = 'ka',
  fixed = true,
  className,
}: Props) {
  const text =
    (locale === 'ka' && message?.ka) ||
    (locale === 'ru' && message?.ru) ||
    message?.en ||
    'Hello! I’d like to talk about Control4.';

  const href = useMemo(() => {
    const phone = '995511223366'; // <-- YOUR EXACT WHATSAPP NUMBER
    const base = `https://wa.me/${phone}`;
    return `${base}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  }, [text]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="WhatsApp"
      className={[
        fixed
          ? 'fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[60]'
          : 'static',
        'group inline-flex h-14 w-14 items-center justify-center rounded-full',
        'bg-[#25D366] shadow-lg shadow-[#25D366]/35',
        'outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-[#0D1117]',
        'animate-[wa-breathe_2.8s_ease-in-out_infinite]',
        'transition-transform duration-150 will-change-transform hover:translate-y-[-1px] active:translate-y-0',
        'pointer-events-auto relative overflow-visible',
        className || '',
      ].join(' ')}
    >
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/60 opacity-0 group-hover:opacity-100 group-hover:animate-[wa-pulse_900ms_ease-out_forwards]" />
      <i
        className="fab fa-whatsapp text-white text-[1.7rem] leading-none"
        aria-hidden="true"
      />
    </a>
  );
}
