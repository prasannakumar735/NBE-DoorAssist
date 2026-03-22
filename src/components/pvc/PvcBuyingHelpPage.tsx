import Image from "next/image";
import Link from "next/link";
import {
  BetweenVerticalEnd,
  Building2,
  CheckCircle2,
  Grid3x3,
  Layers,
  Ruler,
  Snowflake,
  Thermometer,
} from "lucide-react";
import ProjectLifecycleCycle, { FOOD_PRECISION_PIPELINE_STEPS } from "@/components/ui/ProjectLifecycleCycle";

const shadowMd = "shadow-[0px_20px_40px_rgba(25,28,31,0.06)]";

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwWzrHe--jYD_cWExhmwtZZFjJ92zOh-Sq3hgRPPY6Cid2SdAZB_eV2vMN45dZ_DfSyQcd0U5CWQJ9xSAxjppti_dL4xiLeQHPKFu3Q3kxRGv4vh-d2XU35Yrju4BpHxOKlAOx1nP0vJ7XQOyBT2q5J79o-S6dpaAXpSpl5R9P2eZSWsRwVWpBbRLxJ66B4DYzXsI86Yl6vDbqfmTgScMnV-WpERJVK5dHg15LAMT9X9iTH3s4ESe3Z7FbeYvSH3MvJwbA-jWrxXU",
  samples:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBG7Xe5tsq9arfkn0BOoHSfk5nHnMd_dylR-YWuwGODn1Z7TxZql6bsnZD1fJDGodx1JtHI7rphg85lQJgHjpoSpyz2vqVuYu-tfiDQQbTZESIxYSiPeaoQ593AnucWujqh5qjDuClWt5uDV5UMOSBFEGC28kUPDJxFA-L_kzTCKtVgMqRMl1LDZevyvYM_QHBn-9u7HPWtmx8QDMDhKUCIX4esyjYGFurSFieb0eVacxqoP77-h3UQTcgsRC9LF0z2kMDzwXZaRpI",
  galvanized:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAeajOamb4az7uIbXEUFBCU_3BZV0qsvGXkOrqaDUOC9Go-C4ar3LXgED_H5hgvQYSKHKlHoQ5jzF3KhKkjT3sy_uClG-kKVuOK-pPSJOe3vE3wZhuwMobytxlF6uGijjMQLstIS152pfzfnPgWNdX5C0y9VLe61BGnaCpPwTmjJYNEmCAOjcgZtgI4gyC450VaNyHaiYLC6HlptJEVEKV_z4fd7R-1QFmpCkMGhlKHo6GIGgTIa9N3yjkpvIRB2pYCeYg7hX1fMlM",
  stainless:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGMW1YXNgUdJx2mAGNQPzCAB0pBFPjMRHq8CRBS31RdqP3NzzuX4yYr-8V_oi30K9nQXPUI8hGF7FmTYkyBCyEB3vnXsMQN6IaZFvnT4Nz5RyS_T-AnwNEdOchwo-dqD3KA1LJBroAbchcE37nsOD5zPbknqd2bb3qY7EEe4l7AVbHtY4_Mh7n4N16HMspwgobPpgRzHB9d3-h5qIF6ht5oxQNJdDV1VFMy21VqYhW1eIfqs-ZSC86Lz0zZeqh296EVcBvRWVeKCU",
};

const MEASURE_STEPS = [
  {
    title: "1. Internal reveal",
    body: "Measure clear width and height of the opening. Use a straight tape at left, centre, and right (width) and both jambs (height), then work from the tightest usable dimension.",
    Icon: Ruler,
  },
  {
    title: "2. Check clearance",
    body: "Confirm lintel / soffit depth for the head rail and any obstructions (conduits, sprinklers). As a rule of thumb, allow roughly 100 mm vertical space above the clear opening for typical hook-on hardware — we confirm against your rail type on quote.",
    Icon: Building2,
  },
  {
    title: "3. Floor clearance",
    body: "Note floor levelness and drainage. A small gap (often ~5–10 mm) between strip tips and floor reduces drag and edge wear while still maintaining a usable seal.",
    Icon: BetweenVerticalEnd,
  },
] as const;

