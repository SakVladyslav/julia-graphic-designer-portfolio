const SCROLL_LOCK_KEY = "scrollLock";

export const PROGRAMMATIC_SCROLL_EVENT = "programmatic-scroll";

/**
 * `restore` puts the visitor back where they were (menu close, route top).
 * `hash` lands on a link target the visitor has not scrolled to yet.
 */
export type ProgrammaticScrollReason = "restore" | "hash";

export interface ProgrammaticScrollDetail {
  reason: ProgrammaticScrollReason;
}

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

export function notifyProgrammaticScroll(reason: ProgrammaticScrollReason = "restore"): void {
  window.dispatchEvent(
    new CustomEvent<ProgrammaticScrollDetail>(PROGRAMMATIC_SCROLL_EVENT, { detail: { reason } }),
  );
}

/** Runs a scroll the user did not perform, then asks the header to resync. */
export function runProgrammaticScroll(
  scroll: () => void,
  reason: ProgrammaticScrollReason = "restore",
): void {
  programmaticDepth += 1;
  try {
    scroll();
  } finally {
    programmaticDepth -= 1;
  }
  if (programmaticDepth === 0) {
    notifyProgrammaticScroll(reason);
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
