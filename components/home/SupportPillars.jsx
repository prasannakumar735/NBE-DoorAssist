import { BookOpen, Headphones, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

const pillars = [
  {
    icon: BookOpen,
    title: "Technical library",
    body: "Drawings references, installation guidance, and documentation index for industrial door systems.",
  },
  {
    icon: Headphones,
    title: "Rapid response",
    body: "Technical assistance and maintenance coordination for Australian industrial facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    body: "Standards alignment and documentation for temperature control and site safety governance.",
  },
];

export default function SupportPillars() {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-8 hover:border-brand/30 transition-colors">
                <p.icon className="w-10 h-10 text-brand mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-neutral-900">{p.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
