import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { projectGroups, projects } from "../../constants/projects";
import { SITE_OWNER } from "../../constants/site";

import type { Project } from "../../constants/projects";

import { formatSectionCount } from "../../utils/formatSectionCount";
import { usePageTitle } from "../../utils/usePageTitle";

import heroArrowUrl from "../../assets/hero-arrow.svg";

import "./LandingPage.scss";

const groupedProjectIds = new Set(projectGroups.flatMap((group) => group.projectIds));

const selectedProjects = projects.filter((project) => !groupedProjectIds.has(project.id));

function projectsForGroup(projectIds: readonly string[]): Project[] {
  return projectIds.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project === undefined ? [] : [project];
  });
}

export default function LandingPage() {
  usePageTitle(SITE_OWNER);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-glow-anchor" aria-hidden="true">
          <div className="hero-glow" />
          <img
            className="hero-arrow"
            src={heroArrowUrl}
            alt=""
            width={72}
            height={72}
            aria-hidden="true"
          />
        </div>
        <div className="hero-block">
          <h1 id="hero-heading">Julia Samchuk</h1>
          <p className="role">Graphic Designer</p>
        </div>
      </section>

      <div className="home-projects" id="projects">
        <section className="projects" aria-labelledby="projects-heading">
          <div className="section-heading">
            <h2 id="projects-heading">Projects</h2>
            <span className="section-count">{formatSectionCount(selectedProjects.length)}</span>
          </div>
          <ul className="project-grid">
            {selectedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index === 0} />
            ))}
          </ul>
        </section>

        {projectGroups.map((group) => (
          <section key={group.id} className="project-group" aria-labelledby={`${group.id}-heading`}>
            <h2 id={`${group.id}-heading`}>{group.title}</h2>
            <ul className="project-grid">
              {projectsForGroup(group.projectIds).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
