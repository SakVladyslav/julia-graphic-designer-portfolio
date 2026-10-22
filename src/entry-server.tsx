import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { AppRoutes } from "./App.tsx";

import { pageCanonicalUrl } from "./utils/pageCanonicalUrl.ts";
import { prerenderPages } from "./utils/prerenderPages.ts";
import { routerBasename } from "./utils/routerBasename.ts";
import { siteHeadTags } from "./utils/siteHeadTags.ts";
import type { PrerenderPage } from "./utils/prerenderPages.ts";

export interface RenderedPage {
  pathname: string;
  output: string;
  title: string;
  html: string;
  head: string;
}

function renderPage(page: PrerenderPage): RenderedPage {
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

export function renderPages(): RenderedPage[] {
  return prerenderPages().map((page) => renderPage(page));
}
