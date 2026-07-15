import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Ruler,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  Shield,
  Zap,
  Box,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DoorVisualizer3D from "@/components/door/DoorVisualizer3D";
import { buildDoorConfiguratorUrl, parseDoorConfiguratorSearch } from "@/lib/doorConfiguratorUrl";
import { buildQuoteUrlWithDimensions, createPageUrl } from "@/utils";
import { toast } from "@/components/ui/use-toast";
import {
  DOOR_PRESETS,
  deriveDoorConfig,
  MIN_W,
  MAX_W,
  MIN_H,
  MAX_H,
} from "@/lib/doorCalculatorConfig";
import { CURTAIN_OPTIONS, CURTAIN_PALETTE, rgbaFromHex } from "@/lib/doorColors";

const ENVIRONMENTS = [
  { id: "ambient", label: "Ambient Warehouse", icon: Shield },
  { id: "cold", label: "Cold / Freezer", icon: Thermometer },
  { id: "high_traffic", label: "High Traffic", icon: Zap },
  { id: "external", label: "External / Exposed", icon: AlertTriangle },
];

const WALL_STYLE_OPTIONS = [
  { id: "warehouse", label: "Warehouse" },
  { id: "concrete", label: "Concrete" },
  { id: "cleanroom", label: "Cleanroom" },
  { id: "brick", label: "Brick" },
];

const WALL_TINTS = [
  { id: "", label: "Auto" },
  { id: "#334155", label: "Steel blue" },
  { id: "#6b7280", label: "Grey" },
  { id: "#d6e4f2", label: "Light" },
  { id: "#7a5248", label: "Brick tone" },
];

function DimSlider({ label, value, min, max, step = 100, unit = "mm", onChange, accentHex }) {
  const pct = ((value - min) / (max - min)) * 100;
  const fill = `linear-gradient(90deg, ${accentHex}, ${rgbaFromHex(accentHex, 0.65)})`;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-lg font-black tabular-nums" style={{ color: accentHex }}>
          {value.toLocaleString()} <span className="text-xs text-slate-600 font-normal">{unit}</span>
        </span>
      </div>
      <div className="relative h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-200" style={{ width: `${pct}%`, background: fill }} />
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
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            backgroundColor: accentHex,
            boxShadow: `0 0 0 1px ${rgbaFromHex(accentHex, 0.4)}`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600">
        <span>{(min / 1000).toFixed(1)}m</span>
        <span>{(max / 1000).toFixed(1)}m</span>
      </div>
    </div>
  );
}

function initialFromSearch() {
  if (typeof window === "undefined") return {};
  return parseDoorConfiguratorSearch(window.location.search);
}

