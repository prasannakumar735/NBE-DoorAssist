import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/home/HeroSection";
import CoreCategories from "@/components/home/CoreCategories";
import ProductFinder from "@/components/home/ProductFinder";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import IndustriesWeServe from "@/components/home/IndustriesWeServe";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CaseStudySection from "@/components/home/CaseStudySection";
import SupportSection from "@/components/home/SupportSection";
import TrustSection from "@/components/home/TrustSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
  });

  return (
    <>
      <HeroSection />
      <CoreCategories />
      <ProductFinder />
      <WhyChooseUs />
      <IndustriesWeServe />
      <FeaturedProducts products={products} />
      <CaseStudySection />
      <SupportSection />
      <TrustSection />
      <CTABanner />
    </>
  );
}
