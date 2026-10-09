import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

import { githubPagesFallbackHtml } from "../utils/githubPagesFallbackHtml.ts";

export function githubPagesFallback(): Plugin {
  let config: ResolvedConfig | undefined;

  return {
    name: "github-pages-fallback",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      if (config === undefined) {
        throw new Error("GitHub Pages fallback ran before Vite resolved the config");
      }

      const outDir = resolve(config.root, config.build.outDir);
      writeFileSync(resolve(outDir, "404.html"), githubPagesFallbackHtml(config.base));
    },
  };
}
