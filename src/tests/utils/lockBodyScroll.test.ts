import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { lockBodyScroll } from "../../utils/lockBodyScroll";
import { scrollToHashId } from "../../utils/scrollToHashId";

describe("lockBodyScroll", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
  });

  it("locks html and body overflow and restores the previous inline styles", () => {
    document.body.style.overflow = "auto";
    const unlock = lockBodyScroll();

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.position).toBe("fixed");
    expect(document.documentElement.style.overflow).toBe("hidden");

    unlock();

    expect(document.body.style.overflow).toBe("auto");
    expect(document.body.style.position).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("scrolls to a hash that changed while the page was locked", () => {
    const target = document.createElement("section");
    target.id = "contacts";
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);
    window.location.hash = "";

    const unlock = lockBodyScroll();
    window.location.hash = "#contacts";
    unlock();

    expect(scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
    target.remove();
    window.location.hash = "";
  });
});

describe("scrollToHashId", () => {
  it("scrolls the element named by the hash", () => {
    const target = document.createElement("section");
    target.id = "projects";
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);

    expect(scrollToHashId("#projects")).toBe(true);
    expect(scrollIntoView).toHaveBeenCalled();
    expect(scrollToHashId("")).toBe(false);
    expect(scrollToHashId("#missing")).toBe(false);

    target.remove();
  });
});
