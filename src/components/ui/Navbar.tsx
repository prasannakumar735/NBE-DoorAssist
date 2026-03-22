"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RAPID_FAMILIES, RAPID_PRODUCTS, rapidProductHref } from "@/lib/rapid-roller-catalog";
import { PVC_INDUSTRIES, PVC_PRODUCTS } from "@/lib/pvc-strip-catalog";

const quoteCtaClass =
  "inline-flex items-center justify-center rounded-md bg-[#FC8347] px-6 py-2 text-sm font-semibold text-white hover:opacity-90 sm:py-2.5";

function activeForPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function linkClass(active: boolean): string {
  return `shrink-0 border-b-2 pb-0.5 font-body text-xs font-medium transition-all duration-200 lg:text-sm ${
    active
      ? "border-[#FC8347] text-[#FC8347]"
      : "border-transparent text-text-primary hover:border-outline-variant hover:text-[#FC8347]"
  }`;
}

function MainNavLinks({ pathname }: { pathname: string }) {
  const main = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ] as const;
  return (
    <>
      {main.map((item) => (
        <Link key={item.href} href={item.href} className={linkClass(activeForPath(pathname, item.href))}>
          {item.label}
        </Link>
      ))}
      <Link href="/contact" className={linkClass(activeForPath(pathname, "/contact"))}>
        Get Quote
      </Link>
    </>
  );
}

