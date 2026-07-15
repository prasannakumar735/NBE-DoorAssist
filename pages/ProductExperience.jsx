import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCT_LINES } from "@/lib/siteContent";
import { Reveal, SectionLabel, MagneticButton } from "@/components/premium/Motion";

const TABS = ["Overview", "Specifications", "Features", "Applications", "Warranty", "Downloads", "FAQ"];

export default function ProductExperience() {
  const [params] = useSearchParams();
  const lineId = params.get("line") || "rapid_roller";
  const product = useMemo(
    () => PRODUCT_LINES.find((p) => p.id === lineId) || PRODUCT_LINES[0],
    [lineId]
  );
  const [tab, setTab] = useState("Overview");
  const [gallery, setGallery] = useState(0);
  const images = [product.image, product.image, product.image];

  return (
    <div className="bg-paper pt-24">
      <section className="bg-ink text-white">
        <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14">
          <SectionLabel>Product experience</SectionLabel>
          <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-white/55 text-lg font-light">{product.tagline}</p>
        </div>
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-graphite">
          <img src={images[gallery]} alt="" className="h-full w-full object-cover" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setGallery(i)}
                className={`h-1.5 w-10 transition-colors ${gallery === i ? "bg-white" : "bg-white/30"}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 py-12 flex flex-wrap gap-3 sticky top-20 z-30 bg-paper/95 backdrop-blur border-b border-line">
        <MagneticButton to={`/quote-builder?product=${product.id}`} dark>
          Request Quote
        </MagneticButton>
        <Link
          to="/compare"
          className="px-6 py-4 border border-line font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase hover:border-ink"
        >
          Compare
        </Link>
        <a
          href="#viewer"
          className="px-6 py-4 font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-muted hover:text-ink"
        >
          360° Viewer
        </a>
      </div>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 py-10 overflow-x-auto">
        <div className="flex gap-6 min-w-max border-b border-line">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`pb-4 font-display text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                tab === t ? "text-ink border-b-2 border-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-site mx-auto px-5 md:px-8 lg:px-12 pb-24">
        <Reveal>
          {tab === "Overview" && (
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight">System overview</h2>
                <p className="mt-5 text-muted text-lg font-light leading-relaxed">
                  {product.tagline} Designed for Australian industrial facilities with specification-led support,
                  certified installation partners, and documented service programs.
                </p>
                <ul className="mt-8 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="border-b border-line py-3 font-display font-semibold">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div id="viewer" className="aspect-square bg-mist border border-line flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-muted">360° Viewer</p>
                  <p className="mt-3 text-muted text-sm">Interactive viewer placeholder — product photography suite.</p>
                </div>
              </div>
            </div>
          )}
          {tab === "Specifications" && (
            <dl className="grid sm:grid-cols-2 gap-0 border border-line">
              {product.specs
                .concat([
                  "Service interval: 6–12 months",
                  "Control: PLC / inverter ready",
                  "Safety: EN compliant edge systems",
                ])
                .map((s) => (
                  <div key={s} className="p-6 border-b border-line odd:border-r">
                    <dd className="font-display text-lg font-semibold">{s}</dd>
                  </div>
                ))}
            </dl>
          )}
          {tab === "Features" && (
            <div className="grid md:grid-cols-3 gap-8">
              {product.features.map((f) => (
                <div key={f} className="border-t border-ink pt-6">
                  <h3 className="font-display text-xl font-bold">{f}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    Engineered detail for uptime, safety and maintainability in high-demand facilities.
                  </p>
                </div>
              ))}
            </div>
          )}
          {tab === "Applications" && (
            <div className="flex flex-wrap gap-4">
              {product.applications.map((a) => (
                <span
                  key={a}
                  className="px-6 py-4 bg-mist font-display text-sm font-semibold tracking-[0.1em] uppercase"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
          {tab === "Warranty" && (
            <p className="max-w-2xl text-lg text-muted font-light leading-relaxed">
              Structural and drive warranties available by series. Extended service contracts and annual inspection
              programs supported Australia-wide.
            </p>
          )}
          {tab === "Downloads" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Brochure PDF", "Technical Manual", "CAD Drawings", "BIM Objects", "Installation Guide", "Certificates"].map(
                (d) => (
                  <button
                    key={d}
                    type="button"
                    className="text-left p-6 border border-line bg-white hover:border-ink transition-colors font-display font-semibold"
                  >
                    {d}
                    <span className="block mt-2 text-xs text-muted font-sans font-normal tracking-normal">
                      Download
                    </span>
                  </button>
                )
              )}
            </div>
          )}
          {tab === "FAQ" && (
            <div className="max-w-3xl space-y-6">
              {[
                ["Lead times?", "Standard kits and project doors vary — Quote Builder returns indicative dispatch."],
                ["Installation?", "Certified partners nationwide, or DIY strip curtain kits with guides."],
                ["Service?", "Emergency repairs, preventative maintenance and annual contracts available."],
              ].map(([q, a]) => (
                <div key={q} className="border-b border-line pb-6">
                  <h3 className="font-display text-lg font-bold">{q}</h3>
                  <p className="mt-2 text-muted">{a}</p>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <div className="mt-20 border-t border-line pt-12">
          <SectionLabel>Related systems</SectionLabel>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {PRODUCT_LINES.filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/product-experience?line=${p.id}`}
                  className="group block border border-line overflow-hidden bg-white"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="p-4 font-display font-semibold">{p.name}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
