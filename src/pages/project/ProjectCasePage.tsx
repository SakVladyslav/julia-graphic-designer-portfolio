import { useParams } from "react-router-dom";

import ProjectCase from "../../components/ProjectCase/ProjectCase";

import NotFoundPage from "../not-found/NotFoundPage";

import { caseCopyById } from "../../constants/caseCopy";
import { getProjectCase } from "../../constants/projectCases";
import { projects } from "../../constants/projects";
import { publishedProjectIds } from "../../constants/publishedProjectIds";
import { SITE_OWNER } from "../../constants/site";

import { nextProjects } from "../../utils/nextProjects";
import { projectCaseId } from "../../utils/projectCaseId";
import { usePageTitle } from "../../utils/usePageTitle";

export default function ProjectCasePage() {
  const { projectId } = useParams();
  const projectCase = projectId === undefined ? undefined : getProjectCase(projectId);
  const copy = projectCase === undefined ? undefined : caseCopyById(projectCase.id);
  const title = copy === undefined ? `Page not found — ${SITE_OWNER}` : copy.title;

  usePageTitle(title);

  if (projectCase === undefined) {
    return <NotFoundPage />;
  }

  const published = new Set(publishedProjectIds());
  const related = nextProjects(
    projects.filter((project) => published.has(projectCaseId(project))),
    projectCase.id,
    2,
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <ProjectCase key={projectCase.id} projectCase={projectCase} related={related} />
    </main>
  );
}
