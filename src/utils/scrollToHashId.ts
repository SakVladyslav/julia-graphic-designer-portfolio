/** Scrolls the element addressed by `hash` (`#contacts` or `contacts`) into view. */
export function scrollToHashId(hash: string): boolean {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (id === "") {
    return false;
  }

  const target = document.getElementById(id);
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  target.scrollIntoView({ behavior: "instant", block: "start" });
  return true;
}
