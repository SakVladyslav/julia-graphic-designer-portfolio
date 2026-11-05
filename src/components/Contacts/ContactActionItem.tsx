import ContactArrow from "./ContactArrow";

import type { ContactAction } from "../../constants/contacts";

import { isExternalHref } from "../../utils/url/isExternalHref";

type ContactActionItemProps = {
  action: ContactAction;
};

export default function ContactActionItem({ action }: ContactActionItemProps) {
  const className = `contact-action contact-action--${action.variant}`;

  if (action.href === null) {
    return (
      <span className={`${className} contact-action--stub`} aria-disabled="true">
        {action.label}
        <span className="visually-hidden"> (link coming soon)</span>
        <ContactArrow />
      </span>
    );
  }

  const path = action.href.split(/[?#]/, 1)[0] ?? action.href;
  const opensInNewTab =
    action.variant === "cv" || isExternalHref(action.href) || path.toLowerCase().endsWith(".pdf");

  return (
    <a
      className={className}
      href={action.href}
      {...(opensInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : undefined)}
    >
      {action.label}
      <ContactArrow />
    </a>
  );
}
