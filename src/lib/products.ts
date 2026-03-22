import { getSupabaseClient } from "@/lib/supabase";

export interface StoreProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  price_type: string;
  image_url: string;
  stock_status: string;
  featured: boolean;
  category: string;
}

const FALLBACK_PRODUCTS: StoreProduct[] = [
  {
    id: "hs-door-001",
    slug: "high-speed-rapid-roller-door-industrial-grade",
    title: "High-Speed Rapid Roller Door - Industrial Grade",
    price: 4500,
    price_type: "from",
    image_url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop",
    stock_status: "In Stock",
    featured: true,
    category: "Rapid Roller Doors",
  },
  {
    id: "hs-door-002",
    slug: "ambient-cold-chain-roller-door-insulated",
    title: "Ambient Cold Chain Roller Door - Insulated",
    price: 5800,
    price_type: "from",
    image_url: "https://images.unsplash.com/photo-1585534321671-e4c8cc1f9aa1?w=500&h=400&fit=crop",
    stock_status: "In Stock",
    featured: true,
    category: "Cold Storage Doors",
  },
  {
    id: "hs-door-003",
    slug: "heavy-duty-commercial-rapid-door-quick-response",
    title: "Heavy-Duty Commercial Rapid Door - Quick Response",
    price: 3200,
    price_type: "from",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    stock_status: "Limited",
    featured: true,
    category: "Commercial Doors",
  },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function normalizeProduct(row: Record<string, unknown>): StoreProduct {
  const title = (row.title as string) ?? "Untitled Product";
  const id = String(row.id ?? title);
  const rawSlug = row.slug as string | undefined;

  return {
    id,
    slug: rawSlug && rawSlug.length > 0 ? rawSlug : slugify(title),
    title,
    price: Number(row.price ?? 0),
    price_type: (row.price_type as string) ?? "from",
    image_url:
      (row.image_url as string) ??
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop",
    stock_status: (row.stock_status as string) ?? "In Stock",
    featured: Boolean(row.featured),
    category: (row.category as string) ?? "Rapid Roller Doors",
  };
}

async function fetchFromTable(tableName: "products" | "Product"): Promise<StoreProduct[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(tableName)
    .select("id,title,slug,image_url,stock_status,featured,category")
    .limit(100);

  if (error || !data) {
    return [];
  }

  return data.map((row) => normalizeProduct(row as Record<string, unknown>));
}

/** Listing-only fields (no price) — used on /products grid */
export interface ProductListingItem {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  category: string;
  created_at?: string | null;
}

const LISTING_SELECT = "id,slug,title,image_url,category,created_at";

function normalizeListingRow(row: Record<string, unknown>): ProductListingItem {
  const title = (row.title as string) ?? "Untitled Product";
  const id = String(row.id ?? title);
  const rawSlug = row.slug as string | undefined;
  const image =
    (row.image_url as string) ??
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop";
  const createdAt = row.created_at != null ? String(row.created_at) : null;

  return {
    id,
    slug: rawSlug && rawSlug.length > 0 ? rawSlug : slugify(title),
    title,
    image_url: image,
    category: (row.category as string) ?? "Rapid Roller Doors",
    created_at: createdAt,
  };
}

async function fetchListingFromTable(tableName: "products" | "Product"): Promise<ProductListingItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from(tableName).select(LISTING_SELECT).limit(100);

  if (error || !data) {
    return [];
  }

  return data.map((row) => normalizeListingRow(row as Record<string, unknown>));
}

/** Supabase: id, slug, title, image_url, category only — no price */
export async function fetchProductsListing(): Promise<ProductListingItem[]> {
  const products = await fetchListingFromTable("products");
  if (products.length > 0) {
    return products;
  }

  const legacy = await fetchListingFromTable("Product");
  if (legacy.length > 0) {
    return legacy;
  }

  return FALLBACK_PRODUCTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image_url: p.image_url,
    category: p.category,
    created_at: null,
  }));
}

export async function fetchProducts(): Promise<StoreProduct[]> {
  const products = await fetchFromTable("products");
  if (products.length > 0) {
    return products;
  }

  const legacyProducts = await fetchFromTable("Product");
  if (legacyProducts.length > 0) {
    return legacyProducts;
  }

  return FALLBACK_PRODUCTS;
}

export async function fetchProductBySlug(slug: string): Promise<StoreProduct | null> {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug) ?? null;
}