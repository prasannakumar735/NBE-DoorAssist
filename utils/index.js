/** Legacy page-name lookup, kept for a couple of call sites still using string names. */
const LEGACY_ROUTES = {
  Home: "/",
  Products: "/rapid-roller-doors",
  DoorConfigurator: "/rapid-roller-doors/configure",
  Quote: "/request-a-quote",
};

export function createPageUrl(pageName) {
  const [name, query] = String(pageName || "").split("?");
  const base = LEGACY_ROUTES[name] || "/" + name.replace(/ /g, "-");
  return query ? `${base}?${query}` : base;
}

/** Quote page URL with optional product id and opening dimensions (mm). */
export function buildQuoteUrlWithDimensions({ productId, widthMm, heightMm } = {}) {
  const params = new URLSearchParams();
  if (productId) params.set("product", String(productId));
  if (widthMm != null) params.set("width", String(widthMm));
  if (heightMm != null) params.set("height", String(heightMm));
  const q = params.toString();
  return q ? `/request-a-quote?${q}` : "/request-a-quote";
}
