import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";

const systems = [
  {
    title: "Rapid roller doors",
    body: "High-speed fabric and metal curtains for docks, warehouses, and climate-controlled logistics.",
    explore: "Products?category=rapid_roller",
  },
  {
    title: "PVC swing doors",
    body: "Impact-rated swing panels for chillers, clean corridors, and high-frequency pedestrian traffic.",
    explore: "Products?category=pvc_strip_curtains",
  },
  {
    title: "Freezer doors",
    body: "Insulated rapid closures that limit frost ingress and protect cold-chain energy performance.",
    explore: "Products?category=cold_storage",
  },
  {
    title: "Sectional doors",
    body: "Panel lift systems for wide factory openings with optional glazing and weather sealing.",
    explore: "Products?category=insulated",
  },
];

export default function DoorSystemsGrid() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight text-center max-w-3xl mx-auto">
            Door systems by type
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
            Explore our Rapid Roller range — each category links to specification pages on this site (not an external
            catalogue).
          </p>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.05}>
              <div className="h-full flex flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{s.body}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={createPageUrl(s.explore)}
                    className="inline-flex items-center text-sm font-semibold text-brand hover:text-neutral-900"
                  >
                    Explore more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                  <a href={createPageUrl("Products")} className="text-xs font-medium text-slate-500 hover:text-brand">
                    Read more →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
