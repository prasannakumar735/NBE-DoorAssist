import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Upload, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function QuoteForm({ productTitle, productId, uploadFile, submitEnquiry }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    project_type: "", door_type: productTitle || "", 
    width_mm: "", height_mm: "", quantity: 1,
    message: "", urgency: "standard", location: "",
    product_id: productId || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [drawingUrl, setDrawingUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || typeof uploadFile !== "function") return;
    setUploading(true);
    try {
      const uploadResult = await uploadFile(file);
      const uploadedUrl = typeof uploadResult === "string" ? uploadResult : uploadResult?.file_url;
      setDrawingUrl(uploadedUrl || "");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof submitEnquiry !== "function") return;
    setSubmitError("");
    setSubmitting(true);
    try {
      await submitEnquiry({
        ...form,
        width_mm: form.width_mm ? Number(form.width_mm) : undefined,
        height_mm: form.height_mm ? Number(form.height_mm) : undefined,
        quantity: Number(form.quantity),
        drawing_url: drawingUrl,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Unable to submit your quote right now. Please try again.");
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
        <h3 className="text-2xl font-bold text-white mb-2">Quote Request Received!</h3>
        <p className="text-slate-400">We'll get back to you within 24 hours with a custom quote.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand mt-0.5" />
        <div>
          <div className="font-semibold text-slate-900">Fast turnaround</div>
          <div className="text-slate-600">
            Most quotes are returned within 24 hours. Your details are used only to respond to this request.
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Full Name *</Label>
          <Input required value={form.name} onChange={e => handleChange("name", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="John Smith" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Email *</Label>
          <Input required type="email" value={form.email} onChange={e => handleChange("email", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="john@company.com" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Phone</Label>
          <Input value={form.phone} onChange={e => handleChange("phone", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="04XX XXX XXX" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Company</Label>
          <Input value={form.company} onChange={e => handleChange("company", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="Company name" />
        </div>
      </div>

      {/* Project details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Project Type</Label>
          <Select value={form.project_type} onValueChange={v => handleChange("project_type", v)}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 rounded-xl h-11 shadow-sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {["pvc_strip_curtains", "rapid_roller_doors", "warehouse", "factory", "logistics", "cold_storage", "commercial", "retail", "other"].map(t => (
                <SelectItem key={t} value={t} className="text-slate-800 focus:bg-slate-100 focus:text-slate-900 capitalize">{t.replace(/_/g, " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Location / State</Label>
          <Input value={form.location} onChange={e => handleChange("location", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="e.g. Sydney, NSW" />
        </div>
      </div>

      {/* Door specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Product / Model</Label>
          <Input value={form.door_type} onChange={e => handleChange("door_type", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="e.g. Rapid Roller 3000 or PVC strip curtains" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Width (mm)</Label>
          <Input type="number" value={form.width_mm} onChange={e => handleChange("width_mm", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="3000" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Height (mm)</Label>
          <Input type="number" value={form.height_mm} onChange={e => handleChange("height_mm", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" placeholder="4000" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Quantity</Label>
          <Input type="number" min="1" value={form.quantity} onChange={e => handleChange("quantity", e.target.value)}
            className="bg-white border-slate-200 text-slate-900 rounded-xl h-11 focus:border-brand shadow-sm" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-800 text-sm">Urgency</Label>
          <Select value={form.urgency} onValueChange={v => handleChange("urgency", v)}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 rounded-xl h-11 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="standard" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">Standard</SelectItem>
              <SelectItem value="urgent" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">Urgent</SelectItem>
              <SelectItem value="emergency" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <Label className="text-slate-800 text-sm">Upload Drawings (optional)</Label>
        <label className={`flex items-center gap-3 p-4 border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl transition-colors ${typeof uploadFile === "function" ? "cursor-pointer hover:border-brandLight" : "cursor-not-allowed opacity-70"}`}>
          <Upload className="w-5 h-5 text-slate-500" />
          <span className="text-sm text-slate-700">
            {uploading ? "Uploading..." : drawingUrl ? "File uploaded ✓" : "Click to upload drawings or plans"}
          </span>
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.dwg" disabled={typeof uploadFile !== "function"} />
        </label>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label className="text-slate-800 text-sm">Additional Details</Label>
        <Textarea value={form.message} onChange={e => handleChange("message", e.target.value)}
          className="bg-white border-slate-200 text-slate-900 rounded-xl min-h-[100px] focus:border-brand shadow-sm"
          placeholder="Tell us about your project requirements..." />
      </div>

      {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}

      <Button type="submit" disabled={submitting}
        className="w-full bg-brand hover:bg-brandDark text-white py-6 rounded-xl text-base font-bold shadow-sm">
        {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
        {submitting ? "Submitting..." : "Get My Custom Quote"}
      </Button>
    </form>
  );
}