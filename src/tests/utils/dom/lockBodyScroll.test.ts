import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { lockBodyScroll } from "../../../utils/dom/lockBodyScroll";
import {
  PROGRAMMATIC_SCROLL_EVENT,
  queueUnlockHashScroll,
  takeQueuedUnlockHashScroll,
} from "../../../utils/dom/programmaticScroll";
import { scrollToHashId } from "../../../utils/dom/scrollToHashId";

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
    delete document.documentElement.dataset.scrollLock;
    takeQueuedUnlockHashScroll();
    window.location.hash = "";
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
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
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    expect(document.documentElement.dataset.scrollLock).toBeUndefined();
  });

  it("keeps the scroll-lock marker set until the saved position is restored", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 240 });
    const seen: string[] = [];
    window.scrollTo = vi.fn(() => {
      seen.push(
        document.documentElement.dataset.scrollLock === undefined ? "scroll-open" : "scroll-locked",
      );
    });
    const onNotify = () => {
      seen.push(
        document.documentElement.dataset.scrollLock === undefined ? "notify-open" : "notify-locked",
      );
    };
    window.addEventListener(PROGRAMMATIC_SCROLL_EVENT, onNotify);

    try {
      const unlock = lockBodyScroll();
      expect(document.documentElement.dataset.scrollLock).toBe("");
      expect(document.body.style.position).toBe("fixed");

      unlock();

      expect(seen).toEqual(["scroll-locked", "notify-open"]);
      expect(document.documentElement.dataset.scrollLock).toBeUndefined();
      expect(document.body.style.position).toBe("");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 240,
        left: 0,
        behavior: "instant",
      });
    } finally {
      window.removeEventListener(PROGRAMMATIC_SCROLL_EVENT, onNotify);
    }
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
    expect(document.documentElement.dataset.scrollLock).toBeUndefined();
    target.remove();
    window.location.hash = "";
  });

  it("scrolls a queued hash after unlock even when the URL hash did not change", () => {
    const target = document.createElement("section");
    target.id = "contacts";
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);
    window.location.hash = "#contacts";

    const unlock = lockBodyScroll();
    queueUnlockHashScroll("#contacts");
    unlock();

    expect(scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(document.documentElement.dataset.scrollLock).toBeUndefined();
    target.remove();
    window.location.hash = "";
  });

  it("clears the marker only after a hash scroll that happened while locked", () => {
    const seen: string[] = [];
    const target = document.createElement("section");
    target.id = "contacts";
    target.scrollIntoView = () => {
      seen.push(
        document.documentElement.dataset.scrollLock === undefined ? "into-open" : "into-locked",
      );
    };
    document.body.append(target);
    window.location.hash = "";
    const onNotify = () => {
      seen.push(
        document.documentElement.dataset.scrollLock === undefined ? "notify-open" : "notify-locked",
      );
    };
    window.addEventListener(PROGRAMMATIC_SCROLL_EVENT, onNotify);

    try {
      const unlock = lockBodyScroll();
      window.location.hash = "#contacts";
      unlock();

      expect(seen).toEqual(["into-locked", "notify-locked", "notify-open"]);
      expect(document.documentElement.dataset.scrollLock).toBeUndefined();
      expect(window.scrollTo).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener(PROGRAMMATIC_SCROLL_EVENT, onNotify);
      target.remove();
      window.location.hash = "";
    }
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
