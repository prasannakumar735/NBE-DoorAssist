import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { INDUSTRIES } from "@/lib/siteContent";

export default function IndustriesWeServe() {
  const industries = INDUSTRIES.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-brandLight text-sm font-semibold tracking-widest uppercase mb-3 block">
                Industries We Serve
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
                Built for demanding Australian environments
              </h2>
            </div>
            <a
              href={createPageUrl("Industries")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white shrink-0"
            >
              View all industries
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.id} delay={i * 0.05}>
              <a
                href={createPageUrl("Industries")}
                className="group relative block h-full min-h-[220px] rounded-2xl overflow-hidden"
              >
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <h3 className="text-white font-bold font-heading">{industry.name}</h3>
                  <p className="mt-1 text-white/70 text-xs leading-relaxed">{industry.blurb}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
