import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Boxes,
  ClipboardList,
  HardHat,
  Headphones,
  Truck,
} from "lucide-react";

const LIFECYCLE_STEPS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Quote & technical review",
    description: "Opening measurements, duty rating, and control philosophy captured in a single technical pass.",
    icon: ClipboardList,
  },
  {
    title: "Order confirmation & lead time",
    description: "Signed scope, documentation pack, and committed schedule so procurement can plan site works.",
    icon: BadgeCheck,
  },
  {
    title: "Fabrication / kit preparation",
    description: "Curtain, drive, and hardware built or kitted to order with QA checkpoints before dispatch.",
    icon: Boxes,
  },
  {
    title: "Dispatch & logistics",
    description: "Consolidated shipment and delivery windows coordinated with your site receiving constraints.",
    icon: Truck,
  },
  {
    title: "Installation coordination",
    description: "Installer briefings, safe access, and commissioning handover aligned to your project timeline.",
    icon: HardHat,
  },
  {
    title: "Service & spare parts path",
    description: "Ongoing support, wear parts, and service visits to protect uptime after handover.",
    icon: Headphones,
  },
];

export default function HomeMainSections() {
  return (
    <>
      <section id="products-we-offer" className="bg-[#f2f4f8] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-6 font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">
            Products we offer
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="home-highlight-card cursor-pointer rounded-sm border border-transparent bg-white/70 p-6 shadow-sm md:p-8">
              <h3 className="mb-3 font-headline text-xl font-semibold text-[#FC8347]">Rapid roller & industrial doors</h3>
              <p className="font-body leading-relaxed text-[#584237]">
                We specify and supply high-cycle rapid doors, insulated freezer closures, sectional panel doors, and PVC
                traffic doors for Australian distribution, food, and manufacturing sites. Each project is matched to
                opening size, wind region, traffic intensity, and control philosophy — paraphrasing the structured approach
                common to specialist door suppliers without copying third-party wording.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-headline text-xl font-semibold text-[#FC8347]">PVC strip curtains</h3>
              <p className="font-body leading-relaxed text-[#584237]">
                Cut-to-length strip kits, polar-grade compounds, and rack-mounted assemblies for cool rooms, retail
                back-of-house, and production lines. Colour, strip width, and surface finish are chosen against your
                temperature band and traffic type.
              </p>
              <Link href="/pvc-strip-curtains" className="mt-4 inline-block text-sm font-bold text-[#FC8347] hover:underline">
                Browse PVC strip curtains →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-are" className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="mb-6 font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">Who we are</h2>
          <p className="font-body text-lg leading-relaxed text-[#584237]">
            drooov focuses on industrial door and strip curtain solutions with clear documentation and accountable
            delivery. We work with facility managers, contractors, and owner teams to align product selection with
            operational risk, maintenance access, and energy goals — from first enquiry through installation support.
          </p>
        </div>
      </section>

      <section id="end-to-end" className="border-t border-[#e0c0b1]/20 bg-[#fbf9f8] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <header className="mb-12 max-w-3xl">
            <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">Project lifecycle</p>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">
              End to end product details
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-[#584237] md:text-lg">
              From measurement and specification to commissioning, we document each milestone so your site team knows what
              to expect. Product pages on this site include application limits, control options, and lifecycle checkpoints
              you can share internally.
            </p>
          </header>

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {LIFECYCLE_STEPS.map((step, i) => {
              const Icon = step.icon;
              const n = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={step.title}
                  className="group relative flex flex-col rounded-lg border border-[#e0c0b1]/30 bg-white p-6 shadow-sm transition-shadow hover:border-[#FC8347]/25 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#FC8347]/10 text-[#FC8347] transition-colors group-hover:bg-[#FC8347]/15"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="font-headline text-2xl font-bold leading-none text-[#e0c0b1]/80 tabular-nums">
                      {n}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold leading-snug text-[#191c1f]">{step.title}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-[#584237]">{step.description}</p>
                </li>
              );
            })}
          </ol>

          <footer className="mt-14 flex flex-col gap-4 border-t border-[#e0c0b1]/25 pt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="font-body text-sm font-medium text-[#584237] sm:mr-4">Explore product hubs:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rapid-roller-doors"
                className="inline-flex rounded-sm bg-[#191c1f] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                Rapid roller hub
              </Link>
              <Link
                href="/pvc-strip-curtains"
                className="inline-flex rounded-sm border-2 border-[#191c1f] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#191c1f] transition-colors hover:bg-[#191c1f] hover:text-white"
              >
                PVC strip hub
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
