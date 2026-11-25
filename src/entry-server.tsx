import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { AppRoutes } from "./App.tsx";

import { loadProjectCasePage } from "./pages/project/loadProjectCasePage.ts";

import { pageCanonicalUrl } from "./utils/seo/pageCanonicalUrl.ts";
import { prerenderPages } from "./utils/seo/prerenderPages.ts";
import { routerBasename } from "./utils/url/routerBasename.ts";
import { siteHeadTags } from "./utils/seo/siteHeadTags.ts";
import type { PrerenderPage } from "./utils/seo/prerenderPages.ts";

export interface RenderedPage {
  pathname: string;
  output: string;
  title: string;
  html: string;
  head: string;
}

function renderPage(page: PrerenderPage): RenderedPage {
  // A streamed Suspense boundary writes <!--$?--> and an inline script.
  // The page CSP blocks that script, so hydrateRoot throws React #419.
  // renderToString inlines the tree and emits no inline script.
  const html = renderToString(
    <StrictMode>
      <StaticRouter basename={routerBasename()} location={page.pathname}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );

  return {
    pathname: page.pathname,
    output: page.output,
    title: page.title,
    html,
    head: siteHeadTags(pageCanonicalUrl(page.pathname), page.share),
  };
}

export async function renderPages(): Promise<RenderedPage[]> {
  // Resolve the lazy case before rendering so renderToString does not suspend.
  await loadProjectCasePage();
  return prerenderPages().map((page) => renderPage(page));
}
