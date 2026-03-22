import Link from "next/link";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const primaryCta =
  "inline-flex min-w-[200px] items-center justify-center rounded-md bg-[#FC8347] px-8 py-4 text-base font-semibold text-white hover:opacity-90";

const secondaryCtaOnDark =
  "inline-flex min-w-[200px] items-center justify-center rounded-md border border-white/40 px-8 py-4 text-base font-semibold text-white hover:bg-white/10";

export default function CTASection({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Request Quote",
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="border-t border-gray-100 bg-[#051125] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 font-body text-lg leading-relaxed text-white/85">{description}</p>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref} className={primaryCta}>
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className={secondaryCtaOnDark}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
