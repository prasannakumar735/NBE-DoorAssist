import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsulatedFreezerRapidDetail from "@/components/rapid/InsulatedFreezerRapidDetail";
import RapidProductDetail from "@/components/rapid/RapidProductDetail";
import { getRapidProduct, RAPID_PRODUCTS } from "@/lib/rapid-roller-catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RAPID_PRODUCTS.filter((p) => !p.detailPath).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getRapidProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} | drooov`,
    description: product.cardTeaser,
  };
}

export default async function RapidProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getRapidProduct(slug);
  if (!product) notFound();

  if (slug === "insulated-freezer-rapid-door") {
    return <InsulatedFreezerRapidDetail product={product} />;
  }

  return <RapidProductDetail product={product} />;
}
