import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  Cpu,
  Factory,
  FileText,
  Gauge,
  HardHat,
  Leaf,
  Monitor,
  PackageCheck,
  ScrollText,
  Settings2,
  Shield,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

const accent = "#f97316";

const IMG = {
  hero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgvb4kehv4lM920Cv3-fR6krwIvGg1phvkN1nErx2f7RvkcnteCFDX8SjOx3HYvcL_EG_qxLVQV_DEeK-QSxhVfW_qSEsuO7yjhOsiYHY_vZFeERkiXWXegB-xWWEKMRM8FvXcOmU8kiOGq-JoSvnu9V5cL3ECvmIispE3PBMWDNy7fg3Y7WwadcGRGoPxGZubQ0pD5cvj-stAwukHnLhu81OHNdAqwF3XcVY4Xfoup-wnu_1895x4u3ek9Aagj22Jf67VWD388g0",
  bentoRapid:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQrwzfRkApOtgBD3hxgMkgvet0eoyZYoxaATiliW3g89EUY16xnY41OtvAUszuv261O5A4asJXaPeXpsSeiwSFpa0vTftwcSMJ0AUjqaC8GskIeCXgMIQ38vniu8RQ8p2CerKwli0B7Yqup9NDDIVTaqHg2ngnmISaoLsyYQrNWheFpjZF9ZYZqeMnQ00b5c2W4uBzcNAR9xMC0DZwgni_Bqfu3yfZwA8_B-1Y8Z6oQeWCccGjUlg6U-2d99rK6uHsNh5Go26NzK4",
  bentoPvc:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
  bentoCold:
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80",
  uncompromising:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXJDxFhFI58AhTbZa94VvAQF9-U7EPTi7thmiGSLV-3dtkL2oXAh0LLqaz982p_iPH9aWKu8n78q2rNhRiPT3w2hN1z0Znr29KVTEpn8phzkYUoMmVpAneaPPgCeVEAcOwCs8MtliTPUnQzakeTTutyec3vBdtx49GjvAzF_1g77Gefq2l3umruse27yakQePYkQV4GlprEoLvFkkYASzt_8E6NihQELl03ABuBg-EHJdg5bg0fLCg8ov6ptyW0_spW9-jlD5rTec",
  bentoSectional:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBlGT8vRbku-IcFEr53D9DfvGdl_-YPVEMwLDEsxp6OWy2g4F4HL65ROVW_DsVzuLODWK64OqcFc1z8bn-9NLBYjtV_kRDiG0ganJQOUDQEkGMQQ7ejwmpqcTI4Bbd5Qd42MrniHTnksCjmg5p_a2gwo2ILU62L2CW0x_QgJXYgN8pSBuqS2oCp6WdJS0MtNGtyPGkFDvQeme4FPIMz0fIYcc5P1edX6zza8T7TA7cJhQHEilyRfXfQbxUPZ4VbXW32Rk5kWK4x-gI",
};

const UNCOMPROMISING = [
  {
    title: "Rigorous quality assurance",
    body: "Components and suppliers are assessed against industrial safety and durability expectations for your environment.",
    Icon: BadgeCheck,
  },
  {
    title: "High-velocity performance",
    body: "Fast open/close cycles help reduce air migration and support climate control in busy openings.",
    Icon: Zap,
  },
  {
    title: "Safety-first design",
    body: "Soft-bottom edges, photocells, and pressure-sensitive options are specified to match your risk assessment.",
    Icon: Shield,
  },
] as const;

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "48hr", label: "Fast Turnaround" },
  { value: "5 Year", label: "Warranty" },
  { value: "AU", label: "Australia Wide Support" },
] as const;

const ENGINEERING_INTEGRITY = [
  {
    title: "Modular Control Logic",
    body: "Integrated PLC systems with variable frequency drives for millisecond precision in opening cycles.",
    Icon: Cpu,
  },
  {
    title: "Safety Architecture",
    body: "Multi-point laser grids and pressure-sensitive edges come standard across all high-speed modules.",
    Icon: Shield,
  },
  {
    title: "Thermal Barrier Tech",
    body: "High-density insulated panels designed for extreme temperature differentials in freezer hubs.",
    Icon: Thermometer,
  },
] as const;

