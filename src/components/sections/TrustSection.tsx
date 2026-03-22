import Image from "next/image";

interface Badge {
  emoji: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

const BADGES: Badge[] = [
  {
    emoji: "✓",
    title: "5-Year Warranty",
    description: "Comprehensive coverage on all doors",
  },
  {
    emoji: "🏭",
    title: "Factory Direct",
    description: "No middlemen — factory-direct supply and support",
  },
  {
    emoji: "⚡",
    title: "Fast Lead Times",
    description: "As quick as 48hr express delivery",
  },
  {
    emoji: "👥",
    title: "Install Partners",
    description: "Nationwide certified installers",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "drooov delivered our cold storage rapid doors 3 weeks ahead of schedule. Outstanding quality and the install team was professional.",
    name: "Michael Chen",
    role: "Facilities Manager, ColdChain Logistics",
    rating: 5,
  },
  {
    quote:
      "We fitted 12 high-speed doors across our distribution centre. The speed difference is incredible — productivity up 20%.",
    name: "Sarah Williams",
    role: "Operations Director, AusFreight",
    rating: 5,
  },
  {
    quote:
      "Best quality we found in Australia. Direct factory sourcing makes a real difference. Will be ordering again for our next warehouse.",
    name: "James Morton",
    role: "Procurement Manager, BuildCorp",
    rating: 5,
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          alt="Industrial warehouse background"
          fill
          className="object-cover opacity-25"
          unoptimized
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-label mb-4 block text-brand">Why drooov</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-primary tracking-tight">
            Trusted Across Australia
          </h2>
          <p className="text-on-primary/85 mt-4 max-w-2xl mx-auto">
            Enterprise facilities teams choose drooov for quality engineering, clear lead times, and dependable support.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {BADGES.map((badge) => (
            <div
              key={badge.title}
              className="rounded-lg border border-on-primary/20 bg-on-primary/10 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-brand/45"
            >
              <div className="w-14 h-14 mx-auto rounded-lg bg-secondary/20 flex items-center justify-center mb-4 text-3xl">
                {badge.emoji}
              </div>
              <h3 className="text-on-primary font-headline font-bold mb-1">{badge.title}</h3>
              <p className="text-sm text-on-primary/75">{badge.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-headline font-bold text-on-primary text-center mb-10">
          What Our Clients Say
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-lg border border-on-primary/20 bg-on-primary/10 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand/40"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} className="text-sm text-brand">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-on-primary/90 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div>
                <div className="text-on-primary font-semibold text-sm">{testimonial.name}</div>
                <div className="text-on-primary/60 text-xs">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
