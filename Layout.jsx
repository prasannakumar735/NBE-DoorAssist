import { useState } from "react";
import { createPageUrl } from "@/utils";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import logoMarkLight from "@/OneDrive_3_4-26-2026/DRoooV 01_B+COLOR.png";

const navLinks = [
  { name: "Home", page: "Home" },
  { name: "Products", page: "Products" },
  { name: "PVC Strip Curtains", page: "Products?category=pvc_strip_curtains" },
  { name: "Rapid Roller Doors", page: "Products?category=rapid_roller" },
  { name: "Get Quote", page: "Quote" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = currentPageName === "Home";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans scrollbar-thin">

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHome
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-slate-200 shadow-sm"
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
                    currentPageName === link.page
                      ? "text-brand bg-brand/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
                className="md:hidden text-slate-800 hover:text-slate-900 p-2"
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
              className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.page}
                    href={createPageUrl(link.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      currentPageName === link.page
                        ? "text-brand bg-brand/10"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
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
      <footer className="bg-white border-t border-slate-200">
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
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                Australia's specialist supplier of industrial rapid roller doors. Factory direct pricing, nationwide delivery, and professional installation partners.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <a key={link.page} href={createPageUrl(link.page)} className="block text-sm text-slate-600 hover:text-brand transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p>support@drooov.com.au</p>
                <p>1300 DROOOV</p>
                <p>Australia-wide</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
            © 2026 drooov. All rights reserved. Industrial Rapid Roller Doors — Engineered for Australia.
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}