/**
 * Local image path resolver for PVC Roll catalogue products (see
 * `prototype/pvcRollCatalog.js`). The 24 generated roll variants use
 * `product_family` ("coolroom_pvc_roll" | "freezer_grade_pvc_roll"),
 * `width_mm` and `thickness_mm` to derive a predictable local asset path
 * instead of a hardcoded/placeholder `image_url`.
 *
 * Path convention (images added later, not yet in the repo):
 *   /products/pvc/coolroom/coolroom-{width}x{thickness}.png
 *   /products/pvc/freezer/freezer-{width}x{thickness}.png
 */

const FAMILY_FOLDERS = {
  coolroom_pvc_roll: "coolroom",
  freezer_grade_pvc_roll: "freezer",
};

/** True when a product is one of the generated PVC Roll variants. */
export function isPvcRollProduct(product) {
  return Boolean(product && product.product_family in FAMILY_FOLDERS);
}

/**
 * Returns the local image path for a PVC Roll product, or the product's
 * existing `image_url` (unchanged) for every other product in the
 * catalogue — safe to call on any product without checking type first.
 */
export function getProductImage(product) {
  if (!product) return null;

  const folder = FAMILY_FOLDERS[product.product_family];
  if (!folder) return product.image_url || null;

  const width = parseInt(product.width_mm, 10);
  const thickness = parseInt(product.thickness_mm, 10);
  if (!Number.isFinite(width) || !Number.isFinite(thickness)) {
    return product.image_url || null;
  }

  return `/products/pvc/${folder}/${folder}-${width}x${thickness}.png`;
}

export default getProductImage;
