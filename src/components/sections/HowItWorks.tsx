interface Step {
  number: number;
  title: string;
  description: string;
  emoji: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    emoji: "⚙️",
    title: "Choose Model",
    description: "Browse our range of rapid roller doors designed for Australian conditions.",
  },
  {
    number: 2,
    emoji: "📏",
    title: "Customise Size & Specs",
    description: "Select custom widths, heights, materials and insulation options.",
  },
  {
    number: 3,
    emoji: "📄",
    title: "Quote & Purchase",
    description: "Receive a tailored quote and lead times direct from our factory partners.",
  },
  {
    number: 4,
    emoji: "🚚",
    title: "Ship Australia-wide",
    description: "Fast delivery across all states with express options available.",
  },
  {
    number: 5,
    emoji: "🔧",
    title: "Install & Support",
    description: "Local installation partners plus 24/7 emergency breakdown support.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-container-low relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-text-primary) 0, var(--color-text-primary) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <span className="font-label text-secondary mb-4 block">The Process</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-text-primary tracking-tight">
            Simple End-to-End Delivery
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto">
            From technical consultation to installation support, every step is designed for speed and confidence.
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-px bg-outline-variant/40" />
            <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-secondary to-secondary/0" />

            <div className="grid grid-cols-5 gap-8">
              {STEPS.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center hover:border-secondary/50 transition-colors">
                      <span className="text-5xl">{step.emoji}</span>
                    </div>
                    <div className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-lg font-headline font-bold text-text-primary mb-2">{step.title}</h3>

                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-8">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center flex-shrink-0 hover:border-secondary/50 transition-colors">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-outline-variant/40 mt-3" />
                )}
              </div>

              <div className="pb-8">
                <span className="text-xs text-secondary font-bold">Step {step.number}</span>
                <h3 className="text-lg font-headline font-bold text-text-primary mt-1">{step.title}</h3>
                <p className="text-sm text-text-muted mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
