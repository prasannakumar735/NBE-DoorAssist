/**
 * PVC Roll catalogue — Coolroom PVC Rolls & Freezer Grade PVC Rolls.
 *
 * Data model: each product FAMILY is defined once (shared copy, temperature
 * rating, colour, transparency, applications, features, benefits, SEO
 * copy) and every purchasable SKU is a WIDTH x THICKNESS variant of that
 * family. Variants are generated at module-load time from
 * `PVC_ROLL_WIDTHS_MM` x `PVC_ROLL_THICKNESSES_MM`, mirroring the
 * family-with-variants shape used elsewhere in the catalogue (see
 * `lib/data/stripCatalog.js` STRIP_TYPES -> ROLLS) rather than hand-writing
 * 24 near-duplicate product records.
 *
 * Generated variants are shaped to match `prototype/mockProducts.js`
 * product records (same fields consumed by ProductCard / ProductDetail /
 * ProductFilters / the /pvc-strip-curtains hub), with extra facet fields
 * (`product_family`, `thickness_mm`, `temperature_rating`, `colour`,
 * `transparency`, `applications`, `features`, `benefits`, `seo_title`,
 * `seo_description`) layered on top.
 */

import { getProductImage } from "@/lib/productImage";

export const PVC_ROLL_WIDTHS_MM = [75, 100, 150, 200, 300, 400];
export const PVC_ROLL_THICKNESSES_MM = [2, 3];

