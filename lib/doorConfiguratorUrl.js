import { MIN_W, MAX_W, MIN_H, MAX_H } from "@/lib/doorCalculatorConfig";
import { createPageUrl } from "@/utils";

const VALID_ENVS = new Set(["ambient", "cold", "high_traffic", "external"]);
const VALID_CTRL = new Set(["left", "right"]);
const VALID_COLORS = new Set(["orange", "blue", "red", "yellow"]);

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * Build a shareable Door Configurator URL (query params mirror common industrial configurator patterns).
 * @param {{ widthMm?: number, heightMm?: number, env?: string, controlSide?: string, curtainColor?: string, viewFlip?: boolean, openPct?: number }} params
 */
export function buildDoorConfiguratorUrl(params = {}) {
  const p = new URLSearchParams();
  if (params.widthMm != null) p.set("w", String(Math.round(params.widthMm)));
  if (params.heightMm != null) p.set("h", String(Math.round(params.heightMm)));
  if (params.env) p.set("env", String(params.env));
  if (params.controlSide) p.set("ctrl", String(params.controlSide));
  if (params.curtainColor) p.set("color", String(params.curtainColor));
  if (params.viewFlip) p.set("flip", "1");
  if (params.openPct != null && params.openPct > 0) p.set("open", String(Math.round(clamp(params.openPct, 0, 100))));
  const base = createPageUrl("DoorConfigurator");
  const q = p.toString();
  return q ? `${base}?${q}` : base;
}

/**
 * Parse configurator query string into safe values (invalid entries ignored).
 * @param {string} [search] — `window.location.search` or `?w=3000&h=4000`
 * @returns {{ widthMm?: number, heightMm?: number, env?: string, controlSide?: string, curtainColor?: string, viewFlip?: boolean, openPct?: number }}
 */
export function parseDoorConfiguratorSearch(search) {
  const raw =
    typeof search === "string"
      ? search.startsWith("?")
        ? search.slice(1)
        : search
      : "";
  const sp = new URLSearchParams(raw);
  const out = {};

  const w = parseInt(sp.get("w") ?? "", 10);
  if (!Number.isNaN(w)) out.widthMm = clamp(w, MIN_W, MAX_W);

  const h = parseInt(sp.get("h") ?? "", 10);
  if (!Number.isNaN(h)) out.heightMm = clamp(h, MIN_H, MAX_H);

  const env = sp.get("env");
  if (env && VALID_ENVS.has(env)) out.env = env;

  const ctrl = sp.get("ctrl");
  if (ctrl && VALID_CTRL.has(ctrl)) out.controlSide = ctrl;

  const color = sp.get("color");
  if (color && VALID_COLORS.has(color)) out.curtainColor = color;

  if (sp.get("flip") === "1") out.viewFlip = true;

  const op = parseInt(sp.get("open") ?? "", 10);
  if (!Number.isNaN(op)) out.openPct = clamp(op, 0, 100);

  return out;
}
