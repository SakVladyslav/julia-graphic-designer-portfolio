export function shouldUseNullCaseFallback(
  firstFrame: boolean,
  caseHtmlInDocument: boolean,
): boolean {
  return firstFrame && caseHtmlInDocument;
}
