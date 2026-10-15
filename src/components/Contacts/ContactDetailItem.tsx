import type { ContactDetail } from "../../constants/contacts";

import { isExternalHref } from "../../utils/isExternalHref";

type ContactDetailItemProps = {
  detail: ContactDetail;
};

export default function ContactDetailItem({ detail }: ContactDetailItemProps) {
  const isStubLink = detail.role === "link" && detail.href === null;

  return (
    <li
      className={detail.id === "email" ? "contact-detail contact-detail--email" : "contact-detail"}
    >
      {detail.role === "link" && detail.href !== null ? (
        <a
          className="contact-main"
          href={detail.href}
          {...(isExternalHref(detail.href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
        >
          {detail.label}
        </a>
      ) : (
        <span
          className={isStubLink ? "contact-main contact-main--stub" : "contact-main"}
          aria-disabled={isStubLink ? true : undefined}
        >
          {detail.label}
          {isStubLink ? <span className="visually-hidden"> (link coming soon)</span> : null}
        </span>
      )}
      <span className="annotation">{detail.annotation}</span>
    </li>
  );
}
