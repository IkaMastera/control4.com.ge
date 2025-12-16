'use client';

import { useMemo } from 'react';

type Locale = 'ka' | 'en' | 'ru';

type Props = {
  phone?: string;
  message?: { ka?: string; en?: string; ru?: string };
  locale?: Locale;
};

function normalizePhone(input?: string) {
  const digits = (input ?? '').replace(/\D/g, '');
  // if Georgian mobile given without country code: 511223366 -> prefix 995
  if (digits.length === 9 && digits.startsWith('5')) return `995${digits}`;
  return digits;
}

export default function WhatsAppFAB({
  phone,
  message,
  locale = 'ka',
}: Props) {
  const text =
    (locale === 'ka' && message?.ka) ||
    (locale === 'ru' && message?.ru) ||
    message?.en ||
    "Hello! I’d like to talk about Control4.";

  const targetPhone = normalizePhone(phone ?? '511 22 33 66');

  const href = useMemo(() => {
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  }, [targetPhone, text]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        c4-wa-fab
        fixed bottom-5 right-4 sm:right-6
        z-[9999]
        pointer-events-auto
        flex items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full
        bg-[#25D366] text-white
        cursor-pointer
        transition-transform
        hover:scale-105 active:scale-95
      "
    >
      <i className="fab fa-whatsapp text-[1.6rem]" aria-hidden="true" />
    </a>
  );
}