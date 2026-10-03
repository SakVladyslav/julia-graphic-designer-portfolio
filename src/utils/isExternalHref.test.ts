import { describe, expect, it } from "vitest";

import { isExternalHref } from "./isExternalHref";

describe("isExternalHref", () => {
  it("detects http(s) urls", () => {
    expect(isExternalHref("https://example.com")).toBe(true);
    expect(isExternalHref("http://example.com")).toBe(true);
  });

  it("rejects mailto and relative paths", () => {
    expect(isExternalHref("mailto:art.jsam@gmail.com")).toBe(false);
    expect(isExternalHref("/cv.pdf")).toBe(false);
  });
});
