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

  it("keeps the look when a scroll happens while the menu is open", () => {
    const held = headerScrollPhase({
      look: "resting",
      travel: { direction: "down", distance: 0 },
      deltaY: 24,
      scrollY: belowTop,
      menuOpen: true,
    });

    expect(held).toMatchObject({ look: "resting", motion: "none" });
  });

  it("keeps the look when a scroll happens while focus is inside the header", () => {
    const held = headerScrollPhase({
      look: "hidden",
      travel: { direction: "up", distance: 0 },
      deltaY: -24,
      scrollY: belowTop,
      focusInside: true,
    });

    expect(held).toMatchObject({ look: "hidden", motion: "none" });
  });

  it("keeps the look when both holds end before a new scroll, then follows a later 10 px scroll", () => {
    const held = headerScrollPhase({
      look: "pinned",
      travel: { direction: "down", distance: 0 },
      deltaY: 24,
      scrollY: belowTop,
      menuOpen: true,
    });
    const released = headerScrollPhase({
      look: held.look,
      travel: held.travel,
      deltaY: 0,
      scrollY: belowTop,
    });

    expect(released).toMatchObject({ look: "pinned", motion: "none" });

    const short = headerScrollPhase({
      look: released.look,
      travel: released.travel,
      deltaY: 9,
      scrollY: belowTop,
    });

    expect(short.look).toBe("pinned");

    const qualified = headerScrollPhase({
      look: short.look,
      travel: short.travel,
      deltaY: 1,
      scrollY: belowTop,
    });

    expect(qualified).toMatchObject({ look: "hidden", motion: "slide" });
  });

  it("pins immediately when focus enters a hidden header below the top", () => {
    const next = headerScrollPhase({
      look: "hidden",
      travel: { direction: "down", distance: 12 },
      deltaY: 0,
      scrollY: belowTop,
      focusEntered: true,
    });

    expect(next).toMatchObject({ look: "pinned", motion: "immediate" });
  });

  it("fades the pinned header in when focus enters under reduced motion", () => {
    const next = headerScrollPhase({
      look: "hidden",
      travel: { direction: "down", distance: 12 },
      deltaY: 0,
      scrollY: belowTop,
      focusEntered: true,
      reducedMotion: true,
    });

    expect(next).toMatchObject({ look: "pinned", motion: "fade" });
  });

  it("rests when focus enters a hidden header at the top", () => {
    const next = headerScrollPhase({
      look: "hidden",
      travel: { direction: "down", distance: 12 },
      deltaY: 0,
      scrollY: 0,
      focusEntered: true,
    });

    expect(next).toMatchObject({ look: "resting", motion: "none" });
  });
});
