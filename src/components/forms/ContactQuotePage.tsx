"use client";

import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Columns2,
  DoorOpen,
  FileEdit,
  Info,
  Shield,
  Wrench,
} from "lucide-react";
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

const SIDEBAR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoKEMVpclNBb4X_B6NQrR9BzjUyMUnYCHtzKXUPYNvZxb5U3-Kc-tw4chUnCo2F0I9njXWvY9Un5k-mPuGO_2nWJPzESPspFK9QvFMPFH49ceHkG4zjB7De4cJ5RffSrQTwdNl80O5QhUSddlEC9C9d_NGtrxE0cZc4qtx1AT2ztzqfWx8awgm8hw8B39-8swXvGyKk48az3DCSuwXTMSLZ5rCywJxS4BUVRjeQLP7UCF77L-KVcYlYgJJ_LD_ifRADb8LbhWaZqs";

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select industry…" },
  { value: "cold_storage", label: "Cold storage & logistics" },
  { value: "food_processing", label: "Food processing / cleanroom" },
  { value: "retail", label: "Retail & supermarkets" },
  { value: "manufacturing", label: "Manufacturing & industrial" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
] as const;

const MATERIAL_OPTIONS = [
  { value: "standard_industrial", label: "Standard industrial" },
  { value: "cold_storage_grade", label: "Cold-storage compound (datasheet on quote)" },
  { value: "heavy_duty", label: "Heavy-duty / high-impact context" },
  { value: "cleanroom_discuss", label: "Cleanroom / ESD — discuss on enquiry" },
] as const;

function toMm(n: number, unit: string): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  if (unit === "m") return Math.round(n * 1000);
  if (unit === "cm") return Math.round(n * 10);
  return Math.round(n);
}

