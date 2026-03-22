import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Snowflake,
  TrendingDown,
  Zap,
} from "lucide-react";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUCC9x4bxwM-HEhRyJcBkG_EVMEeHBw46gR57EF3bftgdze0m-ErtAcRtV4LO21RV_KkQLNEc4s_dqAxHovKv1xAgVw78XsgItwxO23roS88FVp69N1Vt5_baazlB5i-UM3F6W7wHvSonRjEy1izZhHUwPcSTPI8nA3xDpLLE76yJUjkzihWrPXPn9J1NTD3c5dDcUi_hvLm9p6PzsCp9ZoYEoM136iBve_lS1DDrgDvq36FHX96fteNsvKO7v8cNbUwOSQoGayQ",
  roller: "https://lh3.googleusercontent.com/aida-public/AB6AXuDORsMG4QcQ2KBhlw_5A6DupQrPDI2-o3-9d-1mZcZ2cZMM7uH0O66rMVloPcWlS3sog62igWg2BlKJUBiG0YBPbBpCG4ysmgoIoFmbAY0KDmfZdRTXxy_VkLxNAS0KXW24VnRLSpLScLEWyYBlaD2MBnJ94DFGlzsn9xfX-rW3L1ZjoSLpywcHZ531twyyBXo6NaQLUAnyrsWakl7KcURJz3RJnz_UaIcMCRmNQNtPLK2SK4ijUhOgtsCthYOeCsIV29S0MaRsBA",
  pvc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWSJWRtaSxE7jVrTx-mTejY5ED2f5oa1XLrb53_UwkJenFd6p8oCP2XLVT346dxd6XH2S6_Jt6ft28zqluOlHTIlFGZkORdugbUtkC2n57FeFZPCwyP2st5KQIloAoI-s97NBZZE4TDYWfLzD5i6E79jnLJsdgwJhqBCYT7nvQmKBNeqJxZkTLeAIkB6G7lsMHCiEzw4pngJM0Q7bIMDwWSOCyfZrIIkemcZIgyyjsS9SIeWAgrDVowc6O9wtYxDS3rZhSCf14Rw",
  caseStudy: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrjVXWkPefVHWG3TOzMTeM2x0h6LN8pfCdmyMWGxCImZCkjOPDtH0ASoTYcIbCrmSIHzCxCZBW4Yn0dDS-SW6P56RUtZD28tGUHt34wLciD7DKwXxe5tg_LcTNa4N1M2nU-AWsyIoJm6i31lJkazjU_2UTbdhxsDWJ0LxKsTCvn0A5k8n74d4DhTECOfFV0Yd6W1poHBmMyk9V02NvWedXdPlOsfxJh3IGZ3dj18o_WYnlEz5eGyoD-AsChNrUpch2KAMugmpVOQ",
};

