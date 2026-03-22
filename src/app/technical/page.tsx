import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpDown,
  BookOpen,
  Box,
  Code2,
  Download,
  Factory,
  FileText,
  Filter,
  FolderArchive,
  HelpCircle,
  Layers,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Documentation & Asset Library | drooov",
  description:
    "Technical specifications, installation guidance, and documentation resources for drooov industrial door systems — request project-specific submittals through our team.",
};

const BG = "#fbf9f8";

const chipRowScroll =
  "flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const categories = [
  {
    icon: BookOpen,
    title: "Installation guides",
    tag: "PDF / DWG / MP4",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "User manuals & safety",
    tag: "Site safety alignment",
    highlight: false,
  },
  {
    icon: Box,
    title: "BIM / CAD models",
    tag: "Revit / Archicad",
    highlight: true,
  },
  {
    icon: Factory,
    title: "Product specs & sheets",
    tag: "Technical data",
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Maintenance & service",
    tag: "Service protocols",
    highlight: false,
  },
] as const;

const featuredAssets = [
  {
    icon: FileText,
    iconBg: "bg-[#fff4ec]",
    iconColor: "text-[#FC8347]",
    title: "Rapid roller installation guide (overview)",
    meta: "Updated recently • document pack",
  },
  {
    icon: Code2,
    iconBg: "bg-[#f0eded]",
    iconColor: "text-[#051125]",
    title: "Dock & door scheduling notes (template)",
    meta: "Updated recently • reference only",
  },
  {
    icon: FolderArchive,
    iconBg: "bg-[#fff4ec]",
    iconColor: "text-[#e6733d]",
    title: "Safety & compliance checklist bundle",
    meta: "Updated recently • PDF set",
  },
] as const;

const tableRows = [
  {
    icon: FileText,
    name: "Electrical schematic — main panel (reference)",
    compat: "Rapid roller / high-speed",
    version: "v2.04 (example)",
    size: "4.2 MB",
  },
  {
    icon: Box,
    name: "Cold-chain interface notes (Revit-friendly)",
    compat: "Insulated / cold storage",
    version: "v1.12 (example)",
    size: "88.5 MB",
  },
  {
    icon: Shield,
    name: "Emergency stop & traffic safety protocol",
    compat: "Universal industrial",
    version: "v4.01 (example)",
    size: "1.1 MB",
  },
  {
    icon: Settings,
    name: "Maintenance & inspection guide",
    compat: "Dura-series (example)",
    version: "v2.00 (example)",
    size: "6.7 MB",
  },
  {
    icon: Layers,
    name: "Curtain material specification sheet",
    compat: "High-speed roll-up",
    version: "v1.05 (example)",
    size: "2.3 MB",
  },
] as const;

