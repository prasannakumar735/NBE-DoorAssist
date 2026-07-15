import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // PHP lead-capture endpoints are served by XAMPP's Apache at this path,
      // not by the Vite dev server — proxy so fetch("/api-php/...") works in dev too.
      "/api-php": {
        target: "http://localhost/drooov",
        changeOrigin: true,
      },
    },
  },
});

