import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "../App";

import { pageCanonicalUrl } from "../utils/seo/pageCanonicalUrl";
import { prerenderPages } from "../utils/seo/prerenderPages";
import { siteHeadTags } from "../utils/seo/siteHeadTags";

function jsonLdScripts(): NodeListOf<HTMLScriptElement> {
  return document.head.querySelectorAll('script[type="application/ld+json"]');
}

function seedPrerenderedHomeHead(): string {
  const home = prerenderPages().find((page) => page.pathname === "/");
  if (home === undefined) {
    throw new Error("Missing home prerender page", { cause: { pathname: "/" } });
  }

  const head = siteHeadTags(pageCanonicalUrl(home.pathname), home.share);
  document.head.insertAdjacentHTML("beforeend", head);
  return head;
}

describe("prerendered Person JSON-LD", () => {
  beforeEach(() => {
    window.history.pushState({}, "", import.meta.env.BASE_URL);
  });

  afterEach(() => {
    cleanup();
    document.head.innerHTML = "";
    document.title = "";
  });

  it("stays a single script after the homepage hydrates", () => {
    const head = seedPrerenderedHomeHead();
    const seeded = head.match(/application\/ld\+json/g) ?? [];
    expect(seeded).toHaveLength(1);

    render(<App />);

    expect(jsonLdScripts()).toHaveLength(1);
    expect(head).toContain('<script id="person-jsonld" type="application/ld+json">');
    expect(jsonLdScripts()[0]?.textContent).toContain('"@type":"Person"');
  });

  it("is removed when a case opens", async () => {
    seedPrerenderedHomeHead();
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: /lovespace/i }));

    expect(await screen.findByRole("heading", { level: 1, name: "Lovespace" })).toBeInTheDocument();
    expect(jsonLdScripts()).toHaveLength(0);
  });
});
