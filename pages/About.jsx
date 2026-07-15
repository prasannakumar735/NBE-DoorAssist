import { Reveal, SectionLabel } from "@/components/premium/Motion";

const TIMELINE = [
  { y: "2008", t: "Founded", d: "Engineering-first industrial door practice." },
  { y: "2014", t: "National network", d: "Certified installation partners across Australia." },
  { y: "2019", t: "Cold chain focus", d: "Freezer-grade systems and strip programmes." },
  { y: "2024", t: "Digital specification", d: "Quote Builder and product experience platform." },
];

export default function About() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>About DROOOV</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance">
            Engineering excellence for industrial entrances.
          </h1>
        </Reveal>
      </div>

      <div className="mt-16 aspect-[21/9] overflow-hidden bg-graphite">
        <img
          src="https://images.unsplash.com/photo-1581092918484-8313c2f8f2b8?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 py-20 grid lg:grid-cols-3 gap-12">
        {["Manufacturing", "Engineering", "Quality"].map((t) => (
          <Reveal key={t}>
            <h2 className="font-display text-2xl font-bold tracking-tight">{t}</h2>
            <p className="mt-4 text-muted font-light leading-relaxed">
              Specification-led systems with documented performance, service programmes and partner installation —
              calibrated for Australian facilities.
            </p>
          </Reveal>
        ))}
      </div>

      <section className="bg-mist border-y border-line py-20">
        <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
          <SectionLabel>Timeline</SectionLabel>
          <div className="mt-10">
            {TIMELINE.map((item) => (
              <div
                key={item.y}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 border-t border-line py-8"
              >
                <p className="font-display text-accent font-bold">{item.y}</p>
                <div>
                  <h3 className="font-display text-xl font-bold">{item.t}</h3>
                  <p className="mt-2 text-muted">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 py-20">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Global presence</h2>
        <p className="mt-4 text-muted text-lg font-light max-w-xl">
          Australia and New Zealand operations with international specification support for multi-site brands.
        </p>
      </div>
    </div>
  );
}
