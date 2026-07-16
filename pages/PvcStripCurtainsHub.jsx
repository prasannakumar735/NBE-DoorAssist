import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, GitCompare, Ruler, Upload } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProductCard from "@/components/Products/ProductCard";
import FaqAccordion from "@/components/premium/FaqAccordion";
import { createPageUrl } from "@/utils";
import { PRODUCT_LINES } from "@/lib/siteContent";
import { STRIP_GRADES } from "@/lib/stripCurtainShop";
import { PVC_APPLICATION_OPTIONS, PVC_TRAFFIC_OPTIONS, PVC_REQUIREMENT_OPTIONS } from "@/lib/productFinder";

const pvcLine = PRODUCT_LINES.find((p) => p.id === "pvc_strip_curtains");

/** Maps PVC catalogue products to user-facing type labels via keyword match on
 *  real product titles — the data has one category, so type comes from title. */
const PVC_TYPES = [
  { label: "Standard Clear PVC", keyword: "standard", grade: "standard" },
  { label: "Coolroom PVC", keyword: "freezer", grade: "freezer" },
  { label: "Freezer Grade PVC", keyword: "freezer", grade: "freezer" },
  { label: "Anti-Insect PVC", keyword: "insect", grade: "anti_insect" },
  { label: "Heavy Duty / Forklift PVC", keyword: "ribbed", grade: null },
  { label: "Welding PVC", keyword: "welding", grade: "welding" },
  { label: "Anti-Static PVC", keyword: "anti-static", grade: null },
  { label: "Coloured PVC", keyword: "coloured", grade: null },
  { label: "Replacement PVC Strips", keyword: "replacement", grade: null },
];

const MEASURE_STEPS = [
  { title: "Measure Opening Width", desc: "Measure the full width of the opening the curtain needs to cover." },
  { title: "Measure Opening Height", desc: "Measure from the floor (or top of any threshold) to the top of the opening." },
  { title: "Identify Traffic Type", desc: "Note whether the opening is used by pedestrians, trolleys, forklifts or a mix." },
  { title: "Take a Clear Photo", desc: "A photo of the opening and any existing curtain helps us confirm the right fit." },
];

const EDUCATION_STEPS = [
  { n: 1, title: "Application", desc: "Where will the curtain be installed?" },
  { n: 2, title: "Temperature", desc: "Is the area ambient, chilled or freezer-related?" },
  { n: 3, title: "Traffic", desc: "Will the opening be used by pedestrians, trolleys or forklifts?" },
  { n: 4, title: "Opening Size", desc: "Measure the width and height of the opening." },
  { n: 5, title: "Curtain Requirement", desc: "Choose between a complete curtain or replacement strips." },
];

const FAQS = [
  {
    q: "What PVC strip curtain do I need?",
    a: "It depends on your application, temperature and traffic type. Use the finder above, or browse by PVC type to compare options against real product data.",
  },
  {
    q: "How do I measure a PVC strip curtain opening?",
    a: "Measure the opening width and height, note the traffic type using the opening, and take a clear photo if possible — see \"How to Measure\" below.",
  },
  {
    q: "What is the difference between standard and cold-temperature PVC?",
    a: "Standard PVC suits ambient environments. Cold-temperature (freezer grade) PVC is engineered for coolroom and freezer doorways with tighter overlaps and reduced frost cling.",
  },
  {
    q: "Can I replace individual PVC strips?",
    a: "Yes — replacement strips are sold separately for existing curtains. See \"Replacing Existing PVC Strips\" below.",
  },
  {
    q: "What information is needed for a PVC curtain quote?",
    a: "Opening width and height, the environment and traffic type, and whether you need a complete curtain or replacement strips.",
  },
];

function matchType(products, keyword) {
  const k = keyword.toLowerCase();
  return products.filter(
    (p) => p.title?.toLowerCase().includes(k) || p.short_description?.toLowerCase().includes(k)
  );
}

