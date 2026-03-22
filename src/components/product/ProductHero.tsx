"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ProductHeroProps {
  title: string;
  category: string;
  imageUrl: string;
  galleryUrls: string[];
}

export default function ProductHero({ title, category, imageUrl, galleryUrls }: ProductHeroProps) {
  const images = useMemo(() => {
    const combined = [imageUrl, ...galleryUrls].filter((item) => item && item.length > 0);
    return Array.from(new Set(combined));
  }, [imageUrl, galleryUrls]);

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="space-y-4">
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-secondary">
              Products
            </Link>
          </li>
          <li>/</li>
          <li className="text-text-muted">{category}</li>
          <li>/</li>
          <li className="text-text-primary font-medium">{title}</li>
        </ol>
      </nav>

      <div className="relative h-[420px] md:h-[520px] rounded-lg border border-outline-variant/40 overflow-hidden bg-surface-container-low">
        <Image
          src={activeImage}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`relative h-20 rounded-lg overflow-hidden border transition-colors ${
                activeImage === image ? "border-secondary ring-2 ring-secondary/30" : "border-outline-variant/40"
              }`}
              aria-label="Select product image"
            >
              <Image
                src={image}
                alt={title}
                fill
                unoptimized
                sizes="160px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
