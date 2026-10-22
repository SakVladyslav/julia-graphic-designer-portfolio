import { describe, expect, it } from "vitest";

import { publishedProjectIds } from "../constants/publishedProjectIds";

import { indexablePaths } from "./indexablePaths";
import { sitemapXml } from "./sitemapXml";

describe("sitemapXml", () => {
  const xml = sitemapXml("https://julia-s.com", indexablePaths("/", publishedProjectIds()));

  it("lists the homepage and each published project once", () => {
    expect(xml).toContain("<loc>https://julia-s.com/</loc>");
    expect(xml).toContain("<loc>https://julia-s.com/projects/lovespace</loc>");
    expect(xml).toContain("<loc>https://julia-s.com/projects/novyny</loc>");
    expect(xml).not.toContain("twitchvrotfl");
    expect(xml).not.toContain("book-covers");
    expect(xml.match(/<loc>/g)).toHaveLength(publishedProjectIds().length + 1);
  });

  it("escapes characters that are not safe in XML", () => {
    expect(sitemapXml("https://julia-s.com", ["/projects/a&b"])).toContain(
      "<loc>https://julia-s.com/projects/a&amp;b</loc>",
    );
  });
});
