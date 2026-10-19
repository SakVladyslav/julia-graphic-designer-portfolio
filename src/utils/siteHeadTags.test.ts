import { describe, expect, it } from "vitest";

import { SITE_DESCRIPTION } from "../constants/site";

import { siteHeadTags } from "./siteHeadTags";

describe("siteHeadTags", () => {
  const tags = siteHeadTags("https://julia-s.com/");

  it("keeps the search snippet short enough for Google", () => {
    expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160);
    expect(tags).toContain(`<meta name="description" content="${SITE_DESCRIPTION}" />`);
  });

  it("points the share card at an absolute image URL", () => {
    expect(tags).toContain('<meta property="og:image" content="https://julia-s.com/og.png" />');
    expect(tags).toContain('<meta property="og:image:width" content="1200" />');
    expect(tags).toContain('<meta property="og:image:height" content="630" />');
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image" />');
  });

  it("sets one canonical URL for the site", () => {
    expect(tags).toContain('<link rel="canonical" href="https://julia-s.com/" />');
  });
});
