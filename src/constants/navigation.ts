import { homeHash } from "../utils/homeHash";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

/**
 * Single source of truth for header/footer anchors.
 * Labels match Figma (Projects / About / Contacts).
 *
 * Later (n8n): this shape can be served from CMS/API without changing consumers.
 */
export const navigation: readonly NavItem[] = [
  { id: "projects", label: "Projects", href: homeHash("projects") },
  { id: "about", label: "About", href: homeHash("about") },
  { id: "contacts", label: "Contacts", href: "#contacts" },
];
