import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Footer from "../../../components/Footer/Footer";

import { homeHash } from "../../../utils/url/homeHash";
import { withBaseUrl } from "../../../utils/url/withBaseUrl";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the contacts band on the dark surface", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toHaveClass("site-footer--inverse");
    expect(screen.getByRole("heading", { name: "Contacts" })).toBeInTheDocument();
    expect(screen.getByText("Based in Kyiv, Ukraine")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/juliasamchuk",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/julia-samchuk-5b21791a1/",
    );
    expect(screen.getByText("[email]").closest("li")).toHaveClass("contact-detail--email");
    expect(screen.getByRole("link", { name: "Contacts" })).toHaveAttribute(
      "href",
      homeHash("contacts"),
    );
    expect(screen.getByRole("link", { name: "View CV" })).toHaveAttribute(
      "href",
      withBaseUrl("CV_Samchuk.pdf"),
    );
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
  });

  it("supports the light surface", () => {
    render(<Footer tone="light" />);

    expect(screen.getByRole("contentinfo")).toHaveClass("site-footer--light");
    expect(screen.getByRole("contentinfo")).not.toHaveClass("site-footer--inverse");
  });
});
