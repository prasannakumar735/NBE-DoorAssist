import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import logoMarkLight from "@/OneDrive_3_4-26-2026/DRoooV 01_B+COLOR.png";

const navLinks = [
  { name: "Home", page: "Home" },
  { name: "Products", page: "Products" },
  { name: "Industries", page: "Industries" },
  { name: "Service", page: "Service" },
  { name: "About", page: "About" },
  { name: "Contact", page: "Contact" },
];

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, search } = useLocation();
  const isHome = pathname === "/";

  const isActive = (page) => {
    const href = createPageUrl(page);
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
                <a
                  key={link.page}
                  href={createPageUrl(link.page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.page)
                      ? "text-brand bg-brand/10"
                      : "text-on-surface-variant hover:text-ink hover:bg-surface-low"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a href={createPageUrl("Quote")} className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-brand hover:bg-brandDark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  Request Quote
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
                    key={link.page}
                    href={createPageUrl(link.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive(link.page)
                        ? "text-brand bg-brand/10"
                        : "text-on-surface-variant hover:text-ink hover:bg-surface-low"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <a href={createPageUrl("Quote")} onClick={() => setMobileOpen(false)}>
                  <div className="mt-3 bg-brand text-white text-center py-3 rounded-xl font-semibold text-sm shadow-sm">
                    Request Quote
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logoMarkLight}
                  alt="drooov"
                  className="h-14 w-14 rounded-2xl object-contain"
                />
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                Australia's specialist supplier of industrial rapid roller doors. Factory direct pricing, nationwide delivery, and professional installation partners.
              </p>
            </div>
            <div>
              <h4 className="text-ink font-bold text-sm mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <a key={link.page} href={createPageUrl(link.page)} className="block text-sm text-on-surface-variant hover:text-brand transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-ink font-bold text-sm mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-on-surface-variant">
                <p>support@drooov.com.au</p>
                <p>1300 DROOOV</p>
                <p>Australia-wide</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-line text-center text-xs text-on-surface-variant">
            © 2026 drooov. All rights reserved. Industrial Rapid Roller Doors — Engineered for Australia.
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}