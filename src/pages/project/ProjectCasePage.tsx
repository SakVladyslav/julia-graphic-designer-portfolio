import { useParams } from "react-router-dom";

import ProjectCase from "../../components/ProjectCase/ProjectCase";

import NotFoundPage from "../not-found/NotFoundPage";

import { getProjectCase } from "../../constants/projectCases";
import { projects } from "../../constants/projects";
import { SITE_OWNER } from "../../constants/site";

import { nextProjects } from "../../utils/nextProjects";
import { usePageTitle } from "../../utils/usePageTitle";

export default function ProjectCasePage() {
  const { projectId } = useParams();
  const projectCase = projectId === undefined ? undefined : getProjectCase(projectId);
  const title =
    projectCase === undefined
      ? `Page not found — ${SITE_OWNER}`
      : `${projectCase.title} — ${SITE_OWNER}`;

  usePageTitle(title);

  if (projectCase === undefined) {
    return <NotFoundPage />;
  }

  const related = nextProjects(projects, projectCase.id, 2);

  return (
    <main id="main-content" tabIndex={-1}>
      <ProjectCase projectCase={projectCase} related={related} />
    </main>
  );
}
