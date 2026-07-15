import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { STRIP_APPLICATIONS, STRIP_DUTIES } from "@/lib/stripCurtainShop";
import StripKitBuilder from "@/components/strip/StripKitBuilder";

/** Competitive strip spotlight — duty guide + applications (vs quote-only AU sites) */
export default function PvcStripSpotlight() {
  return (
    <>
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Why buy online with DROOOV</p>
                <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-neutral-900 [font-family:var(--font-heading)]">
                  Strip curtains that outpace quote-only sellers
                </h2>
                <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                  Instant kit pricing, duty-grade selection, freezer and forklift options — then order or enquire in
                  minutes. Built for coolrooms, warehouses, food plants and shop fronts across Australia.
                </p>
              </div>
              <a
                href={createPageUrl("StripShop")}
                className="shrink-0 inline-flex px-8 py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-brand transition-colors"
              >
                Open strip shop
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { t: "Buy to size", d: "Enter width × height — get a kit price for standard openings." },
              { t: "2–5 day dispatch", d: "Cut and hung kits prepared for Australia-wide freight." },
              { t: "DIY in minutes", d: "Face-fix track, numbered strips, install guide included." },
            ].map((item) => (
              <div key={item.t} className="border border-slate-200 p-6 bg-slate-50">
                <h3 className="text-lg font-bold text-neutral-900">{item.t}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Shop by application</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STRIP_APPLICATIONS.map((a) => (
              <a
                key={a.id}
                href={createPageUrl(a.href)}
                className="bg-white border border-slate-200 p-6 hover:border-brand transition-colors group"
              >
                <h3 className="font-bold group-hover:text-brand transition-colors">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Duty grades</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Same selection logic as leading Australian strip curtain suppliers — light pedestrian through
                heavy forklift ribbed.
              </p>
              <ul className="mt-8 space-y-4">
                {STRIP_DUTIES.map((d) => (
                  <li key={d.id} className="flex gap-4 border-b border-slate-100 pb-4">
                    <span className="text-brand font-black text-sm w-16 shrink-0">{d.thickness}</span>
                    <span>
                      <span className="font-bold block">{d.label}</span>
                      <span className="text-sm text-slate-600">{d.use}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <StripKitBuilder compact />
          </div>
        </div>
      </section>
    </>
  );
}
