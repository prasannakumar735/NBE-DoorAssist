import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Rapid roller doors",
    blurb: "High-speed fabric and metal curtains for docks, warehouses, and climate-controlled logistics.",
    exploreHref: "/rapid-roller-doors",
    readMoreHref: "/rapid-roller-doors/high-speed-fabric-rapid-door",
  },
  {
    title: "PVC swing doors",
    blurb: "Impact-rated swing panels for chillers, clean corridors, and high-frequency pedestrian traffic.",
    exploreHref: "/rapid-roller-doors",
    readMoreHref: "/pvc-strip-curtains/pvc-swing-doors",
  },
  {
    title: "Freezer doors",
    blurb: "Insulated rapid closures that limit frost ingress and protect cold-chain energy performance.",
    exploreHref: "/rapid-roller-doors",
    readMoreHref: "/rapid-roller-doors/insulated-freezer-rapid-door",
  },
  {
    title: "Sectional doors",
    blurb: "Panel lift systems for wide factory openings with optional glazing and weather sealing.",
    exploreHref: "/rapid-roller-doors",
    readMoreHref: "/rapid-roller-doors/industrial-sectional-panel-door",
  },
];

export default function HomeProductTypeCards() {
  return (
    <section className="border-t border-[#e0c0b1]/20 bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-[#191c1f] md:text-4xl">
          Door systems by type
        </h2>
        <p className="mb-12 max-w-2xl font-body text-[#584237]">
          Explore our Rapid Roller range — each category links to specification pages on this site (not an external catalogue).
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="home-highlight-card flex cursor-pointer flex-col rounded-sm border border-[#e0c0b1]/30 bg-[#fbf9f8] p-6 shadow-sm hover:border-[#FC8347]/40"
            >
              <h3 className="mb-3 font-headline text-lg font-bold text-[#191c1f]">{c.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#584237]">{c.blurb}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href={c.exploreHref}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#FC8347] hover:underline"
                >
                  Explore more
                  <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link href={c.readMoreHref} className="text-xs font-semibold text-[#584237] underline-offset-4 hover:text-[#FC8347] hover:underline">
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
