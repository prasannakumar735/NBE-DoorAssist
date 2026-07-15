import { Link } from "react-router-dom";
import { COMPARE_ROWS } from "@/lib/siteContent";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

const COLS = [
  { key: "rapid", label: "Rapid Roller" },
  { key: "pvc", label: "PVC Strip" },
  { key: "high", label: "High Speed" },
  { key: "sectional", label: "Sectional" },
];

export default function Compare() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Comparison</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight">Compare systems</h1>
          <p className="mt-4 max-w-xl text-muted text-lg font-light">
            Sticky specification table — speed, insulation, applications and price guide.
          </p>
        </Reveal>

        <div className="mt-14 overflow-x-auto border border-line bg-white">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="sticky top-20 z-20 bg-white border-b border-line shadow-sm">
              <tr>
                <th className="p-4 md:p-5 font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-muted w-40">
                  Spec
                </th>
                {COLS.map((c) => (
                  <th key={c.key} className="p-4 md:p-5 font-display text-sm font-bold tracking-tight">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.key} className="border-t border-line hover:bg-mist/50 transition-colors">
                  <th className="p-4 md:p-5 font-display text-xs font-semibold tracking-[0.08em] uppercase text-muted sticky left-0 bg-white">
                    {row.label}
                  </th>
                  {COLS.map((c) => (
                    <td key={c.key} className="p-4 md:p-5 text-sm text-ink/80">
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/quote-builder"
            className="px-8 py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-brand transition-colors"
          >
            Request Quote
          </Link>
          <Link
            to="/products"
            className="px-8 py-4 border border-line font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
          >
            Browse catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
