import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const headers = readFileSync(path.join(process.cwd(), "public", "_headers"), "utf8");

function headerValues(name: string): string[] {
  const pattern = new RegExp(`^\\s*${name}:\\s*(.+)$`, "gim");
  return [...headers.matchAll(pattern)].map((match) => match[1] ?? "");
}

describe("public/_headers", () => {
  it("caches fingerprinted files for a year, and fonts and case images on their own clocks", () => {
    const cacheControl = headerValues("Cache-Control");

    expect(cacheControl).toEqual([
      "public, max-age=31536000, immutable",
      "public, max-age=31536000, immutable",
      "public, max-age=604800, stale-while-revalidate=86400",
    ]);
    expect(headers.indexOf("/assets/*")).toBeGreaterThan(headers.indexOf("/*"));
    expect(headers.indexOf("/fonts/*")).toBeGreaterThan(headers.indexOf("/assets/*"));
    expect(headers.indexOf("/projects/*/*.webp")).toBeGreaterThan(headers.indexOf("/fonts/*"));
  });

  it("sends the security headers on every response", () => {
    expect(headerValues("Strict-Transport-Security")).toEqual([
      "max-age=31536000; includeSubDomains",
    ]);
    expect(headerValues("X-Content-Type-Options")).toEqual(["nosniff"]);
    expect(headerValues("X-Frame-Options")).toEqual(["DENY"]);
    expect(headerValues("Referrer-Policy")).toEqual(["strict-origin-when-cross-origin"]);
    expect(headerValues("Cross-Origin-Opener-Policy")).toEqual(["same-origin"]);

    const policy = headerValues("Content-Security-Policy")[0] ?? "";
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("script-src 'self' https://static.cloudflareinsights.com");
    expect(policy).toContain("connect-src 'self' https://cloudflareinsights.com");
    expect(policy).toContain("style-src 'self' 'unsafe-inline'");
    expect(policy).toContain("img-src 'self' data:");
    expect(policy).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(policy).toContain("frame-ancestors 'none'");
  });
});
