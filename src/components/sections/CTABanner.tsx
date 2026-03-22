import Button from "@/src/components/ui/Button";

export default function CTABanner() {
  return (
    <section id="quote" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0, white 1px, transparent 0, transparent 10px)",
          }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 text-center relative z-10">
        <p className="text-on-primary/80 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          Premium Project Quote
        </p>
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-primary mb-4 tracking-tight">
          Ready to Upgrade Your Facility Doors?
        </h2>
        <p className="text-on-primary/85 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Get a tailored proposal with model recommendations, lead times, and installation options for your site.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="/contact"
            className="group px-10 py-6 text-base font-bold"
          >
            Get My Custom Quote
            <span className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Button>
          <Button
            href="/products"
            variant="outline"
            className="border-on-primary/40 px-10 py-6 text-base font-bold text-on-primary hover:border-on-primary/60 hover:bg-on-primary/10"
          >
            Browse Products
          </Button>
        </div>
      </div>
    </section>
  );
}
