import Image from "next/image";
import Link from "next/link";
import PvcPageSectionNav, { type PvcPageSectionNavItem } from "@/components/pvc/PvcPageSectionNav";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Package,
  Ruler,
  ShoppingCart,
  Snowflake,
  Thermometer,
  Truck,
  Zap,
} from "lucide-react";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqAOfkmho3ex6TkxBzA8bv46O89FxSmi2MMr2xQSSIuygruOma7brvcFYNCd2pntVUjnBtSVpHmshGL4EuiNx-Vpk9YL6l0jrvgmd-gXqtfddu3uul_5wM_ABaajD8bJzZW6L7ek2njU45onbuP08exn-Kqst0KdDAIBElL9Dmgh5lq-VVZUrmxpsK5LvtowtcPsvp5E1lyfOpe6c8vNzLsdotcvUHW1bDOYFh_c4qQzx6MDOqovTrkYTXY8sOgSwcTnO-6kNIU3A",
  polar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVla_1eDfogYPfCIhDiZiUckLtU6ORp4aBOLcMUaNAGmuTV7qwTpWAlq8zDJ0IfZm-NZv2sx9wgTmz0xUElDCLUaoXN677-25b9ZKjojxu0up4EhNB11umAxoOY6b2QjrAIHH5BVExcAWyCx665725zFtfYWIH3tKkhuwTtQLVxM3LDBLGamI8AxLuQ8ssxR710EtJjm5Pqjpvwff-D3QY9Zr5hTbh7Fg_qannjkEvlvGjV6CAof700AW3LuAcvY-NSlVIlQ3tY4U",
  superPolar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0U-ODTT_zKeSwfeKeJZV-hgCslfWI-99rLLdOFs8U0OIZe8vMzYOoHbRIFwnin321xK0rPCreXTFcPUNeDmWeoytKP0IrlX6sM7wvsPnGAUybsyoQS5cb_LRstxR9mh2SqDfaWj7clVkdjuV27QyQz0Cb5lZAslrRkmJLTV-j8aVSyBozc8V2dIJE5cyx8EVqxm_GcKemBuGnKj6G0RrQf3DjAB_kHKHtre3Puz0gaK92UadBGMMceXSe8kivENneX67I7sgPNU",
  antiMicrobial: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa3wNNGRZdxoS2vypgm9MZ4yg3zAP2klRg6X1Q4nZTF1ueEtfM05TUNSs9DgZhKzk-RXEzlkmtvjq43jBHqs2uyjzMkU4_JhBLvuZW20-xKJZAl6UCTavxlSORLI3tJJ3HggTf8mstgDvj-IVGQhiaQCcLODlh_IVD-L_GP4DJcCSH8jv8gOaWlc6uIcfvzKRl7k8QFR3LFhSq3LGj7VsIYP55p964TC-VidW112ZT_6t-1i5-pdz6b3DRssxDCytgAfBCtD3w2qQ",
  thermal: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWvMVxlh-dH_UISs3fFuRAmwueC1F2AyOvajgY_vvoxsMXO0RV26hAFC6339cBtGb6yZ_HrU-NWyOEyVW8Hc7_OZ61YtuTzDWVSUYiBTurkXysEedmuoKjPF-pCzlgU7Eme5aXb14Ga1XdyOWLYQPt5jSVjyY2-PrVnBJdWxi1RKs2C80bT1A67PSLlIsoI7gWTmX00dJ2B3LnMVZn9uc2wsrgppmjQtNex19a118fsWU4zl0vkCqgbMi0h3xs4MIqWTlodOomhK0",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzNB_3euhEXL0_FbmWZ7MKy1MbPnqg6Jq0VZsOYsWzNTPaYfHHJ1HfLEnSLIJMqC-2EMummPecVvCay49z5qcmkvGuenNX6-MPb_KQra6wXPXLpKZUaOL2Pq5tOCBaXk-z_l_eO9vQSa1SMYjyyqsWKOHZd8NQyFfQzQUU0KAWcdkYigRpqmZsZjnM2pXuSyJiKTpFKAyqBRXXm9-CZ0l1AbERNkfE-ngm7nMDoVlt-afou6pkFPi_pEVpWUHOxbCI-p_vGY403q0",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfYmZZi28L8d4LTTFXOgCc_1_TRHnfcw0SbTYiuWv88tuTkIzwPSiCRTFuINflbFlQ2QWRP4lrtPosGFSWUg_ebs15B7tm8Qtme05SHV9hK7P299pprpIESybeOQM7DOMYpgF1_oeJu1M-tAPqdMpfy3iApEmnP6wdxpf3D91qYaRRj34RztDGYa5HZI2It55NVWCEIxHmLmS91upPUVGjJaOiyin_zRooaujo2zn3AHeHCFO8hc2651HCl8LqIq4104Oi8jb0dWQ",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu1eThhKb6rZppRWtZ-Ti1EzG4EiaYuDkpHLyl99AJGn6v6hzJ4b_Lq5ofDMUcQLC_YpbQyEoeLud0J3hXXLlrwwwwO3dvQOfC4ZUGUPiBLerY0wE3B5sqq-Br31t4Z-oGV5wkrQi7DIMaq54t1dbMqy6-sPdeuCzP4h6p5rA0kd-N22zhM3Svmt24erEJSCQVHi3WYEL4QpgIv8CqCECn6NX9b3RBL6dDa21ZvmCcMUY_XvxnyBU62hhk9oKzSyvjWKH1RT04esg",
};

