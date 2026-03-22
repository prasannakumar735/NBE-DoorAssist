import { motion } from "framer-motion";
import { ArrowUpRight, Ruler, Gauge, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const defaultCategoryLabels = {
  rapid_roller: "Rapid Roller",
  high_speed: "High Speed",
  insulated: "Insulated",
  cold_storage: "Cold Storage",
  dock_door: "Dock Door",
  parts_accessories: "Parts & Accessories",
};

const defaultStockLabels = {
  in_stock: { text: "In Stock", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  low_stock: { text: "Low Stock", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  made_to_order: {
    text: "Made to Order",
    color: "bg-brand/20 text-brand border-brand/30",
  },
  out_of_stock: { text: "Out of Stock", color: "bg-red-500/20 text-red-400 border-red-500/30" },
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

export default function ProductCard({
  product,
  detailHref,
  ctaHref,
  onOpenDetail,
  onPrimaryAction,
  renderLink,
  categoryLabels = defaultCategoryLabels,
  stockLabels = defaultStockLabels,
}) {
  const stock = stockLabels[product?.stock_status] || stockLabels.in_stock;
  const ctaLabel = product?.is_part ? "View Details" : "Request Quote";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors"
    >
      <LinkWrapper href={detailHref} onClick={onOpenDetail} renderLink={renderLink}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
          {product.image_url ? (
            <motion.img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-slate-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-slate-900/80 backdrop-blur-sm text-slate-300 border-slate-700 text-xs">
              {categoryLabels[product.category] || product.category}
            </Badge>
          </div>

          {/* Quick view icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-tight">
                {product.title}
              </h3>
              {product.sku && (
                <span className="text-xs text-slate-500 font-mono mt-1 block">{product.sku}</span>
              )}
            </div>
          </div>

          {/* Quick specs */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-400">
            {product.width_mm && product.height_mm && (
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                {product.width_mm}×{product.height_mm}mm
              </span>
            )}
            {product.rated_speed && (
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                {product.rated_speed}
              </span>
            )}
          </div>

          {product.short_description && (
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
              {product.short_description}
            </p>
          )}

          {/* Price + Status */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div>
              {product.price_type === "contact" || !product.price ? (
                <span className="text-sm font-semibold text-slate-400">Contact for Price</span>
              ) : (
                <div className="flex items-baseline gap-1">
                  {product.price_type === "from" && <span className="text-xs text-slate-500">From</span>}
                  <span className="text-xl font-bold text-white">${product.price?.toLocaleString()}</span>
                  <span className="text-xs text-slate-500">AUD</span>
                </div>
              )}
            </div>
            <Badge variant="outline" className={`text-xs ${stock.color}`}>
              {stock.text}
            </Badge>
          </div>
        </div>
      </LinkWrapper>

      {/* Bottom CTA */}
      <div className="px-5 pb-5">
        <LinkWrapper href={ctaHref} onClick={onPrimaryAction} renderLink={renderLink}>
          <Button className="w-full bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white transition-all rounded-xl text-sm font-semibold">
            {ctaLabel}
          </Button>
        </LinkWrapper>
      </div>
    </motion.div>
  );
}