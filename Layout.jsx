import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/lib/CartContext";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import logoMarkLight from "@/OneDrive_3_4-26-2026/DRoooV 01_B+COLOR.png";

const stripLinks = [
  { to: "/custom-curtain-builder", name: "Custom Curtain Builder", blurb: "Build to your exact opening" },
  { to: "/strip-rolls", name: "Strip Rolls", blurb: "Buy PVC by the roll" },
  { to: "/made-to-size-kits", name: "Made-to-Size Kits", blurb: "Ready-cut, enquire for price" },
  { to: "/replacement-strips", name: "Replacement Strips", blurb: "Cut-to-length replacements" },
  { to: "/strip-hardware", name: "Rail & Hardware", blurb: "Mounting rail, clamps, brackets" },
];

function StripCurtainsMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();
  const isActive = stripLinks.some((l) => location.pathname === l.to);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-xs lg:text-sm font-semibold tracking-wide lg:tracking-widest uppercase transition-colors duration-300 pb-1 border-b-2 whitespace-nowrap ${
          isActive ? "text-brand border-brand" : "text-neutral-900 border-transparent hover:text-brand"
        }`}
        aria-expanded={open}
      >
        Strip Curtains
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50"
          >
            <div className="bg-white border border-line rounded-xl shadow-xl overflow-hidden">
              {stripLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 hover:bg-surface-low transition-colors border-b border-line last:border-0"
                >
                  <p className="text-sm font-semibold text-ink">{link.name}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{link.blurb}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-surface text-on-surface scrollbar-thin selection:bg-brand/20 selection:text-brand font-sans">
      <header className="w-full sticky top-0 z-[100] isolate bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-5 px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
            <span className="w-2 h-8 bg-brand hidden sm:block shrink-0" aria-hidden />
            <img
              src={logoMarkLight}
              alt="drooov"
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0"
            />
            <span className="text-lg sm:text-xl font-heading font-bold tracking-widest text-on-surface uppercase hidden sm:inline truncate">
              drooov
            </span>
          </Link>

          <nav
            className="hidden md:flex flex-1 justify-center items-center gap-x-5 lg:gap-x-8 xl:gap-x-10 gap-y-2 flex-wrap min-w-0 px-2"
            aria-label="Main"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-xs lg:text-sm font-semibold tracking-wide lg:tracking-widest uppercase transition-colors duration-300 pb-1 border-b-2 whitespace-nowrap ${
                  isActive ? "text-brand border-brand" : "text-neutral-900 border-transparent hover:text-brand"
                }`
              }
            >
              Home
            </NavLink>
            <StripCurtainsMenu />
            <NavLink
              to="/rapid-roller-doors"
              className={({ isActive }) =>
                `text-xs lg:text-sm font-semibold tracking-wide lg:tracking-widest uppercase transition-colors duration-300 pb-1 border-b-2 whitespace-nowrap ${
                  isActive ? "text-brand border-brand" : "text-neutral-900 border-transparent hover:text-brand"
                }`
              }
            >
              Rapid Roller Doors
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={openCart}
              className="relative p-1.5 text-neutral-700 hover:text-brand transition-colors"
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <motion.button
              type="button"
              onClick={() => openQuoteModal()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:inline-flex bg-brand hover:bg-brandDark text-white px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors shadow-sm rounded-md"
            >
              Get a Quote
            </motion.button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-on-surface hover:text-brand p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden z-[100]"
            >
              <div className="px-6 py-4 space-y-1 flex flex-col">
                <Link to="/" className="px-4 py-3 text-xs font-medium tracking-widest uppercase border-b border-slate-100 text-on-surface hover:text-brand">
                  Home
                </Link>
                <p className="px-4 pt-3 pb-1 text-[0.65rem] font-bold tracking-widest uppercase text-slate-400">
                  Strip Curtains
                </p>
                {stripLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-3 text-xs font-medium tracking-widest uppercase border-b border-slate-100 text-on-surface hover:text-brand"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/rapid-roller-doors" className="px-4 py-3 text-xs font-medium tracking-widest uppercase border-b border-slate-100 text-on-surface hover:text-brand">
                  Rapid Roller Doors
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openQuoteModal();
                  }}
                  className="mt-3 bg-brand text-white text-center py-3 font-bold text-xs uppercase tracking-[0.2em] rounded-md"
                >
                  Get a Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-0">{children}</main>

      <footer className="w-full bg-ink text-white px-8 md:px-12 py-16 flex flex-col lg:flex-row justify-between items-start gap-12 border-t border-white/10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-6 bg-brand" aria-hidden />
            <span className="font-heading font-bold text-xl tracking-widest uppercase">drooov</span>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-loose">
            Australia&apos;s online PVC strip curtain shop — sized kits, freezer and forklift grades, plus rapid roller
            doors when you need more than a strip door.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">
            <span>Buy to size</span>
            <span>2–5 day dispatch</span>
            <span>DIY install</span>
            <span>AU nationwide</span>
          </div>
          <span className="block text-[0.6rem] text-slate-600 mt-8 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} drooov. PVC strip curtains &amp; industrial doors — Australia.
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] w-full lg:w-auto">
          <div className="flex flex-col gap-4">
            <span className="text-slate-600">Quick links</span>
            <Link className="hover:text-brand transition-colors" to="/">Home</Link>
            <Link className="hover:text-brand transition-colors" to="/custom-curtain-builder">Custom Curtains</Link>
            <Link className="hover:text-brand transition-colors" to="/rapid-roller-doors">Rapid Roller Doors</Link>
            <Link className="hover:text-brand transition-colors" to="/request-a-quote">Get a Quote</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-slate-600">Strip shop</span>
            <Link className="hover:text-brand transition-colors font-normal tracking-normal normal-case" to="/strip-rolls">
              Strip rolls
            </Link>
            <Link className="hover:text-brand transition-colors font-normal tracking-normal normal-case" to="/made-to-size-kits">
              Made-to-size kits
            </Link>
            <Link className="hover:text-brand transition-colors font-normal tracking-normal normal-case" to="/replacement-strips">
              Replacement strips
            </Link>
            <Link className="hover:text-brand transition-colors font-normal tracking-normal normal-case" to="/strip-hardware">
              Rail &amp; hardware
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-slate-600">Site</span>
            <Link className="hover:text-brand transition-colors" to="/rapid-roller-doors">
              Industrial doors
            </Link>
            <Link className="hover:text-brand transition-colors" to="/request-a-quote">
              Compliance &amp; quotes
            </Link>
            <a className="hover:text-brand transition-colors" href="mailto:support@drooov.com.au">
              Support
            </a>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-slate-600">Contact</span>
            <a
              className="hover:text-brand transition-colors font-normal tracking-normal normal-case"
              href="mailto:support@drooov.com.au"
            >
              support@drooov.com.au
            </a>
            <span className="text-slate-400 font-normal tracking-normal">1300 DROOOV · Australia-wide</span>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <ChatWidget />
    </div>
  );
}
