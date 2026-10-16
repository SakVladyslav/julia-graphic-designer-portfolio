import { SITE_OWNER } from "../constants/site.ts";

import { siteHeadTags } from "./siteHeadTags.ts";
import { siteUrl } from "./siteUrl.ts";

/** 404 page GitHub Pages serves for unknown paths. The redirect target is the Vite base. */
export function githubPagesFallbackHtml(siteBase: string): string {
  const redirect = siteBase.endsWith("/") ? siteBase : `${siteBase}/`;
  const tags = siteHeadTags(siteUrl(siteBase));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${SITE_OWNER}</title>
    ${tags}
    <script>
      sessionStorage.setItem("spa-redirect", location.href);
      location.replace(${JSON.stringify(redirect)});
    </script>
  </head>
  <body></body>
</html>
`;
}
