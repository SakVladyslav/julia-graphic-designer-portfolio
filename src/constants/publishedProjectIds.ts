/**
 * Addresses that exist as real pages. The test next to the sitemap checks this
 * against `listProjectCases`, so a new case cannot ship without a URL.
 */
export function publishedProjectIds(): readonly string[] {
  return ["lovespace", "molfaria", "amaryllis", "bbg", "olx", "novyny"];
}
