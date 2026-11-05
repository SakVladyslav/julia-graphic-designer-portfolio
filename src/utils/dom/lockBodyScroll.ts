import { scrollToHashId } from "./scrollToHashId";

interface BodyInlineStyle {
  overflow: string;
  position: string;
  top: string;
  width: string;
}

/** Locks document scroll while an overlay is open. Restores the previous inline styles. */
export function lockBodyScroll(): () => void {
  const { body } = document;
  const html = document.documentElement;
  const scrollY = window.scrollY;
  const hashAtLock = window.location.hash;
  const previousBody: BodyInlineStyle = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  };
  const previousHtmlOverflow = html.style.overflow;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  return () => {
    html.style.overflow = previousHtmlOverflow;
    body.style.overflow = previousBody.overflow;
    body.style.position = previousBody.position;
    body.style.top = previousBody.top;
    body.style.width = previousBody.width;
    const hashNow = window.location.hash;
    if (hashNow !== hashAtLock && scrollToHashId(hashNow)) {
      return;
    }
    window.scrollTo(0, scrollY);
  };
}
