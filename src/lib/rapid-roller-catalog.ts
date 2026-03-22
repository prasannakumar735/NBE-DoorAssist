/** Static catalog for Rapid Roller subsite — UI only; not Supabase-backed */

export type RapidFamilyId = "rapid-roller" | "pvc-swing" | "freezer" | "sectional";

export interface RapidProduct {
  slug: string;
  /** When set, links point here instead of `/rapid-roller-doors/[slug]` (e.g. PVC swing lives under PVC strip curtains). */
  detailPath?: string;
  family: RapidFamilyId;
  name: string;
  cardTeaser: string;
  /** Long-form intro (multiple paragraphs) */
  intro: string;
  specs: { label: string; value: string }[];
  features: { title: string; description: string }[];
  controlOptions: string;
  curtainColors: string[];
  /** Image URLs (placeholders + unsplash) */
  gallery: string[];
}

export const RAPID_FAMILIES: {
  id: RapidFamilyId;
  label: string;
  description: string;
}[] = [
  {
    id: "rapid-roller",
    label: "Rapid roller doors",
    description: "High-cycle fabric and steel-curtain doors for warehouses, docks, and logistics hubs.",
  },
  {
    id: "pvc-swing",
    label: "PVC swing doors",
    description: "Lightweight traffic doors for clean zones, chillers, and personnel openings.",
  },
  {
    id: "freezer",
    label: "Freezer doors",
    description: "Insulated rapid closures for cold rooms, freezers, and temperature-controlled processing.",
  },
  {
    id: "sectional",
    label: "Sectional doors",
    description: "Panel lift systems for wide openings with thermal and security options.",
  },
];

const introBlock = (name: string, focus: string) =>
  Array(8)
    .fill(0)
    .map(
      (_, i) =>
        `${focus} The ${name} configuration is specified against Australian industrial loading, wind exposure, and traffic patterns. ` +
        `Engineering reviews cover drive selection, safety interfaces, and integration with building management where required. ` +
        `Installation methodology follows documented fixing schedules and commissioning checklists. ` +
        `Ongoing maintenance intervals are aligned to duty rating and site environment (paragraph ${i + 1} of overview).`,
    )
    .join("\n\n");

