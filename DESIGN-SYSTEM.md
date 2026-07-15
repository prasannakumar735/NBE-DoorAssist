# drooov — Design System Reference

Source of truth for the drooov look & feel. Any new site/page must follow this so it matches the existing website (built with Vite + React 18 + Tailwind 3 + framer-motion).

## Brand colors (tailwind.config.js)

| Token | Hex | Use |
|---|---|---|
| `brand` | `#e0670f` | Primary orange — CTAs, accents, active nav, eyebrow labels |
| `brandDark` | `#b8500a` | CTA hover |
| `brandLight` | `#f5921f` | CTA hover (on dark hero) |
| `ink` | `#1c1a17` | Headings, footer background |
| `surface` / `paper` | `#ffffff` | Page background |
| `surface-low` | `#f7f5f2` | Alternating section background, cards |
| `surface-sunken` | `#efece5` | Deepest background (curtain preview fill) |
| `on-surface-variant` | `#5b5750` | Body/secondary text |
| `line` | `#e4e1d9` | Borders, dividers |
| `steel` | `#4a4e45` | Secondary industrial accent |

Dark hero sections use `bg-slate-900` with `text-slate-300` body copy and glassmorphism panels (`bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl`).

## Typography

- Body: **Roboto** (`font-sans`)
- Headings: **Roboto Condensed** (`font-heading`), bold, `tracking-tight`; hero uses `leading-[0.95]` at `text-5xl`–`text-7xl`
- Spec numbers: **Roboto Mono** via `.font-mono-spec` utility (tabular numerals)
- Eyebrow labels: `text-xs font-bold uppercase tracking-[0.2em] text-brand` above every section heading
- Nav links: `text-xs/sm font-semibold uppercase tracking-widest`, active state = `text-brand border-b-2 border-brand`
- CTAs/buttons: `font-bold text-xs uppercase tracking-[0.15em]`–`[0.2em]`, `rounded-md`

## Section rhythm

- Sections: `py-16 md:py-20`, container `max-w-7xl mx-auto px-6 lg:px-8`, separated with `border-b border-line`
- Backgrounds alternate white / `surface-low`
- Every section header: eyebrow label + `text-3xl md:text-4xl font-heading font-bold tracking-tight` heading, `mb-10`
- Footer: `bg-ink` (near-black), tiny uppercase tracked link columns
- Header: sticky, `bg-white/90 backdrop-blur-md`, brand orange tab bar (`w-2 h-8 bg-brand`) beside logo

## Motion / animation patterns (framer-motion)

1. **ScrollReveal** ([components/motion/ScrollReveal.jsx](components/motion/ScrollReveal.jsx)) — wrap every card/section child. Fades in + slides 40px, `duration: 0.7`, ease `[0.22, 1, 0.36, 1]`, `viewport={{ once: true }}`. Stagger grids with `delay={i * 0.04–0.1}` capped ~0.24s.
2. **Hero entrance** — staggered `initial={{ opacity: 0, y: 12–18 }}` → `animate` with delays 0, 0.08, 0.16, 0.24; panel scales in from 0.96.
3. **Animated images (floating loop)** — the signature treatment (the original `components/ui/WarehouseAnimation.jsx` reference implementation was removed from the tree; recreate this pattern directly where needed, e.g. the isometric illustration in [components/home/HeroSection.jsx](components/home/HeroSection.jsx)):
   ```jsx
   <motion.img
     src="/isometric-warehouse.png"
     animate={{ y: [0, -8, 0] }}
     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
   />
   ```
   Use this same gentle vertical float for illustration/product images on the new site.
4. **Card hover** — `.card-hover` CSS utility (lift `-3px` + soft shadow, 0.25s ease).
5. **Dropdown/mobile menus** — `AnimatePresence` fade + 8px slide, 0.15s.
6. **Buttons** — `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`.
7. **Live SVG previews** — [components/strip/CurtainPreview.jsx](components/strip/CurtainPreview.jsx) draws the curtain to real mm proportions, driven by range sliders in the hero.

`@rive-app/react-canvas` is installed but not currently used — framer-motion is the animation layer in practice.

## Image assets

- **Logo marks** (import directly, they are the brand): `OneDrive_3_4-26-2026/`
  - `DRoooV 01_B+COLOR.png` — black + orange mark, used in the header ([Layout.jsx:9](Layout.jsx#L9))
  - `DRoooV 01_W+COLOR.png` — white + orange (for dark backgrounds/footer)
  - `DRoooV 01_B+B.png`, `DRoooV 01_W+W.png`, `Artboard 9.*`, `DRoooV 02_*` — mono/banner variants
  - Note: these are logo tiles (626²) or horizontal banners (1042×251) — not product photos.
- **Illustrations**: `public/isometric-warehouse.png` (+ `.svg`) — the floating isometric warehouse; reuse as an animated image.
- **Photography**: Unsplash industrial placeholders (see [prototype/mockProducts.js](prototype/mockProducts.js) and [pages/Home.jsx:254](pages/Home.jsx#L254)) — `aspect-[4/3] rounded-xl bg-cover bg-center`.

## Component conventions

- Path alias `@/` → repo root (jsconfig + vite).
- UI primitives in `components/ui` (shadcn-style: Button, Toaster, Radix Select/Label/Toast).
- Cards: `bg-surface-low border border-line rounded-xl p-6` (or white card on `surface-low` sections), `hover:border-brand/50`.
- Icons: `lucide-react`, `w-5 h-6 text-brand`, often inside `w-11 h-11 rounded-full bg-brand/10` circles.
- Data/state: React Query (`lib/query-client`), CartContext, QuoteModalContext; PHP endpoints in `api-php/`.
