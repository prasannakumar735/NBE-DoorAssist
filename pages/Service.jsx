import { ArrowRight, ChevronRight, Phone, Wrench, ClipboardCheck, ShieldCheck, CalendarClock, RefreshCcw, Siren } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { createPageUrl } from "@/utils";

const SERVICES = [
  { icon: Siren, title: "Emergency Repairs", desc: "Priority response for failed doors and dock downtime." },
  { icon: Wrench, title: "Maintenance", desc: "Scheduled care that extends cycle life and safety." },
  { icon: ClipboardCheck, title: "Inspection", desc: "Documented condition reports for compliance and planning." },
  { icon: ShieldCheck, title: "Preventive Maintenance", desc: "Predictive intervals tuned to traffic profiles." },
  { icon: CalendarClock, title: "Annual Contracts", desc: "Site-wide coverage with SLA-backed attendance." },
  { icon: RefreshCcw, title: "PVC Replacement", desc: "Fast strip and curtain replacement to restore separation." },
];

const PROCESS = [
  { title: "Call or book online", desc: "Tell us the issue, the door or curtain type, and your site location." },
  { title: "Technician dispatched", desc: "A certified technician is scheduled, with priority given to emergency callouts." },
  { title: "On-site diagnosis", desc: "Condition assessed against manufacturer specification and safety standards." },
  { title: "Repair or report delivered", desc: "Work completed on-site where possible, or a documented report provided for planning." },
];

export default function Service() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <div className="relative bg-ink overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6 flex-wrap">
            <a href={createPageUrl("Home")} className="hover:text-white">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Service</span>
          </nav>
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
            Service & Maintenance
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl font-heading">
            Uptime is the product.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
            Emergency repairs, inspections, preventive maintenance and annual service contracts —
            Australia-wide, for any door or curtain brand.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Book a Technician
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              View Service Types
            </a>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <section id="services" className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Service programmes
          </h2>
          <p className="mt-3 text-on-surface-variant text-lg max-w-2xl">
            From urgent breakdowns to scheduled care, we keep entrances operating safely and reliably.
          </p>
        </ScrollReveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="p-6 rounded-2xl border border-line bg-white h-full shadow-sm hover:border-brand/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold text-ink text-lg font-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface-low border-y border-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
              How service works
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="p-5 rounded-xl border border-line bg-white h-full">
                  <div className="w-8 h-8 rounded-full bg-brand/10 text-brand font-bold flex items-center justify-center text-sm font-heading">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-bold text-ink text-sm">{p.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
            Need a technician on-site?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Priority response for emergency callouts, Australia-wide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Book a Technician
            </a>
            <a
              href={createPageUrl("Quote")}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
