import Image from "next/image";
import Link from "next/link";
import type { ProductDetail } from "@/src/lib/product-detail";
import Button from "@/src/components/ui/Button";

interface RelatedProductsProps {
  products: ProductDetail[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-headline font-bold text-text-primary mb-6">Related Products</h2>

      {products.length === 0 ? (
        <p className="text-text-muted">No related products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="group bg-surface-container-lowest rounded-lg p-2 shadow-none hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <p className="mb-2 inline-flex w-fit rounded-full bg-brand-light px-3 py-1 font-label text-brand">
                  {product.category}
                </p>
                <h3 className="text-text-primary font-headline font-semibold">{product.title}</h3>
                <p className="text-sm text-text-muted mt-1">{product.stock_status}</p>
                <Button
                  href={`/enquiry?product=${product.slug}`}
                  className="mt-4 w-full py-2 text-sm"
                >
                  Request Quote
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
