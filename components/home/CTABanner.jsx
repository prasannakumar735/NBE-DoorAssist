import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "../motion/ScrollReveal";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-brandDark via-brand to-brandDark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 10px)',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight font-heading">
            Ready to Upgrade Your Facility?
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-2xl mx-auto">
            Get a custom quote for your industrial rapid roller doors today. Free consultation, competitive pricing, Australia-wide delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={createPageUrl("Quote")}>
              <Button size="lg" className="bg-white text-brand hover:bg-surface-low px-10 py-6 text-base font-bold rounded-xl group">
                Get My Custom Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={createPageUrl("Products")}>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-10 py-6 text-base font-bold rounded-xl">
                Browse Products
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}