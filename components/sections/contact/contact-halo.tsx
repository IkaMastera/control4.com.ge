'use client';

import Image from 'next/image';
import StarfallCanvas from '@/components/ui/star-fall-canvas';

export default function ContactHalo() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-0 -z-10 overflow-hidden
        [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]
      "
    >
      <Image
        src="/images/contact-page-bg2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-95"
      />

      <StarfallCanvas
        zIndex={0}
        count={30}
        speed={1.5}
        maxSize={2.8}
        mode="ambient"
        shootingStarEverySec={[10, 20]}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(13,17,23)/.55] to-transparent" />
    </div>
  );
}