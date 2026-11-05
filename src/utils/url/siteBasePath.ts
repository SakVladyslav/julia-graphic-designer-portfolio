/** Vite `base` (`/` or `/portfolio/`) as the homepage pathname, without a trailing slash. */
export function siteBasePath(base: string): string {
  const withLeadingSlash = base.startsWith("/") ? base : `/${base}`;
  if (withLeadingSlash === "/") {
    return "/";
  }

  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}
