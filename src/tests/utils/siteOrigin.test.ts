import { env } from "node:process";
import { afterEach, describe, expect, it } from "vitest";

import { siteOrigin } from "../../utils/siteOrigin";

describe("siteOrigin", () => {
  const original = env.SITE_ORIGIN;

  afterEach(() => {
    if (original === undefined) {
      delete env.SITE_ORIGIN;
      return;
    }

    env.SITE_ORIGIN = original;
  });

  it("uses the public site address by default", () => {
    delete env.SITE_ORIGIN;

    expect(siteOrigin()).toBe("https://julia-s.com");
  });

  it("uses SITE_ORIGIN and drops a trailing slash", () => {
    env.SITE_ORIGIN = "https://example.com/";

    expect(siteOrigin()).toBe("https://example.com");
  });

  it("ignores a blank SITE_ORIGIN", () => {
    env.SITE_ORIGIN = "   ";

    expect(siteOrigin()).toBe("https://julia-s.com");
  });
});
