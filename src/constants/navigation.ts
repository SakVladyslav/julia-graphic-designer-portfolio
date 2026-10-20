import { homeHash } from "../utils/homeHash";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/**
 * Single source of truth for header and footer anchors.
 * Labels match the desktop homepage: Projects / Contacts.
 *
 * Later (n8n): this shape can be served from CMS/API without changing consumers.
 */
export const navigation: readonly NavItem[] = [
  { id: "projects", label: "Projects", href: homeHash("projects") },
  { id: "contacts", label: "Contacts", href: "#contacts" },
];
