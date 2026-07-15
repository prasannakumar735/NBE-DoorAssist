import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, FileText, GitCompare, Phone } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProductCard from "@/components/Products/ProductCard";
import FaqAccordion from "@/components/premium/FaqAccordion";
import { createPageUrl } from "@/utils";
import { PRODUCT_LINES, INDUSTRIES } from "@/lib/siteContent";
import { RAPID_DOOR_APPLICATION_OPTIONS, RAPID_DOOR_TRAFFIC_OPTIONS } from "@/lib/productFinder";

const rapidLine = PRODUCT_LINES.find((p) => p.id === "rapid_roller");

const APPLICATION_GROUPS = [
  { id: "internal_access", label: "Internal Applications", categoryId: "rapid_roller" },
  { id: "external_access", label: "External Applications", categoryId: "high_speed" },
  { id: "cold_storage", label: "Cold Storage", categoryId: "cold_storage" },
  { id: "food_processing", label: "Food Processing", categoryId: "insulated" },
  { id: "high_traffic", label: "High Traffic Access", categoryId: "dock_door" },
];

const CHOICE_FACTORS = [
  { title: "Traffic Frequency", desc: "How often the opening cycles per day shapes the duty cycle and motor rating you need." },
  { title: "Opening Size", desc: "Width and height determine which door range and configuration will fit the opening." },
  { title: "Indoor or Outdoor Location", desc: "External openings face wind load and weather sealing needs that internal openings don't." },
  { title: "Environmental Separation", desc: "Cold storage, food processing and ambient areas call for different sealing and insulation options." },
  { title: "Activation Requirements", desc: "Pedestrian, vehicle or mixed traffic affects the type of sensor or control you'll need at the opening." },
];

const APPLICATION_IMAGES = INDUSTRIES.filter((i) =>
  ["food", "cold", "warehouse", "distribution", "mfg", "auto"].includes(i.id)
);

const FAQS = [
  {
    q: "What is a rapid roller door?",
    a: "A rapid roller door is a fast-cycling industrial door designed for frequent opening and closing, typically used to keep internal traffic moving without holding up operations or losing environmental separation.",
  },
  {
    q: "Where are rapid roller doors commonly used?",
    a: "They're commonly used in warehouses, distribution centres, food processing facilities, cold storage sites and manufacturing plants — anywhere with regular vehicle or pedestrian movement through an opening.",
  },
  {
    q: "How do I choose a rapid roller door?",
    a: "Start with traffic frequency, opening size, indoor/outdoor location, the environmental separation you need, and how the door will be activated. See \"Choosing a Rapid Roller Door\" below for detail on each factor.",
  },
  {
    q: "Can rapid roller doors be used for cold storage applications?",
    a: "Yes — cold storage rapid doors are built with additional sealing and thermal features for temperature-controlled environments. Explore the Cold Storage application group above.",
  },
  {
    q: "What information is needed for a quote?",
    a: "Opening width and height, the environment the door will operate in, expected traffic type, and your preferred timeframe. You can include this when you request a quote below.",
  },
];

