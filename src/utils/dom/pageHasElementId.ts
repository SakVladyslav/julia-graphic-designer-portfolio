/** True when the live document already contains an element with this id. */
export function pageHasElementId(id: string): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  return document.getElementById(id) instanceof HTMLElement;
}
