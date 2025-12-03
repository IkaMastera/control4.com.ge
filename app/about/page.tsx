import type { Metadata } from 'next';

import ApexIntro from '@/components/sections/about2/apex-intro';
import StoryStrata from '@/components/sections/about2/story-strata';
import SignatureLine from '@/components/sections/about2/signature-line';
import ValuesFlip from '@/components/sections/about2/values-flip';
import SpiralProcess from '@/components/sections/about2/spiral-process';
import StudioPanels from '@/components/sections/about2/studio-panels';
import TrustBadges from '@/components/sections/about2/trust-badges';
import FinaleBridge from '@/components/sections/about2/finale-bridge';

export const metadata: Metadata = {
  title: 'About Us | Control4 Georgia',
  description: 'A premium Control4 integrator in Georgia — engineering discipline, design taste, and human service.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="relative bg-[var(--color-bg)] text-white overflow-hidden">
      <ApexIntro />
      <StoryStrata />
      <SignatureLine />
      <ValuesFlip />
      <SpiralProcess />
      <StudioPanels />
      <TrustBadges />
      <FinaleBridge />
    </main>
  );
}
