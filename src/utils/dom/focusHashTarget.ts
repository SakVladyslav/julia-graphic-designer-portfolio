import { currentInputModality } from "../../hooks/useInputModality";

/** Moves focus after a hash scroll. Outline stays on keyboard modality only. */
export function focusHashTarget(target: HTMLElement): void {
  if (currentInputModality() === "pointer") {
    target.focus({ preventScroll: true, focusVisible: false });
    return;
  }
  target.focus({ preventScroll: true });
}
