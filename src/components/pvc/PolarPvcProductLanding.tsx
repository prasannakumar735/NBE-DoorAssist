"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CircleDot,
  Download,
  DoorOpen,
  Footprints,
  Palette,
  Percent,
  Ruler,
  Snowflake,
  SunMedium,
  Zap,
  Warehouse,
  UtensilsCrossed,
  Store,
} from "lucide-react";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import { PVC_INDUSTRIES, type PvcIndustryId, type PvcProduct } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

/** Split prose into sentences for visual step / highlight cards */
function toSentenceCards(text: string): string[] {
  return text
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
}

const MEASURE_STEP_ICONS: LucideIcon[] = [Ruler, Percent, DoorOpen];

const INDUSTRY_CARD: Record<
  PvcIndustryId,
  { Icon: LucideIcon; href: string; accent: string }
> = {
  retail: { Icon: Store, href: "/pvc-strip-curtains/industry/retail", accent: "from-[#FC8347]/12 to-transparent" },
  food: {
    Icon: UtensilsCrossed,
    href: "/pvc-strip-curtains/industry/food",
    accent: "from-[#006398]/10 to-transparent",
  },
  "cold-room": {
    Icon: Snowflake,
    href: "/pvc-strip-curtains/industry/cold-room",
    accent: "from-[#051125]/8 to-transparent",
  },
};

const IMG = {
  ribbed:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC0YzD30DFZ8_XroiKRu1lOTea1TDua8LqL6yrPhKNkbF40wlyI9O0N3zfwrC4BSCRdQS0JYeGXcZNZbe8Nd2wYEFf5uv3Yh0qcmLoaXTBKLZXJceqVGHH-tanzRmR0rVGSfcYEHiUK8mFbEujHBM4Nu7DbmxuV_PN9NlceRbHW2gkxgBAtRF_RWi555RKxapprYmzaVvCMWO7IEOgVt6szlqDJMpKW0fPBsutd23A7Yni_asxR9PTx8V0dS9TyOxKWnL5t55cEvaQ",
  flat: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcFXJ26y5rP44zLs7qzYpUTTuyx11UM_pPGxY4KNwYHrGtuO5HARhG_Kia6obVETcYpYyl_bH2_5wPVcc7pfwPq6knG70QuX7tZY09Thnji0028e1H0kDR_-AiHyRkM8AXWpA5zj-Z5IDbohir2mSu9lOLAmOdOUtR24xvJcXbUgU7rVrFSvzSinWFrdZx00N5MLpobKLeQXiOE01qBkq9D1An3ufxzc9XbA3zrhhT7vP2B-nJiyQlo6EfguWXv_-b3CK67PDHxgE",
  gal1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuV-MPJ3lCFbUI0GbxSl86Wj4pELgDzPoobVi_NpJI92GghaCfED9q1acDxmJkX7MPl1UzDRQ53-bB1dZJkaslQwEd2-8cIqrrzEDLW-03sLq2a6VyscvAObdjuqDY32qOzwS8g5wtD2WVnkkp_74Puan4KrKnZX6xDPgFiaz_z7l8dkTrxptubCHKCvO5x5WYr909840oYXycMTJfEtt4ri2GxRz-cJF7M-xXE70q4I_rJsmEc3TQZ3Nx8EMUjFATotEpsX8_dM4",
  gal2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAElb5awJFJsFpp--iUuT6JKCpoT-yGM3UnsFwuhnDwXLR1O21D45euFN0rLXLycpi26rzGgyQo3VwFmNGatwegjUESPmlmImppBRIvKYQ9vS4zADOJfAX3gl3Tr_uyBuNw-bdBFYdXvJW4lwSsIAtiYAaSUGQTRD_A27hwaOYxuBRpnRNnfL1lw1aZ-IYNL8cVwhb70RIEnLViEnlJiVioLs8CMR3tviTj1bIB02o-NJt30MBwurwmp03TkLMRbjJxdUgSUgU1FlE",
};

