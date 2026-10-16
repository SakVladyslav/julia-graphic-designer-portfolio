export const SITE_OWNER = "Julia Samchuk";

/** Update yearly, or replace with build-time injection later if needed. */
export const COPYRIGHT_YEAR = 2026;

/** GitHub Pages hostname. The path is Vite's `base`, joined in `siteUrl`. */
export const SITE_ORIGIN = "https://sakvladyslav.github.io";

/** Shown under the title in search results and in a shared-link card. Keep it under 160 characters. */
export const SITE_DESCRIPTION =
  "Graphic designer based in Kyiv. Visual identity, branding, posters, and web design.";

export const OG_IMAGE = {
  file: "og.png",
  width: 1200,
  height: 630,
  alt: "Julia Samchuk, graphic designer",
} as const;
