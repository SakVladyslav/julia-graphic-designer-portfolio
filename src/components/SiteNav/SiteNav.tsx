import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CONTACTS_ID, navigation } from "../../constants/navigation";

import { followContactsHash } from "../../utils/dom/followContactsHash";

import "./SiteNav.scss";

interface SiteNavProps {
  className: string;
  ariaLabel: string;
  id?: string;
  onNavigate?: () => void;
}

export default function SiteNav({ className, ariaLabel, id, onNavigate }: SiteNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={className} aria-label={ariaLabel} id={id} onClick={onNavigate}>
      {navigation.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 ? (
            <span className="nav-sep" aria-hidden="true">
              /
            </span>
          ) : null}
          <a
            href={item.href}
            onClick={
              item.id === CONTACTS_ID
                ? (event) => {
                    followContactsHash(event, {
                      pathname: location.pathname,
                      search: location.search,
                      hash: location.hash,
                      navigate,
                    });
                  }
                : undefined
            }
          >
            {item.label}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
