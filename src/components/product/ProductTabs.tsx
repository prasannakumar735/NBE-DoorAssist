"use client";

import { useMemo, useState } from "react";
import ProductSpecs from "@/src/components/product/ProductSpecs";
import type { ProductSpec } from "@/src/lib/product-detail";

interface ProductTabsProps {
  description: string;
  specs: ProductSpec[];
  downloads?: string[];
}

type TabKey = "description" | "specifications" | "downloads";

function formatDescription(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export default function ProductTabs({ description, specs, downloads = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const descriptionBlocks = useMemo(() => formatDescription(description), [description]);

  return (
    <section className="mt-12">
      <div className="border-b border-outline-variant/40 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "description", label: "Description" },
            { key: "specifications", label: "Specifications" },
            { key: "downloads", label: "Downloads" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium border border-b-0 transition-colors ${
                activeTab === tab.key
                  ? "bg-surface-container-lowest text-text-primary border-outline-variant/50"
                  : "bg-transparent text-text-muted border-transparent hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-6">
        {activeTab === "description" && (
          <div className="space-y-4 text-text-muted leading-relaxed">
            {descriptionBlocks.length > 0 ? (
              descriptionBlocks.map((block, index) => (
                <p key={index}>{block}</p>
              ))
            ) : (
              <p>No detailed description available.</p>
            )}
          </div>
        )}

        {activeTab === "specifications" && <ProductSpecs specs={specs} />}

        {activeTab === "downloads" && (
          <div className="space-y-3">
            {downloads.length > 0 ? (
              downloads.map((download) => (
                <a
                  key={download}
                  href={download}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-secondary hover:text-primary"
                >
                  {download}
                </a>
              ))
            ) : (
              <p className="text-text-muted">No downloads available for this product.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
