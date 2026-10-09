import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "./App";
import { routerBasename } from "./utils/routerBasename";

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
  });

  it("links only published project cases", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /lovespace/i })).toHaveAttribute(
      "href",
      `${import.meta.env.BASE_URL}projects/lovespace`,
    );
    expect(screen.queryByRole("link", { name: /amaryllis/i })).not.toBeInTheDocument();
  });

  it("gives an unknown address a main landmark", () => {
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}no-such-page`);
    render(<App />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("heading", { name: "This page does not exist." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to the homepage/i })).toHaveAttribute(
      "href",
      routerBasename() || "/",
    );
  });
});
