import { createPageUrl } from "@/utils";

const cards = [
  {
    icon: "folder_managed",
    step: "01",
    title: "CAD Archive",
    description:
      "Direct access to BIM and CAD architectural files for seamless project integration.",
    cta: "Launch Library",
    href: () => createPageUrl("Products"),
  },
  {
    icon: "dynamic_feed",
    step: "02",
    title: "Real-Time Support",
    description:
      "Engineers standing by for mission-critical troubleshooting and system calibration.",
    cta: "Open Portal",
    href: () => `mailto:support@drooov.com.au`,
  },
  {
    icon: "encrypted",
    step: "03",
    title: "ISO Protocols",
    description:
      "Full compliance certifications for pharmaceutical and cold-chain environmental standards.",
    cta: "Certifications",
    href: () => createPageUrl("Quote"),
  },
];

export default function IndustrialHighlights() {
  return (
    <section className="px-8 md:px-20 py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div
            key={card.step}
            className="p-10 bg-surface-low border-t-4 border-transparent hover:border-brand transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="material-symbols-outlined text-brand text-4xl">{card.icon}</span>
              <span className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest">
                {card.step}
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-4 uppercase tracking-tighter">
              {card.title}
            </h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed font-light">
              {card.description}
            </p>
            <a
              href={card.href()}
              className="text-[0.65rem] font-bold text-brand uppercase tracking-[0.2em] flex items-center group-hover:translate-x-2 transition-transform"
            >
              {card.cta}{" "}
              <span className="material-symbols-outlined text-sm ml-2">east</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
