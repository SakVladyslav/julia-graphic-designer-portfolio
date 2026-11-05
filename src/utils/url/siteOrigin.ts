import { env } from "node:process";

/** Public site address. Override with SITE_ORIGIN when it changes. */
const DEFAULT_SITE_ORIGIN = "https://julia-s.com";

/** Stable public origin for canonical and share-card URLs. */
export function siteOrigin(): string {
  const configured = env.SITE_ORIGIN?.trim().replace(/\/$/, "");
  if (configured === undefined || configured === "") {
    return DEFAULT_SITE_ORIGIN;
  }

  return configured;
}