export default function TechnicalPage() {
  return (
    <div
      className="min-h-screen font-body selection:bg-[#FC8347]/20 selection:text-[#051125]"
      style={{ backgroundColor: BG }}
    >
      <div className="pt-24">
        {/* Hero */}
        <section className="px-8 py-16 md:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-4 block font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                Documentation index // v2.04
              </span>
              <h1 className="font-headline text-5xl font-bold leading-none tracking-tighter text-[#051125] md:text-6xl lg:text-7xl">
                Technical <br />
                documentation &amp; <br />
                asset library
              </h1>
              <p className="mt-8 max-w-xl font-body text-lg font-light leading-relaxed text-gray-600">
                Access technical specifications, drawings references, and installation guidance for drooov industrial
                door systems. Project-specific packs are issued through engineering — no pricing or commercial quotes on
                this page.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-lg bg-white p-6 shadow-[0px_20px_40px_rgba(27,28,28,0.06)]">
                <label className="mb-2 block font-body text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  Search documentation
                </label>
                <div className="relative flex items-center">
                  <Search
                    className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <input
                    type="search"
                    placeholder="Document name, model family, or keyword…"
                    className="w-full rounded-md border-none bg-[#f5f3f3] py-4 pl-12 pr-4 text-sm font-medium text-[#051125] placeholder:text-gray-400 focus:ring-2 focus:ring-[#FC8347] focus:outline-none"
                  />
                </div>
                <div className={`mt-4 ${chipRowScroll}`}>
                  {["Rapid roller", "BIM / Revit", "Cold chain"].map((chip) => (
                    <span
                      key={chip}
                      className="shrink-0 cursor-default rounded-sm bg-[#eae8e7] px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-gray-600"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-[#f5f3f3] px-8 py-16 md:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-col items-baseline justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
                  Categorization
                </span>
                <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-[#051125]">Technical categories</h2>
              </div>
              <div className="mx-8 hidden h-px flex-grow bg-gray-300/80 md:block" />
              <span className="font-mono text-xs text-gray-500">5 core clusters</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {categories.map(({ icon: Icon, title, tag, highlight }) => (
                <div
                  key={title}
                  className={`group cursor-default rounded-lg bg-white p-8 transition-all duration-300 hover:bg-[#051125] ${
                    highlight ? "border-2 border-[#FC8347]/30" : ""
                  }`}
                >
                  <Icon
                    className="mb-6 block h-10 w-10 text-[#FC8347] transition-colors group-hover:!text-white"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="font-headline text-lg font-bold leading-tight !text-[#051125] group-hover:!text-white">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs font-medium uppercase tracking-tighter text-gray-600 group-hover:!text-white/85">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured + table */}
        <section className="bg-[#fbf9f8] px-8 py-20 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-gray-500">Reference library</span>
                <h2 className="mt-2 mb-8 font-headline text-3xl font-bold tracking-tight text-[#051125] md:text-4xl">
                  Frequently requested packs
                </h2>
                <div className="space-y-4">
                  {featuredAssets.map((asset) => (
                    <div
                      key={asset.title}
                      className="group flex cursor-default gap-4 rounded-lg p-4 transition-colors hover:bg-[#f5f3f3]"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded ${asset.iconBg}`}
                      >
                        <asset.icon className={`h-6 w-6 ${asset.iconColor}`} strokeWidth={1.5} aria-hidden />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#051125]">{asset.title}</h4>
                        <p className="mt-1 text-xs text-gray-600">{asset.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 rounded-lg bg-[#051125] p-8 text-white">
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    Engineering request
                  </span>
                  <h3 className="mb-4 font-headline text-2xl font-bold leading-tight !text-[#FC8347]">
                    Request project-specific drawings
                  </h3>
                  <p className="mb-6 text-sm font-light text-white/75">
                    Need a tailored submittal pack for procurement? Our team aligns documentation to your opening
                    schedule — request via enquiry (no pricing shown here).
                  </p>
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-md bg-[#FC8347] py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                  >
                    Request documentation
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-headline text-xl font-bold text-[#051125]">Documentation index (sample)</h3>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex cursor-default items-center gap-2 rounded bg-[#eae8e7] px-3 py-1.5 text-xs font-bold uppercase tracking-tight text-[#051125]"
                    >
                      <Filter className="h-4 w-4" aria-hidden />
                      Filter
                    </button>
                    <button
                      type="button"
                      className="flex cursor-default items-center gap-2 rounded bg-[#eae8e7] px-3 py-1.5 text-xs font-bold uppercase tracking-tight text-[#051125]"
                    >
                      <ArrowUpDown className="h-4 w-4" aria-hidden />
                      Sort
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-md border border-gray-200/80 bg-white">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-[#f5f3f3]">
                        <th className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          Document
                        </th>
                        <th className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          Compatibility
                        </th>
                        <th className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          Version
                        </th>
                        <th className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          File size
                        </th>
                        <th className="px-6 py-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, i) => (
                        <tr
                          key={row.name}
                          className={`border-b border-gray-100 transition-colors hover:bg-[#f5f3f3] ${
                            i % 2 === 1 ? "bg-[#fbf9f8]/80" : ""
                          }`}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <row.icon className="h-5 w-5 shrink-0 text-gray-400" strokeWidth={1.5} aria-hidden />
                              <span className="font-semibold text-[#051125]">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 font-mono text-xs text-gray-700">{row.compat}</td>
                          <td className="px-6 py-5 text-gray-600">{row.version}</td>
                          <td className="px-6 py-5 text-gray-600">{row.size}</td>
                          <td className="px-6 py-5 text-right">
                            <button
                              type="button"
                              className="text-[#FC8347] transition-colors hover:text-[#051125]"
                              aria-label={`Download ${row.name}`}
                            >
                              <Download className="inline h-5 w-5" aria-hidden />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    className="cursor-default rounded border border-gray-300 px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#051125] transition-colors hover:bg-[#eae8e7]"
                  >
                    Load more (coming soon)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="px-8 pb-20">
          <div className="mx-auto max-w-[1440px] rounded-xl bg-[#f5f3f3] p-1">
            <div className="flex flex-col items-center justify-between gap-8 rounded-lg border border-gray-200 bg-white px-8 py-10 md:flex-row md:px-12">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4ec]">
                  <HelpCircle className="h-8 w-8 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-[#051125]">
                    Can&apos;t find a specific document?
                  </h3>
                  <p className="mt-1 font-light text-gray-600">
                    Our team can provide legacy manuals or technical details on request — no product pricing on this page.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-[#051125] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#051125] transition-all hover:bg-[#051125] hover:text-white"
                >
                  Contact engineering
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center rounded-md bg-[#FC8347] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
