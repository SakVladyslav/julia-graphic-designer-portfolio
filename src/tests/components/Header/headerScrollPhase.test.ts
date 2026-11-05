import { describe, expect, it } from "vitest";

import { headerScrollPhase } from "../../../components/Header/headerScrollPhase";

const belowTop = 40;

describe("headerScrollPhase", () => {
  it("hides with a slide after downward travel reaches 10 px", () => {
    const first = headerScrollPhase({
      look: "resting",
      travel: { direction: "down", distance: 0 },
      deltaY: 9,
      scrollY: belowTop,
    });

    expect(first).toMatchObject({ look: "resting", motion: "none" });

    const second = headerScrollPhase({
      look: first.look,
      travel: first.travel,
      deltaY: 1,
      scrollY: belowTop,
    });

    expect(second).toMatchObject({ look: "hidden", motion: "slide" });
  });

  it("hides with a slide on a single downward move of exactly 10 px", () => {
    const next = headerScrollPhase({
      look: "resting",
      travel: { direction: "down", distance: 0 },
      deltaY: 10,
      scrollY: belowTop,
    });

    expect(next).toMatchObject({ look: "hidden", motion: "slide" });
  });

  it("pins with a slide after upward travel reaches 10 px below the top", () => {
    const first = headerScrollPhase({
      look: "hidden",
      travel: { direction: "up", distance: 0 },
      deltaY: -9,
      scrollY: belowTop,
    });

    expect(first).toMatchObject({ look: "hidden", motion: "none" });

    const second = headerScrollPhase({
      look: first.look,
      travel: first.travel,
      deltaY: -1,
      scrollY: belowTop,
    });

    expect(second).toMatchObject({ look: "pinned", motion: "slide" });
  });

  it("keeps the look while travel in the current direction stays under 10 px", () => {
    const next = headerScrollPhase({
      look: "pinned",
      travel: { direction: "down", distance: 4 },
      deltaY: 5,
      scrollY: belowTop,
    });

    expect(next).toMatchObject({
      look: "pinned",
      motion: "none",
      travel: { direction: "down", distance: 9 },
    });
  });

  it("resets the running travel when the direction changes", () => {
    const downward = headerScrollPhase({
      look: "resting",
      travel: { direction: "down", distance: 0 },
      deltaY: 9,
      scrollY: belowTop,
    });

    const reversed = headerScrollPhase({
      look: downward.look,
      travel: downward.travel,
      deltaY: -6,
      scrollY: belowTop,
    });

    expect(reversed).toMatchObject({
      look: "resting",
      motion: "none",
      travel: { direction: "up", distance: 6 },
    });

    const qualified = headerScrollPhase({
      look: reversed.look,
      travel: reversed.travel,
      deltaY: -4,
      scrollY: belowTop,
    });

    expect(qualified).toMatchObject({ look: "pinned", motion: "slide" });
  });

  it("rests at scroll position 0 even when the last travel is under 10 px", () => {
    const fromPinned = headerScrollPhase({
      look: "pinned",
      travel: { direction: "up", distance: 0 },
      deltaY: -4,
      scrollY: 0,
    });

    expect(fromPinned).toMatchObject({ look: "resting", motion: "none" });
  });

  it("rests at scroll position 0 when the previous look was hidden", () => {
    const fromHidden = headerScrollPhase({
      look: "hidden",
      travel: { direction: "down", distance: 12 },
      deltaY: 0,
      scrollY: 0,
    });

    expect(fromHidden).toMatchObject({ look: "resting", motion: "none" });
  });

  it("stays resting when a page that does not scroll stays at position 0", () => {
    const next = headerScrollPhase({
      look: "resting",
      travel: { direction: "down", distance: 0 },
      deltaY: 0,
      scrollY: 0,
    });

    expect(next).toMatchObject({ look: "resting", motion: "none" });
  });
});
