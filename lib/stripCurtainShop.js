/**
 * Strip curtain e-commerce helpers — duty grades, kit pricing, applications.
 * Competitive model vs AU sellers (stripcurtains.com.au, stripdoors.com.au):
 * instant kit price for standard openings + quote path for custom/heavy traffic.
 */

export const STRIP_DUTIES = [
  {
    id: "light",
    label: "Light duty",
    thickness: "1.5mm",
    use: "Domestic / internal pedestrian",
    overlap: "50%",
    pricePerM2: 95,
  },
  {
    id: "medium",
    label: "Medium duty",
    thickness: "2–3mm",
    use: "Shop fronts, trolleys, pallet trucks",
    overlap: "66%",
    pricePerM2: 125,
  },
  {
    id: "heavy",
    label: "Heavy duty",
    thickness: "3–5mm ribbed",
    use: "Warehouse / forklift traffic",
    overlap: "100%",
    pricePerM2: 165,
  },
];

export const STRIP_GRADES = [
  {
    id: "standard",
    label: "Standard clear",
    temp: "2°C to +50°C",
    factor: 1,
  },
  {
    id: "freezer",
    label: "Freezer grade",
    temp: "-50°C to +5°C",
    factor: 1.35,
  },
  {
    id: "anti_insect",
    label: "Anti-insect / coloured",
    temp: "2°C to +50°C",
    factor: 1.15,
  },
  {
    id: "welding",
    label: "Welding screen",
    temp: "Ambient",
    factor: 1.2,
  },
];

export const STRIP_APPLICATIONS = [
  {
    id: "coolroom",
    title: "Cool rooms & freezers",
    blurb: "Hold the cold. Freezer-grade PVC with tight overlaps.",
    href: "Products?category=pvc_strip_curtains&q=freezer",
  },
  {
    id: "warehouse",
    title: "Warehouses & docks",
    blurb: "Forklift-rated ribbed strips for high-traffic bays.",
    href: "Products?category=pvc_strip_curtains&q=warehouse",
  },
  {
    id: "shop",
    title: "Shop fronts & retail",
    blurb: "Clear sightlines, draft control, easy wipe-down.",
    href: "Products?category=pvc_strip_curtains&q=shop",
  },
  {
    id: "food",
    title: "Food processing",
    blurb: "Hygienic barriers between process zones.",
    href: "Products?category=pvc_strip_curtains&q=food",
  },
];

export const STRIP_PRESETS = [
  { label: "Single door", widthMm: 900, heightMm: 2100 },
  { label: "Double door", widthMm: 1800, heightMm: 2100 },
  { label: "Coolroom bay", widthMm: 1200, heightMm: 2200 },
  { label: "Forklift opening", widthMm: 3000, heightMm: 3500 },
];

const WIDTH_MIN = 600;
const WIDTH_MAX = 6000;
const HEIGHT_MIN = 1800;
const HEIGHT_MAX = 5000;

export function clampStripSize(widthMm, heightMm) {
  const w = Math.min(WIDTH_MAX, Math.max(WIDTH_MIN, Number(widthMm) || WIDTH_MIN));
  const h = Math.min(HEIGHT_MAX, Math.max(HEIGHT_MIN, Number(heightMm) || HEIGHT_MIN));
  return { widthMm: Math.round(w), heightMm: Math.round(h) };
}

/**
 * Instant kit estimate (AUD) — hardware + strips, GST-exclusive messaging on UI.
 */
export function estimateStripKitPrice(widthMm, heightMm, dutyId = "medium", gradeId = "standard") {
  const { widthMm: w, heightMm: h } = clampStripSize(widthMm, heightMm);
  const area = (w / 1000) * (h / 1000);
  const duty = STRIP_DUTIES.find((d) => d.id === dutyId) || STRIP_DUTIES[1];
  const grade = STRIP_GRADES.find((g) => g.id === gradeId) || STRIP_GRADES[0];
  const hardware = 85 + Math.ceil(w / 1000) * 42;
  const raw = area * duty.pricePerM2 * grade.factor + hardware;
  const price = Math.round(raw / 5) * 5;
  return {
    widthMm: w,
    heightMm: h,
    areaM2: Math.round(area * 100) / 100,
    duty,
    grade,
    priceAud: price,
    leadDays: dutyId === "heavy" || gradeId === "freezer" ? "3–5" : "2–4",
  };
}
