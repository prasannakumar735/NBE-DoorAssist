import ScrollReveal from "@/components/motion/ScrollReveal";

const items = [
  { kicker: "Rolls & hardware", value: "Buy now", label: "Fixed price, add to cart" },
  { kicker: "Custom & kits", value: "Free quote", label: "Reply by email within 24 hours" },
  { kicker: "Delivery", value: "AU-wide", label: "Free freight over $300" },
];

export default function ProductionTrustBar() {
  return (
    <section className="py-14 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {items.map((item) => (
              <div key={item.kicker} className="text-center md:text-left border-t border-white/10 md:border-0 pt-8 md:pt-0">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">{item.kicker}</div>
                <div className="mt-2 text-4xl md:text-5xl font-heading font-bold text-white">{item.value}</div>
                <div className="mt-1 text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
