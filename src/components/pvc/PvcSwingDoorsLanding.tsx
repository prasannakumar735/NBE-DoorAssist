"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  BarChart3,
  Box,
  CircleDot,
  Construction,
  Download,
  Eye,
  LayoutGrid,
  RotateCcw,
  Ruler,
  Shield,
  Thermometer,
  Warehouse,
  Zap,
} from "lucide-react";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import type { PvcProduct } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBINHQt4vUHIegrneNE-CeEbw7gwr97WQzzHvhNixn3m4O2EOTVRx0hA_KZdB4B_VechcqQULBXoO2XSInviLArVkfbPfPD9_9Qm0n4ttUltfDzBLNxPXDS8zWAivu9vVbkRclxt3EYUZ29Ao1LlfBCGs9KWt672x6_YS-m4UqRXw00P5kgx2FBO0ASSgyTWpMIIp_MUf29y2oenlTxPOVRfifXfRltYCrpFTFkVR-dWMsYZoDKrqJ6gC9vTjYtQxDf7oLmu_ihkmo";

const SWING_SECTION_NAV: PvcPageSectionNavItem[] = [
  { id: "specifications", label: "Specifications", Icon: BarChart3 },
  { id: "dimensions", label: "Dimensions", Icon: Ruler },
  { id: "features", label: "Features", Icon: Zap },
  { id: "material", label: "Material", Icon: Warehouse },
  { id: "lifecycle", label: "Lifecycle", Icon: CircleDot },
];

const BENEFITS = [
  {
    title: "High visibility",
    body: "Clear PVC leaves support two-way sight lines in busy lanes — width and vision zones sized on measure.",
    Icon: Eye,
  },
  {
    title: "Impact aware",
    body: "Flexible panels absorb knocks better than rigid doors; buffers and kick protection can be added for FLT zones.",
    Icon: Shield,
  },
  {
    title: "Thermal separation",
    body: "Helps reduce air transfer versus an open doorway; savings depend on traffic, pressure balance, and seal detail.",
    Icon: Thermometer,
  },
  {
    title: "Hands-free options",
    body: "Spring-assisted return can be specified where traffic should not stop to close the leaf — duty matched on quote.",
    Icon: Accessibility,
  },
] as const;

const CORE_FEATURES = [
  {
    title: "Spring & hinge options",
    body: "Return force and speed are set for your pressure and traffic context — not a single factory default.",
    Icon: RotateCcw,
  },
  {
    title: "Reinforced pivots",
    body: "Heavy-duty bearings and pivot sets for high-frequency pedestrian and light FLT routes when specified.",
    Icon: Construction,
  },
  {
    title: "Kick buffers",
    body: "Replaceable wear strips or buffers protect the lower curtain from pallet trucks and trolleys.",
    Icon: Box,
  },
  {
    title: "Vision panels",
    body: "Full-width clear sections where the line allows — confirm height bands and mullions on drawings.",
    Icon: LayoutGrid,
  },
] as const;

const SWATCHES = [
  { label: "Clear", className: "border-2 border-[#e6e8ec] bg-white/80 backdrop-blur-sm" },
  { label: "Blue", className: "bg-blue-600" },
  { label: "Red", className: "bg-red-600" },
  { label: "Grey", className: "bg-slate-500" },
] as const;

const GALLERY_ALTS = [
  "Double PVC swing doors in a logistics hub",
  "Clear PVC swing door between retail floor and back storage",
  "PVC swing door in a food facility",
] as const;

