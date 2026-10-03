import Logo from "../Logo/Logo"
import "./Footer.scss"

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

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Logo />
        <nav className="footer-nav" aria-label="Footer">
          <a href="#projects">WORKS</a>
          <span className="nav-sep" aria-hidden="true">/</span>
          <a href="#about">ABOUT</a>
          <span className="nav-sep" aria-hidden="true">/</span>
          <a href="#contacts">CONTACTS</a>
        </nav>
        <p className="copyright">Ac 2024. Julia Samchuk</p>
        <button type="button" className="to-top" onClick={scrollToTop}>
          <ArrowIcon direction="up" />
          <span className="visually-hidden">Back to top</span>
        </button>
      </div>
    </footer>
  )
}