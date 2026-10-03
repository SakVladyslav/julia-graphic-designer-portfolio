import ContactArrow from "./ContactArrow";

import type { ContactAction } from "../../constants/contacts";

import { isExternalHref } from "../../utils/isExternalHref";

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

  return (
    <a
      className={className}
      href={action.href}
      {...(isExternalHref(action.href)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {action.label}
      <ContactArrow />
    </a>
  );
}
