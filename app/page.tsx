import AboutSection from "@/components/sections/about";
import BrandWall from "@/components/sections/brand-wall";
import HeroSnap from "@/components/sections/hero-snap";
import HeroSticky from "@/components/sections/hero-sticky";
import ServicesSlider from "@/components/sections/services-slider";
import ProductsParallax from "@/components/sections/products-parallax";
import ProductsRail from "@/components/sections/products-rail";

export default function Home() {
  return (
    <>
      <HeroSticky />
      <AboutSection />
      <ServicesSlider />
      <BrandWall />
      <ProductsRail />
      {/* other sections… */}
    </>
  );
}