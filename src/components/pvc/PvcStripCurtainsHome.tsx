import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BetweenVerticalEnd,
  Bug,
  ChevronRight,
  Flame,
  Grid3x3,
  Ruler,
  Snowflake,
  Truck,
  Wrench,
} from "lucide-react";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";
import { PVC_PRODUCTS } from "@/lib/pvc-strip-catalog";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaoPAfToCs7OoYg7XwaT83P_rAIj0BGlwh4M-U0Oj3Y7OJgLCAiJTINirndlr0hEQPwaK6P1Df4g3UGQ8CE2ocUNBdBXjeQzf8VN9uuQMNUUUTil2hlUnZSbLUfFaRsDfEefH-1GlwfwS4KGrp1rp6VF0ngITwBodyXkyhhcQ2lR6NaFyNU3_lRXYGjYB1Zd0FzD2uky-TB42wxABDk_v8nkHAOURFf0VNWcylJuF1cSRmYWwAW41IaMDPQrilXyd1E8fZbI_T_Y8",
  clearClose:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCqWUgjgAbbFtlhkHzuOIr8Dmk3mgsHeHoDGzB_67RjHADqB3wxQ2WQsAl3bKzEwVwhwDQBiDfDAMNHyr-m178w8pex17Trpra1tWL7tT1bz0JGZodm0iDmmfK6-oRAcm_-Gs9LDaiGbXBPaSzqrSF8kGhpN2y0D0-T5J2kiCTuaK_fxNUbZf3bk6qUCgVuNo-h9-JDqogAWATQyagtcfHnk760YRH0fJ_NdobGkStjvKOV5s_4cy1tjTKIha8UpcWklxzv47k2jrw",
  g1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaPTqz8kSQdKKZOZ-po9X2Cse0L1M1a-lUhwBsBnHt-ZIqLPDbqgUNlWb1JWAIKTHJkuiwUN3gwG_h9BAIJZ64w8GBWgmpT-xELwkXwV00vj-qDqWxLkn8XvbaCSjPXnd_cGwox39cYAgyHULOxEyXjCPfmZUzDoDsIOzlKYq6Erp2jwR0-U2_R3B0cWcNDUyudpsUFoJNWOwh3SrC0G_esaG-snr5hPhS_IqCWGe6fn85hPpRCQZ-fNydFDqNl2pibt6MIjQ53UY",
  g2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwNBBIEjqCuBJiDBrJN1UTv8yEUZRDQGU7EenmkXGTst8KoW1mrx_9DC7FgIPI9DfXJfF1OwYhVBTOfZEm3eEA-S-s8xU-N_85bjfQ4VntwJWVgvzKkgv4sbOwUqT1WT8e-QhmcaU_8pMo5OrL8RbtwLq5caOSjJwl_OKUBke6NkjXizhLj6yVHLW4iHvaipDAciW8mVLtcY__xNCBxEXOwBCtG770m110FAIxYBmIXNmogO4CoomWsZ9ra7GK8pQEeY22kPR5t8k",
  g3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXZPwOl6fr533A7ax3J4XYA9ypVXiow2tTcdGg_9nQ749_Mu7v_3h1uvoA5zRik8OSexVy4GjA35ZmMHhyZPXDk68OA5ArrqUYxix9kErijlALFSR9D-rAkUsBd6fZnaYjn3-hvdpaFb0N2rl47ATbjbS1Q278Sc_SSLP1azN_6Nj7bRxmOHkfK54gPjiEmXHEqJs8tEIC61pxLtMG6b9v1Iz8dBveB5YU0qtlI_48Ay1V78hJrg-xZLKRPt4atPTVo8q9dHuVEKE",
  g4: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfFr6PGslIjpZiqNsKmeBcoNScPb_2uH6AfhbSEp_iaikEPt8VEyptWMWPZamOgjaRag9NZayYj-reMoL4nu6v___aJ8bo11Yb1TycFBKArewYQ_aiB5kDqYBKYMvV5VJaS5twgW61rJh9m4SmVBOvj8IQ55-9Zv51FhilD2cJt1UOBZtqJKkedEOBRJJE91BMC4f34gQ6BM9V4O-juV_wCKTvAbUdzzlUE8pYs9N5Rh2uAuWNH0t5CybBr4uYQ6oUKWE4d18gtZc",
};

