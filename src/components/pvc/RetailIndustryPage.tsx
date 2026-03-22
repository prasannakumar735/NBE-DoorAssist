import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Shield, Store, ThermometerSun } from "lucide-react";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import type { PvcProduct } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuACEoEroZm6_CRPGgsAU2osnPbLS6FdA_7vmQJrCgEd8Ng1qve_3rWV2kn6bjm9QH7JOoivJPsJYA-CRdW1YOQyt7JFxcncXH_yPCBb915jgWFblvzbhOzRhM1kEzENpaQH8r24vRk9Lw7Jq1ytrH1ZJEWLyd9TQFOuCCHVuFjr7sDsK2YWOu-gB9gMk20UKy_X9h2HgAKmffMKXeYGPyAjzyiyJzKm9pjhILEsno17AVO7v9tkMY8AtNgV5LSfzKWF0cNmMAzjUxc",
  clearFeatured:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaxpe7bYm4fsF1qTUrYmo5lQjJ2f6qaFzBygMJx65eSDuCEaCrHV5746TNn0Uli0umW53jEvUPbMGAFRoMPryI_IAuqeBcSR9KnyliIbMpNhM9jRWrRzfgYba0MYVgCtUY6FTOIcS0z5qs1cWchBjzBQ1Mppujsu1xj6hEhxhYDfjP37SfY8iV7W4pC4uW8Ca1IzvzoXqwZBGHOSOBzuA2t0aaRf2nibxY1AgCGmH-vpwi2nAMcoTJ9nYvhnksaOrrpWTU2Q2xEvA",
  chillDeli:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDiX0qGHhfvck6HQmaJHG8xVZTFreiLXzqhQ5ABkcZZQZClUnkP9nSSjAbxXVmGdWRk0hq5dgcMeoqIQ89m-YrIAG_qTiH59IzYT00J1QRSqsDIKMgEuE9dy4MYnFF0Hcat73sQJMxW5U1fjj0FPOqO6_ouTXLmmuCmKcHik-gX_qho6Wr5qoPBLW6b3WFkXSr2C1IEneT2YAUfpWu1R4-x-DBLZrolOmoZZ6rah_yO9MOpk9topc7q1bWm4S_U_R78gHy6Pukzbao",
  trolleys:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBLTnt13qECF0srIwd2lrXKUZsDJ4l-dljbRVJWBwM_2UfhWUR0le4vqpRcOdVgTZty2fNQLWmUXBbzLsdEElEvUEYMmhomcyD-cRN9StuMKFpD0dyKcgUoDFR0x5mFZe9r_BHnFsHZ-qrTPgrNUzHG4-oS-sEQKhNQJ8vh-9m5I4dxr6Tr0hLzWaEQL1wctR1qCQ9J0CW5NRwKE8FQ06nrBI3rU6FMxPqBdIC-nKm-V6Uno4oVFnfs9N0rxfC6EFe2nxA-E8CZmCw",
  g1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrHrJBqBQTqUuAeC6e9gG9hQ7gEZyasJxKrff5dWzeb-OxAipvLS6MuXEnSZwHWHpRPEheKTVhl2m9B26bRD3RQaiUJfMIZSXGDr9UecBDjxSYUzA28r5-lZgkBzJx6GUvAqSo3uOwif-YgOfKF2PDMp6viZLThWrPxXgpi_efbxWpw_Q4fNE-MVMmXLX3vi5nTiIoxnT30Uq_gapzsPzwejWhqyrbvI5VEFtcmbXgzTI0Nke4wYT4u0W9qTVBr3BW3mbc7cNNTAw",
  g2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeS1lNC8cQHo3ILYyNY09hfFqBv7TqKjf4Hq7ZB6S2-r7yTJsMPwoNwoat5dBEpdB3pbTbryD1RBkT1jEf8yjMeZ-ktb7GyGHYBaUBjig3f8cb8iAMeS_uXI3GktMtZgm0MZcD-ek3HxWfbauvjFXUH5FSE21wTj-_2XeEB2sf4HJVVDl9YuoNju_hwaxFZGk3xM7HsNSAK1r8XqKBSGo4XhADK6R30jrhqpB12-sjVOCEwjRvnYyM2rFR8RBvBCYw7SCFmX3Gb3Y",
  g3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZmRiWTK0cCYBSc_Z3hpDazrzSZBClv59H4U7TPYspcKHOe55vp8GSZgAfsbN6PSJjGAIfMWFMe93ZaWFmD_j_3FrfWaFkkRfhyzkxZOlM5AeUXAj2Lw6CmDDQDAdKXGsbFnBPxSNJoqpKLSAEy-Tlv7KzH8sv0XJB_xyHMr4YVMFxknTc0aMR1Ko-Yy085qANo8fu5cGHegNAfA7cYltCbxTnWSYkBOw93rrEXPC10l29s3dLPMDSZh6hK1Dc2EJ1DOwZELLBFE",
  g4: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU4jwjFkMw5xOyImnDHdo38d0cpUVkCpssDdUHQc7Clhr2OGPbsshVJK9ahcUtLtWR0l-5aXPvPTYNXAezy5Ujn7gFmsE0BaD0nqQM3Ls6cp8pqcRy7JuHqXFI8rVPkfzw2W-meTkRbde-3xaLvBkzlznN7Q3UdkAWdkk_Op1ucLoOE0rQwZPRKa9WVsFDeQkXlgjDuDTf1Mz30B1xO4ZliJFfc7CdxAfzOz6pQhocDiZCmPSEj0_AntYIgNsV7aGFF49oaKzNr-c",
};

