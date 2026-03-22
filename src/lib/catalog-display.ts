/**
 * Product grid images from Stitch `code_2.html` (lh3.googleusercontent.com).
 * Rotated by card index; Supabase `image_url` is not used on the listing (wire DB images later if needed).
 */
export const STITCH_CATALOG_IMAGES: string[] = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABEwTdQODaKNNHBYPiqIvZWGHqnoRJDhhzluh5TxwG_hMJwRxbpl13DxS6LVm7sGnTgOAZv_eMY9axP-a5qQEMLSqQADBOORN5Vv19zMMHxjOUvXtWab25f2Q32Iqj-3dgww-sU7DNxGHUOmt7OCygDbTeQalj1BdX_1iwBHHDFWhe51wueOSohoiFA0mybCwDkf1ygK4q-n_7_0CDctZJIbpG4pXmEicPjNvPbxRIQBznmX55Mq_cNERwIsig_C15oBTuLXSvwQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEZo5zmNFySb-X_r1jMBuO494JUTB1gRUMizsAst9MQ3sQu3ibTaGOaf_cE0lsNQ5At0NpKKh7tuT4qLG861y_aGBbm6zN5zOaVJAzPV-qkJcrVbyP6_GBTKj2UVgpeQOSp-voqGvhdmMNB5tzv0N8uzdJdYemJxwJBPhZ4QY6i2d0IqGyuFrJB4KafMlGbMVmbAzSxumhiulx-NQ613lpqw252FdbhQqW71cC9_auBQfcwkJZ5o-FDLopd_kDjJgSd5-OPkYvUg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDoomUaCUO65rMO0wXTORESnoACTl1IELL5pILUexJnpmGB7NkCfySibHaO0vlfWDdY_HlC3bXiYYUfcQB8A6qMhbAtOTUrkmhZmqo2tU_cAc_-0RQaoPTc9h4-5ZhevEjzBRLNQK2ajHeol6RT5wlKCifR1KqEU9d6DY4BPmEBfQ2AOua2BZ6aYukyfJ-kEoiaFedNcdGTbc97vn4OPXmeoc2WUWsp14N0owfxhS8HuSjC6Ggc3pkfBp_R7Sk_lPBtnf2LTFMw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ak9bYXbhmygJq2ocjI9hV4c56Wlyg4mgyqbp3cD7fOZJR2v91hLeF4rHTSdD8CqAqRrZ7rXCguSsvE2kz9dk6U4-DLV72MkEQb5vDFCwWuUoFjO2DXlib5o6JCOmAfAV93iqOc9prZu0IWaBTTi_IlDDA_yW0_vNFRZE_2ydccPWypaVWDLl0HDFfwB7UfVWa1zy-vpDz21JARmsjpRUoQzDhvcZKkmJ70XKPzxN4mBQbY1zxjjSu2MJfK6uyitACp5z7I6Zzg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDy8sZ6b_mvv6cWLgJWuAeJ5tSn5DhS-f2VNxnZqvLwx51T7d3IQVEXFr-Yz1LpmjW2r1qryMo2-KXBR0YtV5Yjaxk4FN-PxMoXhoLOLPAopqxmyRgXHH_vz2rt9Vav5GAOaoq5Z9YZHVrL8BOy9FkejRc6JQ638hkUEywy2Gus9uEaMopQg_quWj5lOVMnQtfgMQiguizLYOtMddoGh18m-okjToMYWcdjKWick2FBYdTbgWLQCCNdSibPVbiBbJzgjlFB69FL4Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCzosDOddYTrz_ydmNCJCBaEARcKUkpll7VUSDQyN2pqPnk3leghaFhtwY2yKq2F7HHWNkVdF3-PFpNYZK91DVAX42qX1WNEHvICDtrCxr_r6VRJe790Ntl638U2UIlwb7ts2-GkE-NQP8e9GG0DsE-9JPX-FnukszVx60-dPWL9WZU68jzcQZ3wWHjDBlTKin2zWok2aUvd3FbkEzg7XTp7T__TntLGHJf9ly2OGiyELY0Xvl8K7_z1YHTfNrqPx0KFBQklupLvg",
];

export type CatalogBadge = { label: string; className: string };

const BADGE_ROTATION: CatalogBadge[] = [
  { label: "High speed", className: "bg-[#00639b] text-white" },
  { label: "Thermal control", className: "bg-[#00639b] text-white" },
  { label: "Heavy duty", className: "bg-[#303030] text-white" },
  { label: "Energy saver", className: "bg-[#00639b] text-white" },
  { label: "Impact ready", className: "bg-[#051125] text-white" },
  { label: "Standard", className: "bg-[#c5c6cd] text-[#191c1f]" },
];

/** Six images from Stitch `code_2.html`, cycled by grid position (ignores DB `image_url` on listing). */
export function catalogGridImage(gridIndex: number): string {
  return STITCH_CATALOG_IMAGES[gridIndex % STITCH_CATALOG_IMAGES.length]!;
}

export function catalogBadge(gridIndex: number): CatalogBadge {
  return BADGE_ROTATION[gridIndex % BADGE_ROTATION.length]!;
}

export function seriesCodeFromSlug(slug: string): string {
  const parts = slug.split("-").filter(Boolean).slice(0, 3);
  const frag = parts.map((p) => p.slice(0, 4).toUpperCase()).join("_");
  return `SERIES_${frag || "DROO"}`;
}

export type SpecRow = { label: string; value: string };

/** Neutral copy — not certifications; aligns with enquiry-led sales. */
export function catalogSpecRows(category: string): SpecRow[] {
  const c = category.toLowerCase();
  if (c.includes("cold") || c.includes("chill")) {
    return [
      { label: "Application", value: "Cool chain & chill" },
      { label: "Specification", value: "Quoted to opening" },
      { label: "Support", value: "Australia-wide" },
    ];
  }
  if (c.includes("commercial")) {
    return [
      { label: "Duty", value: "Medium–high cycle" },
      { label: "Specification", value: "Quoted to opening" },
      { label: "Support", value: "Australia-wide" },
    ];
  }
  return [
    { label: "Opening speed", value: "Model-dependent" },
    { label: "Specification", value: "Quoted to opening" },
    { label: "Support", value: "Australia-wide" },
  ];
}
