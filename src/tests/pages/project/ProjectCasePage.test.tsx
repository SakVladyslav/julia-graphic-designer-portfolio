import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import ProjectCasePage from "../../../pages/project/ProjectCasePage";

function renderCase(projectId: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${projectId}`]}>
      <Routes>
        <Route path="projects/:projectId" element={<ProjectCasePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProjectCasePage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the lovespace case from the shared sections", () => {
    renderCase("lovespace");

    expect(document.title).toBe("Lovespace — Julia Samchuk");
    expect(screen.getByRole("heading", { level: 1, name: "Lovespace" })).toBeInTheDocument();
    expect(screen.getByText("Visual Identity Redesign")).toBeInTheDocument();
    expect(
      screen
        .getByRole("img", { name: /close-up of skin folds/i })
        .closest("picture")
        ?.querySelector("source")
        ?.getAttribute("srcset"),
    ).toContain("hero-phone.webp");
    expect(
      screen
        .getByRole("img", { name: /close-up of skin folds/i })
        .closest(".case-media-stage")
        ?.querySelector(".case-ring img"),
    ).toHaveAttribute("src", expect.stringContaining("portrait-ring.svg"));
    expect(screen.getByRole("heading", { name: "Brand philosophy" })).toBeInTheDocument();
    expect(screen.getByText("Kissed Lips")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /molfaria/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /amaryllis/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /we refuse the cult of perfection/i }),
    ).toBeInTheDocument();
    expect(document.querySelector(".case-statement-copy")).toHaveTextContent(
      /We refuse the cult\s*of perfection/,
    );
    expect(document.querySelector(".case-statement-panel")).toHaveAttribute(
      "src",
      expect.stringContaining("statement-ring.svg"),
    );
    expect(screen.getByRole("img", { name: "Lovespace logo on white" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace logo on black" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace logo on red" })).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "Lovespace logo on white, black, and red" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Two Lovespace posters side by side", hidden: true }),
    ).toHaveAttribute("src", expect.stringContaining("posters-duo-phone.webp"));
    expect(
      screen.getAllByRole("img", { name: "Open kraft Lovespace mailer box", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Black Lovespace mailer box", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Red Lovespace mailer box", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", {
        name: "Open Lovespace box with tissue paper and an instruction card",
        hidden: true,
      }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Portrait with the Lovespace ring mark", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Lovespace shopping bag", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Lovespace fitting-room poster", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("img", { name: "Lovespace lightbox sign", hidden: true }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("img", { name: "Person wearing a black Lovespace t-shirt" }),
    ).toBeInTheDocument();
    const posts = [...document.querySelectorAll(".case-grid img")];
    expect(posts.map((post) => post.getAttribute("src"))).toEqual(
      ["01", "02", "03", "04", "05", "06"].map((number) =>
        expect.stringContaining(`post-${number}.webp`),
      ),
    );
    expect(posts[0]).toHaveAttribute("srcset", expect.stringContaining("post-01-640w.webp 640w"));
    expect(
      screen.queryByRole("img", { name: "Lovespace social media posts" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /packaging, signage, bags/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the molfaria case and skips the other molfaria card", () => {
    renderCase("molfaria");

    expect(screen.getByRole("heading", { level: 1, name: "Molfaria" })).toBeInTheDocument();
    expect(screen.getByText("Specialty Coffee Branding")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Molfaria logo" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /paper cup/i })).toHaveAttribute(
      "srcset",
      expect.stringContaining("molf-hero-640w.webp 640w"),
    );
    expect(screen.getByRole("img", { name: "Two Molfaria coffee bags" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Molfaria cap", hidden: true })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Molfaria shopping bag", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /можна не/i }).parentElement).toHaveAttribute(
      "lang",
      "uk",
    );
    expect(screen.getByText("Допивай каву спокійно").parentElement).toHaveAttribute("lang", "uk");
    expect(screen.getByRole("heading", { name: /смакуй/i }).parentElement).toHaveAttribute(
      "lang",
      "uk",
    );
    expect(screen.getByText("Навіть якщо це фільтр з молоком").parentElement).toHaveAttribute(
      "lang",
      "uk",
    );
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /amaryllis/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /best budova group/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /molfaria/i })).not.toBeInTheDocument();
  });

  it("renders the amaryllis case and keeps it out of related projects", () => {
    renderCase("amaryllis");

    expect(screen.getByRole("heading", { level: 1, name: "Amaryllis" })).toBeInTheDocument();
    expect(
      screen
        .getByRole("img", { name: /amaryllis poster leaning on a green sofa/i })
        .parentElement?.querySelector("source")
        ?.getAttribute("srcset"),
    ).toContain("hero-phone.webp");
    expect(screen.getByText("Poster Series & Merch")).toBeInTheDocument();
    expect(screen.getByText("// Tote Bag")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /posters beyond/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /best budova group/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /olx business hub/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /amaryllis/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Twitchvrotfl" })).not.toBeInTheDocument();
  });

  it("renders the best budova group case and keeps it out of related projects", () => {
    renderCase("bbg");

    expect(
      screen.getByRole("heading", { level: 1, name: "Best Budova Group" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Construction Company Visual Identity")).toBeInTheDocument();
    expect(screen.getByText("Logo typeface")).toBeInTheDocument();
    expect(screen.getByText(/lexend\s*deca/i)).toBeInTheDocument();
    expect(screen.getByText("Wix Madefor Display")).toBeInTheDocument();
    expect(screen.getByText("Communication typeface")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Best Budova Group lightbox sign on a concrete facade" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Icons" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "BBG monogram" })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Best Budova Group logo" })).toHaveLength(2);
    expect(screen.getByRole("img", { name: "House" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Best Budova Group construction fence banner" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("img", { name: "Best Budova Group construction fence banner" })
        .parentElement?.querySelector("source")
        ?.getAttribute("srcset"),
    ).toContain("BBG-01-phone.webp");
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /olx business hub/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /novyny live/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /best budova group/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Twitchvrotfl" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Book covers" })).not.toBeInTheDocument();
  });

  it("renders the olx business hub case and links the full case on behance", () => {
    renderCase("olx");

    expect(screen.getByRole("heading", { level: 1, name: "OLX Business Hub" })).toBeInTheDocument();
    expect(screen.getByText("B2B Website Redesign")).toBeInTheDocument();
    expect(screen.getByText("[Agency project]")).toBeInTheDocument();
    expect(screen.getByText("wireframing")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /olx business hub on a laptop/i })).toBeInTheDocument();
    expect(
      screen
        .getByRole("img", { name: /olx business hub on a laptop/i })
        .parentElement?.querySelector("source")
        ?.getAttribute("srcset"),
    ).toContain("Cover_OLX-phone.webp");
    expect(screen.getByRole("link", { name: /view case on behance/i })).toHaveAttribute(
      "href",
      "https://www.behance.net/gallery/217930743/OLX-B2B-UIUX-Redesign",
    );
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /novyny live/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lovespace/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /olx business hub/i })).not.toBeInTheDocument();
  });

  it("renders the novyny live case and links the full case on behance", () => {
    renderCase("novyny");

    expect(screen.getByRole("heading", { level: 1, name: "Novyny LIVE" })).toBeInTheDocument();
    expect(screen.getByText("News Website Redesign")).toBeInTheDocument();
    expect(screen.getByText("[Agency project]")).toBeInTheDocument();
    expect(screen.getByText("design system")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /novyny live homepage on a desktop/i }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("img", { name: /novyny live homepage on a desktop/i })
        .parentElement?.querySelector("source")
        ?.getAttribute("srcset"),
    ).toContain("Cover_Novyny-phone.webp");
    expect(screen.getByRole("link", { name: /view case on behance/i })).toHaveAttribute(
      "href",
      "https://www.behance.net/gallery/172888923/novini-LIVE-News-website-redesign",
    );
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lovespace/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /molfaria/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /novyny live/i })).not.toBeInTheDocument();
  });

  it("replaces the previous cover when opening the next project", async () => {
    const user = userEvent.setup();
    renderCase("lovespace");

    const previousCover = screen.getByRole("img", {
      name: "Lovespace visual identity, close-up of skin folds",
    });

    await user.click(screen.getByRole("link", { name: /molfaria/i }));

    expect(previousCover).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /paper cup/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Molfaria" })).toBeInTheDocument();
  });

  it("answers an unknown project address with the not-found page", () => {
    renderCase("unpublished");

    expect(screen.getByRole("heading", { name: "This page does not exist." })).toBeInTheDocument();
    expect(document.title).toBe("Page not found — Julia Samchuk");
    expect(screen.queryByRole("heading", { name: "More projects" })).not.toBeInTheDocument();
  });
});
