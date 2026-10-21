import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import ProjectCasePage from "./ProjectCasePage";

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

    expect(screen.getByRole("heading", { level: 1, name: "Lovespace" })).toBeInTheDocument();
    expect(screen.getByText("Visual Identity Redesign")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Brand philosophy" })).toBeInTheDocument();
    expect(screen.getByText("Kissed Lips")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /molfaria/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /amaryllis/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /we refuse the cult of perfection/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace logo on white" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace logo on black" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace logo on red" })).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "Lovespace logo on white, black, and red" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Open kraft Lovespace mailer box" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Black Lovespace mailer box" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Red Lovespace mailer box" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace lightbox sign" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Person wearing a black Lovespace t-shirt" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /packaging, signage, bags/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the molfaria case and skips the other molfaria card", () => {
    renderCase("molfaria");

    expect(screen.getByRole("heading", { level: 1, name: "Molfaria" })).toBeInTheDocument();
    expect(screen.getByText("Specialty Coffee Branding")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Molfaria logo" })).toBeInTheDocument();
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
    expect(screen.getByText("Poster Series & Merch")).toBeInTheDocument();
    expect(screen.getByText("// Tote Bag")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /posters beyond/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /best budova group/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Twitchvrotfl" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /amaryllis/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /twitchvrotfl/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Twitchvrotfl" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Book covers" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /best budova group/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /twitchvrotfl/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book covers/i })).not.toBeInTheDocument();
  });

  it("renders the olx business hub case and links the full case on behance", () => {
    renderCase("olx");

    expect(screen.getByRole("heading", { level: 1, name: "OLX Business Hub" })).toBeInTheDocument();
    expect(screen.getByText("B2B Website Redesign")).toBeInTheDocument();
    expect(screen.getByText("[Agency project]")).toBeInTheDocument();
    expect(screen.getByText("wireframing")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /olx business hub on a laptop/i })).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: /view case on behance/i })).toHaveAttribute(
      "href",
      "https://www.behance.net/gallery/172888923/novini-LIVE-News-website-redesign",
    );
    expect(screen.getByRole("heading", { name: "More projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lovespace/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /molfaria/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /novyny live/i })).not.toBeInTheDocument();
  });

  it("keeps the shell readable when a project has no case yet", () => {
    renderCase("unpublished");

    expect(screen.getByText("This project is not published yet.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "More projects" })).not.toBeInTheDocument();
  });
});
