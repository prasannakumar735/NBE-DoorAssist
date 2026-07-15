import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultCategoryLabels = {
  pvc_strip_curtains: "PVC Strip Curtains",
  rapid_roller: "Rapid Roller",
  high_speed: "High Speed",
  insulated: "Insulated",
  cold_storage: "Cold Storage",
  dock_door: "Dock Door",
  parts_accessories: "Parts & Accessories",
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
  /** Industrial catalog layout: image, title, description, orange VIEW DETAILS */
  catalogMode = true,
  showPrice = false,
  ctaLabel,
}) {
  if (!catalogMode) {
    return (
      <LegacyProductCard
        product={product}
        detailHref={detailHref}
        ctaHref={ctaHref}
        onOpenDetail={onOpenDetail}
        onPrimaryAction={onPrimaryAction}
        renderLink={renderLink}
        categoryLabels={categoryLabels}
      />
    );
  }

  const priceLabel =
    showPrice && product.price != null
      ? `${product.price_type === "from" ? "From " : ""}$${Number(product.price).toLocaleString("en-AU")}`
      : null;

  const buttonHref = ctaHref || detailHref;
  const buttonLabel = ctaLabel || "VIEW DETAILS";

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all h-full"
    >
      <LinkWrapper href={detailHref} onClick={onOpenDetail} renderLink={renderLink} className="flex flex-col flex-1 min-h-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title || "Product"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <Shield className="w-14 h-14 text-slate-300" />
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-neutral-900 leading-snug tracking-tight group-hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
          {priceLabel && (
            <p className="mt-2 text-lg font-black text-neutral-900 tracking-tight">{priceLabel}</p>
          )}
          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
            {product.short_description ||
              product.description ||
              `${categoryLabels[product.category] || "Industrial access"} — engineered for Australian sites. Request specifications and pricing.`}
          </p>
        </div>
      </LinkWrapper>

      <div className="px-5 pb-5 pt-0 mt-auto">
        <LinkWrapper href={buttonHref} onClick={onPrimaryAction} renderLink={renderLink}>
          <Button
            className="w-full rounded-md bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.12em] py-6 shadow-none"
            type="button"
          >
            {buttonLabel}
          </Button>
        </LinkWrapper>
      </div>
    </motion.article>
  );
}

/** Previous card layout — kept for catalogMode={false} if needed */
function LegacyProductCard({
  product,
  detailHref,
  ctaHref,
  onOpenDetail,
  onPrimaryAction,
  renderLink,
  categoryLabels,
}) {
  const ctaLabel = product?.is_part ? "View Details" : "Request Quote";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors shadow-sm hover:shadow-md"
    >
      <LinkWrapper href={detailHref} onClick={onOpenDetail} renderLink={renderLink}>
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
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
              <Shield className="w-16 h-16 text-slate-300" />
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
          {product.short_description && (
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">{product.short_description}</p>
          )}
        </div>
      </LinkWrapper>
      <div className="px-5 pb-5">
        <LinkWrapper href={ctaHref} onClick={onPrimaryAction} renderLink={renderLink}>
          <Button className="w-full bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold">
            {ctaLabel}
          </Button>
        </LinkWrapper>
      </div>
    </motion.div>
  );
}
