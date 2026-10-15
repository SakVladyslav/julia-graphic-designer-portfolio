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
 * TODO(owner): replace the remaining stub `href: null` with a real link:
 * - CV (PDF URL or file under /public)
 *
 * Later (n8n): same fields can be filled from automation/CMS.
 */
export const contactDetails: readonly ContactDetail[] = [
  {
    id: "telegram",
    label: "Telegram",
    annotation: "[direct message]",
    href: "https://t.me/juliasamchuk",
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
    href: "https://www.linkedin.com/in/julia-samchuk-5b21791a1/",
  },
];
