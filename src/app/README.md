# App Router (`src/app`)

This project uses the **Next.js `src` directory** layout. The App Router root is **`src/app`**, which is equivalent to a top-level `app/` folder in projects that do not use `src/`.

## Route map

| URL | File |
|-----|------|
| `/` | [`page.tsx`](./page.tsx) |
| `/products` | [`products/page.tsx`](./products/page.tsx) |
| `/products/[slug]` | [`products/[slug]/page.tsx`](./products/[slug]/page.tsx) |
| `/contact` | [`contact/page.tsx`](./contact/page.tsx) |
| `/solutions` | [`solutions/page.tsx`](./solutions/page.tsx) |
| `/quote` | *redirects to `/contact`* (`next.config.ts`) |
| `/cold-storage` | *redirects to `/solutions`* (`next.config.ts`) |
| `/technical` | [`technical/page.tsx`](./technical/page.tsx) |
| `/compliance` | [`compliance/page.tsx`](./compliance/page.tsx) |
| `/support` | [`support/page.tsx`](./support/page.tsx) |

## Other routes

| URL | File |
|-----|------|
| `/enquiry` | [`enquiry/page.tsx`](./enquiry/page.tsx) |

## Root layout

[`layout.tsx`](./layout.tsx) wraps all routes (fonts, global styles, shell UI).

## API routes

| Path | File |
|------|------|
| `/api/quote` | [`api/quote/route.ts`](./api/quote/route.ts) |
