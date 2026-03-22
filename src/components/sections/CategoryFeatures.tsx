import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    title: "Rapid Doors",
    description:
      "High-cycle rapid roller doors designed for logistics, manufacturing, and warehouse throughput.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    href: "/products?category=Rapid",
  },
  {
    title: "High Speed",
    description:
      "Fast open-close performance for temperature control, hygiene zones, and high traffic entry points.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    href: "/products?category=High+Speed",
  },
  {
    title: "Insulated",
    description:
      "Insulated systems that improve thermal efficiency and support cold-chain and controlled environments.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80",
    href: "/products?category=Insulated",
  },
];

export default function CategoryFeatures() {
  return (
    <section id="categories" className="py-24 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-12">
          <p className="font-label text-secondary mb-3">Product Categories</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-text-primary">
            Industrial Door Solutions
          </h2>
          <p className="text-text-muted max-w-3xl mx-auto mt-4">
            Purpose-built systems inspired by modern industrial fit-outs and engineered for Australian conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <article
              key={category.title}
              className="group overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-headline font-bold text-text-primary">{category.title}</h3>
                <p className="text-sm text-text-muted mt-3 min-h-16">{category.description}</p>
                <Link
                  href={category.href}
                  className="inline-flex items-center text-sm font-semibold text-secondary hover:text-primary mt-4"
                >
                  Explore category →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