const COMPLIANCE_ARCHITECTURE = [
  {
    title: "Lifecycle Reliability (ROI)",
    body: "Systematic fatigue testing protocols ensure a lower Total Cost of Ownership (TCO) over a 15-year lifecycle compared to industry averages.",
    Icon: CircleCheck,
  },
  {
    title: "Safety Logic Integration",
    body: "Integrated safety light curtains and EN-compliant impact protocols prevent operational downtime and ensure worker protection.",
    Icon: Shield,
  },
  {
    title: "Sustainability & Compliance",
    body: "Modules engineered to meet strict HVAC energy efficiency standards, contributing to LEED and BREEAM certifications.",
    Icon: Leaf,
  },
] as const;

const PROJECT_LIFECYCLE = [
  {
    title: "Quote",
    body: "Detailed assessment and transparent pricing.",
    Icon: FileText,
  },
  {
    title: "Purchase order",
    body: "Formal agreement and project locking.",
    Icon: ScrollText,
  },
  {
    title: "Order received",
    body: "Processing and materials sourcing.",
    Icon: PackageCheck,
  },
  {
    title: "Product prepared",
    body: "Custom engineering and QC checks.",
    Icon: Factory,
  },
  {
    title: "Shipped",
    body: "Secure transport via AU logistics.",
    Icon: Truck,
  },
  {
    title: "Installation",
    body: "Expert setup by certified techs.",
    Icon: HardHat,
    isFinal: true,
  },
] as const;

const WHY = [
  {
    title: "High-Speed Performance",
    desc: "Fast open/close cycles to support logistics throughput and reduce air exchange.",
    Icon: Gauge,
  },
  {
    title: "Energy Efficiency",
    desc: "Tight seals and insulated options to support climate-controlled buildings.",
    Icon: Leaf,
  },
  {
    title: "Durable Industrial Build",
    desc: "Components specified for high-cycle duty and harsh warehouse environments.",
    Icon: Shield,
  },
  {
    title: "Custom Configurations",
    desc: "Widths, drives, and safety packages matched to your site on enquiry.",
    Icon: Settings2,
  },
] as const;

