import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import { githubPagesFallback } from "./src/vite/githubPagesFallback.ts";

// https://vite.dev/config/
export default defineConfig({
  base: "/julia-graphic-designer-portfolio/",
  plugins: [react(), githubPagesFallback()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