function RapidMegaMenu({ pathname }: { pathname: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 hidden justify-center overflow-visible md:flex">
      <div className="pointer-events-auto flex items-center gap-6 lg:gap-8">
        <Link href="/rapid-roller-doors" className={linkClass(pathname === "/rapid-roller-doors")}>
          Overview
        </Link>
        <div className="relative group">
          <span className="flex cursor-default items-center gap-0.5 border-b-2 border-transparent pb-0.5 font-body text-xs font-medium text-text-primary lg:text-sm">
            Door families
            <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </span>
          <div
            className="invisible absolute left-1/2 top-full z-[60] mt-2 w-[min(100vw-2rem,900px)] -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            role="menu"
          >
            <div className="grid grid-cols-2 gap-0 rounded-lg border border-gray-200 bg-white shadow-lg lg:grid-cols-4">
              {RAPID_FAMILIES.map((fam) => {
                const items = RAPID_PRODUCTS.filter((p) => p.family === fam.id);
                return (
                  <div key={fam.id} className="border-b border-gray-100 p-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                    <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-[#FC8347]">{fam.label}</p>
                    <p className="mb-3 text-xs text-gray-500">{fam.description}</p>
                    <ul className="space-y-1.5">
                      {items.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={rapidProductHref(p)}
                            className="block rounded px-1 py-1 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#FC8347]"
                            role="menuitem"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Link href="/contact" className={linkClass(activeForPath(pathname, "/contact"))}>
          Get Quote
        </Link>
      </div>
    </div>
  );
}

function PvcNavLinks({ pathname }: { pathname: string }) {
  const base = pathname.startsWith("/pvc-strip-curtains");
  return (
    <div className="pointer-events-none absolute inset-x-0 hidden justify-center overflow-visible md:flex">
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 lg:gap-6">
        <div className="relative group">
          <span className="flex cursor-default items-center gap-0.5 border-b-2 border-transparent pb-0.5 font-body text-xs font-medium text-text-primary lg:text-sm">
            Products
            <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </span>
          <div className="invisible absolute left-0 top-full z-[60] min-w-[240px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <Link
                href="/pvc-strip-curtains"
                className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#FC8347]"
              >
                All PVC products
              </Link>
              {PVC_PRODUCTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pvc-strip-curtains/${p.slug}`}
                  className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#FC8347]"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="relative group">
          <span className="flex cursor-default items-center gap-0.5 border-b-2 border-transparent pb-0.5 font-body text-xs font-medium text-text-primary lg:text-sm">
            Industry
            <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </span>
          <div className="invisible absolute left-0 top-full z-[60] min-w-[220px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              {PVC_INDUSTRIES.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/pvc-strip-curtains/industry/${ind.id}`}
                  className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#FC8347]"
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/pvc-strip-curtains/bulk-rolls"
          className={linkClass(base && pathname.includes("bulk-rolls"))}
        >
          Buy bulk rolls
        </Link>
        <Link
          href="/pvc-strip-curtains/help/buying"
          className={linkClass(base && pathname.includes("help"))}
        >
          Help on buying
        </Link>
        <Link href="/contact" className={linkClass(activeForPath(pathname, "/contact"))}>
          Get Quote
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isRapid = pathname.startsWith("/rapid-roller-doors");
  const isPvc = pathname.startsWith("/pvc-strip-curtains");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-outline-variant/25 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-8">
        <Link
          href="/"
          className="relative z-10 shrink-0 font-headline text-base font-bold tracking-tight text-text-primary"
          onClick={() => setMobileOpen(false)}
        >
          drooov
        </Link>

        {isRapid ? (
          <RapidMegaMenu pathname={pathname} />
        ) : isPvc ? (
          <PvcNavLinks pathname={pathname} />
        ) : (
          <nav
            className="pointer-events-none absolute inset-x-0 hidden justify-center overflow-visible md:flex"
            aria-label="Primary"
          >
            <div className="pointer-events-auto flex items-center gap-4 lg:gap-6 xl:gap-8">
              <MainNavLinks pathname={pathname} />
            </div>
          </nav>
        )}

        <div className="relative z-10 ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className={`hidden sm:inline-flex ${quoteCtaClass}`}>
            {isRapid || isPvc ? "Request quote" : "Get Quote"}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-primary hover:bg-surface-container-low md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{mobileOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="site-mobile-nav"
          className="max-h-[85vh] overflow-y-auto border-t border-outline-variant/25 bg-background/95 px-8 py-4 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          {isRapid ? (
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/rapid-roller-doors" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Overview
                </Link>
              </li>
              {RAPID_FAMILIES.map((fam) => (
                <li key={fam.id} className="border-t border-gray-100 pt-2">
                  <span className="text-xs font-bold uppercase text-[#FC8347]">{fam.label}</span>
                  <ul className="mt-1 pl-2">
                    {RAPID_PRODUCTS.filter((p) => p.family === fam.id).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={rapidProductHref(p)}
                          className="block py-1.5 text-sm text-gray-700"
                          onClick={() => setMobileOpen(false)}
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li>
                <Link href="/contact" className={`mt-2 flex w-full justify-center ${quoteCtaClass} py-3`} onClick={() => setMobileOpen(false)}>
                  Get Quote
                </Link>
              </li>
            </ul>
          ) : isPvc ? (
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-xs font-bold uppercase text-gray-500">Products</span>
                <Link href="/pvc-strip-curtains" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>
                  All PVC products
                </Link>
                {PVC_PRODUCTS.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/pvc-strip-curtains/${p.slug}`}
                    className="block py-1.5 pl-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {p.name}
                  </Link>
                ))}
              </li>
              <li className="border-t pt-2">
                <span className="text-xs font-bold uppercase text-gray-500">Industry</span>
                {PVC_INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.id}
                    href={`/pvc-strip-curtains/industry/${ind.id}`}
                    className="block py-1.5 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {ind.label}
                  </Link>
                ))}
              </li>
              <li>
                <Link href="/pvc-strip-curtains/bulk-rolls" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Buy bulk rolls
                </Link>
              </li>
              <li>
                <Link href="/pvc-strip-curtains/help/buying" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Help on buying
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`mt-2 flex w-full justify-center ${quoteCtaClass} py-3`} onClick={() => setMobileOpen(false)}>
                  Get Quote
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`mt-2 flex w-full justify-center ${quoteCtaClass} py-3`} onClick={() => setMobileOpen(false)}>
                  Get Quote
                </Link>
              </li>
            </ul>
          )}
        </nav>
      ) : null}
    </header>
  );
}
