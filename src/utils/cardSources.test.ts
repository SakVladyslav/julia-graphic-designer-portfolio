import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { projects } from "../constants/projects";

import { cardSizes, cardSrcSet, percentScale } from "./cardSources";

function publicFile(url: string): string {
  return path.join(process.cwd(), "public", url.replace(/^\//, ""));
}

function candidateUrls(src: string, srcSet: string): string[] {
  const fromSet = srcSet.split(", ").map((candidate) => candidate.split(" ")[0] ?? "");
  return [src, ...fromSet];
}

describe("cardSources", () => {
  it("keeps smaller files and the original width", () => {
    expect(cardSrcSet("/projects/lovespace/lovespace-texture.webp", 900)).toBe(
      "/projects/lovespace/lovespace-texture-640w.webp 640w, /projects/lovespace/lovespace-texture.webp 900w",
    );
  });

  it("sizes a cropped frame wider than the card", () => {
    expect(cardSizes(percentScale("163.19%"))).toBe(
      "(max-width: 599px) calc(calc(100vw - 48px) * 1.632), 1005px",
    );
  });

  it("points every homepage card at files that exist", () => {
    for (const project of projects) {
      const image = project.image;
      const sources =
        image.kind === "lovespace"
          ? [
              ...candidateUrls(image.photo, image.photoSrcSet),
              ...candidateUrls(image.texture, image.textureSrcSet),
            ]
          : candidateUrls(image.src, image.srcSet);

      for (const url of sources) {
        expect(existsSync(publicFile(url)), url).toBe(true);
      }
    }
  });
});
