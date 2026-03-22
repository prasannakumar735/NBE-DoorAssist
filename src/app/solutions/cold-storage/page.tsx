import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  Calculator,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Snowflake,
  TrendingDown,
  Verified,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industrial Cold Storage Solutions | drooov",
  description:
    "Thermal precision for cold-chain logistics — rapid roller doors, insulated barriers, and Australian industrial specifications.",
};

const BG = "#fbf9f8";
const BRAND = "#FC8347";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#FC8347] px-6 py-3 font-semibold text-white hover:opacity-90";
const btnPrimaryLg =
  "inline-flex items-center justify-center gap-3 rounded-md bg-[#FC8347] px-10 py-4 font-headline text-base font-bold tracking-tight text-white transition-all hover:opacity-90 sm:px-12 sm:text-lg";
const btnSecondaryDark =
  "inline-flex items-center justify-center rounded-md border border-[#051125] px-8 py-3 font-headline text-sm font-bold tracking-tight text-[#051125] transition-colors hover:border-[#FC8347] hover:text-[#FC8347] sm:px-10 sm:py-4";

const technicalGridStyle: CSSProperties = {
  backgroundImage: "radial-gradient(circle at 2px 2px, #c5c6cd 1px, transparent 0)",
  backgroundSize: "40px 40px",
  opacity: 0.1,
};

