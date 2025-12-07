import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/about-hero";

export const metadata: Metadata = {
  title: "About | Control4 Georgia",
  description:
    "Control4 Georgia designs and engineers premium smart home systems in Georgia – lighting, climate, audio, security and more, all working as one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#0D1117] text-white">
      <AboutHero />
    </main>
  );
}