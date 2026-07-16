import { useMemo, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/Products/ProductCard";
import ProductFilters from "@/components/Products/ProductFilters";
import ScrollReveal from "@/components/motion/ScrollReveal";
import CTABanner from "@/components/home/CTABanner";
import { createPageUrl } from "@/utils";

export default function Products({
  products = [],
  isLoading = false,
  getProductDetailHref,
  getProductCtaHref,
  renderProductLink,
}) {
  const initialFilters = useMemo(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    const q = params.get("q") || params.get("search") || "";
    const category = params.get("category") || "all";
    const material = params.get("material") || "all";
    const stock = params.get("stock") || "all";
    const insulated = params.get("insulated") || "all";
    const sort = params.get("sort") || "featured";

    return { search: q, category, material, stock, insulated, sort };
  }, []);

  const [filters, setFilters] = useState(initialFilters);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s)
      );
    }
    if (filters.category !== "all") result = result.filter(p => p.category === filters.category);
    if (filters.material !== "all") result = result.filter(p => p.material === filters.material);
    if (filters.stock !== "all") result = result.filter(p => p.stock_status === filters.stock);
    if (filters.insulated === "yes") result = result.filter(p => p.insulated === true);
    if (filters.insulated === "no") result = result.filter(p => p.insulated === false);

    if (filters.sort === "newest") result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    if (filters.sort === "featured") result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (filters.sort === "title_az") result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
            <a href={createPageUrl("Home")} className="hover:text-brand">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink font-medium">Products</span>
          </nav>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
            Browse & compare
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink tracking-tight mb-2 font-heading">
            Industrial Door &amp; PVC Strip Curtain Products
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Explore rapid roller doors and PVC strip curtain solutions for industrial, cold storage, warehouse and food processing applications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/rapid-roller-doors"
            className="group relative rounded-2xl overflow-hidden bg-ink min-h-[180px] flex items-end p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative">
              <h2 className="text-xl font-bold text-white font-heading">Rapid Roller Doors</h2>
              <p className="text-white/75 text-sm mt-1">High-speed industrial doors for frequent access</p>
            </div>
          </a>
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, category: "pvc_strip_curtains" }))}
            className="group relative rounded-2xl overflow-hidden bg-ink min-h-[180px] flex items-end p-6 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative">
              <h2 className="text-xl font-bold text-white font-heading">PVC Strip Curtains</h2>
              <p className="text-white/75 text-sm mt-1">Flexible PVC separation for cool rooms &amp; warehouses</p>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductFilters filters={filters} onFilterChange={setFilters} resultCount={filtered.length} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-8 h-8 text-brand animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                  <ProductCard
                    product={product}
                    detailHref={typeof getProductDetailHref === "function" ? getProductDetailHref(product) : undefined}
                    ctaHref={typeof getProductCtaHref === "function" ? getProductCtaHref(product) : undefined}
                    renderLink={renderProductLink}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="text-on-surface-variant text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      <CTABanner />
    </div>
  );
}