export default function ColdStorageSolutionsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      <div className="pt-24">
        {/* Hero — image + single gradient; no solid dark bg or extra opacity stacks */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1581091215367-59ab6b6f2f7a?q=80&w=2000&auto=format&fit=crop"
              alt="Industrial cold storage warehouse"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#051125]/80 via-[#051125]/60 to-transparent"
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-white">
            <div className="max-w-4xl space-y-8">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#FC8347]">
                Engineered thermal solutions
              </p>
              <h1 className="font-headline text-6xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl">
                Thermal Precision for <br />
                <span className="text-[#FC8347]">Cold Chain Logistics</span>
              </h1>
              <p className="max-w-2xl font-body text-lg leading-relaxed text-white/80 md:text-xl">
                High-performance containment systems engineered for demanding environments. Automated thermal barriers to
                reduce energy loss at high-cycle openings — quotes prepared against your schedule (no pricing online).
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className={btnPrimary}>
                  Request Quote
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                </Link>
                <Link
                  href="/technical"
                  className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 font-semibold text-white"
                >
                  Technical documentation
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 right-12 z-10 hidden lg:block">
            <div className="border-l-2 border-[#FC8347] pl-6 py-2">
              <div className="mb-1 font-body text-[0.65rem] uppercase tracking-wider text-white/60">System status</div>
              <div className="font-headline text-3xl font-bold tabular-nums text-white">-40°C operational</div>
              <div className="mt-1 font-body text-[0.65rem] uppercase tracking-widest text-white/60">
                Thermal retention — industrial grade
              </div>
            </div>
          </div>
        </section>

        {/* Bento features */}
        <section className="py-24 md:py-32" style={{ backgroundColor: BG }}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-20 md:flex-row">
              <div className="max-w-xl">
                <p className="mb-4 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
                  // Operational superiority
                </p>
                <h2 className="font-headline text-4xl font-bold tracking-tight text-[#051125] md:text-5xl">
                  Precision engineered containment
                </h2>
              </div>
              <p className="max-w-sm font-body text-sm leading-relaxed text-gray-600">
                Protecting inventory starts at the perimeter. Cold-storage barriers built for high-frequency traffic and
                dependable uptime.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex aspect-square flex-col justify-between border-b-4 bg-white p-10 shadow-sm md:aspect-auto" style={{ borderColor: BRAND }}>
                <Snowflake className="h-10 w-10 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
                <div className="space-y-4">
                  <h3 className="font-headline text-2xl font-bold text-[#051125]">Thermal insulation</h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Advanced curtain and seal strategies to limit thermal bridging and stabilise internal temperatures.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between bg-[#eae8e7] p-10 shadow-sm">
                <ShieldCheck className="h-10 w-10 text-[#051125]" strokeWidth={1.5} aria-hidden />
                <div className="space-y-4">
                  <h3 className="font-headline text-2xl font-bold text-[#051125]">Hygienic surfaces</h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Materials suited to clean environments and food-grade operations — specified to your audit framework.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between bg-[#051125] p-10 text-white shadow-xl">
                <Bolt className="h-10 w-10 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
                <div className="space-y-4">
                  <h3 className="font-headline text-2xl font-bold">Rapid operation</h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    High-speed automation options to shorten open times and reduce air exchange — ideal for busy docks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product split */}
        <section className="pb-24 md:pb-32" style={{ backgroundColor: BG }}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <article className="group relative overflow-hidden bg-[#f5f3f3] p-8 md:p-12">
                <div className="relative z-10 flex flex-col items-start gap-12 md:flex-row">
                  <div className="w-full space-y-6 md:w-1/2">
                    <span className="inline-block bg-[#FC8347] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Premium series
                    </span>
                    <h3 className="font-headline text-3xl font-bold leading-tight text-[#051125] md:text-4xl">
                      Rapid roller freezer doors
                    </h3>
                    <div className="space-y-3 pt-6">
                      {[
                        ["Temp range", "-40°C to +20°C"],
                        ["Insulation focus", "High-cycle interfaces"],
                        ["Opening speed", "High-speed options"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-gray-300/80 pb-2">
                          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{k}</span>
                          <span className="text-sm font-bold text-[#051125]">{v}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/products"
                      className="mt-8 inline-block border-b-2 border-[#051125] pb-1 font-bold text-[#051125] transition-colors hover:border-[#FC8347] hover:text-[#FC8347]"
                    >
                      View specifications
                    </Link>
                  </div>
                  <div className="relative w-full md:w-1/2">
                    <div className="relative aspect-square overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDORsMG4QcQ2KBhlw_5A6DupQrPDI2-o3-9d-1mZcZ2cZMM7uH0O66rMVloPcWlS3sog62igWg2BlKJUBiG0YBPbBpCG4ysmgoIoFmbAY0KDmfZdRTXxy_VkLxNAS0KXW24VnRLSpLScLEWyYBlaD2MBnJ94DFGlzsn9xfX-rW3L1ZjoSLpywcHZ531twyyBXo6NaQLUAnyrsWakl7KcURJz3RJnz_UaIcMCRmNQNtPLK2SK4ijUhOgtsCthYOeCsIV29S0MaRsBA"
                        alt="Industrial rapid roller door"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </article>

              <article className="group relative overflow-hidden bg-[#f5f3f3] p-8 md:p-12">
                <div className="relative z-10 flex flex-col items-start gap-12 md:flex-row">
                  <div className="w-full space-y-6 md:w-1/2">
                    <span className="inline-block bg-[#051125] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Utility series
                    </span>
                    <h3 className="font-headline text-3xl font-bold leading-tight text-[#051125] md:text-4xl">
                      Cold-room PVC strip curtains
                    </h3>
                    <div className="space-y-3 pt-6">
                      {[
                        ["Visibility", "Polar-grade options"],
                        ["Temp range", "-25°C to +15°C"],
                        ["Durability", "Reinforced profiles"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-gray-300/80 pb-2">
                          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{k}</span>
                          <span className="text-sm font-bold text-[#051125]">{v}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-8 inline-block border-b-2 border-[#051125] pb-1 font-bold text-[#051125] transition-colors hover:border-[#FC8347] hover:text-[#FC8347]"
                    >
                      Request a custom configuration
                    </Link>
                  </div>
                  <div className="relative w-full md:w-1/2">
                    <div className="relative aspect-square overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWSJWRtaSxE7jVrTx-mTejY5ED2f5oa1XLrb53_UwkJenFd6p8oCP2XLVT346dxd6XH2S6_Jt6ft28zqluOlHTIlFGZkORdugbUtkC2n57FeFZPCwyP2st5KQIloAoI-s97NBZZE4TDYWfLzD5i6E79jnLJsdgwJhqBCYT7nvQmKBNeqJxZkTLeAIkB6G7lsMHCiEzw4pngJM0Q7bIMDwWSOCyfZrIIkemcZIgyyjsS9SIeWAgrDVowc6O9wtYxDS3rZhSCf14Rw"
                        alt="PVC strip curtains"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Technical grid icons */}
        <section className="relative overflow-hidden bg-[#f5f3f3] py-24">
          <div className="pointer-events-none absolute inset-0" style={technicalGridStyle} aria-hidden />
          <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-3">
              {[
                {
                  icon: Verified,
                  title: "Australia-wide compliance",
                  body: "Documentation aligned with common Australian structural and operational expectations for industrial openings.",
                },
                {
                  icon: ShieldCheck,
                  title: "Food-grade suitability",
                  body: "Materials and finishes selected for clean environments where hygiene controls apply.",
                },
                {
                  icon: Calculator,
                  title: "Specification-led quoting",
                  body: "We size models from your opening schedule and traffic profile — no generic price lists.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="space-y-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center bg-white shadow-sm">
                    <Icon className="h-9 w-9 text-[#051125]" strokeWidth={1.25} aria-hidden />
                  </div>
                  <h4 className="font-headline text-xl font-bold uppercase tracking-tight text-[#051125]">{title}</h4>
                  <p className="text-sm text-gray-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32" style={{ backgroundColor: BG }}>
          <div className="container mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 text-center font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
                Engineering trust
              </p>
              <h2 className="mb-16 text-center font-headline text-3xl font-bold text-[#051125] md:text-4xl">
                Facilities rely on drooov
              </h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {[
                  {
                    quote:
                      "The rapid doors have been robust for our 24/7 food logistics cycle — commissioning and support were straightforward.",
                    name: "Marcus Thorne",
                    role: "Director, FreshGrid Logistics",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwrPC1ObRfLNZ68QYtB_k3aI8zsaDRnWaMoAfD9AaTCVPeeocnYI64DJ0Lb4DH9-ZMFBM09WaAUWWDrI6B8rIek_43R7BiExMiPhkV63zBC2nPRjAKzODKvzB8b8xVnRiQRkJP5an89FUv0FjOQyymxFn3DYjKEu-05Vxln_8GurfY9T_jjpmw5LfIifELoebTZKTOEtmNQAbR8qgqIzeZ-ZGpTBCep5MDt_T8xdmGRcne_5QK90_qu6ArFk3yUtoqf0DydFtwsA",
                  },
                  {
                    quote:
                      "Maintaining precise temperatures for pharmaceuticals is non-negotiable. The thermal approach passed our internal audit requirements.",
                    name: "Dr. Elena Rossi",
                    role: "Ops lead, BioPharma ColdChain",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2EhvboDP_Y-yqRHZqNtZioie1eS9uArzQLK4Xfjn_sabwD8PNgjSDPYlWSr54qMyJRZA8w1rZNx57Yj2dTz7J6jKJQQkNla6TRi9DaRZFtC6oyJJII3lN8NsEUIyzmzzjVGJpZZC6x54iA0VO-X7zgKTd0xl42HGEiMymS_95S96UPRCfCqsGMuLeb0CikPifX0fU7G13F_79mzkubfWD4VUd0FUsJGnT4DYI_aHdY3UyFQ4UsWrWiMtnUgGwYIHvxZNOEU4lqA",
                  },
                ].map((t) => (
                  <figure key={t.name} className="relative bg-white p-10 shadow-sm">
                    <span className="font-headline absolute left-4 top-4 text-6xl leading-none text-[#FC8347]/20" aria-hidden>
                      &ldquo;
                    </span>
                    <blockquote className="relative z-10">
                      <p className="mb-8 text-lg italic leading-relaxed text-[#051125]">&ldquo;{t.quote}&rdquo;</p>
                      <figcaption className="flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#eae8e7]">
                          <Image src={t.img} alt="" fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <p className="font-bold text-[#051125]">{t.name}</p>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{t.role}</p>
                        </div>
                      </figcaption>
                    </blockquote>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case study — light sidebar (drooov light theme) */}
        <section className="border-t border-gray-200 py-24 md:py-32" style={{ backgroundColor: BG }}>
          <div className="container mx-auto max-w-6xl px-6 md:px-8">
            <div className="mb-12 md:mb-16">
              <p className="mb-4 font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">
                // Field performance
              </p>
              <h2 className="max-w-3xl font-headline text-3xl font-bold leading-tight tracking-tight text-[#051125] md:text-4xl lg:text-5xl">
                Case study: thermal efficiency in high-traffic logistics
              </h2>
            </div>
            <div className="grid grid-cols-1 overflow-hidden rounded-sm shadow-2xl lg:grid-cols-12">
              <div className="relative min-h-[400px] lg:col-span-8 lg:min-h-[500px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrjVXWkPefVHWG3TOzMTeM2x0h6LN8pfCdmyMWGxCImZCkjOPDtH0ASoTYcIbCrmSIHzCxCZBW4Yn0dDS-SW6P56RUtZD28tGUHt34wLciD7DKwXxe5tg_LcTNa4N1M2nU-AWsyIoJm6i31lJkazjU_2UTbdhxsDWJ0LxKsTCvn0A5k8n74d4DhTECOfFV0Yd6W1poHBmMyk9V02NvWedXdPlOsfxJh3IGZ3dj18o_WYnlEz5eGyoD-AsChNrUpch2KAMugmpVOQ"
                  alt="Cold storage facility with rapid doors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051125]/50 via-transparent to-transparent" aria-hidden />
              </div>
              <div className="flex flex-col justify-between border-l border-gray-200 bg-white p-10 lg:col-span-4 lg:p-12">
                <div className="space-y-10">
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FC8347]">
                      The challenge
                    </h4>
                    <p className="font-light leading-relaxed text-gray-600">
                      Maintaining a strict cold environment in a high-traffic distribution hub with hundreds of door
                      cycles per day.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FC8347]">
                      The solution
                    </h4>
                    <p className="font-light leading-relaxed text-gray-600">
                      Insulated rapid doors with high-speed cycle options and thermal break detailing — commissioned to
                      site requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FC8347]">
                      Outcomes
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 font-headline text-lg font-bold text-[#051125]">
                        <TrendingDown className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                        Lower thermal loss at the opening
                      </li>
                      <li className="flex items-center gap-3 font-headline text-lg font-bold text-[#051125]">
                        <CheckCircle2 className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                        Predictable operation under peak traffic
                      </li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className={`${btnPrimary} mt-10 w-full justify-center sm:mt-12`}
                >
                  Discuss your project
                  <FileText className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA — light band, orange CTAs */}
        <section className="border-t border-gray-200 py-24" style={{ backgroundColor: BG }}>
          <div className="container mx-auto max-w-7xl px-6 text-center md:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="font-headline text-4xl font-bold tracking-tighter text-[#051125] md:text-5xl lg:text-6xl">
                Ready to secure your cold chain?
              </h2>
              <p className="font-body text-xl font-light text-gray-600">
                Join industrial facilities across Australia optimising openings with specification-led supply and
                support.
              </p>
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <Link href="/contact" className={btnPrimaryLg}>
                  Request Quote
                </Link>
                <Link href="/enquiry" className={btnSecondaryDark}>
                  Enquire Now
                </Link>
              </div>
              <p className="pt-4 font-body text-[0.6rem] uppercase tracking-[0.3em] text-gray-400">
                Response time: business hours — we&apos;ll confirm next steps by email
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