export default function RapidRollerDoorsHub({ products = [], isLoading = false }) {
  const [applicationId, setApplicationId] = useState(null);
  const [trafficId, setTrafficId] = useState(null);

  const applicationOption = RAPID_DOOR_APPLICATION_OPTIONS.find((o) => o.id === applicationId);

  const suggestedProducts = useMemo(() => {
    if (!applicationOption) return [];
    const categoryIds = applicationOption.recommendations.map((r) => r.categoryId);
    return products.filter((p) => categoryIds.includes(p.category)).slice(0, 6);
  }, [applicationOption, products]);

  const comparisonProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <div className="relative bg-ink overflow-hidden">
        <img
          src={rapidLine?.image}
          alt="Rapid Roller Doors"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6 flex-wrap">
            <a href={createPageUrl("Home")} className="hover:text-white">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Rapid Roller Doors</span>
          </nav>
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
            Rapid Roller Doors
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl font-heading">
            Rapid Roller Doors for Industrial Facilities
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl leading-relaxed">
            Explore high-speed industrial door solutions for warehouses, food processing, cold storage and
            high-traffic operational environments.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              Explore Rapid Doors
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/request-a-quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Category / application discovery */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Find a Rapid Door for Your Application
          </h2>
          <p className="mt-3 text-on-surface-variant text-lg max-w-2xl">
            Browse rapid roller doors grouped by where they're typically installed.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {APPLICATION_GROUPS.map((group, i) => {
            const count = products.filter((p) => p.category === group.categoryId).length;
            return (
              <ScrollReveal key={group.id} delay={Math.min(i * 0.05, 0.3)}>
                <a
                  href={createPageUrl(`Products?category=${group.categoryId}`)}
                  className="group block p-6 rounded-2xl border border-line bg-white hover:border-brand/50 transition-colors shadow-sm h-full"
                >
                  <h3 className="text-lg font-bold text-ink group-hover:text-brand transition-colors">{group.label}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">
                    {count > 0 ? `${count} product${count === 1 ? "" : "s"} available` : "View related products"}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    View products <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Product finder */}
      <section className="py-20 md:py-24 bg-surface-low">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
              Where will the door be used?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {RAPID_DOOR_APPLICATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setApplicationId(option.id)}
                  aria-pressed={applicationId === option.id}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                    applicationId === option.id
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-ink border-line hover:border-brand/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {applicationOption && (
            <ScrollReveal delay={0.05}>
              <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                What type of traffic uses the opening?
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {RAPID_DOOR_TRAFFIC_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTrafficId(t.id)}
                    aria-pressed={trafficId === t.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      trafficId === t.id
                        ? "bg-ink text-white border-ink"
                        : "bg-white text-ink border-line hover:border-ink/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-10 bg-white border border-line rounded-2xl p-8 text-left max-w-xl mx-auto">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand mb-4">
                  Suggested products to explore
                </p>
                {suggestedProducts.length > 0 ? (
                  <div className="space-y-3">
                    {suggestedProducts.map((p) => (
                      <a
                        key={p.id}
                        href={`/rapid-roller-doors/${p.id}`}
                        className="flex items-center justify-between gap-3 text-ink font-medium hover:text-brand"
                      >
                        {p.title}
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-on-surface-variant">
                    No exact matches yet — talk to our team and we'll help you find the right option.
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brandDark"
                  >
                    View Suggested Products <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand">
                    Talk to Our Team
                  </a>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">Rapid Roller Doors</h2>
        </ScrollReveal>
        {isLoading ? (
          <p className="mt-8 text-on-surface-variant">Loading products…</p>
        ) : products.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                <ProductCard
                  product={p}
                  detailHref={`/rapid-roller-doors/${p.id}`}
                  ctaHref={`/request-a-quote?product=${p.id}`}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-on-surface-variant">No rapid roller doors are available right now.</p>
        )}
      </section>

      {/* Applications */}
      <section className="py-20 md:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
              Rapid Doors by Application
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {APPLICATION_IMAGES.map((app, i) => (
              <ScrollReveal key={app.id} delay={Math.min(i * 0.05, 0.3)}>
                <a
                  href="/industries"
                  className="group relative block h-64 rounded-2xl overflow-hidden"
                >
                  <img src={app.image} alt={app.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <h3 className="text-white font-bold">{app.name}</h3>
                    <p className="text-white/75 text-sm mt-1">{app.blurb}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Choosing a Rapid Roller Door */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
            Choosing a Rapid Roller Door
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CHOICE_FACTORS.map((f, i) => (
            <ScrollReveal key={f.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="p-5 rounded-xl border border-line bg-white h-full">
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-bold text-ink text-sm">{f.title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8">
          <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brandDark">
            Need Help Choosing? Talk to Our Team <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Comparison preview */}
      {comparisonProducts.length > 0 && (
        <section className="py-20 md:py-24 bg-surface-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
                Compare Rapid Roller Doors
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonProducts.map((p) => (
                <div key={p.id} className="p-5 rounded-xl border border-line bg-white shadow-sm">
                  <h3 className="font-bold text-ink">{p.title}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    {p.width_mm && p.height_mm && (
                      <div className="flex justify-between border-t border-line pt-2">
                        <dt className="text-on-surface-variant">Opening size</dt>
                        <dd className="text-ink font-medium">{p.width_mm}×{p.height_mm}mm</dd>
                      </div>
                    )}
                    {p.rated_speed && (
                      <div className="flex justify-between border-t border-line pt-2">
                        <dt className="text-on-surface-variant">Opening speed</dt>
                        <dd className="text-ink font-medium">{p.rated_speed}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={`/compare?family=rapid-door`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ink hover:bg-brand text-white text-sm font-semibold transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                Compare Rapid Doors
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Technical resources */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">Technical Resources</h2>
        </ScrollReveal>
        <div className="mt-8">
          <a
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-line bg-white hover:border-brand/50 text-ink text-sm font-semibold transition-colors"
          >
            <FileText className="w-4 h-4" />
            Browse Product Brochures &amp; Technical Information
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-surface-low">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="mt-8">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
            Need a Rapid Roller Door for Your Facility?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Tell us about your opening, operating environment and access requirements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/request-a-quote"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand hover:bg-brandDark text-white text-sm font-semibold transition-colors"
            >
              Request a Rapid Door Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
