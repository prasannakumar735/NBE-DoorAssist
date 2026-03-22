import Image from "next/image";
import Link from "next/link";
import Button from "@/src/components/ui/Button";

interface Product {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  image_url: string;
  stock_status: string;
  featured?: boolean;
}

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  const validProducts = Array.isArray(products) ? products : [];
  const featured = validProducts.filter((p) => p.featured).slice(0, 6);
  const display = featured.length > 0 ? featured : validProducts.slice(0, 6);

  return (
    <div id="products" className="py-32 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-label text-secondary mb-3">Featured Range</p>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-text-primary">
              Best-Selling Door Systems
            </h2>
            <p className="text-text-muted mt-3 max-w-2xl">
              Commercial-grade rapid roller doors selected for high traffic, energy efficiency, and long-term reliability.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center text-sm text-secondary hover:text-primary transition-colors"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {display.map((product) => {
            const productSlug = product.slug ?? product.id;

            return (
              <article
                key={product.id}
                className="group bg-surface-container-lowest rounded-lg p-2 shadow-none hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted bg-surface-container">
                      No image
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="font-label text-text-primary px-3 py-1 rounded-sm bg-surface-container-lowest/95 border border-outline-variant/20 backdrop-blur-sm">
                      {product.stock_status || "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="p-3 pt-4">
                  <p className="mb-3 inline-flex w-fit rounded-full bg-brand-light px-3 py-1 font-label text-brand">
                    {product.category ?? "Rapid"}
                  </p>
                  <h3 className="text-lg font-headline font-semibold text-text-primary min-h-[2.75rem]">
                    {product.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-2 line-clamp-2">
                    High-performance rapid roller door system engineered for industrial applications.
                  </p>

                  <Button
                    href={`/enquiry?product=${productSlug}`}
                    className="mt-4 w-full py-2 text-sm"
                  >
                    Request Quote
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="mt-10 text-center md:hidden">
          <Button
            href="/products"
            className="h-11 px-6 font-medium"
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
}
