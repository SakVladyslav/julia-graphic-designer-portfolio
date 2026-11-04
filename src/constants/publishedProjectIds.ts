/**
 * Addresses that exist as real pages. Prerender checks this list against
 * `listProjectCases` and `caseCopy`, so a case cannot ship without both a URL
 * and an HTML file.
 */
export function publishedProjectIds(): readonly string[] {
  return ["lovespace", "molfaria", "amaryllis", "bbg", "olx", "novyny"];
}
