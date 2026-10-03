export type NavItem = {
  id: string;
  label: string;
  href: `#${string}`;
};

/**
 * Single source of truth for header/footer anchors.
 * Labels match Figma (Works / About / Contacts).
 *
 * Later (n8n): this shape can be served from CMS/API without changing consumers.
 */
export const navigation: readonly NavItem[] = [
  { id: "works", label: "Works", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
  { id: "contacts", label: "Contacts", href: "#contacts" },
];
