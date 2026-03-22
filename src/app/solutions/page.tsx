import type { Metadata } from "next";
import CTASection from "@/src/components/sections/CTASection";
import FeatureGrid from "@/src/components/sections/FeatureGrid";
import PageLayout from "@/src/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Solutions & cold storage | drooov",
  description: "Insulated and rapid cold-chain door systems for temperature-controlled facilities.",
};

const FEATURES = [
  {
    title: "Thermal performance",
    description: "Seals and curtain materials selected to reduce energy loss across high-cycle openings.",
    icon: "❄️",
  },
  {
    title: "Hygienic operation",
    description: "Smooth profiles and fast open/close behaviour suited to clean and cold-chain environments.",
    icon: "🧊",
  },
  {
    title: "Reliable uptime",
    description: "Industrial drives and safety systems engineered for continuous shifts and peak traffic.",
    icon: "⚙️",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageLayout
        title="Cold storage & solutions"
        description="Purpose-built rapid doors for cold rooms, distribution chillers, and controlled temperature logistics."
      >
        <FeatureGrid features={FEATURES} columns={3} />
      </PageLayout>
      <CTASection
        title="Discuss your cold-chain requirements"
        description="Share opening sizes, temperature targets, and traffic patterns — we’ll recommend suitable models and lead times."
        primaryLabel="Request Quote"
        secondaryHref="/products"
        secondaryLabel="Browse products"
      />
    </>
  );
}
