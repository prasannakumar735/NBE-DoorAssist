/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./{pages,components,containers,src}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        heading: ["'Roboto Condensed'", "system-ui", "sans-serif"],
        display: ["'Roboto Condensed'", "system-ui", "sans-serif"],
        "mono-spec": ["'Roboto Mono'", "monospace"],
      },
      colors: {
        brand: "#e0670f",
        brandDark: "#b8500a",
        brandLight: "#f5921f",
        ink: "#1c1a17",
        paper: "#ffffff",
        "surface-low": "#f7f5f2",
        "surface-sunken": "#efece5",
        "on-surface-variant": "#5b5750",
        line: "#e4e1d9",
        steel: "#4a4e45",
        // Hero-only palette: HeroSection.jsx is intentionally kept on the
        // site's previous blue/Inter look while the rest of the site moves
        // to the orange/Roboto system above. Do not repoint these.
        heroBrand: "#3E6AAE",
        heroBrandDark: "#2F5590",
        heroInk: "#051125",
        heroPaper: "#FBF9F8",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

