import { describe, expect, it } from "vitest";

import { siteUrl } from "../../utils/siteUrl";

describe("siteUrl", () => {
  it("joins the site origin with the Vite base", () => {
    expect(siteUrl("/")).toBe("https://julia-s.com/");
  });

  it("adds a missing leading and trailing slash", () => {
    expect(siteUrl("portfolio")).toBe("https://julia-s.com/portfolio/");
  });
});
