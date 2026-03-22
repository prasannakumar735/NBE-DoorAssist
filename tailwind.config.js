/** @type {import('tailwindcss').Config} */
/**
 * Mirrors semantic tokens in `src/app/globals.css` (`@theme inline`).
 * Tailwind v4 resolves utilities from CSS first; this file documents the palette for tooling.
 */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FC8347",
          hover: "#e6733d",
          light: "#FFF4EC",
        },
        primary: "#051125",
        background: "#FBF9F8",
        textPrimary: "#1B1C1C",
        textMuted: "#45474D",
      },
    },
  },
};
