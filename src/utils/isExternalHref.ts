/** Returns true for absolute http(s) URLs. */
export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
