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
  uploadFile,
  submitEnquiry,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <LinkWrapper href={backHref} onClick={onBack} renderLink={renderLink}>
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Products</Button>
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
    <div className="min-h-screen bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <LinkWrapper
            href={backHref}
            onClick={onBack}
            renderLink={renderLink}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-orange-400 transition-colors"
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
              <div className="relative aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
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
                        <Shield className="w-24 h-24 text-slate-700" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
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
                        i === activeImage ? "border-orange-500" : "border-slate-700"
                      }`}
                    >
                      {img ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-slate-600" />
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
              <Badge className="bg-slate-800 text-slate-400 border-slate-700 mb-4">
                {categoryLabels[product.category] || product.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                {product.title}
              </h1>

              {product.sku && (
                <p className="text-sm text-slate-500 font-mono mb-6">SKU: {product.sku}</p>
              )}

              {/* Price */}
              <div className="mb-8 p-5 bg-slate-900 border border-slate-800 rounded-xl">
                {product.price_type === "contact" || !product.price ? (
                  <span className="text-xl font-bold text-slate-400">Contact for Pricing</span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    {product.price_type === "from" && <span className="text-sm text-slate-500">From</span>}
                    <span className="text-4xl font-black text-white">${product.price?.toLocaleString()}</span>
                    <span className="text-slate-500">AUD + GST</span>
                  </div>
                )}
                {product.lead_time_days && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                    <Truck className="w-4 h-4" />
                    Lead time: {product.lead_time_days} business days
                  </div>
                )}
              </div>

              {/* Quick specs icons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.width_mm && product.height_mm && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Ruler className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Dimensions</div>
                      <div className="text-sm text-white font-semibold">{product.width_mm}×{product.height_mm}mm</div>
                    </div>
                  </div>
                )}
                {product.rated_speed && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Gauge className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Speed</div>
                      <div className="text-sm text-white font-semibold">{product.rated_speed}</div>
                    </div>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Material</div>
                      <div className="text-sm text-white font-semibold capitalize">{product.material}</div>
                    </div>
                  </div>
                )}
                {product.motor_type && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Cog className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Motor</div>
                      <div className="text-sm text-white font-semibold">{product.motor_type}</div>
                    </div>
                  </div>
                )}
                {product.insulated !== undefined && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Insulation</div>
                      <div className="text-sm text-white font-semibold">{product.insulated ? "Insulated" : "Non-insulated"}</div>
                    </div>
                  </div>
                )}
                {product.custom_sizes_available && (
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <Ruler className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Custom Sizes</div>
                      <div className="text-sm text-white font-semibold">Available</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3 mb-8">
                <Button onClick={() => setShowQuote(true)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl font-bold text-base">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                  <p className="text-slate-400 leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}

              {/* Specs table */}
              {product.specs?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Full Specifications</h3>
                  <div className="border border-slate-800 rounded-xl overflow-hidden">
                    {product.specs.map((spec, i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"}`}>
                        <div className="w-1/3 px-4 py-3 text-sm font-medium text-slate-400 border-r border-slate-800">
                          {spec.label}
                        </div>
                        <div className="flex-1 px-4 py-3 text-sm text-white">{spec.value}</div>
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
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Request Quote</h2>
                  <button onClick={() => setShowQuote(false)} className="text-slate-500 hover:text-white text-sm">Close</button>
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