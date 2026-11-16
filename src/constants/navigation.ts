import { homeHash } from "../utils/url/homeHash";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** DOM id for the contacts section on any page that renders it. */
export const CONTACTS_ID = "contacts";

/**
 * Single source of truth for header and footer anchors.
 * Labels match the desktop homepage: Projects / Contacts.
 *
 * Later (n8n): this shape can be served from CMS/API without changing consumers.
 */
export const navigation: readonly NavItem[] = [
  { id: "projects", label: "Projects", href: homeHash("projects") },
  { id: CONTACTS_ID, label: "Contacts", href: homeHash(CONTACTS_ID) },
];
