import { Link } from "react-router-dom";
import { PROJECTS } from "@/lib/siteContent";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

export default function Projects() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl text-balance">
            Projects that move industry.
          </h1>
        </Reveal>
      </div>

      <div className="mt-16 space-y-0">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className={i % 2 === 0 ? "bg-ink text-white" : "bg-white text-ink"}>
            <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-0 items-stretch">
              <div className={`min-h-[50vh] lg:min-h-[70vh] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div
                className={`flex flex-col justify-center py-16 md:py-24 px-0 lg:px-12 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <Reveal>
                  <p className="font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent">
                    {p.industry} · {p.location}
                  </p>
                  <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-tight">{p.title}</h2>
                  <p className="mt-4 text-sm opacity-60">{p.product}</p>
                  <dl className="mt-10 space-y-6">
                    <div>
                      <dt className="font-display text-[0.65rem] font-semibold tracking-[0.16em] uppercase opacity-40">
                        Challenge
                      </dt>
                      <dd className="mt-2 text-lg font-light opacity-80">{p.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-[0.65rem] font-semibold tracking-[0.16em] uppercase opacity-40">
                        Result
                      </dt>
                      <dd className="mt-2 text-lg font-light opacity-80">{p.result}</dd>
                    </div>
                  </dl>
                  <p className="mt-10 font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase opacity-50">
                    Before &amp; After gallery available on request
                  </p>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12 pt-20 text-center">
        <Link
          to="/quote-builder"
          className="inline-flex px-8 py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-accent transition-colors"
        >
          Start your project
        </Link>
      </div>
    </div>
  );
}
