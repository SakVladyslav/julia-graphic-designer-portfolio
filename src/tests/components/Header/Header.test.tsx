import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Header from "../../../components/Header/Header";

function setScrollY(y: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
}

function scrollToY(y: number) {
  setScrollY(y);
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("Header scroll phase", () => {
  afterEach(() => {
    cleanup();
    setScrollY(0);
  });

  it("stays resting when the page is at the top on mount", () => {
    setScrollY(0);
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");
    expect(header).not.toHaveClass("site-header--slide");
    expect(header).not.toHaveClass("site-header--fade");
  });

  it("pins with no motion class when the mount position is below the top", () => {
    setScrollY(80);
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");
    expect(header).not.toHaveClass("site-header--slide");
    expect(header).not.toHaveClass("site-header--fade");
  });

  it("hides with a slide after a downward scroll of 10 px", () => {
    setScrollY(0);
    render(<Header />);

    scrollToY(10);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--hidden");
    expect(header).toHaveClass("site-header--slide");
  });

  it("pins with a slide after an upward scroll of 10 px below the top", () => {
    setScrollY(80);
    render(<Header />);

    scrollToY(90);
    scrollToY(80);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).toHaveClass("site-header--slide");
    expect(header).not.toHaveClass("site-header--hidden");
  });

  it("removes the scroll listener on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Header />);

    unmount();

    expect(remove.mock.calls.some(([type]) => type === "scroll")).toBe(true);
    remove.mockRestore();
  });
});
