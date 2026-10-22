import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import { previewRoutes } from "./src/vite/previewRoutes.ts";
import { siteDiscovery } from "./src/vite/siteDiscovery.ts";
import { siteHead } from "./src/vite/siteHead.ts";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), siteHead(), siteDiscovery(), previewRoutes()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    css: true,
  },
});
