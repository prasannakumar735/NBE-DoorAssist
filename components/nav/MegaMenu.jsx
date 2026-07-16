import { motion, AnimatePresence } from "framer-motion";
import { Search, GitCompare, FileText } from "lucide-react";
import { createPageUrl } from "@/utils";
import { PRODUCT_LINES } from "@/lib/siteContent";

const rapidLine = PRODUCT_LINES.find((p) => p.id === "rapid_roller");
const pvcLine = PRODUCT_LINES.find((p) => p.id === "pvc_strip_curtains");

const RAPID_CATEGORIES = [
  { label: "High Speed Doors", href: "/products?category=high_speed" },
  { label: "Freezer Doors", href: "/products?category=cold_storage" },
  { label: "Clean Room Doors", href: "/products?category=rapid_roller&q=clean+room" },
  { label: "Food Processing Doors", href: "/products?category=rapid_roller&q=food" },
  { label: "Heavy Duty Doors", href: "/products?category=rapid_roller&q=heavy+duty" },
];

const PVC_CATEGORIES = [
  { label: "Complete Curtain Kits", href: "/products?category=pvc_strip_curtains" },
  { label: "Replacement PVC Strips", href: "/replacement-strips" },
  { label: "Polar Grade PVC", href: "/products?category=pvc_strip_curtains&q=freezer" },
  { label: "Welding PVC", href: "/products?category=pvc_strip_curtains&q=welding" },
  { label: "Anti Static PVC", href: "/products?category=pvc_strip_curtains&q=anti-static" },
  { label: "Coloured PVC", href: "/products?category=pvc_strip_curtains&q=coloured" },
];

const UTILITY_LINKS = [
  { label: "Product Finder", href: "/products", icon: Search },
  { label: "Compare Products", href: "/compare", icon: GitCompare },
  { label: "Request Quote", href: createPageUrl("Quote"), icon: FileText },
];

export default function MegaMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseLeave={onClose}
          className="absolute left-0 top-full mt-2 w-[min(90vw,720px)] bg-white border border-line rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
                  Rapid Roller Doors
                </h3>
                <div className="space-y-0.5">
                  {RAPID_CATEGORIES.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={onClose}
                      className="block px-2 py-1.5 rounded-lg text-sm text-ink hover:text-brand hover:bg-surface-low transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
                {rapidLine?.image && (
                  <a href="/rapid-roller-doors" onClick={onClose} className="mt-4 block group">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-surface-low">
                      <img
                        src={rapidLine.image}
                        alt={rapidLine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-ink">{rapidLine.name} →</p>
                  </a>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
                  PVC Strip Curtains
                </h3>
                <div className="space-y-0.5">
                  {PVC_CATEGORIES.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={onClose}
                      className="block px-2 py-1.5 rounded-lg text-sm text-ink hover:text-brand hover:bg-surface-low transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
                {pvcLine?.image && (
                  <a href="/pvc-strip-curtains" onClick={onClose} className="mt-4 block group">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-surface-low">
                      <img
                        src={pvcLine.image}
                        alt={pvcLine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-ink">{pvcLine.name} →</p>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center gap-2">
              {UTILITY_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-sm font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
                >
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
