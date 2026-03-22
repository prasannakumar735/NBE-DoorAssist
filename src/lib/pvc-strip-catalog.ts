/** Static catalog for PVC strip curtains subsite — UI only */

export type PvcIndustryId = "retail" | "food" | "cold-room";

export interface PvcProduct {
  slug: string;
  name: string;
  industries: PvcIndustryId[];
  teaser: string;
  intro: string;
  measureGuide: string;
  colorGuide: string;
  colorByIndustry?: Partial<Record<PvcIndustryId, string>>;
  stripWidth: string;
  stripSurface: string;
  temperatureGuide: string;
  stripHead: string;
  delivery: string;
  gallery: string[];
}

export const PVC_INDUSTRIES: { id: PvcIndustryId; label: string; description: string }[] = [
  { id: "retail", label: "Retail", description: "Shopfronts, back-of-house, and customer-facing chill zones." },
  { id: "food", label: "Food industry", description: "Processing, packaging, and HACCP-aligned openings." },
  { id: "cold-room", label: "Cold room", description: "Cool rooms, freezers, and distribution chillers." },
];

export const BULK_INDUSTRIES = [
  "Retail & supermarkets",
  "Food & beverage manufacturing",
  "Pharmaceutical storage",
  "Cold chain logistics",
  "Agricultural packing sheds",
  "Industrial warehousing",
];

