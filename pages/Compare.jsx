import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Reveal, SectionLabel } from "@/components/premium/Motion";
import { defaultCategoryLabels } from "@/components/Products/ProductCard";

const RAPID_DOOR_ATTRIBUTES = [
  { key: "category", label: "Category", get: (p) => defaultCategoryLabels[p.category] || p.category },
  { key: "opening_size", label: "Opening Size", get: (p) => (p.width_mm && p.height_mm ? `${p.width_mm}×${p.height_mm}mm` : null) },
  { key: "rated_speed", label: "Opening Speed", get: (p) => p.rated_speed },
  { key: "material", label: "Material", get: (p) => p.material },
  { key: "insulated", label: "Insulation", get: (p) => (p.insulated === undefined ? null : p.insulated ? "Insulated" : "Non-insulated") },
  { key: "motor_type", label: "Motor", get: (p) => p.motor_type },
  { key: "custom_sizes", label: "Custom Sizes", get: (p) => (p.custom_sizes_available ? "Available" : null) },
  { key: "lead_time", label: "Lead Time", get: (p) => (p.lead_time_days ? `${p.lead_time_days} business days` : null) },
];

const PVC_ATTRIBUTES = [
  { key: "strip_width", label: "Strip Width", get: (p) => (p.width_mm ? `${p.width_mm}mm` : null) },
  { key: "size", label: "Kit Size", get: (p) => (p.width_mm && p.height_mm ? `${p.width_mm}×${p.height_mm}mm` : null) },
  { key: "material", label: "Material", get: (p) => p.material },
  { key: "price", label: "Price Guide", get: (p) => (p.price ? (p.price_type === "contact" ? "Contact for pricing" : `${p.price_type === "from" ? "From " : ""}$${p.price.toLocaleString("en-AU")}`) : null) },
  { key: "is_part", label: "Type", get: (p) => (p.is_part ? "Part / Accessory" : "Complete Kit") },
];

function familyOf(product) {
  return product.category === "pvc_strip_curtains" ? "pvc" : "rapid-door";
}

export default function Compare() {
  const [params, setParams] = useSearchParams();
  const family = params.get("family");
  const preselectId = params.get("product") || "";

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const rapidDoorProducts = allProducts.filter((p) => familyOf(p) === "rapid-door");
  const pvcProducts = allProducts.filter((p) => familyOf(p) === "pvc");

  const familyProducts = family === "pvc" ? pvcProducts : family === "rapid-door" ? rapidDoorProducts : null;
  const attributes = family === "pvc" ? PVC_ATTRIBUTES : RAPID_DOOR_ATTRIBUTES;

  const initialSelection = useMemo(() => {
    if (!familyProducts) return [];
    const pre = familyProducts.find((p) => p.id === preselectId);
    const rest = familyProducts.filter((p) => p.id !== preselectId).slice(0, pre ? 2 : 3);
    return (pre ? [pre] : []).concat(rest);
  }, [familyProducts, preselectId]);

  const [selectedIds, setSelectedIds] = useState(() => initialSelection.map((p) => p.id));
  const selectedProducts = familyProducts
    ? familyProducts.filter((p) => selectedIds.includes(p.id))
    : [];

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const chooseFamily = (f) => setParams({ family: f });

  if (isLoading) {
    return (
      <div className="bg-paper min-h-screen pt-28 pb-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (!family) {
    return (
      <div className="bg-paper min-h-screen pt-28 pb-24">
        <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <SectionLabel>Comparison</SectionLabel>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight">Compare products</h1>
            <p className="mt-4 max-w-xl text-muted text-lg font-light">
              Rapid roller doors and PVC strip curtains are different product families — choose which one you'd
              like to compare.
            </p>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 gap-6 max-w-2xl">
            <button
              type="button"
              onClick={() => chooseFamily("rapid-door")}
              className="p-8 text-left border border-line hover:border-ink transition-colors"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">Rapid Roller Doors</h2>
              <p className="mt-2 text-muted text-sm">{rapidDoorProducts.length} products available to compare</p>
            </button>
            <button
              type="button"
              onClick={() => chooseFamily("pvc")}
              className="p-8 text-left border border-line hover:border-ink transition-colors"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight">PVC Strip Curtains</h2>
              <p className="mt-2 text-muted text-sm">{pvcProducts.length} products available to compare</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Comparison</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight">
            Compare {family === "pvc" ? "PVC strip curtains" : "rapid roller doors"}
          </h1>
          <p className="mt-4 max-w-xl text-muted text-lg font-light">
            Side-by-side specification comparison using verified product data. Select up to 4 products.
          </p>
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={() => setParams({})}
              className="text-sm font-display font-semibold tracking-[0.1em] uppercase text-muted hover:text-ink"
            >
              ← Choose a different product family
            </button>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {familyProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleProduct(p.id)}
              aria-pressed={selectedIds.includes(p.id)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                selectedIds.includes(p.id) ? "bg-ink text-white border-ink" : "border-line hover:border-ink/40"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {selectedProducts.length === 0 ? (
          <p className="mt-14 text-muted">Select at least one product above to compare.</p>
        ) : (
          <div className="mt-10 overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead className="sticky top-20 z-20 bg-white border-b border-line shadow-sm">
                <tr>
                  <th className="p-4 md:p-5 font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-muted w-40">
                    Spec
                  </th>
                  {selectedProducts.map((p) => (
                    <th key={p.id} className="p-4 md:p-5 font-display text-sm font-bold tracking-tight">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => {
                  const values = selectedProducts.map((p) => attr.get(p));
                  if (values.every((v) => !v)) return null;
                  return (
                    <tr key={attr.key} className="border-t border-line hover:bg-mist/50 transition-colors">
                      <th className="p-4 md:p-5 font-display text-xs font-semibold tracking-[0.08em] uppercase text-muted sticky left-0 bg-white">
                        {attr.label}
                      </th>
                      {selectedProducts.map((p, i) => (
                        <td key={p.id} className="p-4 md:p-5 text-sm text-ink/80 capitalize">
                          {values[i] || "—"}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to={`/quote-builder?family=${family}`}
            className="px-8 py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-brand transition-colors"
          >
            Request Quote
          </Link>
          <Link
            to={family === "pvc" ? "/pvc-strip-curtains" : "/rapid-roller-doors"}
            className="px-8 py-4 border border-line font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
          >
            Browse catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
