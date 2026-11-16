import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import Header from "../../../components/Header/Header";
import SiteShell from "../../../components/SiteShell/SiteShell";

import { takeQueuedUnlockHashScroll } from "../../../utils/dom/programmaticScroll";

function setScrollY(y: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
}

function dispatchScroll() {
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

function scrollToY(y: number) {
  setScrollY(y);
  dispatchScroll();
}

function installRestoringScroll() {
  window.scrollTo = vi.fn((options?: ScrollToOptions | number, y?: number) => {
    const top = typeof options === "number" ? (y ?? options) : (options?.top ?? 0);
    setScrollY(top);
    window.dispatchEvent(new Event("scroll"));
  }) as typeof window.scrollTo;
}

async function flushMenuFrames() {
  await act(async () => {
    await new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          resolve(undefined);
        });
      });
    });
  });
}

function installMedia(options: { mobile: boolean; reduce: boolean }) {
  const listeners = new Set<EventListener>();
  let mobile = options.mobile;
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const isWidth = query.includes("max-width");
    const isReduce = query.includes("prefers-reduced-motion");
    return {
      get matches() {
        if (isWidth) {
          return mobile;
        }
        return isReduce ? options.reduce : false;
      },
      media: query,
      addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (isWidth && type === "change" && typeof listener === "function") {
          listeners.add(listener);
        }
      },
      removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (isWidth && type === "change" && typeof listener === "function") {
          listeners.delete(listener);
        }
      },
    };
  });

  return {
    leaveMobile() {
      mobile = false;
      const event = new Event("change");
      act(() => {
        for (const listener of listeners) {
          listener(event);
        }
      });
    },
    restore() {
      window.matchMedia = original;
    },
  };
}

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

type PointerUser = ReturnType<typeof userEvent.setup>;

async function openMenu(user: PointerUser) {
  const burger = within(screen.getByRole("banner")).getByRole("button", { hidden: true });
  if (burger.getAttribute("aria-expanded") !== "true") {
    await user.click(burger);
  }
  await flushMenuFrames();
  return burger;
}

function browserDropsScroll() {
  setScrollY(0);
  dispatchScroll();
}

function expectLook(pinned: boolean) {
  const header = screen.getByRole("banner");
  if (pinned) {
    expect(header).toHaveClass("site-header--pinned");
  } else {
    expect(header).not.toHaveClass("site-header--pinned");
  }
  expect(header).not.toHaveClass("site-header--hidden");
  expect(header).not.toHaveClass("site-header--slide");
  expect(header).not.toHaveClass("site-header--fade");
}

type CloseHow = "burger" | "escape" | "backdrop" | "button";

async function closeMenu(user: PointerUser, burger: HTMLElement, how: CloseHow) {
  if (how === "burger") {
    await user.click(burger);
    return;
  }
  if (how === "escape") {
    await user.keyboard("{Escape}");
    return;
  }
  if (how === "backdrop") {
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    expect(backdrop).toBeInstanceOf(HTMLElement);
    if (backdrop instanceof HTMLElement) {
      await user.click(backdrop);
    }
    return;
  }
  const dialog = screen.getByRole("dialog", { name: "Menu" });
  await user.click(within(dialog).getByRole("button", { name: "Close menu" }));
}

function HomeRoute() {
  const navigate = useNavigate();
  return (
    <main>
      <button type="button" onClick={() => navigate("/projects/lovespace")}>
        Open case
      </button>
      <button type="button" onClick={() => navigate("/#contacts")}>
        Jump contacts
      </button>
      <section id="contacts">Contacts</section>
    </main>
  );
}

function CaseRoute() {
  const navigate = useNavigate();
  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </main>
  );
}

