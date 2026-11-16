import { useEffect, useId, useRef, useState } from "react";

import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import SiteNav from "../SiteNav/SiteNav";
import { headerScrollPhase } from "./headerScrollPhase";
import type { HeaderLook, HeaderMotion, HeaderScrollTravel } from "./headerScrollPhase";

import { MOBILE_MENU_MAX_WIDTH_PX } from "../../constants/mobileMenu";

import { currentInputModality } from "../../hooks/useInputModality";

import {
  PROGRAMMATIC_SCROLL_EVENT,
  isProgrammaticScroll,
  isScrollLocked,
} from "../../utils/dom/programmaticScroll";

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
  const burgerRef = useRef<HTMLButtonElement>(null);

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
    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const headerContains = (node: EventTarget | null) => {
      const header = document.getElementById("top");
      return header !== null && node instanceof Node && header.contains(node);
    };

    // Only keyboard focus holds the header in place. After a touch or mouse close the menu
    // returns focus to the burger without a visible ring; that must not freeze scroll hiding.
    const keyboardFocusInside = () =>
      currentInputModality() === "keyboard" && headerContains(document.activeElement);

    const publish = (
      deltaY: number,
      scrollY: number,
      kind: "scroll" | "jump",
      firstCorrection: boolean,
      focusEntered: boolean,
      forceClass = false,
    ) => {
      const result = headerScrollPhase({
        look: phase.look,
        travel: phase.travel,
        deltaY,
        scrollY,
        menuOpen: menuOpenRef.current,
        focusInside: keyboardFocusInside(),
        focusEntered,
        reducedMotion: mediaQuery?.matches === true,
        kind,
        firstCorrection,
      });
      const lookChanged = result.look !== phase.look;
      phase.look = result.look;
      phase.travel = result.travel;
      if (forceClass || lookChanged || result.motion !== "none") {
        setScrollClassName(phaseClassName(result.look, result.motion));
      }
    };

    const resync = () => {
      const scrollY = window.scrollY;
      previousY = scrollY;
      phase.travel = { direction: "down", distance: 0 };
      publish(0, scrollY, "scroll", true, false, true);
    };

    publish(0, window.scrollY, "scroll", true, false);

    const onScroll = () => {
      if (isScrollLocked() || isProgrammaticScroll()) {
        return;
      }
      const scrollY = window.scrollY;
      const deltaY = scrollY - previousY;
      previousY = scrollY;
      if (deltaY === 0) {
        return;
      }
      publish(deltaY, scrollY, "scroll", false, false);
    };

    const onProgrammaticScroll = () => {
      if (isScrollLocked()) {
        return;
      }
      resync();
    };

    const onFocusIn = (event: FocusEvent) => {
      if (currentInputModality() !== "keyboard" || !headerContains(event.target)) {
        return;
      }
      if (headerContains(event.relatedTarget)) {
        return;
      }
      publish(0, window.scrollY, "scroll", false, true);
    };

    // No resize / visualViewport resize resync: on iOS they fire while the address bar
    // shows or hides mid-scroll and would force "pinned". Breakpoint changes go through matchMedia.
    window.addEventListener("scroll", onScroll);
    window.addEventListener(PROGRAMMATIC_SCROLL_EVENT, onProgrammaticScroll);
    window.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(PROGRAMMATIC_SCROLL_EVENT, onProgrammaticScroll);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, []);

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
