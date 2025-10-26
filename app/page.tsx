import AboutSection from "@/components/sections/about";
import BrandWall from "@/components/sections/brand-wall";
import HeroSticky from "@/components/sections/hero-sticky";
import ServicesSlider from "@/components/sections/services-slider";
import ProductsShowcase from "@/components/sections/products-rail";
import ContactCTA from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <HeroSticky />
      <AboutSection />
      <ServicesSlider />
      <ProductsShowcase />
      <BrandWall />
      <ContactCTA />
      {/* other sections… */}
    </>
  );
}