const COLD_ROOM_SECTION_NAV: PvcPageSectionNavItem[] = [
  { id: "cold-overview", label: "Overview" },
  { id: "cold-products", label: "Products" },
  { id: "cold-specifications", label: "Specifications" },
  { id: "cold-documentation", label: "Documentation" },
  { id: "cold-support", label: "Support" },
];

export default function ColdRoomIndustryPage() {
  return (
    <div className="bg-[#f7f9fd] text-[#191c1f]">
      <PvcPageSectionNav
        brandLabel="Cold room"
        ariaLabel="Cold room section navigation"
        items={COLD_ROOM_SECTION_NAV}
      />

      <section id="cold-overview" className="relative flex min-h-[min(100vh,52rem)] scroll-mt-40 items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.hero}
            alt=""
            fill
            className="object-cover opacity-20 grayscale"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-sm bg-[#FC8347]/10 px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
              Precision insulation
            </span>
            <h1 className="font-headline text-5xl font-bold leading-[0.95] tracking-tighter text-[#191c1f] md:text-7xl lg:text-8xl">
              Cold room
              <br />
              <span className="text-[#FC8347]">solutions</span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-lg font-medium leading-relaxed text-[#584237] md:text-2xl">
              High-performance thermal barriers for temperature-controlled environments. Maintain climate integrity with
              specification-led PVC strip and rapid-door options — pricing on enquiry.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#cold-products"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 text-center font-body text-lg font-bold text-white shadow-sm transition-all hover:opacity-95"
              >
                View products
              </Link>
              <Link
                href="/pvc-strip-curtains/help/buying"
                className="inline-flex items-center justify-center rounded-md bg-[#e6e8ec] px-8 py-4 text-center font-body text-lg font-bold text-[#191c1f] transition-colors hover:bg-[#e0e2e6]"
              >
                Buying guide
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 right-0 -z-10 h-1/2 w-1/3 skew-x-12 translate-x-20 bg-[#f2f4f8]"
          aria-hidden
        />
      </section>

      <section id="cold-products" className="scroll-mt-40 py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">
                Cold storage applications
              </h2>
              <div className="mt-4 h-1 w-24 bg-[#FC8347]" />
            </div>
            <p className="max-w-md font-body text-[#584237]">
              Polar-grade PVC compounds stay flexible in sub-zero conditions. Match strip width, overlap, and compound to
              your opening and traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Polar grade PVC",
                desc: "Low-temperature performance for walk-in coolers and chillers.",
                range: "-25°C to +30°C",
                img: IMG.polar,
                alt: "Clear polar grade PVC strip curtain",
                href: "/pvc-strip-curtains/polar-pvc-strip-curtain",
              },
              {
                title: "Super polar grade",
                desc: "Deep-freeze duty for blast freezers and high-traffic freezer openings.",
                range: "-45°C to +15°C",
                img: IMG.superPolar,
                alt: "Heavy duty industrial freezer PVC strips",
                href: "/enquiry",
              },
              {
                title: "Anti-microbial strips",
                desc: "Food-safe and hygiene-focused installations where wash-down matters.",
                range: "-15°C to +40°C",
                img: IMG.antiMicrobial,
                alt: "Sanitary anti-microbial PVC strip installation",
                href: "/enquiry",
              },
            ].map((card) => (
              <article key={card.title} className="bg-white p-1 shadow-sm ring-1 ring-[#e0c0b1]/20">
                <div className="relative mb-6 aspect-square overflow-hidden bg-[#eceef2]">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="px-6 pb-8">
                  <h3 className="font-headline text-xl font-bold md:text-2xl">{card.title}</h3>
                  <p className="mt-2 font-body text-sm text-[#584237]">{card.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-b border-[#e0c0b1]/30 py-3">
                    <span className="font-body text-xs font-bold uppercase text-[#584237]">Typical range</span>
                    <span className="font-mono text-sm font-bold text-[#FC8347]">{card.range}</span>
                  </div>
                  <p className="mt-2 font-body text-[10px] uppercase tracking-wide text-[#584237]/80">
                    Indicative only — confirm on quote
                  </p>
                  <Link
                    href={card.href}
                    className="mt-6 block w-full bg-[#e6e8ec] py-3 text-center font-body text-sm font-bold uppercase tracking-widest text-[#191c1f] transition-colors hover:bg-[#FC8347] hover:text-white"
                  >
                    {card.href.startsWith("/enquiry") ? "Get quote" : "View detail"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cold-specifications" className="scroll-mt-40 overflow-hidden bg-[#f2f4f8] py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#FC8347]/5 blur-3xl" aria-hidden />
              <h2 className="font-headline text-4xl font-bold tracking-tighter text-[#191c1f] md:text-5xl">
                Thermal efficiency
                <br />& energy savings
              </h2>
              <div className="mt-8 space-y-8">
                {[
                  {
                    icon: Thermometer,
                    title: "Climate retention",
                    body: "Strip curtains limit air exchange when doors cycle, helping hold set-point and protect cold-chain integrity in busy docks.",
                  },
                  {
                    icon: Zap,
                    title: "Compressor load",
                    body: "Fewer temperature spikes can reduce plant run hours — savings depend on traffic, envelope, and set-point; we size for your duty.",
                  },
                  {
                    icon: Snowflake,
                    title: "Frost mitigation",
                    body: "Less warm, moist air ingress can slow ice build-up on coils and thresholds when paired with correct overlap and compound.",
                  },
                ].map((row) => (
                  <div key={row.title} className="flex gap-5 md:gap-6">
                    <row.icon className="h-10 w-10 shrink-0 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
                    <div>
                      <h4 className="font-headline text-lg font-bold text-[#191c1f]">{row.title}</h4>
                      <p className="mt-2 font-body text-[#584237]">{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-video rotate-2 bg-white p-4 shadow-xl">
                <Image
                  src={IMG.thermal}
                  alt="Industrial cold storage thermal imaging reference"
                  fill
                  className="object-cover brightness-110 grayscale"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute -bottom-6 -left-6 max-w-[200px] -rotate-3 bg-[#FC8347] p-6 text-white shadow-lg">
                  <div className="font-headline text-3xl font-bold md:text-4xl">Up to 25%</div>
                  <div className="mt-1 font-body text-xs font-bold uppercase tracking-wider">
                    Energy savings (site-dependent)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cold-documentation" className="scroll-mt-40 py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-12 md:mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">
              Precision measurement guide
            </h2>
            <p className="mt-4 font-body text-[#584237]">Three checks before we cut strips to length.</p>
          </div>

          <div className="grid h-auto grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[600px]">
            <div className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#e0e2e6] p-8 md:col-span-2 md:row-span-2 md:p-12">
              <span className="pointer-events-none absolute right-8 top-8 font-headline text-6xl font-black text-[#FC8347]/20">
                01
              </span>
              <h3 className="relative z-10 font-headline text-2xl font-bold md:text-3xl">
                Internal reveal
                <br />
                width & height
              </h3>
              <p className="relative z-10 mt-4 font-body text-[#584237]">
                Measure the clear opening in three places; use maximum width and height for the hanging zone.
              </p>
              <Link
                href="/pvc-strip-curtains/help/buying"
                className="relative z-10 mt-4 inline-flex items-center gap-2 font-body font-bold text-[#FC8347] transition-all group-hover:gap-3"
              >
                Read buying guide
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <div
                className="absolute inset-0 translate-y-full bg-[#9d4300]/5 transition-transform duration-500 group-hover:translate-y-0"
                aria-hidden
              />
            </div>

            <div className="group relative flex min-h-[200px] flex-col justify-center overflow-hidden bg-[#e6e8ec] p-8 md:col-span-2 md:row-span-1">
              <span className="pointer-events-none absolute right-4 top-4 font-headline text-4xl font-black text-[#FC8347]/20">
                02
              </span>
              <h3 className="font-headline text-xl font-bold">Soffit / fixing plane</h3>
              <p className="mt-2 font-body text-sm text-[#584237]">
                Confirm whether the rail fixes to lintel underside or wall face — it changes drop and bracket spacing.
              </p>
              <div
                className="absolute inset-0 translate-x-full bg-[#9d4300]/5 transition-transform duration-500 group-hover:translate-x-0"
                aria-hidden
              />
            </div>

            <div className="flex min-h-[180px] flex-col justify-center bg-[#FC8347] p-8 text-white md:col-span-1 md:row-span-1">
              <Ruler className="mb-4 h-9 w-9" strokeWidth={1.5} aria-hidden />
              <h3 className="font-headline text-lg font-bold">
                Standard
                <br />
                overlap
              </h3>
              <p className="mt-2 font-body text-xs text-white/85">
                Typical: ~50% overlap for chillers; higher for freezer traffic — confirmed on site survey.
              </p>
            </div>

            <div className="flex min-h-[180px] flex-col justify-center border-l-4 border-[#FC8347] bg-[#e0e2e6] p-8 md:col-span-1 md:row-span-1">
              <span className="mb-2 font-body text-sm font-bold uppercase text-[#FC8347]">Rule 03</span>
              <h3 className="font-headline text-lg font-bold text-[#191c1f]">Floor clearance</h3>
              <p className="mt-2 font-body text-xs text-[#584237]">Allow a small gap so strips do not drag on ice or thresholds.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e0c0b1]/20 bg-[#f2f4f8] py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <h2 className="mb-12 text-center font-headline text-2xl font-bold text-[#191c1f] md:mb-16 md:text-3xl">
            Lifecycle of your order
          </h2>
          <div className="relative flex flex-col items-start gap-10 md:flex-row md:justify-between md:gap-8">
            <div className="absolute left-0 top-8 hidden h-px w-full bg-[#e0c0b1]/50 md:block" aria-hidden />
            {[
              { icon: ClipboardList, title: "Quote", desc: "Requirements and opening schedule captured." },
              { icon: ShoppingCart, title: "Purchase order", desc: "Specs and sizes signed off." },
              { icon: Package, title: "Prepared", desc: "Cut, punched, and QC checked." },
              { icon: Truck, title: "Shipped", desc: "Packed for site receiving." },
              { icon: CheckCircle2, title: "Installation", desc: "Hook-on systems where applicable.", highlight: true },
            ].map((step) => (
              <div key={step.title} className="relative z-10 flex-1 text-center">
                <div
                  className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-md ${
                    step.highlight
                      ? "border-[#051125] bg-[#051125] text-white"
                      : "border-[#e0c0b1] bg-white text-[#584237]"
                  }`}
                >
                  <step.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                </div>
                <h4 className="font-headline text-sm font-bold text-[#191c1f]">{step.title}</h4>
                <p className="mt-2 px-2 font-body text-xs leading-tight text-[#584237]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-10 flex items-center gap-4 md:mb-12">
            <h2 className="font-headline text-3xl font-bold text-[#191c1f] md:text-4xl">Cold storage installations</h2>
            <div className="h-px flex-1 bg-[#e0c0b1]/40" />
          </div>
          <div className="grid h-auto grid-cols-1 gap-4 md:grid-cols-12 md:h-[min(800px,85vh)]">
            <div className="group relative min-h-[280px] overflow-hidden md:col-span-8 md:row-span-2 md:min-h-0">
              <Image
                src={IMG.gallery1}
                alt="Industrial freezer door with PVC strip curtains"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 66vw"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-8">
                <p className="font-body font-medium text-white">Distribution hub — high-speed traffic lane</p>
              </div>
            </div>
            <div className="relative min-h-[200px] overflow-hidden md:col-span-4 md:row-span-1 md:min-h-0">
              <Image
                src={IMG.gallery2}
                alt="Pharmaceutical cool room with strip curtains"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <div className="relative min-h-[200px] overflow-hidden md:col-span-4 md:row-span-1 md:min-h-0">
              <Image
                src={IMG.gallery3}
                alt="Food processing freezer curtains"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cold-support" className="relative scroll-mt-40 overflow-hidden bg-[#191c1f] py-20 md:py-24">
        <div
          className="absolute top-0 right-0 h-full w-1/2 skew-x-12 translate-x-32 bg-[#FC8347]/10"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
            Ready to secure your
            <br />
            cold room facility?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-body text-lg text-white/70 md:text-xl">
            Technical review, compound selection, and cut-to-length kits — request a quote for your opening schedule.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#FC8347] px-10 py-5 font-body text-lg font-bold text-white transition-all hover:bg-white hover:text-[#FC8347]"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/25 px-10 py-5 font-body text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e0e2e6] bg-[#f2f4f8] px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/pvc-strip-curtains" className="font-body text-sm font-bold text-[#FC8347] hover:underline">
            ← All PVC strip curtains
          </Link>
          <p className="font-body text-xs text-[#584237]">drooov — industrial doors & strip curtains, Australia.</p>
        </div>
      </div>
    </div>
  );
}
