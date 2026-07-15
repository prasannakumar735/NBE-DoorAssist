import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Loader2, Upload } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/premium/Motion";
import { getQuoteFlow } from "@/lib/quoteFlows";
import { submitQuoteRequest, fileToAttachment } from "@/api/leadsClient";

function StepDimensions({ value = {}, onChange }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-6">
      <label className="block">
        <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">Width mm</span>
        <input
          type="number"
          value={value.width || ""}
          onChange={(e) => onChange({ ...value, width: e.target.value })}
          className="mt-2 w-full border border-line px-4 py-3 text-2xl font-display font-bold outline-none focus:border-ink"
        />
      </label>
      <label className="block">
        <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">Height mm</span>
        <input
          type="number"
          value={value.height || ""}
          onChange={(e) => onChange({ ...value, height: e.target.value })}
          className="mt-2 w-full border border-line px-4 py-3 text-2xl font-display font-bold outline-none focus:border-ink"
        />
      </label>
    </div>
  );
}

function StepChoice({ options, value, onChange }) {
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-3">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`p-4 border text-left font-display font-semibold transition-colors ${
            value === o ? "border-ink bg-mist" : "border-line hover:border-ink/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function StepUpload({ value, onChange }) {
  return (
    <label className="mt-8 flex flex-col items-center justify-center border border-dashed border-line p-12 cursor-pointer hover:border-ink transition-colors">
      <Upload className="w-6 h-6 text-muted mb-2" />
      <span className="font-display font-semibold tracking-[0.14em] uppercase text-sm">Upload file</span>
      <span className="mt-2 text-sm text-muted">PDF, DWG, or image — optional</span>
      <input
        type="file"
        className="sr-only"
        accept=".pdf,.png,.jpg,.jpeg,.dwg"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      {value && <span className="mt-4 text-sm text-brand">{value.name}</span>}
    </label>
  );
}

function StepContact({ value = {}, onChange }) {
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-4">
      {[
        ["name", "Full name *"],
        ["email", "Email *"],
        ["company", "Company"],
        ["phone", "Phone"],
      ].map(([key, label]) => (
        <label key={key} className="block">
          <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">{label}</span>
          <input
            value={value[key] || ""}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            className="mt-2 w-full border border-line px-4 py-3 outline-none focus:border-ink"
          />
        </label>
      ))}
    </div>
  );
}

export default function QuoteBuilder() {
  const [params] = useSearchParams();
  const familyParam = params.get("family");
  const productId = params.get("product") || "";
  const flow = useMemo(() => getQuoteFlow(familyParam), [familyParam]);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle"); // idle | validating | submitting | success | error
  const [error, setError] = useState("");

  const currentStepDef = flow.steps[step];
  const isLastStep = step === flow.steps.length - 1;

  const setField = (fieldId, val) => setAnswers((a) => ({ ...a, [fieldId]: val }));

  const canContinue = () => {
    if (currentStepDef.type === "contact") {
      const c = answers.contact || {};
      return Boolean(c.name && c.email);
    }
    return true;
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setStatus("validating");
    if (!canContinue()) {
      setStatus("error");
      setError("Please provide your name and email so we can respond.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const contact = answers.contact || {};
      const dims = answers.dimensions || {};
      const attachmentFile = answers.attachment || null;
      const attachment = attachmentFile ? await fileToAttachment(attachmentFile) : null;

      const messageLines = flow.steps
        .filter((s) => s.type === "choice" && answers[s.field])
        .map((s) => `${s.title}: ${answers[s.field]}`);
      if (dims.width || dims.height) {
        messageLines.push(`Opening size: ${dims.width || "-"}mm x ${dims.height || "-"}mm`);
      }
      if (productId) messageLines.push(`Product ID: ${productId}`);

      await submitQuoteRequest({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        business: contact.company,
        item: flow.label,
        message: messageLines.join("\n"),
        context: `quote-builder:${familyParam || "rapid-door"}`,
        attachment,
      });

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Unable to submit your quote request right now. Please try again, or email support@drooov.com.au.");
    }
  };

  const next = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen pt-32 pb-24 px-5 flex items-center justify-center bg-paper">
        <div className="max-w-xl text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <SectionLabel>Quote request sent</SectionLabel>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            We've received your enquiry
          </h1>
          <p className="mt-4 text-muted font-light">
            {flow.label} · one of our team will respond within 24 hours with a tailored quote.
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
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight">{flow.label}</h1>
          <p className="mt-3 text-muted font-light">{flow.steps.length} precise steps. Project-ready quotation.</p>
        </Reveal>

        <div className="mt-10 flex gap-1">
          {flow.steps.map((s, i) => (
            <div key={s.id} className="flex-1">
              <div className={`h-1 ${i <= step ? "bg-ink" : "bg-line"}`} />
              <p
                className={`mt-2 text-[0.55rem] font-display font-semibold tracking-[0.08em] uppercase hidden sm:block ${
                  i === step ? "text-ink" : "text-muted"
                }`}
              >
                {s.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white border border-line p-6 md:p-10 min-h-[360px]">
          <p className="font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-brand">
            Step {step + 1} — {currentStepDef.title}
          </p>
          <p className="mt-3 font-display text-xl font-bold tracking-tight">{currentStepDef.question}</p>

          {currentStepDef.type === "choice" && (
            <StepChoice
              options={currentStepDef.options}
              value={answers[currentStepDef.field]}
              onChange={(v) => setField(currentStepDef.field, v)}
            />
          )}
          {currentStepDef.type === "dimensions" && (
            <StepDimensions value={answers.dimensions} onChange={(v) => setField("dimensions", v)} />
          )}
          {currentStepDef.type === "upload" && (
            <StepUpload value={answers.attachment} onChange={(v) => setField("attachment", v)} />
          )}
          {currentStepDef.type === "contact" && (
            <StepContact value={answers.contact} onChange={(v) => setField("contact", v)} />
          )}

          {status === "error" && error && (
            <p className="mt-6 flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || status === "submitting"}
            className="px-6 py-3 font-display text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-muted disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={status === "submitting"}
            className="px-8 py-3.5 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.14em] uppercase hover:bg-brand transition-colors disabled:opacity-60 inline-flex items-center gap-2"
          >
            {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLastStep ? (status === "submitting" ? "Submitting…" : "Submit Quote Request") : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
