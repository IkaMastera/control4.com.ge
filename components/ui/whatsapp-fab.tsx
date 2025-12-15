'use client';

import { useMemo } from 'react';

type Locale = 'ka' | 'en' | 'ru';

type Props = {
  phone?: string;
  message?: { ka?: string; en?: string; ru?: string };
  locale?: Locale;
};

export default function WhatsAppFAB({
  phone,
  message,
  locale = 'ka',
}: Props) {
  const text =
    (locale === 'ka' && message?.ka) ||
    (locale === 'ru' && message?.ru) ||
    message?.en ||
    'Hello! I’d like to talk about Control4.';

  const targetPhone = phone ?? '995511223366';

  const href = useMemo(() => {
    const base = `https://wa.me/${targetPhone}`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }, [targetPhone, text]);

  return (
    <div
      className="
        fixed z-55 right-4 sm:right-6
        transition-all duration-300
      "
      style={{ bottom: '1.25rem' }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="WhatsApp"
        className="
          cursor-pointer flex items-center justify-center
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-[#25D366] text-white
          shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_0_22px_rgba(37,211,102,0.55)]
          hover:scale-105 active:scale-95 transition-transform
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF]/70
        "
      >
        <i
          className="fab fa-whatsapp text-[1.6rem] leading-none"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}