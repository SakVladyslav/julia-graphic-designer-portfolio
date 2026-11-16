const SCROLL_LOCK_KEY = "scrollLock";

export const PROGRAMMATIC_SCROLL_EVENT = "programmatic-scroll";

let programmaticDepth = 0;
let unlockHashScroll: string | null = null;

export function isScrollLocked(): boolean {
  return document.documentElement.dataset[SCROLL_LOCK_KEY] !== undefined;
}

export function setScrollLockMarker(): void {
  document.documentElement.dataset[SCROLL_LOCK_KEY] = "";
}

export function clearScrollLockMarker(): void {
  delete document.documentElement.dataset[SCROLL_LOCK_KEY];
}

export function isProgrammaticScroll(): boolean {
  return programmaticDepth > 0;
}

export function notifyProgrammaticScroll(): void {
  window.dispatchEvent(new Event(PROGRAMMATIC_SCROLL_EVENT));
}

/** Runs a scroll the user did not perform, then asks the header to resync. */
export function runProgrammaticScroll(scroll: () => void): void {
  programmaticDepth += 1;
  try {
    scroll();
  } finally {
    programmaticDepth -= 1;
  }
  if (programmaticDepth === 0) {
    notifyProgrammaticScroll();
  }
}

/** Ask the next `lockBodyScroll` unlock to scroll this hash after restoring the body. */
export function queueUnlockHashScroll(hash: string): void {
  unlockHashScroll = hash.startsWith("#") ? hash : `#${hash}`;
}

export function takeQueuedUnlockHashScroll(): string | null {
  const hash = unlockHashScroll;
  unlockHashScroll = null;
  return hash;
}
