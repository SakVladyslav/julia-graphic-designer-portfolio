import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import { contactActions, type ContactAction } from "../../constants/contacts";
import {
  mobileMenuAllProjectsHref,
  mobileMenuContactsHref,
  mobileMenuProjectLinks,
} from "../../constants/mobileMenu";

import { focusableElements } from "../../utils/focusableElements";
import { lockBodyScroll } from "../../utils/lockBodyScroll";

import "./MobileMenu.scss";

const MENU_EXIT_MS = 280;
const MENU_EXIT_REDUCED_MS = 120;

interface MobileMenuProps {
  id: string;
  open: boolean;
  tone?: "default" | "inverse";
  returnFocusRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

function menuExitMs(): number {
  if (typeof window.matchMedia !== "function") {
    return MENU_EXIT_MS;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? MENU_EXIT_REDUCED_MS
    : MENU_EXIT_MS;
}

function rootClassName(visible: boolean, inverse: boolean): string {
  const classes = ["mobile-menu-root"];
  if (visible) {
    classes.push("mobile-menu-root--open");
  }
  if (inverse) {
    classes.push("mobile-menu-root--inverse");
  }
  return classes.join(" ");
}

function panelClassName(scrollable: boolean): string {
  return scrollable ? "mobile-menu-panel mobile-menu-panel--scroll" : "mobile-menu-panel";
}

function projectsClassName(open: boolean): string {
  return open ? "mobile-menu-projects mobile-menu-projects--open" : "mobile-menu-projects";
}

export default function MobileMenu({
  id,
  open,
  tone = "default",
  returnFocusRef,
  onClose,
}: MobileMenuProps) {
  const [present, setPresent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const openedRef = useRef(false);
  const inverse = tone === "inverse";

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (open) {
      openedRef.current = true;
      let innerFrame = 0;
      const frame = window.requestAnimationFrame(() => {
        setPresent(true);
        innerFrame = window.requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      return () => {
        window.cancelAnimationFrame(frame);
        window.cancelAnimationFrame(innerFrame);
      };
    }

    if (!openedRef.current) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setVisible(false);
    });
    const timer = window.setTimeout(() => {
      setPresent(false);
      setProjectsOpen(false);
      setScrollable(false);
    }, menuExitMs());
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (present || !openedRef.current) {
      return;
    }
    openedRef.current = false;
    returnFocusRef.current?.focus({ preventScroll: true });
  }, [present, returnFocusRef]);

  useEffect(() => {
    if (!open || !present) {
      return;
    }
    return lockBodyScroll();
  }, [open, present]);

  useEffect(() => {
    if (!present) {
      return;
    }
    const shell = document.querySelector(".site-shell");
    if (!(shell instanceof HTMLElement)) {
      return;
    }
    shell.inert = true;
    return () => {
      shell.inert = false;
    };
  }, [present]);

  useEffect(() => {
    if (!open || !present) {
      return;
    }
    closeRef.current?.focus({ preventScroll: true });
    const dialog = dialogRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || dialog === null) {
        return;
      }
      const elements = focusableElements(dialog);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (first === undefined || last === undefined) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
        return;
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, present]);

  useEffect(() => {
    const panel = dialogRef.current;
    if (!present || panel === null || typeof ResizeObserver === "undefined") {
      return;
    }

    const sync = () => {
      const next = panel.scrollHeight > panel.clientHeight + 1;
      setScrollable((current) => (current === next ? current : next));
    };

    const frame = window.requestAnimationFrame(sync);
    const observer = new ResizeObserver(sync);
    observer.observe(panel);
    const clip = panel.querySelector(".mobile-menu-clip");
    if (clip !== null) {
      observer.observe(clip);
    }
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [present]);

  if (!present || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={rootClassName(open, inverse)}>
      <div className="mobile-menu-backdrop" onClick={onClose} />
      <div
        ref={dialogRef}
        className={panelClassName(scrollable)}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a") !== null) {
            onClose();
          }
        }}
      >
        <div className="mobile-menu-clip">
          <div className="mobile-menu-bar">
            <Logo tone="header" />
            <button
              ref={closeRef}
              type="button"
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={onClose}
            >
              <span className="mobile-menu-close-icon" aria-hidden="true" />
            </button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-menu-nav" aria-label="Mobile">
              <div className="mobile-menu-projects-block">
                <button
                  type="button"
                  className="mobile-menu-accordion"
                  aria-expanded={projectsOpen}
                  aria-controls={projectsId}
                  onClick={(event) => {
                    setProjectsOpen((current) => !current);
                    if (event.detail > 0) {
                      event.currentTarget.blur();
                    }
                  }}
                >
                  Projects
                  <span className="mobile-menu-chevron" aria-hidden="true" />
                </button>
                <div
                  id={projectsId}
                  className={projectsClassName(projectsOpen)}
                  aria-hidden={!projectsOpen}
                  inert={!projectsOpen || undefined}
                >
                  <ul className="mobile-menu-projects-clip">
                    <li>
                      <a className="mobile-menu-project" href={mobileMenuAllProjectsHref()}>
                        All Projects
                      </a>
                    </li>
                    {mobileMenuProjectLinks().map((item) => (
                      <li key={item.id}>
                        <Link className="mobile-menu-project" to={item.href}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a className="mobile-menu-item" href={mobileMenuContactsHref()}>
                Contacts
              </a>
            </nav>
            <div className="mobile-menu-actions">
              {contactActions.map((action) => (
                <MenuAction key={action.id} action={action} />
              ))}
            </div>
            <div className="mobile-menu-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function MenuAction({ action }: { action: ContactAction }) {
  const arrow = <span className="mobile-menu-arrow" aria-hidden="true" />;

  if (action.href === null) {
    return (
      <span className="mobile-menu-action mobile-menu-action--stub" aria-disabled="true">
        {action.label}
        <span className="visually-hidden"> (link coming soon)</span>
        {arrow}
      </span>
    );
  }

  return (
    <a className="mobile-menu-action" href={action.href} target="_blank" rel="noopener noreferrer">
      {action.label}
      {arrow}
    </a>
  );
}
