import ScrollReveal from "@/components/motion/ScrollReveal";
import { createPageUrl } from "@/utils";

const steps = [
  {
    n: "01",
    title: "Quote & technical review",
    body: "Opening measurements, duty rating, and control philosophy captured in a single technical pass.",
  },
  {
    n: "02",
    title: "Order confirmation & lead time",
    body: "Signed scope, documentation pack, and committed schedule so procurement can plan site works.",
  },
  {
    n: "03",
    title: "Fabrication / kit preparation",
    body: "Curtain, drive, and hardware built or kitted to order with QA checkpoints before dispatch.",
  },
  {
    n: "04",
    title: "Dispatch & logistics",
    body: "Consolidated shipment and delivery windows coordinated with your site receiving constraints.",
  },
  {
    n: "05",
    title: "Installation coordination",
    body: "Installer briefings, safe access, and commissioning handover aligned to your project timeline.",
  },
  {
    n: "06",
    title: "Service & spare parts path",
    body: "Ongoing support, wear parts, and service visits to protect uptime after handover.",
  },
];

export default function LifecycleSteps() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight text-center">
            End to end product details
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
            From measurement and specification to commissioning, we document each milestone so your site team knows what to
            expect.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 0.04}>
              <div className="rounded-2xl bg-white border border-slate-200 p-8 h-full">
                <span className="text-sm font-black text-brand/80">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
          <a href={createPageUrl("Products?category=rapid_roller")} className="font-semibold text-brand hover:underline">
            Rapid roller hub
          </a>
          <span className="text-slate-300">|</span>
          <a
            href={createPageUrl("Products?category=pvc_strip_curtains")}
            className="font-semibold text-brand hover:underline"
          >
            PVC strip hub
          </a>
        </div>
      </div>
    </section>
  );
}
