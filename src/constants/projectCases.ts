import { lovespaceCase } from "./cases/lovespace";

import type { ProjectCase } from "./projectCase";

const projectCases: readonly ProjectCase[] = [lovespaceCase];

export function getProjectCase(id: string): ProjectCase | undefined {
  return projectCases.find((projectCase) => projectCase.id === id);
}
