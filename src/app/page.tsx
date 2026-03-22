import type { Metadata } from "next";
import Hero from "@/src/components/sections/Hero";
import HomeMainSections from "@/src/components/sections/HomeMainSections";
import HomeProductTypeCards from "@/src/components/sections/HomeProductTypeCards";

export const metadata: Metadata = {
  title: "drooov | Premium Rapid Roller Doors Australia",
  description:
    "Industrial rapid roller doors, high-speed doors, and insulated door systems with nationwide support across Australia.",
  openGraph: {
    title: "drooov | Premium Rapid Roller Doors Australia",
    description:
      "Explore rapid, high-speed, and insulated industrial door systems with nationwide support and installation.",
    type: "website",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <HomeProductTypeCards />
      <HomeMainSections />
    </div>
  );
}
