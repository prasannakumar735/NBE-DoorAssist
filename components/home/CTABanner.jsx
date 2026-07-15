import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "../motion/ScrollReveal";

export default function CTABanner() {
  return (
    <section className="bg-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <ScrollReveal direction="left">
          <div className="px-6 lg:px-12 py-16 md:py-20 text-center md:text-left h-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading">
              Need a Rapid Roller Door?
            </h2>
            <p className="text-white/70 mt-3 mb-8 max-w-md mx-auto md:mx-0">
              Tell us about your facility and operating requirements.
            </p>
            <a href={createPageUrl("Quote")} className="mx-auto md:mx-0">
              <Button size="lg" className="bg-brand hover:bg-brandDark text-white px-8 py-6 text-base font-bold rounded-xl group">
                Request a Rapid Door Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="px-6 lg:px-12 py-16 md:py-20 text-center md:text-left h-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading">
              Need PVC Strip Curtains?
            </h2>
            <p className="text-white/70 mt-3 mb-8 max-w-md mx-auto md:mx-0">
              Enter your opening dimensions and application details.
            </p>
            <a href="/quote-builder" className="mx-auto md:mx-0">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-bold rounded-xl group">
                Configure PVC Curtain
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}