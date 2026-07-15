import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Shield, Ruler, Gauge, Thermometer, Cog,
  ChevronLeft, ChevronRight, FileText, Loader2, Truck
} from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import QuoteForm from "@/components/quote/QuoteForm";

const categoryLabels = {
  pvc_strip_curtains: "PVC Strip Curtains",
  rapid_roller: "Rapid Roller", high_speed: "High Speed", insulated: "Insulated",
  cold_storage: "Cold Storage", dock_door: "Dock Door", parts_accessories: "Parts & Accessories",
};

function LinkWrapper({ href, onClick, className, children, renderLink }) {
  if (href && typeof renderLink === "function") {
    return renderLink({ href, className, children });
  }

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  if (typeof onClick === "function") {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
}

export default function ProductDetail({
  product,
  isLoading = false,
  backHref,
  onBack,
  renderLink,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h2>
          <LinkWrapper href={backHref} onClick={onBack} renderLink={renderLink}>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Back to Products</Button>
          </LinkWrapper>
        </div>
      </div>
    );
  }

  const images = [product.image_url, ...(product.gallery_urls || [])].filter(Boolean);
  if (images.length === 0) images.push(null);

  const nextImage = () => setActiveImage((activeImage + 1) % images.length);
  const prevImage = () => setActiveImage((activeImage - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-paper">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <LinkWrapper
            href={backHref}
            onClick={onBack}
            renderLink={renderLink}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </LinkWrapper>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
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
                        <Shield className="w-24 h-24 text-slate-200" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-slate-900 hover:bg-orange-600 hover:text-white transition-colors shadow-sm">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-slate-900 hover:bg-orange-600 hover:text-white transition-colors shadow-sm">
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
                        i === activeImage ? "border-orange-600" : "border-slate-200"
                      }`}
                    >
                      {img ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product info */}
          <ScrollReveal direction="right">
            <div>
              <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/25 mb-4">
                {categoryLabels[product.category] || product.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {product.title}
              </h1>

              {product.sku && (
                <p className="text-sm text-slate-500 font-mono mb-6">SKU: {product.sku}</p>
              )}

              {/* Quote block (no pricing) */}
              <div className="mb-8 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="text-xl font-bold text-slate-900">Request Quote</div>
                <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Tell us your sizes, usage frequency and site conditions. We’ll recommend the right configuration and provide a tailored quote.
                </div>
                {product.lead_time_days && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                    <Truck className="w-4 h-4" />
                    Typical lead time: {product.lead_time_days} business days
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    Australia-wide delivery
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    Fast quote turnaround
                  </span>
                </div>
              </div>

              {/* Quick specs icons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.width_mm && product.height_mm && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Ruler className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Dimensions</div>
                      <div className="text-sm text-slate-900 font-semibold">{product.width_mm}×{product.height_mm}mm</div>
                    </div>
                  </div>
                )}
                {product.rated_speed && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Gauge className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Speed</div>
                      <div className="text-sm text-slate-900 font-semibold">{product.rated_speed}</div>
                    </div>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Material</div>
                      <div className="text-sm text-slate-900 font-semibold capitalize">{product.material}</div>
                    </div>
                  </div>
                )}
                {product.motor_type && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Cog className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Motor</div>
                      <div className="text-sm text-slate-900 font-semibold">{product.motor_type}</div>
                    </div>
                  </div>
                )}
                {product.insulated !== undefined && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Insulation</div>
                      <div className="text-sm text-slate-900 font-semibold">{product.insulated ? "Insulated" : "Non-insulated"}</div>
                    </div>
                  </div>
                )}
                {product.custom_sizes_available && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Ruler className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-xs text-slate-500">Custom Sizes</div>
                      <div className="text-sm text-slate-900 font-semibold">Available</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3 mb-8">
                <Button onClick={() => setShowQuote(true)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-xl font-bold text-base shadow-sm">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQuote(true)}
                  className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50 py-6 rounded-xl font-bold text-base shadow-sm"
                >
                  Enquire Now
                </Button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}

              {/* Benefits */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: "Speed", desc: "High-cycle operation built for busy traffic flow." },
                    { title: "Durability", desc: "Industrial-grade materials for demanding environments." },
                    { title: "Safety", desc: "Site-ready options including sensors and access control." },
                  ].map((b) => (
                    <div key={b.title} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className="text-slate-900 font-semibold text-sm">{b.title}</div>
                      <div className="text-slate-600 text-sm mt-1 leading-relaxed">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs table */}
              {product.specs?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Full Specifications</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    {product.specs.map((spec, i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-slate-600 border-r border-slate-200">
                          {spec.label}
                        </div>
                        <div className="flex-1 px-4 py-3 text-sm text-slate-900">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Quote form section */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16 max-w-2xl mx-auto"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Request Quote</h2>
                  <button onClick={() => setShowQuote(false)} className="text-slate-500 hover:text-slate-900 text-sm">Close</button>
                </div>
                <QuoteForm
                  prefill={{ item: product.title }}
                  context={`product-detail:${product.id}`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}