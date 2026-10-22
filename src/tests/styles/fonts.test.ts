import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readProjectFile(relativePath: string): string {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function channel(hex: string, offset: number): number {
  const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground: string, background: string): number {
  const luminance = (hex: string) =>
    0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function token(source: string, name: string): string {
  const match = new RegExp(`\\$${name}:\\s*(#[0-9a-f]{6})`, "i").exec(source);
  return match?.[1] ?? "";
}

describe("homepage type", () => {
  it("keeps the project count readable on the page background", () => {
    const colors = readProjectFile("src/styles/_colors.scss");
    const page = readProjectFile("src/pages/home/LandingPage.scss");
    const countRule = page.slice(page.indexOf(".section-count {"), page.indexOf(".project-grid {"));

    expect(contrast(token(colors, "accent-text"), token(colors, "bg"))).toBeGreaterThanOrEqual(4.5);
    expect(countRule).toContain("color: $accent-text");
    expect(countRule).not.toContain("opacity");
  });

  it("keeps pink captions readable on the light footer and the missing page", () => {
    const colors = readProjectFile("src/styles/_colors.scss");
    const footer = readProjectFile("src/components/Footer/Footer.scss");
    const missing = readProjectFile("src/pages/not-found/NotFoundPage.scss");
    const lightFooter = footer.slice(footer.indexOf(".site-footer--light {"));

    expect(
      contrast(token(colors, "accent-text"), token(colors, "surface-muted")),
    ).toBeGreaterThanOrEqual(4.5);
    expect(lightFooter).toContain(".site-footer--light .annotation");
    expect(lightFooter).toContain("color: $accent-text");
    expect(missing).toContain("color: $accent-text");
    expect(missing).not.toContain("color: $accent;");
  });

  it("ships font faces in the bundle as woff2", () => {
    const html = readProjectFile("index.html");
    const faces = readProjectFile("src/styles/_fonts.scss");

    expect(html).not.toContain("/fonts/minsans.css");
    expect(html).not.toContain("/fonts/poster.css");
    expect(html).not.toContain("/fonts/bbg-type.css");
    expect(faces).toContain("/fonts/e-Ukraine-Light.woff2");
    expect(faces).not.toContain(".otf");
  });
});
