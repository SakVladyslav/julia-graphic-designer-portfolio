import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProjectCase from "../../components/ProjectCase/ProjectCase";

import { getProjectCase } from "../../constants/projectCases";
import { projects } from "../../constants/projects";

import { nextProjects } from "../../utils/nextProjects";

export default function ProjectCasePage() {
  const { projectId } = useParams();
  const projectCase = projectId === undefined ? undefined : getProjectCase(projectId);

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      projectCase === undefined ? "Julia Samchuk" : `${projectCase.title} — Julia Samchuk`;
    return () => {
      document.title = previousTitle;
    };
  }, [projectCase]);

  if (projectCase === undefined) {
    return (
      <main className="case-page" id="main-content" tabIndex={-1}>
        <p className="case-missing">This project is not published yet.</p>
      </main>
    );
  }

  const related = nextProjects(projects, projectCase.id, 2);

  return (
    <main id="main-content" tabIndex={-1}>
      <ProjectCase projectCase={projectCase} related={related} />
    </main>
  );
}
