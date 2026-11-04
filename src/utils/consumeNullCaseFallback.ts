import { shouldUseNullCaseFallback } from "./shouldUseNullCaseFallback";

let firstFrame = true;

export function consumeNullCaseFallback(caseHtmlInDocument: boolean): boolean {
  const useNull = shouldUseNullCaseFallback(firstFrame, caseHtmlInDocument);
  firstFrame = false;
  return useNull;
}
