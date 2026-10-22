import { siteOrigin } from "./siteOrigin.ts";

/** Absolute canonical URL for a prerendered pathname. Homepage keeps the trailing slash. */
export function pageCanonicalUrl(pathname: string): string {
  if (pathname === "/") {
    return `${siteOrigin()}/`;
  }

  return `${siteOrigin()}${pathname}`;
}
