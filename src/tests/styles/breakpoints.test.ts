import { readFileSync } from "node:fs";
import path from "node:path";
import { compileString } from "sass";
import { describe, expect, it } from "vitest";

function compiledWidth(name: string): string {
  try {
    const result = compileString(`@use "breakpoints" as *;\n.probe { width: $${name}; }\n`, {
      loadPaths: [path.join(process.cwd(), "src/styles")],
    });
    const match = /width:\s*([^;]+);/.exec(result.css);
    return match?.[1]?.trim() ?? "";
  } catch (error) {
    return error instanceof Error ? error.message : "compile failed";
  }
}

describe("breakpoint tokens", () => {
  it("declares the narrow, small, and mini widths", () => {
    expect(compiledWidth("bp-narrow")).toBe("759px");
    expect(compiledWidth("bp-small")).toBe("360px");
    expect(compiledWidth("bp-mini")).toBe("320px");
  });

  it("declares the column, typeface, and mobile frame widths", () => {
    expect(compiledWidth("bp-columns")).toBe("800px");
    expect(compiledWidth("bp-typeface")).toBe("700px");
    expect(compiledWidth("bp-typeface-min")).toBe("530px");
    expect(compiledWidth("bp-mobile")).toBe("390px");
  });

  it("lists those widths in the design canon", () => {
    const canon = readFileSync(path.join(process.cwd(), "docs/design-system.md"), "utf8");

    expect(canon).toContain("`$bp-columns` 800");
    expect(canon).toContain("`$bp-narrow` 759");
    expect(canon).toContain("`$bp-typeface` 700");
    expect(canon).toContain("`$bp-typeface-min` 530");
    expect(canon).toContain("`$bp-mobile` 390");
    expect(canon).toContain("`$bp-small` 360");
    expect(canon).toContain("`$bp-mini` 320");
  });
});
