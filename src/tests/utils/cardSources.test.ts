import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { listProjectCases } from "../../constants/projectCases";
import { projects } from "../../constants/projects";

import {
  cardSizes,
  cardSrcSet,
  caseImageSizes,
  optionalSrcSet,
  percentScale,
} from "../../utils/cardSources";

function publicFile(url: string): string {
  return path.join(process.cwd(), "public", decodeURI(url.replace(/^\//, "")));
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

  it("sizes a case frame to the viewport up to the page width", () => {
    expect(caseImageSizes()).toBe("(max-width: 1440px) 100vw, 1440px");
  });

  it("points every case webp at files that exist", () => {
    const images: { src: string; width: number }[] = [];
    for (const projectCase of listProjectCases()) {
      collectWebp(projectCase.sections, images);
    }

    expect(images.length).toBeGreaterThan(0);

    for (const image of images) {
      const srcSet = optionalSrcSet(image.src, image.width);
      const urls = srcSet === undefined ? [image.src] : candidateUrls(image.src, srcSet);
      for (const url of urls) {
        expect(existsSync(publicFile(url)), url).toBe(true);
      }
    }
  });
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function collectWebp(value: unknown, found: { src: string; width: number }[]): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectWebp(item, found);
    }
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  const { src, width } = value;
  if (typeof src === "string" && src.endsWith(".webp") && typeof width === "number") {
    found.push({ src, width });
  }

  for (const nested of Object.values(value)) {
    collectWebp(nested, found);
  }
}
