import AboutSection from "@/components/sections/about";
import BrandWall from "@/components/sections/brand-wall";
import HeroSnap from "@/components/sections/hero-snap";
import HeroSticky from "@/components/sections/hero-sticky";
import ServicesSlider from "@/components/sections/services-slider";

export default function Home() {
  return (
    <>
      <HeroSticky />
      <AboutSection />
      <ServicesSlider />
      <BrandWall />
      {/* other sections… */}
    </>
  );
}