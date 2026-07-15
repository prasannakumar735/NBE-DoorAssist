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

/** Where will the rapid door be used? Recommendations map to product categories
 *  that exist in the catalogue data — no invented categories. */
export const RAPID_DOOR_APPLICATION_OPTIONS = [
  {
    id: "internal_access",
    label: "Internal Access",
    recommendations: [{ categoryId: "rapid_roller", name: "Rapid Roller Doors" }],
  },
  {
    id: "external_access",
    label: "External Access",
    recommendations: [
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
      { categoryId: "high_speed", name: "High Speed Doors" },
    ],
  },
  {
    id: "food_processing",
    label: "Food Processing",
    recommendations: [
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
      { categoryId: "insulated", name: "Insulated Doors" },
    ],
  },
  {
    id: "cold_storage",
    label: "Cold Storage",
    recommendations: [
      { categoryId: "cold_storage", name: "Cold Storage Doors" },
      { categoryId: "insulated", name: "Insulated Doors" },
    ],
  },
  {
    id: "high_traffic",
    label: "High Traffic Area",
    recommendations: [
      { categoryId: "high_speed", name: "High Speed Doors" },
      { categoryId: "dock_door", name: "Dock Equipment" },
    ],
  },
  {
    id: "not_sure",
    label: "Not Sure",
    recommendations: [
      { categoryId: "rapid_roller", name: "Rapid Roller Doors" },
      { categoryId: "high_speed", name: "High Speed Doors" },
      { categoryId: "cold_storage", name: "Cold Storage Doors" },
    ],
  },
];

/** What type of traffic uses the opening — refines the rapid door recommendation. */
export const RAPID_DOOR_TRAFFIC_OPTIONS = [
  { id: "pedestrian", label: "Pedestrian" },
  { id: "trolley", label: "Trolley" },
  { id: "forklift", label: "Forklift" },
  { id: "vehicle", label: "Vehicle" },
  { id: "mixed", label: "Mixed Traffic" },
];

/** Where will the PVC curtain be used? There is only one PVC category in the
 *  catalogue, so recommendations use a keyword filter against real product
 *  titles/descriptions (via the Products page "q" search param) rather than
 *  inventing sub-categories that don't exist in the data. */
export const PVC_APPLICATION_OPTIONS = [
  {
    id: "warehouse",
    label: "Warehouse",
    recommendations: [{ query: "ribbed", name: "Heavy Duty / Forklift PVC" }],
  },
  {
    id: "cool_room",
    label: "Cool Room",
    recommendations: [{ query: "freezer", name: "Freezer Grade PVC" }],
  },
  {
    id: "freezer",
    label: "Freezer",
    recommendations: [{ query: "freezer", name: "Freezer Grade PVC" }],
  },
  {
    id: "food_processing",
    label: "Food Processing",
    recommendations: [{ query: "insect", name: "Anti-Insect PVC" }],
  },
  {
    id: "workshop",
    label: "Workshop",
    recommendations: [{ query: "ribbed", name: "Heavy Duty / Forklift PVC" }],
  },
  {
    id: "replacement",
    label: "Existing Curtain Replacement",
    recommendations: [{ query: "replacement", name: "Replacement PVC Strips" }],
  },
];

/** What uses the opening — refines the PVC recommendation. */
export const PVC_TRAFFIC_OPTIONS = [
  { id: "pedestrian", label: "Pedestrian" },
  { id: "trolley", label: "Trolley" },
  { id: "forklift", label: "Forklift" },
  { id: "mixed", label: "Mixed Traffic" },
];

/** What do you need — complete curtain vs replacement strips. */
export const PVC_REQUIREMENT_OPTIONS = [
  { id: "complete", label: "Complete Curtain", recommendations: [{ query: "", name: "PVC Strip Curtain Kits" }] },
  { id: "replacement", label: "Replacement Strips", recommendations: [{ query: "replacement", name: "Replacement PVC Strips" }] },
  { id: "not_sure", label: "Not Sure", recommendations: [{ query: "", name: "PVC Strip Curtain Kits" }] },
];
