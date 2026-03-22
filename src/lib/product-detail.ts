import { getSupabaseClient } from "@/src/lib/supabase";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  stock_status: string;
  featured: boolean;
  image_url: string;
  gallery_urls: string[];
  specs: ProductSpec[];
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function parseSpecs(value: unknown): ProductSpec[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }

      const label = (item as { label?: unknown }).label;
      const fieldValue = (item as { value?: unknown }).value;

      if (typeof label !== "string" || typeof fieldValue !== "string") {
        return null;
      }

      return { label, value: fieldValue };
    })
    .filter((item): item is ProductSpec => item !== null);
}

function normalizeProduct(row: Record<string, unknown>): ProductDetail {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? "Untitled Product"),
    category: String(row.category ?? "Rapid"),
    description: String(row.description ?? ""),
    stock_status: String(row.stock_status ?? "in_stock"),
    featured: Boolean(row.featured),
    image_url:
      typeof row.image_url === "string" && row.image_url.length > 0
        ? row.image_url
        : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    gallery_urls: parseStringArray(row.gallery_urls),
    specs: parseSpecs(row.specs),
  };
}

const DETAIL_SELECT =
  "id,slug,title,category,description,stock_status,featured,image_url,gallery_urls,specs";

export async function fetchProductBySlugDetail(slug: string): Promise<ProductDetail | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select(DETAIL_SELECT)
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeProduct(data as Record<string, unknown>);
}

export async function fetchRelatedProductsByCategory(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<ProductDetail[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(DETAIL_SELECT)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((row) => normalizeProduct(row as Record<string, unknown>));
}

export async function fetchAllProductSlugs(): Promise<Array<{ slug: string }>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("products").select("slug").limit(200);

  if (error || !data) {
    return [];
  }

  return data
    .map((row) => ({ slug: String((row as { slug?: unknown }).slug ?? "") }))
    .filter((row) => row.slug.length > 0);
}
