import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import { siteHead } from "./src/vite/siteHead.ts";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), siteHead()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
