import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { projects } from "../../constants/projects";

import { formatSectionCount } from "../../utils/formatSectionCount";

import heroArrowUrl from "../../assets/hero-arrow.svg";

import "./LandingPage.scss";

export default function LandingPage() {
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

      <section className="projects" id="projects" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Selected Projects</h2>
          <span className="section-count">{formatSectionCount(projects.length)}</span>
        </div>
        <ul className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index === 0} />
          ))}
        </ul>
      </section>

      <section className="about" id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <p className="about-placeholder">Coming Soon</p>
      </section>
    </main>
  );
}
