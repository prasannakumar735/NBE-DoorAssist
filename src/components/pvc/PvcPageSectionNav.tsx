"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type PvcPageSectionNavItem = {
  id: string;
  label: string;
  Icon?: LucideIcon;
};

const NAV_CLASSES =
  "sticky top-14 z-40 border-b border-[#e0e2e6]/80 bg-[#f7f9fd]/95 shadow-sm backdrop-blur-md";

/**
 * In-page section nav: sticks below the fixed site header (h-14) and highlights
 * the section closest to the top of the viewport while scrolling.
 */
export default function PvcPageSectionNav({
  brandLabel,
  items,
  ariaLabel,
}: {
  brandLabel: string;
  items: readonly PvcPageSectionNavItem[];
  ariaLabel: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const HEADER_PX = 56; // fixed site header h-14
    const SUBNAV_PX = 52; // stuck subnav row
    const ACTIVATE_LINE = HEADER_PX + SUBNAV_PX + 8;

    const pickActive = () => {
      const y = window.scrollY + ACTIVATE_LINE;
      const positioned: { id: string; top: number }[] = [];
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) positioned.push({ id: item.id, top: el.getBoundingClientRect().top + window.scrollY });
      }
      positioned.sort((a, b) => a.top - b.top);
      let current = positioned[0]?.id ?? items[0].id;
      for (const { id, top } of positioned) {
        if (top <= y) current = id;
      }
      setActiveId(current);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);
    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [items]);

  return (
    <div className={NAV_CLASSES}>
      <div className="mx-auto max-w-7xl px-4 md:max-w-[1440px] md:px-8">
        <nav className="flex h-12 items-center gap-1 overflow-x-auto md:h-[52px] md:gap-2" aria-label={ariaLabel}>
          <span className="mr-2 hidden shrink-0 border-r border-[#e0e2e6] pr-3 font-body text-[10px] font-black uppercase tracking-widest text-[#584237] lg:inline">
            {brandLabel}
          </span>
          {items.map(({ id, label, Icon }) => {
            const isActive = activeId === id;
            return (
              <Link
                key={id}
                href={`#${id}`}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-2 py-2 font-body text-xs font-semibold transition-colors md:px-3 md:text-sm ${
                  isActive
                    ? "border-[#FC8347] text-[#FC8347]"
                    : "border-transparent text-[#584237] hover:border-[#FC8347]/40 hover:text-[#FC8347]"
                }`}
              >
                {Icon ? <Icon className="h-4 w-4 shrink-0 text-current" strokeWidth={1.35} aria-hidden /> : null}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
