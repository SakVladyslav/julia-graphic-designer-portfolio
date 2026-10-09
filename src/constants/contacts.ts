export type ContactDetail = {
  id: string;
  label: string;
  annotation: string;
  /**
   * Real URL, or `null`.
   * - `role: "link"` + `null` = stub waiting for a real link
   * - `role: "text"` + `null` = plain text
   */
  href: string | null;
  role: "link" | "text";
};

export type ContactActionVariant = "cv" | "linkedin";

export type ContactAction = {
  id: string;
  label: string;
  variant: ContactActionVariant;
  /** `null` = stub until a real URL is provided */
  href: string | null;
};

/**
 * Contact content as data (not JSX).
 *
 * TODO(owner): replace every stub `href: null` (role: "link") with real links:
 * - Telegram (t.me/...)
 * - LinkedIn
 * - CV (PDF URL or file under /public)
 *
 * Later (n8n): same fields can be filled from automation/CMS.
 */
export const contactDetails: readonly ContactDetail[] = [
  {
    id: "telegram",
    label: "Telegram",
    annotation: "[direct message]",
    href: null,
    role: "link",
  },
  {
    id: "email",
    label: "art.jsam@gmail.com",
    annotation: "[email]",
    href: "mailto:art.jsam@gmail.com",
    role: "link",
  },
];

export const contactLocation = "Based in Kyiv, Ukraine";

export const contactActions: readonly ContactAction[] = [
  {
    id: "cv",
    label: "View CV",
    variant: "cv",
    href: null,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    variant: "linkedin",
    href: null,
  },
];
