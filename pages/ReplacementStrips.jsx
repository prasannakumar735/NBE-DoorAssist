import ScrollReveal from "@/components/motion/ScrollReveal";
import StripProductCard from "@/components/strip/StripProductCard";
import { useCart } from "@/lib/CartContext";
import { REPLACEMENTS, getStripType } from "@/lib/data/stripCatalog";

export default function ReplacementStrips() {
  const { addItem, openCart } = useCart();

  const handleAdd = (item) => {
    addItem({ sku: item.sku, name: item.name, price: item.price }, 1);
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-line bg-surface-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <p className="text-brand text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4">Buy now</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink leading-[1.05] tracking-tight">
            Replacement Strips
          </h1>
          <p className="mt-5 text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
            Damaged or worn strips? Buy cut-to-length replacements by the metre and match them to your
            existing curtain type.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPLACEMENTS.map((item, i) => {
            const stripType = item.stripKey ? getStripType(item.stripKey) : null;
            return (
              <ScrollReveal key={item.sku} delay={Math.min(i * 0.05, 0.2)}>
                <StripProductCard
                  mode="buy"
                  sku={item.sku}
                  name={item.name}
                  price={item.price}
                  unit={item.unit}
                  swatch={stripType?.swatch}
                  onAddToCart={() => handleAdd(item)}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
