import { siteBasePath } from "./siteBasePath.ts";

/** Homepage plus one path per published project case. */
export function indexablePaths(base: string, caseIds: readonly string[]): readonly string[] {
  const home = siteBasePath(base);
  const prefix = home === "/" ? "" : home;

  return [home, ...caseIds.map((id) => `${prefix}/projects/${id}`)];
}
