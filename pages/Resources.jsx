import { Reveal, SectionLabel } from "@/components/premium/Motion";

const RESOURCES = [
  { cat: "Brochures", items: ["Rapid Roller Series", "PVC Strip Curtains", "Dock Systems"] },
  { cat: "Certificates", items: ["ISO Quality", "Safety Compliance", "Material Datasheets"] },
  { cat: "CAD / BIM", items: ["DWG Details", "Revit Families", "IFC Objects"] },
  { cat: "Guides", items: ["Installation", "Technical Manuals", "Service Videos"] },
];

export default function Resources() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Resource Centre</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight">Download Centre</h1>
          <p className="mt-4 max-w-xl text-muted-foreground text-lg font-light">
            Brochures, certificates, CAD, BIM, installation guides and technical manuals.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {RESOURCES.map((block) => (
            <section key={block.cat}>
              <h2 className="font-display text-2xl font-bold tracking-tight border-b border-line pb-4">{block.cat}</h2>
              <ul className="mt-2">
                {block.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between py-5 border-b border-line text-left hover:text-brand transition-colors group"
                    >
                      <span className="font-display font-semibold text-lg">{item}</span>
                      <span className="font-display text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-muted-foreground group-hover:text-brand">
                        Download
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
