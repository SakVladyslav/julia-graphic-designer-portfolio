import { Link } from "react-router-dom";

import ProjectVisual from "./ProjectVisual";

import { getProjectCase } from "../../constants/projectCases";

import type { Project } from "../../constants/projects";

import "./ProjectCard.scss";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hasCase = getProjectCase(project.id) !== undefined;
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
        <Link className="project-card-link" to={`/projects/${project.id}`}>
          {content}
        </Link>
      ) : (
        <div className="project-card-static">{content}</div>
      )}
    </li>
  );
}
