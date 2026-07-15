import { ShoppingBag, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

/**
 * mode="buy" -> priced SKU with an add-to-cart button.
 * mode="quote" -> no price shown, "Enquire for Price" opens the quote modal.
 */
export default function StripProductCard({
  mode = "buy",
  sku,
  name,
  description,
  price,
  unit,
  swatch,
  meta,
  onAddToCart,
  onEnquire,
}) {
  return (
    <div className="card-hover bg-white border border-line rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        {swatch ? (
          <span
            className="w-8 h-8 rounded-full shrink-0 border border-black/10"
            style={{ backgroundColor: swatch }}
            aria-hidden
          />
        ) : (
          <span className="w-8 h-8 rounded-full shrink-0 bg-surface-low border border-line" aria-hidden />
        )}
        <span className="font-mono-spec text-[0.65rem] text-on-surface-variant text-right">{sku}</span>
      </div>

      <h3 className="font-semibold text-ink leading-snug">{name}</h3>
      {description && <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">{description}</p>}
      {meta && <p className="font-mono-spec text-xs text-on-surface-variant mt-2">{meta}</p>}

      <div className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
        {mode === "buy" ? (
          <>
            <div>
              <p className="font-mono-spec text-lg font-bold text-ink">{formatCurrency(price)}</p>
              {unit && <p className="text-[0.65rem] uppercase tracking-wide text-on-surface-variant">per {unit}</p>}
            </div>
            <button
              type="button"
              onClick={onAddToCart}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brandDark text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-md transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
          </>
        ) : (
          <>
            <span className="text-sm font-semibold text-on-surface-variant">Enquire for price</span>
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex items-center gap-1.5 border border-brand text-brand hover:bg-brand hover:text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-md transition-colors"
            >
              Enquire
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
