/** Static local application → recommended-category mapping for the home Product Finder.
 *  Reusable shape: swap FINDER_OPTIONS/recommendations for a data-driven or API-backed
 *  source later without changing the ProductFinder component. */

export const FINDER_OPTIONS = [
  {
    id: "vehicle_access",
    label: "Frequent Vehicle Access",
    recommendations: [
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
    ],
  },
  {
    id: "temperature_separation",
    label: "Temperature Separation",
    recommendations: [
      { categoryId: "pvc_strip_curtains", name: "PVC Strip Curtains" },
      { categoryId: "cold_storage", name: "Cold Storage Rapid Roller Doors" },
    ],
  },
  {
    id: "cool_room_freezer",
    label: "Cool Room or Freezer Access",
    recommendations: [
      { categoryId: "pvc_strip_curtains", name: "Coolroom PVC Strip Curtains" },
      { categoryId: "cold_storage", name: "Cold Storage Rapid Roller Doors" },
    ],
  },
  {
    id: "warehouse_separation",
    label: "Warehouse Separation",
    recommendations: [
      { categoryId: "pvc_strip_curtains", name: "Standard PVC Strip Curtains" },
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
    ],
  },
  {
    id: "food_processing",
    label: "Food Processing Area",
    recommendations: [
      { categoryId: "pvc_strip_curtains", name: "Anti-Insect PVC Strip Curtains" },
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
    ],
  },
  {
    id: "dust_pest_control",
    label: "Dust or Pest Control",
    recommendations: [
      { categoryId: "pvc_strip_curtains", name: "PVC Strip Curtains" },
    ],
  },
  {
    id: "unsure",
    label: "Unsure / Need Advice",
    recommendations: [
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
      { categoryId: "pvc_strip_curtains", name: "PVC Strip Curtains" },
    ],
  },
];
