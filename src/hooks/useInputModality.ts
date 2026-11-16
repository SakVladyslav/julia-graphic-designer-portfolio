import { useEffect } from "react";

export type InputModality = "pointer" | "keyboard";

const MODIFIER_KEYS = new Set(["Shift", "Control", "Alt", "Meta"]);

let modality: InputModality = "keyboard";
let listening = false;

function publishPointer(): void {
  modality = "pointer";
}

function publishKeyboard(event: KeyboardEvent): void {
  if (MODIFIER_KEYS.has(event.key)) {
    return;
  }
  modality = "keyboard";
}

function ensureListening(): void {
  if (listening || typeof document === "undefined") {
    return;
  }
  listening = true;
  document.addEventListener("pointerdown", publishPointer, true);
  document.addEventListener("keydown", publishKeyboard, true);
}

export function currentInputModality(): InputModality {
  return modality;
}

/** Attaches the listeners. Read the device with `currentInputModality` inside effects. */
export function useInputModality(): void {
  useEffect(() => {
    ensureListening();
  }, []);
}
