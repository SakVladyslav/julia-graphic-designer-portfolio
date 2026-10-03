import "./LandingPage.scss"
import heroArrowUrl from "../../assets/hero-arrow.svg"

const projects = [
  { title: "Lovespace", tags: ["visual identity", "rebranding"], image: "/projects/lovespace.png" },
  { title: "Molfaria", tags: ["branding", "concept"], image: "/projects/molfaria.png" },
  { title: "Amaryllis Poster Series", tags: ["branding", "concept"], image: "/projects/amaryllis.jpg" },
  { title: "Molfaria", tags: ["branding", "concept"], image: "/projects/budova.jpg" },
] as const

function ArrowIcon({ direction = "right" }: { direction?: "right" | "up" }) {
  const path =
    direction === "up" ? "M12 19V6M6 12l6-6 6 6" : "M5 12h14M13 6l6 6-6 6"

  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <main>
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
          <p className="role">
            Graphic Designer
          </p>
        </div>
      </section>

      <section className="projects" id="projects" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Selected Projects</h2>
          <span className="section-count">[04]</span>
        </div>
        <div className="wrap">
          <ul className="project-grid">
            {projects.map((project, index) => (
              <li key={`${project.title}-${index}`}>
                <article className="project-card">
                  <div className="project-media">
                    <img src={project.image} alt="" />
                  </div>
                  <h3>{project.title}</h3>
                  <ul className="tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contacts" id="contacts" aria-labelledby="contacts-heading">
        <div className="wrap">
          <h2 id="contacts-heading">Contacts</h2>
          <div className="contacts-layout">
            <ul className="contact-list">
              <li>
                <span className="contact-main">Telegram</span>
                <span className="annotation">direct message</span>
              </li>
              <li>
                <a className="contact-main" href="mailto:art.jsam@gmail.com">
                  art.jsam@gmail.com
                </a>
                <span className="annotation">email</span>
              </li>
              <li>
                <span className="contact-main">Kyiv, Ukraine</span>
                <span className="annotation">based in</span>
              </li>
            </ul>
            <div className="contact-actions">
              <button type="button">
                LINKEDIN
                <ArrowIcon />
              </button>
              <button type="button">
                INSTAGRAM
                <ArrowIcon />
              </button>
              <button type="button" className="view-cv">
                VIEW CV
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}