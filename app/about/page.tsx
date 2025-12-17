import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/about-hero";
import AboutStory from "@/components/sections/about/about-story";
import AboutPartners from "@/components/sections/about/about-partners";
import AboutValues from "@/components/sections/about/about-values";
import AboutProcess from "@/components/sections/about/about-process";


export const metadata: Metadata = {
  title: "About | Control4 Georgia",
  description:
    "Control4 Georgia designs and engineers premium smart home systems in Georgia – lighting, climate, audio, security and more, all working as one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-bg text-white">
      <AboutHero />
      {/* <AboutStats />*/}
      <AboutStory /> 
      <AboutProcess />
      <AboutPartners />
      <AboutValues />
    </main>
  );
}