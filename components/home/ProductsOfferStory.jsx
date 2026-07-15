import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function ProductsOfferStory() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">Products we offer</h2>

            <h3 className="mt-10 text-lg font-bold text-neutral-900">Rapid roller &amp; industrial doors</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We specify and supply high-cycle rapid doors, insulated freezer closures, sectional panel doors, and PVC
              traffic doors for Australian distribution, food, and manufacturing sites. Each project is matched to opening
              size, wind region, traffic intensity, and control philosophy.
            </p>

            <h3 className="mt-10 text-lg font-bold text-neutral-900">PVC strip curtains</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Cut-to-length strip kits, polar-grade compounds, and rack-mounted assemblies for cool rooms, retail
              back-of-house, and production lines. Colour, strip width, and surface finish are chosen against your
              temperature band and traffic type.
            </p>
            <a
              href={createPageUrl("Products?category=pvc_strip_curtains")}
              className="inline-block mt-6 text-sm font-bold text-brand hover:text-neutral-900"
            >
              Browse PVC strip curtains →
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">Who we are</h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              drooov focuses on industrial door and strip curtain solutions with clear documentation and accountable
              delivery. We work with facility managers, contractors, and owner teams to align product selection with
              operational risk, maintenance access, and energy goals — from first enquiry through installation support.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Project lifecycle</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
