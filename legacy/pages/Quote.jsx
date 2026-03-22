import ScrollReveal from "@/components/motion/ScrollReveal";
import QuoteForm from "@/components/quote/QuoteForm";

export default function Quote({ product, productId = "", uploadFile, submitEnquiry }) {

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <ScrollReveal>
            <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get a Custom Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Let's Build Your Solution
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Tell us about your project and we'll provide a detailed quote within 24 hours. No obligation, fully customised to your facility.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
            <QuoteForm
              productTitle={product?.title || ""}
              productId={productId || ""}
              uploadFile={uploadFile}
              submitEnquiry={submitEnquiry}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}