import { afterEach, describe, expect, it } from "vitest";

import { pageHasElementId } from "../../../utils/dom/pageHasElementId";

describe("pageHasElementId", () => {
  afterEach(() => {
    document.getElementById("contacts")?.remove();
  });

  it("is true only when that id is in the document", () => {
    expect(pageHasElementId("contacts")).toBe(false);

    const target = document.createElement("section");
    target.id = "contacts";
    document.body.append(target);

    expect(pageHasElementId("contacts")).toBe(true);
  });
});
