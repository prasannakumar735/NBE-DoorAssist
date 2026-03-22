import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  FlaskConical,
  Headphones,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import type { PvcProduct } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8AR18vSR6cxOX2rmovpcgQ5HUVvSymEtEVD3VficcInLAhui3Gz1N2yoagwq2gLcpewR3kJMaJB6oxlja2EIELv8SBY7tG17mOWEHCuXR7tsEaP5oAs5RqQCuw-pNXJ-nEZTA3ZhOBltjekEO_9fUns4PDzoJvbdsFBu-c9h_mgD5tr-qk_XNSgpnThEx6oFx_-_uZRHMsv9SG1mEzb13zGRD2rY89IoiQkgO_klcq0l5FjZZNxHn8BlFCfOPP-EBm8G4LzcZLHg",
  polar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDor6l1tjXJgdeF74TOJsGaUCQw5OKXWcKoUw9fttO97eA_Na__ps9fQXBtHkrVLq2uyq8dO0TuDH7-8aA0_5YPqu0nYJQ7r0jdVRWyYT8n3PTfW_wF7Y_x0GVQum46D265UH37U4ETYxki-YelPd_x4ywUX7bXZmTST49F9m4zisOkDTYVBme3weltyN-HB_Sq7RreBhrP3qK5ZCYMdProXA51IinVfz7QSQKYAq6-nZ6VJKgeXpKL4YMbWgRruEmKG89sTuoy_Fo",
  ribbed:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBytWsg3VZNYwb_hlZtyavBORA2KKpWS8mVadd-a00LMC8Q4Mh9lf4X1b2l9vO1KckjAj823PFPXqpRDFbrK8s01ZUqeEXAx6HnfeR11qo5eYqQx_8viwgmF9vhYWBUhVgQgJRfsNYmg9DPj4r5RVDzXFnHHlpHfGb0GQnnGeuZkfMJkPpeK5fjpAR1EUi5RjTAWEqHjz5tXKad2V9t-B4tE_DIkZQodXJ8Rz2tKR9s3RqtqOzwC_Po1PNVJ3Orx6AMIOaHVf5UBB8",
  chilled:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxYzp8KR-oRrq1qDkAFF36szaMYvyNnFtFj2dOllvrgSTDldVidriC_9zKLWayG-GDfAqXt4TDIHElYxAmc3kykRXhH8QBstyioMxJKculuO5mvuhjESlFGYuQMeI1qLMEheeZHUmOMJXZX0mJWqFRKeuHTcq59aK_1RH8mKx0rd3sRzGvSMg43kQziHdX2nLO14zNRdaKNw2Lr52zZ0lVRs6fJrKRvjUaddztae5QjjzCP96J6cdRySLujcWz4lj7ep-TTwUquiE",
  g1: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2DFqzqvsZpzQjahGZulQ6H1RpkJbGmuHkd2XPiFwPCxx8InriNnJnhyxgC5g5I9_4kQDAIkEy465Z7dUQ4noKjiv2t80sDU1ebRswKmZx6Ax9aL-aBY2RCuh-aGsEqHuhdT7CGKboG9P3WioQC9JOwq2ixY7KogZeAu5yFacq4N_Wk0mgAkSPvO5Vxg_3wHuj1jkVtPOczupGT2Mg-kA3rkPC8zJEeU6zRVA247nqnXeWLfQ4IH6rXURqI2nctu2QFT-4aLaEEJw",
  g2: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8izTyLqqi5WzFUgLltLIZ94tyzPj7_kC0ZcdCI00kOJPXSjzh9N-haopfSOgVZiExNTKMDgJEMiGQitl_ImWO7InQ0lYIar2yUCk-NC9Ye0NIZ1hDYAllB1LRYJIL_ekB5fXqsMGLWsfXVTpUnQSgSb4XxRT2AM2f8dVMK-Y82W2YoTJXy29dM4ziMb9MjpXriDoJ2BQof8ScqOqL8VspHMm128TCQSgeADS3EtShl5R8mNabseke1qzDm7tx0ZeohEZLOaYYDsY",
  g3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdd3x8rI0Vrzjexr8_FTg3iKMbF0nCcbCRDa9oIpVeDczJtmwoPiinzOxOzlBYYG4D1ebmWnnl_bxVVrV_2n3Y-jNzovxLdSwZwNqnpWzKUxPbMEBUOV5p-dSr0scq9cOXFqLwrCo45rzWJGHtoPCzPUA-xh9H2uN9MRfc0TiEnhfjWNlD5fnLX32RxJRKGNfzzAIP1tsoE_3aO-jjUTeFxdSYUcnFHRzI50xGLoRyB8IxK-D-uzDGV2XHIJYIyENP5iKk21vNBv8",
  g4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvYvHabevoXPyqGzEzWMzfYLsbVXT6iCa8VlMYN4h2AZupYILlglnjJU8l4GEBXrxc8reSlqXWFGWbBxgbv8QN-oxrdSIVf2D7eS3S-HdsG-lF9eQrfr8nioA7pjqxiPmUlUgErwWkJQT20d73BL0I_Ohg5BVUIu4MzlCxrnCA2RHdxCFw-4ne-BBfda9t0f6mX0fFcZiL9TCk9ZPcOyQom3hD5IUZXcwWVDs3AwRVnXQkrchlsDRFj0YrZO3uCDhxLh5Wyf0R0XY",
};

