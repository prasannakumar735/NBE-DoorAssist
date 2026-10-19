import Image from "next/image";

export default function DoorAssistLanding() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <Image
            src="/NBE_Door_Assist_Logo.png"
            alt="NBE Door Assist"
            width={220}
            height={80}
            className="object-contain"
            priority
          />

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Coming Soon — Currently in Planning Stage
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
            Smart Control for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Industrial Doors
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            NBE Door Assist connects your rapid roller doors to a unified platform —
            monitor door health, diagnose faults remotely, and control access from
            anywhere in Australia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors cursor-not-allowed opacity-80">
              Notify Me When Live
            </button>
            <a
              href="https://drooov.vercel.app"
              className="px-7 py-3 rounded-lg border border-white/20 hover:border-white/40 font-semibold transition-colors"
            >
              Visit NBE Doors →
            </a>
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-6">
        {/* Pillar 1 — Field Monitoring */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5 hover:border-blue-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-2xl">
            🔌
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Door Health Monitoring</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Communicate directly with door control panels, VAS drivers and PLC
              systems across Melbourne and greater Australia. Get real-time fault
              codes before dispatching a technician — so the right parts arrive
              on the first visit.
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            {[
              "Live fault code readout from PLC",
              "Door health dashboard per site",
              "Technician prep — know what to carry",
              "Breakdown alert to manager instantly",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-block text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 w-fit">
            In Development
          </span>
        </div>

        {/* Pillar 2 — Remote Access */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5 hover:border-cyan-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/20 flex items-center justify-center text-2xl">
            📱
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Remote Door Control</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Factory managers and supervisors can open, close or lock any
              integrated rapid door from anywhere in the world — perfect for
              food processing plants, cold storage facilities and warehouses
              running multiple access points.
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            {[
              "Open / close / lock from any device",
              "Multi-door, multi-site dashboard",
              "Role-based access — manager vs. supervisor",
              "Full audit log of who did what, when",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-block text-xs text-green-400 border border-green-500/30 rounded-full px-3 py-1 w-fit">
            Prototype Ready
          </span>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/3 border-y border-white/10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-400">One platform. Two powerful capabilities.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              step: "01",
              title: "Install & Integrate",
              desc: "NBE technicians integrate Door Assist with your door's control panel and PLC during installation or upgrade.",
            },
            {
              step: "02",
              title: "Connect to Platform",
              desc: "Doors register to your site dashboard. Managers get invited to the app with role-based access controls.",
            },
            {
              step: "03",
              title: "Monitor & Control",
              desc: "Real-time health status, fault alerts and remote open/close commands — all from your phone or browser.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <span className="text-4xl font-black text-blue-500/30">{step}</span>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-10">Built For</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "🥶", label: "Cold Storage" },
            { icon: "🏭", label: "Warehousing" },
            { icon: "🍖", label: "Food Processing" },
            { icon: "🚛", label: "Distribution Centres" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center gap-3 text-center"
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-sm font-medium text-gray-200">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 rounded-2xl px-8 py-12 flex flex-col items-center gap-5">
          <h2 className="text-3xl font-bold">Interested in Door Assist?</h2>
          <p className="text-gray-400">
            Get in touch with the NBE Australia team to learn more about the
            Door Assist program and integration timelines.
          </p>
          <a
            href="mailto:info@nbeaustralia.com.au"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
          >
            Contact NBE Australia
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NBE Australia. NBE Door Assist is under active development.
      </footer>
    </div>
  );
}
