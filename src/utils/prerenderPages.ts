import { listProjectCases } from "../constants/projectCases.ts";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_OWNER } from "../constants/site.ts";

import type { CaseIntroSection, ProjectCase } from "../constants/projectCase.ts";

import type { SharePage } from "./siteHeadTags.ts";

const META_DESCRIPTION_LIMIT = 160;

export interface PrerenderPage {
  pathname: string;
  /** Path inside `dist`, for example `projects/lovespace/index.html`. */
  output: string;
  title: string;
  share: SharePage;
}

export function clampMetaDescription(text: string): string {
  const normalized = text.replaceAll(/\s+/g, " ").trim();
  if (normalized.length <= META_DESCRIPTION_LIMIT) {
    return normalized;
  }

  const room = META_DESCRIPTION_LIMIT - 1;
  const sliced = normalized.slice(0, room);
  const boundary = sliced.lastIndexOf(" ");
  const cut = boundary >= 80 ? sliced.slice(0, boundary) : sliced;
  return `${cut.trimEnd()}…`;
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export interface ResolvedHead {
  page: PrerenderPage;
  /** Path used in canonical and og:url. Unknown addresses keep their own path. */
  canonicalPath: string;
}

/**
 * Share card for the address the browser is showing.
 * Unknown addresses reuse the not-found card and stay noindex.
 */
export function headForPath(pathname: string): ResolvedHead | undefined {
  const normalized = normalizePathname(pathname);
  const pages = prerenderPages();
  const found = pages.find((page) => page.pathname === normalized);
  if (found !== undefined) {
    return { page: found, canonicalPath: found.pathname };
  }

  const missing = pages.find((page) => page.pathname === "/404");
  if (missing === undefined) {
    return undefined;
  }

  return { page: missing, canonicalPath: normalized === "" ? "/" : normalized };
}

function introSection(projectCase: ProjectCase): CaseIntroSection | undefined {
  const section = projectCase.sections.find((item) => item.type === "intro");
  if (section === undefined || section.type !== "intro") {
    return undefined;
  }

  return section;
}

function projectDescription(projectCase: ProjectCase): string {
  const intro = introSection(projectCase);
  if (intro === undefined) {
    return SITE_DESCRIPTION;
  }

  const lead = intro.paragraphs[0];
  if (lead === undefined) {
    return intro.subtitle;
  }

  return clampMetaDescription(`${intro.subtitle}. ${lead}`);
}

function projectShare(projectCase: ProjectCase): SharePage {
  const description = projectDescription(projectCase);

  return {
    title: `${projectCase.title} — ${SITE_OWNER}`,
    description,
    imageFile: OG_IMAGE.file,
    imageAlt: `${projectCase.title}, ${SITE_OWNER}`,
  };
}

/** Pages written at build time. One file per address a crawler can request. */
export function prerenderPages(): readonly PrerenderPage[] {
  const home: PrerenderPage = {
    pathname: "/",
    output: "index.html",
    title: SITE_OWNER,
    share: {
      title: SITE_OWNER,
      description: SITE_DESCRIPTION,
      imageFile: OG_IMAGE.file,
      imageAlt: OG_IMAGE.alt,
    },
  };

  const projects = listProjectCases().map((projectCase) => ({
    pathname: `/projects/${projectCase.id}`,
    output: `projects/${projectCase.id}/index.html`,
    title: `${projectCase.title} — ${SITE_OWNER}`,
    share: projectShare(projectCase),
  }));

  const notFound: PrerenderPage = {
    pathname: "/404",
    output: "404.html",
    title: `Page not found — ${SITE_OWNER}`,
    share: {
      title: `Page not found — ${SITE_OWNER}`,
      description: "This page does not exist.",
      imageFile: OG_IMAGE.file,
      imageAlt: OG_IMAGE.alt,
      robots: "noindex",
    },
  };

  return [home, ...projects, notFound];
}
