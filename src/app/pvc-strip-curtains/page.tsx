import type { Metadata } from "next";
import PvcStripCurtainsHome from "@/components/pvc/PvcStripCurtainsHome";

export const metadata: Metadata = {
  title: "PVC strip curtains | drooov",
  description:
    "Industrial PVC strip curtains for climate separation, dust control, and traffic openings — polar and ribbed systems, measurement guidance, and quote-led supply.",
};

export default function PvcStripHubPage() {
  return <PvcStripCurtainsHome />;
}
