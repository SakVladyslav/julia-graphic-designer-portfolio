import { env } from "node:process";

/** Cloudflare Workers hostname for this repository. */
const DEFAULT_SITE_ORIGIN = "https://julia-graphic-designer-portfolio.vladyslav-sak.workers.dev";

/** Stable public origin for canonical and share-card URLs. */
export function siteOrigin(): string {
  const configured = env.SITE_ORIGIN?.trim().replace(/\/$/, "");
  if (configured === undefined || configured === "") {
    return DEFAULT_SITE_ORIGIN;
  }

  return configured;
}
