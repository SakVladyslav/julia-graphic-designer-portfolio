import { useEffect, useId, useState } from "react";

import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import "./Header.scss";

interface HeaderProps {
  tone?: "default" | "inverse";
}

export default function Header({ tone = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const className = tone === "inverse" ? "site-header site-header--inverse" : "site-header";

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      const header = document.getElementById("top");
      if (header !== null && !header.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className={className} id="top">
      <div className="header-inner">
        <Logo tone="header" />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          <span className="nav-toggle-icon" aria-hidden="true" />
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
        <SiteNav
          id={menuId}
          className="nav"
          ariaLabel="Primary"
          onNavigate={() => {
            setMenuOpen(false);
          }}
        />
      </div>
    </header>
  );
}
