import { describe, expect, it } from "vitest";

import { visibleProjects } from "../../../constants/projects";

import { nextProjects } from "../../../utils/projects/nextProjects";

describe("nextProjects", () => {
  it("returns the following projects and wraps to the start", () => {
    const list = [{ id: "a" }, { id: "b", caseId: "bee" }, { id: "c" }];

    expect(nextProjects(list, "a", 2).map((project) => project.id)).toEqual(["b", "c"]);
    expect(nextProjects(list, "bee", 2).map((project) => project.id)).toEqual(["c", "a"]);
    expect(nextProjects(list, "c", 2).map((project) => project.id)).toEqual(["a", "b"]);
  });

  it("returns nothing when the open case is not in the list", () => {
    expect(nextProjects([{ id: "a" }], "missing", 2)).toEqual([]);
  });

  it("follows the homepage order", () => {
    expect(nextProjects(visibleProjects, "lovespace", 2).map((project) => project.id)).toEqual([
      "molfaria-window",
      "bbg",
    ]);
    expect(nextProjects(visibleProjects, "novyny", 2).map((project) => project.id)).toEqual([
      "lovespace",
      "molfaria-window",
    ]);
    expect(nextProjects(visibleProjects, "bbg", 2).map((project) => project.id)).toEqual([
      "amaryllis",
      "book-covers",
    ]);
  });
});
