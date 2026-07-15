import { motion } from "framer-motion";
import { Search, ListChecks, SlidersHorizontal, LifeBuoy } from "lucide-react";
import ScrollReveal from "../motion/ScrollReveal";

const steps = [
  {
    icon: Search,
    title: "Explore",
    description: "Browse Rapid Roller Doors and PVC Strip Curtain solutions.",
  },
  {
    icon: ListChecks,
    title: "Compare",
    description: "Review product applications, features and technical information.",
  },
  {
    icon: SlidersHorizontal,
    title: "Configure or Enquire",
    description: "Configure a PVC curtain or submit your industrial door requirements.",
  },
  {
    icon: LifeBuoy,
    title: "Get Product Support",
    description: "Our team reviews your application and assists with the next step.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-4 block">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading">
              How Drooov Works
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-0 right-0 h-px bg-slate-700" />
            <motion.div
              className="absolute top-12 left-0 h-px bg-gradient-to-r from-brand to-brand/0"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-24 h-24 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 relative"
                    >
                      <step.icon className="w-10 h-10 text-brand" />
                      <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="left">
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-brand" />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-3" />}
                </div>
                <div className="pb-8">
                  <span className="text-xs text-brand font-bold">Step {i + 1}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{step.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}