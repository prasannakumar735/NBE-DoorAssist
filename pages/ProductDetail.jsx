import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight, Shield, Ruler, Gauge, Thermometer, Cog,
  ChevronLeft, FileText, Loader2, Truck, ShieldCheck, BadgeCheck
} from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import QuoteForm from "@/components/quote/QuoteForm";
import ProductCard, { LinkWrapper, defaultCategoryLabels as categoryLabels } from "@/components/Products/ProductCard";
import { createPageUrl } from "@/utils";

const trustBadges = [
  { icon: BadgeCheck, title: "Australian owned", desc: "Locally supported, Australia-wide delivery" },
  { icon: Truck, title: "Fast quote turnaround", desc: "Tailored pricing within 24 hours" },
  { icon: ShieldCheck, title: "Built to spec", desc: "Made-to-measure, warranty backed" },
];

export default function ProductDetail({
  product,
  isLoading = false,
  backHref,
  onBack,
  renderLink,
  uploadFile,
  submitEnquiry,
  relatedProducts = [],
  getRelatedHref,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-4">Product not found</h2>
          <LinkWrapper href={backHref} onClick={onBack} renderLink={renderLink}>
            <Button className="bg-brand hover:bg-brandDark text-white">Back to Products</Button>
          </LinkWrapper>
        </div>
      </div>
    );
  }

  const images = [product.image_url, ...(product.gallery_urls || [])].filter(Boolean);
  if (images.length === 0) images.push(null);

  const nextImage = () => setActiveImage((activeImage + 1) % images.length);
  const prevImage = () => setActiveImage((activeImage - 1 + images.length) % images.length);
  const categoryLabel = categoryLabels[product.category] || product.category;

  return (
    <div className="min-h-screen bg-paper">
      {/* Breadcrumb */}
      <div className="border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap">
            <a href={createPageUrl("Home")} className="hover:text-brand">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <LinkWrapper href={backHref} onClick={onBack} renderLink={renderLink} className="hover:text-brand">
              Products
            </LinkWrapper>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-brand">{categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    {images[activeImage] ? (
                      <img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Shield className="w-24 h-24 text-line" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-ink hover:bg-brand hover:text-white transition-colors shadow-sm">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-ink hover:bg-brand hover:text-white transition-colors shadow-sm">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === activeImage ? "border-brand" : "border-line"
                      }`}
                    >
                      {img ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-surface-low flex items-center justify-center">
                          <Shield className="w-6 h-6 text-line" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {trustBadges.map((b) => (
                  <div key={b.title} className="flex items-start gap-3 p-4 bg-surface-low rounded-xl border border-line">
                    <b.icon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-ink">{b.title}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Product info */}
          <ScrollReveal direction="right">
            <div>
              <Badge className="bg-brand/10 text-brand border-brand/25 mb-4">
                {categoryLabel}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2 font-heading">
                {product.title}
              </h1>

              {product.sku && (
                <p className="text-sm text-on-surface-variant font-mono-spec mb-6">SKU: {product.sku}</p>
              )}

              {/* Quote block (no pricing) */}
              <div className="mb-8 p-5 bg-white border border-line rounded-xl shadow-sm">
                <div className="text-xl font-bold text-ink">Request Quote</div>
                <div className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                  Tell us your sizes, usage frequency and site conditions. We’ll recommend the right configuration and provide a tailored quote.
                </div>
                {product.lead_time_days && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-on-surface-variant">
                    <Truck className="w-4 h-4" />
                    Typical lead time: {product.lead_time_days} business days
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-line flex flex-wrap gap-x-6 gap-y-2 text-xs text-on-surface-variant">
                  <span className="inline-flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand" />
                    Australia-wide delivery
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand" />
                    Fast quote turnaround
                  </span>
                </div>
              </div>

              {/* Quick specs icons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.width_mm && product.height_mm && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Ruler className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Dimensions</div>
                      <div className="text-sm text-ink font-semibold">{product.width_mm}×{product.height_mm}mm</div>
                    </div>
                  </div>
                )}
                {product.rated_speed && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Gauge className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Speed</div>
                      <div className="text-sm text-ink font-semibold">{product.rated_speed}</div>
                    </div>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Shield className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Material</div>
                      <div className="text-sm text-ink font-semibold capitalize">{product.material}</div>
                    </div>
                  </div>
                )}
                {product.motor_type && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Cog className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Motor</div>
                      <div className="text-sm text-ink font-semibold">{product.motor_type}</div>
                    </div>
                  </div>
                )}
                {product.insulated !== undefined && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Thermometer className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Insulation</div>
                      <div className="text-sm text-ink font-semibold">{product.insulated ? "Insulated" : "Non-insulated"}</div>
                    </div>
                  </div>
                )}
                {product.custom_sizes_available && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-sm">
                    <Ruler className="w-5 h-5 text-brand" />
                    <div>
                      <div className="text-xs text-on-surface-variant">Custom Sizes</div>
                      <div className="text-sm text-ink font-semibold">Available</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3 mb-8">
                <Button onClick={() => setShowQuote(true)}
                  className="flex-1 bg-brand hover:bg-brandDark text-white py-6 rounded-xl font-bold text-base shadow-sm">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQuote(true)}
                  className="border-line bg-white text-ink hover:bg-surface-low py-6 rounded-xl font-bold text-base shadow-sm"
                >
                  Enquire Now
                </Button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-ink mb-3">Description</h3>
                  <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}

              {/* Benefits */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-ink mb-3">Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: "Speed", desc: "High-cycle operation built for busy traffic flow." },
                    { title: "Durability", desc: "Industrial-grade materials for demanding environments." },
                    { title: "Safety", desc: "Site-ready options including sensors and access control." },
                  ].map((b) => (
                    <div key={b.title} className="p-4 bg-white rounded-xl border border-line shadow-sm">
                      <div className="text-ink font-semibold text-sm">{b.title}</div>
                      <div className="text-on-surface-variant text-sm mt-1 leading-relaxed">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs table */}
              {product.specs?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-ink mb-3">Full Specifications</h3>
                  <div className="border border-line rounded-xl overflow-hidden bg-white shadow-sm">
                    {product.specs.map((spec, i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? "bg-white" : "bg-surface-low"}`}>
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-on-surface-variant border-r border-line">
                          {spec.label}
                        </div>
                        <div className="flex-1 px-4 py-3 text-sm text-ink">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-line">
            <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-8 font-heading">
              Related products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  detailHref={typeof getRelatedHref === "function" ? getRelatedHref(p) : undefined}
                  ctaHref={typeof getRelatedHref === "function" ? getRelatedHref(p) : undefined}
                  renderLink={renderLink}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quote form section */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16 max-w-2xl mx-auto"
            >
              <div className="bg-white border border-line rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-ink">Request Quote</h2>
                  <button onClick={() => setShowQuote(false)} className="text-on-surface-variant hover:text-ink text-sm">Close</button>
                </div>
                <QuoteForm
                  productTitle={product.title}
                  productId={product.id}
                  uploadFile={uploadFile}
                  submitEnquiry={submitEnquiry}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
