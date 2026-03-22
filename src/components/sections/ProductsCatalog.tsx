"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/src/components/ui/ProductCard";
import type { StoreProduct } from "@/src/lib/products";
import {
  normalizeProductCategoryLabel,
  type ProductCategoryFilter,
} from "@/src/lib/product-category";

type SortOption = "Featured" | "Name A-Z" | "Name Z-A";

const SORT_OPTIONS: SortOption[] = ["Featured", "Name A-Z", "Name Z-A"];
const CATEGORY_OPTIONS: ProductCategoryFilter[] = [
  "All",
  "Rapid",
  "High Speed",
  "Insulated",
  "Accessories",
];

function parseSort(value: string | undefined): SortOption {
  if (value === "Name A-Z" || value === "Name Z-A") {
    return value;
  }
  return "Featured";
}

interface ProductsCatalogProps {
  products: StoreProduct[];
  initialCategory?: string;
  initialSearch?: string;
  initialSort?: string;
}

export default function ProductsCatalog({
  products,
  initialCategory,
  initialSearch,
  initialSort,
}: ProductsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch ?? "");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>(
    CATEGORY_OPTIONS.includes((initialCategory as ProductCategoryFilter) ?? "All")
      ? (initialCategory as ProductCategoryFilter)
      : "All"
  );
  const [sortOption, setSortOption] = useState<SortOption>(parseSort(initialSort));

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    let results = products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
      const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
      return titleMatch || categoryMatch;
    });

    if (selectedCategory !== "All") {
      results = results.filter(
        (product) => normalizeProductCategoryLabel(product.category) === selectedCategory
      );
    }

    if (sortOption === "Featured") {
      results = [...results].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    if (sortOption === "Name A-Z") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "Name Z-A") {
      results = [...results].sort((a, b) => b.title.localeCompare(a.title));
    }

    return results;
  }, [products, searchQuery, selectedCategory, sortOption]);

  const inputClass =
    "w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <>
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full gap-3 lg:grid-cols-[minmax(0,1fr)_200px_200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products, models, applications..."
            className={inputClass}
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as ProductCategoryFilter)}
            className={inputClass}
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category} className="bg-surface-container-lowest">
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            className={inputClass}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-surface-container-lowest">
                {option}
              </option>
            ))}
          </select>
        </div>

        <p className="font-body text-sm text-text-muted">{filteredProducts.length} products</p>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <div className="mt-10 rounded-lg border border-outline-variant/40 bg-surface-container-low p-8 text-center font-body text-text-muted">
          No products found. Try adjusting your search or filters.
        </div>
      )}
    </>
  );
}
