import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Technical", href: "/technical" },
  { label: "Compliance", href: "/compliance" },
  { label: "Support", href: "/support" },
  { label: "Get Quote", href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

const COPYRIGHT_YEAR = 2026;

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56v12h3.38v-12ZM5.25 2.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.92c0-3.64-1.95-5.33-4.56-5.33-2.1 0-3.04 1.16-3.56 1.97V8.5H8.94v12h3.38v-6.69c0-1.76.33-3.46 2.51-3.46 2.15 0 2.18 2.02 2.18 3.57v6.58H20.4v-6.58h.04Z" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 4.99 3.66 9.13 8.44 9.9v-7h-2.54v-2.9h2.54V9.86c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.26 0-1.65.79-1.65 1.6v1.92h2.81l-.45 2.9h-2.36v7C18.34 21.2 22 17.06 22 12.07Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.57 1.73a4.02 4.02 0 0 0-2.28-.65H9.96a4.02 4.02 0 0 0-2.28.65 4.02 4.02 0 0 0-1.45 1.45 4.02 4.02 0 0 0-.65 2.28v6.08a4.02 4.02 0 0 0 .65 2.28 4.02 4.02 0 0 0 1.45 1.45 4.02 4.02 0 0 0 2.28.65h4.08a4.02 4.02 0 0 0 2.28-.65 4.02 4.02 0 0 0 1.45-1.45 4.02 4.02 0 0 0 .65-2.28V7.46a4.02 4.02 0 0 0-.65-2.28 4.02 4.02 0 0 0-1.45-1.45ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm4.75-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-3" aria-label="drooov home">
              <span className="font-headline text-xl font-bold uppercase tracking-tight text-gray-800">drooov</span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-gray-600">
              Industrial rapid roller doors for high-cycle Australian facilities. Factory-direct supply, certified
              installation partners, and nationwide support.
            </p>

            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: "500+", l: "Projects" },
                { v: "48hr", l: "Express" },
                { v: "5 Yr", l: "Warranty" },
                { v: "AU", l: "Nationwide" },
              ].map((x) => (
                <div key={x.l} className="rounded-lg border border-gray-100 bg-background px-4 py-3 text-center">
                  <p className="font-headline text-base font-bold text-gray-900">{x.v}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">{x.l}</p>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="mb-4 font-headline text-sm font-bold text-gray-900">Quick Links</h2>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="block text-sm text-gray-600 transition-colors hover:text-[#FC8347]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Footer contact information">
            <h2 className="mb-4 font-headline text-sm font-bold text-gray-900">Contact</h2>
            <address className="not-italic space-y-2 text-sm text-gray-600">
              <Link href="mailto:support@drooov.com.au" className="block hover:text-[#FC8347]">
                support@drooov.com.au
              </Link>
              <Link href="tel:1300376668" className="block hover:text-[#FC8347]">
                1300 DROOOV
              </Link>
              <p>Australia-wide</p>
            </address>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-[#FC8347] hover:text-[#FC8347]"
                >
                  <SocialIcon label={social.label} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 text-center text-xs text-gray-500">
          © {COPYRIGHT_YEAR} drooov. All rights reserved. Industrial rapid roller doors — engineered for Australia.
        </div>
      </div>
    </footer>
  );
}
