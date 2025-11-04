'use client';

import Image from 'next/image';
import Link from 'next/link';

export type DockItem = {
  id: string;
  name: string;
  slug: string;
  thumb: string;
};

export default function ProductDockPlaceholder({ items }: { items: DockItem[] }) {
  return (
    <nav
      id="products-dock"
      aria-label="Product dock"
      className="w-full relative mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-2"
    >
      <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              href={`#${it.slug}`}
              className="group block rounded-xl bg-black/40 ring-1 ring-white/10 hover:ring-[#00C2FF]/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF]"
            >
              <div className="relative h-24">
                <Image
                  src={it.thumb}
                  alt={`${it.name} thumbnail`}
                  fill
                  sizes="10vw"
                  className="object-cover opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-xl" />
              </div>
              <div className="px-3 py-2">
                <p className="text-xs text-white/80 line-clamp-2">{it.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}