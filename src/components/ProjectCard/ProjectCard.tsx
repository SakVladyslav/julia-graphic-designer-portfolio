import ProjectVisual from "./ProjectVisual";

import type { Project } from "../../constants/projects";

import "./ProjectCard.scss";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <li className="project-card">
      <ProjectVisual project={project} priority={priority} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
