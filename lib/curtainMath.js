/** Custom curtain builder limits (mm). */
export const MIN_WIDTH_MM = 400;
export const MAX_WIDTH_MM = 4000;
export const MIN_DROP_MM = 600;
export const MAX_DROP_MM = 4000;

export function clampCurtainSize(widthMm, dropMm) {
  return {
    widthMm: Math.min(MAX_WIDTH_MM, Math.max(MIN_WIDTH_MM, Math.round(widthMm))),
    dropMm: Math.min(MAX_DROP_MM, Math.max(MIN_DROP_MM, Math.round(dropMm))),
  };
}

/**
 * Strips overlap along the width, so each additional strip only adds
 * (stripWidth - overlap) of new coverage — the "effective coverage" per strip.
 */
export function calculateStripCount({ widthMm, stripWidthMm, overlapMm }) {
  const effectiveCoverage = stripWidthMm - overlapMm;
  const numStrips = Math.max(2, Math.ceil(widthMm / effectiveCoverage) + 1);
  return { effectiveCoverage, numStrips };
}

export function calculateCurtainSpec({ widthMm, dropMm, stripType }) {
  const { widthMm: w, dropMm: d } = clampCurtainSize(widthMm, dropMm);
  const { effectiveCoverage, numStrips } = calculateStripCount({
    widthMm: w,
    stripWidthMm: stripType.stripWidthMm,
    overlapMm: stripType.overlapMm,
  });
  const totalLengthM = (numStrips * d) / 1000;

  return {
    widthMm: w,
    dropMm: d,
    effectiveCoverage,
    numStrips,
    totalLengthM: Math.round(totalLengthM * 10) / 10,
  };
}
