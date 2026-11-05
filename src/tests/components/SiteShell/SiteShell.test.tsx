import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import SiteShell from "../../../components/SiteShell/SiteShell";

describe("SiteShell", () => {
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

  afterEach(() => {
    cleanup();
    window.location.hash = "";
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
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
