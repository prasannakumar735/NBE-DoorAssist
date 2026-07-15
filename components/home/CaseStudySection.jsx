import ScrollReveal from "../motion/ScrollReveal";

export default function CaseStudySection() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="text-brand text-sm font-semibold tracking-widest uppercase">Case study</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink [font-family:var(--font-heading)]">
                Built for demanding cold storage
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A high-traffic cold storage facility needed faster access control while reducing temperature loss and condensation risk.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Problem</div>
                    <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                      Frequent door cycles and slow access increased energy loss and bottlenecks at peak times.
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Solution</div>
                    <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                      High-speed rapid roller door system with safety sensors and site-specific sizing.
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Result</div>
                    <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                      Reduced energy loss by <span className="font-semibold text-ink">30%</span> and improved traffic flow.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

