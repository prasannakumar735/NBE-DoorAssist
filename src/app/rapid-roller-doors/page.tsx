import type { Metadata } from "next";
import RapidRollerHubLanding from "@/components/rapid/RapidRollerHubLanding";

export const metadata: Metadata = {
  title: "Rapid roller doors | drooov",
  description:
    "High-speed industrial rapid roller doors for warehouses, logistics and cold storage — engineered for Australian sites. Request a quote.",
};

export default function RapidRollerHubPage() {
  return <RapidRollerHubLanding />;
}
