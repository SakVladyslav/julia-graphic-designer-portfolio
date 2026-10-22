import { amaryllisCase } from "./cases/amaryllis";
import { bbgCase } from "./cases/bbg";
import { lovespaceCase } from "./cases/lovespace";
import { molfariaCase } from "./cases/molfaria";
import { novynyCase } from "./cases/novyny";
import { olxCase } from "./cases/olx";

import type { ProjectCase } from "./projectCase";

const projectCases: readonly ProjectCase[] = [
  lovespaceCase,
  molfariaCase,
  amaryllisCase,
  bbgCase,
  olxCase,
  novynyCase,
];

export function listProjectCases(): readonly ProjectCase[] {
  return projectCases;
}

export function getProjectCase(id: string): ProjectCase | undefined {
  return projectCases.find((projectCase) => projectCase.id === id);
}