function FloatingField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-lg border border-[#cbd5e1] bg-white px-4 pb-2.5 pt-5 font-body text-sm !text-[#051125] outline-none transition focus:border-[#FC8347] focus:ring-2 focus:ring-[#FC8347]/20"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-3 z-10 origin-[0] font-body text-[0.65rem] font-semibold uppercase tracking-wider text-[#64748b] transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:left-2 peer-focus:translate-y-0 peer-focus:bg-white peer-focus:px-1 peer-focus:text-[0.65rem] peer-focus:!text-[#FC8347] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:!text-[#FC8347]"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactQuotePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [productFamily, setProductFamily] = useState<"rapid" | "pvc">("rapid");
  const [industry, setIndustry] = useState("");
  const [materialGrade, setMaterialGrade] = useState<string>(MATERIAL_OPTIONS[0].value);
  const [dimUnit, setDimUnit] = useState<"mm" | "cm" | "m">("mm");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [openings, setOpenings] = useState("1");
  const [envFreezer, setEnvFreezer] = useState(false);
  const [envAmbient, setEnvAmbient] = useState(false);
  const [envWind, setEnvWind] = useState(false);
  const [envTraffic, setEnvTraffic] = useState(false);
  const [wantInstall, setWantInstall] = useState(false);
  const [wantUrgent, setWantUrgent] = useState(false);
  const [techNotes, setTechNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const scrollToPrimary = () => {
    document.getElementById("primary-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const buildNotes = () => {
    const lines: string[] = [];
    lines.push(`Product family: ${productFamily === "rapid" ? "Rapid roller doors" : "PVC strip curtains"}`);
    lines.push(`Preferred contact: ${contactMethod === "email" ? "Email" : "Phone"}`);
    lines.push(`Dimension unit stated: ${dimUnit}`);
    const envs = [
      envFreezer && "Freezer",
      envAmbient && "Ambient",
      envWind && "High wind / pressure",
      envTraffic && "High traffic",
    ].filter(Boolean);
    if (envs.length) lines.push(`Environment: ${envs.join(", ")}`);
    if (wantInstall) lines.push("Installation assistance: requested (scope to be quoted)");
    if (wantUrgent) lines.push("Expedited timing: requested — subject to capacity and stock");
    if (techNotes.trim()) lines.push(`Technical notes:\n${techNotes.trim()}`);
    return lines.join("\n");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const w = Number(width);
    const h = Number(height);
    const q = Number(openings);
    const widthMm = toMm(w, dimUnit);
    const heightMm = toMm(h, dimUnit);
    const qty = Number.isFinite(q) && q > 0 ? Math.floor(q) : 1;

    if (!widthMm || !heightMm) {
      setSubmitStatus("error");
      setSubmitMessage("Please enter valid width and height for the clear opening.");
      setIsSubmitting(false);
      return;
    }

    const facilityType = industry || "warehouse";

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          facility_type: facilityType,
          opening_width: String(widthMm),
          opening_height: String(heightMm),
          quantity: String(qty),
          material: materialGrade,
          insulation: "no",
          notes: buildNotes(),
          files: [],
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error || "Failed to submit");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you — your request is with our team. We’ll respond during business hours.");
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setWidth("");
      setHeight("");
      setOpenings("1");
      setTechNotes("");
      setIndustry("");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setSubmitMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionRule = (
    <span className="h-0.5 w-8 shrink-0 bg-[#FC8347]" aria-hidden />
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-body text-[#051125]">
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="order-2 space-y-8 lg:order-1 lg:col-span-4">
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
              <h2 className="mb-8 border-b border-[#f1f5f9] pb-4 font-body text-xs font-bold uppercase tracking-[0.15em] !text-[#64748b]">
                Why drooov
              </h2>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff4ec] text-[#FC8347]">
                    <BadgeCheck className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-headline text-sm font-bold leading-tight !text-[#051125]">
                      Responsive engineering review
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-[#584237]">
                      Enquiries are triaged by our team during business hours — complex openings may need a short follow-up
                      call.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff4ec] text-[#FC8347]">
                    <Wrench className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-headline text-sm font-bold leading-tight !text-[#051125]">
                      Installation &amp; commissioning
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-[#584237]">
                      Site fit-off is scoped per project — regional availability and access constraints are confirmed on
                      quote.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff4ec] text-[#FC8347]">
                    <Shield className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-headline text-sm font-bold leading-tight !text-[#051125]">
                      Standards &amp; documentation
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-[#584237]">
                      Submittals and compliance references are aligned to your specification — verified in writing with
                      your order where applicable.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-64 overflow-hidden rounded-xl border border-[#e2e8f0]">
              <Image
                src={SIDEBAR_IMG}
                alt=""
                fill
                className="object-cover grayscale opacity-60"
                sizes="(max-width:1024px) 100vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051125]/50 to-transparent" />
            </div>
          </aside>

          {/* Form */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-[0px_10px_30px_rgba(15,23,42,0.05)] md:p-12">
              <header className="mb-10">
                <h1 className="mb-3 font-headline text-3xl font-bold tracking-tight !text-[#051125] md:text-4xl">
                  Request technical quote
                </h1>
                <p className="max-w-2xl font-body text-[#584237]">
                  Configure your industrial barrier enquiry with as much detail as you have. We&apos;ll review and respond
                  with engineering-aligned next steps — no pricing displayed on this page.
                </p>
              </header>

              <div className="mb-12">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <span className="mb-1 block font-body text-[10px] font-bold uppercase tracking-widest text-[#FC8347]">
                      Quote checklist
                    </span>
                    <span className="font-body text-sm font-semibold !text-[#051125]">
                      Product selection &amp; configuration
                    </span>
                  </div>
                  <span className="font-body text-xs font-medium text-[#94a3b8]">In progress</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
                  <div className="h-full w-1/2 rounded-full bg-[#FC8347] transition-all duration-700" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {submitStatus === "success" ? (
                  <div
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 font-body text-sm text-emerald-900"
                    role="status"
                  >
                    {submitMessage}
                  </div>
                ) : null}
                {submitStatus === "error" ? (
                  <div
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-900"
                    role="alert"
                  >
                    {submitMessage}
                  </div>
                ) : null}

                <section id="primary-contact" className="space-y-8 scroll-mt-28">
                  <div className="flex items-center gap-3">
                    {sectionRule}
                    <h2 className="font-body text-sm font-bold uppercase tracking-widest !text-[#051125]">
                      01. Primary contact
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                    <FloatingField id="fullname" label="Full name" value={name} onChange={setName} required autoComplete="name" />
                    <FloatingField
                      id="company"
                      label="Company name"
                      value={company}
                      onChange={setCompany}
                      autoComplete="organization"
                    />
                    <FloatingField
                      id="email"
                      label="Email address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      required
                      autoComplete="email"
                    />
                    <FloatingField
                      id="phone"
                      label="Phone number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                      Preferred contact method
                    </p>
                    <div className="flex gap-6">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="contact_method"
                          value="email"
                          checked={contactMethod === "email"}
                          onChange={() => setContactMethod("email")}
                          className="h-4 w-4 border-[#cbd5e1] text-[#FC8347] focus:ring-[#FC8347]"
                        />
                        <span className="font-body text-sm font-medium text-[#334155]">Email</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="contact_method"
                          value="phone"
                          checked={contactMethod === "phone"}
                          onChange={() => setContactMethod("phone")}
                          className="h-4 w-4 border-[#cbd5e1] text-[#FC8347] focus:ring-[#FC8347]"
                        />
                        <span className="font-body text-sm font-medium text-[#334155]">Phone call</span>
                      </label>
                    </div>
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    {sectionRule}
                    <h2 className="font-body text-sm font-bold uppercase tracking-widest !text-[#051125]">
                      02. Configuration
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setProductFamily("rapid")}
                      className={`rounded-xl border-2 bg-white p-6 text-left shadow-sm transition-all hover:border-[#FC8347]/30 ${
                        productFamily === "rapid"
                          ? "border-[#FC8347] bg-[#fff4ec]/40"
                          : "border-[#f1f5f9]"
                      }`}
                    >
                      <div className="mb-6 flex items-start justify-between">
                        <div
                          className={`rounded-lg p-3 transition-colors ${
                            productFamily === "rapid"
                              ? "bg-[#FC8347] text-white"
                              : "bg-[#f8fafc] text-[#475569]"
                          }`}
                        >
                          <DoorOpen className="h-8 w-8" strokeWidth={1.25} aria-hidden />
                        </div>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            productFamily === "rapid" ? "border-[#FC8347]" : "border-[#e2e8f0]"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-[#FC8347] transition-opacity ${
                              productFamily === "rapid" ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </span>
                      </div>
                      <h3 className="mb-2 font-headline font-bold !text-[#051125]">Rapid roller doors</h3>
                      <p className="font-body text-xs leading-relaxed text-[#584237]">
                        High-cycle closures for climate, hygiene, and workflow — sized and specified to your opening.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductFamily("pvc")}
                      className={`rounded-xl border-2 bg-white p-6 text-left shadow-sm transition-all hover:border-[#FC8347]/30 ${
                        productFamily === "pvc"
                          ? "border-[#FC8347] bg-[#fff4ec]/40"
                          : "border-[#f1f5f9]"
                      }`}
                    >
                      <div className="mb-6 flex items-start justify-between">
                        <div
                          className={`rounded-lg p-3 transition-colors ${
                            productFamily === "pvc"
                              ? "bg-[#FC8347] text-white"
                              : "bg-[#f8fafc] text-[#475569]"
                          }`}
                        >
                          <Columns2 className="h-8 w-8" strokeWidth={1.25} aria-hidden />
                        </div>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            productFamily === "pvc" ? "border-[#FC8347]" : "border-[#e2e8f0]"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-[#FC8347] transition-opacity ${
                              productFamily === "pvc" ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </span>
                      </div>
                      <h3 className="mb-2 font-headline font-bold !text-[#051125]">PVC strip curtains</h3>
                      <p className="font-body text-xs leading-relaxed text-[#584237]">
                        Flexible thermal and dust separation — strip schedule and overlap from site measure.
                      </p>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="industry" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                        Industry type
                      </label>
                      <select
                        id="industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
                        className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 font-body text-sm font-medium !text-[#051125] outline-none transition focus:border-[#FC8347] focus:ring-2 focus:ring-[#FC8347]/20"
                      >
                        {INDUSTRY_OPTIONS.map((o) => (
                          <option key={o.value || "placeholder"} value={o.value} disabled={o.value === ""}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="material_grade" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                        Material / sub-option
                      </label>
                      <select
                        id="material_grade"
                        value={materialGrade}
                        onChange={(e) => setMaterialGrade(e.target.value)}
                        className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 font-body text-sm font-medium !text-[#051125] outline-none transition focus:border-[#FC8347] focus:ring-2 focus:ring-[#FC8347]/20"
                      >
                        {MATERIAL_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    {sectionRule}
                    <h2 className="font-body text-sm font-bold uppercase tracking-widest !text-[#051125]">
                      03. Project dimensions
                    </h2>
                  </div>
                  <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
                    <div className="grid grid-cols-2 items-end gap-6 md:grid-cols-4">
                      <div className="space-y-2">
                        <label htmlFor="unit" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                          Unit
                        </label>
                        <select
                          id="unit"
                          value={dimUnit}
                          onChange={(e) => setDimUnit(e.target.value as "mm" | "cm" | "m")}
                          className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 font-body text-sm font-semibold !text-[#051125]"
                        >
                          <option value="mm">mm</option>
                          <option value="cm">cm</option>
                          <option value="m">m</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="opening_w" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                          Width
                        </label>
                        <input
                          id="opening_w"
                          type="number"
                          min={1}
                          step={1}
                          required
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 font-body text-sm !text-[#051125] outline-none focus:border-[#FC8347]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="opening_h" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                          Height
                        </label>
                        <input
                          id="opening_h"
                          type="number"
                          min={1}
                          step={1}
                          required
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 font-body text-sm !text-[#051125] outline-none focus:border-[#FC8347]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="openings_n" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                          No. of openings
                        </label>
                        <input
                          id="openings_n"
                          type="number"
                          min={1}
                          step={1}
                          required
                          value={openings}
                          onChange={(e) => setOpenings(e.target.value)}
                          placeholder="1"
                          className="w-full rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 font-body text-sm !text-[#051125] outline-none focus:border-[#FC8347]"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-start gap-2 text-[#94a3b8]">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <p className="font-body text-[11px] font-medium leading-snug">
                        Use the <strong className="!text-[#584237]">clear structural opening</strong>. Allow headroom and side clearance for track hardware — we confirm details on follow-up.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    {sectionRule}
                    <h2 className="font-body text-sm font-bold uppercase tracking-widest !text-[#051125]">
                      04. Site conditions &amp; specs
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                      Operating environment (select all that apply)
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {(
                        [
                          [envFreezer, setEnvFreezer, "Freezer"],
                          [envAmbient, setEnvAmbient, "Ambient"],
                          [envWind, setEnvWind, "High wind"],
                          [envTraffic, setEnvTraffic, "High traffic"],
                        ] as [boolean, Dispatch<SetStateAction<boolean>>, string][]
                      ).map(([checked, setChecked, label]) => (
                        <label
                          key={label}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#e2e8f0] bg-white p-4 transition-colors hover:border-[#FC8347]/30"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="h-4 w-4 rounded border-[#cbd5e1] text-[#FC8347] focus:ring-[#FC8347]"
                          />
                          <span className="font-body text-xs font-semibold text-[#334155]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#fed7aa]/80 bg-[#fff4ec]/50 p-5">
                      <input
                        type="checkbox"
                        checked={wantInstall}
                        onChange={(e) => setWantInstall(e.target.checked)}
                        className="mt-0.5 rounded border-[#FC8347]/40 text-[#FC8347] focus:ring-[#FC8347]"
                      />
                      <div>
                        <span className="font-headline text-sm font-bold !text-[#051125]">On-site installation</span>
                        <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-[#584237]">
                          Scoped and quoted separately where available
                        </p>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#fed7aa]/80 bg-[#fff4ec]/50 p-5">
                      <input
                        type="checkbox"
                        checked={wantUrgent}
                        onChange={(e) => setWantUrgent(e.target.checked)}
                        className="mt-0.5 rounded border-[#FC8347]/40 text-[#FC8347] focus:ring-[#FC8347]"
                      />
                      <div>
                        <span className="font-headline text-sm font-bold !text-[#051125]">Expedited timing</span>
                        <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-[#584237]">
                          Subject to stock and fabrication capacity — not guaranteed online
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="tech_notes" className="font-body text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                      Engineering / technical notes
                    </label>
                    <div className="relative">
                      <FileEdit
                        className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#cbd5e1]"
                        aria-hidden
                      />
                      <textarea
                        id="tech_notes"
                        value={techNotes}
                        onChange={(e) => setTechNotes(e.target.value)}
                        rows={5}
                        placeholder="Structural constraints, chemicals, temperature bands, access restrictions…"
                        className="min-h-[140px] w-full resize-none rounded-xl border border-[#cbd5e1] bg-white py-4 pl-12 pr-4 font-body text-sm !text-[#051125] outline-none transition focus:border-[#FC8347] focus:ring-2 focus:ring-[#FC8347]/20 placeholder:text-[#cbd5e1]"
                      />
                    </div>
                  </div>
                </section>

                <div className="flex flex-col items-center justify-between gap-6 border-t border-[#f1f5f9] pt-10 md:flex-row">
                  <button
                    type="button"
                    onClick={scrollToPrimary}
                    className="group flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#94a3b8] transition-colors hover:!text-[#051125]"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                    Back to contact
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[#FC8347] px-12 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#FC8347]/25 transition-all hover:bg-[#e6733d] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                  >
                    {isSubmitting ? "Submitting…" : "Submit for engineering review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
