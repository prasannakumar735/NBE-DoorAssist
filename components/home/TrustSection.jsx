import { motion } from "framer-motion";
import { ShieldCheck, Factory, Clock, Users, Star } from "lucide-react";
import ScrollReveal from "../motion/ScrollReveal";
import ParallaxSection from "../motion/ParallaxSection";

const badges = [
  { icon: ShieldCheck, title: "5-Year Warranty", desc: "Comprehensive coverage on all doors" },
  { icon: Factory, title: "Factory Direct", desc: "No middlemen, best pricing guaranteed" },
  { icon: Clock, title: "Fast Lead Times", desc: "As quick as 48hr express delivery" },
  { icon: Users, title: "Install Partners", desc: "Nationwide certified installers" },
];

const testimonials = [
  {
    quote: "drooov delivered our cold storage rapid doors 3 weeks ahead of schedule. Outstanding quality and the install team was professional.",
    name: "Michael Chen",
    role: "Facilities Manager, ColdChain Logistics",
    rating: 5,
  },
  {
    quote: "We fitted 12 high-speed doors across our distribution centre. The speed difference is incredible — productivity up 20%.",
    name: "Sarah Williams",
    role: "Operations Director, AusFreight",
    rating: 5,
  },
  {
    quote: "Best pricing we found in Australia. Direct factory sourcing makes a real difference. Will be ordering again for our next warehouse.",
    name: "James Morton",
    role: "Procurement Manager, BuildCorp",
    rating: 5,
  },
];

export default function TrustSection() {
  return (
    <ParallaxSection
      className="py-24"
      bgImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Trust badges */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Why drooov
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Trusted Across Australia
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {badges.map((badge, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <badge.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-white font-bold mb-1">{badge.title}</h3>
                <p className="text-sm text-slate-400">{badge.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials */}
        <ScrollReveal>
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            What Our Clients Say
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}