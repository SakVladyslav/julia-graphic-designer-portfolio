interface ProjectCaseLink {
  id: string;
  caseId?: string;
}

export function projectCaseId(project: ProjectCaseLink): string {
  return project.caseId ?? project.id;
}
