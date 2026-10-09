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
    expect(
      screen.getByRole("img", { name: /we refuse the cult of perfection/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lovespace lightbox sign" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Person wearing a black Lovespace t-shirt" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /packaging, signage, bags/i }),
    ).not.toBeInTheDocument();
  });

  it("keeps the shell readable when a project has no case yet", () => {
    renderCase("amaryllis");

    expect(screen.getByText("This project is not published yet.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "More projects" })).not.toBeInTheDocument();
  });
});
