/** Formats a section counter like Figma: `[04]`. */
export function formatSectionCount(count: number): string {
  return `[${String(count).padStart(2, "0")}]`;
}
