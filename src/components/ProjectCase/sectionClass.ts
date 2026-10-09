import type { CaseSpace } from "../../constants/projectCase";

export function sectionClass(name: string, spaceBefore: CaseSpace = "section"): string {
  return `case-section case-section--${spaceBefore} ${name}`;
}
