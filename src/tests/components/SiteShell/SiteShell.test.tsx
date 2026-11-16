import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import SiteShell from "../../../components/SiteShell/SiteShell";

function renderShell(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<main>Home</main>} />
          <Route path="projects/:projectId" element={<main>Case</main>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("SiteShell", () => {
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

  afterEach(() => {
    cleanup();
    window.location.hash = "";
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  it("keeps the header outside the clip and the page inside it", () => {
    renderShell("/");

    const header = screen.getByRole("banner");
    const clip = document.querySelector(".site-shell-clip");
    const page = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");

    expect(clip).toBeInstanceOf(HTMLElement);
    if (!(clip instanceof HTMLElement)) {
      return;
    }

    expect(clip.contains(header)).toBe(false);
    expect(clip.contains(page)).toBe(true);
    expect(clip.contains(footer)).toBe(true);
    expect(page.closest(".container")).not.toBeNull();
    expect(header).not.toHaveClass("site-header--pinned");
    expect(header).not.toHaveClass("site-header--hidden");
  });

  it("keeps the header outside the clip on a published case", () => {
    renderShell("/projects/lovespace");

    const header = screen.getByRole("banner");
    const clip = document.querySelector(".site-shell-clip");

    expect(header).toHaveClass("site-header--inverse");
    expect(clip).toBeInstanceOf(HTMLElement);
    if (!(clip instanceof HTMLElement)) {
      return;
    }

    expect(clip.contains(header)).toBe(false);
    expect(clip.contains(screen.getByRole("main"))).toBe(true);
    expect(clip.contains(screen.getByRole("contentinfo"))).toBe(true);
  });

  it("scrolls to the contacts section for the home contacts hash", () => {
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={["/#contacts"]}>
        <SiteShell />
      </MemoryRouter>,
    );

    const contacts = document.getElementById("contacts");
    expect(contacts).not.toBeNull();
    expect(scrollIntoView).toHaveBeenCalled();
    expect(scrollIntoView.mock.instances[0]).toBe(contacts);
  });
});
