"use client";

import { Building2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useState, type FormEvent } from "react";

const PRODUCT_INTEREST_OPTIONS = [
  { value: "rapid_roller", label: "Rapid roller doors", facility_type: "warehouse" },
  { value: "high_speed", label: "High speed / cold storage", facility_type: "cold_storage" },
  { value: "insulated", label: "Insulated systems", facility_type: "manufacturing" },
  { value: "accessories", label: "Parts & accessories", facility_type: "distribution" },
  { value: "general", label: "General enquiry", facility_type: "other" },
] as const;

/** Defaults satisfy /api/quote required numeric fields without exposing pricing UI */
const DEFAULT_OPENING_WIDTH = "3000";
const DEFAULT_OPENING_HEIGHT = "3000";
const DEFAULT_QUANTITY = "1";

const fieldClass =
  "w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3.5 pl-11 text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-[#FC8347] focus:outline-none focus:ring-2 focus:ring-[#FC8347]";

export default function QuoteEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [productInterest, setProductInterest] = useState<string>(PRODUCT_INTEREST_OPTIONS[0].value);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const interest = PRODUCT_INTEREST_OPTIONS.find((o) => o.value === productInterest);
    const facilityType = interest?.facility_type ?? "warehouse";
    const interestLabel = interest?.label ?? "General enquiry";
    const notes = `Product interest: ${interestLabel}\n\n${message.trim()}`;

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
          opening_width: DEFAULT_OPENING_WIDTH,
          opening_height: DEFAULT_OPENING_HEIGHT,
          quantity: DEFAULT_QUANTITY,
          material: "aluminum",
          insulation: "no",
          notes,
          files: [],
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error || "Failed to submit");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you — your enquiry has been received. We’ll respond shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setProductInterest(PRODUCT_INTEREST_OPTIONS[0].value);
      setMessage("");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-outline-variant/25 bg-surface-container-low/80">
        <div className="mx-auto max-w-[720px] px-8 py-16 text-center md:py-20">
          <span className="font-label mb-4 block text-[#FC8347]">Get in touch</span>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Submit an enquiry
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-body text-lg text-text-muted">
            Share your project details — we&apos;ll follow up with tailored options. Request a quote below.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-8 py-14 md:py-20">
        <div className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-8 shadow-sm md:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {submitStatus === "success" ? (
              <div
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900"
                role="status"
              >
                {submitMessage}
              </div>
            ) : null}
            {submitStatus === "error" ? (
              <div
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-900"
                role="alert"
              >
                {submitMessage}
              </div>
            ) : null}

            <div className="space-y-6">
              <div>
                <label htmlFor="quote-name" className="mb-2 block text-sm font-medium text-text-primary">
                  Name
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#FC8347]"
                    aria-hidden
                  />
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-email" className="mb-2 block text-sm font-medium text-text-primary">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#FC8347]"
                    aria-hidden
                  />
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-phone" className="mb-2 block text-sm font-medium text-text-primary">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#FC8347]"
                    aria-hidden
                  />
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="04xx xxx xxx"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-company" className="mb-2 block text-sm font-medium text-text-primary">
                  Company
                </label>
                <div className="relative">
                  <Building2
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#FC8347]"
                    aria-hidden
                  />
                  <input
                    id="quote-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name (optional)"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-interest" className="mb-2 block text-sm font-medium text-text-primary">
                  Product interest
                </label>
                <select
                  id="quote-interest"
                  name="product_interest"
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-[#FC8347] focus:outline-none focus:ring-2 focus:ring-[#FC8347]"
                >
                  {PRODUCT_INTEREST_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quote-message" className="mb-2 block text-sm font-medium text-text-primary">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare
                    className="pointer-events-none absolute left-3.5 top-3.5 h-[18px] w-[18px] text-[#FC8347]"
                    aria-hidden
                  />
                  <textarea
                    id="quote-message"
                    name="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, timelines, and site requirements…"
                    className={`${fieldClass} min-h-[160px] resize-y py-3.5 pl-11 pt-3.5`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#FC8347] px-6 py-4 text-base font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit Enquiry"}
            </button>

            <p className="text-center text-xs text-text-muted">
              We&apos;ll review your enquiry and respond within business hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
