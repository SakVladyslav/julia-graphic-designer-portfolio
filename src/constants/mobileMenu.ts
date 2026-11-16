import { navigation } from "./navigation";
import { projects } from "./projects";
import { publishedProjectIds } from "./publishedProjectIds";

import { homeHash } from "../utils/url/homeHash";
import { projectCaseId } from "../utils/projects/projectCaseId";

/** Matches `$bp-phone` in `src/styles/_breakpoints.scss`. */
export const MOBILE_MENU_MAX_WIDTH_PX = 479;

export interface MobileMenuProjectLink {
  id: string;
  label: string;
  href: string;
}

/**
 * Figma mobile-menu order. Twitchvrotfl has no case page.
 * Book covers is published, but this menu does not list it.
 */
const FIGMA_PROJECT_IDS = ["lovespace", "molfaria-window", "bbg", "amaryllis"] as const;

export function mobileMenuProjectLinks(): readonly MobileMenuProjectLink[] {
  const published = new Set(publishedProjectIds());
  const items: MobileMenuProjectLink[] = [];

  for (const projectId of FIGMA_PROJECT_IDS) {
    const project = projects.find((entry) => entry.id === projectId);
    if (project === undefined) {
      continue;
    }
    const caseId = projectCaseId(project);
    if (!published.has(caseId)) {
      continue;
    }
    items.push({
      id: project.id,
      label: project.title,
      href: `/projects/${caseId}`,
    });
  }

  return items;
}

export function mobileMenuAllProjectsHref(): string {
  for (const item of navigation) {
    if (item.id === "projects") {
      return item.href;
    }
  }
  return "/#projects";
}

export function mobileMenuContactsHref(): string {
  for (const item of navigation) {
    if (item.id === "contacts") {
      return item.href;
    }
  }
  return homeHash("contacts");
}
