import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import { githubPagesFallback } from "./src/vite/githubPagesFallback.ts";
import { siteHead } from "./src/vite/siteHead.ts";

// https://vite.dev/config/
export default defineConfig({
  base: "/julia-graphic-designer-portfolio/",
  plugins: [react(), siteHead(), githubPagesFallback()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
