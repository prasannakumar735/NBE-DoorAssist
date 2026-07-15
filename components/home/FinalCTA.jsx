import { Link } from "react-router-dom";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { useQuoteModal } from "@/lib/QuoteModalContext";

export default function FinalCTA() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-20 md:py-28 bg-neutral-950 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 40px, rgba(224,103,15,0.15) 40px 44px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-brand text-xs font-bold tracking-[0.25em] uppercase">Australia-wide strip doors</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-heading font-bold tracking-tight max-w-3xl">
            Ready to seal your opening?
          </h2>
          <p className="mt-5 text-slate-300 text-lg max-w-xl leading-relaxed">
            Build a custom curtain and get a same-day email quote, or shop rolls and hardware online now.
            Rapid roller doors available when strip curtains aren&apos;t enough.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/custom-curtain-builder"
              className="inline-flex px-10 py-5 bg-brand text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-neutral-900 transition-colors rounded-md"
            >
              Build a custom curtain
            </Link>
            <button
              type="button"
              onClick={() => openQuoteModal({ context: "home-final-cta" })}
              className="inline-flex px-10 py-5 border border-white/40 font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors rounded-md"
            >
              Request a quote
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
