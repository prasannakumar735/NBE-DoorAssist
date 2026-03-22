import Image from "next/image";
import Link from "next/link";
import { PVC_INDUSTRIES, type PvcIndustryId, type PvcProduct } from "@/lib/pvc-strip-catalog";

const lifecycle = [
  "Quote",
  "Purchase order",
  "Order received",
  "Product prepared",
  "Shipped",
  "Installation",
];

export default function PvcProductDetail({ product }: { product: PvcProduct }) {
  return (
    <article className="bg-white text-[#191c1f]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
        <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-[#584237]">{product.intro}</p>
      </div>

      <section className="border-t border-[#e0c0b1]/20 bg-[#fbf9f8] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">How to measure PVC strip sizes?</h2>
          <p className="leading-relaxed text-[#584237]">{product.measureGuide}</p>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Which colour suits your premises?</h2>
          <p className="leading-relaxed text-[#584237]">{product.colorGuide}</p>
          {product.colorByIndustry ? (
            <ul className="mt-8 space-y-3 border-t border-[#e0c0b1]/25 pt-8">
              {(Object.entries(product.colorByIndustry) as [PvcIndustryId, string][])
                .filter(([, text]) => text?.trim())
                .map(([id, text]) => {
                  const label = PVC_INDUSTRIES.find((i) => i.id === id)?.label ?? id;
                  return (
                    <li key={id} className="leading-relaxed text-[#584237]">
                      <span className="font-semibold text-[#191c1f]">{label}:</span> {text}
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="bg-[#f2f4f8] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Strip width</h2>
          <p className="leading-relaxed text-[#584237]">{product.stripWidth}</p>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Strip surface — ribbed vs standard</h2>
          <p className="leading-relaxed text-[#584237]">{product.stripSurface}</p>
        </div>
      </section>

      <section className="border-t border-[#e0c0b1]/20 bg-white px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Temperature suitability</h2>
          <p className="leading-relaxed text-[#584237]">{product.temperatureGuide}</p>
        </div>
      </section>

      <section className="bg-[#fbf9f8] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Strip head — galvanised vs stainless</h2>
          <p className="leading-relaxed text-[#584237]">{product.stripHead}</p>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-xl font-bold">Delivery time</h2>
          <p className="leading-relaxed text-[#584237]">{product.delivery}</p>
        </div>
      </section>

      <section className="border-t border-[#e0c0b1]/20 bg-[#f2f4f8] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-6 font-headline text-2xl font-bold">Lifecycle</h2>
          <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
            {lifecycle.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FC8347] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-6 font-headline text-2xl font-bold">Images</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                <Image
                  src={src}
                  alt={`${product.name} — ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e0c0b1]/30 bg-white px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/pvc-strip-curtains"
            className="text-sm font-semibold text-[#191c1f] underline decoration-[#e0c0b1]/50 hover:text-[#FC8347]"
          >
            ← All PVC products
          </Link>
          <Link href="/contact" className="inline-flex justify-center rounded-sm bg-[#FC8347] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90">
            Get Quote
          </Link>
        </div>
      </section>
    </article>
  );
}
