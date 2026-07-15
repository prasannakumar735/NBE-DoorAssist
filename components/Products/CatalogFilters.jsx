import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SECTORS = [
  { value: "all", label: "All sectors" },
  { value: "pharma", label: "Pharma, hygiene & cleanroom" },
  { value: "logistics", label: "Logistics & warehousing" },
  { value: "cold_chain", label: "Cold chain" },
  { value: "manufacturing", label: "Manufacturing & processing" },
  { value: "retail", label: "Retail & food service" },
];

const PERFORMANCE = [
  { value: "all", label: "All performance levels" },
  { value: "high_cycle", label: "High-cycle / rapid" },
  { value: "climate", label: "Climate control & insulation" },
  { value: "standard", label: "Standard industrial" },
  { value: "dock", label: "Loading dock & logistics" },
];

/**
 * Catalog-style filter row: Sector + Performance + optional “more filters”.
 */
export default function CatalogFilters({ filters, onFilterChange, onOpenMoreFilters, resultCount }) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
        <div className="flex-1 space-y-2 min-w-0">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Sector</label>
          <Select value={filters.sector || "all"} onValueChange={(v) => update("sector", v)}>
            <SelectTrigger className="h-12 rounded-lg border-slate-200 bg-white text-neutral-900 font-medium shadow-sm">
              <SelectValue placeholder="e.g. Pharma, Logistics, Cold Chain" />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((s) => (
                <SelectItem key={s.value} value={s.value} className="text-neutral-900">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Performance level</label>
          <Select value={filters.performance || "all"} onValueChange={(v) => update("performance", v)}>
            <SelectTrigger className="h-12 rounded-lg border-slate-200 bg-white text-neutral-900 font-medium shadow-sm">
              <SelectValue placeholder="Select options…" />
            </SelectTrigger>
            <SelectContent>
              {PERFORMANCE.map((p) => (
                <SelectItem key={p.value} value={p.value} className="text-neutral-900">
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 shrink-0 pb-0.5">
          <Button
            type="button"
            variant="outline"
            onClick={onOpenMoreFilters}
            className="h-12 px-6 rounded-lg border-slate-300 text-neutral-800 hover:bg-slate-50 font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <p className="text-sm text-neutral-600">
        <span className="font-semibold text-neutral-900 tabular-nums">{resultCount}</span>{" "}
        {resultCount === 1 ? "product" : "products"} shown
      </p>
    </div>
  );
}
