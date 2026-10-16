import { describe, expect, it } from "vitest";

import { siteUrl } from "./siteUrl";

describe("siteUrl", () => {
  it("joins the GitHub Pages host with the Vite base", () => {
    expect(siteUrl("/julia-graphic-designer-portfolio/")).toBe(
      "https://sakvladyslav.github.io/julia-graphic-designer-portfolio/",
    );
  });

  it("adds a missing leading and trailing slash", () => {
    expect(siteUrl("portfolio")).toBe("https://sakvladyslav.github.io/portfolio/");
  });
});
