import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Footer from "./Footer";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the contacts band on the dark surface", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toHaveClass("site-footer--inverse");
    expect(screen.getByRole("heading", { name: "Contacts" })).toBeInTheDocument();
    expect(screen.getByText("Based in Kyiv, Ukraine")).toBeInTheDocument();
    expect(screen.getByText("View CV")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
  });

  it("supports the light surface", () => {
    render(<Footer tone="light" />);

    expect(screen.getByRole("contentinfo")).toHaveClass("site-footer--light");
    expect(screen.getByRole("contentinfo")).not.toHaveClass("site-footer--inverse");
  });
});
