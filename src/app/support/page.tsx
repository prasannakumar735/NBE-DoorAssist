import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gauge,
  Headphones,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support & Maintenance | drooov",
  description:
    "Industrial support, maintenance programs, and spare parts enquiries for drooov rapid door systems — Australia-wide.",
};

const maintenancePlans = [
  {
    name: "Standard care",
    blurb: "Scheduled inspections for lower-traffic facilities.",
    border: "border-gray-200",
    features: ["Annual site review (example)", "Lubrication & adjustment checklist", "Safety interface verification"],
    cta: "Request information",
    featured: false,
  },
  {
    name: "Pro performance",
    blurb: "More frequent reviews for high-cycle logistics interfaces.",
    border: "border-[#FC8347]",
    features: [
      "Semi-annual audit cadence (example)",
      "Priority response window (contract-dependent)",
      "Wear-point inspection notes",
    ],
    cta: "Request information",
    featured: true,
  },
  {
    name: "Enterprise",
    blurb: "Critical infrastructure programs with dedicated coordination.",
    border: "border-[#051125]",
    features: ["Quarterly deep service (example)", "Diagnostics planning", "Dedicated support lead (where offered)"],
    cta: "Request information",
    featured: false,
  },
] as const;

const spareParts = [
  {
    code: "MOT-PX-400",
    title: "Heavy duty drive motor",
    spec: "Industrial drive unit (example)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUDypH9sY594oXGh2HiVnBYC3Jf7mmGnJapTXLPuLOfBRGcIczCY4nWso96DMSCP2vpw3LY7Bbtu7o6pNuLv46vtQ6dM0by3xREKI1wtYmq8C7aenGZnlzz2UE8iq5oD2vYjdzTaBU2cYOSSxo-Bp3xesA0lc15fxr78sp6itK2Oa57L-_fo-VpePfZXMSqv22DUO_YA9xiWqSt7wKYLqOEwxarbaZdFj_pyx5KwyJ7KUJiHvH_Zmt1hzR4vBKKBpRSnMIWTK1zw",
  },
  {
    code: "SEN-LSR-02",
    title: "Safety sensor package",
    spec: "Multi-point detection (example)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXuhkGsUX0cvrrp_5R798a4c48IobqevtJ7ubNcX6XmSu9T2HqHWXJ6rE43Lwk9BMJiZphJfChxCe_fuXcfEXa3c9FF4gXPRoWetACsyuz0yBgPjTfcd_oJVrBH66NgdkUFRNidVoyBkVrNMs1YMDdQ5_NzoEwdCGrPpHLNvkAG6sr340PEvTpk-mc9d-LR3gcJxrp6NTFes1559Rar8YJrBSLjb9aq2wTXwujU6yidQPQxQVN99AaiirLZQv_ffiKN_0_NBo-gw",
  },
  {
    code: "SL-BTM-80",
    title: "Reinforced bottom seal",
    spec: "Weather sealing (example)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpB_LZjoE6RUm16pbBCmJB6kAAcoEEO9qcLvgu6kat07TfFq9TuGYHW9PIelUjGt2FKaflaN81kb27AAP38nhnOY3qKPn-KBUdPVUrcmZbtVfPfHbp-QIyDwZNrjo6IJfqL5dzVaFvUfLHKnYsh9JOagzqQQ3PH5VzHD_MBoj8t6kxufBdYkodEwxxK-HIn3hoGVVup19rEQn8XJwGRD2oDwkbH6tzfZcC5GFikfXhCTxoWJWmzEGFisMDUeXmMSjuI1Z8Bd_QIw",
  },
  {
    code: "FAB-PNL-HD",
    title: "High-speed fabric panel",
    spec: "Industrial curtain material (example)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2phItyapjozoyu0bslpOV3eZ6Q3ZXJ7lt4iq3-0Kfti4P9bP7ORT7G4NeeleIw4gXldqWFTB7hp4iobzDfbMmwr6jZo1mppNrMLktCYZLJ3Z6KNz6UG0CyuoR9bRdwlZceYJW_zlj8n6D96WOR9Pz9xV8Y4PzipndWma5WlRDXTrLdFvoaWc8EAgYiHxhHD4XIw4Wg00kJt4yd7E3qYIxj9dz2a1Mji6gHLl6v7vzgYwaC8y0ygll2hUQUhzvTDZ78iAKsXl1oA",
  },
] as const;

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#fbf9f8] font-body text-[#1b1c1c] selection:bg-[#FC8347]/20 selection:text-[#051125]">
      <div className="pt-24">
        {/* Hero */}
        <section className="relative flex h-[min(716px,85vh)] min-h-[480px] items-center overflow-hidden bg-[#1b263b]">
          <div className="absolute inset-0 z-0 opacity-45">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzQ0wO8-TE_6xyaddWs0CzPhNgNX9bmScgLSp31HKha_QKkrbT5yt6dGiwTi-7U2uZtZymKUS7VTiMp4lN5NrCouy3VrbtPUiUuQWqLb7yMGgY8x-K4MMeMPI2WKX9oTQHHmQ2HsezQOzm9WPP4AQAdNm18xeYXyq8FtC4VO2TN9XGkzDy_Hy8TqjWScFqpYXA6hVDirGU8euxG9UFcu0gaR3SlelHStHlhbxwx3nYKpk3gvzQEnNhqKF55oX_uU2ervdB2doaNg"
              alt="Technician inspecting industrial door system"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="container relative z-10 mx-auto max-w-[1440px] px-8">
            <div className="max-w-2xl text-white md:max-w-3xl">
              <p className="technical-label mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#a8b4c9]">
                Maintenance protocol // sec_01
              </p>
              <h1 className="mb-6 font-headline text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                Industrial support &amp; <br />
                maintenance
              </h1>
              <p className="mb-8 max-w-lg font-body text-lg leading-relaxed text-slate-300">
                Peak performance and safe operation through structured support, responsive maintenance coordination, and
                genuine parts — request service via enquiry (no pricing shown here).
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-md bg-[#FC8347] px-8 py-4 font-headline text-sm font-bold text-white transition-all hover:opacity-90"
                >
                  Request service
                </Link>
                <Link
                  href="/technical"
                  className="rounded-md border border-white/30 px-8 py-4 font-headline text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className="bg-[#f5f3f3] py-12 md:py-16">
          <div className="container mx-auto max-w-[1440px] px-8">
            <div className="flex flex-col overflow-hidden rounded-lg shadow-sm md:flex-row md:items-stretch">
              <div className="flex flex-col justify-center bg-[#F0554D] p-10 text-white md:w-1/3 md:p-12">
                <AlertTriangle className="mb-6 h-12 w-12" strokeWidth={1.25} aria-hidden />
                <h2 className="mb-4 font-headline text-2xl font-bold md:text-3xl">Urgent breakdown support</h2>
                <p className="mb-8 font-body text-sm opacity-90">
                  For safety-critical faults, contact us immediately with your site location and door identification.
                </p>
                <Link
                  href="tel:1300376668"
                  className="flex items-center gap-3 border-t border-white/20 pt-6 text-xl font-bold tracking-wide"
                >
                  <Phone className="h-7 w-7 shrink-0" aria-hidden />
                  1300 DROOOV
                </Link>
              </div>
              <div className="flex flex-col justify-center bg-white p-10 md:w-2/3 md:p-12">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="technical-label mb-2 text-xs font-semibold uppercase tracking-wider text-red-600">
                      Service promise
                    </h4>
                    <p className="text-sm text-gray-600">
                      Coordinated technical assistance for drooov industrial openings across Australia.
                    </p>
                  </div>
                  <div>
                    <h4 className="technical-label mb-2 text-xs font-semibold uppercase tracking-wider text-red-600">
                      Expert partners
                    </h4>
                    <p className="text-sm text-gray-600">
                      Factory-aligned support pathways and genuine parts sourcing through approved channels.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="w-fit rounded-md bg-[#051125] px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1b263b]"
                >
                  Request urgent assistance
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance programs */}
        <section className="bg-[#fbf9f8] py-20 md:py-24">
          <div className="container mx-auto max-w-[1440px] px-8">
            <div className="mb-12 md:mb-16">
              <p className="technical-label mb-2 text-xs font-semibold uppercase tracking-widest text-[#FC8347]">
                System health // programs
              </p>
              <h2 className="font-headline text-3xl font-bold text-[#051125] md:text-4xl">Preventative maintenance</h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Program names are illustrative — scope and response windows are agreed in writing (no rates on this page).
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {maintenancePlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex h-full flex-col border-t-4 bg-white p-8 shadow-sm transition-all hover:shadow-xl ${plan.border} ${
                    plan.featured ? "z-10 shadow-lg md:scale-[1.02]" : ""
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute right-0 top-0 bg-[#FC8347] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Popular
                    </span>
                  ) : null}
                  <h3 className="mb-2 font-headline text-2xl font-bold text-[#051125]">{plan.name}</h3>
                  <p className="mb-8 text-sm text-gray-600">{plan.blurb}</p>
                  <ul className="mb-10 flex-grow space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FC8347]" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`w-full rounded-md py-3 text-center text-sm font-bold transition-all ${
                      plan.featured
                        ? "bg-[#FC8347] text-white hover:opacity-90"
                        : "bg-[#eae8e7] text-[#051125] hover:bg-[#051125] hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spare parts */}
        <section className="bg-[#f5f3f3] py-20 md:py-24">
          <div className="container mx-auto max-w-[1440px] px-8">
            <div className="mb-10 flex flex-col items-end justify-between gap-6 md:mb-12 md:flex-row">
              <div>
                <p className="technical-label mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Parts reference // example SKUs
                </p>
                <h2 className="font-headline text-3xl font-bold text-[#051125] md:text-4xl">Spare parts repository</h2>
              </div>
              <div className="relative w-full md:w-96">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Search by part code or component…"
                  className="w-full rounded-md border-none bg-white py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#FC8347] focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {spareParts.map((part) => (
                <div
                  key={part.code}
                  className="rounded-sm border border-gray-200 bg-white p-4 transition-all hover:border-[#FC8347]/50"
                >
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-sm bg-[#f0eded]">
                    <Image src={part.img} alt="" fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                  </div>
                  <p className="technical-label text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    {part.code}
                  </p>
                  <h4 className="mb-1 text-sm font-bold text-[#051125]">{part.title}</h4>
                  <p className="mb-4 text-xs text-gray-600">{part.spec}</p>
                  <Link
                    href="/contact"
                    className="block w-full border border-[#051125] py-2 text-center text-[10px] font-black uppercase tracking-widest text-[#051125] transition-colors hover:bg-[#051125] hover:text-white"
                  >
                    Request quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service ticket CTA */}
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
          <div className="pointer-events-none absolute top-0 right-0 -z-0 hidden h-full w-1/3 translate-x-1/4 -skew-x-12 bg-[#f5f3f3] lg:block" aria-hidden />
          <div className="container relative z-10 mx-auto max-w-[1440px] px-8">
            <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="technical-label mb-2 text-xs font-semibold uppercase tracking-widest text-[#FC8347]">
                  Service request
                </p>
                <h2 className="mb-6 font-headline text-3xl font-bold text-[#051125] md:text-4xl">Log a service request</h2>
                <p className="mb-10 max-w-md text-gray-600">
                  Tell us your site, asset details, and issue type — our team routes enquiries during business hours (no
                  automated ticketing on this marketing site).
                </p>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff4ec]">
                      <Zap className="h-6 w-6 text-[#FC8347]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#051125]">Structured follow-up</h4>
                      <p className="text-sm text-gray-600">We respond with next steps aligned to urgency and site access.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff4ec]">
                      <Wrench className="h-6 w-6 text-[#FC8347]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#051125]">Trained partners</h4>
                      <p className="text-sm text-gray-600">Installation and service through certified partner networks.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff4ec]">
                      <ShieldCheck className="h-6 w-6 text-[#FC8347]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#051125]">Genuine components</h4>
                      <p className="text-sm text-gray-600">Parts discussions are handled through commercial channels — no cart or checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-2xl ring-1 ring-gray-100 md:p-10">
                <p className="mb-4 text-sm text-gray-600">
                  Complete the enquiry form with your company, site, serial or model reference, and issue description.
                </p>
                <ul className="mb-8 space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FC8347]" aria-hidden />
                    Business-hours triage for non-emergency requests
                  </li>
                  <li className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-[#FC8347]" aria-hidden />
                    Include photos or fault codes where possible
                  </li>
                  <li className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-[#FC8347]" aria-hidden />
                    Prefer phone for urgent safety issues
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="mb-3 flex w-full items-center justify-center rounded-md bg-[#051125] py-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#1b263b]"
                >
                  Open enquiry form
                </Link>
                <Link
                  href="/enquiry"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 py-3 text-xs font-bold uppercase tracking-widest text-[#051125] hover:bg-[#f5f3f3]"
                >
                  Quick product enquiry
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
