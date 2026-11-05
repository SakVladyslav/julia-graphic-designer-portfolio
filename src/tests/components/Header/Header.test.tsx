import { act, cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Header from "../../../components/Header/Header";

import { contactActions } from "../../../constants/contacts";
import { mobileMenuAllProjectsHref, mobileMenuContactsHref } from "../../../constants/mobileMenu";

import { homeHash } from "../../../utils/url/homeHash";
import { withBaseUrl } from "../../../utils/url/withBaseUrl";

function showPhoneChrome() {
  const style = document.createElement("style");
  style.dataset.phoneChrome = "true";
  style.textContent = `
    .nav-toggle { display: grid !important; }
    .mobile-menu-root { display: block !important; }
  `;
  document.head.appendChild(style);
}

function renderHeader(tone?: "default" | "inverse") {
  return render(
    <MemoryRouter>
      <Header tone={tone} />
    </MemoryRouter>,
  );
}

async function revealMenu() {
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

async function openMenu(tone?: "default" | "inverse") {
  renderHeader(tone);
  const user = userEvent.setup();
  const burger = screen.getByRole("button", { name: "Open menu" });
  await user.click(burger);
  await revealMenu();
  const dialog = await screen.findByRole("dialog", { name: "Menu" });
  return { user, burger, dialog };
}

function linkedInHref(): string {
  for (const action of contactActions) {
    if (action.id === "linkedin" && action.href !== null) {
      return action.href;
    }
  }
  return "";
}

describe("Header", () => {
  beforeEach(() => {
    showPhoneChrome();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
    document.querySelector("[data-phone-chrome]")?.remove();
  });

  it("keeps desktop SiteNav and hides the overlay until the burger opens it", () => {
    renderHeader();

    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(primary).toBeInTheDocument();
    expect(within(primary).getByRole("link", { name: "Contacts" })).toHaveAttribute(
      "href",
      homeHash("contacts"),
    );
    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens the overlay from the burger and focuses Close menu", async () => {
    const { burger, dialog } = await openMenu();

    expect(burger).toHaveAttribute("aria-expanded", "true");
    expect(burger).toHaveTextContent("Close menu");
    expect(within(dialog).getByRole("button", { name: "Close menu" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes on the close button, Escape, and backdrop, and restores focus", async () => {
    const originalFocus = HTMLElement.prototype.focus;
    const focusCalls: Array<FocusOptions | undefined> = [];
    HTMLElement.prototype.focus = function focus(this: HTMLElement, options?: FocusOptions) {
      focusCalls.push(options);
      originalFocus.call(this);
    };
    try {
      const { user, burger, dialog } = await openMenu();
      focusCalls.length = 0;

      await user.click(within(dialog).getByRole("button", { name: "Close menu" }));
      await waitFor(() => {
        expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
      });
      expect(burger).toHaveAttribute("aria-expanded", "false");
      expect(burger).toHaveTextContent("Open menu");
      expect(burger).toHaveFocus();
      expect(focusCalls).toContainEqual({ preventScroll: true });
      expect(document.body.style.overflow).not.toBe("hidden");

      await user.click(burger);
      await revealMenu();
      await screen.findByRole("dialog", { name: "Menu" });
      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
      });

      await user.click(burger);
      await revealMenu();
      const backdrop = document.querySelector(".mobile-menu-backdrop");
      expect(backdrop).toBeInstanceOf(HTMLElement);
      if (backdrop instanceof HTMLElement) {
        await user.click(backdrop);
      }
      await waitFor(() => {
        expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
      });
    } finally {
      HTMLElement.prototype.focus = originalFocus;
    }
  });

  it("toggles the Projects accordion and exposes published case hrefs", async () => {
    const { user, dialog } = await openMenu();
    const projectsToggle = within(dialog).getByRole("button", { name: "Projects" });
    const base = import.meta.env.BASE_URL;

    expect(projectsToggle).toHaveAttribute("aria-expanded", "false");
    expect(within(dialog).queryByRole("link", { name: "Lovespace" })).not.toBeInTheDocument();

    await user.click(projectsToggle);
    expect(projectsToggle).toHaveAttribute("aria-expanded", "true");
    expect(within(dialog).getByRole("link", { name: "All Projects" })).toHaveAttribute(
      "href",
      mobileMenuAllProjectsHref(),
    );
    expect(within(dialog).getByRole("link", { name: "Lovespace" })).toHaveAttribute(
      "href",
      `${base}projects/lovespace`,
    );
    expect(within(dialog).getByRole("link", { name: "Molfaria" })).toHaveAttribute(
      "href",
      `${base}projects/molfaria`,
    );
    expect(within(dialog).getByRole("link", { name: "Best Budova Group" })).toHaveAttribute(
      "href",
      `${base}projects/bbg`,
    );
    expect(within(dialog).getByRole("link", { name: "Amaryllis Poster Series" })).toHaveAttribute(
      "href",
      `${base}projects/amaryllis`,
    );
    expect(within(dialog).queryByRole("link", { name: "Twitchvrotfl" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: "Book covers" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /olx/i })).not.toBeInTheDocument();

    await user.click(projectsToggle);
    expect(projectsToggle).toHaveAttribute("aria-expanded", "false");
    expect(projectsToggle).not.toHaveClass("mobile-menu-accordion--open");
    expect(within(dialog).queryByRole("link", { name: "Lovespace" })).not.toBeInTheDocument();
  });

  it("closes after a menu navigation and wires contacts plus contactActions", async () => {
    const { user, dialog } = await openMenu();
    const linkedIn = within(dialog).getByRole("link", { name: "LinkedIn" });

    expect(within(dialog).getByRole("link", { name: "Contacts" })).toHaveAttribute(
      "href",
      mobileMenuContactsHref(),
    );
    expect(linkedIn).toHaveAttribute("href", linkedInHref());
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(dialog).getByRole("link", { name: "View CV" })).toHaveAttribute(
      "href",
      withBaseUrl("CV_Samchuk.pdf"),
    );
    expect(within(dialog).getByRole("link", { name: "View CV" })).toHaveAttribute(
      "target",
      "_blank",
    );

    await user.click(within(dialog).getByRole("button", { name: "Projects" }));
    await user.click(within(dialog).getByRole("link", { name: "Lovespace" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    });
  });

  it("uses the header tone for the overlay", async () => {
    await openMenu("inverse");

    expect(document.querySelector(".mobile-menu-root--inverse")).not.toBeNull();
  });

  it("paints the inverse document canvas while the menu is open and clears it on close", async () => {
    const { user, dialog } = await openMenu("inverse");

    expect(document.documentElement).toHaveAttribute("data-canvas", "menu");

    await user.click(within(dialog).getByRole("button", { name: "Close menu" }));
    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute("data-canvas");
    });
  });

  it("leaves the document canvas untouched for the light menu", async () => {
    await openMenu();

    expect(document.documentElement).not.toHaveAttribute("data-canvas");
  });
});
