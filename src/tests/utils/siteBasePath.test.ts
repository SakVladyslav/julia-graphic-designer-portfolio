import { describe, expect, it } from "vitest";

import { siteBasePath } from "../../utils/siteBasePath";

describe("siteBasePath", () => {
  it("keeps the root base as the homepage path", () => {
    expect(siteBasePath("/")).toBe("/");
  });

  it("drops the trailing slash from a subdirectory base", () => {
    expect(siteBasePath("/portfolio/")).toBe("/portfolio");
    expect(siteBasePath("portfolio")).toBe("/portfolio");
  });
});
