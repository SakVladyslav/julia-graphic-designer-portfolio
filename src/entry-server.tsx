import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server";
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

async function renderPage(page: PrerenderPage): Promise<RenderedPage> {
  const stream = await renderToReadableStream(
    <StrictMode>
      <StaticRouter basename={routerBasename()} location={page.pathname}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  await stream.allReady;
  const html = await new Response(stream).text();

  return {
    pathname: page.pathname,
    output: page.output,
    title: page.title,
    html,
    head: siteHeadTags(pageCanonicalUrl(page.pathname), page.share),
  };
}

export function renderPages(): Promise<RenderedPage[]> {
  return Promise.all(prerenderPages().map((page) => renderPage(page)));
}
