import Image from "next/image";
import Link from "next/link";
import type { RapidProduct } from "@/lib/rapid-roller-catalog";
import { RAPID_FAMILIES } from "@/lib/rapid-roller-catalog";
import ProjectLifecycleCycle from "@/components/ui/ProjectLifecycleCycle";

export default function RapidProductDetail({ product }: { product: RapidProduct }) {
  const familyLabel = RAPID_FAMILIES.find((f) => f.id === product.family)?.label ?? product.family;
  const introParagraphs = product.intro.split(/\n\n+/).filter(Boolean);

  return (
    <article className="bg-white text-[#191c1f]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FC8347]">{familyLabel}</p>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
            <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-[#584237]">
              {introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:pt-2">
            <h2 className="mb-4 font-headline text-lg font-bold uppercase tracking-wide text-[#191c1f]">Specifications</h2>
            <dl className="overflow-hidden rounded-sm border border-[#e0c0b1]/40">
              {product.specs.map((row) => (
                <div key={row.label} className="grid grid-cols-[minmax(0,40%)_1fr] gap-2 border-b border-[#e0c0b1]/25 bg-[#fbf9f8] px-4 py-3 last:border-b-0 odd:bg-white">
                  <dt className="text-sm font-semibold text-[#191c1f]">{row.label}</dt>
                  <dd className="text-sm text-[#584237]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      <section className="border-t border-[#e0c0b1]/20 bg-[#fbf9f8] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-6 font-headline text-2xl font-bold">Features</h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <li key={f.title} className="rounded-sm border border-[#e0c0b1]/30 bg-white p-5 shadow-sm">
                <h3 className="font-headline font-semibold text-[#191c1f]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#584237]">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-4 font-headline text-2xl font-bold">Control options</h2>
          <p className="font-body leading-relaxed text-[#584237]">{product.controlOptions}</p>
        </div>
      </section>

      <section className="bg-[#f2f4f8] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-4 font-headline text-2xl font-bold">Curtain colours</h2>
          <ul className="flex flex-wrap gap-2">
            {product.curtainColors.map((c) => (
              <li
                key={c}
                className="rounded-full border border-[#e0c0b1]/40 bg-white px-4 py-2 text-sm font-medium text-[#191c1f]"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-6 font-headline text-2xl font-bold">Product images</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                <Image src={src} alt={`${product.name} — image ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e0c0b1]/20 bg-white px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-2 font-headline text-2xl font-bold text-[#051125]!">End-to-end flow</h2>
          <p className="mb-10 max-w-2xl font-body text-sm text-[#584237]">
            From first enquiry through commissioning and aftermarket support — a single professional cycle.
          </p>
          <ProjectLifecycleCycle />
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-sm bg-[#FC8347] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90">
              Place order
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-sm border-2 border-[#191c1f] px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#191c1f] hover:bg-[#191c1f] hover:text-white"
            >
              Request quote
            </Link>
            <Link href="/contact" className="inline-flex items-center text-sm font-bold text-[#FC8347] hover:underline">
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
