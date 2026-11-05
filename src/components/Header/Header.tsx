import { useEffect, useId, useRef, useState } from "react";

import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import { headerScrollPhase } from "./headerScrollPhase";
import type { HeaderLook, HeaderMotion, HeaderScrollTravel } from "./headerScrollPhase";

import "./Header.scss";

interface HeaderProps {
  tone?: "default" | "inverse";
}

function phaseClassName(look: HeaderLook, motion: HeaderMotion): string {
  const names: string[] = [];
  if (look === "pinned") {
    names.push("site-header--pinned");
  }
  if (look === "hidden") {
    names.push("site-header--hidden");
  }
  if (motion === "slide") {
    names.push("site-header--slide");
  }
  if (motion === "fade") {
    names.push("site-header--fade");
  }
  return names.join(" ");
}

export default function Header({ tone = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollClassName, setScrollClassName] = useState("");
  const menuId = useId();
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);
  const className = [
    "site-header",
    tone === "inverse" ? "site-header--inverse" : "",
    scrollClassName,
  ]
    .filter((name) => name !== "")
    .join(" ");

  useEffect(() => {
    const phase: { look: HeaderLook; travel: HeaderScrollTravel } = {
      look: "resting",
      travel: { direction: "down", distance: 0 },
    };
    let previousY = window.scrollY;
    let pendingJump = false;
    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const headerContains = (node: EventTarget | null) => {
      const header = document.getElementById("top");
      return header !== null && node instanceof Node && header.contains(node);
    };

    const publish = (
      deltaY: number,
      scrollY: number,
      kind: "scroll" | "jump",
      firstCorrection: boolean,
      focusEntered: boolean,
    ) => {
      const result = headerScrollPhase({
        look: phase.look,
        travel: phase.travel,
        deltaY,
        scrollY,
        menuOpen: menuOpenRef.current,
        focusInside: headerContains(document.activeElement),
        focusEntered,
        reducedMotion: mediaQuery?.matches === true,
        kind,
        firstCorrection,
      });
      phase.look = result.look;
      phase.travel = result.travel;
      setScrollClassName(phaseClassName(result.look, result.motion));
    };

    publish(0, window.scrollY, "scroll", true, false);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const deltaY = scrollY - previousY;
      const kind = pendingJump ? "jump" : "scroll";
      pendingJump = false;
      previousY = scrollY;
      if (deltaY === 0) {
        return;
      }
      publish(deltaY, scrollY, kind, false, false);
    };

    const onHashChange = () => {
      pendingJump = true;
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!headerContains(event.target)) {
        return;
      }
      if (headerContains(event.relatedTarget)) {
        return;
      }
      publish(0, window.scrollY, "scroll", false, true);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, []);

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
