import type { ProductSpec } from "@/src/lib/product-detail";

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (specs.length === 0) {
    return <p className="text-text-muted">No specifications available for this product.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container-lowest">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={`${spec.label}-${index}`}
              className="border-b border-outline-variant/40 last:border-b-0 odd:bg-surface-container-low/50"
            >
              <th className="w-[38%] text-left px-4 py-3 text-text-muted font-medium bg-transparent">
                {spec.label}
              </th>
              <td className="px-4 py-3 text-text-primary">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
