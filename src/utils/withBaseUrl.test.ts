import { describe, expect, it } from "vitest";

import { withBaseUrl } from "./withBaseUrl";

describe("withBaseUrl", () => {
  it("joins BASE_URL with a relative public path", () => {
    expect(withBaseUrl("projects/amaryllis.webp")).toBe(
      `${import.meta.env.BASE_URL}projects/amaryllis.webp`,
    );
  });

  it("strips a leading slash before joining", () => {
    expect(withBaseUrl("/projects/amaryllis.webp")).toBe(
      `${import.meta.env.BASE_URL}projects/amaryllis.webp`,
    );
  });
});
