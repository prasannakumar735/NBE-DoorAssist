export type ProductCategoryFilter = "All" | "Rapid" | "High Speed" | "Insulated" | "Accessories";

export function normalizeProductCategoryLabel(category: string): ProductCategoryFilter {
  const value = category.toLowerCase();
  if (value.includes("accessor") || value.includes("part")) {
    return "Accessories";
  }
  if (value.includes("insulated") || value.includes("cold")) {
    return "Insulated";
  }
  if (value.includes("high speed") || value.includes("high-speed")) {
    return "High Speed";
  }
  return "Rapid";
}
