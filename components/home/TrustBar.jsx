import { ShieldCheck, Truck, Headset } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "500+ Doors Installed", desc: "Proven on busy industrial sites." },
  { icon: Truck, title: "48hr Turnaround", desc: "Fast quoting and lead times." },
  { icon: Headset, title: "24/7 Support", desc: "Ongoing service when you need it." },
];

export default function TrustBar() {
  return (
    <section className="bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/30 px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-white font-semibold leading-tight">{item.title}</div>
                  <div className="text-sm text-slate-300/70 leading-tight mt-0.5">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

