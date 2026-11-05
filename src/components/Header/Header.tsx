import { useEffect, useId, useRef, useState } from "react";

import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import SiteNav from "../SiteNav/SiteNav";

import { MOBILE_MENU_MAX_WIDTH_PX } from "../../constants/mobileMenu";

import "./Header.scss";

interface HeaderProps {
  tone?: "default" | "inverse";
}

export default function Header({ tone = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const className = tone === "inverse" ? "site-header site-header--inverse" : "site-header";

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia(`(max-width: ${MOBILE_MENU_MAX_WIDTH_PX}px)`);
    const onChange = () => {
      if (!media.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className={className} id="top">
      <div className="header-inner">
        <Logo tone="header" />
        <button
          ref={burgerRef}
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          <span className="nav-toggle-icon" aria-hidden="true" />
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
        <SiteNav
          className="nav"
          ariaLabel="Primary"
          onNavigate={() => {
            setMenuOpen(false);
          }}
        />
      </div>
      <MobileMenu
        id={menuId}
        open={menuOpen}
        tone={tone}
        returnFocusRef={burgerRef}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
    </header>
  );
}
