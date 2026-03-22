"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Forklift,
  Layers,
  MoveHorizontal,
  MoveVertical,
  Palette,
  Ruler,
  Thermometer,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import { PVC_INDUSTRIES, type PvcIndustryId, type PvcProduct } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_12px_32px_rgba(25,28,31,0.08)]";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0GLjJ-Py6dGHbgQPN7rG0O84jqETtprRq02XlmP2CyLk0OGCDmZo4m-yriHof-c6iKG786J4RAV0uFhA588xf6ocgkuIjSa7yip8zygh4u9WwVm3h05z8B-F6Y0YrgyYhNIjnN4G_Q7X7p9hIfEbAiu1xlrsbb0iPTyjb0sS3SQ3x4Y5hpNFRd9rpz9MQd4R1JRZ4CRu5mkc2Y2EQFu-K-wu4Ude0Lt5_bppdi6q_KFAKFt5Up2mPVTwRgt78qZwGUfQSA_USt2g",
  hook: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_QjsEZxuJjF0g6uj7gd7wcl95TY_hkumAPW5L9VPPTKMpeZiEjAAtCLPBeRwHGK3q35tCGCdqIh2N4e3fc0rIZiPTJ6-W9eWb6xqX8CbW16XEEwD2AZxDpvvSqexJ7LXPjcW7GtTI4ZTZABMOotbvzN8f3yjS9PZFBRL_LjfhgtCpmHW9tST3ccCvHrLoHeD1d1BpGrUxUXxtd1U-ZwHa30ByFOp1hbw8m-FmyCJ7zQqYDEmixG4aQTq-LkbJhQu6dwY3rfKzuk",
};

function toSentenceCards(text: string): string[] {
  return text
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
}

function ensurePeriod(s: string): string {
  const t = s.trim();
  if (!t) return t;
  return t.endsWith(".") ? t : `${t}.`;
}

/**
 * Up to three measure steps for the card grid. Splits on ". " then, when only two
 * sentences exist, splits the second on ";" (e.g. height + mast clearance).
 */
function toMeasureStepCards(text: string): string[] {
  const raw = text
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));

  if (raw.length >= 3) return raw.slice(0, 3);

  if (raw.length === 2) {
    const second = raw[1].replace(/\.$/, "");
    if (second.includes(";")) {
      const parts = second
        .split(/\s*;\s*/)
        .map((p) => p.trim())
        .filter(Boolean);
      const mid = parts[0] ? ensurePeriod(parts[0]) : raw[1];
      const last = parts[1]
        ? ensurePeriod(parts[1].replace(/^[a-z]/, (c) => c.toUpperCase()))
        : mid;
      return [raw[0], mid, last].slice(0, 3);
    }
  }

  return raw;
}

const WELDED_SECTION_NAV: PvcPageSectionNavItem[] = [
  { id: "specifications", label: "Specifications", Icon: BarChart3 },
  { id: "dimensions", label: "Dimensions", Icon: Ruler },
  { id: "features", label: "Features", Icon: Zap },
  { id: "material", label: "Material", Icon: Warehouse },
  { id: "lifecycle", label: "Lifecycle", Icon: CircleDot },
];

const MEASURE_CARD_TITLES = ["Width assessment", "Height calculation", "Equipment clearance"] as const;

const TRUST_PILLARS = [
  {
    title: "Quote-led scheduling",
    body: "Lead times and cut dates confirmed after PO — not fixed marketing promises.",
  },
  {
    title: "Freight as quoted",
    body: "Courier or pallet line scoped to your site access and region.",
  },
  {
    title: "Hardware on the BOM",
    body: "Rails, brackets, and strip schedule listed on your acknowledgement.",
  },
  {
    title: "Australia-wide supply",
    body: "Regional installation discussed separately where available.",
  },
] as const;

