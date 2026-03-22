interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted font-body">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-headline text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-text-muted font-body">{subtitle}</p>
      ) : null}
    </div>
  );
}
