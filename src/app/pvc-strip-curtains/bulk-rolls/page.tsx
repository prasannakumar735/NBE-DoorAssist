import type { Metadata } from "next";
import BulkRollsPage from "@/components/pvc/BulkRollsPage";
import { BULK_INDUSTRIES } from "@/lib/pvc-strip-catalog";

export const metadata: Metadata = {
  title: "Buy bulk rolls | PVC strip curtains | drooov",
  description:
    "Engineered PVC bulk roll supply — grades, volume bands, and logistics on enquiry. Australia-wide.",
};

export default function PvcBulkRollsRoute() {
  return <BulkRollsPage industries={BULK_INDUSTRIES} />;
}
