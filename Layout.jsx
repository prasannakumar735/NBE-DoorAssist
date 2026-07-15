import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import MegaMenu from "@/components/nav/MegaMenu";
import logoMarkLight from "@/OneDrive_3_4-26-2026/DRoooV 01_B+COLOR.png";

const navLinks = [
  { name: "Products", href: "/products", mega: true },
  { name: "Rapid Roller Doors", href: "/rapid-roller-doors" },
  { name: "PVC Strip Curtains", href: "/pvc-strip-curtains" },
  { name: "Solutions", href: "/industries" },
  { name: "Service & Support", href: "/service" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const footerLinks = {
  Products: [
    { name: "Rapid Roller Doors", href: "/rapid-roller-doors" },
    { name: "PVC Strip Curtains", href: "/pvc-strip-curtains" },
    { name: "Replacement PVC Strips", href: "/replacement-strips" },
    { name: "Compare Products", href: "/compare" },
  ],
  Solutions: [
    { name: "Cold Storage", href: "/industries" },
    { name: "Food Processing", href: "/industries" },
    { name: "Warehousing", href: "/industries" },
    { name: "Manufacturing", href: "/industries" },
  ],
  Service: [
    { name: "Maintenance", href: "/service" },
    { name: "Door Repairs", href: "/service" },
    { name: "Door Inspections", href: "/service" },
    { name: "PVC Replacement", href: "/service" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { pathname, search } = useLocation();
  const isHome = pathname === "/";

  const isActive = (href) => {
    const [hrefPath, hrefQuery] = href.split("?");
    if (hrefQuery) return pathname === hrefPath && search === `?${hrefQuery}`;
    return pathname === hrefPath;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans scrollbar-thin">

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHome
          ? "bg-white/95 backdrop-blur-xl border-b border-line shadow-sm"
          : "bg-white border-b border-line shadow-sm"
      } z-50 isolate`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href={createPageUrl("Home")} className="flex items-center gap-3">
              <img
                src={logoMarkLight}
                alt="drooov"
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.mega && setMegaOpen(true)}
                  onMouseLeave={() => link.mega && setMegaOpen(false)}
                >
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-brand bg-brand/10"
                        : "text-on-surface-variant hover:text-ink hover:bg-surface-low"
                    }`}
                  >
                    {link.name}
                    {link.mega && <ChevronDown className="w-3.5 h-3.5" />}
                  </a>
                  {link.mega && <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className="hidden md:flex text-on-surface-variant hover:text-brand p-2"
              >
                <Search className="w-5 h-5" />
              </button>
              <a href={createPageUrl("Quote")} className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-brand hover:bg-brandDark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  Request a Quote
                </motion.button>
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-ink hover:text-brand p-2"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-line overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive(link.href)
                        ? "text-brand bg-brand/10"
                        : "text-on-surface-variant hover:text-ink hover:bg-surface-low"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <a href={createPageUrl("Quote")} onClick={() => setMobileOpen(false)}>
                  <div className="mt-3 bg-brand text-white text-center py-3 rounded-xl font-semibold text-sm shadow-sm">
                    Request a Quote
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className={isHome ? "" : "pt-16 lg:pt-20"}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logoMarkLight}
                  alt="drooov"
                  className="h-14 w-14 rounded-2xl object-contain"
                />
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                Drooov supplies rapid roller doors and PVC strip curtains for Australian industrial, cold storage and food processing facilities.
              </p>
              <div className="mt-4 space-y-1 text-sm text-on-surface-variant">
                <p>support@drooov.com.au</p>
                <p>1300 DROOOV</p>
                <p>Australia-wide</p>
              </div>
            </div>
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-ink font-bold text-sm mb-4">{heading}</h4>
                <div className="space-y-2">
                  {links.map(link => (
                    <a key={link.name} href={link.href} className="block text-sm text-on-surface-variant hover:text-brand transition-colors">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-on-surface-variant">
              © 2026 drooov. All rights reserved. Rapid Roller Doors &amp; PVC Strip Curtains — Engineered for Australia.
            </p>
            <a href={createPageUrl("Quote")} className="text-xs font-semibold text-brand hover:text-brandDark transition-colors">
              Request a Quote →
            </a>
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}