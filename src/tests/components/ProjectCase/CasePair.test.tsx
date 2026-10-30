import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import CasePair from "../../../components/ProjectCase/CasePair";

import type { CasePairFrame } from "../../../constants/projectCase";

function frame(src: string, turned: boolean, opacity?: number): CasePairFrame {
  return {
    image: { src, width: 1264, height: 1580, alt: src },
    fit: "fill",
    grain: {
      src: "/grain.webp",
      width: 1024,
      height: 1024,
      turned,
      ...(opacity === undefined ? {} : { opacity }),
    },
  };
}

describe("CasePair", () => {
  afterEach(() => {
    cleanup();
  });

  it("puts a frame's grain opacity on the layer that blends", () => {
    render(
      <CasePair
        section={{
          type: "pair",
          frames: [frame("/flat.webp", false, 0.3), frame("/turned.webp", true, 0.2)],
        }}
      />,
    );

    expect(document.querySelector(".case-pair-grain:not(.case-pair-grain--turned)")).toHaveStyle({
      opacity: "0.3",
    });
    expect(document.querySelector(".case-pair-grain--turned")).not.toHaveAttribute("style");
    expect(document.querySelector(".case-pair-grain-turn")).toHaveStyle({ opacity: "0.2" });
  });

  it("leaves the stylesheet opacity alone when the frame sets none", () => {
    render(
      <CasePair
        section={{
          type: "pair",
          frames: [frame("/flat.webp", false), frame("/turned.webp", true)],
        }}
      />,
    );

    expect(document.querySelector(".case-pair-grain")).not.toHaveAttribute("style");
    expect(document.querySelector(".case-pair-grain-turn")).not.toHaveAttribute("style");
  });
});
