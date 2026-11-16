import { afterEach, describe, expect, it, vi } from "vitest";

import { CONTACTS_ID } from "../../../constants/navigation";

import { followContactsHash } from "../../../utils/dom/followContactsHash";
import { lockBodyScroll } from "../../../utils/dom/lockBodyScroll";
import { takeQueuedUnlockHashScroll } from "../../../utils/dom/programmaticScroll";

function navEvent(overrides: Partial<{ button: number; metaKey: boolean }> = {}) {
  return {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    preventDefault: vi.fn(),
    ...overrides,
  };
}

describe("followContactsHash", () => {
  afterEach(() => {
    takeQueuedUnlockHashScroll();
    document.getElementById(CONTACTS_ID)?.remove();
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
    delete document.documentElement.dataset.scrollLock;
    window.location.hash = "";
  });

  it("navigates to /#contacts when the page has no contacts block", () => {
    const event = navEvent();
    const navigate = vi.fn();

    expect(
      followContactsHash(event, {
        pathname: "/projects/olx",
        search: "",
        hash: "",
        navigate,
      }),
    ).toBe("home");
    expect(event.preventDefault).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/", search: "", hash: `#${CONTACTS_ID}` },
      { replace: false },
    );
  });

  it("stays on the page, updates the hash, and scrolls when #contacts exists", () => {
    const target = document.createElement("section");
    target.id = CONTACTS_ID;
    target.tabIndex = -1;
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);
    const event = navEvent();
    const navigate = vi.fn();

    expect(
      followContactsHash(event, {
        pathname: "/projects/olx",
        search: "",
        hash: "",
        navigate,
      }),
    ).toBe("in-page");
    expect(event.preventDefault).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/projects/olx", search: "", hash: `#${CONTACTS_ID}` },
      { replace: false },
    );
    expect(scrollIntoView).toHaveBeenCalled();
    expect(target).toHaveFocus();
  });

  it("replaces the current history entry when the hash is already contacts", () => {
    const target = document.createElement("section");
    target.id = CONTACTS_ID;
    target.tabIndex = -1;
    target.scrollIntoView = vi.fn();
    document.body.append(target);
    const navigate = vi.fn();

    followContactsHash(navEvent(), {
      pathname: "/projects/olx",
      search: "",
      hash: `#${CONTACTS_ID}`,
      navigate,
    });

    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/projects/olx", search: "", hash: `#${CONTACTS_ID}` },
      { replace: true },
    );
  });

  it("queues unlock scroll instead of scrolling while the body is locked", () => {
    window.scrollTo = vi.fn();
    const target = document.createElement("section");
    target.id = CONTACTS_ID;
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);

    const unlock = lockBodyScroll();
    const result = followContactsHash(navEvent(), {
      pathname: "/projects/olx",
      search: "",
      hash: "",
      navigate: vi.fn(),
    });

    expect(result).toBe("in-page");
    expect(scrollIntoView).not.toHaveBeenCalled();

    unlock();

    expect(scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("ignores modified clicks so the browser can open a new tab", () => {
    const event = navEvent({ metaKey: true });
    const navigate = vi.fn();

    expect(
      followContactsHash(event, {
        pathname: "/projects/olx",
        search: "",
        hash: "",
        navigate,
      }),
    ).toBe("ignored");
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