const COMPLIANCE = [
  {
    title: "Hygiene-aligned compounds",
    body: "Strip formulations and additives are selected to align with your HACCP cleaning program — datasheets supplied at quote.",
    Icon: FlaskConical,
  },
  {
    title: "Wash-down durability",
    body: "Surfaces are specified for typical food-plant detergents and pressure-wash regimes; confirm chemical compatibility on enquiry.",
    Icon: Sparkles,
  },
  {
    title: "Food-contact suitability",
    body: "Indirect and adjacent food-contact applications are reviewed against your zoning — not a one-size-fits-all certification claim online.",
    Icon: ShieldCheck,
  },
  {
    title: "Insect-pressure tints",
    body: "Optional yellow or contrasting tints can support flying-insect management strategies alongside your pest program.",
    Icon: Bug,
  },
] as const;

const MATERIAL_CARDS = [
  {
    title: "Polar grade (freezer & chill)",
    description: "Flexible at low temperatures for blast chill lines and cold storage — compound matched to your operating band.",
    image: IMG.polar,
    badge: { label: "Polar grade", className: "bg-[#00639b] text-white" },
    href: "/pvc-strip-curtains/polar-pvc-strip-curtain",
  },
  {
    title: "Ribbed high-traffic",
    description: "Ribbed faces reduce visible scuffing in pallet lanes while keeping strips easy to inspect and replace.",
    image: IMG.ribbed,
    badge: { label: "High traffic", className: "bg-[#051125] text-white" },
    href: "/pvc-strip-curtains/welded-rack-strip-door",
  },
  {
    title: "Chilled prep — tinted",
    description: "Blue and contrast tints common in preparation zones for visibility and zoning — we confirm colour with your QA team.",
    image: IMG.chilled,
    badge: { label: "Chilled areas", className: "bg-[#584237] text-white" },
    href: "/pvc-strip-curtains/help/buying",
  },
];

function foodSectionNav(productsCount: number): PvcPageSectionNavItem[] {
  const base: PvcPageSectionNavItem[] = [
    { id: "food-overview", label: "Overview" },
    { id: "food-compliance", label: "Compliance" },
    { id: "food-materials", label: "Materials" },
    { id: "food-workflow", label: "Workflow" },
  ];
  if (productsCount > 0) {
    base.push({ id: "food-catalogue", label: "Catalogue" });
  }
  base.push({ id: "food-gallery", label: "Gallery" });
  return base;
}

