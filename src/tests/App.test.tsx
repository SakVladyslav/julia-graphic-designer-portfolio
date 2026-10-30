import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "../App";
import { loadProjectCasePage } from "../pages/project/loadProjectCasePage";
import { routerBasename } from "../utils/routerBasename";

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", import.meta.env.BASE_URL);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders skip link and primary landmarks", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /julia samchuk/i })).toBeInTheDocument();
    expect(document.title).toBe("Julia Samchuk");
    expect(document.getElementById("person-jsonld")?.textContent).toContain('"@type":"Person"');
  });

  it("orders the project cards as in the design", () => {
    render(<App />);

    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual([
      "Lovespace",
      "Molfaria",
      "Best Budova Group",
      "Amaryllis Poster Series",
      "Twitchvrotfl",
      "Book covers",
      "OLX Business Hub",
      "Novyny LIVE",
    ]);
  });

  it("links only published project cases", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /lovespace/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/lovespace`,
    );
    expect(screen.getByRole("link", { name: /molfaria/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/molfaria`,
    );
    expect(screen.getByRole("link", { name: /amaryllis/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/amaryllis`,
    );
    expect(screen.getByRole("link", { name: /best budova group/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/bbg`,
    );
    expect(screen.getByRole("link", { name: /olx business hub/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/olx`,
    );
    expect(screen.getByRole("heading", { name: "[Web Design Experience]" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /novyny live/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/novyny`,
    );
    expect(screen.getByText("[06]")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Twitchvrotfl" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Book covers" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /twitchvrotfl/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book covers/i })).not.toBeInTheDocument();

    const header = screen.getByRole("banner");
    expect(within(header).queryByRole("link", { name: "About" })).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("contentinfo")).queryByRole("link", { name: "About" }),
    ).not.toBeInTheDocument();
  });

  it("gives an unknown address a main landmark", async () => {
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}no-such-page`);
    render(<App />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(
      await screen.findByRole("heading", { name: "This page does not exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to the homepage/i })).toHaveAttribute(
      "href",
      routerBasename() || "/",
    );
    expect(document.title).toBe("Page not found — Julia Samchuk");
  });

  it("treats an unknown project address as a missing page", async () => {
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}projects/not-a-project`);
    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "This page does not exist." }),
    ).toBeInTheDocument();
    expect(document.querySelector(".site-shell--inverse")).not.toBeInTheDocument();
  });

  it("shows a published case on the first render after the page module has loaded", async () => {
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}projects/lovespace`);
    await loadProjectCasePage();
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Lovespace" })).toBeInTheDocument();
  });

  it("uses the inverse shell for a published project", async () => {
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}projects/lovespace`);
    render(<App />);

    expect(document.querySelector(".site-shell--inverse")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 1, name: "Lovespace" })).toBeInTheDocument();
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${window.location.origin}/projects/lovespace`,
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Lovespace — Julia Samchuk",
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `${window.location.origin}/projects/lovespace`,
    );
    expect(document.getElementById("person-jsonld")).toBeNull();
  });
});
