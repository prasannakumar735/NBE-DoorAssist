import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ColdRoomIndustryPage from "@/components/pvc/ColdRoomIndustryPage";
import FoodIndustryPage from "@/components/pvc/FoodIndustryPage";
import RetailIndustryPage from "@/components/pvc/RetailIndustryPage";
import {
  getPvcProductsByIndustry,
  PVC_INDUSTRIES,
  type PvcIndustryId,
} from "@/lib/pvc-strip-catalog";

type Props = { params: Promise<{ industry: string }> };

const validIds = new Set<PvcIndustryId>(PVC_INDUSTRIES.map((i) => i.id));

export function generateStaticParams() {
  return PVC_INDUSTRIES.map((i) => ({ industry: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const meta = PVC_INDUSTRIES.find((i) => i.id === industry);
  if (!meta) return { title: "Not found" };
  if (industry === "cold-room") {
    return {
      title: "Cold room solutions | PVC strip curtains | drooov",
      description:
        "Polar-grade PVC strip curtains and cold-room guidance — thermal efficiency, measurement protocol, and quote-led supply.",
    };
  }
  if (industry === "food") {
    return {
      title: "Food industry PVC strip curtains | drooov",
      description:
        "Hygienic PVC strip barriers for processing and temperature zones — HACCP-aligned guidance, polar and ribbed options, quote-led supply.",
    };
  }
  return {
    title: `${meta.label} — PVC strip curtains | drooov`,
    description: meta.description,
  };
}

export default async function PvcIndustryPage({ params }: Props) {
  const { industry } = await params;
  if (!validIds.has(industry as PvcIndustryId)) notFound();
  const id = industry as PvcIndustryId;
  const meta = PVC_INDUSTRIES.find((i) => i.id === id)!;
  const products = getPvcProductsByIndustry(id);

  if (id === "cold-room") {
    return <ColdRoomIndustryPage />;
  }

  if (id === "food") {
    return <FoodIndustryPage products={products} />;
  }

  if (id === "retail") {
    return <RetailIndustryPage products={products} />;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-[#191c1f] md:px-12 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#FC8347]">Industry</p>
        <h1 className="mt-2 font-headline text-4xl font-bold">{meta.label}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#584237]">{meta.description}</p>

        <p className="mt-10 text-sm font-semibold uppercase tracking-wide text-[#191c1f]">Products for this sector</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/pvc-strip-curtains/${p.slug}`}
                className="block h-full rounded-sm border border-[#e0c0b1]/35 bg-[#fbf9f8] p-6 transition hover:border-[#FC8347]/50"
              >
                <h2 className="font-headline text-lg font-bold">{p.name}</h2>
                <p className="mt-2 text-sm text-[#584237]">{p.teaser}</p>
                <span className="mt-4 inline-block text-sm font-bold text-[#FC8347]">View detail →</span>
              </Link>
            </li>
          ))}
        </ul>
        {products.length === 0 ? (
          <p className="mt-8 text-[#584237]">No catalogue entries for this industry yet — contact us for a custom kit.</p>
        ) : null}

        <Link href="/pvc-strip-curtains" className="mt-12 inline-block text-sm font-bold text-[#FC8347] hover:underline">
          ← All PVC products
        </Link>
      </div>
    </div>
  );
}
