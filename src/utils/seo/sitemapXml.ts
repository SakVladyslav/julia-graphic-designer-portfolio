function pageUrl(origin: string, pathname: string): string {
  return pathname === "/" ? `${origin}/` : `${origin}${pathname}`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Sitemap of real pages. Hash links on the homepage are not separate URLs. */
export function sitemapXml(origin: string, paths: readonly string[]): string {
  const urls = paths
    .map((pathname) => {
      const loc = escapeXml(pageUrl(origin, pathname));
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
