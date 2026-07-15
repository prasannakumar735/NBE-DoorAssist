import { useMemo, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "../motion/ScrollReveal";
import ProductCard from "../products/ProductCard";

const TABS = [
  { id: "all", label: "All", category: null },
  { id: "rapid_roller", label: "Rapid Roller Doors", category: "rapid_roller" },
  { id: "pvc_strip_curtains", label: "PVC Strip Curtains", category: "pvc_strip_curtains" },
];

export default function FeaturedProducts({ products = [] }) {
  const [tab, setTab] = useState("all");
  const activeCategory = TABS.find((t) => t.id === tab)?.category;

  const display = useMemo(() => {
    const scoped = activeCategory ? products.filter((p) => p.category === activeCategory) : products;
    const featured = scoped.filter((p) => p.featured).slice(0, 6);
    return (featured.length > 0 ? featured : scoped).slice(0, 6);
  }, [products, activeCategory]);

  return (
    <section className="py-24 bg-paper relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-brand" />
                <span className="text-brand text-sm font-semibold tracking-widest uppercase">
                  Featured Products
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink font-heading">
                Popular Industrial Solutions
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base mt-3 max-w-xl">
                Rapid roller doors and PVC strip curtains engineered for busy Australian sites.
              </p>
            </div>
            <a href={createPageUrl("Products")} className="hidden md:block">
              <Button variant="ghost" className="text-on-surface-variant hover:text-ink group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  tab === t.id
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-ink border-line hover:border-brand/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard
                product={product}
                detailHref={createPageUrl(`ProductDetail?id=${product.id}`)}
                ctaHref={product.is_part ? createPageUrl(`ProductDetail?id=${product.id}`) : createPageUrl(`Quote?product=${product.id}`)}
                renderLink={({ href, className, children }) => (
                  <a href={href} className={className}>
                    {children}
                  </a>
                )}
              />
            </ScrollReveal>
          ))}
        </div>

        {display.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            No products found in this category yet.
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <a href={createPageUrl("Products")}>
            <Button variant="outline" className="border-line text-ink hover:bg-surface-low">
              View All Products
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}