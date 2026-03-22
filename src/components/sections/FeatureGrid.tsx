interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3;
}

export default function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridClass =
    columns === 2
      ? "grid grid-cols-1 gap-8 md:grid-cols-2"
      : "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={gridClass}>
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-xl border border-gray-100 bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          {feature.icon ? (
            <div className="mb-4 text-2xl" aria-hidden>
              {feature.icon}
            </div>
          ) : null}
          <h3 className="font-headline text-lg font-bold text-text-primary">{feature.title}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{feature.description}</p>
        </article>
      ))}
    </div>
  );
}
