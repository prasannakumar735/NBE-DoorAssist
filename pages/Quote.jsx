import ScrollReveal from "@/components/motion/ScrollReveal";
import QuoteForm from "@/components/quote/QuoteForm";
import { Clock, ShieldCheck, Wrench } from "lucide-react";

export default function Quote({ prefill = {}, context = "" }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-white border-b border-line">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <ScrollReveal>
            <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get a Custom Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight mb-4">
              Let&apos;s build your solution
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              Tell us what you need — PVC strip curtains or rapid roller doors — and we&apos;ll reply by email
              within 24 hours with pricing. No obligation, fully customised to your site.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ScrollReveal>
            <div className="lg:col-span-7 bg-white border border-line rounded-2xl p-6 md:p-8 shadow-sm">
              <QuoteForm prefill={prefill} context={context} />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <ScrollReveal>
              <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
                <h2 className="text-ink font-heading font-bold text-lg tracking-tight">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm text-on-surface">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold shrink-0">
                      1
                    </span>
                    <span>We review your sizes, site details and preferred product family.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold shrink-0">
                      2
                    </span>
                    <span>We recommend options and confirm lead times.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold shrink-0">
                      3
                    </span>
                    <span>You get a clear itemised quote by email — with delivery options where needed.</span>
                  </li>
                </ol>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {[
                  { icon: Clock, title: "24hr response", desc: "Most quotes returned within 1 business day." },
                  { icon: ShieldCheck, title: "No spam", desc: "Your details are used only for this enquiry." },
                  { icon: Wrench, title: "Built to spec", desc: "Made-to-measure for industrial use." },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-line rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-brand" />
                      <div className="text-ink font-semibold">{item.title}</div>
                    </div>
                    <div className="text-sm text-on-surface-variant mt-2 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
