// @vitest-environment node

import { describe, expect, it } from "vitest";

import { renderPages } from "./entry-server";

describe("renderPages", () => {
  const pages = renderPages();

  it("puts the home page text in the HTML before JavaScript runs", () => {
    const home = pages.find((page) => page.pathname === "/");

    expect(home?.html).toContain("Graphic Designer");
    expect(home?.html).toContain('href="/projects/lovespace"');
    expect(home?.head).toContain('<meta property="og:title" content="Julia Samchuk" />');
  });

  it("gives a project page its own text and share title", () => {
    const lovespace = pages.find((page) => page.pathname === "/projects/lovespace");
    const molfaria = pages.find((page) => page.pathname === "/projects/molfaria");

    expect(lovespace?.html).toContain("Visual Identity Redesign");
    expect(lovespace?.head).toContain(
      '<link rel="canonical" href="https://julia-s.com/projects/lovespace" />',
    );
    expect(lovespace?.head).toContain(
      '<meta property="og:title" content="Lovespace — Julia Samchuk" />',
    );
    expect(lovespace?.head).not.toContain('<link rel="canonical" href="https://julia-s.com/" />');
    expect(molfaria?.head).toContain(
      '<meta property="og:title" content="Molfaria — Julia Samchuk" />',
    );
    expect(lovespace?.head).not.toContain("Molfaria — Julia Samchuk");
  });

  it("renders the missing page", () => {
    const missing = pages.find((page) => page.pathname === "/404");

    expect(missing?.html).toContain("This page does not exist.");
    expect(missing?.head).toContain('<meta name="robots" content="noindex" />');
  });
});
