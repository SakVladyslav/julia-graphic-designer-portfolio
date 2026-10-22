import { describe, expect, it } from "vitest";

import { listProjectCases } from "../constants/projectCases";
import { publishedProjectIds } from "../constants/publishedProjectIds";

import { indexablePaths } from "./indexablePaths";

describe("indexablePaths", () => {
  it("lists the homepage and every published case", () => {
    expect(publishedProjectIds()).toEqual(listProjectCases().map((projectCase) => projectCase.id));
    expect(indexablePaths("/", publishedProjectIds())).toEqual([
      "/",
      "/projects/lovespace",
      "/projects/molfaria",
      "/projects/amaryllis",
      "/projects/bbg",
      "/projects/olx",
      "/projects/novyny",
    ]);
  });

  it("prefixes a subdirectory base", () => {
    expect(indexablePaths("/portfolio/", ["lovespace"])).toEqual([
      "/portfolio",
      "/portfolio/projects/lovespace",
    ]);
  });
});
