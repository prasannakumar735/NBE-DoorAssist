const REASONS = [
  {
    title: "Industrial-first engineering",
    description:
      "Door systems selected for high-cycle use, uptime reliability, and safer operations under heavy daily traffic.",
  },
  {
    title: "Factory-direct value",
    description:
      "Clear options and specifications that suit operational requirements without compromising performance.",
  },
  {
    title: "National support network",
    description:
      "Australia-wide guidance, installation partners, and post-installation support when response time matters.",
  },
  {
    title: "Project-ready consultation",
    description:
      "Technical recommendations for dimensions, application fit, and site constraints before ordering.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-surface-container-low border-y border-outline-variant/30">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="font-label text-secondary mb-3">Why Choose drooov</p>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-text-primary leading-tight">
              Built Like a Premium Industrial Partner
            </h2>
            <p className="text-text-muted mt-5 text-lg leading-relaxed max-w-xl">
              We combine practical project advice with premium product quality to deliver rapid roller door outcomes that
              feel seamless from quote to commissioning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map((reason) => (
              <article
                key={reason.title}
                className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-5 hover:border-secondary/40 transition-colors"
              >
                <h3 className="text-text-primary font-headline font-semibold text-base">{reason.title}</h3>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
