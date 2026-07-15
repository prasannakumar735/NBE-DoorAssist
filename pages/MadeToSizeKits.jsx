import ScrollReveal from "@/components/motion/ScrollReveal";
import StripProductCard from "@/components/strip/StripProductCard";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import { KITS, getStripType } from "@/lib/data/stripCatalog";

export default function MadeToSizeKits() {
  const { openQuoteModal } = useQuoteModal();

  const handleEnquire = (kit, stripType) => {
    openQuoteModal({
      item: `${kit.name} (${kit.sku})`,
      message: `Kit: ${kit.name}\nSize: ${kit.widthMm} x ${kit.dropMm}mm\nDefault strip type: ${stripType.name}`,
      context: "made-to-size-kits",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-line bg-surface-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <p className="text-brand text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4">Ready to ship</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink leading-[1.05] tracking-tight">
            Made-to-Size Kits
          </h1>
          <p className="mt-5 text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
            Pre-cut kits for the most common doorway sizes. Final cost depends on strip type, hardware and
            delivery zone, so these are quoted by email rather than priced online.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KITS.map((kit, i) => {
            const stripType = getStripType(kit.defaultStripKey);
            return (
              <ScrollReveal key={kit.sku} delay={Math.min(i * 0.05, 0.2)}>
                <StripProductCard
                  mode="quote"
                  sku={kit.sku}
                  name={kit.name}
                  description={kit.description}
                  swatch={stripType.swatch}
                  meta={`${kit.widthMm}mm wide × ${kit.dropMm}mm drop · ${stripType.shortName}`}
                  onEnquire={() => handleEnquire(kit, stripType)}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
