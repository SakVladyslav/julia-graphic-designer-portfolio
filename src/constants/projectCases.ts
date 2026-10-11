import { lovespaceCase } from "./cases/lovespace";
import { molfariaCase } from "./cases/molfaria";

import type { ProjectCase } from "./projectCase";

const projectCases: readonly ProjectCase[] = [lovespaceCase, molfariaCase];

export function getProjectCase(id: string): ProjectCase | undefined {
  return projectCases.find((projectCase) => projectCase.id === id);
}
