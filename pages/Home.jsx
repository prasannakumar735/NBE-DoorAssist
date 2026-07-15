import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Snowflake,
  Warehouse,
  UtensilsCrossed,
  Wrench,
  Store,
  Beaker,
  Ruler,
  Palette,
  Mail,
  Truck,
  ChevronDown,
} from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import ProductionTrustBar from "@/components/home/ProductionTrustBar";
import FinalCTA from "@/components/home/FinalCTA";
import ScrollReveal from "@/components/motion/ScrollReveal";
import WarehouseAnimation from "@/components/ui/WarehouseAnimation";
import { STRIP_TYPES } from "@/lib/data/stripCatalog";

const shopTiles = [
  { to: "/made-to-size-kits", name: "Made-to-Size Kits", blurb: "Ready-cut, enquire for price" },
  { to: "/strip-rolls", name: "Strip Rolls", blurb: "Buy PVC by the roll" },
  { to: "/strip-hardware", name: "Rail & Hardware", blurb: "Mounting rail, clamps, brackets" },
  { to: "/replacement-strips", name: "Replacement Strips", blurb: "Cut-to-length replacements" },
];

const industries = [
  { icon: Snowflake, name: "Cold rooms & freezers" },
  { icon: Warehouse, name: "Warehousing & logistics" },
  { icon: UtensilsCrossed, name: "Food & hospitality" },
  { icon: Wrench, name: "Manufacturing & welding" },
  { icon: Store, name: "Retail & shopfronts" },
  { icon: Beaker, name: "Cleanrooms & electronics" },
];

const howItWorks = [
  { icon: Ruler, title: "Measure your opening", text: "Width and drop in millimetres — our builder guides you through it." },
  { icon: Palette, title: "Choose your strip type", text: "Match the grade to your environment, from standard clear to freezer grade." },
  { icon: Mail, title: "Get a quote or buy online", text: "Custom and kit sizes are quoted by email; rolls and hardware ship straight away." },
  { icon: Truck, title: "Fast Australia-wide delivery", text: "Free delivery on orders over $300, dispatched from our warehouse." },
];

const whyDrooov = [
  {
    title: "Cut to size, every time",
    text: "Every curtain and kit is cut to the exact width and drop you enter — no trimming on site, no guesswork on overlaps.",
  },
  {
    title: "Quotes within one business day",
    text: "Custom specs are answered by email fast, with freight worked out for your postcode before you commit.",
  },
  {
    title: "A grade for every doorway",
    text: "Standard, heavy-duty, freezer, welding and anti-insect PVC — matched to the environment it will actually work in.",
  },
];

const faqs = [
  {
    q: "How much overlap do I need between strips?",
    a: "It depends on the strip type — standard and welding strips use a 25mm overlap, heavy duty uses 40mm, and freezer grade uses 65mm to keep the seal tight in cold air. The custom curtain builder calculates this for you automatically.",
  },
  {
    q: "What if my opening is an irregular size?",
    a: "Use the custom curtain builder to enter your exact width and drop — it isn't limited to the standard kit sizes. Submit the spec and we'll quote it by email.",
  },
  {
    q: "Do you deliver Australia-wide?",
    a: "Yes — we deliver nationwide. Delivery is free on orders over $300; otherwise a flat delivery fee applies at checkout.",
  },
  {
    q: "How fast can I get a quote?",
    a: "Most quote requests are answered by email within 24 hours.",
  },
  {
    q: "What's the difference between standard and heavy duty strips?",
    a: "Standard clear strips (200mm wide) suit general pedestrian doorways. Heavy duty clear strips (300mm wide, thicker gauge) are built for forklift traffic and busy loading bays.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-ink">{item.q}</span>
        <ChevronDown className={`w-4 h-4 text-brand shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <p className="text-on-surface-variant text-sm leading-relaxed pb-5 pr-8">{item.a}</p>}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white text-neutral-900">
      <HeroSection />
      <ProductionTrustBar />

      <section className="py-16 md:py-20 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Shop the range</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">Where do you want to start?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shopTiles.map((tile, i) => (
              <ScrollReveal key={tile.to} delay={Math.min(i * 0.05, 0.2)}>
                <Link
                  to={tile.to}
                  className="card-hover block h-full bg-surface-low border border-line rounded-xl p-6 hover:border-brand/50 transition-colors"
                >
                  <h3 className="font-semibold text-ink text-lg">{tile.name}</h3>
                  <p className="text-sm text-on-surface-variant mt-1.5">{tile.blurb}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface-low border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Strip types</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">Seven grades for every environment</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {STRIP_TYPES.map((s, i) => (
              <ScrollReveal key={s.key} delay={Math.min(i * 0.04, 0.24)}>
                <Link
                  to="/custom-curtain-builder"
                  className="card-hover block bg-white border border-line rounded-lg p-4 text-center h-full"
                >
                  <span
                    className="w-9 h-9 rounded-full mx-auto mb-3 border border-black/10 block"
                    style={{ backgroundColor: s.swatch }}
                  />
                  <p className="text-xs font-semibold text-ink leading-tight">{s.shortName}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Industries we serve</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">Built for demanding environments</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={Math.min(i * 0.04, 0.24)}>
                <div className="flex items-center gap-4 bg-surface-low border border-line rounded-lg p-5 h-full">
                  <ind.icon className="w-6 h-6 text-brand shrink-0" />
                  <span className="font-medium text-ink text-sm">{ind.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface-low border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">How it works</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">From measure to install</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {howItWorks.map((step, i) => (
                <ScrollReveal key={step.title} delay={Math.min(i * 0.06, 0.24)}>
                  <div>
                    <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                      <step.icon className="w-5 h-5 text-brand" />
                    </div>
                    <p className="font-mono-spec text-xs text-brand mb-1">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">{step.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal direction="left" className="hidden lg:block">
              <WarehouseAnimation />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Why drooov</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">Built around your opening</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyDrooov.map((t, i) => (
              <ScrollReveal key={t.title} delay={Math.min(i * 0.06, 0.24)}>
                <div className="bg-surface-low border border-line rounded-xl p-6 h-full">
                  <h3 className="font-semibold text-ink">{t.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{t.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface-low border-b border-line">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">FAQ</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold tracking-tight">Common questions</h2>
          </div>
          <div>
            {faqs.map((item, i) => (
              <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Also from drooov</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold tracking-tight">
                  Need more than a strip door?
                </h2>
                <p className="mt-4 text-on-surface-variant text-lg leading-relaxed">
                  High-cycle rapid roller doors for openings that need speed, sealing and automation — browse
                  the range or configure one online.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/rapid-roller-doors"
                    className="px-8 py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-brand transition-colors rounded-md"
                  >
                    Rapid roller doors
                  </Link>
                  <Link
                    to="/rapid-roller-doors/configure"
                    className="px-8 py-4 border border-line font-bold text-xs uppercase tracking-[0.15em] hover:border-brand transition-colors rounded-md"
                  >
                    Door configurator
                  </Link>
                </div>
              </div>
              <div
                className="aspect-[4/3] bg-slate-200 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1581092918484-8313c2f8f2b8?auto=format&fit=crop&w=1200&q=80)",
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
