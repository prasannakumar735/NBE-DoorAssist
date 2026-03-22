import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";
import SupportSection from "@/components/home/SupportSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home({ products = [] }) {
  return (
    <div className="bg-slate-950">
      <HeroSection />
      <FeaturedProducts products={products} />
      <HowItWorks />
      <TrustSection />
      <SupportSection />
      <CTABanner />
    </div>
  );
}