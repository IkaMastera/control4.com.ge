import AboutSection from "@/components/sections/about";
import HeroSnap from "@/components/sections/hero-snap";
import ServicesSlider from "@/components/sections/services-slider";

export default function Home() {
  return (
    <>
      <HeroSnap />
      <AboutSection />
      <ServicesSlider />
      {/* other sections… */}
    </>
  );
}