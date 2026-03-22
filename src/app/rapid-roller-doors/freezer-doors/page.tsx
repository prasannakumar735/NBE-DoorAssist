import type { Metadata } from "next";
import FreezerDoorsLanding from "@/components/rapid/FreezerDoorsLanding";

export const metadata: Metadata = {
  title: "Freezer doors & cold chain | Rapid roller | drooov",
  description:
    "Insulated rapid freezer doors, thermal containment, and complementary PVC strip options for Australian cold-chain and food plants.",
};

export default function FreezerDoorsPage() {
  return <FreezerDoorsLanding />;
}