export default function PvcBuyingHelpPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#191c1f]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">PVC strip curtains</p>
            <h1 className="mt-3 font-headline text-4xl font-bold leading-[1.08] tracking-tight !text-[#051125] md:text-5xl lg:text-6xl xl:text-7xl">
              Help on buying <span className="text-[#FC8347]">PVC curtains</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-[#584237]">
              Step-by-step guidance we use on real enquiries: measure, compound, strip width, hardware, and lead times — in
              drooov&apos;s quote-led workflow (original structure, not copied from third-party guides).
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-4 font-headline text-sm font-semibold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.99]"
              >
                Start configuration
              </Link>
              <Link
                href="/technical"
                className="inline-flex items-center justify-center rounded-md bg-[#e6e8ec] px-8 py-4 font-headline text-sm font-semibold !text-[#051125] transition-colors hover:bg-[#e0e2e6] active:scale-[0.99]"
              >
                Technical reference
              </Link>
            </div>
          </div>
          <div
            className={`relative h-[min(28rem,70vw)] overflow-hidden rounded-xl bg-[#eceef2] md:h-[500px] ${shadowMd}`}
          >
            <Image
              src={IMG.hero}
              alt="Industrial PVC strip curtain across a warehouse opening"
              fill
              className="object-cover opacity-90 mix-blend-multiply grayscale-[0.35]"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f9fd] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Phase 01 — measure */}
      <section className="bg-[#eceef2] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">Phase 01</span>
            <h2 className="mt-2 font-headline text-3xl font-bold !text-[#051125] md:text-4xl">How to measure</h2>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {MEASURE_STEPS.map((s) => (
              <li
                key={s.title}
                className={`rounded-lg bg-white p-8 ${shadowMd}`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#FC8347]/10 text-[#FC8347]">
                  <s.Icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                </div>
                <h3 className="font-headline text-xl font-bold !text-[#051125]">{s.title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#584237]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phase 02 & 03 — bento */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">Phase 02 &amp; 03</span>
            <h2 className="mt-2 font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Selection &amp; configuration</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:auto-rows-fr md:grid-cols-4 md:grid-rows-[1fr_auto] md:min-h-[600px]">
            <div className="flex flex-col justify-between bg-[#eceef2] p-8 md:col-span-2 md:row-span-2 md:p-10">
              <div>
                <h3 className="font-headline text-2xl font-bold !text-[#051125]">Material &amp; colour</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-1 shrink-0 bg-[#FC8347]" aria-hidden />
                    <div>
                      <h4 className="font-headline font-bold !text-[#051125]">Standard clear</h4>
                      <p className="mt-1 font-body text-sm text-[#584237]">
                        General ambient and light chill — compound matched to your temperature band on quote.{" "}
                        <Link href="/pvc-strip-curtains" className="font-semibold text-[#FC8347] hover:underline">
                          Browse products
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-12 w-1 shrink-0 bg-[#00639b]" aria-hidden />
                    <div>
                      <h4 className="font-headline font-bold !text-[#051125]">Polar (freezer / deep chill)</h4>
                      <p className="mt-1 font-body text-sm text-[#584237]">
                        Specified where strips see sustained low temperatures — flexibility window confirmed per datasheet.{" "}
                        <Link
                          href="/pvc-strip-curtains/polar-pvc-strip-curtain"
                          className="font-semibold text-[#FC8347] hover:underline"
                        >
                          Polar range
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-12 w-1 shrink-0 bg-[#7c2d12]" aria-hidden />
                    <div>
                      <h4 className="font-headline font-bold !text-[#051125]">Amber / welding tint</h4>
                      <p className="mt-1 font-body text-sm text-[#584237]">
                        Contrast tints for welding or glare-sensitive bays — filter performance discussed against your WHS
                        context.{" "}
                        <Link href="/technical" className="font-semibold text-[#FC8347] hover:underline">
                          Ask engineering
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 h-40 w-full overflow-hidden rounded-md bg-[#e0e2e6]">
                <Image
                  src={IMG.samples}
                  alt="Assorted industrial PVC strip colours and samples"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>

            <div className="border-b-2 border-[#FC8347] bg-white p-8 md:col-span-2">
              <h3 className="font-headline text-xl font-bold !text-[#051125]">Strip width guide</h3>
              <p className="mt-2 font-body text-xs text-[#584237]">
                Typical starting points; overlap % and opening size drive the final schedule.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { w: "200 mm", label: "Pedestrian / light traffic" },
                  { w: "300 mm", label: "Pallet / FLT common" },
                  { w: "400 mm", label: "Large openings / wind load" },
                ].map((row) => (
                  <div key={row.w} className="rounded-md bg-[#f7f9fd] p-4">
                    <span className="block font-headline font-bold text-[#FC8347]">{row.w}</span>
                    <span className="mt-1 block font-body text-[0.65rem] text-[#584237]">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#e0e2e6] p-8 md:col-span-1">
              <h3 className="font-headline text-lg font-bold !text-[#051125]">Ribbed surface</h3>
              <p className="mt-2 font-body text-xs leading-snug text-[#584237]">
                Hides scuffs in fork lanes; often paired with heavier overlap. See{" "}
                <Link href="/pvc-strip-curtains/welded-rack-strip-door" className="font-semibold text-[#FC8347] hover:underline">
                  welded rack doors
                </Link>
                .
              </p>
              <Grid3x3 className="mt-6 h-10 w-10 text-[#051125]/15" strokeWidth={1.25} aria-hidden />
            </div>

            <div className="bg-[#e6e8ec] p-8 md:col-span-1">
              <h3 className="font-headline text-lg font-bold !text-[#051125]">Standard flat</h3>
              <p className="mt-2 font-body text-xs leading-snug text-[#584237]">
                Economical and easy to clean where traffic is lighter and visibility is the priority.
              </p>
              <Layers className="mt-6 h-10 w-10 text-[#051125]/15" strokeWidth={1.25} aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 04 & 05 */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">Phase 04</span>
            <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Temperature integrity</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#FC8347] bg-[#f7f9fd] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-[#FC8347]" strokeWidth={1.35} aria-hidden />
                  <span className="font-headline font-bold !text-[#051125]">Standard / ambient–chill</span>
                </div>
                <p className="font-body text-sm text-[#584237]">
                  Typical flexible PVC for warehouses and production areas where the strip does not see deep-freeze
                  surfaces. Exact range is compound-specific — we align to your datasheet on the quote.
                </p>
              </div>
              <div className="border-l-4 border-[#00639b] bg-[#f7f9fd] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Snowflake className="h-5 w-5 text-[#00639b]" strokeWidth={1.35} aria-hidden />
                  <span className="font-headline font-bold !text-[#051125]">Polar grade</span>
                </div>
                <p className="font-body text-sm text-[#584237]">
                  For cold rooms and freezer approaches: specify against the coldest surface the strip will touch, not only
                  room air temperature.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#FC8347]">Phase 05</span>
            <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">Hardware &amp; rail systems</h2>
            <p className="font-body text-[#584237]">
              Mounting is matched to structure (steel, concrete, timber), environment, and cleaning regime — not guesswork off
              a generic chart.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <div className={`relative mb-4 h-40 overflow-hidden rounded-md bg-[#eceef2] ${shadowMd}`}>
                  <Image
                    src={IMG.galvanized}
                    alt="Galvanised steel head rail for PVC strip curtains"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="25vw"
                    unoptimized
                  />
                </div>
                <h4 className="font-headline font-bold !text-[#051125]">Galvanised steel</h4>
                <p className="mt-1 font-body text-xs text-[#584237]">Strong, economical default for dry and general industrial use.</p>
              </div>
              <div className="group">
                <div className={`relative mb-4 h-40 overflow-hidden rounded-md bg-[#eceef2] ${shadowMd}`}>
                  <Image
                    src={IMG.stainless}
                    alt="Stainless steel hardware suitable for washdown areas"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="25vw"
                    unoptimized
                  />
                </div>
                <h4 className="font-headline font-bold !text-[#051125]">Stainless steel</h4>
                <p className="mt-1 font-body text-xs text-[#584237]">Preferred where corrosion, humidity, or hygiene zoning demands it.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg bg-[#f7f9fd]">
              <table className={`w-full min-w-[320px] border-collapse text-left ${shadowMd}`}>
                <thead>
                  <tr className="bg-[#FC8347] text-white">
                    <th className="px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider md:px-6 md:py-4">
                      Feature
                    </th>
                    <th className="px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider md:px-6 md:py-4">
                      Galvanised
                    </th>
                    <th className="px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider md:px-6 md:py-4">
                      Stainless
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6e8ec] bg-white font-body text-sm">
                  <tr>
                    <td className="px-4 py-3 font-bold !text-[#051125] md:px-6 md:py-4">Make-up</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Steel with zinc coating</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Alloy grades per supply (e.g. 304 / 316) on docs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold !text-[#051125] md:px-6 md:py-4">Corrosion resistance</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Good in many dry / moderate settings</td>
                    <td className="px-4 py-3 font-semibold text-[#FC8347] md:px-6 md:py-4">Higher in washdown &amp; coastal air</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold !text-[#051125] md:px-6 md:py-4">Typical environments</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Warehousing, dispatch, general plant</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Food-adjacent, wet process, aggressive cleaning</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold !text-[#051125] md:px-6 md:py-4">Food-adjacent suitability</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Discuss with QA — often superseded by stainless in hygiene zones</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FC8347]" aria-hidden />
                        Grade and finish stated on your order pack
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold !text-[#051125] md:px-6 md:py-4">Relative cost</td>
                    <td className="px-4 py-3 text-[#584237] md:px-6 md:py-4">Lower installed cost in many projects</td>
                    <td className="px-4 py-3 font-bold text-[#FC8347] md:px-6 md:py-4">Premium — justified by environment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="bg-[#f7f9fd] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-headline text-3xl font-bold !text-[#051125] md:text-4xl">End-to-end lifecycle</h2>
          </div>
          <ProjectLifecycleCycle
            steps={FOOD_PRECISION_PIPELINE_STEPS}
            footnote="Dates and freight mode are confirmed on your quote acknowledgement and updated if scope changes."
          />
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-[#051125] px-6 py-16 text-[#f2f4f8] md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1">
            <h2 className="font-headline text-3xl font-bold !text-[#FC8347] md:text-4xl">Delivery &amp; lead times</h2>
            <p className="mt-6 leading-relaxed text-[#e6e8ec]">
              Lead time depends on stock, cut schedule, and freight lane. Bulk rolls are often fastest; custom-cut kits follow
              signed dimensions and PO. We quote a realistic window rather than a one-size promise.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <span className="font-headline text-3xl font-black text-[#FC8347]">Fast</span>
                <span className="mt-2 block font-body text-xs uppercase tracking-widest text-[#e0e2e6]">Bulk rolls</span>
                <p className="mt-2 font-body text-sm text-[#e6e8ec]/90">Dispatch from stock discussed on enquiry.</p>
              </div>
              <div>
                <span className="font-headline text-3xl font-black text-[#FC8347]">Scheduled</span>
                <span className="mt-2 block font-body text-xs uppercase tracking-widest text-[#e0e2e6]">Custom kits</span>
                <p className="mt-2 font-body text-sm text-[#e6e8ec]/90">Fabrication slot after PO + signed details.</p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-1">
            <div className="border-l border-[#FC8347] p-8">
              <h3 className="font-headline text-xl font-bold text-white">Shipping &amp; logistics</h3>
              <ul className="mt-6 space-y-4 font-body text-sm text-[#e0e2e6]">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FC8347]" aria-hidden />
                  Courier or pallet freight as quoted for your site access
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FC8347]" aria-hidden />
                  Export and remote deliveries scoped in writing when needed
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FC8347]" aria-hidden />
                  Carrier tracking shared when available from the freight provider
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer links strip */}
      <div className="border-t border-[#e0c0b1]/30 bg-[#f7f9fd] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <Link href="/pvc-strip-curtains" className="font-body text-sm font-bold text-[#FC8347] hover:underline">
            ← All PVC products
          </Link>
          <div className="flex flex-wrap gap-6 font-body text-sm font-semibold text-[#051125]">
            <Link href="/technical" className="hover:text-[#FC8347]">
              Technical
            </Link>
            <Link href="/compliance" className="hover:text-[#FC8347]">
              Compliance
            </Link>
            <Link href="/contact" className="hover:text-[#FC8347]">
              Get quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
