import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_LINES } from "@/lib/siteContent";

const rapidLine = PRODUCT_LINES.find((p) => p.id === "rapid_roller");
const pvcLine = PRODUCT_LINES.find((p) => p.id === "pvc_strip_curtains");

const RAPID_CATEGORIES = [
  { label: "Internal Rapid Roller Doors", href: "/products?category=rapid_roller" },
  { label: "External Rapid Roller Doors", href: "/products?category=rapid_roller" },
  { label: "Cold Storage Rapid Doors", href: "/products?category=cold_storage" },
  { label: "Food Processing Rapid Doors", href: "/products?category=rapid_roller" },
  { label: "High Traffic Rapid Doors", href: "/products?category=high_speed" },
];

const PVC_CATEGORIES = [
  { label: "Standard Clear PVC", href: "/products?category=pvc_strip_curtains" },
  { label: "Coolroom PVC", href: "/products?category=pvc_strip_curtains" },
  { label: "Freezer Grade PVC", href: "/products?category=pvc_strip_curtains" },
  { label: "Anti-Insect PVC", href: "/products?category=pvc_strip_curtains" },
  { label: "Welding PVC", href: "/products?category=pvc_strip_curtains" },
  { label: "Replacement PVC Strips", href: "/products?category=pvc_strip_curtains" },
];

const SHOP_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Rapid Roller Doors", href: "/rapid-roller-doors" },
  { label: "PVC Strip Curtains", href: "/products?category=pvc_strip_curtains" },
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
          className="absolute left-0 right-0 top-full bg-white border-b border-line shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
                Shop / Explore
              </h3>
              <div className="space-y-1">
                {SHOP_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={onClose}
                    className="block px-2 py-1.5 rounded-lg text-sm font-medium text-ink hover:text-brand hover:bg-surface-low transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              {rapidLine?.image && (
                <a href="/rapid-roller-doors" onClick={onClose} className="mt-6 block group">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-low">
                    <img
                      src={rapidLine.image}
                      alt={rapidLine.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-ink">{rapidLine.name}</p>
                </a>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
                Rapid Roller Doors
              </h3>
              <div className="space-y-1">
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
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
                PVC Strip Curtains
              </h3>
              <div className="space-y-1">
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
                <a href="/products?category=pvc_strip_curtains" onClick={onClose} className="mt-4 block group">
                  <div className="aspect-[16/6] rounded-xl overflow-hidden bg-surface-low">
                    <img
                      src={pvcLine.image}
                      alt={pvcLine.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
