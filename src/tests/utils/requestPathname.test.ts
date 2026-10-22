import { describe, expect, it, vi } from "vitest";

import { requestPathname } from "../../utils/requestPathname";

describe("requestPathname", () => {
  it("drops the query string", () => {
    expect(requestPathname("/projects/lovespace?ref=1")).toBe("/projects/lovespace");
    expect(requestPathname(undefined)).toBeUndefined();
  });

  it("skips a path that cannot be decoded", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(requestPathname("/%E0%A4%A")).toBeUndefined();
    expect(error).toHaveBeenCalled();

    error.mockRestore();
  });
});
