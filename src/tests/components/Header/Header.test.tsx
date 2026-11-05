import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    scrollToY(16);
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

  it("keeps the look while the menu is open, and after the menu closes, until the next 10 px scroll", async () => {
    const user = userEvent.setup();
    setScrollY(80);
    render(<Header />);

    const toggle = screen.getByRole("button", { hidden: true });
    await user.click(toggle);
    scrollToY(100);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");

    await user.click(toggle);
    act(() => {
      toggle.blur();
    });
    expect(header).toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");

    scrollToY(110);
    expect(header).toHaveClass("site-header--hidden");
    expect(header).toHaveClass("site-header--slide");
  });

  it("keeps the look while focus is inside, and after blur, until the next 10 px scroll", () => {
    setScrollY(80);
    render(<Header />);

    const logo = screen.getByRole("link", { name: /smchk/i });
    act(() => {
      logo.focus();
    });
    scrollToY(100);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();

    act(() => {
      logo.blur();
    });
    expect(header).toHaveClass("site-header--pinned");

    scrollToY(110);
    expect(header).toHaveClass("site-header--hidden");
    expect(header).toHaveClass("site-header--slide");
  });

  it("pins a hidden header immediately when focus enters", () => {
    setScrollY(0);
    render(<Header />);
    scrollToY(20);

    const logo = screen.getByRole("link", { name: /smchk/i });
    act(() => {
      logo.focus();
    });

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");
    expect(header).not.toHaveClass("site-header--slide");
    expect(header).not.toHaveClass("site-header--fade");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("fades a hidden header in when focus enters under reduced motion", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));

    setScrollY(0);
    render(<Header />);
    scrollToY(20);

    const logo = screen.getByRole("link", { name: /smchk/i });
    act(() => {
      logo.focus();
    });

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--pinned");
    expect(header).toHaveClass("site-header--fade");
    expect(header).not.toHaveClass("site-header--slide");

    window.matchMedia = original;
  });

  it("follows a jump even when focus is inside the header", () => {
    setScrollY(80);
    render(<Header />);

    const logo = screen.getByRole("link", { name: /smchk/i });
    act(() => {
      logo.focus();
    });
    window.dispatchEvent(new Event("hashchange"));
    scrollToY(160);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("site-header--hidden");
    expect(header).not.toHaveClass("site-header--pinned");
  });
});
