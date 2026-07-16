/** Site-wide catalogue & marketing content for the premium Drooov experience */

export const PRODUCT_LINES = [
  {
    id: "rapid_roller",
    name: "Rapid Roller Doors",
    tagline: "High-cycle performance for relentless traffic.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=2000&q=80",
    specs: ["Up to 2.5 m/s", "1M+ cycle rating", "Thermal isolation"],
    applications: ["Logistics", "Manufacturing", "Food"],
    features: ["Soft bottom edge", "Frequency inverter", "Safety photocells"],
  },
  {
    id: "pvc_strip_curtains",
    name: "PVC Strip Curtains",
    tagline: "Transparent barriers. Instant climate control.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80",
    specs: ["1.5–5 mm grades", "−50°C freezer option", "Welding & anti-static grades"],
    applications: ["Cold storage", "Retail", "Warehousing", "Welding bays", "Electronics/cleanroom"],
    features: ["Overlap engineered", "Face-fix or hook-on stainless track", "Anti-insect & multi-colour tints"],
  },
  {
    id: "high_speed",
    name: "High Speed Doors",
    tagline: "Minimal open time. Maximum throughput.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80",
    specs: ["2.0+ m/s", "Low draft seal", "Smart sensors"],
    applications: ["Distribution", "Automotive", "Pharma"],
    features: ["Self-repairing curtain", "Wind bars", "PLC ready"],
  },
  {
    id: "insulated",
    name: "Sectional Doors",
    tagline: "Insulated panels for controlled environments.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80",
    specs: ["U-value optimised", "Panel thickness options", "Quiet operation"],
    applications: ["Cold chain", "Warehousing", "Retail"],
    features: ["Thermal break", "Vision panels", "Finger protection"],
  },
  {
    id: "dock_door",
    name: "Dock Equipment",
    tagline: "Loading bay systems engineered as one.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=2000&q=80",
    specs: ["Levellers", "Shelters", "Bumpers"],
    applications: ["Distribution", "Logistics", "Manufacturing"],
    features: ["Integrated safety", "Heavy traffic rated", "Serviceable"],
  },
  {
    id: "cold_storage",
    name: "Cold Storage Doors",
    tagline: "Sealed performance below zero.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80",
    specs: ["Anti-condensation", "Heated frames", "High seal"],
    applications: ["Cold storage", "Food", "Pharma"],
    features: ["Thermal break", "Freezer curtain options", "HACCP ready"],
  },
];

export const TRUST_LOGOS = [
  "Northline Logistics",
  "Pacific Cold",
  "Apex Foods",
  "Metro Dock",
  "Horizon Pharma",
  "Atlas Manufacturing",
  "Coastal Retail",
  "Unity Distribution",
];

export const STATS = [
  { value: "2,400+", label: "Projects Completed" },
  { value: "18", label: "Years Experience" },
  { value: "12,000+", label: "Doors Installed" },
  { value: "48hr", label: "Service Response" },
  { value: "AU + NZ", label: "Countries Served" },
];

export const INDUSTRIES = [
  {
    id: "food",
    name: "Food Processing",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    blurb: "Hygienic separation between process zones.",
  },
  {
    id: "cold",
    name: "Cold Storage",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
    blurb: "Hold the cold. Protect energy and product.",
  },
  {
    id: "warehouse",
    name: "Warehousing",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    blurb: "High-cycle access for relentless fleets.",
  },
  {
    id: "distribution",
    name: "Distribution",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80",
    blurb: "Dock-to-door systems that move freight.",
  },
  {
    id: "auto",
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    blurb: "Precision openings for production lines.",
  },
  {
    id: "pharma",
    name: "Pharmaceutical",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    blurb: "Controlled environments. Documented quality.",
  },
  {
    id: "mfg",
    name: "Manufacturing",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    blurb: "Uptime-first doors for industrial floors.",
  },
  {
    id: "retail",
    name: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    blurb: "Clean openings for back-of-house and front.",
  },
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Pacific Cold Chain Hub",
    industry: "Cold Storage",
    location: "Melbourne, VIC",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1800&q=80",
    product: "Cold Storage Doors + Strip Curtains",
    challenge: "Energy loss across 14 dock openings.",
    result: "38% reduction in cold air exchange at docks.",
  },
  {
    id: "p2",
    title: "Northline Distribution Centre",
    industry: "Logistics",
    location: "Sydney, NSW",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80",
    product: "Rapid Roller Doors",
    challenge: "Bottlenecks at high-traffic internal bays.",
    result: "Cycle time cut; 24/7 throughput restored.",
  },
  {
    id: "p3",
    title: "Apex Foods Process Hall",
    industry: "Food Processing",
    location: "Brisbane, QLD",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80",
    product: "PVC Strip Curtains + High Speed",
    challenge: "Zone separation without slowing staff.",
    result: "Hygienic barriers with clear sightlines.",
  },
];

export const MEGA_PRODUCTS = PRODUCT_LINES.map((p) => ({
  ...p,
  href: `/products?category=${p.id}`,
  experienceHref: `/product-experience?line=${p.id}`,
}));
