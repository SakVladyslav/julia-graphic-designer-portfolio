import { Fragment } from "react";

import { navigation } from "../../constants/navigation";

import "./SiteNav.scss";

interface SiteNavProps {
  className: string;
  ariaLabel: string;
  id?: string;
  onNavigate?: () => void;
}

export default function SiteNav({ className, ariaLabel, id, onNavigate }: SiteNavProps) {
  return (
    <nav className={className} aria-label={ariaLabel} id={id} onClick={onNavigate}>
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
