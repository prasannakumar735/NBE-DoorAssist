import { MapPin, Phone, Wrench, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "../motion/ScrollReveal";
import { motion } from "framer-motion";

const features = [
  { icon: MapPin, title: "Australia-wide Partners", desc: "Certified installers in every state and territory" },
  { icon: Phone, title: "24/7 Emergency Support", desc: "Breakdown assistance available around the clock" },
  { icon: Wrench, title: "Spare Parts Available", desc: "Genuine replacement parts shipped express" },
  { icon: Package, title: "Maintenance Programs", desc: "Preventative maintenance to maximise door lifespan" },
];

export default function SupportSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Installation & Support
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              We've Got You Covered
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              From installation to ongoing maintenance, our national network of certified partners ensures your doors perform at their best, every day.
            </p>
            <a href={createPageUrl("Quote")}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-xl font-semibold">
                Get Support
              </Button>
            </a>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}