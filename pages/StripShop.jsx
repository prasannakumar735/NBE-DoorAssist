import StripKitBuilder from "@/components/strip/StripKitBuilder";
import { STRIP_APPLICATIONS, STRIP_DUTIES } from "@/lib/stripCurtainShop";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function StripShop() {
  return (
    <div className="bg-white text-neutral-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0, transparent 18px, rgba(15,23,42,0.06) 18px, rgba(15,23,42,0.06) 22px), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Online strip curtain shop</p>
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] [font-family:var(--font-heading)]">
            DROOOV
            <span className="block text-slate-500 font-bold text-2xl md:text-3xl mt-3 tracking-tight">
              PVC strip curtains — buy to size, Australia-wide
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Clear, freezer and heavy-duty kits with mounting track. Instant pricing for standard openings —
            the online alternative to quote-only strip door sellers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <StripKitBuilder />
      </section>

      <section className="bg-slate-50 border-y border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Duty selection guide</h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              Match thickness to traffic — the same logic used across Australian industrial strip door suppliers.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STRIP_DUTIES.map((d) => (
              <div key={d.id} className="bg-white border border-slate-200 p-6">
                <p className="text-brand text-xs font-bold uppercase tracking-widest">{d.thickness}</p>
                <h3 className="mt-2 text-xl font-bold">{d.label}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.use}</p>
                <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Overlap {d.overlap}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Shop by application</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STRIP_APPLICATIONS.map((a) => (
            <a
              key={a.id}
              href={createPageUrl(a.href)}
              className="group border border-slate-200 p-6 hover:border-brand transition-colors"
            >
              <h3 className="font-bold text-lg group-hover:text-brand transition-colors">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.blurb}</p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-brand">
                View kits →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-neutral-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">How to measure</h2>
            <ol className="mt-4 space-y-2 text-slate-300 text-sm md:text-base">
              <li>1. Measure clear opening width (mm) — left to right inside the jamb.</li>
              <li>2. Measure clear opening height (mm) — underside of lintel to floor.</li>
              <li>3. Note traffic: pedestrian, trolley, or forklift.</li>
              <li>4. Choose standard or freezer grade for temperature.</li>
            </ol>
          </div>
          <a
            href={createPageUrl("Quote")}
            className="shrink-0 inline-flex px-8 py-4 bg-brand font-bold text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Need a custom quote?
          </a>
        </div>
      </section>
    </div>
  );
}
