import ScrollReveal from "@/components/motion/ScrollReveal";
import QuoteForm from "@/components/quote/QuoteForm";
import { Clock, ShieldCheck, Wrench } from "lucide-react";

export default function Quote({ product, productId = "", prefill, uploadFile, submitEnquiry }) {

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <ScrollReveal>
            <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get a Custom Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4 font-heading">
              Let's Build Your Solution
            </h1>
            <p className="text-slate-700 text-lg max-w-2xl mx-auto">
              Tell us what you need (PVC strip curtains or rapid roller doors) and we’ll provide a detailed quote within 24 hours. No obligation, fully customised to your site.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ScrollReveal className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <QuoteForm
                productTitle={product?.title || ""}
                productId={productId || ""}
                initialMessage={prefill?.message || ""}
                uploadFile={uploadFile}
                submitEnquiry={submitEnquiry}
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <ScrollReveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-ink font-bold text-lg tracking-tight">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold">
                      1
                    </span>
                    <span>We review your sizes, site details and preferred product family.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold">
                      2
                    </span>
                    <span>We recommend options and confirm lead times.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-semibold">
                      3
                    </span>
                    <span>You get a clear itemised quote — with delivery and install partner options where needed.</span>
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
                  <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-brand" />
                      <div className="text-slate-900 font-semibold">{item.title}</div>
                    </div>
                    <div className="text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</div>
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