export default function PvcStripCurtainsHome() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] font-body text-[#191c1f]">
      {/* Hero */}
      <header className="relative flex min-h-[min(100vh,52rem)] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.hero}
            alt="Industrial warehouse interior with PVC strip curtains"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fd] via-[#f7f9fd]/85 to-[#f7f9fd]/35" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="mb-4 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
              Precision engineered solutions
            </span>
            <h1 className="font-headline text-[2.25rem] font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              <span className="!text-[#051125]">Industrial PVC strip</span>
              <br />
              <span className="!text-[#FC8347]">climate control.</span>
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-[#584237]">
              Custom-cut PVC strip curtains for thermal separation, dust control, and safer traffic paths — specified
              quote-led for warehouses, cool chain, and production openings.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#products-we-offer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 font-headline text-sm font-semibold !text-white shadow-lg transition-transform active:scale-[0.99] hover:opacity-95"
              >
                Shop range
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center rounded-lg bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-semibold !text-[#051125] transition-colors hover:bg-[#e0e2e6] active:scale-[0.99]"
              >
                Technical support
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Products bento */}
      <section id="products-we-offer" className="scroll-mt-24 bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              Products we offer
            </h2>
            <p className="mt-2 max-w-2xl font-body text-[#584237]">
              The drooov PVC range — overlap, compound, and hardware are confirmed against your opening.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <Link
              href="/pvc-strip-curtains/polar-pvc-strip-curtain"
              className={`group flex flex-col justify-between bg-white p-8 transition-shadow hover:shadow-lg md:col-span-8 ${shadowMd}`}
            >
              <div>
                <h3 className="font-headline text-xl font-bold !text-[#051125]">Standard &amp; clear grades</h3>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#584237]">
                  Versatile for warehouse doorways and internal partitions — clarity and overlap matched to pedestrian or
                  FLT traffic on quote.
                </p>
              </div>
              <div className="relative mt-8 h-64 overflow-hidden rounded-lg bg-[#e6e8ec]">
                <Image
                  src={IMG.clearClose}
                  alt="Close-up of clear industrial PVC strips"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, 66vw"
                  unoptimized
                />
              </div>
            </Link>

            <Link
              href="/pvc-strip-curtains/polar-pvc-strip-curtain"
              className="flex flex-col justify-between rounded-lg bg-gradient-to-br from-[#FC8347] to-[#e6733d] p-8 text-white md:col-span-4"
            >
              <div>
                <h3 className="font-headline text-xl font-bold !text-white">Polar / cold room</h3>
                <p className="mt-2 font-body text-sm !text-white/90">
                  Compounds for chill and freezer approaches — flexibility window confirmed per datasheet on your order.
                </p>
              </div>
              <Snowflake className="mt-6 h-16 w-16 self-end text-white/40" strokeWidth={1} aria-hidden />
            </Link>

            <Link
              href="/pvc-strip-curtains/welded-rack-strip-door"
              className={`group flex flex-col bg-white p-8 transition-shadow hover:shadow-lg md:col-span-4 ${shadowMd}`}
            >
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Ribbed / high-traffic</h3>
              <p className="mt-2 flex-1 font-body text-sm text-[#584237]">
                Ribbed faces wear more evenly under pallet and trolley impact; hook-on racks simplify strip changes.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <Grid3x3 className="h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <ChevronRight className="h-6 w-6 text-[#FC8347] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>

            <Link
              href="/technical"
              className={`group flex flex-col bg-white p-8 transition-shadow hover:shadow-lg md:col-span-4 ${shadowMd}`}
            >
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Welding &amp; glare tints</h3>
              <p className="mt-2 flex-1 font-body text-sm text-[#584237]">
                Dark green and bronze-style tints for welding bays — filter performance discussed with your WHS context on
                enquiry.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <Flame className="h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <ChevronRight className="h-6 w-6 text-[#FC8347] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>

            <Link
              href="/pvc-strip-curtains/industry/food"
              className={`group flex flex-col bg-white p-8 transition-shadow hover:shadow-lg md:col-span-4 ${shadowMd}`}
            >
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Insect-pressure tints</h3>
              <p className="mt-2 flex-1 font-body text-sm text-[#584237]">
                Yellow or contrasting tints can support flying-insect strategies alongside your pest program — not a
                standalone guarantee.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <Bug className="h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <ChevronRight className="h-6 w-6 text-[#FC8347] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Measure */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
              How to measure strip openings
            </h2>
            <p className="mt-6 font-body text-lg text-[#584237]">
              Use the clear structural opening (width × height). Allow extra width for overlap and track hardware — exact
              allowances are stated on your quote pack.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <Ruler className="h-8 w-8 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <p className="font-headline text-sm font-bold !text-[#051125]">Width (W)</p>
                <p className="font-body text-xs leading-snug text-[#584237]">
                  Jamb-to-jamb at the head where the rail fixes; measure in three places if the opening isn’t square.
                </p>
              </div>
              <div className="space-y-3">
                <BetweenVerticalEnd className="h-8 w-8 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                <p className="font-headline text-sm font-bold !text-[#051125]">Height (H)</p>
                <p className="font-body text-xs leading-snug text-[#584237]">
                  Floor to lintel / soffit. A small floor gap is common to avoid drag — we align strip length to your
                  finish floor.
                </p>
              </div>
            </div>
            <Link
              href="/pvc-strip-curtains/help/buying"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-bold text-[#FC8347] hover:underline"
            >
              Full buying guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="bg-[#eceef2] p-8 md:p-12">
            <div className="flex aspect-square items-center justify-center border-2 border-dashed border-[#e0c0b1] bg-white p-6">
              <div className="relative flex h-full w-full items-center justify-center border-2 border-[#FC8347]">
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-body text-[10px] font-bold uppercase tracking-wide text-[#FC8347]">
                  Width (opening)
                </span>
                <span className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 font-body text-[10px] font-bold uppercase tracking-wide text-[#FC8347]">
                  Height
                </span>
                <div className="grid h-full w-full grid-cols-6 gap-1 px-2 py-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-x border-[#FC8347]/30 bg-[#FC8347]/15"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colour & temperature */}
      <section className="bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="bg-white p-8 md:p-10">
              <h3 className="font-headline text-2xl font-bold !text-[#051125]">Which colour fits?</h3>
              <div className="mt-8 space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 h-12 w-4 shrink-0 rounded-sm bg-blue-500" aria-hidden />
                  <div>
                    <p className="font-headline font-bold !text-[#051125]">Blue tints</p>
                    <p className="mt-1 font-body text-sm text-[#584237]">
                      Common visual cue for chill and food-prep zoning — confirmed with your QA and lighting plan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-12 w-4 shrink-0 rounded-sm bg-[#FC8347]" aria-hidden />
                  <div>
                    <p className="font-headline font-bold !text-[#051125]">Contrast / safety strips</p>
                    <p className="mt-1 font-body text-sm text-[#584237]">
                      Edge markers for busy thresholds — especially where FLT paths meet pedestrian zones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 md:p-10">
              <h3 className="font-headline text-2xl font-bold !text-[#051125]">Temperature guide</h3>
              <p className="mt-2 font-body text-sm text-[#584237]">
                Ranges are typical talking points only — compound selection is locked to datasheet and site audit.
              </p>
              <div className="mt-8 space-y-0 divide-y divide-[#eceef2] font-body text-sm">
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#584237]">Standard / ambient–chill</span>
                  <span className="font-mono font-semibold text-[#FC8347]">Per datasheet</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#584237]">Polar grade</span>
                  <span className="font-mono font-semibold text-[#FC8347]">Sub-zero bands</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#584237]">Deep-freeze projects</span>
                  <span className="font-mono font-semibold text-[#FC8347]">Engineering review</span>
                </div>
              </div>
              <p className="mt-6 rounded-md bg-[#f7f9fd] p-4 font-body text-xs italic text-[#584237]">
                Note: room air temperature, strip compound, and traffic all interact — we avoid one-line temperature
                guarantees online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Width & delivery */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-14 md:flex-row md:gap-16">
            <div className="flex-1">
              <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Strip width &amp; surface</h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="font-headline text-lg font-bold !text-[#051125]">Width selection</h4>
                  <p className="mt-2 font-body text-[#584237]">
                    Narrower strips suit pedestrian lanes; 300–400 mm classes are common for larger openings and higher
                    pressure — final schedule from measure pack.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-[#eceef2] p-6">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#FC8347]">
                      <span className="font-mono text-xs font-bold">| |</span>
                    </div>
                    <h5 className="font-headline text-sm font-bold !text-[#051125]">Standard flat</h5>
                    <p className="mt-1 font-body text-xs text-[#584237]">Maximum clarity; easy wipe-down.</p>
                  </div>
                  <div className="rounded-lg bg-[#eceef2] p-6">
                    <Grid3x3 className="mb-2 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                    <h5 className="font-headline text-sm font-bold !text-[#051125]">Double ribbed</h5>
                    <p className="mt-1 font-body text-xs text-[#584237]">Better scuff masking in fork lanes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Mounting &amp; delivery</h2>
              <div className="mt-8 space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#e6e8ec]">
                    <Wrench className="h-7 w-7 text-[#051125]" strokeWidth={1.25} aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold !text-[#051125]">Strip head &amp; rails</h4>
                    <p className="mt-1 font-body text-sm text-[#584237]">
                      Galvanised for general industrial use; stainless where washdown, humidity, or food-adjacent zoning
                      requires it — grade on supply documents.
                    </p>
                    <span className="mt-3 inline-block rounded-sm bg-[#FC8347]/15 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-[#584237]">
                      Food-adjacent on enquiry
                    </span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#e6e8ec]">
                    <Truck className="h-7 w-7 text-[#051125]" strokeWidth={1.25} aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold !text-[#051125]">Lead times</h4>
                    <p className="mt-1 font-body text-sm text-[#584237]">
                      Bulk roll dispatch and custom-cut kits are quoted separately after PO and signed details — no fixed
                      “24–48 hour” promise on this marketing page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle — animated */}
      <section className="overflow-hidden bg-[#eceef2] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center font-headline text-3xl font-bold !text-[#051125] md:mb-6 md:text-4xl">
            End-to-end PVC strip curtain lifecycle
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-body text-sm text-[#584237] md:mb-16">
            Animated timeline with icons and connectors — same component as our industry and product flows (respects
            reduced-motion preferences).
          </p>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Checkpoints and freight mode are confirmed in your quote acknowledgement."
          />
        </div>
      </section>

      {/* Catalogue quick links */}
      <section className="bg-white px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-headline text-2xl font-bold !text-[#051125]">Catalogue</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {PVC_PRODUCTS.map((p) => (
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
          <div className="mt-10 flex flex-wrap gap-4 font-body text-sm font-semibold">
            <Link href="/pvc-strip-curtains/bulk-rolls" className="text-[#FC8347] hover:underline">
              Buy bulk rolls
            </Link>
            <span className="text-[#e0c0b1]" aria-hidden>
              ·
            </span>
            <Link href="/pvc-strip-curtains/industry/retail" className="text-[#FC8347] hover:underline">
              Industry: Retail
            </Link>
            <span className="text-[#e0c0b1]" aria-hidden>
              ·
            </span>
            <Link href="/pvc-strip-curtains/industry/food" className="text-[#FC8347] hover:underline">
              Industry: Food
            </Link>
            <span className="text-[#e0c0b1]" aria-hidden>
              ·
            </span>
            <Link href="/pvc-strip-curtains/industry/cold-room" className="text-[#FC8347] hover:underline">
              Industry: Cold room
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 font-headline text-3xl font-bold !text-[#051125] md:mb-12 md:text-4xl">
            Installations in action
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { src: IMG.g1, alt: "Forklift passing through PVC strip curtains at a warehouse" },
              { src: IMG.g2, alt: "Cold storage opening with polar-grade strip curtains" },
              { src: IMG.g3, alt: "Workshop partition using PVC strips" },
              { src: IMG.g4, alt: "Loading dock with heavy-duty strip curtains" },
            ].map((g) => (
              <div key={g.alt} className="group relative aspect-square overflow-hidden bg-[#eceef2]">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="25vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
