"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactElement } from "react";

type Product = {
  id: string;
  title: string;
  sku?: string;
  description?: string;
  category?: string;
  material?: string;
  insulated?: boolean;
  featured?: boolean;
  price?: number;
  created_date?: string;
  image_url?: string;
};

type Filters = {
  search: string;
  category: string;
  material: string;
  insulated: "all" | "yes" | "no";
  sort: "featured" | "price_low" | "price_high" | "newest";
};

type ProductsProps = {
  products?: Product[];
  isLoading?: boolean;
};

export default function Products({ products = [], isLoading = false }: ProductsProps): ReactElement {
  const [filters] = useState<Filters>({
    search: "",
    category: "all",
    material: "all",
    insulated: "all",
    sort: "featured",
  });

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const searchValue = filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchValue) ||
          product.sku?.toLowerCase().includes(searchValue) ||
          product.description?.toLowerCase().includes(searchValue),
      );
    }

    if (filters.category !== "all") {
      result = result.filter((product) => product.category === filters.category);
    }

    if (filters.material !== "all") {
      result = result.filter((product) => product.material === filters.material);
    }

    if (filters.insulated === "yes") {
      result = result.filter((product) => product.insulated === true);
    }

    if (filters.insulated === "no") {
      result = result.filter((product) => product.insulated === false);
    }

    if (filters.sort === "price_low") {
      result.sort((left, right) => (left.price ?? 999999) - (right.price ?? 999999));
    }

    if (filters.sort === "price_high") {
      result.sort((left, right) => (right.price ?? 0) - (left.price ?? 0));
    }

    if (filters.sort === "newest") {
      result.sort((left, right) => Date.parse(right.created_date ?? "") - Date.parse(left.created_date ?? ""));
    }

    if (filters.sort === "featured") {
      result.sort((left, right) => Number(right.featured) - Number(left.featured));
    }

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">Products</h1>
          <p className="text-slate-400 text-lg">Industrial rapid roller doors, parts & accessories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((product) => (
              <article key={product.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] bg-slate-900">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                      No image available
                    </div>
                  )}
                </Link>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{product.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed min-h-12">
                    {product.description ?? "High-performance industrial door solution for Australian conditions."}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/#quote?product=${product.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
