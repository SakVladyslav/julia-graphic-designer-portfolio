import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Contacts from "../../../components/Contacts/Contacts";

import { withBaseUrl } from "../../../utils/url/withBaseUrl";

describe("Contacts", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens the CV and LinkedIn actions in a new tab", () => {
    render(<Contacts />);

    const cv = screen.getByRole("link", { name: "View CV" });
    expect(cv).toHaveAttribute("href", withBaseUrl("CV_Samchuk.pdf"));
    expect(cv).toHaveAttribute("target", "_blank");
    expect(cv).toHaveAttribute("rel", "noopener noreferrer");
    expect(cv).not.toHaveAttribute("download");

    const linkedIn = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedIn).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/julia-samchuk-5b21791a1/",
    );
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
  });
});
