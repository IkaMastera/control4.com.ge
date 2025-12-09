'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Locale = 'ka' | 'en' | 'tr';
const LOCALES: Array<{ code: Locale; label: string }> = [
  { code: 'ka', label: 'ქართული' },
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
];

export default function LangSwitcher({ current = 'ka' as Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const swapLocale = (code: Locale) => {
    
    const next = pathname.replace(/^\/(ka|en|tr)(?=\/|$)/, `/${code}`);
    const finalPath = next === pathname ? `/${code}${pathname}` : next;
    setOpen(false);
    router.push(finalPath);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className="font-medium uppercase tracking-wide">{current}</span>
        <span className={`h-2 w-2 rounded-full bg-accent transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <ul
        role="listbox"
        className={[
          'absolute right-0 mt-2 min-w-36 overflow-hidden rounded-xl border border-white/10 bg-[#0B1220]/95 backdrop-blur shadow-lg transition-all duration-200 origin-top',
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95',
        ].join(' ')}
      >
        {LOCALES.map(({ code, label }) => (
          <li key={code}>
            <button
              type="button"
              onClick={() => swapLocale(code)}
              className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              <span className="h-2 w-2 rounded-full bg-white/60" />
              <span>{label}</span>
              <span className="ml-auto text-xs uppercase text-white/50">{code}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}