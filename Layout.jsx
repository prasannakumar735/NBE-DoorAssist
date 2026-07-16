import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Search, ChevronDown, Linkedin, Facebook, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import MegaMenu from "@/components/nav/MegaMenu";
import logoMarkLight from "@/DRoooV LOGO/SVG/DRoooV 01_B+COLOR.svg";
import logoMarkDark from "@/DRoooV LOGO/SVG/DRoooV 01_W+COLOR.svg";

const navLinks = [
  { name: "Products", href: "/products", mega: true },
  { name: "Industries", href: "/industries" },
  { name: "Service", href: "/service" },
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
  Industries: [
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

// Reads the actual rendered background colour of whatever sits directly above
// the footer, so the footer can always invert against it (dark section -> light
// footer, light section -> dark footer) regardless of how a given page is built.
function isDarkColor(rgbString) {
  const nums = rgbString.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return false;
  const [r, g, b] = nums.map(Number);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.5;
}

// Atomic/interactive elements (buttons, links, icons) carry component-level
// utility classes (e.g. a Button's `bg-background` base style) that don't
// represent the section's actual background — skip them when reading colour.
const ATOMIC_TAGS = new Set(["BUTTON", "INPUT", "IMG", "SVG", "PATH", "SPAN", "LABEL", "I", "A"]);

function findTrailingBackground(root) {
  let node = root.lastElementChild;
  while (node && node.lastElementChild) {
    node = node.lastElementChild;
  }
  while (node && node !== root) {
    if (!ATOMIC_TAGS.has(node.tagName)) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && !/rgba?\(0,\s*0,\s*0,\s*0\)/.test(bg)) return bg;
    }
    node = node.parentElement;
  }
  return getComputedStyle(root).backgroundColor;
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [footerLight, setFooterLight] = useState(false);
  const mainRef = useRef(null);
  const { pathname, search } = useLocation();
  const isHome = pathname === "/";

  const isActive = (href) => {
    const [hrefPath, hrefQuery] = href.split("?");
    if (hrefQuery) return pathname === hrefPath && search === `?${hrefQuery}`;
    return pathname === hrefPath;
  };

  useEffect(() => {
    const recompute = () => {
      if (!mainRef.current) return;
      const bg = findTrailingBackground(mainRef.current);
      setFooterLight(isDarkColor(bg));
    };

    recompute();
    const raf = requestAnimationFrame(recompute);

    const observer = new MutationObserver(recompute);
    if (mainRef.current) {
      observer.observe(mainRef.current, { childList: true, subtree: true, attributes: true });
    }
    const resizeObserver = new ResizeObserver(recompute);
    if (mainRef.current) resizeObserver.observe(mainRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [pathname]);

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
      <main ref={mainRef} className={isHome ? "" : "pt-16 lg:pt-20"}>
        {children}
      </main>

      {/* Footer — inverted against whatever background the page ends on */}
      <footer className={footerLight ? "bg-white border-t border-line" : "bg-ink"}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <img
                src={footerLight ? logoMarkLight : logoMarkDark}
                alt="drooov"
                className="h-14 w-14 object-contain"
              />
              <p className={`mt-4 max-w-[260px] text-sm leading-relaxed ${footerLight ? "text-ink/60" : "text-white/60"}`}>
                Drooov supplies rapid roller doors and PVC strip curtains for Australian industrial, cold storage and food processing facilities.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
              {Object.entries(footerLinks).map(([heading, links]) => (
                <div key={heading}>
                  <h4 className={`font-bold text-xs mb-4 tracking-wide uppercase ${footerLight ? "text-ink" : "text-white"}`}>{heading}</h4>
                  <div className="space-y-2.5">
                    {links.map(link => (
                      <a key={link.name} href={link.href} className={`block text-xs transition-colors ${footerLight ? "text-ink/60 hover:text-brand" : "text-white/60 hover:text-brandLight"}`}>
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h4 className={`font-bold text-xs mb-4 tracking-wide uppercase ${footerLight ? "text-ink" : "text-white"}`}>Contact</h4>
                <div className={`space-y-2.5 text-xs ${footerLight ? "text-ink/60" : "text-white/60"}`}>
                  <p>support@drooov.com.au</p>
                  <p>1300 DROOOV</p>
                  <p>Australia-wide</p>
                </div>
                <div className="mt-4 flex items-center gap-2.5">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center hover:text-white hover:bg-brand hover:border-brand transition-colors ${footerLight ? "border-line bg-surface-low text-ink/60" : "border-white/10 bg-white/5 text-white/70"}`}>
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center hover:text-white hover:bg-brand hover:border-brand transition-colors ${footerLight ? "border-line bg-surface-low text-ink/60" : "border-white/10 bg-white/5 text-white/70"}`}>
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center hover:text-white hover:bg-brand hover:border-brand transition-colors ${footerLight ? "border-line bg-surface-low text-ink/60" : "border-white/10 bg-white/5 text-white/70"}`}>
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-12 pt-8 text-center sm:text-left border-t ${footerLight ? "border-line" : "border-white/10"}`}>
            <p className={`text-xs ${footerLight ? "text-ink/50" : "text-white/50"}`}>
              © 2026 drooov. All rights reserved. Rapid Roller Doors &amp; PVC Strip Curtains — Engineered for Australia.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}