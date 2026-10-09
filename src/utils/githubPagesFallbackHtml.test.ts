import { describe, expect, it } from "vitest";

import { githubPagesFallbackHtml } from "./githubPagesFallbackHtml";

describe("githubPagesFallbackHtml", () => {
  it("sends GitHub Pages back to the configured site root", () => {
    const html = githubPagesFallbackHtml("/julia-graphic-designer-portfolio/");

    expect(html).toContain('sessionStorage.setItem("spa-redirect", location.href)');
    expect(html).toContain('location.replace("/julia-graphic-designer-portfolio/")');
  });

  it("keeps a trailing slash on the redirect", () => {
    const html = githubPagesFallbackHtml("/portfolio");

    expect(html).toContain('location.replace("/portfolio/")');
  });
});
