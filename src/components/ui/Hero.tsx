import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Headphones, ShieldCheck } from "lucide-react";
import PremiumDoorsFeatured from "@/src/components/sections/PremiumDoorsFeatured";
import Stats from "@/src/components/ui/Stats";

const primaryBtn =
  "inline-flex items-center justify-center rounded-sm bg-gradient-to-br from-[#051125] to-[#FC8347] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 active:scale-[0.98]";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-sm bg-[#eae8e7] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#191c1f] transition-colors hover:bg-[#e0e2e6] active:scale-[0.98]";

const bentoCard =
  "home-highlight-card group cursor-pointer rounded-sm border-b-2 border-transparent bg-white p-8 shadow-sm hover:border-[#FC8347]/40";

export default function Hero() {
  return (
    <div className="w-full bg-[#fbf9f8] text-[#191c1f]">
      {/* Split hero */}
      <div className="relative z-0 flex min-h-[min(100vh,920px)] flex-col md:min-h-[640px] md:flex-row">
        {/* Left — Rapid roller */}
        <section className="home-hero-card group relative flex w-full flex-1 cursor-pointer items-center justify-center overflow-hidden bg-[#fbf9f8] px-8 py-16 md:w-1/2 md:p-16">
          <div className="home-hero-card-overlay pointer-events-none absolute inset-0 z-[1] opacity-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="home-hero-card-media absolute inset-0 opacity-[0.1] group-hover:opacity-[0.25]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSOaoldNelDsgpA53sfXMbcGkRDdRCZMCJ6jzKFs3NySTFeMEHHMvETuQcUvJTw8yc1_EO68WO2pZ40Rtex8lSBHCaHuLwROByV5BSmc90pQiyVwA-aFyfeVr6riuM8pbM75bQw27e9x6vl5TZdJi0p2mi9v1TvVHB4vJ140TqOVJwmtpoz24537UydUpKs037wD6HaC1jMvbuDrbEdqIhqPIbXkTfkHaR-VSW4lXamGQDLs9LR2xUHkLmnCpJNVUaE4G5a66Snv8"
                alt=""
                fill
                className="object-cover grayscale"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="relative z-10 w-full max-w-xl">
            <span className="mb-4 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
              Precision engineering
            </span>
            <h1 className="mb-6 font-headline text-5xl font-bold leading-none tracking-tighter text-[#191c1f] md:text-6xl lg:text-7xl">
              Rapid <span className="text-[#FC8347]">Roller</span> Doors
            </h1>
            <p className="mb-10 max-w-md font-body text-base leading-relaxed text-[#584237]">
              Engineered for high-traffic environments requiring climate control and speed. Factory-direct supply and
              specification-led support — request a quote for your opening schedule (no pricing shown here).
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/rapid-roller-doors" className={primaryBtn}>
                Explore series
              </Link>
              <Link href="/rapid-roller-doors/high-speed-fabric-rapid-door" className={secondaryBtn}>
                View sample spec
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#e0c0b1]/30 pt-8 md:mt-16">
              <div>
                <div className="text-3xl font-bold text-[#FC8347]">2.5m/s</div>
                <div className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#584237]">
                  Opening speed (example)
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FC8347]">1M+</div>
                <div className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#584237]">
                  Cycle rating (example)
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hidden w-px shrink-0 self-stretch bg-[#e0c0b1]/30 md:block" aria-hidden />

        {/* Right — PVC strip curtains */}
        <section className="home-hero-card group relative flex w-full flex-1 cursor-pointer items-center justify-center overflow-hidden bg-[#f2f4f8] px-8 py-16 md:w-1/2 md:p-16">
          <div className="home-hero-card-overlay pointer-events-none absolute inset-0 z-[1] opacity-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="home-hero-card-media absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcIwUmKiz-3NCw2quNmOzLcqrI-dXaPqKDdLJGgl1dBtjj762XwMGVnVs4XF9G4zdeGlJzmx1OPFXdgoJuKx8MW7VRm-WZvHd6n5MauwUYNMu3JcI1bQ6XDqROxu38l8tg7YLB0zu08Iy8Uo3rxjHhWHQu1MPv3ueLjvrZVenaTOYsvtf-32iaef_xzyFnLkcw97p7XdyMEbiZytWURo2dl-P6GpEABB9B6H6pyDu8joOZ63AZCgOvJ2-6IpU8DHCvY06OStDHSdU"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="relative z-10 w-full max-w-xl">
            <span className="mb-4 block font-body text-xs font-bold uppercase tracking-[0.2em] text-[#FC8347]">
              Thermal isolation
            </span>
            <h2 className="mb-6 font-headline text-5xl font-bold leading-none tracking-tighter text-[#191c1f] md:text-6xl lg:text-7xl">
              PVC <span className="text-[#FC8347]">Strip</span> Curtains
            </h2>
            <p className="mb-10 max-w-md font-body text-base leading-relaxed text-[#584237]">
              Modular transparency and isolation. High-grade polymer strips for visibility and thermal efficiency in
              industrial bays — options confirmed via enquiry.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/pvc-strip-curtains" className={primaryBtn}>
                Configure kits
              </Link>
              <Link href="/contact" className={secondaryBtn}>
                Get Quote
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#e0c0b1]/30 pt-8 md:mt-16">
              <div>
                <div className="text-3xl font-bold text-[#FC8347]">98%</div>
                <div className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#584237]">
                  UV resistance (example)
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FC8347]">-40°C</div>
                <div className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#584237]">
                  Cold flex rating (example)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Stats />
      <PremiumDoorsFeatured />

      {/* Bento support strip */}
      <section className="border-t border-[#e0c0b1]/20 bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 md:grid-cols-3">
          <div className={bentoCard}>
            <FileText className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
            <h3 className="mb-3 text-xl font-bold uppercase tracking-tight text-[#191c1f]">Technical library</h3>
            <p className="mb-6 text-sm text-[#584237]">
              Drawings references, installation guidance, and documentation index for industrial door systems.
            </p>
            <Link
              href="/rapid-roller-doors"
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#FC8347] transition-transform group-hover:translate-x-1"
            >
              Rapid roller hub
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className={bentoCard}>
            <Headphones className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
            <h3 className="mb-3 text-xl font-bold uppercase tracking-tight text-[#191c1f]">Rapid response</h3>
            <p className="mb-6 text-sm text-[#584237]">
              Technical assistance and maintenance coordination for Australian industrial facilities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#FC8347] transition-transform group-hover:translate-x-1"
            >
              Contact & quotes
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className={bentoCard}>
            <ShieldCheck className="mb-6 h-10 w-10 text-[#FC8347]" strokeWidth={1.25} aria-hidden />
            <h3 className="mb-3 text-xl font-bold uppercase tracking-tight text-[#191c1f]">Compliance</h3>
            <p className="mb-6 text-sm text-[#584237]">
              Standards alignment and documentation for temperature control and site safety governance.
            </p>
            <Link
              href="/pvc-strip-curtains/help/buying"
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#FC8347] transition-transform group-hover:translate-x-1"
            >
              PVC buying guide
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