export default function PvcSwingDoorsLanding({ product }: { product: PvcProduct }) {
  return (
    <article className="bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav
        brandLabel="PVC swing doors"
        ariaLabel="PVC swing doors page sections"
        items={SWING_SECTION_NAV}
      />

      {/* Hero — specifications anchor */}
      <section id="specifications" className="relative scroll-mt-40">
        <div className="relative min-h-[420px] overflow-hidden md:min-h-[520px] lg:min-h-[600px]">
          <div className="absolute inset-0 bg-[#f2f4f8]">
            <Image
              src={HERO_IMG}
              alt="Industrial clear PVC swing doors in a warehouse corridor"
              fill
              className="object-cover opacity-90 mix-blend-multiply"
              priority
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fd] via-[#f7f9fd]/85 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
            <div className="max-w-2xl">
              <span className="mb-4 block font-body text-xs font-bold uppercase tracking-[0.25em] text-[#FC8347]">
                Engineered access
              </span>
              <h1 className="font-headline text-4xl font-bold leading-none tracking-tighter !text-[#051125] md:text-5xl lg:text-[3.5rem]">
                PVC swing doors
              </h1>
              <p className="mt-6 font-body text-lg leading-relaxed text-[#584237] md:text-xl">{product.intro}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 font-headline text-sm font-bold !text-white shadow-md transition-opacity hover:opacity-95"
                >
                  Request quote
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link
                  href="/technical"
                  className="inline-flex items-center gap-2 rounded-md bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-bold !text-[#051125] transition-colors hover:bg-[#e0e2e6]"
                >
                  <Download className="h-5 w-5" aria-hidden />
                  Technical docs
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => {
              const Bi = b.Icon;
              return (
                <li key={b.title}>
                  <Bi className="mb-4 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                  <h3 className="font-headline text-lg font-bold !text-[#051125]">{b.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{b.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Dimensions + architecture */}
      <section id="dimensions" className="scroll-mt-40 bg-[#eceef2] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <h2 className="mb-8 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">Technical architecture</h2>
            <div className="space-y-6 font-body leading-relaxed text-[#584237]">
              <p>
                PVC swing doors suit openings where you need a flexible barrier without power — common in warehousing,
                retail back-of-house, and wash-down-adjacent corridors. Leaves are built from cold-crack–rated flexible PVC
                where temperatures demand it; frame and pivot specification follows your measure pack and traffic case.
              </p>
              <p>
                Spring-assisted or gravity return can be selected to suit differential pressure and pedestrian flow. Closing
                force is adjusted on site within safe limits so the leaf stays controlled in breezy doorways without being
                tiring to open.
              </p>
              <p>
                Thickness and compound are quoted against the coldest surface the curtain sees and your cleaning program.
                High-clarity vision bands and coloured buffers at kick height remain options for mixed FLT and pedestrian
                routes — details on drawings, not generic marketing numbers.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className={`rounded-lg border-t-4 border-[#FC8347] bg-white p-8 ${shadowMd}`}>
              <h3 className="mb-6 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">Specifications</h3>
              <dl className="space-y-0 divide-y divide-[#e0c0b1]/25 font-body text-sm">
                {[
                  ["Application", "Warehouse / retail / food-adjacent"],
                  ["Typical max width (guide)", "Up to 3000 mm — confirm on quote"],
                  ["Typical max height (guide)", "Up to 3500 mm — confirm on quote"],
                  ["Actuation", "Manual; spring-assisted where specified"],
                  ["Duty / cycles", "Matched to traffic case on datasheet"],
                  ["Leaf material", "Heavy-duty flexible PVC — grade on PO"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-4">
                    <dt className="font-medium !text-[#051125]">{k}</dt>
                    <dd className="text-right text-[#584237]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-body text-xs text-[#584237]">
                Figures are indicative; signed drawings and hardware schedule follow your order acknowledgement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-40 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <h2 className="mb-12 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">Core features</h2>
            <ul className="grid grid-cols-1 gap-8">
              {CORE_FEATURES.map((f) => {
                const Fi = f.Icon;
                return (
                  <li key={f.title} className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e6e8ec]">
                      <Fi className="h-6 w-6 text-[#9d4300]" strokeWidth={1.25} aria-hidden />
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-semibold !text-[#051125]">{f.title}</h4>
                      <p className="mt-2 font-body text-sm leading-relaxed text-[#584237]">{f.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={`flex flex-col justify-center rounded-xl bg-[#eceef2] p-10 md:p-12 ${shadowMd}`}>
            <h2 className="mb-6 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">Control options</h2>
            <h3 className="mb-4 font-headline text-lg font-semibold text-[#FC8347]">Tension-adjustable spring hinge</h3>
            <p className="mb-8 font-body leading-relaxed text-[#584237]">
              Spring sets can be tuned for return speed and resistance so the door behaves under stack pressure or
              breeze without slamming. Final settings are validated on site with your OHS context.
            </p>
            <div className="border-l-4 border-[#FC8347] bg-white p-6 font-body text-sm italic text-[#584237]">
              Tip: share differential pressure readings and busiest traffic windows on enquiry — we size hardware for the
              real load, not a generic catalogue row.
            </div>
          </div>
        </div>
      </section>

      {/* Material — colours */}
      <section id="material" className="scroll-mt-40 bg-[#eceef2] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">Curtain colours</h2>
          <p className="mb-12 font-body text-[#584237]">{product.colorGuide}</p>
          <ul className="flex flex-wrap justify-center gap-10">
            {SWATCHES.map((s) => (
              <li key={s.label} className="flex flex-col items-center">
                <div className={`mb-4 h-24 w-24 rounded-lg shadow-sm ${s.className}`} aria-hidden />
                <span className="font-body text-xs font-bold uppercase tracking-widest text-[#584237]">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl font-body text-sm text-[#584237]">{product.stripSurface}</p>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="lifecycle" className="scroll-mt-40 border-y border-[#e0c0b1]/15 bg-[#f7f9fd] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-headline text-2xl font-black !text-[#051125] md:text-3xl">End-to-end lifecycle</h2>
          </div>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Milestones and dates are confirmed in your quote pack — not live order tracking on this page."
          />
        </div>
      </section>

      {/* Gallery */}
      {product.gallery.length > 0 ? (
        <section className="bg-[#eceef2] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 font-headline text-2xl font-bold !text-[#051125] md:text-3xl">Industrial gallery</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((src, i) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-lg bg-[#e0e2e6]">
                  <Image
                    src={src}
                    alt={GALLERY_ALTS[i] ?? `${product.name} — ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="px-6 py-16 text-center md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Ready to scope your opening?</h2>
          <p className="mt-6 font-body text-lg text-[#584237]">
            Talk to our team with rough sizes and photos — we&apos;ll come back with a configuration and quote path that
            matches your facility.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-[#051125] to-[#FC8347] px-10 py-5 font-headline text-sm font-bold !text-white shadow-lg transition-opacity hover:opacity-95"
            >
              Request quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/technical"
              className="inline-flex items-center gap-2 rounded-md bg-[#e6e8ec] px-10 py-5 font-headline text-sm font-bold !text-[#051125] hover:bg-[#e0e2e6]"
            >
              <Download className="h-5 w-5" aria-hidden />
              Technical docs
            </Link>
          </div>
        </div>
      </section>

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
