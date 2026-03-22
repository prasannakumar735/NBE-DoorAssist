import type { Metadata } from "next";
import PvcBuyingHelpPage from "@/components/pvc/PvcBuyingHelpPage";

export const metadata: Metadata = {
  title: "Help on buying PVC strip curtains | drooov",
  description:
    "Measure openings, choose compound and strip width, compare hardware, and understand quote-to-install lead times — practical guidance for industrial PVC curtains.",
};

export default function PvcBuyingHelpRoute() {
  return <PvcBuyingHelpPage />;
}
