"use client";

import Link from "next/link";
import { useEffect } from "react";
import Button from "@/src/components/ui/Button";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  productSlug?: string;
}

export default function EnquiryModal({ open, onClose, productSlug }: EnquiryModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const href = productSlug
    ? `/enquiry?product=${encodeURIComponent(productSlug)}`
    : "/enquiry";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 shadow-xl">
        <h2 className="font-headline text-xl font-bold text-text-primary">Request a quote</h2>
        <p className="mt-2 font-body text-sm text-text-muted">
          Continue to the enquiry form with your project details. Our team will respond with tailored options and lead
          times.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            href={href}
            className="w-full"
            onClick={onClose}
          >
            Request Quote
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
