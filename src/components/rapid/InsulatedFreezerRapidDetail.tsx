import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, ListChecks, ShieldCheck, Snowflake } from "lucide-react";
import ProjectLifecycleCycle from "@/components/ui/ProjectLifecycleCycle";
import type { RapidProduct } from "@/lib/rapid-roller-catalog";
import { RAPID_FAMILIES } from "@/lib/rapid-roller-catalog";

const IMG_HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuChRknkTB7v_1R2ZUz4z_pi0K63vrFnCww1JoEzMnWziR_BTeFVTlVAOhyU7mV2IfImBf_TaLETdsXR8FoPjbFuwuMucFG-Nijw9p3h6cb8P6rKvc-GmJVSjelSb_E59yEFeXgTArgZgM5_I2IkA9LsqnPeLG8VfGDE895c_rLiKmViRGxqy6sXLPdsrUIU1bChK7wHKgSnhCRUoxMx_jK0FsoOdxgxYfJbxK2sSwt3-2qJ16uAKZdoVvErDFlX6MstwNRWzKAsKFY";

const IMG_BLUEPRINT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQjD9oO78c3qZLrSIblj0-imixakTAyl7Rik-DX_9Iz9gr1cvI265mjHjUfRqtAK0bwZBMGjC295s9HTymBa5H231jk4ThA4Qx06RDrTQJ9L5KVMlBY8eZX6K21LyPSrxAh3RfXIHyJiUmGF9nZHSmYjkVab2ug2bAk2pS381ZSK24a5ZGUjznHbyhJlsM4TCGfe9xHq8Ru9ndY0Fo7hOQxuW3-gJzmkyRr55Q7gP-ZMfg1IXOcqcJlP_37tBBew17dGx6BqVm07A";

function specValue(product: RapidProduct, label: string): string | undefined {
  return product.specs.find((s) => s.label === label)?.value;
}

