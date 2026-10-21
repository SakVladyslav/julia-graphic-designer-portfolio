import { projectCaseId } from "./projectCaseId";

interface OrderedProject {
  id: string;
  caseId?: string;
}

/**
 * The next projects after the open case, in homepage order.
 * After the last project the list continues from the first.
 */
export function nextProjects<T extends OrderedProject>(
  projects: readonly T[],
  currentCaseId: string,
  count: number,
): T[] {
  const start = projects.findIndex((project) => projectCaseId(project) === currentCaseId);
  if (start === -1) {
    return [];
  }

  const next: T[] = [];
  const steps = Math.min(count, projects.length - 1);
  for (let step = 1; step <= steps; step += 1) {
    const project = projects[(start + step) % projects.length];
    if (project !== undefined) {
      next.push(project);
    }
  }
  return next;
}
