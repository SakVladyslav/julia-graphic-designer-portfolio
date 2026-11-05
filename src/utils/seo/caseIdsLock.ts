/** Build fails unless the published URLs, case bodies, and share copy are one list. */
export function assertCaseIdsLocked(
  publishedIds: readonly string[],
  caseIds: readonly string[],
  copyIds: readonly string[],
): void {
  const sameSequence = (left: readonly string[], right: readonly string[]): boolean =>
    left.length === right.length && left.every((id, index) => right[index] === id);

  if (sameSequence(publishedIds, caseIds) && sameSequence(publishedIds, copyIds)) {
    return;
  }

  throw new Error("Published case ids, project cases, and case copy must be the same list", {
    cause: { publishedIds, caseIds, copyIds },
  });
}
