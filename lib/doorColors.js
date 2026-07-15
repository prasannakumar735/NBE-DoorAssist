/** Curtain fabric colors for 3D door preview */
export const CURTAIN_PALETTE = {
  orange: "#f97316",
  blue: "#3b82f6",
  red: "#ef4444",
  yellow: "#eab308",
};

export const CURTAIN_OPTIONS = [
  { id: "blue", label: "Blue", hex: CURTAIN_PALETTE.blue },
  { id: "orange", label: "Orange", hex: CURTAIN_PALETTE.orange },
  { id: "red", label: "Red", hex: CURTAIN_PALETTE.red },
  { id: "yellow", label: "Yellow", hex: CURTAIN_PALETTE.yellow },
];

/** Page / UI accent themes (buttons, sliders) */
export const UI_THEME_PALETTE = {
  orange: "#f97316",
  cyan: "#06b6d4",
  emerald: "#10b981",
  violet: "#8b5cf6",
  rose: "#f43f5e",
};

export const UI_THEME_OPTIONS = [
  { id: "orange", label: "Orange", hex: UI_THEME_PALETTE.orange },
  { id: "cyan", label: "Cyan", hex: UI_THEME_PALETTE.cyan },
  { id: "emerald", label: "Emerald", hex: UI_THEME_PALETTE.emerald },
  { id: "violet", label: "Violet", hex: UI_THEME_PALETTE.violet },
  { id: "rose", label: "Rose", hex: UI_THEME_PALETTE.rose },
];

export function hexToRgb(hex) {
  const h = String(hex).replace("#", "");
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r, g, b) {
  const x = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${x(r)}${x(g)}${x(b)}`;
}

/** Darken hex toward black (0–1) */
export function darkenHex(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const k = 1 - amount;
  return rgbToHex(r * k, g * k, b * k);
}

/** Lighten by mixing toward white */
export function lightenHex(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
}

export function rgbaFromHex(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Curtain gradient stops for canvas (opaque curtain + neutral glazing — reads closer to product CGI). */
export function curtainMaterialFromHex(accentHex) {
  return {
    face: darkenHex(accentHex, 0.05),
    side: darkenHex(accentHex, 0.18),
    top: lightenHex(accentHex, 0.12),
    accent: accentHex,
    accentGlow: rgbaFromHex(accentHex, 0.32),
    window: "rgba(175, 205, 235, 0.52)",
    windowInner: "rgba(210, 230, 250, 0.38)",
    windowFrame: "rgba(52, 62, 78, 0.92)",
    rib: darkenHex(accentHex, 0.42),
  };
}
