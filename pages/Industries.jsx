import { Link, useSearchParams } from "react-router-dom";
import { INDUSTRIES } from "@/lib/siteContent";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

export default function Industries() {
  const [params] = useSearchParams();
  const focus = params.get("id");
  const ordered = focus
    ? [...INDUSTRIES].sort((a, b) => (a.id === focus ? -1 : b.id === focus ? 1 : 0))
    : INDUSTRIES;

  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 mb-14">
        <Reveal>
          <SectionLabel>Industries</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl text-balance">
            Image-first solutions by sector.
          </h1>
        </Reveal>
      </div>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 grid md:grid-cols-2 gap-4">
        {ordered.map((ind, i) => (
          <Link
            key={ind.id}
            to="/quote-builder"
            className={`group relative overflow-hidden ${
              i === 0 && focus ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/5] md:aspect-[5/4]"
            }`}
          >
            <img
              src={ind.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-premium group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">{ind.name}</h2>
              <p className="mt-2 text-white/65 max-w-md">{ind.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
