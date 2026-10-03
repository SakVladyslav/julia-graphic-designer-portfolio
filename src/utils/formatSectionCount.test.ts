import { describe, expect, it } from "vitest";

import { formatSectionCount } from "./formatSectionCount";

describe("formatSectionCount", () => {
  it("pads single-digit counts like Figma", () => {
    expect(formatSectionCount(4)).toBe("[04]");
  });

  it("keeps two-digit counts without extra zeros", () => {
    expect(formatSectionCount(12)).toBe("[12]");
  });
});
