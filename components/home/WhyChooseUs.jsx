import { Bolt, Ruler, MapPinned, ShieldCheck } from "lucide-react";
import ScrollReveal from "../motion/ScrollReveal";

const items = [
  {
    icon: Bolt,
    title: "Fast Installation",
    desc: "High-cycle doors delivered and installed with minimal downtime.",
  },
  {
    icon: Ruler,
    title: "Custom Engineering",
    desc: "Sized and specified for your site, traffic flow and safety needs.",
  },
  {
    icon: MapPinned,
    title: "Australia-wide Service",
    desc: "Support across logistics, pharma, food processing and warehousing.",
  },
  {
    icon: ShieldCheck,
    title: "Industrial-grade Quality",
    desc: "Built for durability, compliance and repeat cycles in demanding environments.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-brand text-sm font-semibold tracking-widest uppercase">Why drooov</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink [font-family:var(--font-heading)]">
              Premium industrial doors, built for uptime
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              We design and deliver rapid roller door systems that reduce downtime, maintain conditions and keep traffic moving.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-brand" />
                </div>
                <div className="mt-4 font-semibold text-ink">{item.title}</div>
                <div className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

