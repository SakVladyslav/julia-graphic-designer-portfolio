import { Fragment } from "react";

import { navigation } from "../../constants/navigation";

import "./SiteNav.scss";

type SiteNavProps = {
  className: string;
  ariaLabel: string;
};

export default function SiteNav({ className, ariaLabel }: SiteNavProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {navigation.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 ? (
            <span className="nav-sep" aria-hidden="true">
              /
            </span>
          ) : null}
          <a href={item.href}>{item.label}</a>
        </Fragment>
      ))}
    </nav>
  );
}
