import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Layers, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-heroPaper [font-family:'Inter',system-ui,sans-serif]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_20%,rgba(252,131,71,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_30%,rgba(14,116,144,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-heroPaper via-heroPaper to-heroPaper/90" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Accent line */}
      <motion.div
        className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-heroBrand via-heroBrand/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-heroBrand/30 bg-heroBrand/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-heroBrand animate-pulse" />
            <span className="text-heroBrand text-sm font-medium tracking-wide uppercase">
              Australia‑wide supply & install partners
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 [font-family:'Space_Grotesk',system-ui,sans-serif]"
          >
            <span className="text-heroInk">PVC Strip Curtains</span>
            <br />
            <span className="text-heroBrand">&amp; Rapid Roller Doors</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-700 max-w-xl mb-4 leading-relaxed"
          >
            Reduce drafts, dust and temperature loss. Increase throughput with high‑cycle access systems built for industrial sites.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm md:text-base text-slate-600 max-w-lg mb-10 leading-relaxed"
          >
            Made‑to‑measure · Fast turnaround · Direct pricing · Australia‑wide delivery · Support when you need it
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href={createPageUrl("Products")}>
              <Button size="lg" className="bg-heroBrand hover:bg-heroBrandDark text-white px-8 py-6 text-base font-semibold rounded-xl group shadow-sm">
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={createPageUrl("Quote")}>
              <Button size="lg" variant="outline" className="border-slate-300 bg-white/60 text-heroInk hover:bg-white px-8 py-6 text-base font-semibold rounded-xl shadow-sm">
                <MessageSquare className="mr-2 w-5 h-5 text-slate-700" />
                Get Quote
              </Button>
            </a>
          </motion.div>

          {/* Category entry cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 max-w-2xl"
          >
            <a
              href={createPageUrl("Products?category=pvc_strip_curtains")}
              className="group rounded-2xl border border-slate-200 bg-white/70 hover:bg-white transition-colors p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-heroBrand/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-heroBrand" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-heroInk">PVC Strip Curtains</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Heavy‑duty industrial curtain systems for doorways, cool rooms and process areas.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-heroBrand group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
            <a
              href={createPageUrl("Products?category=rapid_roller")}
              className="group rounded-2xl border border-slate-200 bg-white/70 hover:bg-white transition-colors p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-heroBrand/10 flex items-center justify-center">
                  <DoorOpen className="w-5 h-5 text-heroBrand" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-heroInk">Rapid Roller Doors</div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    High‑cycle, high‑speed doors for warehouses, logistics and cold storage.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-heroBrand group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-12 mt-16 pt-8 border-t border-slate-200"
          >
            {[
              { value: "500+", label: "Projects Supported" },
              { value: "48hr", label: "Fast Turnaround" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-heroInk">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          </div>

          {/* Isometric illustration */}
          <div className="lg:col-span-5 w-full lg:self-start">
            <div className="relative w-full flex items-start justify-center md:justify-end pt-0 lg:pt-8 pr-0 md:pr-6">
              <img
                src="/isometric-warehouse.png"
                alt="Isometric warehouse with rapid roller doors and PVC strip curtains"
                className="w-[360px] md:w-[440px] lg:w-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-heroPaper to-transparent" />
    </section>
  );
}