export default function PvcStripCurtainsHub({ products = [], isLoading = false }) {
  const [applicationId, setApplicationId] = useState(null);
  const [trafficId, setTrafficId] = useState(null);
  const [requirementId, setRequirementId] = useState(null);

  const applicationOption = PVC_APPLICATION_OPTIONS.find((o) => o.id === applicationId);
  const requirementOption = PVC_REQUIREMENT_OPTIONS.find((o) => o.id === requirementId);

  const suggestedProducts = useMemo(() => {
    const option = requirementOption || applicationOption;
    if (!option) return [];
    const queries = option.recommendations.map((r) => r.query).filter((q) => q !== undefined);
    if (queries.length === 0 || queries.every((q) => q === "")) return products.slice(0, 6);
    const matches = new Map();
    queries.forEach((q) => {
      if (!q) return;
      matchType(products, q).forEach((p) => matches.set(p.id, p));
    });
    return Array.from(matches.values()).slice(0, 6);
  }, [applicationOption, requirementOption, products]);

  const comparisonProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <div className="relative bg-ink overflow-hidden">
        <img src={pvcLine?.image} alt="PVC Strip Curtains" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6 flex-wrap">
            <a href={createPageUrl("Home")} className="hover:text-white">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">PVC Strip Curtains</span>
          </nav>
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
            PVC Strip Curtains
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl font-heading">
            PVC Strip Curtains for Industrial &amp; Cold Storage Applications
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
            Explore PVC strip curtain solutions for warehouses, cool rooms, freezers, food processing and
            industrial separation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#find"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              Find Your PVC
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/custom-curtain-builder"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              Configure a Curtain
            </a>
            <a href="/replacement-strips" className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4">
              Need Replacement PVC Strips?
            </a>
          </div>
        </div>
      </div>

      {/* Shop by type */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">Shop PVC by Type</h2>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PVC_TYPES.map((type, i) => {
            const matches = matchType(products, type.keyword);
            const grade = STRIP_GRADES.find((g) => g.id === type.grade);
            const sample = matches[0];
            return (
              <ScrollReveal key={type.label} delay={Math.min(i * 0.05, 0.3)}>
                <a
                  href={createPageUrl(`Products?category=pvc_strip_curtains&q=${type.keyword}`)}
                  className="group block rounded-2xl border border-line bg-white overflow-hidden hover:border-brand/50 transition-colors shadow-sm h-full"
                >
                  {sample?.image_url && (
                    <div className="aspect-[16/9] overflow-hidden bg-surface-low">
                      <img src={sample.image_url} alt={type.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-ink group-hover:text-brand transition-colors">{type.label}</h3>
                    {sample?.short_description && (
                      <p className="mt-2 text-sm text-on-surface-variant line-clamp-2">{sample.short_description}</p>
                    )}
                    {grade && <p className="mt-2 text-xs text-on-surface-variant">Suitable temperature: {grade.temp}</p>}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      View Products <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Find your PVC */}
      <section id="find" className="py-20 md:py-24 bg-surface-low">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
              Find the Right PVC for Your Application
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
              Where will the PVC curtain be used?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {PVC_APPLICATION_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setApplicationId(o.id)}
                  aria-pressed={applicationId === o.id}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                    applicationId === o.id ? "bg-brand text-white border-brand" : "bg-white text-ink border-line hover:border-brand/50"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {applicationOption && (
            <ScrollReveal delay={0.05}>
              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                What uses the opening?
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {PVC_TRAFFIC_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTrafficId(t.id)}
                    aria-pressed={trafficId === t.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      trafficId === t.id ? "bg-ink text-white border-ink" : "bg-white text-ink border-line hover:border-ink/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                What do you need?
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {PVC_REQUIREMENT_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRequirementId(r.id)}
                    aria-pressed={requirementId === r.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      requirementId === r.id ? "bg-ink text-white border-ink" : "bg-white text-ink border-line hover:border-ink/40"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="mt-10 bg-white border border-line rounded-2xl p-8 text-left max-w-xl mx-auto">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand mb-2">
                  Based on your selections, these PVC types may suit your application.
                </p>
                {suggestedProducts.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {suggestedProducts.map((p) => (
                      <a key={p.id} href={`/pvc-strip-curtains/${p.id}`} className="flex items-center justify-between gap-3 text-ink font-medium hover:text-brand">
                        {p.title}
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-on-surface-variant">
                    No exact matches yet — ask our team for product advice.
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-4">
                  <a href="#products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brandDark">
                    View Suggested PVC <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand">
                    Ask for Product Advice
                  </a>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Product catalogue */}
      <section id="products" className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">PVC Strip Curtain Products</h2>
        </ScrollReveal>
        {isLoading ? (
          <p className="mt-8 text-on-surface-variant">Loading products…</p>
        ) : products.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                <ProductCard
                  product={p}
                  detailHref={`/pvc-strip-curtains/${p.id}`}
                  ctaHref={p.is_part ? `/replacement-strips` : `/custom-curtain-builder?product=${p.id}`}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-on-surface-variant">No PVC strip curtain products are available right now.</p>
        )}
      </section>

      {/* Education */}
      <section className="py-20 md:py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
              How to Choose PVC Strip Curtains
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {EDUCATION_STEPS.map((s) => (
              <div key={s.n} className="p-5 rounded-xl border border-line bg-white h-full">
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand font-bold flex items-center justify-center text-sm">
                  {s.n}
                </div>
                <h3 className="mt-3 font-bold text-ink text-sm">{s.title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to measure */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            How to Measure for PVC Strip Curtains
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MEASURE_STEPS.map((s, i) => (
            <div key={s.title} className="p-5 rounded-xl border border-line bg-white h-full">
              <Ruler className="w-5 h-5 text-brand" />
              <h3 className="mt-3 font-bold text-ink text-sm">{i + 1}. {s.title}</h3>
              <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/custom-curtain-builder" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors">
            Configure My Curtain <ArrowRight className="w-4 h-4" />
          </a>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-line bg-white hover:border-brand/50 text-ink text-sm font-semibold transition-colors">
            <Upload className="w-4 h-4" />
            Upload a Photo
          </a>
        </div>
      </section>

      {/* Configurator preview */}
      <section className="py-20 md:py-24 bg-ink">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
              Build Your PVC Strip Curtain Enquiry
            </h2>
          </ScrollReveal>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Opening Width", "Opening Height", "Application", "Environment", "Traffic Type", "Complete Curtain or Replacement Strips"].map((f) => (
              <span key={f} className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="/custom-curtain-builder"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              Configure My Curtain <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Replacement strips */}
      <section className="py-20 md:py-24 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Replacing Existing PVC Strips?
          </h2>
          <p className="mt-4 text-on-surface-variant text-lg leading-relaxed">
            If your existing PVC strips are damaged, discoloured or worn, provide the current strip details and
            opening information to help identify a suitable replacement option.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-on-surface-variant">
            {["Strip Width", "Strip Thickness (if known)", "Strip Length", "Quantity", "Existing Curtain Photo"].map((f) => (
              <li key={f} className="px-4 py-2 rounded-full bg-surface-low border border-line">{f}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/replacement-strips" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors">
              Request Replacement PVC Strips <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant">
            Not sure what PVC you have?{" "}
            <a href="/contact" className="text-brand font-semibold hover:text-brandDark">Upload a photo</a> and we'll help you identify it —
            we can't guarantee visual identification, but it gets us started.
          </p>
        </ScrollReveal>
      </section>

      {/* Comparison preview */}
      {comparisonProducts.length > 0 && (
        <section className="py-20 md:py-24 bg-surface-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
                Compare PVC Strip Curtains
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonProducts.map((p) => (
                <div key={p.id} className="p-5 rounded-xl border border-line bg-white shadow-sm">
                  <h3 className="font-bold text-ink">{p.title}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    {p.width_mm && p.height_mm && (
                      <div className="flex justify-between border-t border-line pt-2">
                        <dt className="text-on-surface-variant">Size</dt>
                        <dd className="text-ink font-medium">{p.width_mm}×{p.height_mm}mm</dd>
                      </div>
                    )}
                    {p.price && (
                      <div className="flex justify-between border-t border-line pt-2">
                        <dt className="text-on-surface-variant">Price</dt>
                        <dd className="text-ink font-medium">
                          {p.price_type === "contact" ? "Contact for pricing" : `${p.price_type === "from" ? "From " : ""}$${p.price.toLocaleString("en-AU")}`}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/compare?family=pvc"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ink hover:bg-brand text-white text-sm font-semibold transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                Compare PVC Curtains
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 md:py-24 max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        <div className="mt-8">
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
            Ready to Find Your PVC Strip Curtain?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/custom-curtain-builder" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors">
              Configure PVC Curtain <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/request-a-quote" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors">
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
