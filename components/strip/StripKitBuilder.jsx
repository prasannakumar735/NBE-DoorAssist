import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  STRIP_DUTIES,
  STRIP_GRADES,
  STRIP_PRESETS,
  estimateStripKitPrice,
} from "@/lib/stripCurtainShop";
import { buildQuoteUrlWithDimensions, createPageUrl } from "@/utils";

export default function StripKitBuilder({ compact = false }) {
  const [widthMm, setWidthMm] = useState(1200);
  const [heightMm, setHeightMm] = useState(2100);
  const [dutyId, setDutyId] = useState("medium");
  const [gradeId, setGradeId] = useState("standard");

  const estimate = useMemo(
    () => estimateStripKitPrice(widthMm, heightMm, dutyId, gradeId),
    [widthMm, heightMm, dutyId, gradeId]
  );

  const quoteHref = buildQuoteUrlWithDimensions({
    productId: "prod-pvc-101",
    widthMm: estimate.widthMm,
    heightMm: estimate.heightMm,
  });

  return (
    <div className={compact ? "" : "rounded-none border border-slate-200 bg-white shadow-sm"}>
      <div className={compact ? "space-y-6" : "grid lg:grid-cols-2 gap-0"}>
        <div className={compact ? "" : "p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200"}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-2">Build &amp; price</p>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 [font-family:var(--font-heading)]">
            Instant strip door kit
          </h3>
          <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
            Measure the clear opening. Pick duty and grade. Get an online kit price — Australia-wide dispatch.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {STRIP_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setWidthMm(p.widthMm);
                  setHeightMm(p.heightMm);
                }}
                className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider border border-slate-200 text-slate-700 hover:border-brand hover:text-brand transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Width (mm)</span>
              <input
                type="number"
                min={600}
                max={6000}
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                className="mt-2 w-full border border-slate-200 px-4 py-3 text-lg font-semibold text-neutral-900 focus:outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Height (mm)</span>
              <input
                type="number"
                min={1800}
                max={5000}
                value={heightMm}
                onChange={(e) => setHeightMm(Number(e.target.value))}
                className="mt-2 w-full border border-slate-200 px-4 py-3 text-lg font-semibold text-neutral-900 focus:outline-none focus:border-brand"
              />
            </label>
          </div>

          <fieldset className="mt-8">
            <legend className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 mb-3">Duty</legend>
            <div className="space-y-2">
              {STRIP_DUTIES.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                    dutyId === d.id ? "border-brand bg-brand/5" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="duty"
                    className="mt-1 accent-orange-500"
                    checked={dutyId === d.id}
                    onChange={() => setDutyId(d.id)}
                  />
                  <span>
                    <span className="block font-bold text-neutral-900 text-sm">{d.label}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {d.thickness} · {d.use}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 mb-3">Grade</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {STRIP_GRADES.map((g) => (
                <label
                  key={g.id}
                  className={`flex items-start gap-2 p-3 border cursor-pointer transition-colors ${
                    gradeId === g.id ? "border-brand bg-brand/5" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="grade"
                    className="mt-1 accent-orange-500"
                    checked={gradeId === g.id}
                    onChange={() => setGradeId(g.id)}
                  />
                  <span>
                    <span className="block font-bold text-neutral-900 text-sm">{g.label}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{g.temp}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={compact ? "mt-6 p-6 bg-neutral-950 text-white" : "p-8 md:p-10 bg-neutral-950 text-white flex flex-col justify-between"}>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-brand">Your kit estimate</p>
            <motion.p
              key={estimate.priceAud}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-5xl md:text-6xl font-black tracking-tighter"
            >
              ${estimate.priceAud.toLocaleString("en-AU")}
            </motion.p>
            <p className="mt-2 text-sm text-slate-400">AUD excl. GST · made to your opening</p>

            <dl className="mt-8 space-y-3 text-sm border-t border-white/10 pt-6">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Opening</dt>
                <dd className="font-semibold">
                  {estimate.widthMm} × {estimate.heightMm} mm
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Area</dt>
                <dd className="font-semibold">{estimate.areaM2} m²</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Duty / grade</dt>
                <dd className="font-semibold text-right">
                  {estimate.duty.label} · {estimate.grade.label}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Dispatch</dt>
                <dd className="font-semibold">{estimate.leadDays} business days</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={quoteHref}
              className="inline-flex items-center justify-center px-6 py-4 bg-brand text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-neutral-900 transition-colors"
            >
              Order this kit
            </a>
            <a
              href={createPageUrl("Products?category=pvc_strip_curtains")}
              className="inline-flex items-center justify-center px-6 py-4 border border-white/30 text-white font-bold text-xs uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
            >
              Browse stock kits
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Standard openings: order online. Irregular sizes, welding bays or multi-door sites — we quote same day.
          </p>
        </div>
      </div>
    </div>
  );
}
