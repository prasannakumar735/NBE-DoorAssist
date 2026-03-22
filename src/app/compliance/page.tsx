import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ChefHat,
  Download,
  FileText,
  Leaf,
  Package,
  Shield,
  ShieldCheck,
  Wind,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance & Standards | drooov",
  description:
    "Safety, compliance, and industrial standards for drooov rapid door systems — documentation and guidance aligned to Australian project requirements.",
};

const tableRows = [
  {
    series: "Rapid-X (example family)",
    wind: "Class 4 (up to ~140 km/h illustrative)",
    uValue: "3.5 (illustrative)",
    cycles: "1,500,000 (illustrative MTBF)",
    sound: "18 dB (illustrative)",
  },
  {
    series: "ColdSeal (example family)",
    wind: "Class 3 (illustrative)",
    uValue: "1.2 insulated (illustrative)",
    cycles: "800,000 (illustrative)",
    sound: "24 dB (illustrative)",
  },
  {
    series: "PureFlow (example family)",
    wind: "Class 2 (illustrative)",
    uValue: "5.8 (illustrative)",
    cycles: "2,000,000+ (illustrative)",
    sound: "12 dB (illustrative)",
  },
] as const;

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#fbf9f8] font-body text-[#1b1c1c] selection:bg-[#FC8347]/20 selection:text-[#051125]">
      <div className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#fbf9f8] px-8 pb-24 pt-8 md:pt-12">
          <div className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-1/3 translate-x-1/4 skew-x-12 bg-[#f5f3f3]" aria-hidden />
          <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-6 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
                Industrial integrity
              </span>
              <h1 className="mb-8 font-headline text-5xl font-bold leading-[1.1] tracking-tight text-[#051125] md:text-6xl lg:text-7xl">
                Safety, compliance &amp; <br />
                industrial standards
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                Precision engineering aligned to regulatory expectations. We support documentation and site governance for
                Australian industrial openings — project-specific packs are issued through engineering (no product
                pricing on this page).
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/technical"
                  className="group inline-flex items-center gap-2 rounded-md bg-[#051125] px-8 py-4 font-headline text-sm font-bold text-white shadow-lg shadow-[#051125]/10 transition-all hover:opacity-90"
                >
                  Documentation library
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" aria-hidden />
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 px-8 py-4 font-headline text-sm font-bold text-[#051125] transition-colors hover:bg-[#f5f3f3]"
                >
                  Technical support
                </Link>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-[#f5f3f3]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK5GFILiwv1MdbKKYClgs1wBrqbWcjOd3h87gv0hQ82gpb0HuUMnNOB1WCV2JP5ZygUxeVK45BaMIc-HYnQZ0wXurPQIlT4xLhbYo7FKNOqXwgE8kRSEdK9ArEHaUxNp8FMSYC0v-AjWMDXoTAtYlHx6bmsa02S4rhkWvtLyC9G1LC31xiM5F-OvKj5pn-H4S2NSlnIjh0W4ltXss76DHZOUFbeQWd0D3Au-h2vev6VL4q3p1QwlrjHsDhmVTahvfVDQpSOF7SPQ"
                  alt="Industrial door hardware and facility context"
                  fill
                  className="object-cover opacity-90 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#051125]/20 to-transparent" aria-hidden />
                <div className="absolute bottom-6 left-6 rounded border border-white/30 bg-white/80 p-4 shadow-sm backdrop-blur-md">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#051125]">
                    Verified documentation // ISO-aligned QMS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento pillars */}
        <section className="bg-[#f5f3f3] px-8 py-20 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 md:mb-16">
              <span className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-500">Core framework</span>
              <h2 className="font-headline text-3xl font-bold text-[#051125] md:text-4xl">Pillars of compliance</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-12">
              <div className="flex h-80 flex-col justify-between bg-white p-10 transition-all duration-500 group-hover:bg-[#051125] md:col-span-2 lg:col-span-4">
                <div>
                  <Wind className="mb-6 h-10 w-10 text-[#FC8347] group-hover:text-white" strokeWidth={1.25} aria-hidden />
                  <h3 className="mb-4 font-headline text-2xl font-bold text-[#051125] group-hover:text-white">
                    Structural &amp; wind context
                  </h3>
                </div>
                <p className="leading-relaxed text-gray-600 group-hover:text-white/80">
                  Specifications are aligned to project wind classification and fixing methodology — documented in
                  submittals for engineer review.
                </p>
              </div>
              <div className="relative flex h-80 flex-col justify-between overflow-hidden bg-white p-10 shadow-sm transition-shadow hover:shadow-xl md:col-span-2 lg:col-span-8">
                <div className="relative z-10">
                  <ChefHat className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                  <h3 className="mb-4 font-headline text-2xl font-bold text-[#051125]">Food-safe environments</h3>
                  <p className="max-w-md leading-relaxed text-gray-600">
                    Materials and finishes can be selected for clean environments and cold-chain interfaces — aligned to
                    your hygiene and audit framework.
                  </p>
                </div>
                <ShieldCheck
                  className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 text-[#051125]/[0.05]"
                  strokeWidth={1}
                  aria-hidden
                />
              </div>
              <div className="flex h-80 flex-col justify-between bg-white p-10 md:col-span-2 lg:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Building2 className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                    <h3 className="mb-4 font-headline text-2xl font-bold text-[#051125]">Quality management</h3>
                  </div>
                  <span className="rounded border border-gray-300 px-2 py-1 font-body text-[10px] uppercase tracking-wide text-gray-500">
                    QMS traceability
                  </span>
                </div>
                <p className="max-w-lg leading-relaxed text-gray-600">
                  Consistent documentation from manufacture through installation support — controlled revisions and
                  handover records on request.
                </p>
              </div>
              <div className="flex h-80 flex-col justify-between bg-[#051125] p-10 text-white md:col-span-2 lg:col-span-5">
                <div>
                  <Shield className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
                  <h3 className="mb-4 font-headline text-2xl font-bold">Site safety alignment</h3>
                </div>
                <p className="leading-relaxed text-white/75">
                  Risk controls for high-cycle traffic interfaces, maintenance access, and emergency behaviour are
                  addressed in project-specific documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance table — illustrative metrics only; not commercial pricing */}
        <section className="bg-[#fbf9f8] px-8 py-20 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex flex-col items-end justify-between gap-6 md:mb-12 md:flex-row">
              <div>
                <span className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-500">
                  Technical documentation
                </span>
                <h2 className="font-headline text-3xl font-bold text-[#051125] md:text-4xl">Performance metrics</h2>
                <p className="mt-2 max-w-xl text-sm text-gray-600">
                  Illustrative technical fields for comparison — verified values are issued in project documentation (no
                  commercial pricing on this page).
                </p>
              </div>
              <p className="text-right font-body text-sm uppercase tracking-tight text-gray-500">
                Report ref: DRV-CS-2024 (example)
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200/80 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#eae8e7]">
                    <th className="px-6 py-5 font-body text-xs font-bold uppercase tracking-widest text-gray-600 md:px-8">
                      Series / family
                    </th>
                    <th className="px-6 py-5 font-body text-xs font-bold uppercase tracking-widest text-gray-600 md:px-8">
                      Wind / exposure
                    </th>
                    <th className="px-6 py-5 font-body text-xs font-bold uppercase tracking-widest text-gray-600 md:px-8">
                      Thermal (U-value)
                    </th>
                    <th className="px-6 py-5 font-body text-xs font-bold uppercase tracking-widest text-gray-600 md:px-8">
                      Duty / cycles
                    </th>
                    <th className="px-6 py-5 font-body text-xs font-bold uppercase tracking-widest text-gray-600 md:px-8">
                      Acoustics
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {tableRows.map((row, i) => (
                    <tr
                      key={row.series}
                      className={`transition-colors hover:bg-[#f5f3f3] ${i % 2 === 1 ? "bg-[#fbf9f8]/90" : "bg-white"}`}
                    >
                      <td className="px-6 py-6 font-headline text-lg font-bold text-[#051125] md:px-8 md:text-xl">
                        {row.series}
                      </td>
                      <td className="px-6 py-6 text-gray-600 md:px-8">{row.wind}</td>
                      <td className="px-6 py-6 text-gray-600 md:px-8">{row.uValue}</td>
                      <td className="px-6 py-6 text-gray-600 md:px-8">{row.cycles}</td>
                      <td className="px-6 py-6 text-gray-600 md:px-8">{row.sound}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Certification strip */}
        <section className="border-y border-gray-200 bg-white px-8 py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] text-center">
            <h3 className="mb-10 font-body text-xs uppercase tracking-[0.25em] text-gray-500 md:mb-12">
              Accreditation &amp; standards alignment
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-80 md:gap-16">
              {[
                { icon: ShieldCheck, label: "HACCP context" },
                { icon: Package, label: "ISO 9001 QMS" },
                { icon: Shield, label: "AS/NZS alignment" },
                { icon: Leaf, label: "Energy efficiency" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="h-12 w-12 text-[#051125]" strokeWidth={1.1} aria-hidden />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Asset library + request card */}
        <section className="bg-[#051125] px-8 py-20 text-white md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="mb-6 font-headline text-3xl font-bold md:text-4xl lg:text-5xl">Compliance document library</h2>
                <p className="mb-10 max-w-xl text-lg text-white/65">
                  Official packs, drawings references, and safety documentation are issued through our engineering and
                  commercial workflow — request access for your project phase.
                </p>
                <div className="space-y-3">
                  <div className="group flex cursor-default items-center gap-4 rounded-md bg-white/5 p-4 transition-colors hover:bg-white/10">
                    <FileText className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">Product compliance overview (example)</p>
                      <p className="text-xs text-white/45">PDF pack • issued on request</p>
                    </div>
                    <Download className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </div>
                  <div className="group flex cursor-default items-center gap-4 rounded-md bg-white/5 p-4 transition-colors hover:bg-white/10">
                    <Shield className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">Site safety &amp; maintenance references</p>
                      <p className="text-xs text-white/45">PDF pack • issued on request</p>
                    </div>
                    <Download className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-8 text-[#051125] shadow-xl md:p-12">
                <h3 className="mb-4 font-headline text-2xl font-bold">Request project-specific specs</h3>
                <p className="mb-6 text-sm text-gray-600">
                  We do not collect project details on this marketing page. Use the enquiry form to describe wind class,
                  thermal targets, and traffic — we&apos;ll respond with documentation options (no pricing shown here).
                </p>
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-md bg-[#FC8347] py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:opacity-90"
                >
                  Start an enquiry
                </Link>
                <p className="mt-4 text-center text-xs text-gray-500">
                  Or visit{" "}
                  <Link href="/technical" className="font-semibold text-[#FC8347] hover:underline">
                    technical documentation
                  </Link>{" "}
                  for the public index.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
