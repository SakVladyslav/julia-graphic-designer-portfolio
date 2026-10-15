import { amaryllisCase } from "./cases/amaryllis";
import { bbgCase } from "./cases/bbg";
import { lovespaceCase } from "./cases/lovespace";
import { molfariaCase } from "./cases/molfaria";

import type { ProjectCase } from "./projectCase";

const projectCases: readonly ProjectCase[] = [lovespaceCase, molfariaCase, amaryllisCase, bbgCase];

export function getProjectCase(id: string): ProjectCase | undefined {
  return projectCases.find((projectCase) => projectCase.id === id);
}
