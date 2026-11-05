import { describe, expect, it } from "vitest";

import { consumeNullCaseFallback } from "../../../utils/ssr/consumeNullCaseFallback";
import { shouldUseNullCaseFallback } from "../../../utils/ssr/shouldUseNullCaseFallback";

describe("shouldUseNullCaseFallback", () => {
  it("keeps a null fallback only on the first frame when the case HTML is already there", () => {
    expect(shouldUseNullCaseFallback(true, true)).toBe(true);
    expect(shouldUseNullCaseFallback(true, false)).toBe(false);
    expect(shouldUseNullCaseFallback(false, true)).toBe(false);
    expect(shouldUseNullCaseFallback(false, false)).toBe(false);
  });

  it("uses that null fallback only for the first read, and only when the case HTML is already there", () => {
    expect(consumeNullCaseFallback(true)).toBe(true);
    expect(consumeNullCaseFallback(true)).toBe(false);
    expect(consumeNullCaseFallback(false)).toBe(false);
  });
});
