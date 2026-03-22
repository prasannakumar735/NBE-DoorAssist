"use client";

import { useState } from "react";
import EnquiryModal from "@/src/components/ui/EnquiryModal";
import Button from "@/src/components/ui/Button";

interface ProductEnquiryCTAProps {
  productSlug: string;
}

/** Full enquiry link plus optional quick modal (bonus UX). */
export default function ProductEnquiryCTA({ productSlug }: ProductEnquiryCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button
          href={`/enquiry?product=${encodeURIComponent(productSlug)}`}
          className="w-full min-w-[280px] px-10 py-5 text-lg sm:w-auto"
        >
          Request Quote
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(true)}
          className="px-2 py-1 text-sm underline-offset-4 hover:underline"
        >
          Quick enquiry
        </Button>
      </div>
      <EnquiryModal open={open} onClose={() => setOpen(false)} productSlug={productSlug} />
    </>
  );
}
