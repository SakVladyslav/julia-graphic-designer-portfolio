import { CONTACTS_ID } from "../../constants/navigation";

import { focusHashTarget } from "./focusHashTarget";
import { pageHasElementId } from "./pageHasElementId";
import { isScrollLocked, queueUnlockHashScroll } from "./programmaticScroll";
import { scrollToHashId } from "./scrollToHashId";

export type FollowContactsHashResult = "in-page" | "home" | "ignored";

export interface ContactsNavEvent {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  preventDefault: () => void;
}

export interface ContactsHashNavigation {
  pathname: string;
  search: string;
  hash: string;
  navigate: (
    to: { pathname: string; search: string; hash: string },
    options: { replace: boolean },
  ) => void;
}

function isModifiedClick(event: ContactsNavEvent): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/**
 * Same-page contacts stay on the current route. Missing contacts go to `/#contacts`.
 * While the body is locked, scroll is queued for `lockBodyScroll` unlock.
 */
export function followContactsHash(
  event: ContactsNavEvent,
  navigation: ContactsHashNavigation,
): FollowContactsHashResult {
  if (isModifiedClick(event)) {
    return "ignored";
  }

  event.preventDefault();
  const hash = `#${CONTACTS_ID}`;

  if (!pageHasElementId(CONTACTS_ID)) {
    navigation.navigate({ pathname: "/", search: "", hash }, { replace: false });
    return "home";
  }

  navigation.navigate(
    { pathname: navigation.pathname, search: navigation.search, hash },
    { replace: navigation.hash === hash },
  );

  if (isScrollLocked()) {
    queueUnlockHashScroll(hash);
    return "in-page";
  }

  scrollToHashId(hash);
  const target = document.getElementById(CONTACTS_ID);
  if (target instanceof HTMLElement) {
    focusHashTarget(target);
  }
  return "in-page";
}
