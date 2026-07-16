import { ArrowRight, ChevronRight, ShieldCheck, Wrench, Clock } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { createPageUrl } from "@/utils";
import { STATS, TRUST_LOGOS } from "@/lib/siteContent";

const TIMELINE = [
  { y: "2008", t: "Founded", d: "Engineering-first industrial door practice, started to serve Australian cold storage sites." },
  { y: "2014", t: "National network", d: "Certified installation partners established across every Australian state." },
  { y: "2019", t: "Cold chain focus", d: "Freezer-grade door and PVC strip programmes purpose-built for temperature-controlled facilities." },
  { y: "2024", t: "Digital specification", d: "Quote Builder and product configurator platform launched to speed up specification." },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Engineering-first",
    desc: "Every system is specified against duty cycle, wind load and thermal performance — not just fitted to the opening.",
  },
  {
    icon: Wrench,
    title: "Built to last",
    desc: "Manufacturing and quality control standards designed for continuous industrial use, not intermittent domestic duty.",
  },
  {
    icon: Clock,
    title: "Support when it matters",
    desc: "Service programmes and rapid-response technicians keep facilities operating with minimal downtime.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <div className="relative bg-ink overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6 flex-wrap">
            <a href={createPageUrl("Home")} className="hover:text-white">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">About</span>
          </nav>
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
            About Drooov
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl font-heading">
            Engineering excellence for industrial entrances.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
            Specification-led rapid roller doors and PVC strip curtains, backed by documented performance and
            Australia-wide installation and service support.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-ink font-heading">{s.value}</div>
                  <div className="mt-1 text-sm text-on-surface-variant">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            What we build on
          </h2>
          <p className="mt-3 text-on-surface-variant text-lg max-w-2xl">
            Specification-led systems with documented performance, service programmes and partner installation —
            calibrated for Australian facilities.
          </p>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <ScrollReveal key={v.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="p-6 rounded-2xl border border-line bg-white h-full shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold text-ink text-lg font-heading">{v.title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface-low border-y border-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">Our history</h2>
          </ScrollReveal>
          <div className="mt-10">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.y} delay={Math.min(i * 0.05, 0.3)}>
                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 border-t border-line py-8">
                  <p className="text-brand font-bold font-heading text-lg">{item.y}</p>
                  <div>
                    <h3 className="text-xl font-bold text-ink font-heading">{item.t}</h3>
                    <p className="mt-2 text-on-surface-variant">{item.d}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Trusted across Australia and New Zealand
          </h2>
          <p className="mt-3 text-on-surface-variant text-lg max-w-2xl">
            Supporting operations in logistics, cold storage, food processing, pharma and manufacturing.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_LOGOS.map((name, i) => (
            <ScrollReveal key={name} delay={Math.min(i * 0.04, 0.3)}>
              <div className="flex items-center justify-center h-20 rounded-xl border border-line bg-white text-on-surface-variant text-sm font-semibold text-center px-4">
                {name}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
            Talk to our engineering team
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Tell us about your facility and we'll help you specify the right door or curtain system.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={createPageUrl("Quote")}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
