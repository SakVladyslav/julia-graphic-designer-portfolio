import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ProjectVisual from "../../../components/ProjectCard/ProjectVisual";

import { projects } from "../../../constants/projects";

const lovespace = projects[0];
const molfaria = projects[1];

if (lovespace === undefined || molfaria === undefined) {
  throw new Error("Homepage projects are missing");
}

describe("ProjectVisual", () => {
  afterEach(() => {
    cleanup();
  });

  it("gives fetch priority to the lovespace photo, the measured LCP element", () => {
    render(<ProjectVisual project={lovespace} priority />);

    const texture = document.querySelector(".lovespace-texture");
    const photo = document.querySelector(".lovespace-photo");

    expect(photo).toHaveAttribute("fetchpriority", "high");
    expect(photo).toHaveAttribute("srcset", expect.stringContaining("640w"));
    expect(texture).not.toHaveAttribute("fetchpriority");
    expect(texture).toHaveAttribute(
      "srcset",
      expect.stringContaining("lovespace-texture-640w.webp 640w"),
    );
  });

  it("lazy-loads a later card and still offers a small candidate", () => {
    if (molfaria.image.kind === "lovespace") {
      throw new Error("Molfaria card is not a framed image");
    }

    render(<ProjectVisual project={molfaria} />);

    const image = document.querySelector("img");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).not.toHaveAttribute("fetchpriority");
    expect(image).toHaveAttribute(
      "srcset",
      expect.stringContaining("molfaria-window-640w.webp 640w"),
    );
  });
});
