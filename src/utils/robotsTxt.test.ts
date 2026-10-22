import { describe, expect, it } from "vitest";

import { robotsTxt } from "./robotsTxt";

describe("robotsTxt", () => {
  it("allows the site and points at the sitemap", () => {
    expect(robotsTxt("https://julia-s.com/sitemap.xml")).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://julia-s.com/sitemap.xml\n",
    );
  });
});
