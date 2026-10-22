import { Link } from "react-router-dom";

import ProjectVisual from "./ProjectVisual";

import { publishedProjectIds } from "../../constants/publishedProjectIds";

import type { Project } from "../../constants/projects";

import { projectCaseId } from "../../utils/projectCaseId";

import "./ProjectCard.scss";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const caseId = projectCaseId(project);
  const hasCase = publishedProjectIds().includes(caseId);
  const content = (
    <>
      <ProjectVisual project={project} priority={priority} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <li className="project-card">
      {hasCase ? (
        <Link className="project-card-link" to={`/projects/${caseId}`}>
          {content}
        </Link>
      ) : (
        <div className="project-card-static">{content}</div>
      )}
    </li>
  );
}
