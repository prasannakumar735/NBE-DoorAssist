import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { PRODUCT_LINES } from "@/lib/siteContent";

const rapidLine = PRODUCT_LINES.find((p) => p.id === "rapid_roller");
const pvcLine = PRODUCT_LINES.find((p) => p.id === "pvc_strip_curtains");

export default function CoreCategories() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-14">
            <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-3 block">
              Our Products
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight font-heading">
              Industrial Access &amp; Separation Solutions
            </h2>
            <p className="mt-4 text-on-surface-variant text-lg leading-relaxed">
              Explore rapid roller doors and PVC strip curtain solutions for warehouses, cold storage, food processing and industrial facilities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Rapid Roller Doors — dominant panel */}
          <ScrollReveal className="lg:col-span-3">
            <a
              href="/rapid-roller-doors"
              className="group relative block h-full min-h-[440px] rounded-2xl overflow-hidden bg-ink"
            >
              <img
                src={rapidLine?.image}
                alt="Rapid Roller Doors"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">Rapid Roller Doors</h3>
                <p className="mt-3 text-white/85 max-w-md leading-relaxed">
                  High-speed industrial doors designed for frequent access, traffic flow and environmental separation.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Warehousing", "Food Processing", "Cold Storage", "Manufacturing"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-white text-sm font-semibold group-hover:bg-brandDark transition-colors">
                    Explore Rapid Roller Doors
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <a
                    href={createPageUrl("Compare")}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-semibold text-white/80 hover:text-white"
                  >
                    Compare Doors
                  </a>
                </div>
              </div>
            </a>
          </ScrollReveal>

          {/* PVC Strip Curtains — secondary panel */}
          <ScrollReveal className="lg:col-span-2" delay={0.1}>
            <a
              href="/pvc-strip-curtains"
              className="group relative block h-full min-h-[440px] rounded-2xl overflow-hidden bg-ink"
            >
              <img
                src={pvcLine?.image}
                alt="PVC Strip Curtains"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">PVC Strip Curtains</h3>
                <p className="mt-3 text-white/85 leading-relaxed">
                  Flexible PVC separation solutions for cool rooms, warehouses, production areas and high-traffic openings.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Cool Rooms", "Freezers", "Warehouses", "Food Processing"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-white text-sm font-semibold group-hover:bg-brandDark transition-colors">
                    Explore PVC Strip Curtains
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <a
                    href="/pvc-strip-curtains"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-semibold text-white/80 hover:text-white"
                  >
                    Find Your PVC Type
                  </a>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
