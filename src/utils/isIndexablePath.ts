/** True for a published page, including a trailing slash on that same path. */
export function isIndexablePath(pathname: string, paths: readonly string[]): boolean {
  const canonical =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  return paths.includes(canonical);
}
