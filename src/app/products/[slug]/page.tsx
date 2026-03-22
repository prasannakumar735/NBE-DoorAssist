import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import ProductCard from "@/src/components/ui/ProductCard";
import { getSupabaseClient } from "@/src/lib/supabase";
import type { StoreProduct } from "@/src/lib/products";

export const revalidate = 300;

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  short_description: string;
  stock_status: string;
  hero_image: string;
  image_url: string;
  gallery_urls: string[];
  features: string[];
  applications: string[];
  specs: ProductSpec[];
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function parseSpecs(value: unknown): ProductSpec[] {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.entries(value)
      .map(([label, rawValue]) => {
        if (typeof rawValue === "string" || typeof rawValue === "number" || typeof rawValue === "boolean") {
          return { label, value: String(rawValue) };
        }

        return null;
      })
      .filter((item): item is ProductSpec => item !== null);
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }

      const label = (item as { label?: unknown }).label;
      const specValue = (item as { value?: unknown }).value;

      if (typeof label !== "string" || typeof specValue !== "string") {
        return null;
      }

      return { label, value: specValue };
    })
    .filter((item): item is ProductSpec => item !== null);
}

function normalizeProduct(row: Record<string, unknown>): Product {
  const imageUrl =
    typeof row.image_url === "string" && row.image_url.length > 0
      ? row.image_url
      : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80";

  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? "Untitled Product"),
    category: String(row.category ?? "Rapid"),
    description: String(row.description ?? ""),
    short_description: String(row.short_description ?? ""),
    stock_status: String(row.stock_status ?? "In Stock"),
    hero_image:
      typeof row.hero_image === "string" && row.hero_image.length > 0 ? row.hero_image : imageUrl,
    image_url: imageUrl,
    gallery_urls: parseStringArray(row.gallery_urls),
    features: parseStringArray(row.features),
    applications: parseStringArray(row.applications),
    specs: parseSpecs(row.specs),
  };
}

const DETAIL_SELECT =
  "id,slug,title,category,description,short_description,stock_status,hero_image,image_url,gallery_urls,features,applications,specs";
const BASIC_SELECT = "id,slug,title,category";

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const detailResult = await supabase
    .from("products")
    .select(DETAIL_SELECT)
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (!detailResult.error && detailResult.data) {
    return normalizeProduct(detailResult.data as Record<string, unknown>);
  }

  const { data, error } = await supabase
    .from("products")
    .select(BASIC_SELECT)
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeProduct(data as Record<string, unknown>);
}

async function fetchRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const detailResult = await supabase
    .from("products")
    .select(DETAIL_SELECT)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(3);

  if (!detailResult.error && detailResult.data) {
    return detailResult.data.map((row) => normalizeProduct(row as Record<string, unknown>));
  }

  const { data, error } = await supabase
    .from("products")
    .select(BASIC_SELECT)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(3);

  if (error || !data) {
    return [];
  }

  return data.map((row) => normalizeProduct(row as Record<string, unknown>));
}

function productToStoreProduct(p: Product): StoreProduct {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: 0,
    price_type: "from",
    image_url: p.image_url,
    stock_status: p.stock_status,
    featured: false,
    category: p.category,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-8 pb-16 pt-24">
          <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low p-8">
            <h1 className="font-headline text-3xl font-bold text-text-primary">Product not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const relatedProducts = await fetchRelatedProducts(product.category, product.slug);
  const hasSpecs = product.specs.length > 0;
  const hasGallery = product.gallery_urls.length > 0;
  const hasFeatures = product.features.length > 0;
  const hasApplications = product.applications.length > 0;
  const shortDescription =
    product.short_description ||
    product.description ||
    "Industrial-grade rapid door solution tailored for high-cycle environments.";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-8 pb-24 pt-10 md:pt-14">
        <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-brand">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary">{product.title}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand-light px-3 py-1 font-label text-brand">
              {product.category}
            </span>
            <span className="inline-flex items-center rounded-full border border-outline-variant/50 bg-surface-container-low px-3 py-1 font-label text-text-muted">
              {product.stock_status.replace(/_/g, " ")}
            </span>
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            {product.title}
          </h1>
          {product.short_description ? (
            <p className="mt-4 max-w-3xl font-body text-lg text-text-muted">{product.short_description}</p>
          ) : null}
        </header>

        <div className="mb-14">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              unoptimized
            />
          </div>

          {hasGallery ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {product.gallery_urls.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-outline-variant/40"
                >
                  <Image
                    src={url}
                    alt={`${product.title} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <section className="mb-16 border-t border-outline-variant/25 pt-12">
          <h2 className="mb-4 font-headline text-2xl font-bold text-text-primary">Description</h2>
          <p className="max-w-3xl whitespace-pre-line font-body leading-relaxed text-text-muted">
            {product.description || shortDescription}
          </p>
        </section>

        {hasFeatures ? (
          <section className="mb-16 border-t border-outline-variant/25 pt-12">
            <h2 className="mb-6 font-headline text-2xl font-bold text-text-primary">Key features</h2>
            <ul className="max-w-2xl space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-body text-text-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {hasSpecs ? (
          <section className="mb-16 border-t border-outline-variant/25 pt-12">
            <h2 className="mb-6 font-headline text-2xl font-bold text-text-primary">Specifications</h2>
            <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest">
              <table className="w-full text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr
                      key={`${spec.label}-${spec.value}`}
                      className="border-b border-outline-variant/30 last:border-b-0 odd:bg-surface-container-low/40"
                    >
                      <th className="w-2/5 px-4 py-3 font-body font-medium text-text-muted">{spec.label}</th>
                      <td className="px-4 py-3 font-body font-medium text-text-primary">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {hasApplications ? (
          <section className="mb-16 border-t border-outline-variant/25 pt-12">
            <h2 className="mb-6 font-headline text-2xl font-bold text-text-primary">Applications</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.applications.map((application) => (
                <article
                  key={application}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-text-primary"
                >
                  {application}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="border-t border-outline-variant/25 pt-12">
          <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low px-8 py-10 text-center md:px-12 md:py-12">
            <h2 className="font-headline text-xl font-bold text-text-primary md:text-2xl">Request a quote</h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-text-muted">
              Tell us about your opening sizes and site requirements — we&apos;ll respond with tailored options and lead
              times.
            </p>
            <Button
              href={`/enquiry?product=${encodeURIComponent(product.slug)}`}
              className="mt-8 min-w-[220px] px-8 py-4 text-base"
            >
              Request Quote
            </Button>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="mt-20 border-t border-outline-variant/25 pt-16">
            <h2 className="mb-8 font-headline text-2xl font-bold text-text-primary">Related products</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={productToStoreProduct(related)} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
