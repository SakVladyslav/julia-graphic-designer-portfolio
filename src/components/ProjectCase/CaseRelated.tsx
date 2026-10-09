import ProjectCard from "../ProjectCard/ProjectCard";

import type { Project } from "../../constants/projects";

interface CaseRelatedProps {
  projects: readonly Project[];
}

export default function CaseRelated({ projects }: CaseRelatedProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="case-related" aria-labelledby="more-projects-heading">
      <h2 id="more-projects-heading">More projects</h2>
      <ul className="case-related-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </section>
  );
}
