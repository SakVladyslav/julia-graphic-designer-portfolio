import { OG_IMAGE, SITE_DESCRIPTION, SITE_OWNER } from "../constants/site.ts";

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

/** Description, canonical URL, and the share-card tags. One card for the whole site. */
export function siteHeadTags(pageUrl: string): string {
  const url = pageUrl.endsWith("/") ? pageUrl : `${pageUrl}/`;
  const imageUrl = `${url}${OG_IMAGE.file}`;
  const title = escapeAttribute(SITE_OWNER);
  const description = escapeAttribute(SITE_DESCRIPTION);
  const imageAlt = escapeAttribute(OG_IMAGE.alt);

  return [
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${title}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].join("\n    ");
}
