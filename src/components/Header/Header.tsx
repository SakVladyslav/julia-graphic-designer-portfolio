import { useEffect, useState } from "react"
import Logo from "../Logo/Logo"
import "./Header.scss"

export default function Header() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    if (CSS.supports("animation-timeline", "scroll()")) return

    const onScroll = () => setStuck(window.scrollY > 0)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={stuck ? "site-header is-stuck" : "site-header"} id="top">
      <div className="header-inner">
        <Logo tone="header" />
        <nav className="nav" aria-label="Primary">
          <a href="#projects">PROJECTS</a>
          <span className="nav-sep" aria-hidden="true">/</span>
          <a href="#about">ABOUT</a>
          <span className="nav-sep" aria-hidden="true">/</span>
          <a href="#contacts">CONTACTS</a>
        </nav>
      </div>
    </header>
  )
}
