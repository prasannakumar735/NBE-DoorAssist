import type { Metadata } from "next";
import ContactQuotePage from "@/components/forms/ContactQuotePage";

export const metadata: Metadata = {
  title: "Contact & quote | drooov",
  description:
    "Request a technical quote for rapid roller doors or PVC strip curtains — project dimensions, site conditions, and engineering notes in one enquiry.",
};

export default function ContactPage() {
  return <ContactQuotePage />;
}
