import { describe, expect, it } from "vitest";

import { focusableElements } from "../../../utils/dom/focusableElements";

describe("focusableElements", () => {
  it("returns interactive nodes and skips inert subtrees", () => {
    const root = document.createElement("div");
    root.innerHTML = `
      <a href="#one">One</a>
      <button type="button">Go</button>
      <div inert>
        <a href="#hidden">Hidden</a>
      </div>
      <span>Text</span>
    `;

    expect(focusableElements(root).map((element) => element.textContent)).toEqual(["One", "Go"]);
  });
});
