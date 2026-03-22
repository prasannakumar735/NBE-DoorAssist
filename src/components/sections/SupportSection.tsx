import Link from "next/link";
import Button from "@/src/components/ui/Button";

interface Feature {
  emoji: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    emoji: "📍",
    title: "Australia-wide Partners",
    description: "Certified installers in every state and territory",
  },
  {
    emoji: "☎️",
    title: "24/7 Emergency Support",
    description: "Breakdown assistance available around the clock",
  },
  {
    emoji: "🔧",
    title: "Spare Parts Available",
    description: "Genuine replacement parts shipped express",
  },
  {
    emoji: "📦",
    title: "Maintenance Programs",
    description: "Preventative maintenance to maximise door lifespan",
  },
];

export default function SupportSection() {
  return (
    <section id="support" className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label text-secondary mb-4 block">Installation & Support</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-text-primary tracking-tight mb-6">
              Ongoing Service That Protects Uptime
            </h2>
            <p className="text-text-muted text-lg mb-10 leading-relaxed">
              From commissioning to preventive maintenance, our nationwide support network helps your rapid doors run reliably in high-demand environments.
            </p>
            <Button
              href="/contact"
              className="px-8 py-5"
            >
              Talk to a Specialist
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface-container-lowest backdrop-blur-sm border border-outline-variant/40 rounded-lg p-6 hover:border-secondary/40 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 text-2xl">
                  {feature.emoji}
                </div>
                <h3 className="text-text-primary font-headline font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
