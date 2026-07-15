import { calculateStripCount } from "@/lib/curtainMath";

/**
 * Draws overlapping PVC strips to real mm proportions inside an SVG viewBox,
 * so the preview stays accurate without manual scaling math.
 */
export default function CurtainPreview({ widthMm, dropMm, stripType, className = "" }) {
  const { effectiveCoverage, numStrips } = calculateStripCount({
    widthMm,
    stripWidthMm: stripType.stripWidthMm,
    overlapMm: stripType.overlapMm,
  });

  const frameMargin = Math.round(widthMm * 0.06);
  const railHeight = Math.round(dropMm * 0.035);
  const viewW = widthMm + frameMargin * 2;
  const viewH = dropMm + railHeight + Math.round(dropMm * 0.05);

  const strips = Array.from({ length: numStrips }, (_, i) => {
    const x = frameMargin + i * effectiveCoverage - (stripType.stripWidthMm - effectiveCoverage) / 2;
    return { x, key: `strip-${i}` };
  });

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className={className}
      role="img"
      aria-label={`Preview of a ${widthMm}mm wide by ${dropMm}mm drop ${stripType.name} curtain`}
    >
      <rect
        x={frameMargin - stripType.stripWidthMm * 0.15}
        y={0}
        width={widthMm + stripType.stripWidthMm * 0.3}
        height={railHeight}
        rx={railHeight * 0.25}
        fill="#3a372f"
      />
      <clipPath id="curtain-opening">
        <rect x={frameMargin} y={railHeight} width={widthMm} height={dropMm} />
      </clipPath>
      <g clipPath="url(#curtain-opening)">
        <rect x={frameMargin} y={railHeight} width={widthMm} height={dropMm} fill="#efece5" opacity="0.4" />
        {strips.map((s, i) => (
          <rect
            key={s.key}
            x={s.x}
            y={railHeight}
            width={stripType.stripWidthMm}
            height={dropMm}
            fill={stripType.swatch}
            stroke={stripType.stroke}
            strokeWidth={Math.max(2, widthMm * 0.002)}
            opacity={i % 2 === 0 ? 0.92 : 0.8}
          />
        ))}
      </g>
      <rect
        x={frameMargin}
        y={railHeight}
        width={widthMm}
        height={dropMm}
        fill="none"
        stroke="#c9c6ba"
        strokeWidth={Math.max(3, widthMm * 0.004)}
      />
    </svg>
  );
}