export default function DoorConfigurator() {
  const parsed = useMemo(() => initialFromSearch(), []);

  const [width, setWidth] = useState(() => parsed.widthMm ?? 5000);
  const [height, setHeight] = useState(() => parsed.heightMm ?? 5500);
  const [env, setEnv] = useState(() => parsed.env ?? "ambient");
  const [controlSide, setControlSide] = useState(() => parsed.controlSide ?? "left");
  const [curtainColor, setCurtainColor] = useState(() => parsed.curtainColor ?? "blue");
  const [viewFlip, setViewFlip] = useState(() => parsed.viewFlip ?? false);
  const [showWall, setShowWall] = useState(true);
  const [wallStyle, setWallStyle] = useState("cleanroom");
  const [floorStyle, setFloorStyle] = useState("light");
  const [wallTintHex, setWallTintHex] = useState("");

  /** Page accents follow curtain colour so theme selection matches the live preview. */
  const accentHex = CURTAIN_PALETTE[curtainColor] || CURTAIN_PALETTE.blue;
  const config = useMemo(() => deriveDoorConfig(width, height, env), [width, height, env]);

  const setW = (v) => setWidth(Math.min(MAX_W, Math.max(MIN_W, v)));
  const setH = (v) => setHeight(Math.min(MAX_H, Math.max(MIN_H, v)));

  const quoteHref = buildQuoteUrlWithDimensions({ widthMm: width, heightMm: height });

  const sharePath = useMemo(
    () =>
      buildDoorConfiguratorUrl({
        widthMm: width,
        heightMm: height,
        env,
        controlSide,
        curtainColor,
        viewFlip,
      }),
    [width, height, env, controlSide, curtainColor, viewFlip]
  );

  const copyShareLink = () => {
    const full = `${typeof window !== "undefined" ? window.location.origin : ""}${sharePath}`;
    navigator.clipboard.writeText(full).then(
      () => toast({ title: "Link copied", description: "Share this configuration with your team." }),
      () => toast({ title: "Copy failed", description: "Select the address bar or try again.", variant: "destructive" })
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900"
      style={{ "--config-accent": accentHex }}
    >
      <div className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accentHex }}>
            Interactive 3D
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Door size &amp; visualizer</h1>
          <p className="mt-3 text-slate-600 max-w-2xl text-sm md:text-base leading-relaxed">
            Step through opening size, environment, and hardware. The live preview uses step sizing, millimetre inputs,
            travel preview, and alternate viewing angles, with fullscreen and a shareable link for reviews.
          </p>
          <ol className="mt-6 flex flex-wrap gap-3 text-[0.7rem] font-bold uppercase tracking-widest text-slate-600">
            {[
              { step: 1, label: "Opening size" },
              { step: 2, label: "Environment & hardware" },
              { step: 3, label: "Quote & summary" },
            ].map(({ step, label }) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-700"
                  style={{ borderColor: rgbaFromHex(accentHex, 0.45), color: accentHex }}
                >
                  {step}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={createPageUrl("Products")} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              ← Back to products
            </a>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyShareLink}
              className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 gap-2"
            >
              <Link2 className="w-4 h-4" />
              Copy configuration link
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(340px,480px)] gap-10 xl:gap-12 items-start">
          {/* Controls */}
          <div className="space-y-10 order-2 xl:order-1">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-600">Opening size</h2>
              <div className="flex flex-wrap gap-2">
                {DOOR_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setW(p.width);
                      setH(p.height);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      width === p.width && height === p.height
                        ? "text-white"
                        : "border-slate-300 text-slate-600 hover:border-slate-400"
                    }`}
                    style={
                      width === p.width && height === p.height
                        ? { backgroundColor: rgbaFromHex(accentHex, 0.2), borderColor: accentHex }
                        : {}
                    }
                  >
                    {p.label}{" "}
                    <span className="opacity-70">
                      {p.width / 1000}×{p.height / 1000}m
                    </span>
                  </button>
                ))}
              </div>

              <DimSlider label="Opening width" value={width} min={MIN_W} max={MAX_W} step={100} onChange={setW} accentHex={accentHex} />
              <DimSlider label="Opening height" value={height} min={MIN_H} max={MAX_H} step={100} onChange={setH} accentHex={accentHex} />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600">Width (mm)</label>
                  <input
                    type="number"
                    value={width}
                    step={100}
                    min={MIN_W}
                    max={MAX_W}
                    onChange={(e) => setW(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600">Height (mm)</label>
                  <input
                    type="number"
                    value={height}
                    step={100}
                    min={MIN_H}
                    max={MAX_H}
                    onChange={(e) => setH(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-600">Environment</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ENVIRONMENTS.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setEnv(e.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      env === e.id ? "text-slate-900 border-transparent" : "border-slate-300 text-slate-600 hover:border-slate-400"
                    }`}
                    style={
                      env === e.id
                        ? { backgroundColor: rgbaFromHex(accentHex, 0.15), borderColor: rgbaFromHex(accentHex, 0.5) }
                        : {}
                    }
                  >
                    <e.icon className="w-4 h-4" style={{ color: env === e.id ? accentHex : undefined }} />
                    {e.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-600">Hardware</h2>

              <div>
                <p className="text-xs text-slate-600 mb-3 flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  Control box side <span className="text-slate-500">(motor / drive)</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["left", "right"].map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setControlSide(side)}
                      className={`py-3 rounded-xl text-sm font-bold uppercase tracking-wider border transition-all ${
                        controlSide === side ? "text-slate-900" : "border-slate-300 text-slate-600 hover:bg-slate-100"
                      }`}
                      style={
                        controlSide === side
                          ? { backgroundColor: rgbaFromHex(accentHex, 0.2), borderColor: accentHex }
                          : {}
                      }
                    >
                      {side}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-600 mb-3">
                  Curtain colour <span className="text-slate-500">(updates preview &amp; page accents)</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {CURTAIN_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCurtainColor(c.id)}
                      className={`flex items-center gap-2 pl-1 pr-4 py-2 rounded-full border text-xs font-bold transition-all ${
                        curtainColor === c.id ? "border-slate-900 text-slate-900" : "border-slate-300 text-slate-600"
                      }`}
                      style={
                        curtainColor === c.id
                          ? { borderColor: c.hex, backgroundColor: rgbaFromHex(c.hex, 0.12) }
                          : {}
                      }
                    >
                      <span
                        className="w-8 h-8 rounded-full border-2 border-white/20 shadow-inner shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-600">Wall preview</p>
                <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={showWall}
                    onChange={(e) => setShowWall(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Show wall behind door
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WALL_STYLE_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWallStyle(w.id)}
                      className={`py-2 rounded-lg text-xs border ${
                        wallStyle === w.id ? "text-slate-900" : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                      style={wallStyle === w.id ? { borderColor: accentHex, backgroundColor: rgbaFromHex(accentHex, 0.12) } : {}}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-600">Floor</p>
                  <div className="flex gap-2">
                    {[
                      { id: "light", label: "Light floor" },
                      { id: "dark", label: "Dark floor" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFloorStyle(f.id)}
                        className={`flex-1 py-2 rounded-lg text-xs border ${
                          floorStyle === f.id ? "text-slate-900" : "border-slate-300 text-slate-600 hover:border-slate-400"
                        }`}
                        style={
                          floorStyle === f.id ? { borderColor: accentHex, backgroundColor: rgbaFromHex(accentHex, 0.12) } : {}
                        }
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {WALL_TINTS.map((t) => (
                    <button
                      key={t.id || "auto"}
                      type="button"
                      onClick={() => setWallTintHex(t.id)}
                      className={`px-3 py-1.5 rounded-full text-[0.7rem] border ${
                        wallTintHex === t.id ? "text-slate-900" : "border-slate-300 text-slate-600"
                      }`}
                      style={wallTintHex === t.id ? { borderColor: accentHex, backgroundColor: rgbaFromHex(accentHex, 0.12) } : {}}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Opening area</span>
                <span className="text-2xl font-black text-slate-900">{config.area} m²</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Suggested configuration</p>
                {[
                  { label: "Door series", value: config.series, hi: true },
                  { label: "Material", value: config.material },
                  { label: "Speed", value: config.speed },
                  { label: "Motor", value: config.motor },
                  { label: "Guides", value: config.guides },
                  { label: "Insulation", value: config.insulationNote },
                  { label: "Lead time", value: config.leadTime },
                ].map((row) => (
                  <motion.div
                    key={row.label}
                    layout
                    className={`flex items-start gap-3 p-3 rounded-xl border ${
                      row.hi ? "border-opacity-60" : "border-slate-200 bg-slate-50"
                    }`}
                    style={row.hi ? { borderColor: rgbaFromHex(accentHex, 0.35), backgroundColor: rgbaFromHex(accentHex, 0.08) } : {}}
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: row.hi ? accentHex : "#64748b" }}
                    />
                    <div>
                      <div className="text-xs text-slate-600">{row.label}</div>
                      <div className={`text-sm font-semibold mt-0.5 ${row.hi ? "" : "text-slate-800"}`} style={row.hi ? { color: accentHex } : {}}>
                        {row.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {config.warnings.length > 0 && (
                <div className="space-y-2 pt-2">
                  {config.warnings.map((w, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {w}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-medium">Indicative price range (AUD + GST)</span>
                </div>
                <div className="text-xl font-black text-slate-900">
                  ${config.priceMin.toLocaleString()} – ${config.priceMax.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600 mt-1">Estimate only — excludes install</p>
              </div>

              <a href={quoteHref}>
                <Button
                  className="w-full py-6 rounded-xl font-bold text-white gap-2 shadow-lg border-0"
                  style={{ backgroundColor: accentHex, boxShadow: `0 10px 40px ${rgbaFromHex(accentHex, 0.35)}` }}
                >
                  Get quote for this configuration
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </section>
          </div>

          {/* 3D preview — sticky on large screens */}
          <div className="order-1 xl:order-2 xl:sticky xl:top-24 space-y-4">
            <div
              className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white shadow-lg"
              style={{ boxShadow: `0 0 0 1px ${rgbaFromHex(accentHex, 0.14)}, 0 12px 28px -14px rgba(15,23,42,0.35)` }}
            >
              {/* Raster door disabled: OneDrive “DRoooV …” JPGs are logo tiles (626²) or horizontal banners (1042×251), not door stills. */}
              <DoorVisualizer3D
                width={width}
                height={height}
                env={env}
                controlSide={controlSide}
                curtainColor={curtainColor}
                useDoorImage={false}
                defaultViewZoom={1.3}
                defaultViewYaw={Math.PI / 6}
                showWall={showWall}
                wallStyle={wallStyle}
                floorStyle={floorStyle}
                wallTintHex={wallTintHex}
                canvasWidth={460}
                canvasHeight={380}
                embedControls
                viewFlip={viewFlip}
                onViewFlipChange={setViewFlip}
                defaultOpenPct={parsed.openPct ?? 0}
                showAdvancedControls
              />
            </div>
            <p className="text-center text-xs text-slate-600 px-2">
              Resize with sliders, use curtain position for partial opening, and switch flip/fullscreen for review. Space
              toggles open/closed when the preview is focused.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
