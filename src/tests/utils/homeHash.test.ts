import { describe, expect, it } from "vitest";

import { homeHash } from "../../utils/homeHash";

describe("homeHash", () => {
  it("points a section id at the home page under the site base", () => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    expect(homeHash("projects")).toBe(`${base}/#projects`);
  });
});
