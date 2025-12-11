import AboutSection from "@/components/sections/about";
import BrandWall from "@/components/sections/brand-wall";
import HeroSticky from "@/components/sections/hero-sticky";
import ServicesSlider from "@/components/sections/services-slider";
import ProductsShowcaseSection from "@/components/sections/mainpage-products";
import ContactCTA from "@/components/sections/contact-cta";


export default function Home() {
  return (
    <>
      <HeroSticky />
      <AboutSection />
      <ServicesSlider />
      <ProductsShowcaseSection />
      <BrandWall />
      <ContactCTA />
      {/* other sections… */}
    </>
  );
}