const POLAR_SECTION_NAV: PvcPageSectionNavItem[] = [
  { id: "specifications", label: "Specifications", Icon: BarChart3 },
  { id: "dimensions", label: "Dimensions", Icon: Ruler },
  { id: "features", label: "Features", Icon: Zap },
  { id: "material", label: "Material", Icon: Warehouse },
  { id: "lifecycle", label: "Lifecycle", Icon: CircleDot },
];

const FEATURES = [
  {
    title: "Low-temperature flexibility",
    body: "Polar compounds are selected for chill and freezer approaches — impact behaviour confirmed against your traffic and threshold on datasheet.",
    Icon: Snowflake,
  },
  {
    title: "Thermal separation",
    body: "Overlapped strips reduce air exchange versus an open doorway; savings depend on opening discipline, overlap %, and plant load.",
    Icon: Zap,
  },
  {
    title: "Traffic visibility",
    body: "Clear and tinted grades support sight lines for mixed pedestrian / FLT zones — strip width and overlap sized on measure.",
    Icon: Footprints,
  },
  {
    title: "UV & ageing",
    body: "Stabiliser packages vary by grade; outdoor-adjacent or high-UV interiors are flagged on enquiry so the right compound is quoted.",
    Icon: SunMedium,
  },
] as const;

export default function PolarPvcProductLanding({ product }: { product: PvcProduct }) {
  const measureSteps = toSentenceCards(product.measureGuide);
  const colourHighlights = toSentenceCards(product.colorGuide);

  return (
    <article className="bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav brandLabel="Polar grade" ariaLabel="Polar PVC page sections" items={POLAR_SECTION_NAV} />

      {/* Hero */}
      <section id="specifications" className="scroll-mt-40 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4">
            <span className="inline-block rounded-sm bg-[#FC8347]/20 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#584237]">
              Low-temperature PVC
            </span>
          </div>
          <h1 className="font-headline text-4xl font-bold leading-[1.02] tracking-tighter !text-[#051125] md:text-6xl lg:text-7xl">
            Polar grade PVC —{" "}
            <span className="!text-[#FC8347]">thermal shield</span>
          </h1>
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-[#584237] md:text-xl">
            {product.intro} Specified for cold rooms, freezer approaches, and high-traffic chill openings — cut lists and
            overlap follow your measure pack.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 font-headline text-sm font-bold !text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.99]"
            >
              Request quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/technical"
              className="inline-flex items-center gap-2 rounded-lg bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-bold !text-[#051125] transition-colors hover:bg-[#e0e2e6] active:scale-[0.99]"
            >
              <Download className="h-5 w-5" aria-hidden />
              Technical docs
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture + data card */}
      <section className="bg-[#eceef2] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="mb-8 border-l-4 border-[#FC8347] pl-6 font-headline text-2xl font-bold uppercase tracking-tight !text-[#051125] md:text-3xl">
              Technical overview
            </h2>
            <div className="space-y-6 font-body text-base leading-relaxed text-[#584237] md:text-lg">
              <p>
                Polar-grade flexible PVC is used where standard strip would stiffen or craze at low temperatures. We match
                compound to the coldest surface the strip sees — not room air alone — and to your traffic (pedestrian,
                trolley, or FLT).
              </p>
              <p>
                Extruded strip is cut to height with controlled overlap so strips re-seat after passage and maintain a
                practical seal. Final overlap % and strip width are engineering outputs from your opening size and wind /
                pressure context.
              </p>
              <p>
                Optional tints and ribbed faces support zoning, glare control, and scuff masking in busy lanes. Cleaning
                chemistry compatibility is confirmed for food-adjacent sites.
              </p>
              <p className="font-medium !text-[#051125]">{product.temperatureGuide}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className={`rounded-lg bg-white p-8 ${shadowMd}`}>
              <h3 className="mb-6 flex items-center gap-2 font-headline text-xl font-bold !text-[#051125]">
                <BarChart3 className="h-6 w-6 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
                At-a-glance
              </h3>
              <dl className="space-y-0 divide-y divide-[#e0c0b1]/25 font-body text-sm">
                <div className="flex items-center justify-between py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#584237]">Temperature</dt>
                  <dd className="text-right font-headline text-lg font-bold text-[#FC8347]">Datasheet-led</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#584237]">Typical strip width</dt>
                  <dd className="font-headline text-lg font-bold !text-[#051125]">200–400 mm</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#584237]">Thickness</dt>
                  <dd className="font-headline text-lg font-bold !text-[#051125]">Per line card</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#584237]">Compound</dt>
                  <dd className="font-headline text-lg font-bold !text-[#051125]">Polar flexible PVC</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#584237]">Clarity</dt>
                  <dd className="font-headline text-lg font-bold !text-[#051125]">Grade-dependent</dd>
                </div>
              </dl>
              <p className="mt-6 font-body text-xs text-[#584237]">
                Numeric certificates and light-transmission values are issued with your quote pack where required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Measure + colour — elevated layout */}
      <section id="dimensions" className="scroll-mt-40 border-y border-[#e0c0b1]/15 bg-gradient-to-b from-[#f7f9fd] via-white to-[#f7f9fd] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-center font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347] md:text-left">
            Specification notes
          </p>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            {/* How to measure */}
            <div>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-bold tracking-tight !text-[#051125] md:text-3xl">
                    How to measure
                  </h2>
                  <p className="mt-2 max-w-md font-body text-sm text-[#584237]">
                    Three checkpoints we use on every polar opening — your quote pack refines numbers after photos.
                  </p>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-[#FC8347]/40 to-transparent sm:block md:max-w-[120px]" />
              </div>
              <ol className="space-y-4">
                {measureSteps.map((sentence, i) => {
                  const Icon = MEASURE_STEP_ICONS[i % MEASURE_STEP_ICONS.length];
                  const stepNum = i + 1;
                  return (
                    <li
                      key={i}
                      className={`group relative overflow-hidden rounded-2xl border border-[#e0c0b1]/25 bg-white/90 p-5 pr-6 pt-6 sm:p-6 sm:pr-10 ${shadowMd} transition-all duration-300 hover:border-[#FC8347]/35 hover:shadow-[0_12px_40px_rgba(5,17,37,0.08)]`}
                    >
                      {/* Large step index — background watermark */}
                      <span
                        className="pointer-events-none absolute -right-1 bottom-0 select-none font-headline text-[4.5rem] font-black leading-none tracking-tighter text-[#051125]/[0.06] sm:-right-2 sm:text-[6rem] md:text-[7rem]"
                        aria-hidden
                      >
                        {String(stepNum).padStart(2, "0")}
                      </span>
                      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#FC8347]/[0.05] transition-transform duration-500 group-hover:scale-110" />
                      <div className="relative flex items-start gap-4">
                        {/* Icon tile only — sits beside copy; step shown in background */}
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FC8347] shadow-sm ring-1 ring-[#FC8347]/15">
                          <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                        </span>
                        <p className="min-w-0 flex-1 pb-1 font-body text-[0.9375rem] leading-relaxed text-[#584237] md:text-base">
                          <span className="sr-only">Step {stepNum}. </span>
                          {sentence}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Colour & tint */}
            <div>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FC8347] to-[#e6733d] text-white shadow-md shadow-[#FC8347]/20">
                    <Palette className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-headline text-2xl font-bold tracking-tight !text-[#051125] md:text-3xl">
                      Colour &amp; tint
                    </h2>
                    <p className="mt-2 max-w-md font-body text-sm text-[#584237]">
                      Tint and finish choices affect visibility, zoning, and how scuffs read in your aisles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                {colourHighlights.map((line, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-2xl border border-[#e0c0b1]/20 bg-white/80 p-4 backdrop-blur-sm transition hover:border-[#FC8347]/25"
                  >
                    <span
                      className="mb-2 inline-block font-body text-[0.65rem] font-bold uppercase tracking-widest text-[#FC8347]"
                      aria-hidden
                    >
                      {i === 0 ? "Clarity" : i === 1 ? "Zoning" : "Finish"}
                    </span>
                    <p className="font-body text-xs leading-relaxed text-[#584237] md:text-[0.8125rem]">{line}</p>
                  </div>
                ))}
              </div>

              {product.colorByIndustry ? (
                <div>
                  <p className="mb-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#584237]">
                    By sector
                  </p>
                  <ul className="space-y-4">
                    {(Object.entries(product.colorByIndustry) as [PvcIndustryId, string][])
                      .filter(([, text]) => text?.trim())
                      .map(([id, text]) => {
                        const label = PVC_INDUSTRIES.find((ind) => ind.id === id)?.label ?? id;
                        const meta = INDUSTRY_CARD[id];
                        const Icon = meta.Icon;
                        return (
                          <li key={id}>
                            <Link
                              href={meta.href}
                              className={`group flex gap-4 overflow-hidden rounded-2xl border border-[#e0c0b1]/25 bg-white p-5 ${shadowMd} transition-all duration-300 hover:border-[#FC8347]/40 hover:shadow-[0_14px_44px_rgba(5,17,37,0.09)]`}
                            >
                              <div
                                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} ring-1 ring-[#e0c0b1]/20`}
                              >
                                <Icon className="h-7 w-7 text-[#051125] opacity-90" strokeWidth={1.35} aria-hidden />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-headline text-base font-bold !text-[#051125]">{label}</span>
                                  <ArrowRight className="h-4 w-4 text-[#FC8347] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                                </div>
                                <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{text}</p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20">
            <div
              className={`rounded-2xl border border-[#e0c0b1]/20 bg-gradient-to-br from-white to-[#f7f9fd] p-6 md:p-8 ${shadowMd}`}
            >
              <h3 className="font-headline text-lg font-bold !text-[#051125]">Strip head &amp; rails</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#584237] md:text-[0.9375rem]">{product.stripHead}</p>
            </div>
            <div
              className={`rounded-2xl border border-[#e0c0b1]/20 bg-gradient-to-br from-white to-[#f7f9fd] p-6 md:p-8 ${shadowMd}`}
            >
              <h3 className="font-headline text-lg font-bold !text-[#051125]">Delivery</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#584237] md:text-[0.9375rem]">{product.delivery}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-40 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-body text-sm font-bold uppercase tracking-widest text-[#FC8347]">
            Engineered features
          </h2>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Fi = f.Icon;
              return (
                <li
                  key={f.title}
                  className="rounded-lg bg-[#eceef2] p-8 transition-colors hover:bg-[#e6e8ec]"
                >
                  <Fi className="mb-4 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                  <h4 className="font-headline text-lg font-bold !text-[#051125]">{f.title}</h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{f.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Material + industries + gallery */}
      <section id="material" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-8 font-headline text-3xl font-bold tracking-tighter !text-[#051125] md:text-4xl">
              Strip surface
            </h2>
            <p className="mb-8 font-body text-[#584237]">{product.stripSurface}</p>
            <div className="space-y-6">
              <div className="rounded-lg border-2 border-[#FC8347] bg-white p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h4 className="font-headline text-xl font-bold !text-[#051125]">Ribbed (anti-scratch)</h4>
                  <span className="shrink-0 rounded-sm bg-[#FC8347] px-2 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-white">
                    FLT lanes
                  </span>
                </div>
                <p className="mb-4 font-body text-sm text-[#584237]">
                  Ribs take first contact from pallets and trolleys, keeping the visual face cleaner for longer in busy
                  aisles.
                </p>
                <div className="relative h-28 w-full overflow-hidden rounded-md bg-[#e6e8ec]">
                  <Image src={IMG.ribbed} alt="Ribbed PVC strip texture" fill className="object-cover" sizes="50vw" unoptimized />
                </div>
              </div>
              <div className="rounded-lg border border-[#e0c0b1]/40 bg-white p-6">
                <h4 className="font-headline text-xl font-bold !text-[#051125]">Standard flat</h4>
                <p className="mt-2 font-body text-sm text-[#584237]">
                  Smooth face for maximum clarity and simple cleaning — common in lighter-traffic chill openings. For
                  hook-on rack systems see{" "}
                  <Link href="/pvc-strip-curtains/welded-rack-strip-door" className="font-semibold text-[#FC8347] hover:underline">
                    welded rack strip doors
                  </Link>
                  .
                </p>
                <div className="relative mt-4 h-28 w-full overflow-hidden rounded-md bg-[#e6e8ec]">
                  <Image src={IMG.flat} alt="Smooth clear PVC strip" fill className="object-cover" sizes="50vw" unoptimized />
                </div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl bg-[#eceef2] p-8 md:p-12 ${shadowMd}`}>
            <h3 className="mb-6 font-headline text-2xl font-bold !text-[#051125]">Where it&apos;s used</h3>
            <ul className="space-y-4">
              <li className={`flex items-center gap-4 rounded-lg bg-white p-4 ${shadowMd}`}>
                <Snowflake className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                <span className="font-headline font-semibold !text-[#051125]">Cold storage &amp; freezers</span>
              </li>
              <li className={`flex items-center gap-4 rounded-lg bg-white p-4 ${shadowMd}`}>
                <UtensilsCrossed className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                <span className="font-headline font-semibold !text-[#051125]">Food processing</span>
              </li>
              <li className={`flex items-center gap-4 rounded-lg bg-white p-4 ${shadowMd}`}>
                <Store className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                <span className="font-headline font-semibold !text-[#051125]">Retail &amp; supermarkets</span>
              </li>
            </ul>
            <p className="mt-8 font-body text-sm text-[#584237]">{product.stripWidth}</p>
            <div className="mt-10">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[0.2em] text-[#584237]">
                Application gallery
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 overflow-hidden rounded-lg bg-[#e6e8ec]">
                  <Image
                    src={IMG.gal1}
                    alt="Industrial freezer approach with strip curtains"
                    fill
                    className="object-cover"
                    sizes="25vw"
                    unoptimized
                  />
                </div>
                <div className="relative h-40 overflow-hidden rounded-lg bg-[#e6e8ec]">
                  <Image
                    src={IMG.gal2}
                    alt="Logistics loading dock with strip curtains"
                    fill
                    className="object-cover"
                    sizes="25vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="lifecycle" className="scroll-mt-40 border-y border-[#e0c0b1]/10 bg-[#eceef2] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center font-headline text-3xl font-bold uppercase tracking-tighter !text-[#051125] md:mb-14 md:text-4xl">
            End-to-end lifecycle
          </h2>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Milestones and freight are confirmed on your quote acknowledgement and updated if scope changes."
          />
        </div>
      </section>

      {/* Catalog gallery from product */}
      {product.gallery.length > 0 ? (
        <section className="px-6 py-14 md:px-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-headline text-2xl font-bold !text-[#051125]">More imagery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#e6e8ec]">
                  <Image
                    src={src}
                    alt={`${product.name} — photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[#e0c0b1]/30 bg-white px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/pvc-strip-curtains"
            className="font-body text-sm font-semibold !text-[#051125] underline decoration-[#e0c0b1]/50 hover:text-[#FC8347]"
          >
            ← All PVC products
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pvc-strip-curtains/help/buying"
              className="inline-flex justify-center rounded-md border border-[#e0c0b1] px-5 py-2.5 font-headline text-sm font-bold !text-[#051125] hover:border-[#FC8347]/50"
            >
              Help on buying
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-md bg-[#FC8347] px-6 py-2.5 font-headline text-sm font-bold text-white hover:opacity-90"
            >
              Get quote
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