export default function FreezerDoorsLanding() {
  return (
    <div className="bg-[#fbf9f8] text-[#191c1f]">
      {/* Hero */}
      <section className="relative flex min-h-[min(100vh,58rem)] items-center overflow-hidden bg-[#051125] text-white">
        <div className="absolute inset-0 z-0">
          <Image src={IMG.hero} alt="" fill className="object-cover opacity-40" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#051125] via-[#051125]/85 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-4xl space-y-8">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#FC8347]">
              Engineered thermal solutions
            </p>
            <h1 className="font-headline text-5xl font-bold leading-[0.92] tracking-tighter text-white! md:text-7xl lg:text-8xl">
              Thermal precision for
              <br />
              <span className="text-[#FC8347]!">cold chain &amp; freezers</span>
            </h1>
            <p className="max-w-2xl font-body text-lg font-light leading-relaxed text-white/75 md:text-xl md:text-2xl">
              Insulated rapid doors and coordinated strip barriers for high-cycle freezer and chill openings. Energy and
              frost outcomes are <strong className="font-medium text-white/90">project-specific</strong> — we size duty,
              seals, and controls to your schedule (pricing on enquiry).
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/rapid-roller-doors/insulated-freezer-rapid-door"
                className="inline-flex items-center gap-3 rounded-md bg-[#FC8347] px-10 py-4 font-headline font-bold tracking-tight text-[#051125] transition-all hover:brightness-110"
              >
                Explore freezer door
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/pvc-strip-curtains/industry/cold-room"
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-10 py-4 font-headline font-bold tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Cold-room PVC hub
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-8 z-10 hidden border-l-2 border-[#FC8347] pl-6 lg:block">
          <p className="font-body text-[0.65rem] font-semibold uppercase tracking-widest text-[#FC8347]/80">
            Operating band
          </p>
          <p className="font-headline text-3xl font-bold tabular-nums text-white">-40°C capable</p>
          <p className="font-body text-[0.65rem] uppercase tracking-widest text-white/50">Subject to compound &amp; spec</p>
        </div>
      </section>

      {/* Bento features */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-14 flex flex-col items-end justify-between gap-8 md:mb-20 md:flex-row">
            <div className="max-w-xl">
              <p className="mb-4 font-body text-xs font-bold uppercase tracking-widest text-[#00639b]">
                Operational focus
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-[#051125] md:text-4xl md:text-5xl">
                Precision containment for freezer openings
              </h2>
            </div>
            <p className="max-w-sm font-body text-[#584237]">
              Perimeter performance matters when traffic is constant. drooov specifies insulated rapid closures and
              compatible strip options for Australian cold-chain and food plants.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex aspect-square flex-col justify-between border-b-4 border-[#00639b] bg-white p-8 shadow-sm md:aspect-auto md:min-h-[280px] md:p-10">
              <Snowflake className="h-10 w-10 text-[#00639b]" strokeWidth={1.5} aria-hidden />
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-[#051125]">Thermal insulation</h3>
                <p className="font-body text-sm leading-relaxed text-[#584237]">
                  Insulated curtains, heated guides where required, and air-tight detail options to support set-point
                  stability in freezer thresholds.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-[#eae8e7] p-8 shadow-sm md:min-h-[280px] md:p-10">
              <ShieldCheck className="h-10 w-10 text-[#00639b]" strokeWidth={1.5} aria-hidden />
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-[#051125]">Hygiene-ready surfaces</h3>
                <p className="font-body text-sm leading-relaxed text-[#584237]">
                  Materials and finishes selected for food-adjacent and wash-down environments — aligned to your HACCP
                  hygiene plan on enquiry.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-[#051125] p-8 text-white shadow-xl md:min-h-[280px] md:p-10">
              <Zap className="h-10 w-10 text-[#FC8347]" strokeWidth={1.5} aria-hidden />
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-white!">Rapid operation</h3>
                <p className="font-body text-sm leading-relaxed text-white/75">
                  High-cycle operators with safety interfaces to shorten open time and reduce warm-air ingress — speeds
                  quoted per model and risk assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product split */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <article className="group relative overflow-hidden bg-[#f5f3f3] p-8 md:p-12">
              <div className="relative z-10 flex flex-col items-start gap-10 md:flex-row md:gap-12">
                <div className="w-full space-y-6 md:w-1/2">
                  <span className="inline-block bg-[#FC8347] px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-widest text-white">
                    Rapid roller
                  </span>
                  <h3 className="font-headline text-3xl font-bold leading-tight text-[#051125] md:text-4xl">
                    Insulated freezer rapid doors
                  </h3>
                  <div className="space-y-3 pt-2 font-body">
                    {[
                      ["Typical application", "Freezer, deep-chill, high-cycle docks"],
                      ["Insulation", "Thermal break packages — project-specific"],
                      ["Opening speed", "Model-dependent — see product page"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-[#c5c6cd]/50 pb-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#584237]">{k}</span>
                        <span className="text-right text-sm font-bold text-[#191c1f]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/rapid-roller-doors/insulated-freezer-rapid-door"
                    className="mt-6 inline-flex font-headline font-bold text-[#051125] underline decoration-2 decoration-[#051125] underline-offset-4 transition-colors hover:text-[#FC8347] hover:decoration-[#FC8347]"
                  >
                    View specifications
                  </Link>
                </div>
                <div className="relative w-full md:w-1/2">
                  <div className="relative aspect-square overflow-hidden shadow-2xl">
                    <Image
                      src={IMG.roller}
                      alt="Industrial high-speed insulated door at a freezer opening"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden bg-[#f5f3f3] p-8 md:p-12">
              <div className="relative z-10 flex flex-col items-start gap-10 md:flex-row md:gap-12">
                <div className="w-full space-y-6 md:w-1/2">
                  <span className="inline-block bg-[#051125] px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-widest text-white">
                    PVC complement
                  </span>
                  <h3 className="font-headline text-3xl font-bold leading-tight text-[#051125] md:text-4xl">
                    Cold-room PVC strip curtains
                  </h3>
                  <div className="space-y-3 pt-2 font-body">
                    {[
                      ["Visibility", "Clear / polar-grade options"],
                      ["Typical band", "Indicative — confirm on quote"],
                      ["Durability", "Ribbed or smooth — traffic dependent"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-[#c5c6cd]/50 pb-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#584237]">{k}</span>
                        <span className="text-right text-sm font-bold text-[#191c1f]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/pvc-strip-curtains/industry/cold-room"
                    className="mt-6 inline-flex font-headline font-bold text-[#051125] underline decoration-2 decoration-[#051125] underline-offset-4 transition-colors hover:text-[#FC8347] hover:decoration-[#FC8347]"
                  >
                    View cold-room range
                  </Link>
                </div>
                <div className="relative w-full md:w-1/2">
                  <div className="relative aspect-square overflow-hidden shadow-2xl">
                    <Image
                      src={IMG.pvc}
                      alt="Polar-grade PVC strip curtains in a warehouse cold zone"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Technical strip */}
      <section
        className="relative overflow-hidden bg-[#f5f3f3] py-20 md:py-24"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #c5c6cd 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#f5f3f3]/88" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-14 text-center md:grid-cols-3 md:gap-16">
            {[
              {
                icon: ShieldCheck,
                title: "Standards-aware design",
                body: "Documentation and structural assumptions checked against Australian loading and site conditions — not generic datasheets alone.",
              },
              {
                icon: ClipboardCheck,
                title: "Food & pharma contexts",
                body: "Specifications discussed against your hygiene zoning, cleaning regime, and temperature band.",
              },
              {
                icon: Calculator,
                title: "Load & duty review",
                body: "Cycle counts, opening sizes, and interlocks captured before we commit to a door class or operator.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-5">
                <div className="mx-auto flex h-20 w-20 items-center justify-center bg-white shadow-sm">
                  <item.icon className="h-9 w-9 text-[#051125]" strokeWidth={1.5} aria-hidden />
                </div>
                <h4 className="font-headline text-lg font-bold uppercase tracking-tight text-[#051125]">{item.title}</h4>
                <p className="font-body text-sm text-[#584237]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes (no fabricated testimonials) */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="text-center font-body text-xs font-bold uppercase tracking-widest text-[#00639b]">
            What we optimise for
          </p>
          <h2 className="mt-3 text-center font-headline text-3xl font-bold text-[#051125] md:text-4xl">
            Cold-chain outcomes we work toward
          </h2>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
            <div className="relative bg-white p-8 shadow-sm ring-1 ring-[#e0c0b1]/30">
              <span className="pointer-events-none absolute left-4 top-4 font-headline text-5xl text-[#FC8347]/15" aria-hidden>
                &ldquo;
              </span>
              <p className="relative z-10 font-body text-lg italic leading-relaxed text-[#191c1f]">
                Lower air exchange at busy openings, more stable set-points, and less aggressive defrost demand — when
                the right door class and seals match the traffic.
              </p>
              <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-wide text-[#584237]">
                Typical project goals (not a guarantee)
              </p>
            </div>
            <div className="relative bg-white p-8 shadow-sm ring-1 ring-[#e0c0b1]/30">
              <span className="pointer-events-none absolute left-4 top-4 font-headline text-5xl text-[#FC8347]/15" aria-hidden>
                &ldquo;
              </span>
              <p className="relative z-10 font-body text-lg italic leading-relaxed text-[#191c1f]">
                Audit-friendly documentation: application limits, control category notes, and commissioning checkpoints
                your QA team can file.
              </p>
              <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-wide text-[#584237]">
                Compliance support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case study style */}
      <section className="border-t border-[#e0c0b1]/20 bg-[#fbf9f8] py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-body text-xs font-bold uppercase tracking-widest text-[#00639b]">Field pattern</p>
            <h2 className="max-w-3xl font-headline text-3xl font-bold leading-tight tracking-tight text-[#051125] md:text-4xl md:text-5xl">
              High-traffic freezer threshold — how we approach it
            </h2>
            <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-sm shadow-2xl lg:grid-cols-12">
              <div className="relative min-h-[320px] lg:col-span-8 lg:min-h-[500px]">
                <Image
                  src={IMG.caseStudy}
                  alt="Large cold storage facility with high-speed doors"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051125]/60 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-between bg-[#051125] p-8 text-white md:p-12 lg:col-span-4">
                <div className="space-y-8">
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white!">
                      The challenge
                    </h4>
                    <p className="font-body font-light leading-relaxed text-white/75">
                      Strict sub-zero set-point with hundreds of daily cycles through the same opening.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white!">
                      The approach
                    </h4>
                    <p className="font-body font-light leading-relaxed text-white/75">
                      Insulated rapid door with appropriate safety category, heated components if humidity demands, and
                      coordinated strip or airlock where a second line of defence is needed.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white!">
                      Outcomes to target
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 font-headline text-base font-bold md:text-lg">
                        <TrendingDown className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                        Reduced unnecessary heat ingress
                      </li>
                      <li className="flex items-center gap-3 font-headline text-base font-bold md:text-lg">
                        <CheckCircle2 className="h-6 w-6 shrink-0 text-[#FC8347]" aria-hidden />
                        Controlled frost &amp; ice risk at threshold
                      </li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-10 flex w-full items-center justify-center gap-2 rounded-md bg-[#FC8347] py-4 font-headline font-bold tracking-tight text-[#051125] transition-all hover:brightness-110"
                >
                  Discuss your opening
                  <FileText className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#051125] py-20 text-white md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="font-headline text-4xl font-bold tracking-tighter text-white! md:text-5xl lg:text-6xl">
              Ready to secure your cold chain?
            </h2>
            <p className="font-body text-lg font-light text-white/70 md:text-xl">
              Request a technical review and quote — Australia-wide support for rapid roller and complementary strip
              solutions.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#FC8347] px-10 py-4 font-headline text-lg font-bold text-[#051125] transition-all hover:shadow-lg"
              >
                Get a quote
              </Link>
              <Link
                href="/rapid-roller-doors"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-10 py-4 font-headline text-lg font-bold text-white transition-colors hover:bg-white/10"
              >
                Back to overview
              </Link>
            </div>
            <p className="pt-6 font-body text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
              We respond as soon as practical during business hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
