import { describe, expect, it } from "vitest";

import {
  mobileMenuAllProjectsHref,
  mobileMenuContactsHref,
  mobileMenuProjectLinks,
  MOBILE_MENU_MAX_WIDTH_PX,
} from "../../constants/mobileMenu";
import { navigation } from "../../constants/navigation";

import { homeHash } from "../../utils/homeHash";

describe("mobileMenu", () => {
  it("lists only Figma projects that have published case pages", () => {
    expect(mobileMenuProjectLinks().map((item) => item.id)).toEqual([
      "lovespace",
      "molfaria-window",
      "bbg",
      "amaryllis",
    ]);
    expect(mobileMenuProjectLinks().map((item) => item.href)).toEqual([
      "/projects/lovespace",
      "/projects/molfaria",
      "/projects/bbg",
      "/projects/amaryllis",
    ]);
  });

  it("reuses navigation hrefs for All Projects and Contacts", () => {
    expect(mobileMenuAllProjectsHref()).toBe(
      navigation.find((item) => item.id === "projects")?.href,
    );
    expect(mobileMenuContactsHref()).toBe(homeHash("contacts"));
    expect(mobileMenuContactsHref()).toBe(navigation.find((item) => item.id === "contacts")?.href);
  });

  it("matches the header burger breakpoint", () => {
    expect(MOBILE_MENU_MAX_WIDTH_PX).toBe(479);
  });
});
