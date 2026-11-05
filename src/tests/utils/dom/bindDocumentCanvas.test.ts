import { afterEach, describe, expect, it } from "vitest";

import { bindDocumentCanvas } from "../../../utils/dom/bindDocumentCanvas";

function themeColor(): HTMLMetaElement | null {
  const meta = document.head.querySelector('meta[name="theme-color"][data-canvas-theme]');
  return meta instanceof HTMLMetaElement ? meta : null;
}

function installCanvasTokens(): HTMLStyleElement {
  const style = document.createElement("style");
  style.textContent = `
    :root { --document-canvas: lightpage; }
    html[data-canvas="inverse"] { --document-canvas: inversepage; }
    html[data-canvas="menu"] { --document-canvas: menucanvas; }
  `;
  document.head.append(style);
  return style;
}

describe("bindDocumentCanvas", () => {
  const releases: Array<() => void> = [];

  afterEach(() => {
    for (const release of releases.splice(0)) {
      release();
    }
    document.documentElement.removeAttribute("data-canvas");
    document.head.querySelector("style[data-canvas-fixture]")?.remove();
    themeColor()?.remove();
  });

  function bind(
    layer: "page" | "menu",
    tone: "default" | "inverse",
  ): ReturnType<typeof bindDocumentCanvas> {
    const release = bindDocumentCanvas(layer, tone);
    releases.push(release);
    return release;
  }

  it("keeps the light page canvas clear", () => {
    const release = bind("page", "default");

    expect(document.documentElement).not.toHaveAttribute("data-canvas");
    expect(themeColor()).toBeNull();

    release();
    expect(document.documentElement).not.toHaveAttribute("data-canvas");
  });

  it("paints an inverse page and restores the previous canvas on release", () => {
    const release = bind("page", "inverse");

    expect(document.documentElement).toHaveAttribute("data-canvas", "inverse");

    release();
    expect(document.documentElement).not.toHaveAttribute("data-canvas");
  });

  it("stacks the open inverse menu above the page and restores the page on close", () => {
    bind("page", "inverse");
    const closeMenu = bind("menu", "inverse");

    expect(document.documentElement).toHaveAttribute("data-canvas", "menu");

    closeMenu();
    expect(document.documentElement).toHaveAttribute("data-canvas", "inverse");
  });

  it("keeps the menu canvas when the page binding releases first", () => {
    const releasePage = bind("page", "inverse");
    bind("menu", "inverse");

    releasePage();
    expect(document.documentElement).toHaveAttribute("data-canvas", "menu");
  });

  it("does not darken the canvas for the light menu", () => {
    bind("page", "default");
    bind("menu", "default");

    expect(document.documentElement).not.toHaveAttribute("data-canvas");
  });

  it("points theme-color at the active canvas and drops it on the light page", () => {
    const style = installCanvasTokens();
    style.dataset.canvasFixture = "true";

    const releasePage = bind("page", "inverse");
    expect(themeColor()).toHaveAttribute("content", "inversepage");

    const closeMenu = bind("menu", "inverse");
    expect(themeColor()).toHaveAttribute("content", "menucanvas");

    closeMenu();
    expect(themeColor()).toHaveAttribute("content", "inversepage");
    expect(document.documentElement).toHaveAttribute("data-canvas", "inverse");

    releasePage();
    expect(document.documentElement).not.toHaveAttribute("data-canvas");
    expect(themeColor()).toBeNull();
  });
});
