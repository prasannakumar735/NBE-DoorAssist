import { MagneticButton, Reveal, SectionLabel } from "@/components/premium/Motion";

const SERVICES = [
  { title: "Emergency Repairs", desc: "Priority response for failed doors and dock downtime." },
  { title: "Maintenance", desc: "Scheduled care that extends cycle life and safety." },
  { title: "Inspection", desc: "Documented condition reports for compliance and planning." },
  { title: "Preventive Maintenance", desc: "Predictive intervals tuned to traffic profiles." },
  { title: "Annual Contracts", desc: "Site-wide coverage with SLA-backed attendance." },
  { title: "Book Technician", desc: "Request a certified technician for your facility." },
];

export default function Service() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Service</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl">
            Uptime is the product.
          </h1>
          <p className="mt-5 max-w-xl text-muted text-lg font-light">
            Emergency repairs, inspections and annual contracts — Australia-wide.
          </p>
          <div className="mt-8">
            <MagneticButton to="/contact" dark>
              Book Technician
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white p-8 md:p-10">
              <h2 className="font-display text-xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-3 text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