const WHY_RETAIL = [
  {
    title: "Temperature control",
    body: "Reduce air migration between shopfloor, chillers, and walk-ins so refrigeration loads stay predictable — strip overlap and compound are matched to your opening on quote.",
    Icon: ThermometerSun,
  },
  {
    title: "Visibility & pedestrian flow",
    body: "Clear PVC keeps sight lines open for staff and shoppers in transition zones; layout and strip width are chosen for your traffic mix, not a generic one-size spec.",
    Icon: Eye,
  },
  {
    title: "Dust & barrier control",
    body: "A flexible closure limits dust drift and flying insects toward back-of-house and fresh zones while keeping access quick for trolleys and restocking.",
    Icon: Shield,
  },
] as const;

const TINT_SWATCHES = [
  { label: "Blue tint", className: "bg-[#1d4ed8]/35 border-white/15" },
  { label: "High-contrast edge", className: "bg-[#b91c1c]/35 border-white/15" },
  { label: "Warm brand accent", className: "bg-[#FC8347]/30 border-[#FC8347]/40" },
  { label: "Frosted / diffused", className: "bg-slate-400/25 border-white/15" },
] as const;

function retailSectionNav(productsCount: number): PvcPageSectionNavItem[] {
  const base: PvcPageSectionNavItem[] = [
    { id: "retail-overview", label: "Overview" },
    { id: "retail-benefits", label: "Benefits" },
    { id: "retail-range", label: "Range" },
    { id: "retail-experience", label: "Experience" },
    { id: "retail-lifecycle", label: "Lifecycle" },
  ];
  if (productsCount > 0) {
    base.push({ id: "retail-catalogue", label: "Catalogue" });
  }
  base.push({ id: "retail-gallery", label: "Gallery" });
  return base;
}

const EXPERIENCE_POINTS = [
  "Brand integration: tint and opacity chosen to align with fascia and zoning graphics.",
  "Safety borders: contrasting edge strips for busy entry thresholds — discussed on site measure.",
  "Staff-only zones: frosted or ribbed options where you want less visual clutter from the sales floor.",
];

