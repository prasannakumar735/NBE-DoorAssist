import ProductCard from "@/src/components/ui/ProductCard";
import SectionHeader from "@/src/components/ui/SectionHeader";
import type { StoreProduct } from "@/src/lib/products";

interface ProductGridProps {
  products: StoreProduct[];
  limit?: number;
}

export default function ProductGrid({ products, limit = 6 }: ProductGridProps) {
  const list = products.slice(0, limit);

  if (list.length === 0) {
    return (
      <section className="border-t border-gray-100 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-8 text-center font-body text-text-muted">
          No products available. Please check back soon.
        </div>
      </section>
    );
  }

  return (
    <section id="catalogue-products" className="border-t border-gray-100 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <SectionHeader
          align="center"
          title="Browse products"
          subtitle="Commercial-grade systems from our live catalogue — specifications and availability confirmed on enquiry."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
