"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  FlaskConical,
  Package,
  Truck,
} from "lucide-react";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAIAtr4r32QVaRffrIOHUu1qwktyLsIdGsaDIjbdaR_RUxW4HQSEMH8ZdUJiiINgMxujNKrCjTxz3umbcl4Ofh5oTg4sUkTP5sX5PhLcH8JjPoAekdhq3jGRM0Brs-WKs38ZxkfjIf2ruipNe7ylh9zhhD4ymcwwvKon7A3tFb6Zvvf7Z-3MV0n_G4N61WtGpYEn6-4668dqoh3RMbbuIrOx7juVsYkct4vxH6K8D6IpkFVrAG1dlI4wfAzdO-UF3Tm4lR4XtaD8Rs";

type GradeFilter = "all" | "standard" | "polar" | "welding" | "ribbed" | "antistatic";

type CatalogCard = {
  id: string;
  filter: Exclude<GradeFilter, "all">;
  title: string;
  description: string;
  image: string;
  badge: { label: string; className: string };
  rows: { label: string; value: string }[];
  ctaHref: string;
};

const CATALOG: CatalogCard[] = [
  {
    id: "standard",
    filter: "standard",
    title: "Standard clear grade",
    description: "General-purpose ambient grade with high optical clarity for visibility across openings.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAA5HLzWmCfgVoIJG22yrXCEd68JkgUtOWfpZWoAKnbbGwhnvZq5FXsTMgpLGHJ-92a_emPFwfKkPeZcet_IZZcW-7dau_4QkZ0LUsq5id5Mm-WRzgxkEUdnYWQFGFxoSaWF465IkeO3i6ccaIY0kKLej1qLyQ9aIOzORr2waMLvHt8J1RjcsGR0UjGEZ47ZE3ctf3x0YPz59TNFQ6iTQGBB9hCXWeBln73A33va-JqpE-BuNmmcn3BCG0AeCdHz-pkZNRYz7BfBJQ",
    badge: { label: "Stock programs", className: "bg-[#FC8347] text-white" },
    rows: [
      { label: "Typical widths", value: "200 / 300 / 400 mm" },
      { label: "Typical roll lengths", value: "30 m | 50 m (project-specific)" },
    ],
    ctaHref: "/pvc-strip-curtains/help/buying",
  },
  {
    id: "polar",
    filter: "polar",
    title: "Polar / cold-room grade",
    description: "Flexible at low temperatures for chill and freezer-line openings — compound matched to your band.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpiWt3kFAm_RwspUXqFyjgKOofANReW0Uzp7iytAGNMkNF1bZOuvn_pcGMtVVzcArP3pN8j_C4m2VHgaenOgq1bPEC1YNJcc3r5-P9jwT1sh_eFg7DT5u5fREi2mO_AtXkTexcDLMSbrZ5rdDeK05pFIQespijcjw7pyDVm2MFGZGznieLDaQvkGVf8_IBAZPdfmGCww0oaIBIX2N-sMK14kxjy8QZFcgIal5eUuNU_VNEx7UEB4cQNcGkQkE2O_o9LBIhHhUtVKQ",
    badge: { label: "Low-temp", className: "bg-[#00639b] text-white" },
    rows: [
      { label: "Typical band", value: "Quoted to application" },
      { label: "Thickness options", value: "2 / 3 / 4 mm (range-dependent)" },
    ],
    ctaHref: "/pvc-strip-curtains/polar-pvc-strip-curtain",
  },
  {
    id: "ribbed",
    filter: "ribbed",
    title: "Ribbed anti-scratch",
    description: "Ribbed surface helps resist scuffing in forklift and trolley traffic while maintaining clarity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8bjvS43cCfcwkQdc4YF1RmExX_mbzJ82DcCGWsAj75jrpPEyhhoQXRB7J6rO0C0nlzu59RQWhsrDkg-hSFDyRkC_FA5TKDe0Q1Iz18WlzkJUsp1qnqFtOwoJIPOjPfCohmVI2YKtrqu_82NGuFDcEKarTa42AKsAbyhWrpEKdhW1r2ZBK2rabbDbeYGKa83EMCUV0PhyxFEnAdP8QuZVWHU7pXUBgVYaAYrVPSUCBOn4_EiIyhV-Fk-Q7tUN2wBoNDwmN9pUSpd4",
    badge: { label: "High traffic", className: "bg-[#051125] text-white" },
    rows: [
      { label: "Pattern", value: "Double rib (typical)" },
      { label: "Duty", value: "Heavy-traffic openings" },
    ],
    ctaHref: "/pvc-strip-curtains/help/buying",
  },
  {
    id: "welding",
    filter: "welding",
    title: "Welding protection grade",
    description: "Tinted options for welding bays — specify required shade and viewing class on enquiry.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiQqYF8Xc6BLdR-KM7XKD0UdOfHdOI0FSA_qkSEMfaIqDxntZ8RGZ5CuMPjYBFQWclcYM2QAL66VZ-d9-G1kq9mAIm3t-tA9hpN2c_RxdwGapvz4oepUs20CAwrNNBr9X24oiMPPtTTX55iyZ1fWaSznyTgGl0fiMwrV5W7SpEjNzpGLZu0UwSZcC3fg-2n3A_2VFj6cKwC_ykNv9tJP4t8n4NFHTsdbqqL8uJXc8JQf0VMlzB4WX4C6CNh052_5-VB5wNT3toAS0",
    badge: { label: "Welding bay", className: "bg-[#584237] text-white" },
    rows: [
      { label: "Tints", value: "Bronze | green | red (availability varies)" },
      { label: "Compliance", value: "Specified to your site WHS plan" },
    ],
    ctaHref: "/contact",
  },
  {
    id: "antistatic",
    filter: "antistatic",
    title: "Anti-static (ESD) grade",
    description: "For electronics and clean manufacturing — resistivity band confirmed on datasheet at quote.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJWgJe9yatSysR0yNZnYpCxTNE_jj8HMoNtR7_5o2GxIJgaZKg9AUskuFl29mUOUxFJemoO-TrksLVVs2qRjvmKpTFQuKUdjrtqPy_Mfag9qLGHKi1XlVqGuGWybZU6oUnv5xJWCqcbfu_m_0aO_IGgkv2AH85MFDFysMRn_WdDaSqH9oMSX__ASU6La7SUha38zw37KtwIDqmTPO2YJRArz9cQUxDudRVhIg1ig0ORv0YfFv0SpsRUR1zv9gXQVFedj6rCbXuV6M",
    badge: { label: "ESD", className: "bg-[#00639b] text-white" },
    rows: [
      { label: "Typical use", value: "Electronics | controlled environments" },
      { label: "Data", value: "Project-specific test reports on request" },
    ],
    ctaHref: "/contact",
  },
];

