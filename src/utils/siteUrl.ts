import { siteOrigin } from "./siteOrigin.ts";

/** Absolute site URL. `basePath` is Vite's `base`, for example `/`. */
export function siteUrl(basePath: string): string {
  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const withTrailingSlash = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return `${siteOrigin()}${withTrailingSlash}`;
}
