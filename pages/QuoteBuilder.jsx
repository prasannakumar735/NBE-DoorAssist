import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCT_LINES } from "@/lib/siteContent";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

const STEPS = ["Product", "Size", "Opening", "Colour", "Motor", "Accessories", "Drawing", "Contact"];
const OPENINGS = ["Internal bay", "External facade", "Coolroom", "Freezer", "Dock", "Process hall"];
const COLOURS = ["Graphite", "White", "RAL custom", "Clear PVC", "Blue tint", "Smoke"];
const MOTORS = ["Standard inverter", "High-cycle SEW", "Heated cold-store", "Manual / none"];
const ACCESSORIES = ["Photocells", "Radar sensor", "UPS backup", "Interlock", "Vision panel", "Bumpers"];

export default function QuoteBuilder() {
  const [params] = useSearchParams();
  const preset = params.get("product");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    product: preset || PRODUCT_LINES[0].id,
    width: 3000,
    height: 3500,
    opening: OPENINGS[0],
    colour: COLOURS[0],
    motor: MOTORS[0],
    accessories: [],
    drawingName: "",
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [done, setDone] = useState(false);

  const product = useMemo(
    () => PRODUCT_LINES.find((p) => p.id === form.product) || PRODUCT_LINES[0],
    [form.product]
  );

  const toggleAcc = (a) => {
    setForm((f) => ({
      ...f,
      accessories: f.accessories.includes(a)
        ? f.accessories.filter((x) => x !== a)
        : [...f.accessories, a],
    }));
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (done) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-5 flex items-center justify-center bg-paper">
        <div className="max-w-xl text-center">
          <SectionLabel>Quote generated</SectionLabel>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            We have your configuration
          </h1>
          <p className="mt-4 text-muted font-light">
            {product.name} · {form.width}×{form.height} mm · {form.opening}. An engineer will respond with a formal
            quotation.
          </p>
          <Link
            to="/"
            className="inline-flex mt-10 px-8 py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
          >
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mist min-h-screen pt-28 pb-28">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionLabel>Quote Builder</SectionLabel>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Configure your system
          </h1>
          <p className="mt-3 text-muted font-light">Eight precise steps. Project-ready quotation.</p>
        </Reveal>

        <div className="mt-10 flex gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 ${i <= step ? "bg-ink" : "bg-line"}`} />
              <p
                className={`mt-2 text-[0.55rem] font-display font-semibold tracking-[0.08em] uppercase hidden sm:block ${
                  i === step ? "text-ink" : "text-muted"
                }`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white border border-line p-6 md:p-10 min-h-[360px]">
          <p className="font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-brand">
            Step {step + 1} — {STEPS[step]}
          </p>

          {step === 0 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {PRODUCT_LINES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setForm({ ...form, product: p.id })}
                  className={`text-left p-4 border transition-colors ${
                    form.product === p.id ? "border-ink bg-mist" : "border-line hover:border-ink/40"
                  }`}
                >
                  <span className="font-display font-bold block">{p.name}</span>
                  <span className="text-xs text-muted mt-1 block">{p.tagline}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid grid-cols-2 gap-6">
              <label className="block">
                <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">
                  Width mm
                </span>
                <input
                  type="number"
                  value={form.width}
                  onChange={(e) => setForm({ ...form, width: Number(e.target.value) })}
                  className="mt-2 w-full border border-line px-4 py-3 text-2xl font-display font-bold outline-none focus:border-ink"
                />
              </label>
              <label className="block">
                <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">
                  Height mm
                </span>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                  className="mt-2 w-full border border-line px-4 py-3 text-2xl font-display font-bold outline-none focus:border-ink"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {OPENINGS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setForm({ ...form, opening: o })}
                  className={`p-4 border text-left font-display font-semibold ${
                    form.opening === o ? "border-ink bg-mist" : "border-line"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {COLOURS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, colour: c })}
                  className={`px-5 py-3 border font-display text-sm font-semibold ${
                    form.colour === c ? "border-ink bg-ink text-white" : "border-line"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="mt-6 space-y-3">
              {MOTORS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm({ ...form, motor: m })}
                  className={`w-full p-4 border text-left font-display font-semibold ${
                    form.motor === m ? "border-ink bg-mist" : "border-line"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {ACCESSORIES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAcc(a)}
                  className={`p-4 border text-left font-display font-semibold ${
                    form.accessories.includes(a) ? "border-ink bg-mist" : "border-line"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {step === 6 && (
            <label className="mt-8 flex flex-col items-center justify-center border border-dashed border-line p-12 cursor-pointer hover:border-ink transition-colors">
              <span className="font-display font-semibold tracking-[0.14em] uppercase text-sm">Upload drawing</span>
              <span className="mt-2 text-sm text-muted">PDF, DWG, DXF, or image</span>
              <input
                type="file"
                className="sr-only"
                onChange={(e) => setForm({ ...form, drawingName: e.target.files?.[0]?.name || "" })}
              />
              {form.drawingName && <span className="mt-4 text-sm text-brand">{form.drawingName}</span>}
            </label>
          )}

          {step === 7 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                ["name", "Full name"],
                ["email", "Email"],
                ["company", "Company"],
                ["phone", "Phone"],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">
                    {label}
                  </span>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="mt-2 w-full border border-line px-4 py-3 outline-none focus:border-ink"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="px-6 py-3 font-display text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-muted disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            className="px-8 py-3.5 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.14em] uppercase hover:bg-brand transition-colors"
          >
            {step === STEPS.length - 1 ? "Generate Quote" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
