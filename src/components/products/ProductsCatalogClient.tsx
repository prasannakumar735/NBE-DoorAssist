"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ListFilter, Search } from "lucide-react";
import {
  catalogBadge,
  catalogGridImage,
  catalogSpecRows,
  seriesCodeFromSlug,
} from "@/lib/catalog-display";
import type { ProductListingItem } from "@/lib/products";

type SortKey = "newest" | "az" | "za";

const SYSTEM_CHIPS = [
  { id: "all", label: "All systems" },
  { id: "rapid", label: "Rapid roller" },
  { id: "pvc", label: "PVC curtains" },
  { id: "steel", label: "Steel / security" },
] as const;

function matchesSystemChip(product: ProductListingItem, chipId: string): boolean {
  if (chipId === "all") return true;
  const t = `${product.category} ${product.title} ${product.slug}`.toLowerCase();
  if (chipId === "rapid") {
    return (
      t.includes("rapid") ||
      t.includes("roller") ||
      t.includes("high-speed") ||
      t.includes("high speed")
    );
  }
  if (chipId === "pvc") return t.includes("pvc") || t.includes("strip") || t.includes("curtain");
  if (chipId === "steel") return t.includes("steel") || t.includes("shutter") || t.includes("security");
  return true;
}

export default function ProductsCatalogClient({ products }: { products: ProductListingItem[] }) {
  const [search, setSearch] = useState("");
  const [chip, setChip] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [categoryTick, setCategoryTick] = useState<Record<string, boolean>>({});

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => matchesSystemChip(p, chip));

    const activeCats = Object.entries(categoryTick)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (activeCats.length > 0) {
      list = list.filter((p) => activeCats.includes(p.category));
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    const out = [...list];
    if (sort === "az") {
      out.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      out.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      out.sort((a, b) => {
        const ta = a.created_at ? Date.parse(a.created_at) : 0;
        const tb = b.created_at ? Date.parse(b.created_at) : 0;
        if (tb !== ta) return tb - ta;
        return a.title.localeCompare(b.title);
      });
    }
    return out;
  }, [products, chip, categoryTick, search, sort]);

  const resetFilters = () => {
    setSearch("");
    setChip("all");
    setSort("newest");
    setCategoryTick({});
  };

  const toggleCategory = (cat: string) => {
    setCategoryTick((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] pb-20 text-[#191c1f]">
      <div className="mx-auto max-w-screen-2xl px-6 pt-10 md:px-8 md:pt-14">
        {/* Hero — Stitch-style */}
        <section className="mb-12 md:mb-16">
          <span className="mb-3 block font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
            Product directory
          </span>
          <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight text-[#051125] md:text-5xl lg:text-6xl">
            Precision{" "}
            <span className="text-[#FC8347]">engineering solutions</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#584237]">
            Explore rapid roller, insulated, and complementary industrial door systems. Listings are loaded from our
            catalogue — pricing and final imagery are confirmed on enquiry.
          </p>
        </section>

        {/* Toolbar */}
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:w-auto md:pb-0 [&::-webkit-scrollbar]:hidden">
            {SYSTEM_CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChip(c.id)}
                className={`whitespace-nowrap rounded-md px-5 py-2 text-sm font-medium transition-colors ${
                  chip === c.id
                    ? "bg-[#051125] text-white"
                    : "bg-[#eae8e7] text-[#584237] hover:bg-[#e4e2e2]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
            <div className="flex w-full items-center rounded-md border border-[#c5c6cd]/40 bg-white px-3 py-2 md:w-72">
              <Search className="mr-2 h-4 w-4 shrink-0 text-[#75777d]" aria-hidden />
              <label htmlFor="catalog-search" className="sr-only">
                Search catalogue
              </label>
              <input
                id="catalog-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="font-body w-full border-0 bg-transparent text-sm text-[#191c1f] outline-none placeholder:text-[#75777d] focus:ring-0"
              />
            </div>
            <div className="flex w-full items-center rounded-md border border-[#c5c6cd]/40 bg-white px-3 py-2 md:w-56">
              <ArrowUpDown className="mr-2 h-4 w-4 shrink-0 text-[#75777d]" aria-hidden />
              <label htmlFor="catalog-sort" className="sr-only">
                Sort
              </label>
              <select
                id="catalog-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="font-body w-full cursor-pointer border-0 bg-transparent text-sm font-medium text-[#584237] outline-none focus:ring-0"
              >
                <option value="newest">Sort: Newest</option>
                <option value="az">Name: A–Z</option>
                <option value="za">Name: Z–A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 lg:space-y-10">
              <div>
                <h3 className="mb-6 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#584237]">
                  <ListFilter className="h-4 w-4 text-[#FC8347]" aria-hidden />
                  Configuration
                </h3>

                <div className="mb-8">
                  <p className="mb-3 text-sm font-bold text-[#051125]">Category</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="group flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={Boolean(categoryTick[cat])}
                          onChange={() => toggleCategory(cat)}
                          className="h-4 w-4 rounded-sm border-[#c5c6cd] text-[#FC8347] focus:ring-[#FC8347]"
                        />
                        <span className="font-body text-sm text-[#584237] transition-colors group-hover:text-[#051125]">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="material-placeholder" className="mb-3 block text-sm font-bold text-[#051125]">
                    Material grade
                  </label>
                  <select
                    id="material-placeholder"
                    disabled
                    className="font-body w-full cursor-not-allowed rounded-md border border-[#c5c6cd]/40 bg-[#f5f3f3] p-2 text-sm text-[#584237]"
                    defaultValue=""
                  >
                    <option value="">All materials (on enquiry)</option>
                  </select>
                </div>

                <div className="mb-8">
                  <p className="mb-3 text-sm font-bold text-[#051125]">Opening size (mm)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      readOnly
                      placeholder="Width"
                      className="font-body w-full rounded-md border border-[#c5c6cd]/40 bg-white p-2 text-sm text-[#191c1f] placeholder:text-[#75777d]"
                    />
                    <input
                      readOnly
                      placeholder="Height"
                      className="font-body w-full rounded-md border border-[#c5c6cd]/40 bg-white p-2 text-sm text-[#191c1f] placeholder:text-[#75777d]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-body w-full rounded-md bg-[#e4e2e2] py-3 text-xs font-bold uppercase tracking-widest text-[#051125] transition-colors hover:bg-[#c5c6cd]/50"
                >
                  Reset filters
                </button>
                <p className="mt-4 font-body text-xs text-[#584237]">
                  Detailed filters are confirmed during quoting — tell us your opening and duty on{" "}
                  <Link href="/contact" className="font-semibold text-[#FC8347] hover:underline">
                    contact
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <p className="rounded-lg border border-[#e0c0b1]/30 bg-white py-16 text-center font-body text-[#584237]">
                No products match these filters. Try &ldquo;All systems&rdquo; or clear category ticks.
              </p>
            ) : (
              <>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product, index) => {
                    const img = catalogGridImage(index);
                    const badge = catalogBadge(index);
                    const specs = catalogSpecRows(product.category);
                    const series = seriesCodeFromSlug(product.slug);
                    return (
                      <li key={product.id}>
                        <article className="group flex flex-col overflow-hidden rounded-lg border border-[#c5c6cd]/15 bg-white transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(27,28,28,0.06)]">
                          <Link href={`/products/${encodeURIComponent(product.slug)}`} className="relative block aspect-[4/3] overflow-hidden bg-[#f0eded]">
                            <Image
                              src={img}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                              unoptimized={img.includes("googleusercontent")}
                            />
                            <div
                              className={`absolute left-4 top-4 rounded-sm px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider ${badge.className}`}
                            >
                              {badge.label}
                            </div>
                          </Link>
                          <div className="flex flex-grow flex-col p-6">
                            <div className="mb-4">
                              <span className="mb-1 block font-mono text-[10px] text-[#75777d]">{series}</span>
                              <h2 className="font-headline text-xl font-bold text-[#051125]">
                                <Link
                                  href={`/products/${encodeURIComponent(product.slug)}`}
                                  className="hover:text-[#FC8347] hover:underline"
                                >
                                  {product.title}
                                </Link>
                              </h2>
                              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-[#FC8347]">
                                {product.category}
                              </p>
                            </div>
                            <div className="mb-6 flex-grow space-y-2">
                              {specs.map((row, i) => (
                                <div
                                  key={row.label}
                                  className={`flex items-center justify-between font-body text-xs ${
                                    i < specs.length - 1 ? "border-b border-[#f0eded] pb-1" : ""
                                  }`}
                                >
                                  <span className="text-[#584237]">{row.label}</span>
                                  <span className="font-bold text-[#191c1f]">{row.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-auto border-t border-[#f0eded] pt-6">
                              <div className="mb-4 flex items-end justify-between gap-3">
                                <p className="font-body text-xs leading-snug text-[#584237]">
                                  <span className="font-bold uppercase tracking-wide text-[#FC8347]">Quote only</span>
                                  <br />
                                  No list pricing — tailored to your opening.
                                </p>
                                <Link
                                  href={`/products/${encodeURIComponent(product.slug)}`}
                                  className="shrink-0 font-body text-sm font-semibold text-[#00639b] hover:text-[#FC8347] hover:underline"
                                >
                                  Details
                                </Link>
                              </div>
                              <Link
                                href="/contact"
                                className="font-body flex w-full items-center justify-center rounded-md bg-[#051125] py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1b263b]"
                              >
                                Request quote
                              </Link>
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-10 text-center font-body text-xs text-[#584237]">
                  Showing {filtered.length} of {products.length} catalogue {products.length === 1 ? "entry" : "entries"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
