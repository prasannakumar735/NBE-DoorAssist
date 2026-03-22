import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PolarPvcProductLanding from "@/components/pvc/PolarPvcProductLanding";
import PvcProductDetail from "@/components/pvc/PvcProductDetail";
import PvcSwingDoorsLanding from "@/components/pvc/PvcSwingDoorsLanding";
import WeldedRackStripDoorLanding from "@/components/pvc/WeldedRackStripDoorLanding";
import { getPvcProduct, PVC_PRODUCTS } from "@/lib/pvc-strip-catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PVC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getPvcProduct(slug);
  if (!product) return { title: "Not found" };
  if (slug === "polar-pvc-strip-curtain") {
    return {
      title: "Polar PVC strip curtain | Thermal separation | drooov",
      description:
        "Polar-grade flexible PVC strips for chill and freezer approaches — measurement-led quotes, ribbed or flat faces, and animated quote-to-install workflow.",
    };
  }
  if (slug === "welded-rack-strip-door") {
    return {
      title: "Welded rack strip door | Hook-on PVC | drooov",
      description:
        "Welded rack PVC strip doors with hook-on strips — measure rail width, height, and mast clearance; specs for width, colour, surface, and temperature; quote-to-install lifecycle.",
    };
  }
  if (slug === "pvc-swing-doors") {
    return {
      title: "PVC swing doors | Industrial double-acting | drooov",
      description:
        "Flexible PVC swing doors for warehouses and retail — spring-assisted options, dimensions and specs on quote, colours and gallery.",
    };
  }
  return {
    title: `${product.name} | drooov`,
    description: product.teaser,
  };
}

export default async function PvcProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getPvcProduct(slug);
  if (!product) notFound();

  if (slug === "polar-pvc-strip-curtain") {
    return <PolarPvcProductLanding product={product} />;
  }
  if (slug === "welded-rack-strip-door") {
    return <WeldedRackStripDoorLanding product={product} />;
  }
  if (slug === "pvc-swing-doors") {
    return <PvcSwingDoorsLanding product={product} />;
  }

  return <PvcProductDetail product={product} />;
}
