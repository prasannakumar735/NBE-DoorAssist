import { useMemo, useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import CurtainPreview from "@/components/strip/CurtainPreview";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import { STRIP_TYPES } from "@/lib/data/stripCatalog";
import { MIN_WIDTH_MM, MAX_WIDTH_MM, MIN_DROP_MM, MAX_DROP_MM, calculateCurtainSpec } from "@/lib/curtainMath";

export default function CustomCurtainBuilder() {
  const [widthMm, setWidthMm] = useState(1200);
  const [dropMm, setDropMm] = useState(2100);
  const [stripKey, setStripKey] = useState(STRIP_TYPES[0].key);
  const { openQuoteModal } = useQuoteModal();

  const stripType = STRIP_TYPES.find((s) => s.key === stripKey) || STRIP_TYPES[0];
  const spec = useMemo(
    () => calculateCurtainSpec({ widthMm, dropMm, stripType }),
    [widthMm, dropMm, stripType]
  );

  const handleQuote = () => {
    openQuoteModal({
      item: `Custom curtain — ${stripType.name}, ${spec.widthMm} x ${spec.dropMm}mm`,
      message: `Strip type: ${stripType.name}\nOpening: ${spec.widthMm}mm wide x ${spec.dropMm}mm drop\nStrip count: ${spec.numStrips}\nTotal PVC length: ${spec.totalLengthM}m`,
      context: "custom-curtain-builder",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-line bg-surface-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <p className="text-brand text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4">
            Made to measure
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink leading-[1.05] tracking-tight">
            Custom Curtain Builder
          </h1>
          <p className="mt-5 text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
            Enter your opening size, pick a strip type, and see exactly how the curtain will be built —
            strip count and total PVC included. No price is shown here because every made-to-measure job
            depends on strip type, hardware and delivery zone; submit the spec and we'll quote it by email.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <ScrollReveal>
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-semibold text-ink" htmlFor="width-range">
                  Opening width
                </label>
                <span className="font-mono-spec text-sm text-brand font-semibold">{widthMm}mm</span>
              </div>
              <input
                id="width-range"
                type="range"
                min={MIN_WIDTH_MM}
                max={MAX_WIDTH_MM}
                step={10}
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-mono-spec mt-1">
                <span>{MIN_WIDTH_MM}mm</span>
                <span>{MAX_WIDTH_MM}mm</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-semibold text-ink" htmlFor="drop-range">
                  Opening drop (height)
                </label>
                <span className="font-mono-spec text-sm text-brand font-semibold">{dropMm}mm</span>
              </div>
              <input
                id="drop-range"
                type="range"
                min={MIN_DROP_MM}
                max={MAX_DROP_MM}
                step={10}
                value={dropMm}
                onChange={(e) => setDropMm(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-mono-spec mt-1">
                <span>{MIN_DROP_MM}mm</span>
                <span>{MAX_DROP_MM}mm</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Strip type</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {STRIP_TYPES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStripKey(s.key)}
                    className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                      s.key === stripKey
                        ? "border-brand bg-brand/5 ring-1 ring-brand"
                        : "border-line hover:border-brand/40"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full inline-block mb-1.5 border border-black/10" style={{ backgroundColor: s.swatch }} />
                    <p className="text-xs font-semibold text-ink leading-tight">{s.shortName}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">{stripType.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-lg border border-line px-4 py-3 text-center">
                <p className="font-mono-spec text-xl font-bold text-ink">{spec.numStrips}</p>
                <p className="text-[0.65rem] uppercase tracking-wide text-on-surface-variant mt-1">Strips</p>
              </div>
              <div className="rounded-lg border border-line px-4 py-3 text-center">
                <p className="font-mono-spec text-xl font-bold text-ink">{spec.totalLengthM}m</p>
                <p className="text-[0.65rem] uppercase tracking-wide text-on-surface-variant mt-1">Total PVC</p>
              </div>
              <div className="rounded-lg border border-line px-4 py-3 text-center">
                <p className="font-mono-spec text-xl font-bold text-ink">{stripType.tempRange}</p>
                <p className="text-[0.65rem] uppercase tracking-wide text-on-surface-variant mt-1">Temp range</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuote}
              className="w-full bg-brand hover:bg-brandDark text-white font-bold uppercase tracking-wide text-sm py-4 rounded-lg transition-colors"
            >
              Get a Quote for This Curtain
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-surface-low border border-line rounded-2xl p-6 md:p-10 sticky top-28">
            <CurtainPreview widthMm={spec.widthMm} dropMm={spec.dropMm} stripType={stripType} className="w-full h-auto max-h-[520px]" />
            <p className="text-center text-xs font-mono-spec text-on-surface-variant mt-4">
              {spec.widthMm}mm × {spec.dropMm}mm · {stripType.name}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
