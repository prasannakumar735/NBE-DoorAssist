import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "pvc_strip_curtains", label: "PVC Strip Curtains" },
  { value: "rapid_roller", label: "Rapid Roller" },
  { value: "high_speed", label: "High Speed" },
  { value: "insulated", label: "Insulated" },
  { value: "cold_storage", label: "Cold Storage" },
  { value: "dock_door", label: "Dock Door" },
  { value: "parts_accessories", label: "Parts & Accessories" },
];

const materials = [
  { value: "all", label: "All Materials" },
  { value: "pvc", label: "PVC" },
  { value: "aluminium", label: "Aluminium" },
  { value: "steel", label: "Steel" },
  { value: "composite", label: "Composite" },
  { value: "fabric", label: "Fabric" },
];

const stockOptions = [
  { value: "all", label: "All Stock" },
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock" },
  { value: "made_to_order", label: "Made to Order" },
];

const insulationOptions = [
  { value: "all", label: "All" },
  { value: "yes", label: "Insulated" },
  { value: "no", label: "Non-Insulated" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "title_az", label: "A → Z" },
];

function FacetGroup({ title, options, value, onChange }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">{title}</h3>
      <div className="space-y-1">
        {options.map((o) => {
          const active = (value || "all") === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-brand/10 text-brand font-semibold" : "text-ink hover:bg-surface-low"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductFilters({ filters, onFilterChange, resultCount }) {
  const activeFilters = Object.entries(filters).filter(
    ([key, val]) => val && val !== "all" && val !== "" && key !== "sort"
  );

  const labelFor = (key, val) => {
    if (key === "category") return categories.find((c) => c.value === val)?.label || val;
    if (key === "material") return materials.find((m) => m.value === val)?.label || val;
    if (key === "stock") return stockOptions.find((s) => s.value === val)?.label || val;
    if (key === "insulated") return val === "yes" ? "Insulated" : val === "no" ? "Non-insulated" : val;
    return val;
  };

  const update = (key, value) => onFilterChange({ ...filters, [key]: value });
  const clearAll = () =>
    onFilterChange({ search: "", category: "all", material: "all", stock: "all", insulated: "all", sort: "featured" });

  return (
    <aside className="space-y-6 bg-white border border-line rounded-2xl p-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <Input
          placeholder="Search doors, parts, models..."
          value={filters.search || ""}
          onChange={(e) => update("search", e.target.value)}
          className="pl-10 bg-white border-line text-ink placeholder:text-on-surface-variant h-11 rounded-xl focus:border-brand focus:ring-brand/20"
        />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">Sort by</h3>
        <Select value={filters.sort || "featured"} onValueChange={(v) => update("sort", v)}>
          <SelectTrigger className="w-full bg-white border-line text-ink h-11 rounded-xl">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-line">
            {sortOptions.map((s) => (
              <SelectItem key={s.value} value={s.value} className="text-ink focus:bg-surface-low focus:text-ink">
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-line">
          {activeFilters.map(([key, val]) => (
            <Badge key={key} className="bg-brand/10 text-brand border-brand/30 text-xs">
              {labelFor(key, val)}
              <button onClick={() => update(key, key === "search" ? "" : "all")} className="ml-1.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <button onClick={clearAll} className="text-xs text-on-surface-variant hover:text-brand ml-1">
            Clear all
          </button>
        </div>
      )}

      <FacetGroup title="Category" options={categories} value={filters.category} onChange={(v) => update("category", v)} />
      <FacetGroup title="Material" options={materials} value={filters.material} onChange={(v) => update("material", v)} />
      <FacetGroup title="Stock status" options={stockOptions} value={filters.stock} onChange={(v) => update("stock", v)} />
      <FacetGroup title="Insulation" options={insulationOptions} value={filters.insulated} onChange={(v) => update("insulated", v)} />

      <div className="pt-4 border-t border-line text-sm text-on-surface-variant">{resultCount} products</div>
    </aside>
  );
}
