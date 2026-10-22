import { OG_IMAGE, SITE_DESCRIPTION, SITE_OWNER } from "../constants/site.ts";

import { personJsonLd } from "./personJsonLd.ts";
import { siteOrigin } from "./siteOrigin.ts";

export interface SharePage {
  title: string;
  description: string;
  imageFile: string;
  imageAlt: string;
  robots?: string;
  /** Set on the homepage. Becomes schema.org/Person in the document head. */
  jobTitle?: string;
}

const homeSharePage: SharePage = {
  title: SITE_OWNER,
  description: SITE_DESCRIPTION,
  imageFile: OG_IMAGE.file,
  imageAlt: OG_IMAGE.alt,
};

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

/** Description, canonical URL, and the share-card tags for one page. */
export function siteHeadTags(pageUrl: string, page: SharePage = homeSharePage): string {
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);
  const imageAlt = escapeAttribute(page.imageAlt);
  const canonical = escapeAttribute(pageUrl);
  const imageUrl = escapeAttribute(`${siteOrigin()}/${page.imageFile}`);
  const robots =
    page.robots === undefined
      ? []
      : [`<meta name="robots" content="${escapeAttribute(page.robots)}" />`];

  const canonicalLink =
    page.robots === "noindex" ? [] : [`<link rel="canonical" href="${canonical}" />`];
  const structuredData =
    page.jobTitle === undefined
      ? []
      : [`<script type="application/ld+json">${personJsonLd(pageUrl, page.jobTitle)}</script>`];

  return [
    `<meta name="description" content="${description}" />`,
    ...robots,
    ...canonicalLink,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttribute(SITE_OWNER)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    ...structuredData,
  ].join("\n    ");
}