const FILTER_CHIPS: { id: GradeFilter; label: string }[] = [
  { id: "all", label: "All grades" },
  { id: "standard", label: "Standard" },
  { id: "polar", label: "Polar" },
  { id: "welding", label: "Welding" },
  { id: "ribbed", label: "Ribbed" },
  { id: "antistatic", label: "Anti-static" },
];

const shadowCard = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

export default function BulkRollsPage({ industries }: { industries: string[] }) {
  const [grade, setGrade] = useState<GradeFilter>("all");

  const visible = useMemo(() => {
    if (grade === "all") return CATALOG;
    return CATALOG.filter((c) => c.filter === grade);
  }, [grade]);

  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#191c1f]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-block rounded-sm bg-[#FC8347]/15 px-3 py-1">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#584237]">
                Trade &amp; facility programs
              </span>
            </div>
            <h1 className="font-headline text-4xl font-bold leading-[1.1] tracking-tight text-[#051125]! md:text-5xl lg:text-6xl lg:text-7xl">
              Industrial bulk{" "}
              <span className="text-[#FC8347]!">PVC rolls</span> — engineered supply.
            </h1>
            <p className="max-w-2xl font-body text-lg font-medium leading-relaxed text-[#584237] md:text-xl">
              Precision PVC roll stock for fabricators and multi-site operators — cold storage, welding bays, and
              high-traffic openings. Widths, compounds, and MOQs are confirmed on enquiry (no list pricing online).
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-8 py-4 font-headline text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#FC8347]/20 transition-all hover:opacity-95 active:scale-[0.99]"
              >
                Request bulk guide
                <Download className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/technical"
                className="inline-flex items-center rounded-lg bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-bold uppercase tracking-wide text-[#051125] transition-colors hover:bg-[#e0e2e6] active:scale-[0.99]"
              >
                Technical specs
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className={`relative aspect-square overflow-hidden rounded-xl bg-[#f2f4f8] ${shadowCard}`}>
              <Image
                src={HERO_IMG}
                alt=""
                fill
                className="object-cover opacity-90 mix-blend-multiply grayscale"
                sizes="(max-width:1024px) 100vw, 40vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FC8347]/25 to-transparent" aria-hidden />
            </div>
            <div
              className={`absolute -bottom-6 -left-4 flex max-w-[14rem] items-center gap-4 rounded-lg bg-white p-5 md:-left-6 ${shadowCard}`}
            >
              <div className="font-headline text-3xl font-bold text-[#FC8347] md:text-4xl">40+</div>
              <div className="font-body text-[0.65rem] font-bold uppercase leading-snug tracking-tight text-[#584237]">
                Width &amp; compound
                <br />
                combinations on quote
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-[#eceef2] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-10 flex flex-col items-end justify-between gap-6 md:mb-12 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-[#051125]">Bulk catalogue</h2>
              <div className="h-1 w-20 bg-[#FC8347]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_CHIPS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setGrade(c.id)}
                  className={`rounded-md px-4 py-2 font-body text-xs font-bold uppercase tracking-wider transition-colors ${
                    grade === c.id
                      ? "border-b-2 border-[#FC8347] bg-white text-[#FC8347]"
                      : "bg-white/80 text-[#584237] hover:bg-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="font-body text-[#584237]">No grades in this filter — choose &ldquo;All grades&rdquo;.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((card) => (
                <li key={card.id}>
                  <article
                    className={`group overflow-hidden rounded-lg bg-white ${shadowCard} transition-shadow hover:shadow-[0px_24px_48px_rgba(25,28,31,0.08)]`}
                  >
                    <div className="relative h-48 overflow-hidden bg-[#e6e8ec]">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                        unoptimized
                      />
                      <div
                        className={`absolute right-4 top-4 rounded-sm px-2 py-1 font-body text-[10px] font-bold uppercase ${card.badge.className}`}
                      >
                        {card.badge.label}
                      </div>
                    </div>
                    <div className="space-y-4 p-6">
                      <h3 className="font-headline text-xl font-bold text-[#051125]">{card.title}</h3>
                      <p className="font-body text-sm leading-relaxed text-[#584237]">{card.description}</p>
                      <div className="space-y-2 border-t border-[#e0c0b1]/25 pt-3">
                        {card.rows.map((row) => (
                          <div
                            key={row.label}
                            className="flex flex-wrap justify-between gap-2 font-body text-[0.7rem] font-bold uppercase text-[#584237]"
                          >
                            <span>{row.label}</span>
                            <span className="text-right text-[#191c1f]">{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={card.ctaHref}
                        className="block w-full rounded-md border-2 border-[#FC8347] py-3 text-center font-headline text-sm font-bold uppercase tracking-wide text-[#FC8347] transition-all hover:bg-[#FC8347] hover:text-white"
                      >
                        Enquire / configure
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Volume bands — enquiry-led */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 space-y-3 text-center md:mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-[#051125] md:text-4xl">
              Volume bands (on enquiry)
            </h2>
            <p className="font-body font-medium text-[#584237]">
              Tiered handling and scheduling are discussed against your roll count and delivery window — no published price
              ladder online.
            </p>
          </div>
          <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-[#e0c0b1]/30 md:grid-cols-4">
            {(
              [
                {
                  label: "Sample / low volume",
                  range: "1–4 rolls",
                  note: "Baseline MOQ rules apply",
                  variant: "muted" as const,
                },
                {
                  label: "Band A",
                  range: "5–9 rolls",
                  note: "Pallet-friendly batches",
                  variant: "light" as const,
                  tag: "Popular",
                },
                {
                  label: "Band B",
                  range: "10–19 rolls",
                  note: "Priority scheduling where available",
                  variant: "light" as const,
                  tag: "Trade",
                },
                {
                  label: "Band C",
                  range: "20+ rolls",
                  note: "Custom logistics & consolidated delivery",
                  variant: "accent" as const,
                  tag: "Project",
                },
              ] as const
            ).map((col) => (
              <div
                key={col.label}
                className={`border-b border-[#e0c0b1]/20 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                  col.variant === "accent"
                    ? "bg-gradient-to-br from-[#FC8347] to-[#e6733d] text-white"
                    : col.variant === "light"
                      ? "bg-white"
                      : "bg-[#f2f4f8]"
                }`}
              >
                <div className="mb-3 flex min-h-[1.75rem] justify-end">
                  {"tag" in col ? (
                    <span
                      className={`rounded-full px-2 py-1 font-body text-[10px] font-bold ${
                        col.variant === "accent" ? "bg-white/20 text-white" : "bg-[#FC8347]/12 text-[#FC8347]"
                      }`}
                    >
                      {col.tag}
                    </span>
                  ) : null}
                </div>
                <div
                  className={`mb-3 font-body text-xs font-bold uppercase tracking-widest ${
                    col.variant === "accent" ? "text-white/90" : "text-[#584237]"
                  }`}
                >
                  {col.label}
                </div>
                <div
                  className={`font-headline text-2xl font-bold md:text-3xl ${
                    col.variant === "accent" ? "text-white" : "text-[#051125]"
                  }`}
                >
                  {col.range}
                </div>
                <p
                  className={`mt-2 font-body text-sm font-medium ${
                    col.variant === "accent" ? "text-white/90" : "text-[#584237]"
                  }`}
                >
                  {col.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech + logistics */}
      <section className="bg-[#eceef2] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h2 className="flex items-center gap-3 font-headline text-2xl font-bold text-[#051125]">
              <FlaskConical className="h-7 w-7 text-[#FC8347]" aria-hidden />
              Technical snapshot
            </h2>
            <div className={`space-y-6 rounded-lg bg-white p-8 ${shadowCard}`}>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#584237]">
                    Shore hardness (typical)
                  </div>
                  <div className="font-headline text-3xl font-bold text-[#FC8347]">75–80A</div>
                  <div className="mt-1 font-body text-xs text-[#584237]">Indicative — confirm compound on quote</div>
                </div>
                <div>
                  <div className="mb-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#584237]">
                    Tensile strength (guide)
                  </div>
                  <div className="font-headline text-3xl font-bold text-[#FC8347]">~17 MPa</div>
                  <div className="mt-1 font-body text-xs text-[#584237]">Supplier datasheets supplied with order</div>
                </div>
              </div>
              <div className="h-px w-full bg-[#e0c0b1]/30" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[280px] text-sm">
                  <thead>
                    <tr className="border-b border-[#e0c0b1]/20 text-left font-body text-[10px] font-bold uppercase tracking-widest text-[#584237]">
                      <th className="pb-3 pr-2">Feature</th>
                      <th className="pb-3 pr-2">Standard</th>
                      <th className="pb-3">Polar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e0c0b1]/15 font-body font-medium text-[#191c1f]">
                    <tr>
                      <td className="py-3">Min temp (guide)</td>
                      <td className="py-3">−15°C</td>
                      <td className="py-3 font-bold text-[#FC8347]">−40°C capable</td>
                    </tr>
                    <tr>
                      <td className="py-3">Max temp (guide)</td>
                      <td className="py-3">+50°C</td>
                      <td className="py-3">+30°C</td>
                    </tr>
                    <tr>
                      <td className="py-3">UV stability</td>
                      <td className="py-3">High</td>
                      <td className="py-3">High</td>
                    </tr>
                    <tr>
                      <td className="py-3">Flame behaviour</td>
                      <td className="py-3" colSpan={2}>
                        Self-extinguishing grades — confirm to your fire strategy
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="flex items-center gap-3 font-headline text-2xl font-bold text-[#051125]">
              <Truck className="h-7 w-7 text-[#FC8347]" aria-hidden />
              Logistics &amp; delivery
            </h2>
            <div className="grid gap-6">
              {[
                {
                  icon: Package,
                  title: "Palletised dispatch",
                  body: "Bulk rolls are typically palletised with edge protection. Packing detail is confirmed on your pick list.",
                },
                {
                  icon: Clock,
                  title: "Australia-wide",
                  body: "Metro and regional lead times vary by compound and season — your quote states an expected dispatch window.",
                },
                {
                  icon: FileText,
                  title: "Slitting & custom width",
                  body: "Non-standard widths may be available above agreed volume — engineering reviews slitting feasibility on enquiry.",
                },
              ].map((item) => (
                <div key={item.title} className={`flex gap-5 rounded-lg bg-white p-6 ${shadowCard}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#FC8347]/10">
                    <item.icon className="h-6 w-6 text-[#FC8347]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-[#051125]">{item.title}</h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-[#584237]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#f7f9fd] px-6 py-12 md:px-10">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="font-headline text-xl font-bold text-[#051125]">Industries we support</h2>
          <ul className="mt-4 grid gap-2 font-body text-[#584237] sm:grid-cols-2 md:grid-cols-3">
            {industries.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FC8347]" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="relative mx-auto max-w-screen-xl overflow-hidden rounded-xl bg-[#051125] text-[#f2f4f8]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col md:flex-row">
            <div className="p-10 md:w-2/3 md:p-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-white! md:text-4xl md:text-5xl">
                Large-roll or multi-site programs?
              </h2>
              <p className="mt-5 max-w-lg font-body text-lg opacity-90">
                For high-volume procurement, bonded schedules, or specialised compounds, route the brief through our team —
                we align supply with your installation window.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-lg bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-10 py-5 font-headline text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.99]"
              >
                Request a bulk quote
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <div className="flex items-center justify-center border-t border-white/10 p-10 md:w-1/3 md:border-l md:border-t-0">
              <div className="text-center">
                <div className="font-headline text-5xl font-bold text-[#FC8347] md:text-6xl">24h</div>
                <div className="mt-2 font-body text-xs font-bold uppercase tracking-widest text-white/60">
                  Typical first response
                  <br />
                  (business hours)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
