import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "title_az", label: "A → Z" },
];

export default function ProductFilters({ filters, onFilterChange, resultCount }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const activeFilters = Object.entries(filters).filter(
    ([key, val]) => val && val !== "all" && val !== "" && key !== "sort"
  );

  const labelFor = (key, val) => {
    if (key === "category") return categories.find(c => c.value === val)?.label || val;
    if (key === "material") return materials.find(m => m.value === val)?.label || val;
    if (key === "insulated") return val === "yes" ? "Insulated" : val === "no" ? "Non-insulated" : val;
    return val;
  };

  const update = (key, value) => onFilterChange({ ...filters, [key]: value });
  const clearAll = () => onFilterChange({ search: "", category: "all", material: "all", insulated: "all", sort: "featured" });

  return (
    <div className="space-y-4">
      {/* Main search row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search doors, parts, models..."
            value={filters.search || ""}
            onChange={(e) => update("search", e.target.value)}
            className="pl-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl focus:border-orange-600 focus:ring-orange-600/20 shadow-sm"
          />
        </div>
        <Select value={filters.category || "all"} onValueChange={(v) => update("category", v)}>
          <SelectTrigger className="w-full md:w-56 bg-white border-slate-200 text-slate-800 h-12 rounded-xl shadow-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {categories.map(c => (
              <SelectItem key={c.value} value={c.value} className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.sort || "featured"} onValueChange={(v) => update("sort", v)}>
          <SelectTrigger className="w-full md:w-44 bg-white border-slate-200 text-slate-800 h-12 rounded-xl shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {sortOptions.map(s => (
              <SelectItem key={s.value} value={s.value} className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-12 rounded-xl shadow-sm ${showAdvanced ? 'border-orange-400 text-orange-700' : ''}`}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Select value={filters.material || "all"} onValueChange={(v) => update("material", v)}>
                <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-800 rounded-lg">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {materials.map(m => (
                    <SelectItem key={m.value} value={m.value} className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.insulated || "all"} onValueChange={(v) => update("insulated", v)}>
                <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-800 rounded-lg">
                  <SelectValue placeholder="Insulation" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="all" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">All</SelectItem>
                  <SelectItem value="yes" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">Insulated</SelectItem>
                  <SelectItem value="no" className="text-slate-800 focus:bg-slate-100 focus:text-slate-900">Non-Insulated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters + count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {activeFilters.map(([key, val]) => (
            <Badge key={key} className="bg-orange-500/10 text-orange-700 border-orange-500/30 text-xs">
              {key}: {labelFor(key, val)}
              <button onClick={() => update(key, key === "search" ? "" : "all")} className="ml-1.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <button onClick={clearAll} className="text-xs text-slate-600 hover:text-orange-700 ml-2">
              Clear all
            </button>
          )}
        </div>
        <span className="text-sm text-slate-600">{resultCount} products</span>
      </div>
    </div>
  );
}