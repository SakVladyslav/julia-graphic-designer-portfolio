import { describe, expect, it } from "vitest";

import { SITE_DESCRIPTION, SITE_OWNER } from "../../constants/site";

import { pageCanonicalUrl } from "../../utils/pageCanonicalUrl";
import { clampMetaDescription, headForPath, prerenderPages } from "../../utils/prerenderPages";
import { siteHeadTags } from "../../utils/siteHeadTags";

describe("clampMetaDescription", () => {
  it("keeps a short sentence", () => {
    expect(clampMetaDescription("Poster series.")).toBe("Poster series.");
  });

  it("cuts a long sentence on a word and stays within the search limit", () => {
    const text = "Word ".repeat(80);
    const clamped = clampMetaDescription(text);

    expect(clamped.length).toBeLessThanOrEqual(160);
    expect(clamped.endsWith("…")).toBe(true);
    expect(clamped.endsWith(" …")).toBe(false);
  });
});

describe("prerenderPages", () => {
  const pages = prerenderPages();

  it("writes a distinct file and share title for every public address", () => {
    const pathnames = pages.map((page) => page.pathname);
    const outputs = pages.map((page) => page.output);

    expect(new Set(pathnames).size).toBe(pathnames.length);
    expect(new Set(outputs).size).toBe(outputs.length);
    expect(outputs).toContain("index.html");
    expect(outputs).toContain("projects/lovespace/index.html");
    expect(outputs).toContain("404.html");
    expect(outputs.some((output) => output.startsWith("uk/"))).toBe(false);

    for (const page of pages) {
      expect(page.share.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("points each share card at that page, with the site image on the origin", () => {
    const lovespace = pages.find((page) => page.pathname === "/projects/lovespace");
    if (lovespace === undefined) {
      throw new Error("Missing lovespace prerender page");
    }

    const tags = siteHeadTags(pageCanonicalUrl(lovespace.pathname), lovespace.share);

    expect(lovespace.share.description.length).toBeLessThanOrEqual(160);
    expect(lovespace.share.description).toContain("Visual Identity Redesign");
    expect(tags).toContain('<meta property="og:title" content="Lovespace — Julia Samchuk" />');
    expect(tags).toContain(
      '<link rel="canonical" href="https://julia-s.com/projects/lovespace" />',
    );
    expect(tags).toContain(
      '<meta property="og:url" content="https://julia-s.com/projects/lovespace" />',
    );
    expect(tags).not.toContain('<link rel="canonical" href="https://julia-s.com/" />');
    expect(tags).toContain('<meta property="og:image" content="https://julia-s.com/og.png" />');
    expect(tags).not.toContain("lovespace/og.png");
  });

  it("keeps the home card and marks the missing page noindex", () => {
    const home = pages.find((page) => page.pathname === "/");
    const missing = pages.find((page) => page.pathname === "/404");

    expect(home?.share.title).toBe(SITE_OWNER);
    expect(home?.share.description).toBe(SITE_DESCRIPTION);
    expect(pageCanonicalUrl("/")).toBe("https://julia-s.com/");
    expect(missing?.share.robots).toBe("noindex");
    expect(home?.share.jobTitle).toBe("Graphic Designer");
  });

  it("gives each project a canonical that is not the homepage", () => {
    const projects = pages.filter((page) => page.pathname.includes("/projects/"));
    const canonicals = projects.map((page) => pageCanonicalUrl(page.pathname));

    expect(new Set(canonicals).size).toBe(projects.length);
    expect(projects.length).toBeGreaterThan(0);

    for (const page of projects) {
      const tags = siteHeadTags(pageCanonicalUrl(page.pathname), page.share);
      const canonical = pageCanonicalUrl(page.pathname);

      expect(tags).toContain(`<link rel="canonical" href="${canonical}" />`);
      expect(tags).toContain(`<meta property="og:title" content="${page.share.title}" />`);
      expect(tags).toContain(`<meta property="og:description" content=`);
      expect(page.share.description).not.toBe(SITE_DESCRIPTION);
      expect(tags).not.toContain(`<meta name="description" content="${SITE_DESCRIPTION}" />`);
      expect(tags).not.toContain('<link rel="canonical" href="https://julia-s.com/" />');
    }
  });
});

describe("headForPath", () => {
  it("keeps a project address on that project", () => {
    expect(headForPath("/projects/lovespace/")?.canonicalPath).toBe("/projects/lovespace");
    expect(headForPath("/projects/olx")?.page.share.title).toBe("OLX Business Hub — Julia Samchuk");
  });

  it("marks an unknown address noindex without sending it to the homepage", () => {
    const head = headForPath("/no-such-page");

    expect(head?.canonicalPath).toBe("/no-such-page");
    expect(head?.page.share.robots).toBe("noindex");
  });
});
