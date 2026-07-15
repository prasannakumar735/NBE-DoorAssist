import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CurtainPreview from "@/components/strip/CurtainPreview";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import { STRIP_TYPES } from "@/lib/data/stripCatalog";
import { calculateCurtainSpec } from "@/lib/curtainMath";

export default function HeroSection() {
  const [widthMm, setWidthMm] = useState(1200);
  const [dropMm, setDropMm] = useState(2100);
  const stripType = STRIP_TYPES[0];
  const spec = calculateCurtainSpec({ widthMm, dropMm, stripType });
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
          >
            Australia · PVC strip curtains
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight leading-[0.95]"
          >
            Strip curtains built to your opening
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg text-slate-300 leading-relaxed"
          >
            Try your width and drop below to see how the curtain is built, then send it through for a
            free email quote — or shop rolls, hardware and replacement strips online right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/custom-curtain-builder"
              className="px-8 py-4 bg-brand text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-brandLight transition-colors rounded-md"
            >
              Choose strip type &amp; get a quote
            </Link>
            <button
              type="button"
              onClick={() => openQuoteModal({ context: "hero-trade-quote" })}
              className="px-8 py-4 border border-white/40 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors rounded-md"
            >
              Request trade quote
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <CurtainPreview widthMm={spec.widthMm} dropMm={spec.dropMm} stripType={stripType} className="w-full h-auto max-h-[340px]" />
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="uppercase tracking-wide text-slate-400">Width</span>
                <span className="font-mono-spec text-brand">{widthMm}mm</span>
              </div>
              <input
                type="range"
                min={400}
                max={4000}
                step={10}
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                className="w-full accent-brand"
                aria-label="Opening width"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="uppercase tracking-wide text-slate-400">Drop</span>
                <span className="font-mono-spec text-brand">{dropMm}mm</span>
              </div>
              <input
                type="range"
                min={600}
                max={4000}
                step={10}
                value={dropMm}
                onChange={(e) => setDropMm(Number(e.target.value))}
                className="w-full accent-brand"
                aria-label="Opening drop"
              />
            </div>
            <div className="flex justify-between text-xs font-mono-spec text-slate-400 pt-1">
              <span>{spec.numStrips} strips</span>
              <span>{spec.totalLengthM}m total PVC</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
