import { SITE_ORIGIN } from "../constants/site.ts";

/** Absolute site URL. `basePath` is Vite's `base`, for example `/julia-graphic-designer-portfolio/`. */
export function siteUrl(basePath: string): string {
  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const withTrailingSlash = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return `${SITE_ORIGIN}${withTrailingSlash}`;
}
