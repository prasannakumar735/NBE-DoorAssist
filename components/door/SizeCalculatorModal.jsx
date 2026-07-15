import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Ruler,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  Zap,
  Thermometer,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildQuoteUrlWithDimensions, createPageUrl } from "@/utils";
import DoorVisualizer3D from "@/components/door/DoorVisualizer3D";
import {
  DOOR_PRESETS,
  deriveDoorConfig,
  MIN_W,
  MAX_W,
  MIN_H,
  MAX_H,
} from "@/lib/doorCalculatorConfig";

const ENVIRONMENTS = [
  { id: "ambient", label: "Ambient Warehouse", icon: Shield },
  { id: "cold", label: "Cold / Freezer", icon: Thermometer },
  { id: "high_traffic", label: "High Traffic", icon: Zap },
  { id: "external", label: "External / Exposed", icon: AlertTriangle },
];

function DimSlider({ label, value, min, max, step = 100, unit = "mm", onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        <span className="text-lg font-black text-orange-400 tabular-nums">
          {value.toLocaleString()}{" "}
          <span className="text-xs text-slate-500">{unit}</span>
        </span>
      </div>
      <div className="relative h-2 bg-slate-800 rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-lg shadow-orange-500/40 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600">
        <span>{(min / 1000).toFixed(1)}m</span>
        <span>{(max / 1000).toFixed(1)}m</span>
      </div>
    </div>
  );
}

/**
 * Rapid roller door size calculator with live 3D preview (canvas).
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {{ id?: string, title?: string, width_mm?: number, height_mm?: number } | null} props.product
 */
export default function SizeCalculatorModal({ open, onClose, product = null }) {
  const [width, setWidth] = useState(product?.width_mm || 5000);
  const [height, setHeight] = useState(product?.height_mm || 5500);
  const [env, setEnv] = useState("ambient");
  const overlayRef = useRef(null);

  useEffect(() => {
    if (product?.width_mm) setWidth(product.width_mm);
    if (product?.height_mm) setHeight(product.height_mm);
  }, [product?.id, product?.width_mm, product?.height_mm]);

  const config = deriveDoorConfig(width, height, env);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const setW = (v) => setWidth(Math.min(MAX_W, Math.max(MIN_W, v)));
  const setH = (v) => setHeight(Math.min(MAX_H, Math.max(MIN_H, v)));

  const quoteHref = buildQuoteUrlWithDimensions({
    productId: product?.id,
    widthMm: width,
    heightMm: height,
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-calculator-title"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 id="size-calculator-title" className="text-lg font-black text-white tracking-tight">
                    Size Calculator
                  </h2>
                  {product?.title && (
                    <p className="text-xs text-slate-500 mt-0.5">{product.title}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid lg:grid-cols-[1fr_340px] divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                <div className="p-6 space-y-8">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                      Quick Presets
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DOOR_PRESETS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => {
                            setW(p.width);
                            setH(p.height);
                          }}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium ${
                            width === p.width && height === p.height
                              ? "bg-orange-500/15 border-orange-500/50 text-orange-400"
                              : "bg-slate-800 border-slate-700 text-slate-400 hover:border-orange-500/40 hover:text-slate-200"
                          }`}
                        >
                          {p.label}
                          <span className="ml-1.5 opacity-60">
                            {p.width / 1000}×{p.height / 1000}m
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <DimSlider label="Opening Width" value={width} min={MIN_W} max={MAX_W} step={100} onChange={setW} />
                    <DimSlider label="Opening Height" value={height} min={MIN_H} max={MAX_H} step={100} onChange={setH} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Width (mm)", value: width, set: setW, min: MIN_W, max: MAX_W },
                      { label: "Height (mm)", value: height, set: setH, min: MIN_H, max: MAX_H },
                    ].map(({ label, value, set, min, max }) => (
                      <div key={label} className="space-y-1.5">
                        <label className="text-xs text-slate-500 font-medium">{label}</label>
                        <input
                          type="number"
                          value={value}
                          step={100}
                          min={min}
                          max={max}
                          onChange={(e) => set(Number(e.target.value))}
                          onBlur={(e) => set(Math.min(max, Math.max(min, Number(e.target.value))))}
                          className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Environment</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {ENVIRONMENTS.map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => setEnv(e.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                            env === e.id
                              ? "bg-orange-500/15 border-orange-500/50 text-orange-400"
                              : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                          }`}
                        >
                          <e.icon className="w-4 h-4" />
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {config.warnings.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-2"
                      >
                        {config.warnings.map((w, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-300"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            {w}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 space-y-6 bg-slate-950/40">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-center overflow-x-auto">
                    <DoorVisualizer3D
                      width={width}
                      height={height}
                      env={env}
                      showAdvancedControls={false}
                      canvasWidth={320}
                      canvasHeight={260}
                    />
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400">Opening area</span>
                    <span className="text-lg font-black text-white">{config.area} m²</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Recommended Configuration
                    </p>

                    {[
                      { label: "Door Series", value: config.series, highlight: true },
                      { label: "Material", value: config.material },
                      { label: "Opening Speed", value: config.speed },
                      { label: "Motor Unit", value: config.motor },
                      { label: "Side Guides", value: config.guides },
                      { label: "Insulation", value: config.insulationNote },
                      { label: "Est. Lead Time", value: config.leadTime },
                    ].map(({ label, value, highlight }) => (
                      <motion.div
                        key={label}
                        layout
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          highlight
                            ? "bg-orange-500/10 border-orange-500/25"
                            : "bg-slate-900 border-slate-800"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlight ? "text-orange-500" : "text-slate-600"}`}
                        />
                        <div>
                          <div className="text-xs text-slate-500">{label}</div>
                          <div
                            className={`text-sm font-semibold mt-0.5 ${highlight ? "text-orange-400" : "text-slate-200"}`}
                          >
                            {value}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-500 font-medium">Indicative Price Range</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">${config.priceMin.toLocaleString()}</span>
                      <span className="text-slate-500">–</span>
                      <span className="text-2xl font-black text-white">${config.priceMax.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">AUD + GST · Estimate only, excl. install</p>
                  </div>

                  <div className="space-y-2">
                    <a href={quoteHref} onClick={onClose} className="block">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-5 font-bold group">
                        Get Exact Quote for This Size
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full text-xs text-slate-500 hover:text-slate-300 py-2 transition-colors"
                    >
                      Close calculator
                    </button>
                    <a
                      href={createPageUrl("DoorConfigurator")}
                      onClick={onClose}
                      className="block w-full text-center text-xs text-orange-400 hover:text-orange-300 py-2 font-semibold"
                    >
                      Full-page 3D configurator — curtain colour &amp; control side
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