export default function RapidRollerHubLanding() {
  return (
    <div className="bg-white text-[#191c1f]">
      <section className="border-b border-[#e8eaee]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#584237]">Industrial Solutions</p>
            <h1 className="font-headline text-5xl font-bold leading-[0.95] tracking-tight text-[#051125] sm:text-6xl lg:text-7xl">
              RAPID
              <br />
              ROLLER
              <br />
              <span style={{ color: accent }}>DOORS</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#584237]">
              High-speed industrial doors engineered for warehouses, logistics and cold storage.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#ea580c] to-[#f97316] px-8 py-4 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-95"
              >
                Get Quote
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-8 py-4 text-sm font-bold text-[#191c1f] transition-colors hover:border-[#f97316] hover:text-[#ea580c]"
              >
                View Products
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] w-full overflow-hidden rounded-xl bg-[#f3f4f6] md:min-h-[480px]">
            <Image
              src={IMG.hero}
              alt="Industrial rapid roller door in a warehouse"
              fill
              className="object-cover grayscale contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8eaee] bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-headline text-3xl font-bold tracking-tight md:text-4xl" style={{ color: accent }}>
                  {s.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#584237]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 border-y border-[#e8eaee] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 border-l-8 border-[#f97316] pl-6 md:mb-16 md:flex-row md:items-end md:justify-between md:pl-8">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">Heavy-Duty Hardware</p>
              <h2 className="font-headline mt-2 text-4xl font-black uppercase tracking-tight text-[#f97316] md:text-5xl lg:text-6xl">
                Mission Critical Doors
              </h2>
            </div>
            <p className="max-w-md text-base font-medium leading-relaxed text-[#9a3412]">
              Every component is selected for field performance. We prioritize ease of maintenance and structural integrity to keep your site operational 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <Link
              href="/rapid-roller-doors/high-speed-fabric-rapid-door"
              className="group relative flex min-h-[500px] flex-col justify-end overflow-hidden rounded-xl border border-[#e8eaee] bg-white shadow-sm md:col-span-8"
            >
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-95">
                <Image
                  src={IMG.bentoRapid}
                  alt="Steel rapid roll door close-up"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  unoptimized
                />
              </div>
              <div className="relative z-10 bg-gradient-to-t from-white via-white/98 to-transparent p-10 pt-24">
                <span className="mb-4 inline-block border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#f97316]">
                  Reinforced Steel &amp; High-Tension Fabric
                </span>
                <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-[#f97316] md:text-4xl">Rapid Roller Doors</h3>
                <p className="mb-8 mt-4 max-w-lg text-sm text-[#9a3412]">
                  Engineered for 1,000,000+ cycles. Featuring heavy-gauge tracks and impact-resistant curtains designed for logistics hubs.
                </p>
                <div className="mb-8 flex flex-wrap gap-3">
                  <span className="border border-[#fed7aa] bg-[#fff7ed] px-4 py-2 text-xs font-bold uppercase text-[#f97316]">
                    High-Speed Fabric Door
                  </span>
                  <span className="border border-[#fed7aa] bg-[#fff7ed] px-4 py-2 text-xs font-bold uppercase text-[#f97316]">
                    Steel Slat Rapid Roll
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#f97316] transition-transform group-hover:translate-x-2">
                  Full Durability Report <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>

            <Link
              href="/pvc-strip-curtains/pvc-swing-doors"
              className="flex flex-col justify-between rounded-xl border border-[#e8eaee] bg-[#fafafa] p-10 shadow-sm transition-colors hover:border-[#f97316]/40 md:col-span-4"
            >
              <div>
                <div className="mb-8 flex h-16 w-16 items-center justify-center border-b-4 border-[#f97316] bg-[#fff7ed] text-[#f97316]">
                  <Wrench className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-[#f97316]">PVC Swing Doors</h3>
                <p className="mb-8 mt-3 text-sm font-medium text-[#9a3412]">
                  Impact-rated traffic doors. Built to survive constant forklift passage in high-throughput clean zones.
                </p>
                <div className="border-l-4 border-[#f97316] bg-[#fff7ed] p-4">
                  <span className="text-xs font-black uppercase text-[#f97316]">Reinforced Impact PVC</span>
                </div>
              </div>
            </Link>

            <Link
              href="/rapid-roller-doors/freezer-doors"
              className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#e8eaee] bg-[#fafafa] p-10 shadow-sm transition-colors hover:border-[#f97316]/40 md:col-span-4"
            >
              <Snowflake className="pointer-events-none absolute -right-4 -top-4 h-[120px] w-[120px] text-[#f97316] opacity-[0.08]" aria-hidden />
              <div className="mb-8 flex items-start justify-between">
                <Thermometer className="h-10 w-10 text-[#f97316]" strokeWidth={1.5} aria-hidden />
                <span className="rounded border border-[#fed7aa] bg-[#fff7ed] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                  Cold Chain Ready
                </span>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-[#f97316]">Insulated Freezer</h3>
                <p className="mb-8 mt-3 text-sm font-medium text-[#9a3412]">
                  Thermal barrier systems designed for -30°C environments with heated side guides to prevent ice-up.
                </p>
                <span className="inline-block border-b-2 border-[#f97316] pb-1 text-[10px] font-black uppercase text-[#f97316]">Maintenance Manuals</span>
              </div>
            </Link>

            <Link
              href="/rapid-roller-doors/industrial-sectional-panel-door"
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e8eaee] bg-white shadow-sm transition-colors hover:border-[#f97316]/40 md:col-span-8 md:flex-row"
            >
              <div className="relative h-64 w-full shrink-0 grayscale transition-all duration-500 group-hover:grayscale-0 md:h-auto md:min-h-[280px] md:w-2/5">
                <Image
                  src={IMG.bentoSectional}
                  alt="Sectional panel door detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col justify-center bg-[#fafafa] p-10">
                <h3 className="font-headline text-2xl font-black uppercase tracking-tight text-[#f97316] md:text-3xl">Heavy Sectional Panels</h3>
                <p className="mb-8 mt-4 text-sm font-medium text-[#9a3412]">
                  High-security perimeter protection. Multi-wall panels with thermal breaks and heavy-duty torsion spring systems.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase text-[#f97316]">Field-Serviceable Hardware</span>
                  <div className="h-0.5 flex-1 bg-[#e5e7eb]" />
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[#f97316] transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
            </Link>
          </div>

          <div
            className="mt-12 h-1.5 w-full rounded-sm"
            style={{
              background: `repeating-linear-gradient(45deg, ${accent} 0px, ${accent} 10px, #e5e7eb 10px, #e5e7eb 20px)`,
            }}
            aria-hidden
          />
        </div>
      </section>

      <section className="border-y border-[#e0c0b1]/20 bg-[#f2f4f8] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
              Project Lifecycle
            </p>
            <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight text-[#051125] md:text-4xl">
              Precision From Quote to Install
            </h2>
          </div>
          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 top-[1.5rem] hidden h-px w-full -translate-y-1/2 bg-[#e0c0b1]/40 md:block"
              aria-hidden
            />
            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-6 lg:gap-8">
              {PROJECT_LIFECYCLE.map((step) => {
                const isFinal = "isFinal" in step && step.isFinal;
                const Icon = step.Icon;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center">
                    <div
                      className={`z-10 mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-md md:mb-6 ${
                        isFinal
                          ? "bg-gradient-to-br from-[#9d4300] to-[#f97316] text-white shadow-lg shadow-[#f97316]/25"
                          : "border-2 border-[#f97316] bg-white text-[#f97316]"
                      }`}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={isFinal ? 2 : 1.75} />
                    </div>
                    <h3 className="font-headline text-sm font-bold text-[#051125]">{step.title}</h3>
                    <p className="mt-2 max-w-[14rem] px-1 text-xs leading-relaxed text-[#584237] md:px-2">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8eaee] bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-[#f97316] md:text-5xl">Engineering Integrity</h2>
            <div className="mt-10 space-y-12">
              {ENGINEERING_INTEGRITY.map(({ title, body, Icon }) => (
                <div key={title} className="flex gap-6">
                  <div className="mt-1 shrink-0 text-[#f97316]" aria-hidden>
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-[#f97316]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9a3412]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pb-16 pl-4 pt-4 sm:pb-20 lg:pb-12 lg:pl-0">
            <div className="relative rounded-xl border border-[#e8eaee] bg-[#fafafa] p-4 shadow-sm">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-[#e5e7eb] bg-white p-10 sm:p-12">
                <div className="relative h-full w-full border border-[#f97316]/40 opacity-95">
                  <div className="absolute inset-x-0 top-1/4 h-px bg-[#f97316]/60" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-[#f97316]/60" />
                  <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f97316] animate-pulse" />
                  <p className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-widest text-[#f97316]">
                    Ref: DRV-MOD-04 // SPEC-A
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 left-4 max-w-xs rounded-lg border border-[#fed7aa] bg-white p-6 shadow-lg sm:-bottom-10 sm:left-auto sm:right-4 lg:-bottom-10 lg:-left-6 lg:right-auto">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Live Status</p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#9a3412]">
                  System optimized for 1.2M cycles / year with minimal maintenance required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8eaee] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tighter text-[#f97316] md:text-5xl">
                Compliance &amp; Integrity Architecture
              </h2>
              <div className="mt-12 grid gap-12">
                {COMPLIANCE_ARCHITECTURE.map(({ title, body, Icon }) => (
                  <div key={title} className="group flex gap-8">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#fed7aa] bg-[#fff7ed] transition-colors group-hover:border-[#f97316] group-hover:bg-[#f97316]"
                      aria-hidden
                    >
                      <Icon
                        className="h-6 w-6 text-[#f97316] transition-colors group-hover:text-white"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-[#f97316]">{title}</h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-[#9a3412]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex aspect-square min-h-[280px] flex-col justify-between rounded-xl border border-dashed border-[#fed7aa] bg-[#fafafa] p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#f97316]">Efficiency_Report_2024</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-[#f97316]">HVAC Load Reduction</p>
                  </div>
                  <Monitor className="h-10 w-10 shrink-0 text-[#f97316]" strokeWidth={1.25} aria-hidden />
                </div>
                <div className="flex h-44 items-end gap-1.5 px-2 sm:h-52 sm:px-4">
                  <div className="h-[30%] w-full rounded-sm bg-[#f97316]/20" />
                  <div className="h-[45%] w-full rounded-sm bg-[#f97316]/30" />
                  <div className="h-[60%] w-full rounded-sm bg-[#f97316]/40" />
                  <div className="h-[85%] w-full rounded-sm bg-[#f97316]/50" />
                  <div className="h-[95%] w-full rounded-sm bg-[#f97316]" />
                  <div className="h-[90%] w-full rounded-sm bg-[#f97316]/80" />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-[#e5e7eb] pt-6 font-mono text-[10px] text-[#9a3412]">
                  <span>PEAK_DEMAND: -14%</span>
                  <span>OP_SAVINGS: $3,200/unit/yr</span>
                  <span>AIR_LEAKAGE: &lt;0.5m³/h.m²</span>
                  <span>VERSION: STABLE_V2</span>
                </div>
              </div>
              <div className="absolute -right-2 -top-3 bg-[#f97316] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-tighter text-white sm:-right-4">
                SYSTEM_OPTIMIZED
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8eaee] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
            Why drooov
          </p>
          <h2 className="font-headline mt-2 text-3xl font-bold tracking-tight text-[#051125] md:text-4xl">
            Built for industrial throughput
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ title, desc, Icon }) => (
              <div key={title} className="border-t border-[#e8eaee] pt-4">
                <Icon className="h-8 w-8" style={{ color: accent }} strokeWidth={1.5} aria-hidden />
                <h3 className="font-headline mt-4 text-lg font-bold text-[#051125]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#584237]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8eaee] bg-[#f7f9fd] px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#eceef2]">
              <Image
                src={IMG.uncompromising}
                alt="Clean modern warehouse interior"
                fill
                className="object-cover grayscale brightness-95"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div
              className="absolute -bottom-6 -right-4 flex w-40 flex-col items-center justify-center rounded-lg p-5 text-center text-white shadow-xl sm:-bottom-8 sm:-right-8 sm:w-48"
              style={{ backgroundColor: accent }}
            >
              <span className="font-headline text-3xl font-bold sm:text-4xl">24/7</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">Support availability</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              The Rapid standard
            </span>
            <h2 className="font-headline text-4xl font-bold leading-tight tracking-tighter text-[#051125] sm:text-5xl">
              Engineered for the Uncompromising.
            </h2>
            <ul className="mt-10 space-y-8">
              {UNCOMPROMISING.map(({ title, body, Icon }) => (
                <li key={title} className="flex gap-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0" style={{ color: accent }} strokeWidth={1.75} aria-hidden />
                  <div>
                    <h3 className="font-headline text-lg font-bold text-[#051125]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#584237]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8eaee] bg-[#f4f5f7] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-[#051125] md:text-4xl">Need a Rapid Roller Door?</h2>
          <p className="mt-4 text-lg text-[#584237]">Get a custom solution tailored to your site.</p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#ea580c] to-[#f97316] px-10 py-4 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-95"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