function renderShell() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomeRoute />} />
          <Route path="projects/:projectId" element={<CaseRoute />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("header programmatic scroll", () => {
  const originalScrollTo = window.scrollTo;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    cleanup();
    setScrollY(0);
    window.scrollTo = originalScrollTo;
    window.matchMedia = originalMatchMedia;
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    delete document.documentElement.dataset.scrollLock;
    takeQueuedUnlockHashScroll();
    window.location.hash = "";
    for (const extra of document.querySelectorAll("body > section")) {
      extra.remove();
    }
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
  });

  it.each([
    { y: 0, pinned: false },
    { y: 640, pinned: true },
    { y: 8000, pinned: true },
  ])("resyncs the header after the menu closes at scrollY $y", async ({ y, pinned }) => {
    installRestoringScroll();
    setScrollY(y);
    renderHeader();
    if (pinned) {
      expect(screen.getByRole("banner")).toHaveClass("site-header--pinned");
    }

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    await closeMenu(user, burger, "burger");

    expect(window.scrollY).toBe(y);
    expectLook(pinned);
  });

  it.each(["escape", "backdrop", "button"] as const)(
    "resyncs the header after closing with %s below the top",
    async (how) => {
      installRestoringScroll();
      setScrollY(640);
      renderHeader();
      const user = userEvent.setup();
      const burger = await openMenu(user);
      browserDropsScroll();
      await closeMenu(user, burger, how);

      expect(window.scrollY).toBe(640);
      expectLook(true);
    },
  );

  it("pins after closing with Projects expanded and the menu panel scrolled", async () => {
    installRestoringScroll();
    setScrollY(640);
    renderHeader();
    const user = userEvent.setup();
    const burger = await openMenu(user);
    await user.click(screen.getByRole("button", { name: "Projects" }));
    const panel = document.querySelector(".mobile-menu-panel");
    expect(panel).toBeInstanceOf(HTMLElement);
    if (panel instanceof HTMLElement) {
      panel.scrollTop = 180;
      panel.dispatchEvent(new Event("scroll"));
    }
    browserDropsScroll();
    await closeMenu(user, burger, "burger");

    expect(window.scrollY).toBe(640);
    expectLook(true);
  });

  it("keeps the header put when the menu is closed before it is presented", async () => {
    installRestoringScroll();
    setScrollY(640);
    renderHeader();
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    const user = userEvent.setup();
    const burger = within(screen.getByRole("banner")).getByRole("button", { hidden: true });
    await user.click(burger);
    await user.click(burger);
    raf.mockRestore();

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(document.body.style.position).not.toBe("fixed");
    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    expectLook(true);
  });

  it("starts a fresh 10 px threshold after a hidden header is pinned by closing the menu", async () => {
    installRestoringScroll();
    setScrollY(0);
    renderHeader();
    scrollToY(24);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    await closeMenu(user, burger, "burger");

    expect(window.scrollY).toBe(24);
    expectLook(true);

    act(() => {
      burger.blur();
    });
    scrollToY(33);
    expect(screen.getByRole("banner")).toHaveClass("site-header--pinned");
    expect(screen.getByRole("banner")).not.toHaveClass("site-header--hidden");

    scrollToY(34);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");
    expect(screen.getByRole("banner")).toHaveClass("site-header--slide");
  });

  it("fades a real scroll under reduced motion and snaps without fade when the menu closes", async () => {
    const media = installMedia({ mobile: true, reduce: true });
    installRestoringScroll();
    setScrollY(0);
    renderHeader();
    scrollToY(20);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");
    expect(screen.getByRole("banner")).toHaveClass("site-header--fade");

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    await closeMenu(user, burger, "burger");

    expect(window.scrollY).toBe(20);
    expectLook(true);

    act(() => {
      burger.blur();
    });
    scrollToY(30);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");
    expect(screen.getByRole("banner")).toHaveClass("site-header--fade");
    expect(screen.getByRole("banner")).not.toHaveClass("site-header--slide");
    media.restore();
  });

  it("pins after choosing Contacts in the menu on a page that already has the block", async () => {
    installRestoringScroll();
    HTMLElement.prototype.scrollIntoView = function scrollIntoView(this: HTMLElement) {
      if (this.id !== "contacts") {
        return;
      }
      setScrollY(880);
      window.dispatchEvent(new Event("scroll"));
    };
    renderShell();
    scrollToY(640);

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    await user.click(within(dialog).getByRole("link", { name: "Contacts" }));

    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(window.scrollY).toBe(880);
    expectLook(true);
  });

  it("pins after a hash chosen in the menu, and after a new-tab link", async () => {
    installRestoringScroll();
    setScrollY(640);
    renderHeader();
    const section = document.createElement("section");
    section.id = "contacts";
    section.scrollIntoView = () => {
      setScrollY(880);
      window.dispatchEvent(new Event("scroll"));
    };
    document.body.append(section);

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    window.location.hash = "#contacts";
    await closeMenu(user, burger, "burger");

    expect(window.scrollY).toBe(880);
    expectLook(true);

    await openMenu(user);
    browserDropsScroll();
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    const linkedIn = within(dialog).getByRole("link", { name: "LinkedIn" });
    linkedIn.addEventListener("click", (event) => {
      event.preventDefault();
    });
    await user.click(linkedIn);

    expect(window.scrollY).toBe(880);
    expectLook(true);
    section.remove();
  });

  it("pins on a route hash jump and rests after a case route, including back", async () => {
    installRestoringScroll();
    HTMLElement.prototype.scrollIntoView = function scrollIntoView(this: HTMLElement) {
      if (this.id !== "contacts") {
        return;
      }
      setScrollY(500);
      window.dispatchEvent(new Event("scroll"));
    };
    renderShell();
    expectLook(false);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Jump contacts" }));
    expect(window.scrollY).toBe(500);
    expectLook(true);

    await user.click(screen.getByRole("button", { name: "Open case" }));
    expect(window.scrollY).toBe(0);
    expectLook(false);

    scrollToY(120);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(window.scrollY).toBe(500);
    expectLook(true);
  });

  it("rests at the top of a case opened from the menu", async () => {
    installRestoringScroll();
    renderShell();
    scrollToY(640);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");

    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();
    await user.click(screen.getByRole("button", { name: "Projects" }));
    await user.click(screen.getByRole("link", { name: "Lovespace" }));

    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(window.scrollY).toBe(0);
    expectLook(false);
  });

  it("pins when a resize crosses the phone breakpoint with the menu open", async () => {
    const media = installMedia({ mobile: true, reduce: false });
    installRestoringScroll();
    setScrollY(640);
    renderHeader();
    const user = userEvent.setup();
    const burger = await openMenu(user);
    browserDropsScroll();

    media.leaveMobile();

    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(window.scrollY).toBe(640);
    expectLook(true);
    media.restore();
  });

  it("pins a hidden header when the viewport resizes without a user scroll", () => {
    setScrollY(0);
    renderHeader();
    scrollToY(40);
    expect(screen.getByRole("banner")).toHaveClass("site-header--hidden");

    setScrollY(400);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expectLook(true);
  });
});
