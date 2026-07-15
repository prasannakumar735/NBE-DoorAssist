import { ClipboardCheck, Wrench, Settings2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal from "../motion/ScrollReveal";
import { motion } from "framer-motion";

const features = [
  { icon: ClipboardCheck, title: "Rapid Door Inspections", desc: "Scheduled inspections to keep doors compliant and reliable" },
  { icon: Settings2, title: "Preventive Maintenance", desc: "Maintenance programs to maximise door lifespan" },
  { icon: Wrench, title: "Door Repairs", desc: "Repairs and replacement components for existing installations" },
  { icon: Layers, title: "Replacement PVC Strips", desc: "PVC curtain replacement and made-to-size strip supply" },
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
            <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
              Service &amp; Support
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 font-heading">
              Support for Rapid Doors &amp; PVC Strip Curtains
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              From industrial door servicing to replacement PVC strips, Drooov supports products throughout their operating life.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={createPageUrl("Service")}>
                <Button size="lg" className="bg-brand hover:bg-brandDark text-white px-8 py-6 rounded-xl font-semibold">
                  Explore Service &amp; Support
                </Button>
              </a>
              <a href={createPageUrl("Service")}>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl font-semibold">
                  Book a Service
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-brand" />
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