import { useState } from "react";
import { ChevronDown } from "lucide-react";

/** Lightweight, dependency-free accordion — buttons + aria-expanded/aria-controls. */
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-brand shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
            </h3>
            {open && (
              <div id={panelId} className="pb-5 text-on-surface-variant leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
