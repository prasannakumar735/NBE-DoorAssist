import { useMemo, useState } from "react";
import { Loader2, Ruler } from "lucide-react";
import ProductCard from "@/components/Products/ProductCard";
import CatalogFilters from "@/components/Products/CatalogFilters";
import ProductFilters from "@/components/Products/ProductFilters";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SizeCalculatorModal from "@/components/door/SizeCalculatorModal";
import { Button } from "@/components/ui/button";
import { sectorMatches, performanceMatches } from "@/lib/productFilterUtils";

function CatalogHeroTitle() {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 leading-[1.1] tracking-tight">
      <span>Rapid Roller </span>
      <span className="relative inline-block">
        <span className="relative z-10">Door Range</span>
        <svg
          className="absolute left-0 right-0 -bottom-0.5 h-[0.5em] w-[105%] -translate-x-[2.5%] text-orange-500 pointer-events-none"
          viewBox="0 0 280 14"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M4 10 C 70 4, 140 14, 210 8 S 270 6, 276 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </span>
    </h1>
  );
}

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
    const insulated = params.get("insulated") || "all";
    const sort = params.get("sort") || "featured";

    return {
      search: q,
      category,
      material,
      insulated,
      sort,
      sector: "all",
      performance: "all",
    };
  }, []);

  const [filters, setFilters] = useState(initialFilters);
  const [sizeCalcOpen, setSizeCalcOpen] = useState(false);
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.sku?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }
    if (filters.category !== "all") result = result.filter((p) => p.category === filters.category);
    if (filters.material !== "all") result = result.filter((p) => p.material === filters.material);
    if (filters.insulated === "yes") result = result.filter((p) => p.insulated === true);
    if (filters.insulated === "no") result = result.filter((p) => p.insulated === false);

    result = result.filter((p) => sectorMatches(filters.sector, p));
    result = result.filter((p) => performanceMatches(filters.performance, p));

    if (filters.sort === "newest")
      result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    if (filters.sort === "featured")
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (filters.sort === "title_az")
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <p className="text-orange-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4">
            Browse &amp; compare
          </p>
          <CatalogHeroTitle />
          <p className="mt-6 text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            High-cycle rapid roller and industrial doors for logistics, cold chain, and high-traffic
            openings — filter by sector and performance, then open a product for full specifications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSizeCalcOpen(true)}
              className="rounded-lg border-orange-500/50 text-orange-600 hover:bg-orange-50 gap-2 font-semibold"
            >
              <Ruler className="w-4 h-4" />
              Size calculator — 3D preview
            </Button>
          </div>
        </div>
      </div>

      <SizeCalculatorModal open={sizeCalcOpen} onClose={() => setSizeCalcOpen(false)} product={null} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-12">
        <CatalogFilters
          filters={filters}
          onFilterChange={setFilters}
          onOpenMoreFilters={() => setShowExtraFilters((v) => !v)}
          resultCount={filtered.length}
        />

        {showExtraFilters && (
          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              More filters
            </p>
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filtered.length}
              showResultCount={false}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={Math.min(i * 0.04, 0.24)}>
                <ProductCard
                  product={product}
                  detailHref={typeof getProductDetailHref === "function" ? getProductDetailHref(product) : undefined}
                  ctaHref={typeof getProductCtaHref === "function" ? getProductCtaHref(product) : undefined}
                  renderLink={renderProductLink}
                  catalogMode
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 mt-10 rounded-xl border border-dashed border-slate-200 bg-slate-50/80">
            <p className="text-slate-600 text-lg font-medium">No products match these filters.</p>
            <p className="text-slate-500 text-sm mt-2">Try another sector or use “Filter” to adjust search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
