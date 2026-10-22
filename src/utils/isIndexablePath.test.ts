import { describe, expect, it } from "vitest";

import { isIndexablePath } from "./isIndexablePath";

const paths = ["/", "/projects/lovespace"];

describe("isIndexablePath", () => {
  it("accepts a published page with or without a trailing slash", () => {
    expect(isIndexablePath("/", paths)).toBe(true);
    expect(isIndexablePath("/projects/lovespace", paths)).toBe(true);
    expect(isIndexablePath("/projects/lovespace/", paths)).toBe(true);
  });

  it("rejects an address that is not a page", () => {
    expect(isIndexablePath("/missing", paths)).toBe(false);
    expect(isIndexablePath("/projects/missing", paths)).toBe(false);
    expect(isIndexablePath("/projects/lovespace/hero.webp", paths)).toBe(false);
  });
});
