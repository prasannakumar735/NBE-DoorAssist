import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";
import SupportSection from "@/components/home/SupportSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
  });

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={products} />
      <HowItWorks />
      <TrustSection />
      <SupportSection />
      <CTABanner />
    </>
  );
}
