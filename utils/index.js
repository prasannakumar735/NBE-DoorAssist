/** Legacy page-name lookup for links that still use string page names. */
const LEGACY_ROUTES = {
  Home: "/",
  Products: "/products",
  Quote: "/request-a-quote",
  DoorConfigurator: "/rapid-roller-doors/configure",
  StripShop: "/made-to-size-kits",
};

export function createPageUrl(pageName) {
  const [name, query] = String(pageName || "").split("?");
  const base = LEGACY_ROUTES[name] || "/" + name.replace(/ /g, "-").toLowerCase();
  return query ? `${base}?${query}` : base;
}

/** Quote page URL with optional product id and opening dimensions (mm). */
export function buildQuoteUrlWithDimensions({ productId, widthMm, heightMm } = {}) {
  const params = new URLSearchParams();
  if (productId) params.set("product", String(productId));
  if (widthMm != null && widthMm !== "") params.set("width", String(widthMm));
  if (heightMm != null && heightMm !== "") params.set("height", String(heightMm));
  const q = params.toString();
  return q ? `/request-a-quote?${q}` : "/request-a-quote";
}
