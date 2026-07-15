/**
 * Sector / performance filters map to existing product fields (category, insulated, etc.).
 */

export function sectorMatches(sector, product) {
  if (!sector || sector === "all") return true;
  const c = product?.category;
  const map = {
    pharma: ["cold_storage", "insulated"],
    logistics: ["rapid_roller", "high_speed", "dock_door"],
    cold_chain: ["cold_storage", "pvc_strip_curtains"],
    manufacturing: ["rapid_roller", "pvc_strip_curtains", "dock_door", "high_speed"],
    retail: ["pvc_strip_curtains", "cold_storage"],
  };
  const allowed = map[sector];
  if (!allowed) return true;
  return allowed.includes(c);
}

export function performanceMatches(performance, product) {
  if (!performance || performance === "all") return true;
  const c = product?.category;
  const ins = product?.insulated === true;
  switch (performance) {
    case "high_cycle":
      return ["rapid_roller", "high_speed"].includes(c);
    case "climate":
      return ins || ["cold_storage", "insulated"].includes(c);
    case "standard":
      return !["high_speed"].includes(c);
    case "dock":
      return c === "dock_door" || c === "rapid_roller";
    default:
      return true;
  }
}
