import Image from "next/image";
import Link from "next/link";
const cardShell =
  "group flex flex-col rounded-lg bg-white p-2 shadow-sm transition-all hover:shadow-[0px_20px_40px_rgba(27,28,28,0.06)]";

export default function PremiumDoorsFeatured() {
  return (
    <section className="bg-[#f5f3f3] py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="font-label mb-4 block text-sm font-bold uppercase tracking-[0.1em] text-[#00639b]">
              Engineered solutions
            </span>
            <h2 className="font-headline text-4xl font-bold text-[#051125] md:text-5xl">Premium Doors</h2>
          </div>
          <p className="max-w-md leading-relaxed text-[#45474d]">
            Our industrial door range combines precision engineering with durable materials to ensure maximum operational
            efficiency and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <article className={cardShell}>
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzTxTYfI9YRHJmO3eWaubdiHA6cPTRfBAB7llvwHLP6Lfpzt2eOC8GMlSSIwvQ3e93R7vEi1Kmxd8cfgfkOWzlZRW3hjm3x7DMKF5Fo10EZHQzPZO0qWgxRmNR3I3UtTCuF2JQ9NH65evBu8Tc2pCiyvGq9PxuQ2PFNYJaHEj-Pqx26rzdxHY-vKQuCxZsnM_UzMt52CPZu_D1Fp7gYy1-tAWlbpM215TgZRBFuojoDOor736Y6sxi35pMN8Y2_MSCliG2iAFxsg"
                alt="Red industrial high speed roller door in a clean facility"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute left-4 top-4 bg-[#051125] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Bestseller
              </div>
            </div>
            <div className="flex flex-grow flex-col px-4 pb-6">
              <span className="font-label mb-2 block text-xs uppercase tracking-widest text-[#45474d]">Model: DX-5000</span>
              <h3 className="font-headline mb-4 text-2xl font-bold text-[#1b1c1c]">Rapid Roller Pro</h3>
              <div className="mb-8 space-y-3">
                {[
                  ["Max speed", "2.5 m/s"],
                  ["Wind resistance", "Class 4"],
                  ["Materials", "Reinforced PVC"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-[#e4e2e2] py-2 text-sm"
                  >
                    <span className="text-[#45474d]">{k}</span>
                    <span className="font-bold text-[#1b1c1c]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-[#45474d]">Pricing on enquiry</p>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center justify-center rounded-md bg-[#051125] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00639b]"
                >
                  Request quote
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className={cardShell}>
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB69eJ-CWfiYl0o6yqvNKPth_7nLOkXgIqtTn1TCVg3Ejg5pLeRwy0qDb34989DTSGizoF96z2tYfrwryPz8ab8sW_uca3HzMidmOkbbeMPB-wHKSZCWWSTI9MPkmLlN4sGW5516bdr6tZh5YpPG-LTAaf97Nt5L-_4rFd7rom4Pbq8QZgzPO9lKXjtc1yoi4UKIZYSsMlnUeW0-fM-AKiVNtIdU8E_rhXx9vwb-WB41mSFuyE3XMUIt6sA-r_0YaKaIX98w25Slg"
                alt="Industrial blue high speed door for logistics"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <div className="flex grow flex-col px-4 pb-6">
              <span className="font-label mb-2 block text-xs uppercase tracking-widest text-[#45474d]">
                Model: DX-8000-HE
              </span>
              <h3 className="font-headline mb-4 text-2xl font-bold text-[#1b1c1c]">Heavy Duty Titan</h3>
              <div className="mb-8 space-y-3">
                {[
                  ["Max speed", "1.8 m/s"],
                  ["Wind resistance", "Class 5+"],
                  ["Materials", "Galvanized steel"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-[#e4e2e2] py-2 text-sm"
                  >
                    <span className="text-[#45474d]">{k}</span>
                    <span className="font-bold text-[#1b1c1c]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-[#45474d]">Pricing on enquiry</p>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center justify-center rounded-md bg-[#051125] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00639b]"
                >
                  Request quote
                </Link>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className={cardShell}>
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgVTqF3CxejAiIeTv5-m82UAEI6wrPvl_mtmttTQ_RmvDwPC8hSWpxCfUgte70-YbqADQvWxRw9vf9Dq4h2_C29TRNYuJQJ3XqJkmJ62q5exjmnCcshF1m8ttT9dtkaMr1EtJXYJEgG7H4wTZ_JcGlhR_EyaMVENf8Nk5jjX_8X-esSxBeUOh8A3earzxYV2nwGMzJgpuHN_GdEHhpRTf7Soprxhsak76AZtMvoYTVW_M91LQ68xMXp5x6ncidHR9euOUK7sDjyA"
                alt="Cold room interior with PVC strip curtains"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute left-4 top-4 bg-[#3fadfe] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#003e64]">
                Cold storage
              </div>
            </div>
            <div className="flex grow flex-col px-4 pb-6">
              <span className="font-label mb-2 block text-xs uppercase tracking-widest text-[#45474d]">
                Model: PVC-CURT-01
              </span>
              <h3 className="font-headline mb-4 text-2xl font-bold text-[#1b1c1c]">PVC Strip Curtains</h3>
              <div className="mb-8 space-y-3">
                {[
                  ["Temp range", "-40°C to +50°C"],
                  ["Visibility", "Crystal clear"],
                  ["UV rating", "Anti-UV treated"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-[#e4e2e2] py-2 text-sm"
                  >
                    <span className="text-[#45474d]">{k}</span>
                    <span className="font-bold text-[#1b1c1c]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-[#45474d]">Pricing on enquiry</p>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center justify-center rounded-md bg-[#051125] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00639b]"
                >
                  Request quote
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
