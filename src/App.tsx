import './App.css'

const projects = [
  { title: "Lovespace", tags: ["visual identity", "rebranding"] },
  { title: "Molfaria", tags: ["branding", "concept"] },
  { title: "Amaryllis Poster Series", tags: ["branding", "concept"] },
  { title: "Molfaria", tags: ["branding", "concept"] },
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

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
}

export default function App() {
  return (
    <>
      <header className="site-header" id="top">
        <div className="wrap header-inner">
          <a className="logo" href="#top">
            [SMCHK]
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#projects">PROJECTS</a>
            <a href="#about">ABOUT</a>
            <a href="#contacts">CONTACTS</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="wrap hero-block">
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-topline">
              <h1 id="hero-heading">Julia Samchuk</h1>
              <svg
                className="hero-arrow"
                viewBox="0 0 64 64"
                width="46"
                height="46"
                aria-hidden="true"
              >
                <path
                  d="M8 42c14 3 20-18 40-24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M36 12l14 6-12 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="role">Graphic Designer</p>
          </div>
        </section>

        <section className="projects" id="projects" aria-labelledby="projects-heading">
          <div className="wrap">
            <div className="section-heading">
              <h2 id="projects-heading">Selected Projects</h2>
              <span className="section-count">[04]</span>
            </div>
            <ul className="project-grid">
              {projects.map((project, index) => (
                <li key={`${project.title}-${index}`}>
                  <article className="project-card">
                    <div
                      className="project-media"
                      data-shape={index}
                      aria-hidden="true"
                    >
                      <span>{project.title}</span>
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

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="logo" href="#top">
            [SMCHK]
          </a>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#projects">WORKS</a>
            <a href="#about">ABOUT</a>
            <a href="#contacts">CONTACTS</a>
          </nav>
          <p className="copyright">© 2024. Julia Samchuk</p>
          <button type="button" className="to-top" onClick={scrollToTop}>
            <ArrowIcon direction="up" />
            <span className="visually-hidden">Back to top</span>
          </button>
        </div>
      </footer>
    </>
  )
}