export const PVC_PRODUCTS: PvcProduct[] = [
  {
    slug: "polar-pvc-strip-curtain",
    name: "Polar PVC strip curtain",
    industries: ["retail", "food", "cold-room"],
    teaser: "Low-temperature flexible strips for cold rooms and chillers.",
    intro:
      "Polar-grade PVC remains flexible at sub-zero temperatures, reducing cracking and maintaining a clear traffic path for trolleys and pallet jacks. Strips are cut to height and overlapped to balance visibility with thermal performance.",
    measureGuide:
      "Measure the clear opening width and height in millimetres. Allow extra width for overlap (typically 20–30% of strip width) and check headroom for hanging hardware. For traffic taller than pallets, extend strip length to floor contact or use a hybrid with a fast-acting door above.",
    colorGuide:
      "Clear strips maximise light and visibility in retail and inspection areas. Blue tints are common in food production for contrast against product. Ribbed frosted options diffuse light and mask scuffing in high-traffic aisles.",
    colorByIndustry: {
      retail: "Clear and lightly tinted strips keep displays visible; frosted ribbed faces reduce glare on polished floors.",
      food: "Blue and contrasting tints help operators spot strips in hygiene zones; confirm cleaning compatibility with your chemical program.",
      "cold-room": "Polar clear remains flexible at chill thresholds; opaque options reduce ice bloom on the strip face in freezer approaches.",
    },
    stripWidth:
      "Wider strips suit larger openings and heavier traffic; narrower strips flex more easily and reduce weight on hardware. Selection depends on opening size, wind pressure from forklifts, and desired overlap.",
    stripSurface:
      "Ribbed faces hide scratches and improve durability in pallet impact zones. Standard smooth faces are economical and easy to clean in light-traffic openings.",
    temperatureGuide:
      "Standard flexible PVC suits ambient to moderate chill. Polar grades are specified for freezer thresholds; confirm continuous operating temperature with your process team.",
    stripHead:
      "Galvanised steel rails suit most wet and wash-down areas. Stainless hardware is used where corrosion or food-grade finish is required.",
    delivery:
      "Cut-to-length kits typically ship within agreed lead times after sign-off on measurements and colour. Bulk rolls are scheduled separately.",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    ],
  },
  {
    slug: "welded-rack-strip-door",
    name: "Welded rack strip door",
    industries: ["food", "cold-room"],
    teaser: "Pre-assembled hook-on strips for fast installation on standard rails.",
    intro:
      "Hook-on systems speed up replacement and alignment. Welded racks maintain strip spacing and reduce tangling in busy forklift lanes.",
    measureGuide:
      "Confirm rail length matches opening width including mounting brackets. Height is the sum of strip lengths plus rack; verify side clearance for mast lift equipment.",
    colorGuide:
      "Match facility zoning: clear for general traffic, coloured for restricted hygiene zones.",
    stripWidth:
      "200–400 mm widths are common for industrial openings; combine with overlap percentage from site assessment.",
    stripSurface:
      "Ribbed recommended for fork traffic; smooth for pedestrian-only doors.",
    temperatureGuide:
      "Match strip compound to the coldest surface temperature the curtain will see, not only ambient air.",
    stripHead:
      "Steel rack with hot-dip galvanising for durability; stainless option for food plants.",
    delivery:
      "Kit form with hardware schedule; express options subject to stock.",
    gallery: ["https://images.unsplash.com/photo-1585534321671-e4c8cc1f9aa1?w=1200&q=80"],
  },
  {
    slug: "pvc-swing-doors",
    name: "PVC swing doors",
    industries: ["retail", "food", "cold-room"],
    teaser: "Double-acting flexible PVC swing doors for warehouses, retail back-of-house, and wash-down openings.",
    intro:
      "High-impact, double-acting swing doors for busy industrial openings. Clear PVC leaves and robust frames support two-way traffic; spring-assisted hardware can be specified for predictable return — confirm duty, pressure, and cleaning regime on quote.",
    measureGuide:
      "Measure clear opening width and height in millimetres. Note frame reveal, architrave, and floor level across the threshold. Flag differential air pressure, traffic type, and any kick-plate or buffer requirements for hinge and spring selection.",
    colorGuide:
      "Clear PVC maximises sight lines; blue, red, and grey tints are common for zoning and contrast. Final colour and grade follow your facility rules and quote pack.",
    stripWidth:
      "Leaf width and overlap are resolved on shop drawings from the measured opening and frame type — not a one-size catalogue line.",
    stripSurface:
      "Smooth clear faces are standard; optional ribbed bands or protective buffers at kick height suit fork and pallet zones.",
    temperatureGuide:
      "PVC grades are matched to the coldest surface the leaf sees and to cleaning chemistry in food-adjacent areas — confirm on enquiry.",
    stripHead:
      "Galvanised or stainless steel frames with pivot sets and spring hardware as specified; powder-coated finishes available for wet and wash-down areas by arrangement.",
    delivery:
      "Made-to-measure leaves and frames are released after sign-off on dimensions, hardware schedule, and finish.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmFShMB6Z2IOwbNcvzyoD3nqBhJceFhGX1ttQ06dgWg76MO8WfQbdrxQeWgWpI4_tOJymj9z_eGvpLmplCgDXti3SCzyGIK87VHMiJWzKC9eiJF18IpuIGxCdAVcVjzL2YpkOUnEQtGnCZIPzvZo7Wcf0ciFcfmqvYq2RKPetwdhSniGpRAdHrsa7UZkhxrKkNsop-lIhFjUo_eM1rLsjneLXzInZa6kmmw5sfUNgJV757MUZb4MWbdTZ3yMBT04xldb1jp9ULMns",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3u9RXV7AiQ77RfLxQaa3vdXPNF-eA4Ws2S3a0zUYVA4-ArRVx7p4wjS4LZdswKBGYwW_yL9Q7mmSqWW4WR_EqW4NMJrVdN1uqo5wPu16hdYMkPwWM4Z8lQouGO4qoREpmViNleiOvHv1CYJ-dW5LR0YGUMqqLt12QaTDnQ29OCqr1Fz9yDHuVMBWfqUn2_jzvX7wP5iP1RrhzDfBjNf2zT74Hdct31tQGqVKqWcajU-aT5R9Y07yBxPnRCrz5zKRps3NaieRNvbQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3CTy7QtWtLLyduBXXpx5IeF1wR__LmGmrUDYHgEWQoJY-RIsUi6XYPDzw5OWINDF2s5KCXEDeCLHcti9PMV_ERb-TaY5Dpy4Nqqjr97vKPG2W7AptqCNJLVbrEv6JArZihZu1mF3Z-eFW3p9WPbbOqnlP02KTPiV5fCY5sbvqWmnA6pssY6m7-UnFDJn7xr5K_KulJWKWiG-7PqC4vqn5Gn7c0Hgg7cmqM2z98wEhthr76vZ4UbLm1_y-nmDtHEUVEjY-2_WbelI",
    ],
  },
];

export function getPvcProduct(slug: string): PvcProduct | undefined {
  return PVC_PRODUCTS.find((p) => p.slug === slug);
}

export function getPvcProductsByIndustry(industry: PvcIndustryId): PvcProduct[] {
  return PVC_PRODUCTS.filter((p) => p.industries.includes(industry));
}