export default function RetailIndustryPage({ products }: { products: PvcProduct[] }) {
  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav
        brandLabel="Retail"
        ariaLabel="Retail PVC industry sections"
        items={retailSectionNav(products.length)}
      />
      {/* Hero */}
      <header
        id="retail-overview"
        className="relative flex min-h-[min(100vh,48rem)] scroll-mt-40 items-center overflow-hidden bg-[#051125]"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.hero}
            alt="Modern retail storefront with glass and public entrance"
            fill
            className="object-cover opacity-55 grayscale-[25%]"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051125] via-[#051125]/75 to-[#051125]/25" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="mb-5 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
              Retail &amp; supermarkets
            </span>
            <h1 className="font-headline text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="!text-white">PVC strip</span>{" "}
              <span className="!text-[#FC8347]">solutions</span>{" "}
              <span className="!text-white">for </span>
              <span className="!text-[#FC8347]">retail</span>
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-[#e0e2e6] md:text-xl">
              Thermal separation, clear sight lines, and durable traffic paths for stockrooms, chill lines, and service
              openings — specified and supplied quote-led by drooov.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-8 py-4 font-headline text-sm font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.99]"
              >
                Configure your system
              </Link>
              <Link
                href="/technical"
                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-8 py-4 font-headline text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15 active:scale-[0.99]"
              >
                Technical specs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Why retail */}
      <section id="retail-benefits" className="scroll-mt-40 bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
                Why strip curtains in retail?
              </h2>
              <p className="mt-4 max-w-xl font-body text-[#584237]">
                Balance energy performance with customer and staff movement — without turning service corridors into solid
                doors.
              </p>
            </div>
            <div className="hidden justify-end md:col-span-4 md:flex">
              <span
                className="pointer-events-none select-none font-headline text-7xl font-black uppercase leading-none text-[#FC8347]/[0.12] lg:text-8xl"
                aria-hidden
              >
                Retail
              </span>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#e0c0b1]/25 bg-[#e0c0b1]/20 md:grid-cols-3">
            {WHY_RETAIL.map((item) => (
              <li
                key={item.title}
                className="bg-white p-8 transition-colors hover:bg-[#fbf9f8] md:p-10"
              >
                <item.Icon className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <h3 className="font-headline text-xl font-bold !text-[#051125]">{item.title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#584237]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bento selection */}
      <section id="retail-range" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <div className="mx-auto h-1 w-12 bg-[#FC8347]" aria-hidden />
            <h2 className="mt-5 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Retail product selection
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-[#584237]">
              Starting points from our catalogue — final strip schedule and hardware follow your measure pack.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:min-h-[600px]">
            <article
              className={`group flex flex-col overflow-hidden bg-white md:col-span-2 md:row-span-2 ${shadowMd}`}
            >
              <div className="relative h-56 overflow-hidden bg-[#e6e8ec] md:h-[58%]">
                <Image
                  src={IMG.clearFeatured}
                  alt="Clear PVC strip curtain at a retail stockroom opening"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width:768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="flex flex-grow flex-col justify-between p-8">
                <div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#584237]">
                    Common choice
                  </span>
                  <h3 className="mt-2 font-headline text-2xl font-bold !text-[#051125]">Standard clear grade</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-[#584237]">
                    High clarity for back-of-house and dock-adjacent openings — light transmission depends on compound and
                    thickness; we confirm on datasheet at quote.
                  </p>
                </div>
                <Link
                  href="/pvc-strip-curtains"
                  className="mt-6 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347] transition-all group-hover:gap-3"
                >
                  View PVC catalogue
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden bg-[#e0e2e6] md:col-span-2 md:flex-row">
              <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
                <h3 className="font-headline text-lg font-bold !text-[#051125]">Chill, deli &amp; produce</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-[#584237]">
                  Polar-grade and hygiene-context compounds for cold displays and preparation adjacencies — aligned with your
                  QA and cleaning program on enquiry.
                </p>
                <Link
                  href="/pvc-strip-curtains/industry/food"
                  className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-widest text-[#FC8347] hover:underline"
                >
                  Food-sector guidance
                </Link>
              </div>
              <div className="relative h-48 w-full overflow-hidden md:h-auto md:w-1/2">
                <Image
                  src={IMG.chillDeli}
                  alt="Fresh deli counter in a modern grocery store"
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  sizes="(max-width:768px) 100vw, 25vw"
                  unoptimized
                />
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden bg-[#eceef2] md:col-span-2 md:flex-row">
              <div className="relative h-48 w-full overflow-hidden md:h-auto md:w-1/2">
                <Image
                  src={IMG.trolleys}
                  alt="Supermarket trolleys in a bright store"
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  sizes="(max-width:768px) 100vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="flex w-full flex-col justify-center border-t border-white/30 p-8 md:w-1/2 md:border-l md:border-t-0">
                <h3 className="font-headline text-lg font-bold !text-[#051125]">Ribbed &amp; high-traffic</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-[#584237]">
                  Ribbed faces wear more gracefully under trolley and pallet traffic; hook-on racks simplify strip changes
                  after impacts.
                </p>
                <Link
                  href="/pvc-strip-curtains/welded-rack-strip-door"
                  className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-widest text-[#FC8347] hover:underline"
                >
                  Welded rack doors
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Experience & aesthetics */}
      <section
        id="retail-experience"
        className="scroll-mt-40 overflow-hidden bg-[#051125] px-6 py-16 text-white md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#FC8347]/20 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8 md:pt-12">
                <div
                  className={`flex h-44 items-end rounded-lg border p-4 backdrop-blur-sm md:h-48 ${TINT_SWATCHES[0].className}`}
                >
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-white">{TINT_SWATCHES[0].label}</p>
                </div>
                <div
                  className={`flex h-56 items-end rounded-lg border p-4 backdrop-blur-sm md:h-64 ${TINT_SWATCHES[1].className}`}
                >
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-white">{TINT_SWATCHES[1].label}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className={`flex h-56 items-end rounded-lg border p-4 backdrop-blur-sm md:h-64 ${TINT_SWATCHES[2].className}`}
                >
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-white">{TINT_SWATCHES[2].label}</p>
                </div>
                <div
                  className={`flex h-44 items-end rounded-lg border p-4 backdrop-blur-sm md:h-48 ${TINT_SWATCHES[3].className}`}
                >
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-white/90">{TINT_SWATCHES[3].label}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight !text-white md:text-4xl">
              Customer experience &amp; aesthetics
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-[#e0e2e6]">
              Performance-first hardware can still respect brand and wayfinding. We shortlist tints and finishes that suit
              public-facing thresholds versus stock-only doors.
            </p>
            <ul className="mt-8 space-y-4">
              {EXPERIENCE_POINTS.map((line) => (
                <li key={line} className="flex items-start gap-4 font-body text-sm font-medium text-white/95">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FC8347]" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/pvc-strip-curtains/help/buying"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-bold text-[#FC8347] hover:underline"
            >
              Help on buying
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="retail-lifecycle" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">The process</span>
            <h2 className="mt-2 font-headline text-3xl font-bold !text-[#051125] md:text-4xl">End-to-end lifecycle</h2>
          </div>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Retail rollouts often align with refit windows — milestones are dated in your quote and updated if scope shifts."
          />
        </div>
      </section>

      {/* Catalogue */}
      {products.length > 0 ? (
        <section id="retail-catalogue" className="scroll-mt-40 border-y border-[#e0c0b1]/20 bg-white px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-headline text-2xl font-bold !text-[#051125]">drooov catalogue — retail sector</h2>
            <p className="mt-2 max-w-2xl font-body text-sm text-[#584237]">
              Detail pages include measurement notes, colour context, and hardware options.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/pvc-strip-curtains/${p.slug}`}
                    className={`block h-full rounded-lg border border-[#e0c0b1]/35 bg-[#fbf9f8] p-6 transition hover:border-[#FC8347]/45 ${shadowMd}`}
                  >
                    <h3 className="font-headline text-lg font-bold !text-[#051125]">{p.name}</h3>
                    <p className="mt-2 font-body text-sm text-[#584237]">{p.teaser}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-bold text-[#FC8347]">
                      View detail <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      <section id="retail-gallery" className="scroll-mt-40 bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 flex flex-wrap items-center gap-4 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">
            Typical retail environments
            <span className="hidden min-h-px min-w-[4rem] flex-1 bg-[#e0c0b1]/40 sm:block" aria-hidden />
          </h2>
          <p className="-mt-6 mb-10 max-w-xl font-body text-sm text-[#584237]">
            Illustrative settings — your specification is built from site photos and dimensions.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { src: IMG.g1, alt: "PVC strip curtains in a grocery backroom" },
              { src: IMG.g2, alt: "Bright supermarket aisle" },
              { src: IMG.g3, alt: "Retail staff moving stock" },
              { src: IMG.g4, alt: "Fresh produce section in a store" },
            ].map((g) => (
              <div key={g.alt} className="aspect-square bg-white p-2">
                <div className="relative h-full w-full overflow-hidden bg-[#e6e8ec]">
                  <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="25vw" unoptimized />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f9fd] px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className={`relative overflow-hidden rounded-xl bg-white p-10 md:p-14 ${shadowMd}`}>
            <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 bg-[#FC8347]" aria-hidden />
            <Store className="mx-auto h-10 w-10 text-[#FC8347]/80" strokeWidth={1.25} aria-hidden />
            <h2 className="mt-6 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Quote your store openings
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-body leading-relaxed text-[#584237]">
              Send dimensions, photos, and traffic notes — we return a strip schedule, overlap recommendation, and hardware
              bill. No obligation sales funnels; engineering-led responses.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-10 py-4 font-headline text-sm font-bold text-white shadow-lg transition-all hover:opacity-95 sm:w-auto"
              >
                Request a quote
              </Link>
              <Link
                href="/pvc-strip-curtains"
                className="inline-flex w-full items-center justify-center rounded-md border border-[#e0c0b1] bg-transparent px-10 py-4 font-headline text-sm font-bold !text-[#051125] transition-colors hover:border-[#FC8347]/50 sm:w-auto"
              >
                Browse PVC range
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e0c0b1]/25 bg-[#f7f9fd] px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/pvc-strip-curtains" className="font-body text-sm font-bold text-[#FC8347] hover:underline">
            ← All PVC products
          </Link>
        </div>
      </div>
    </div>
  );
}
