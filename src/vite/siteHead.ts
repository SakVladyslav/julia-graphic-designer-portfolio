import type { Plugin, ResolvedConfig } from "vite";

import { siteHeadTags } from "../utils/siteHeadTags.ts";
import { siteUrl } from "../utils/siteUrl.ts";

export function siteHead(): Plugin {
  let config: ResolvedConfig | undefined;

  return {
    name: "site-head",
    configResolved(resolved) {
      config = resolved;
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (config === undefined) {
          throw new Error("Site head ran before Vite resolved the config");
        }

        if (html.includes('name="description"')) {
          return html;
        }

        const tags = siteHeadTags(siteUrl(config.base));
        return html.replace("</head>", `    ${tags}\n  </head>`);
      },
    },
  };
}
