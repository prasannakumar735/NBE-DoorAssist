import type { Metadata } from "next";
import ProductsCatalogClient from "@/components/products/ProductsCatalogClient";
import { fetchProductsListing } from "@/lib/products";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Products | drooov Industrial Doors",
  description:
    "Browse rapid doors, high-speed systems, insulated lines, and accessories — specifications and quoting on enquiry.",
  openGraph: {
    title: "Products | drooov Industrial Doors",
    description: "Industrial door catalogue for Australian operations.",
    type: "website",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const products = await fetchProductsListing();

  return <ProductsCatalogClient products={products} />;
}
