import AboutSection from "@/components/sections/about";
import BrandWall from "@/components/sections/brand-wall";
import HeroSticky from "@/components/sections/hero-sticky";
import ServicesSlider from "@/components/sections/services-slider";
import ProductsShowcaseSection from "@/components/sections/mainpage-products";
import ContactCTA from "@/components/sections/contact-cta";
import Showroom2DHomeSection from "@/components/sections/showroom-2d-home";


export default function Home() {
  return (
    <>
      <HeroSticky />
      <AboutSection />
      <ServicesSlider />
      <ProductsShowcaseSection />
      <BrandWall />
      <Showroom2DHomeSection />
      <ContactCTA />
    </>
  );
}