export const MIN_W = 600;
export const MAX_W = 8000;
export const MIN_H = 1000;
export const MAX_H = 7000;

export const DOOR_PRESETS = [
  { label: "Forklift Aisle", width: 3000, height: 4000 },
  { label: "Pedestrian", width: 1000, height: 2200 },
  { label: "Large Truck", width: 5000, height: 5500 },
  { label: "Cold Store Entry", width: 2500, height: 3500 },
  { label: "Dock Bay", width: 3400, height: 4200 },
  { label: "Oversized Load", width: 6000, height: 6000 },
];

export function deriveDoorConfig(width, height, env) {
  const area = (width / 1000) * (height / 1000);
  const isLarge = width > 4500 || height > 5000;
  const isSmall = width < 1500 && height < 2500;

  let motor = "SEW 1.1kW";
  if (area > 12) motor = "SEW 2.2kW";
  if (area > 20) motor = "SEW 3.0kW";
  if (env === "cold") motor = "Direct Drive 3.0kW (heated)";

  let speed = "1.5 m/s";
  if (env === "high_traffic") speed = "2.5–3.0 m/s";
  if (env === "cold") speed = "1.0–1.2 m/s";
  if (isSmall) speed = "1.8–2.0 m/s";

  let material = "PVC Fabric";
  if (env === "cold") material = "Insulated Steel Panels (80mm PU)";
  else if (env === "external") material = "Composite GRP / Aluminium";
  else if (isLarge) material = "Reinforced PVC 1.5mm";

  const insulationNote =
    env === "cold"
      ? "U-value ≤ 0.6 W/m²K — heated frame required"
      : env === "external"
        ? "U-value ≤ 1.0 W/m²K recommended"
        : "Insulation optional";

  let guides = "Standard wind-lock guides";
  if (env === "cold") guides = "Heated guide rails with brush seals";
  if (env === "external") guides = "Heavy-duty wind-lock guides (Class 4+)";

  let leadTime = "12–15 business days";
  if (isLarge) leadTime = "20–25 business days";
  if (env === "cold") leadTime = "18–25 business days";

  let priceMin;
  let priceMax;
  const base = area * 400;
  if (env === "cold") {
    priceMin = Math.round((base * 2.2) / 500) * 500;
    priceMax = Math.round((base * 3.0) / 500) * 500;
  } else if (env === "external") {
    priceMin = Math.round((base * 1.6) / 500) * 500;
    priceMax = Math.round((base * 2.2) / 500) * 500;
  } else {
    priceMin = Math.round((base * 1.0) / 500) * 500;
    priceMax = Math.round((base * 1.5) / 500) * 500;
  }

  const warnings = [];
  if (width > 6000) warnings.push("Widths over 6000mm require structural engineering assessment.");
  if (height > 6000) warnings.push("Heights over 6000mm require custom headroom calculations.");
  if (env === "cold" && area > 16) warnings.push("Large cold store doors may need dual motor configuration.");
  if (env === "high_traffic" && area > 20)
    warnings.push("Consider two separate doors for very large high-traffic openings.");

  let series = "RapidRoll 3000";
  if (env === "cold") series = "ColdSeal CS-200";
  else if (env === "external") series = "RapidRoll 4000 Composite";
  else if (env === "high_traffic") series = "SpeedFlex SF-100";
  else if (isLarge) series = "RapidRoll 4000";

  return {
    motor,
    speed,
    material,
    insulationNote,
    guides,
    leadTime,
    priceMin,
    priceMax,
    warnings,
    series,
    area: area.toFixed(1),
  };
}