function FeatureCheck({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 font-body text-sm leading-relaxed text-[#584237]">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FC8347]" strokeWidth={1.75} aria-hidden />
      {children}
    </li>
  );
}

export default function WeldedRackStripDoorLanding({ product }: { product: PvcProduct }) {
  const measureSteps = toMeasureStepCards(product.measureGuide);

  const stripConfigBullets = [
    <>
      <strong className="font-semibold !text-[#051125]">Widths:</strong> {product.stripWidth}
    </>,
    <>
      <strong className="font-semibold !text-[#051125]">Surface:</strong> {product.stripSurface}
    </>,
    <>
      <strong className="font-semibold !text-[#051125]">Colour:</strong> {product.colorGuide}
    </>,
  ];

  const performanceBullets = [
    <>
      <strong className="font-semibold !text-[#051125]">Temperature:</strong> {product.temperatureGuide}
    </>,
    <>
      <strong className="font-semibold !text-[#051125]">Hardware:</strong> {product.stripHead}
    </>,
    <>
      <strong className="font-semibold !text-[#051125]">Logistics:</strong> {product.delivery}
    </>,
  ];

  const specModules: {
    icon: LucideIcon;
    title: string;
    body: string;
    accent?: boolean;
    borderAccent?: boolean;
    extra?: ReactNode;
  }[] = [
    {
      icon: MoveHorizontal,
      title: "How to measure",
      body: product.measureGuide,
      borderAccent: true,
      extra: (
        <div className="mt-4 inline-flex items-center gap-2 bg-[#FC8347]/10 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#051125]">
          <AlertTriangle className="h-3.5 w-3.5 text-[#FC8347]" aria-hidden />
          Rail &amp; mast — confirm on site
        </div>
      ),
    },
    { icon: Palette, title: "Colour guide", body: product.colorGuide },
    { icon: MoveVertical, title: "Strip width", body: product.stripWidth },
    { icon: Layers, title: "Strip surface", body: product.stripSurface },
    {
      icon: Thermometer,
      title: "Temperature suitability",
      body: product.temperatureGuide,
      accent: true,
    },
  ];

  return (
    <article className="bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav
        brandLabel="Welded rack"
        ariaLabel="Welded rack strip door sections"
        items={WELDED_SECTION_NAV}
      />

      {/* Hero */}
      <section id="specifications" className="scroll-mt-40 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <span className="mb-3 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
                Maintenance-first design
              </span>
              <h1 className="font-headline text-4xl font-black leading-tight tracking-tighter !text-[#051125] md:text-5xl lg:text-6xl">
                Welded rack
                <br />
                <span className="!text-[#FC8347]">strip door</span>
              </h1>
              <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-[#584237] md:text-xl">
                {product.intro}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                className={`flex items-start gap-4 rounded-lg border border-[#e6e8ec] bg-white p-5 ${shadowMd}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffdbca]/80 text-[#9d4300]">
                  <Zap className="h-5 w-5" strokeWidth={1.35} aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-[#584237]">
                    Faster changeouts
                  </p>
                  <p className="font-headline text-sm font-bold !text-[#051125]">Hook-on strips</p>
                  <p className="mt-1 font-body text-xs text-[#584237]">
                    Replace individual strips without dismantling the full rail when using compatible hook-on hardware.
                  </p>
                </div>
              </div>
              <div
                className={`flex items-start gap-4 rounded-lg border border-[#e6e8ec] bg-white p-5 ${shadowMd}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffdbca]/80 text-[#9d4300]">
                  <Wrench className="h-5 w-5" strokeWidth={1.35} aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-tight text-[#584237]">
                    Spacing you can trust
                  </p>
                  <p className="font-headline text-sm font-bold !text-[#051125]">Welded rack</p>
                  <p className="mt-1 font-body text-xs text-[#584237]">
                    Pre-set strip spacing reduces tangling in busy forklift lanes — aligned on site measure.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 font-headline text-sm font-bold !text-white shadow-lg transition-opacity hover:opacity-95"
              >
                Request quote
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/pvc-strip-curtains/polar-pvc-strip-curtain"
                className="inline-flex items-center justify-center rounded-md border border-[#e0c0b1] bg-white px-8 py-4 font-headline text-sm font-bold !text-[#051125] hover:border-[#FC8347]/40"
              >
                Polar strip range
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e0e2e6] shadow-2xl`}>
              <Image
                src={IMG.hero}
                alt="Welded rack PVC strip door — hook-on system"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>
            <div
              className={`absolute -bottom-6 -left-4 hidden max-w-xs rounded-lg border border-white/60 bg-white/90 p-5 backdrop-blur-md xl:block ${shadowMd}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
                <p className="font-body text-[10px] font-bold uppercase tracking-wider text-[#FC8347]">
                  Targeted replacement
                </p>
              </div>
              <p className="font-body text-sm font-medium leading-relaxed text-[#584237]">
                Hook-on profiles allow single-strip swaps where the rack and strip type match — confirm series on quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / logistics — no fake stats */}
      <section className="px-6 pb-16 md:px-8 md:pb-24">
        <div
          className={`mx-auto grid max-w-[1440px] grid-cols-2 gap-6 rounded-2xl border border-[#e0c0b1]/20 bg-[#eceef2] p-8 md:grid-cols-4 md:gap-8 md:p-10`}
        >
          {TRUST_PILLARS.map((item) => (
            <div
              key={item.title}
              className="text-center md:border-r md:border-[#e0e2e6] md:last:border-0"
            >
              <p className="font-headline text-sm font-black !text-[#FC8347] md:text-base">{item.title}</p>
              <p className="mt-2 font-body text-[0.65rem] font-bold uppercase leading-snug tracking-widest text-[#584237]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to measure — Dimensions (before key features so nav order matches content) */}
      <section id="dimensions" className="scroll-mt-40 px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">How to measure</h2>
              <p className="mt-4 font-body leading-relaxed text-[#584237]">{product.measureGuide}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FC8347]/10 px-4 py-2 font-body text-xs font-bold uppercase tracking-wider text-[#051125]">
              <MoveHorizontal className="h-4 w-4 text-[#FC8347]" aria-hidden />
              Rail + mast clearance
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {measureSteps.map((sentence, i) => {
              return (
                <li
                  key={i}
                  className={`rounded-xl border border-[#eceef2] bg-white p-8 ${shadowMd}`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FC8347] font-headline text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-6 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-[#e0c0b1] bg-[#f2f4f8]">
                    {i === 0 ? (
                      <div className="relative flex h-1/2 w-2/3 items-center justify-center border-x-4 border-t-4 border-[#FC8347]/40">
                        <MoveHorizontal className="h-12 w-12 text-[#FC8347]/40" strokeWidth={1} aria-hidden />
                        <div className="absolute -bottom-4 h-0.5 w-full bg-[#FC8347]" aria-hidden />
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] font-bold uppercase text-[#FC8347]">
                          Rail width
                        </span>
                      </div>
                    ) : i === 1 ? (
                      <div className="relative flex h-2/3 w-1/2 flex-col items-center justify-center border-t-4 border-[#FC8347]/40">
                        <MoveVertical className="h-12 w-12 text-[#FC8347]/40" strokeWidth={1} aria-hidden />
                        <div
                          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-[#FC8347]"
                          aria-hidden
                        />
                        <span className="absolute -right-14 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-body text-[10px] font-bold uppercase text-[#FC8347]">
                          Total height
                        </span>
                      </div>
                    ) : (
                      <div className="relative flex h-3/4 w-3/4 items-center justify-center gap-4">
                        <div className="h-full w-1/3 border-r-2 border-[#FC8347] bg-[#FC8347]/10" aria-hidden />
                        <Forklift className="h-12 w-12 shrink-0 text-[#FC8347]/40" strokeWidth={1} aria-hidden />
                        <div className="h-full w-1/3 border-l-2 border-[#FC8347] bg-[#FC8347]/10" aria-hidden />
                      </div>
                    )}
                  </div>
                  <h3 className="font-headline font-bold !text-[#051125]">
                    {MEASURE_CARD_TITLES[i] ?? `Step ${i + 1}`}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{sentence}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Key features — checklist overview */}
      <section
        id="features"
        className="scroll-mt-40 border-y border-[#e0c0b1]/15 bg-[#f2f4f8] px-6 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 block font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
                Engineered for performance
              </span>
              <h2 className="font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
                Key features
              </h2>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-[#e0e2e6]/50 px-6 py-4">
              <BadgeCheck className="h-6 w-6 shrink-0 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
              <span className="font-body text-sm font-bold uppercase tracking-widest text-[#051125]">
                Industrial-grade specification
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-12">
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FC8347]/10">
                <MoveHorizontal className="h-6 w-6 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
              </div>
              <h3 className="font-headline text-xl font-bold !text-[#051125]">How to measure</h3>
              <ul className="list-none space-y-4">
                {measureSteps.map((line, i) => (
                  <FeatureCheck key={i}>{line}</FeatureCheck>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FC8347]/10">
                <Layers className="h-6 w-6 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
              </div>
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Strip configuration</h3>
              <ul className="list-none space-y-4">
                {stripConfigBullets.map((node, i) => (
                  <FeatureCheck key={i}>{node}</FeatureCheck>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FC8347]/10">
                <Thermometer className="h-6 w-6 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
              </div>
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Performance &amp; delivery</h3>
              <ul className="list-none space-y-4">
                {performanceBullets.map((node, i) => (
                  <FeatureCheck key={i}>{node}</FeatureCheck>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div id="material" className="scroll-mt-40">
      {/* Technical documentation — spec modules + structural sidebar */}
      <section className="bg-white px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e0c0b1]/30 pb-4">
              <h2 className="font-headline text-xl font-black uppercase italic tracking-widest !text-[#051125]">
                Technical documentation
              </h2>
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#FC8347]">
                Draft — confirm on quote / PO
              </span>
            </div>
            {specModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className={`mb-4 border border-[#e0c0b1]/30 bg-white p-8 ${
                    mod.borderAccent ? "border-l-4 border-l-[#f97316]" : "border-l-4 border-l-[#cbd5e1]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Icon
                      className={`h-8 w-8 shrink-0 md:h-9 md:w-9 ${mod.accent ? "text-[#FC8347]" : "text-[#584237]"}`}
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`mb-3 font-headline text-lg font-bold uppercase tracking-tight ${
                          mod.accent ? "!text-[#FC8347]" : "!text-[#051125]"
                        }`}
                      >
                        {mod.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-[#584237]">{mod.body}</p>
                      {mod.extra}
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="pt-2 font-body text-xs text-[#584237]">
              For drawings, fixing centres, and compliance cross-checks, see our{" "}
              <Link href="/technical" className="font-semibold !text-[#FC8347] underline-offset-2 hover:underline">
                technical hub
              </Link>{" "}
              or request a pack with your enquiry.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-[7.5rem] border border-[#e0c0b1]/30 bg-white p-8">
              <h2 className="mb-8 font-headline text-xl font-black uppercase tracking-tight !text-[#051125]">
                Structural reference
              </h2>
              <div className="relative mb-8 aspect-square overflow-hidden border border-[#e0c0b1]/20 bg-[#f2f4f8]">
                <Image
                  src={IMG.hook}
                  alt="Structural schematic — welded rack strip door"
                  fill
                  className="object-cover grayscale opacity-80 mix-blend-multiply"
                  sizes="(max-width:1024px) 100vw, 33vw"
                  unoptimized
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
                  <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-[#FC8347]/25">
                    <span className="max-w-[10rem] text-center font-mono text-[10px] font-bold uppercase leading-tight text-[#FC8347]">
                      Assembly reference — detail on quote
                    </span>
                  </div>
                </div>
              </div>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#9d4300] font-headline text-xs font-black text-white">
                    01
                  </div>
                  <div>
                    <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-[#051125]">
                      Strip head architecture
                    </h4>
                    <p className="font-body text-xs leading-relaxed text-[#584237]">{product.stripHead}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#9d4300] font-headline text-xs font-black text-white">
                    02
                  </div>
                  <div>
                    <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-[#051125]">
                      Delivery &amp; logistics
                    </h4>
                    <p className="font-body text-xs leading-relaxed text-[#584237]">{product.delivery}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {product.colorByIndustry ? (
          <ul className="mx-auto mt-12 max-w-[1440px] space-y-3 border-t border-[#e0c0b1]/25 pt-10">
            {(Object.entries(product.colorByIndustry) as [PvcIndustryId, string][])
              .filter(([, t]) => t?.trim())
              .map(([id, text]) => {
                const label = PVC_INDUSTRIES.find((x) => x.id === id)?.label ?? id;
                return (
                  <li key={id} className="font-body text-sm text-[#584237]">
                    <span className="font-semibold !text-[#051125]">{label}:</span> {text}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </section>

      {/* Structure */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#e0e2e6] shadow-xl ring-1 ring-[#e0e2e6]">
            <Image
              src={IMG.hook}
              alt="PVC strip being hooked onto a welded rack"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div>
            <h2 className="mb-10 font-headline text-3xl font-black tracking-tight !text-[#051125] md:text-4xl">
              Structural integrity
            </h2>
            <ul className="space-y-10">
              <li className="group flex gap-6 md:gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#ffdbca] font-headline text-xl font-black text-[#9d4300] transition-colors group-hover:bg-gradient-to-br group-hover:from-[#051125] group-hover:to-[#FC8347] group-hover:!text-white">
                  01
                </div>
                <div>
                  <h4 className="mb-3 font-headline text-xl font-bold !text-[#051125]">Strip head architecture</h4>
                  <p className="font-body leading-relaxed text-[#584237]">{product.stripHead}</p>
                </div>
              </li>
              <li className="group flex gap-6 md:gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#ffdbca] font-headline text-xl font-black text-[#9d4300] transition-colors group-hover:bg-gradient-to-br group-hover:from-[#051125] group-hover:to-[#FC8347] group-hover:!text-white">
                  02
                </div>
                <div>
                  <h4 className="mb-3 font-headline text-xl font-bold !text-[#051125]">Delivery &amp; logistics</h4>
                  <p className="font-body leading-relaxed text-[#584237]">{product.delivery}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      </div>

      {/* Lifecycle */}
      <section id="lifecycle" className="scroll-mt-40 border-y border-[#e0c0b1]/15 bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-headline text-3xl font-black !text-[#051125] md:text-4xl">Project lifecycle</h2>
          </div>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Status and dates are confirmed in your quote pack — not live order tracking on this marketing page."
          />
        </div>
      </section>

      {product.gallery.length > 0 ? (
        <section className="px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="mb-8 font-headline text-2xl font-bold !text-[#051125]">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#e6e8ec]">
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
      ) : null}

      <section className="border-t border-[#e0c0b1]/30 bg-white px-6 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
