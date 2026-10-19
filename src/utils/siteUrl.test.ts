import { describe, expect, it } from "vitest";

import { siteUrl } from "./siteUrl";

describe("siteUrl", () => {
  it("joins the site origin with the Vite base", () => {
    expect(siteUrl("/")).toBe(
      "https://julia-graphic-designer-portfolio.vladyslav-sak.workers.dev/",
    );
  });

  it("adds a missing leading and trailing slash", () => {
    expect(siteUrl("portfolio")).toBe(
      "https://julia-graphic-designer-portfolio.vladyslav-sak.workers.dev/portfolio/",
    );
  });
});
