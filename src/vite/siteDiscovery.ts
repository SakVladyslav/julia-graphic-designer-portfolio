import { existsSync, statSync, writeFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

import type { Connect, Plugin, ResolvedConfig } from "vite";

import { publishedProjectIds } from "../constants/publishedProjectIds.ts";

import { indexablePaths } from "../utils/indexablePaths.ts";
import { isIndexablePath } from "../utils/isIndexablePath.ts";
import { requestPathname } from "../utils/requestPathname.ts";
import { robotsTxt } from "../utils/robotsTxt.ts";
import { siteBasePath } from "../utils/siteBasePath.ts";
import { siteOrigin } from "../utils/siteOrigin.ts";
import { siteUrl } from "../utils/siteUrl.ts";
import { sitemapXml } from "../utils/sitemapXml.ts";

import { forceNotFoundStatus } from "./forceNotFoundStatus.ts";

interface SiteFiles {
  paths: readonly string[];
  robotsPath: string;
  sitemapPath: string;
  robots: string;
  sitemap: string;
}

function siteFiles(base: string): SiteFiles {
  const home = siteBasePath(base);
  const paths = indexablePaths(base, publishedProjectIds());

  return {
    paths,
    robotsPath: home === "/" ? "/robots.txt" : `${home}/robots.txt`,
    sitemapPath: home === "/" ? "/sitemap.xml" : `${home}/sitemap.xml`,
    robots: robotsTxt(`${siteUrl(base)}sitemap.xml`),
    sitemap: sitemapXml(siteOrigin(), paths),
  };
}

function hasFileExtension(pathname: string): boolean {
  const slash = pathname.lastIndexOf("/");
  return pathname.slice(slash + 1).includes(".");
}

function isNavigation(req: IncomingMessage): boolean {
  const destination = req.headers["sec-fetch-dest"];
  return destination === undefined || destination === "document" || destination === "iframe";
}

function sendText(res: ServerResponse, type: string, body: string): void {
  res.statusCode = 200;
  res.setHeader("Content-Type", type);
  res.end(body);
}

function assetExists(root: string, pathname: string): boolean {
  const rootResolved = path.resolve(root);
  const file = path.resolve(root, pathname.replace(/^\/+/, ""));
  const inside = file === rootResolved || file.startsWith(`${rootResolved}${path.sep}`);
  if (!inside || !existsSync(file)) {
    return false;
  }

  return statSync(file).isFile();
}

function discoveryMiddleware(
  files: SiteFiles,
  assetRoot: string | undefined,
): Connect.NextHandleFunction {
  return (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    const pathname = requestPathname(req.url);
    if (pathname === undefined) {
      next();
      return;
    }

    if (pathname === files.robotsPath) {
      sendText(res, "text/plain; charset=utf-8", files.robots);
      return;
    }

    if (pathname === files.sitemapPath) {
      sendText(res, "application/xml; charset=utf-8", files.sitemap);
      return;
    }

    const internal =
      pathname.startsWith("/@") ||
      pathname.startsWith("/src/") ||
      pathname.startsWith("/node_modules/");
    if (internal) {
      next();
      return;
    }

    if (hasFileExtension(pathname)) {
      if (assetRoot !== undefined && !assetExists(assetRoot, pathname)) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Not found");
        return;
      }

      next();
      return;
    }

    if (!isNavigation(req) || isIndexablePath(pathname, files.paths)) {
      next();
      return;
    }

    forceNotFoundStatus(res);
    if (assetRoot !== undefined) {
      const queryIndex = req.url === undefined ? -1 : req.url.indexOf("?");
      const query = queryIndex === -1 || req.url === undefined ? "" : req.url.slice(queryIndex);
      req.url = `/404.html${query}`;
    }
    next();
  };
}

function writeBuiltFiles(config: ResolvedConfig, files: SiteFiles): void {
  if (config.command !== "build" || config.build.ssr) {
    return;
  }

  const outDir = path.resolve(config.root, config.build.outDir);
  writeFileSync(path.join(outDir, "robots.txt"), files.robots);
  writeFileSync(path.join(outDir, "sitemap.xml"), files.sitemap);
}

/** robots.txt, sitemap.xml, and HTTP 404 for addresses that are not pages. */
export function siteDiscovery(): Plugin {
  let config: ResolvedConfig | undefined;

  return {
    name: "site-discovery",
    configResolved(resolved) {
      config = resolved;
    },
    configureServer(server) {
      if (config === undefined) {
        throw new Error("Site discovery ran before Vite resolved the config");
      }

      server.middlewares.use(discoveryMiddleware(siteFiles(config.base), undefined));
    },
    configurePreviewServer(server) {
      if (config === undefined) {
        throw new Error("Site discovery ran before Vite resolved the config");
      }

      const assetRoot = path.resolve(config.root, config.build.outDir);
      server.middlewares.use(discoveryMiddleware(siteFiles(config.base), assetRoot));
    },
    closeBundle() {
      if (config === undefined) {
        return;
      }

      writeBuiltFiles(config, siteFiles(config.base));
    },
  };
}
