"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import Button from "@/src/components/ui/Button";
import { getSupabaseClient } from "@/src/lib/supabase";

type ProductPreview = {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  category: string;
};

type EnquiryForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  project_type: string;
  width_mm: string;
  height_mm: string;
  quantity: string;
  location: string;
  urgency: string;
  message: string;
};

const DEFAULT_FORM: EnquiryForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  project_type: "warehouse",
  width_mm: "",
  height_mm: "",
  quantity: "1",
  location: "",
  urgency: "standard",
  message: "",
};

export default function EnquiryPage() {
  const [productSlug, setProductSlug] = useState("");

  const [product, setProduct] = useState<ProductPreview | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productError, setProductError] = useState("");

  const [formData, setFormData] = useState<EnquiryForm>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProductSlug(params.get("product") ?? "");
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productSlug) {
        setProduct(null);
        setProductError("");
        return;
      }

      if (!supabase) {
        setProduct(null);
        setProductError("Supabase is not configured.");
        return;
      }

      setLoadingProduct(true);
      setProductError("");

      const { data, error } = await supabase
        .from("products")
        .select("id,slug,title,image_url,category")
        .eq("slug", productSlug)
        .limit(1)
        .maybeSingle();

      if (error) {
        setProduct(null);
        setProductError(error.message);
      } else if (!data) {
        setProduct(null);
        setProductError("Product not found for this enquiry.");
      } else {
        setProduct(data as ProductPreview);
      }

      setLoadingProduct(false);
    };

    void loadProduct();
  }, [productSlug, supabase]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setSubmitError("Supabase is not configured.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || null,
      company: formData.company.trim() || null,
      project_type: formData.project_type,
      width_mm: formData.width_mm ? Number(formData.width_mm) : null,
      height_mm: formData.height_mm ? Number(formData.height_mm) : null,
      quantity: formData.quantity ? Number(formData.quantity) : 1,
      location: formData.location.trim() || null,
      urgency: formData.urgency,
      message: formData.message.trim() || null,
      product_id: product?.id ?? null,
      slug: product?.slug ?? (productSlug || null),
      status: "new",
    };

    const { error } = await supabase.from("enquiries").insert(payload);

    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitMessage("Thanks — your enquiry has been submitted successfully.");
      setFormData(DEFAULT_FORM);
    }

    setSubmitting(false);
  };

  const fieldClass =
    "w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-[1440px] space-y-8 px-8">
        <header>
          <p className="font-label text-secondary mb-2">Product Enquiry</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-text-primary">Request a Quote</h1>
          <p className="text-text-muted mt-3 max-w-2xl">
            Submit your project requirements and our team will respond with tailored recommendations and lead times.
          </p>
        </header>

        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-6">
          {loadingProduct ? (
            <div className="animate-pulse space-y-3">
              <div className="h-44 bg-surface-container-high rounded-lg" />
              <div className="h-6 bg-surface-container-high rounded w-2/3" />
              <div className="h-4 bg-surface-container-high rounded w-1/3" />
            </div>
          ) : product ? (
            <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
              <div className="relative h-44 md:h-52 rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-low">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-label text-secondary">Selected Product</p>
                <h2 className="text-2xl font-headline font-semibold text-text-primary mt-2">{product.title}</h2>
                <p className="text-text-muted mt-2">Category: {product.category}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low p-5">
              <p className="text-text-primary font-medium">No product selected.</p>
              <p className="text-sm text-text-muted mt-1">
                Use links like /enquiry?product=your-product-slug to attach a specific product.
              </p>
              {productError ? <p className="text-sm text-red-600 mt-3">{productError}</p> : null}
            </div>
          )}
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-text-muted mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="04xx xxx xxx"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm text-text-muted mb-2">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Company Pty Ltd"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="project_type" className="block text-sm text-text-muted mb-2">
                  Project Type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="warehouse">warehouse</option>
                  <option value="factory">factory</option>
                  <option value="logistics">logistics</option>
                  <option value="cold_storage">cold_storage</option>
                  <option value="commercial">commercial</option>
                  <option value="retail">retail</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm text-text-muted mb-2">
                  Location (state)
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="NSW"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="width_mm" className="block text-sm text-text-muted mb-2">
                  Width (mm)
                </label>
                <input
                  id="width_mm"
                  name="width_mm"
                  type="number"
                  value={formData.width_mm}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="height_mm" className="block text-sm text-text-muted mb-2">
                  Height (mm)
                </label>
                <input
                  id="height_mm"
                  name="height_mm"
                  type="number"
                  value={formData.height_mm}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm text-text-muted mb-2">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="urgency" className="block text-sm text-text-muted mb-2">
                  Urgency
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="standard">standard</option>
                  <option value="urgent">urgent</option>
                  <option value="emergency">emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Tell us about your project requirements"
              />
            </div>

            {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
            {submitMessage ? <p className="text-sm text-emerald-700">{submitMessage}</p> : null}

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full text-sm disabled:cursor-not-allowed md:w-auto"
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
