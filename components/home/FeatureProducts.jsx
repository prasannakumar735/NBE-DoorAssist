import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProductCard from "@/components/Products/ProductCard";

/** Product grid — use embedded on home strip shop; full section elsewhere. */
export default function FeaturedProducts({ products = [], embedded = false }) {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const display = featured.length > 0 ? featured : products.slice(0, 6);

  const grid = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.1}>
            <ProductCard
              product={product}
              catalogMode
              showPrice={product.category === "pvc_strip_curtains"}
              detailHref={createPageUrl(`ProductDetail?id=${product.id}`)}
              ctaHref={
                product.category === "pvc_strip_curtains"
                  ? createPageUrl("StripShop")
                  : product.is_part
                    ? createPageUrl(`ProductDetail?id=${product.id}`)
                    : createPageUrl(`Quote?product=${product.id}`)
              }
              ctaLabel={product.category === "pvc_strip_curtains" ? "Buy / size kit" : undefined}
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
        <div className="text-center py-20 text-slate-500">Browse the full catalogue for kits, rolls and hardware.</div>
      )}
    </>
  );

  if (embedded) return grid;

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-brand" />
                <span className="text-brand text-sm font-semibold tracking-widest uppercase">Online strip shop</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink [font-family:var(--font-heading)]">
                PVC strip curtain kits
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                Standard, freezer and heavy-duty kits with online sizing — Australia-wide dispatch.
              </p>
            </div>
            <a href={createPageUrl("Products?category=pvc_strip_curtains")} className="hidden md:block">
              <Button variant="ghost" className="text-slate-600 hover:text-ink group">
                View all
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </ScrollReveal>

        {grid}

        <div className="mt-10 text-center md:hidden">
          <a href={createPageUrl("Products?category=pvc_strip_curtains")}>
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-white">
              View all kits
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
