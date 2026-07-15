import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { FINDER_OPTIONS } from "@/lib/productFinder";

export default function ProductFinder() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = FINDER_OPTIONS.find((o) => o.id === selectedId);

  const viewHref = selected
    ? createPageUrl(`Products?category=${selected.recommendations[0].categoryId}`)
    : createPageUrl("Products");

  return (
    <section className="py-20 md:py-28 bg-surface-low">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Find the Right Solution for Your Application
          </h2>
          <p className="mt-4 text-on-surface-variant text-lg max-w-2xl mx-auto">
            Tell us about your operating environment and explore products that may suit your requirements.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
            What are you looking to manage?
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {FINDER_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedId === option.id
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-ink border-line hover:border-brand/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {selected && (
          <ScrollReveal delay={0.05}>
            <div className="mt-10 bg-white border border-line rounded-2xl p-8 text-left max-w-xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand mb-4">Recommended</p>
              <div className="space-y-3">
                {selected.recommendations.map((rec) => (
                  <div key={rec.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand" />
                    </span>
                    <span className="text-ink font-medium">{rec.name}</span>
                  </div>
                ))}
              </div>
              <a
                href={viewHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brandDark"
              >
                View Recommended Products
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