export default function InsulatedFreezerRapidDetail({ product }: { product: RapidProduct }) {
  const familyLabel = RAPID_FAMILIES.find((f) => f.id === product.family)?.label ?? product.family;
  const introParagraphs = product.intro.split(/\n\n+/).filter(Boolean).slice(0, 2);
  const openingSpeed = specValue(product, "Opening speed") ?? "Quoted per model";
  const thermal = specValue(product, "Thermal") ?? "Insulated packages optional";
  const maxW = specValue(product, "Max width");
  const maxH = specValue(product, "Max height");

  const [f0, f1] = product.features;
  const tableSpecs = product.specs.slice(0, 6);

  return (
    <article className="bg-[#fbf9f8] text-[#191c1f]">
      {/* In-page nav — matches Stitch sub-nav pattern */}
      <nav
        aria-label="Product sections"
        className="sticky top-16 z-30 border-b border-[#e0c0b1]/25 bg-[#fbf9f8]/95 backdrop-blur-md md:top-[4.5rem]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-6 py-3 font-body text-xs font-semibold uppercase tracking-wider text-[#584237] md:px-8">
          <a href="#overview" className="border-b-2 border-transparent pb-0.5 hover:text-[#FC8347]">
            Overview
          </a>
          <a href="#specifications" className="border-b-2 border-[#FC8347] pb-0.5 text-[#FC8347]">
            Specifications
          </a>
          <a href="#documentation" className="border-b-2 border-transparent pb-0.5 hover:text-[#FC8347]">
            Documentation
          </a>
          <a href="#support" className="border-b-2 border-transparent pb-0.5 hover:text-[#FC8347]">
            Support
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-12">
        {/* Product header */}
        <section id="overview" className="mb-14 grid grid-cols-1 items-end gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <span className="inline-block rounded bg-[#FC8347]/15 px-2 py-1 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
              {familyLabel} · Insulated rapid series
            </span>
            <h1 className="mt-4 font-headline text-4xl font-bold leading-[1.05] tracking-tight text-[#051125]! md:text-5xl lg:text-6xl">
              Insulated freezer rapid{" "}
              <span className="text-[#FC8347]!">door</span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 font-body text-lg leading-relaxed text-[#584237]">
              {introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex rounded-md bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-8 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#FC8347]/20 transition-all hover:opacity-95 active:scale-[0.99]"
            >
              Request tech spec
            </Link>
          </div>
        </section>

        {/* Bento */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="overflow-hidden rounded-xl border border-[#e0c0b1]/20 bg-white shadow-sm md:col-span-2 md:row-span-2 lg:col-span-2">
            <div className="group relative aspect-[4/3] min-h-[280px] w-full md:aspect-auto md:min-h-[420px] lg:min-h-full">
              <Image
                src={IMG_HERO}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 66vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#051125]/70 to-transparent p-6 md:p-8">
                <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-white/80">Build quality</p>
                <h2 className="font-headline text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Insulated curtain &amp; thermal break detail
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border-b-4 border-[#FC8347] bg-white p-8 shadow-sm">
            <div>
              <Gauge className="mb-4 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
              <h3 className="font-body text-xs font-bold uppercase tracking-widest text-[#584237]">Opening speed</h3>
            </div>
            <div className="mt-6">
              <p className="font-headline text-2xl font-bold leading-tight tracking-tight text-[#051125] md:text-3xl lg:text-4xl">
                {openingSpeed}
              </p>
              <p className="mt-2 font-body text-sm font-medium text-[#584237]">Quoted per schedule &amp; risk review</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border-b-4 border-[#FC8347] bg-white p-8 shadow-sm">
            <div>
              <Snowflake className="mb-4 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
              <h3 className="font-body text-xs font-bold uppercase tracking-widest text-[#584237]">Thermal</h3>
            </div>
            <div className="mt-6">
              <p className="font-headline text-2xl font-bold leading-tight tracking-tighter text-[#051125] md:text-3xl md:text-4xl">
                Freezer rated
              </p>
              <p className="mt-2 font-body text-sm font-medium leading-snug text-[#584237]">{thermal}</p>
            </div>
          </div>

          <div
            id="specifications"
            className="rounded-xl border border-[#e0c0b1]/15 bg-[#f2f4f8] p-8 md:col-span-3 lg:col-span-2"
          >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-[#051125]">
                <ListChecks className="h-5 w-5 text-[#FC8347]" aria-hidden />
                Technical data sheet
              </h3>
              <span className="rounded bg-white px-2 py-1 font-body text-[0.6rem] font-bold uppercase tracking-widest text-[#FC8347]">
                Catalogue snapshot
              </span>
            </div>
            <div className="space-y-1">
              {tableSpecs.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap justify-between gap-2 border-b border-[#e0c0b1]/25 py-3 last:border-b-0"
                >
                  <span className="font-body text-xs font-bold uppercase tracking-widest text-[#584237]">
                    {row.label}
                  </span>
                  <span className="max-w-[min(100%,20rem)] text-right font-body text-xs font-bold text-[#191c1f]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#e0c0b1]/15 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FC8347]/10">
                <ShieldCheck className="h-5 w-5 text-[#FC8347]" aria-hidden />
              </div>
              <h3 className="font-body text-sm font-bold uppercase tracking-widest text-[#051125]">Safety &amp; interlocks</h3>
            </div>
            <p className="mb-4 font-body text-xs leading-relaxed text-[#584237]">
              {f0
                ? `${f0.title}: ${f0.description}`
                : "Safety category and sensor layout are matched to your risk assessment and traffic type."}
            </p>
            <Link
              href="/technical"
              className="inline-flex items-center gap-1 font-body text-xs font-bold text-[#FC8347] hover:underline"
            >
              Technical hub <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="rounded-xl border border-[#e0c0b1]/15 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FC8347]/10">
                <Snowflake className="h-5 w-5 text-[#FC8347]" aria-hidden />
              </div>
              <h3 className="font-body text-sm font-bold uppercase tracking-widest text-[#051125]">Thermal performance</h3>
            </div>
            <p className="mb-4 font-body text-xs leading-relaxed text-[#584237]">
              {f1
                ? `${f1.title}: ${f1.description}`
                : "Insulated curtains and sealing strategy are sized to your set-point and cycle count — outcomes are project-specific."}
            </p>
            <Link
              href="/rapid-roller-doors/freezer-doors"
              className="inline-flex items-center gap-1 font-body text-xs font-bold text-[#FC8347] hover:underline"
            >
              Freezer hub <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Dark band — blueprint */}
        <section className="mt-16 flex flex-col overflow-hidden rounded-xl bg-[#051125] text-[#fbf9f8] md:flex-row">
          <div className="flex flex-col justify-center p-10 md:w-1/2 md:p-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-white! md:text-4xl">
              Modular service{" "}
              <br />
              <span className="text-[#FC8347]!">architecture.</span>
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-white/75">
              Operators, curtains, and safety packages are treated as field-service modules where the application allows —
              so you can plan maintenance without unnecessary full-line shutdowns. Scope is confirmed on your commissioning
              documents.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-headline text-2xl font-bold text-[#FC8347]">{maxW ?? "—"}</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/50">Typical max width</p>
              </div>
              <div>
                <p className="font-headline text-2xl font-bold text-[#FC8347]">{maxH ?? "—"}</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/50">Typical max height</p>
              </div>
            </div>
          </div>
          <div className="relative min-h-56 md:w-1/2 md:min-h-[280px]">
            <Image
              src={IMG_BLUEPRINT}
              alt=""
              fill
              className="object-cover opacity-60 mix-blend-luminosity grayscale"
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </section>

        {/* Documentation */}
        <div id="documentation" className="mt-16 space-y-16 scroll-mt-28">
          <section className="border-t border-[#e0c0b1]/20 pt-12">
            <h2 className="mb-6 font-headline text-2xl font-bold text-[#051125]">Features</h2>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {product.features.map((f) => (
                <li key={f.title} className="rounded-xl border border-[#e0c0b1]/25 bg-white p-5 shadow-sm">
                  <h3 className="font-headline font-semibold text-[#051125]">{f.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{f.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-2xl font-bold text-[#051125]">Control options</h2>
            <p className="max-w-3xl font-body leading-relaxed text-[#584237]">{product.controlOptions}</p>
          </section>

          <section className="rounded-xl bg-[#f2f4f8] p-8">
            <h2 className="mb-4 font-headline text-2xl font-bold text-[#051125]">Curtain colours</h2>
            <ul className="flex flex-wrap gap-2">
              {product.curtainColors.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-[#e0c0b1]/40 bg-white px-4 py-2 font-body text-sm font-medium text-[#191c1f]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-headline text-2xl font-bold text-[#051125]">Product images</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[IMG_HERO, IMG_BLUEPRINT, ...product.gallery].filter((url, i, a) => a.indexOf(url) === i).map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eceef2]">
                  <Image
                    src={src}
                    alt={`${product.name} — ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                    unoptimized={src.includes("googleusercontent")}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Support */}
        <section id="support" className="mt-16 scroll-mt-28 border-t border-[#e0c0b1]/20 pt-12">
          <h2 className="mb-2 font-headline text-2xl font-bold text-[#051125]!">End-to-end flow</h2>
          <p className="mb-10 max-w-2xl font-body text-sm text-[#584237]">
            From first enquiry through commissioning and aftermarket support — a single professional cycle.
          </p>
          <ProjectLifecycleCycle />
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-md bg-[#FC8347] px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-white hover:opacity-90"
            >
              Request quote
            </Link>
            <Link
              href="/rapid-roller-doors"
              className="inline-flex rounded-md border-2 border-[#051125] px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-[#051125] hover:bg-[#051125] hover:text-white"
            >
              Door families
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
