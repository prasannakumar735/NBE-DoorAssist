import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, Upload, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { submitQuoteRequest } from "@/api/leadsClient";

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024; // keep mail-server-friendly

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Reusable trade-quote lead form. `prefill` seeds the fields (e.g. from a
 * product card or the custom curtain builder) and `context` is appended to
 * the message so the sales team sees exactly what the customer was looking at.
 */
export default function QuoteForm({ prefill = {}, context = "", onSubmitted, allowAttachment = true }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    item: prefill.item || "",
    message: prefill.message || "",
    ...prefill,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachError, setAttachError] = useState("");

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    setAttachError("");
    if (!file) {
      setAttachment(null);
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setAttachError("File is too large (max 4MB). Please email it to us directly instead.");
      setAttachment(null);
      return;
    }
    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      let attachmentPayload = null;
      if (attachment) {
        attachmentPayload = {
          filename: attachment.name,
          type: attachment.type || "application/octet-stream",
          base64: await fileToBase64(attachment),
        };
      }
      await submitQuoteRequest({
        ...form,
        context,
        attachment: attachmentPayload,
      });
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      setSubmitError("Unable to submit your quote right now. Please try again, or email support@drooov.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-ink mb-2">Quote request received</h3>
        <p className="text-on-surface-variant">We'll get back to you by email within 24 hours with pricing.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-line bg-surface-low px-4 py-3 text-sm text-on-surface flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold text-ink">No prices are published on this site</div>
          <div className="text-on-surface-variant">
            Every job is quoted based on strip type, hardware and delivery zone. Send us your details and we'll
            reply by email — most quotes go out within 24 hours.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-ink text-sm">Full name *</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-white border-line text-ink rounded-lg h-11 focus:border-brand shadow-sm"
            placeholder="John Smith"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-ink text-sm">Email *</Label>
          <Input
            required
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-white border-line text-ink rounded-lg h-11 focus:border-brand shadow-sm"
            placeholder="john@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-ink text-sm">Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-white border-line text-ink rounded-lg h-11 focus:border-brand shadow-sm"
            placeholder="04XX XXX XXX"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-ink text-sm">Business (optional)</Label>
          <Input
            value={form.business}
            onChange={(e) => handleChange("business", e.target.value)}
            className="bg-white border-line text-ink rounded-lg h-11 focus:border-brand shadow-sm"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-ink text-sm">What are you after?</Label>
        <Input
          value={form.item}
          onChange={(e) => handleChange("item", e.target.value)}
          className="bg-white border-line text-ink rounded-lg h-11 focus:border-brand shadow-sm"
          placeholder="e.g. Cold room kit, 1200 x 2200mm, freezer grade"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-ink text-sm">Details</Label>
        <Textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="bg-white border-line text-ink rounded-lg min-h-[100px] focus:border-brand shadow-sm"
          placeholder="Tell us about the opening, site access, and timing..."
        />
      </div>

      {allowAttachment && (
        <div className="space-y-2">
          <Label className="text-ink text-sm">Attach a photo or drawing (optional)</Label>
          <label className="flex items-center gap-3 p-4 border-2 border-dashed border-line bg-surface-low rounded-lg cursor-pointer hover:border-brand/60 transition-colors">
            <Upload className="w-5 h-5 text-on-surface-variant" />
            <span className="text-sm text-on-surface">
              {attachment ? `${attachment.name} ✓` : "Click to attach a file"}
            </span>
            <input type="file" className="hidden" onChange={handleFileSelect} accept=".pdf,.png,.jpg,.jpeg" />
          </label>
          {attachError && <p className="text-xs text-red-600">{attachError}</p>}
        </div>
      )}

      {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand hover:bg-brandDark text-white py-6 rounded-lg text-base font-bold shadow-sm"
      >
        {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
        {submitting ? "Submitting..." : "Request my quote"}
      </Button>
    </form>
  );
}
