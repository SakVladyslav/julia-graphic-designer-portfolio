import { useEffect } from "react";

import { OG_IMAGE, SITE_OWNER } from "../constants/site.ts";

import { headForPath } from "./prerenderPages.ts";

interface MetaTag {
  attribute: "name" | "property";
  key: string;
  content: string | undefined;
}

function browserCanonical(pathname: string): string {
  const origin = window.location.origin;
  if (pathname === "/") {
    return `${origin}/`;
  }

  return `${origin}${pathname}`;
}

function upsertMeta(tag: MetaTag): void {
  const selector = `meta[${tag.attribute}="${tag.key}"]`;
  const existing = document.head.querySelector(selector);
  if (tag.content === undefined) {
    existing?.remove();
    return;
  }

  if (existing === null) {
    const created = document.createElement("meta");
    created.setAttribute(tag.attribute, tag.key);
    created.setAttribute("content", tag.content);
    document.head.append(created);
    return;
  }

  existing.setAttribute("content", tag.content);
}

function upsertCanonical(href: string): void {
  const existing = document.head.querySelector('link[rel="canonical"]');
  if (existing === null) {
    const created = document.createElement("link");
    created.rel = "canonical";
    created.href = href;
    document.head.append(created);
    return;
  }

  existing.setAttribute("href", href);
}

/** Keeps the live document head on the page after a client-side navigation. */
export function useDocumentHead(pathname: string): void {
  useEffect(() => {
    const resolved = headForPath(pathname);
    if (resolved === undefined) {
      return;
    }

    const { page } = resolved;
    const canonical = browserCanonical(resolved.canonicalPath);
    const imageUrl = `${window.location.origin}/${page.share.imageFile}`;
    document.title = page.title;

    const tags: readonly MetaTag[] = [
      { attribute: "name", key: "description", content: page.share.description },
      { attribute: "name", key: "robots", content: page.share.robots },
      { attribute: "property", key: "og:type", content: "website" },
      { attribute: "property", key: "og:site_name", content: SITE_OWNER },
      { attribute: "property", key: "og:title", content: page.share.title },
      { attribute: "property", key: "og:description", content: page.share.description },
      { attribute: "property", key: "og:url", content: canonical },
      { attribute: "property", key: "og:image", content: imageUrl },
      { attribute: "property", key: "og:image:width", content: String(OG_IMAGE.width) },
      { attribute: "property", key: "og:image:height", content: String(OG_IMAGE.height) },
      { attribute: "property", key: "og:image:alt", content: page.share.imageAlt },
      { attribute: "name", key: "twitter:card", content: "summary_large_image" },
      { attribute: "name", key: "twitter:title", content: page.share.title },
      { attribute: "name", key: "twitter:description", content: page.share.description },
      { attribute: "name", key: "twitter:image", content: imageUrl },
    ];

    upsertCanonical(canonical);
    for (const tag of tags) {
      upsertMeta(tag);
    }
  }, [pathname]);
}