export const PVC_ROLL_FAMILIES = [
  {
    key: "coolroom_pvc_roll",
    name: "Coolroom PVC Roll",
    skuPrefix: "PVCR-CR",
    temperatureRating: "-5°C to +5°C (coolroom / chiller)",
    colour: "Clear with a light blue tint",
    transparency: "High clarity, minimal light distortion",
    basePricePerMetre: 18.5,
    familyDescription:
      "Coolroom PVC Roll is a flexible, cold-tolerant PVC strip material supplied in bulk rolls for cutting to length on site or by our fabrication team. It is formulated to stay pliable in chilled environments, resisting the stiffening and cracking that standard-grade PVC suffers below around 5°C, while keeping the strip clear enough for staff and forklift operators to see through the doorway.",
    applications: [
      "Coolroom and chiller doorways",
      "Cold-chain distribution centres",
      "Butcheries and food processing chillers",
      "Supermarket cool rooms and walk-in fridges",
      "Loading dock coolroom transfer points",
    ],
    features: [
      "Cold-flex PVC compound rated for coolroom temperatures",
      "Supplied as uncut roll stock — cut to any drop length on site",
      "Consistent gauge and width along the full roll length",
      "UV-stabilised additive package for extended service life",
      "Compatible with standard face-fix and hook-on mounting track",
    ],
    benefits: [
      "Reduces cold air loss and energy costs at coolroom doorways",
      "Stays flexible in chilled conditions instead of going brittle",
      "Bulk roll format suits trade installers and multi-site facility teams",
      "Cut-to-length flexibility avoids waste on non-standard openings",
    ],
    seoTitleSuffix: "Coolroom PVC Roll",
    seoDescriptionTemplate:
      "Buy Coolroom PVC Roll {width}mm x {thickness}mm — cold-flex clear PVC strip supplied by the roll for coolroom and chiller doorways. Australia-wide delivery.",
  },
  {
    key: "freezer_grade_pvc_roll",
    name: "Freezer Grade PVC Roll",
    skuPrefix: "PVCR-FZ",
    temperatureRating: "-30°C to +5°C (freezer / blast chiller)",
    colour: "Clear with a slight amber tint",
    transparency: "Good clarity in sub-zero conditions; minor haze below -20°C is normal for this grade",
    basePricePerMetre: 26.9,
    familyDescription:
      "Freezer Grade PVC Roll is engineered for sustained sub-zero exposure, using a cold-flex PVC formulation that resists the brittleness, cracking and frost cling that standard and coolroom-grade PVC develop in freezer conditions. Supplied as bulk roll stock, it is cut to length for full strip curtains or replacement strips on freezer, blast chiller and cold-store doorways.",
    applications: [
      "Freezer room and blast freezer doorways",
      "Cold storage warehouses and distribution centres",
      "Ice cream, seafood and frozen food processing facilities",
      "Freezer-to-dock transfer openings",
      "Pharmaceutical cold-chain freezer stores",
    ],
    features: [
      "Freezer-grade cold-flex PVC compound rated to -30°C",
      "Supplied as uncut roll stock — cut to any drop length on site",
      "Reduced frost cling and stiffening versus standard PVC grades",
      "Consistent gauge and width along the full roll length",
      "Compatible with standard face-fix and hook-on mounting track",
    ],
    benefits: [
      "Maintains flexibility and seal integrity in freezer conditions",
      "Minimises cold air loss and frost build-up at freezer doorways",
      "Bulk roll format suits trade installers and multi-site facility teams",
      "Cut-to-length flexibility avoids waste on non-standard openings",
    ],
    seoTitleSuffix: "Freezer Grade PVC Roll",
    seoDescriptionTemplate:
      "Buy Freezer Grade PVC Roll {width}mm x {thickness}mm — cold-flex PVC strip rated to -30°C, supplied by the roll for freezer and cold storage doorways. Australia-wide delivery.",
  },
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function widthPriceFactor(widthMm) {
  // Wider strip = more material per metre.
  return widthMm / 200;
}

function thicknessPriceFactor(thicknessMm) {
  // 2mm is baseline, 3mm carries a premium for extra material/durability.
  return thicknessMm === 3 ? 1.35 : 1;
}

function buildVariant(family, widthMm, thicknessMm) {
  const title = `${family.name} ${widthMm}mm × ${thicknessMm}mm`;
  const slug = slugify(`${family.name}-${widthMm}mm-x-${thicknessMm}mm`);
  const sku = `${family.skuPrefix}-${widthMm}-${thicknessMm}`;
  const pricePerMetre =
    Math.round(
      family.basePricePerMetre * widthPriceFactor(widthMm) * thicknessPriceFactor(thicknessMm) * 100
    ) / 100;

  const shortDescription = `${family.name} at ${widthMm}mm width and ${thicknessMm}mm thickness, rated ${family.temperatureRating}. Supplied by the roll for cutting to length.`;

  const fullDescription = `${family.familyDescription}\n\nThis variant is supplied at ${widthMm}mm strip width and ${thicknessMm}mm gauge, giving a ${
    thicknessMm === 3 ? "heavier-duty" : "standard-duty"
  } strip suited to ${family.key === "freezer_grade_pvc_roll" ? "sustained freezer exposure" : "coolroom and chiller exposure"}. Sold by the metre as uncut roll stock — advise your required drop length and hanging method (face-fix or hook-on track) and we can supply pre-cut strips or full kits on request.`;

  const specs = [
    { label: "Product Family", value: family.name },
    { label: "Strip Width", value: `${widthMm}mm` },
    { label: "Strip Thickness", value: `${thicknessMm}mm` },
    { label: "Temperature Rating", value: family.temperatureRating },
    { label: "Colour", value: family.colour },
    { label: "Transparency", value: family.transparency },
    { label: "Material", value: "PVC (cold-flex compound)" },
    { label: "Sold As", value: "Bulk roll — cut to length" },
  ];

  const variant = {
    // Core catalogue fields (shape shared with prototype/mockProducts.js)
    id: `prod-pvcroll-${slugify(family.key)}-${widthMm}-${thicknessMm}`,
    slug,
    title,
    sku,
    category: "pvc_strip_curtains",
    price: pricePerMetre,
    price_type: "from",
    stock_status: "in_stock",
    is_part: true,
    short_description: shortDescription,
    description: fullDescription,
    width_mm: widthMm,
    material: "pvc",
    insulated: family.key === "freezer_grade_pvc_roll",
    specs,

    // PVC Roll-specific facet/detail fields
    product_family: family.key,
    product_family_label: family.name,
    thickness_mm: thicknessMm,
    temperature_rating: family.temperatureRating,
    colour: family.colour,
    transparency: family.transparency,
    applications: family.applications,
    features: family.features,
    benefits: family.benefits,

    // SEO
    seo_title: `${title} | ${family.seoTitleSuffix} | Drooov`,
    seo_description: family.seoDescriptionTemplate
      .replace("{width}", widthMm)
      .replace("{thickness}", thicknessMm),
  };

  variant.image_url = getProductImage(variant);
  return variant;
}

export function generatePvcRollProducts() {
  const variants = [];
  PVC_ROLL_FAMILIES.forEach((family) => {
    PVC_ROLL_WIDTHS_MM.forEach((widthMm) => {
      PVC_ROLL_THICKNESSES_MM.forEach((thicknessMm) => {
        variants.push(buildVariant(family, widthMm, thicknessMm));
      });
    });
  });
  return variants;
}

export const PVC_ROLL_PRODUCTS = generatePvcRollProducts();

export default PVC_ROLL_PRODUCTS;