export default function FoodIndustryPage({ products }: { products: PvcProduct[] }) {
  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav
        brandLabel="Food"
        ariaLabel="Food PVC industry sections"
        items={foodSectionNav(products.length)}
      />
      {/* Hero */}
      <section
        id="food-overview"
        className="relative flex min-h-[min(100vh,52rem)] scroll-mt-40 items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.hero}
            alt="Food processing facility with industrial strip curtains at an opening"
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fd] via-[#f7f9fd]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block rounded-sm bg-[#FC8347]/20 px-3 py-1 font-body text-[0.6875rem] font-bold uppercase tracking-widest text-[#584237]">
              Food-grade solutions
            </span>
            <h1 className="font-headline text-4xl font-bold leading-[1.05] tracking-tighter !text-[#051125] md:text-6xl lg:text-7xl">
              Food industry{" "}
              <span className="bg-gradient-to-br from-[#051125] to-[#FC8347] bg-clip-text text-transparent">
                precision
              </span>
            </h1>
            <p className="mt-6 font-body text-lg font-medium leading-relaxed text-[#584237] md:text-xl">
              Hygienic PVC strip barriers for processing, packaging, and temperature-zoned openings — specified for Australian
              food plants and HACCP-aligned workflows.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-8 py-4 font-headline text-sm font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.99]"
              >
                Configure your system
              </Link>
              <Link
                href="/compliance"
                className="inline-flex items-center justify-center rounded-md bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-bold text-[#051125] transition-colors hover:bg-[#e0e2e6] active:scale-[0.99]"
              >
                Compliance &amp; quality
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="food-compliance" className="scroll-mt-40 bg-[#eceef2] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h2 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-[#FC8347]">Safety standards</h2>
            <h3 className="mt-2 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Compliance, engineered in context.
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#e0c0b1]/30 bg-[#e0c0b1]/20 md:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE.map((item) => (
              <div key={item.title} className="flex flex-col gap-5 bg-white p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#FC8347]/10 text-[#FC8347]">
                  <item.Icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                </div>
                <h4 className="font-headline text-lg font-bold !text-[#051125]">{item.title}</h4>
                <p className="font-body text-sm leading-relaxed text-[#584237]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material selection */}
      <section id="food-materials" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <h2 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-[#FC8347]">Inventory</h2>
              <h3 className="mt-2 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
                Material selection
              </h3>
            </div>
            <p className="max-w-md font-body font-medium text-[#584237]">
              Formulations tuned to thermal bands, traffic, and cleaning chemistry — not generic retail strip.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {MATERIAL_CARDS.map((card) => (
              <li key={card.title}>
                <article
                  className={`group overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 ${shadowMd}`}
                >
                  <div className="relative h-64 overflow-hidden bg-[#e6e8ec]">
                    <Image
                      src={card.image}
                      alt={`${card.title} — typical installation`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                      unoptimized
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-sm px-2 py-1 font-body text-[10px] font-bold uppercase tracking-widest ${card.badge.className}`}
                    >
                      {card.badge.label}
                    </span>
                  </div>
                  <div className="p-8">
                    <h4 className="font-headline text-xl font-bold !text-[#051125]">{card.title}</h4>
                    <p className="mt-3 font-body text-sm leading-relaxed text-[#584237]">{card.description}</p>
                    <Link
                      href={card.href}
                      className="mt-6 inline-flex items-center gap-2 font-body text-sm font-bold text-[#FC8347] transition-colors hover:text-[#051125]"
                    >
                      View detail
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Workflow — animated pipeline */}
      <section id="food-workflow" className="scroll-mt-40 border-y border-[#e0c0b1]/20 bg-[#eceef2] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-[#FC8347]">Workflow</h2>
            <h3 className="mt-2 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Precision pipeline
            </h3>
          </div>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Milestones align with your purchase order, fabrication slot, and site access — confirmed in writing on your order acknowledgement."
          />
        </div>
      </section>

      {/* Catalogue products */}
      {products.length > 0 ? (
        <section id="food-catalogue" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-14 md:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-headline text-2xl font-bold !text-[#051125]">drooov catalogue — food sector</h2>
            <p className="mt-2 max-w-2xl font-body text-sm text-[#584237]">
              Full measurement, colour, and hardware guides on each product page.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/pvc-strip-curtains/${p.slug}`}
                    className={`block h-full rounded-lg border border-[#e0c0b1]/35 bg-white p-6 transition hover:border-[#FC8347]/45 ${shadowMd}`}
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
      <section id="food-gallery" className="scroll-mt-40 bg-[#f7f9fd] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h2 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-[#FC8347]">Showcase</h2>
            <h3 className="mt-2 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Typical deployments
            </h3>
            <p className="mt-3 max-w-xl font-body text-sm text-[#584237]">
              Illustrative environments — your opening is measured and zoned on site.
            </p>
          </div>
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-[#e6e8ec] group">
              <Image
                src={IMG.g1}
                alt="Commercial kitchen entry with strip curtains"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 flex items-end bg-black/0 p-6 opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
                <span className="font-headline font-bold text-white">Commercial kitchen entry</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-[#e6e8ec] group">
              <Image
                src={IMG.g2}
                alt="Cold storage area with strip curtains"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
                unoptimized
              />
              <div className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
                <span className="font-body text-xs font-bold text-white">Cold storage hub</span>
              </div>
            </div>
            <div className="relative row-span-2 overflow-hidden rounded-lg bg-[#e6e8ec] group">
              <Image
                src={IMG.g3}
                alt="Food processing line with strip curtain partition"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
                unoptimized
              />
              <div className="absolute inset-0 flex w-full items-end justify-center bg-black/0 p-4 text-center opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
                <span className="font-body text-xs font-bold text-white">Processing line</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-[#e6e8ec] group">
              <Image
                src={IMG.g4}
                alt="Butchery or prep area with hygiene strip curtains"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
                unoptimized
              />
              <div className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
                <span className="font-body text-xs font-bold text-white">Butchery / prep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FC8347] to-[#e6733d] px-6 py-16 text-white md:py-24">
        <UtensilsCrossed
          className="pointer-events-none absolute -right-8 top-1/2 h-[min(24rem,50vw)] w-[min(24rem,50vw)] -translate-y-1/2 text-white/[0.07]"
          strokeWidth={0.75}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight !text-white md:text-4xl md:text-5xl">
              Ready to tighten hygiene zoning?
            </h2>
            <p className="mt-6 font-body text-lg text-white/90 md:text-xl">
              Share opening sizes, temperature bands, and cleaning chemistry — we return a strip schedule and hardware
              bill.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-10 py-5 font-headline text-sm font-bold text-[#FC8347] shadow-xl transition-all hover:bg-[#f7f9fd] active:scale-[0.99]"
              >
                Request a quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/50 bg-transparent px-10 py-5 font-headline text-sm font-bold text-white transition-colors hover:bg-white/10 active:scale-[0.99]"
              >
                <Headphones className="h-5 w-5" aria-hidden />
                Talk to a specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e0c0b1]/25 bg-[#f7f9fd] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/pvc-strip-curtains" className="font-body text-sm font-bold text-[#FC8347] hover:underline">
            ← All PVC products
          </Link>
        </div>
      </div>
    </div>
  );
}
