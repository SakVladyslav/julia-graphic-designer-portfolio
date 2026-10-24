import { readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { listProjectCases } from "../../constants/projectCases";
import { projects } from "../../constants/projects";

const WIDTHS = [640, 960, 1280] as const;

const STATIC_FILES = [
  "public/Favicon.svg",
  "public/favicon-32.png",
  "public/apple-touch-icon.png",
  "public/og.png",
  "src/assets/hero-arrow.svg",
  "src/assets/menu.svg",
  "src/assets/to-top.svg",
  "src/assets/contact-arrow.svg",
] as const;

function publicKey(url: string): string | undefined {
  const clean = decodeURI(url.split("?")[0] ?? "");
  const marker = "projects/";
  const index = clean.indexOf(marker);
  if (index === -1) return undefined;
  return `public/${clean.slice(index)}`;
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
      continue;
    }
    if (/\.(webp|png|jpe?g|gif|svg|avif|ico)$/i.test(entry.name)) {
      out.push(path.relative(process.cwd(), full).split(path.sep).join("/"));
    }
  }
  return out;
}

function addRef(referenced: Map<string, number>, url: string, width: number): void {
  const key = publicKey(url);
  if (key === undefined) return;
  referenced.set(key, Math.max(referenced.get(key) ?? 0, width));
  if (!key.endsWith(".webp") || key.includes(" ")) return;
  for (const variant of WIDTHS) {
    if (width > variant) {
      referenced.set(key.replace(/\.webp$/i, `-${variant}w.webp`), variant);
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function walkImages(value: unknown, referenced: Map<string, number>): void {
  if (Array.isArray(value)) {
    for (const item of value) walkImages(item, referenced);
    return;
  }
  if (!isRecord(value)) return;

  const record = value;
  if (typeof record.src === "string" && typeof record.width === "number") {
    addRef(referenced, record.src, record.width);
  }
  if (typeof record.photo === "string" && typeof record.photoWidth === "number") {
    addRef(referenced, record.photo, record.photoWidth);
  }
  if (typeof record.texture === "string" && typeof record.textureWidth === "number") {
    addRef(referenced, record.texture, record.textureWidth);
  }
  if (typeof record.ring === "string" && typeof record.ringWidth === "number") {
    addRef(referenced, record.ring, record.ringWidth);
  }
  for (const field of ["srcSet", "photoSrcSet", "textureSrcSet"] as const) {
    const set = record[field];
    if (typeof set !== "string") continue;
    for (const part of set.split(",")) {
      const url = part.trim().split(" ")[0] ?? "";
      addRef(referenced, url, 0);
    }
  }

  for (const nested of Object.values(record)) walkImages(nested, referenced);
}

describe("project images", () => {
  it("keeps every image file referenced and present", async () => {
    const referenced = new Map<string, number>();
    walkImages(listProjectCases(), referenced);
    walkImages(projects, referenced);
    for (const file of STATIC_FILES) referenced.set(file, 0);

    const onDisk = [
      ...(await walk(path.join(process.cwd(), "public"))),
      ...(await walk(path.join(process.cwd(), "src/assets"))),
    ];

    const unused = onDisk.filter((file) => !referenced.has(file));
    const missing = [...referenced.keys()].filter((file) => !onDisk.includes(file));

    expect(onDisk.length).toBeGreaterThan(200);
    expect(missing).toEqual([]);
    expect(unused).toEqual([]);
  });
});