export const RAPID_PRODUCTS: RapidProduct[] = [
  {
    slug: "high-speed-fabric-rapid-door",
    family: "rapid-roller",
    name: "High-speed fabric rapid door",
    cardTeaser: "Soft-curtain high-cycle door for interior logistics and clean environments.",
    intro: introBlock(
      "high-speed fabric rapid door",
      "Designed for intensive opening cycles where fast re-closure limits air exchange and supports climate or dust control.",
    ),
    specs: [
      { label: "Application", value: "Interior logistics, food-grade, clean manufacturing" },
      { label: "Max width", value: "Up to 8 m (project-specific)" },
      { label: "Max height", value: "Up to 6 m (project-specific)" },
      { label: "Power supply", value: "415 V 3-phase / 240 V single-phase options" },
      { label: "Opening speed", value: "Up to 2.5 m/s (model-dependent)" },
      { label: "Door cycles", value: "High-cycle duty (quoted per schedule)" },
      { label: "Wind load", value: "Engineered to project wind classification" },
    ],
    features: [
      { title: "Soft-bottom safety edge", description: "Reversing contact strip for pedestrian and vehicle safety." },
      { title: "Photocell grid", description: "Presence detection across the clear opening height." },
      { title: "Wind bars", description: "Optional stiffening for pressure differential across the curtain." },
    ],
    controlOptions:
      "PLC-based control with VFD motor control, interlock inputs for fire and BMS, and remote monitoring where specified. Key switches, radar, and induction loops are common activation methods.",
    curtainColors: ["Standard grey", "Food-grade blue", "High-visibility yellow", "White", "Black"],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80",
    ],
  },
  {
    slug: "steel-rapid-roll-door",
    family: "rapid-roller",
    name: "Steel slat rapid roll door",
    cardTeaser: "Metal curtain option for security and exterior wind exposure.",
    intro: introBlock(
      "steel slat rapid roll door",
      "Suited to external façades and secure yards where impact resistance and wind load matter alongside speed.",
    ),
    specs: [
      { label: "Application", value: "Exterior warehouse, loading bays, secure compounds" },
      { label: "Max width", value: "Up to 7 m (project-specific)" },
      { label: "Max height", value: "Up to 5.5 m (project-specific)" },
      { label: "Power supply", value: "415 V 3-phase typical" },
      { label: "Opening speed", value: "Up to 0.8–1.2 m/s typical" },
      { label: "Door cycles", value: "Medium to high cycle" },
    ],
    features: [
      { title: "Insulated slat options", description: "Thermal breaks available for climate-controlled buildings." },
      { title: "Wind locking", description: "End-retention systems for cyclone-rated projects where specified." },
    ],
    controlOptions: "Industrial motor drives with encoder positioning, safety category per risk assessment, and integration with access control.",
    curtainColors: ["Galvanised steel", "Powdercoat — project RAL"],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    ],
  },
  {
    slug: "impact-pvc-swing-door",
    detailPath: "/pvc-strip-curtains/pvc-swing-doors",
    family: "pvc-swing",
    name: "Impact PVC swing door",
    cardTeaser: "Self-closing traffic door for cool rooms and processing corridors.",
    intro: introBlock(
      "impact PVC swing door",
      "Maintains separation between zones while allowing pallet jacks and trolleys to pass without manual latching.",
    ),
    specs: [
      { label: "Application", value: "Retail back-of-house, food processing, hygiene corridors" },
      { label: "Max width", value: "Single leaf up to 1.8 m" },
      { label: "Max height", value: "Up to 2.4 m typical" },
      { label: "Power supply", value: "N/A (manual / optional powered assist)" },
      { label: "Opening speed", value: "Manual swing — assisted close" },
      { label: "Door cycles", value: "Very high pedestrian traffic" },
    ],
    features: [
      { title: "Flexible panel", description: "Absorbs impact and returns to shape." },
      { title: "Stainless hardware", description: "Optional for wet and wash-down areas." },
    ],
    controlOptions: "Typically manual; optional pneumatic or electric assist for large leaves.",
    curtainColors: ["Opaque grey", "Semi-transparent blue", "Yellow"],
    gallery: ["https://images.unsplash.com/photo-1585534321671-e4c8cc1f9aa1?w=1200&q=80"],
  },
  {
    slug: "insulated-freezer-rapid-door",
    family: "freezer",
    name: "Insulated freezer rapid door",
    cardTeaser: "Thermal break rapid closure for freezer and deep-chill openings.",
    intro: introBlock(
      "insulated freezer rapid door",
      "Combines fast operation with insulated curtain packages to reduce ice build-up and energy loss at freezer thresholds.",
    ),
    specs: [
      { label: "Application", value: "Freezer docks, blast freezers, cold distribution" },
      { label: "Max width", value: "Up to 4 m typical" },
      { label: "Max height", value: "Up to 4.5 m typical" },
      { label: "Power supply", value: "415 V 3-phase" },
      { label: "Opening speed", value: "Up to 1.5 m/s" },
      { label: "Door cycles", value: "High cycle in 24/7 operations" },
      { label: "Thermal", value: "Insulated curtain and heated side guides optional" },
    ],
    features: [
      { title: "Heated components", description: "Optional trace heating on guides in high humidity." },
      { title: "Air-tight seals", description: "Double brush seals to reduce frost ingress." },
    ],
    controlOptions: "Low-temperature rated controls with door interlocks to refrigeration alarms.",
    curtainColors: ["Food-grade blue", "Grey", "White"],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChRknkTB7v_1R2ZUz4z_pi0K63vrFnCww1JoEzMnWziR_BTeFVTlVAOhyU7mV2IfImBf_TaLETdsXR8FoPjbFuwuMucFG-Nijw9p3h6cb8P6rKvc-GmJVSjelSb_E59yEFeXgTArgZgM5_I2IkA9LsqnPeLG8VfGDE895c_rLiKmViRGxqy6sXLPdsrUIU1bChK7wHKgSnhCRUoxMx_jK0FsoOdxgxYfJbxK2sSwt3-2qJ16uAKZdoVvErDFlX6MstwNRWzKAsKFY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQjD9oO78c3qZLrSIblj0-imixakTAyl7Rik-DX_9Iz9gr1cvI265mjHjUfRqtAK0bwZBMGjC295s9HTymBa5H231jk4ThA4Qx06RDrTQJ9L5KVMlBY8eZX6K21LyPSrxAh3RfXIHyJiUmGF9nZHSmYjkVab2ug2bAk2pS381ZSK24a5ZGUjznHbyhJlsM4TCGfe9xHq8Ru9ndY0Fo7hOQxuW3-gJzmkyRr55Q7gP-ZMfg1IXOcqcJlP_37tBBew17dGx6BqVm07A",
    ],
  },
  {
    slug: "industrial-sectional-panel-door",
    family: "sectional",
    name: "Industrial sectional panel door",
    cardTeaser: "Panel lift door for wide openings with insulation and window options.",
    intro: introBlock(
      "industrial sectional panel door",
      "Vertical lift panels suited to factories and logistics buildings needing full-width access with weather sealing.",
    ),
    specs: [
      { label: "Application", value: "Factories, distribution centres, aircraft hangars (variant-dependent)" },
      { label: "Max width", value: "Project-specific — wide span available" },
      { label: "Max height", value: "Project-specific" },
      { label: "Power supply", value: "240 V / 415 V operators" },
      { label: "Opening speed", value: "Typical sectional speed per AS requirements" },
      { label: "Door cycles", value: "Standard to medium duty" },
    ],
    features: [
      { title: "Window inserts", description: "Vision panels for safety and natural light." },
      { title: "Track options", description: "Standard lift, high lift, vertical lift." },
    ],
    controlOptions: "Chain hoist, sectional motor with safety edge and photo eyes; smart openers optional.",
    curtainColors: ["N/A — panel finishes: Colorbond, powdercoat"],
    gallery: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80"],
  },
];

export function getRapidProduct(slug: string): RapidProduct | undefined {
  return RAPID_PRODUCTS.find((p) => p.slug === slug);
}

export function getRapidProductsByFamily(family: RapidFamilyId): RapidProduct[] {
  return RAPID_PRODUCTS.filter((p) => p.family === family);
}

export function rapidProductHref(p: RapidProduct): string {
  return p.detailPath ?? `/rapid-roller-doors/${p.slug}`;
}
