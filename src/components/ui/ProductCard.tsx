import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { StoreProduct } from "@/src/lib/products";
import { normalizeProductCategoryLabel } from "@/src/lib/product-category";
import Button from "@/src/components/ui/Button";

interface ProductCardProps {
  product: StoreProduct;
  showStockBadge?: boolean;
}

export default function ProductCard({
  product,
  showStockBadge = true,
}: ProductCardProps) {
  const categoryLabel = normalizeProductCategoryLabel(product.category);

  const specRows = [
    { key: "Category", value: product.category },
    { key: "Availability", value: product.stock_status },
    { key: "Configuration", value: "Made to measure" },
  ];

  return (
    <article className="home-highlight-card group flex cursor-pointer flex-col overflow-visible rounded-xl border border-gray-100/80 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        {showStockBadge ? (
          <div className="absolute left-3 top-3">
            <span className="rounded-sm border border-gray-200/80 bg-white/95 px-3 py-1 font-label text-text-primary backdrop-blur-sm">
              {product.stock_status}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 inline-flex w-fit rounded-full bg-brand-light px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-brand">
          {categoryLabel}
        </p>
        <h3 className="mb-4 font-headline text-lg font-bold leading-snug text-text-primary">{product.title}</h3>
        <dl className="mb-6 flex-1 space-y-2 border-t border-gray-100 pt-4 text-sm">
          {specRows.map((row) => (
            <div key={row.key} className="flex justify-between gap-4">
              <dt className="font-body text-text-muted">{row.key}</dt>
              <dd className="text-right font-body font-medium text-text-primary">{row.value}</dd>
            </div>
          ))}
        </dl>
        <Button
          href={`/enquiry?product=${encodeURIComponent(product.slug)}`}
          className="mt-auto w-full"
        >
          <span className="inline-flex items-center justify-center gap-2">
            Request Quote
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>
        </Button>
      </div>
    </article>
  );
}
