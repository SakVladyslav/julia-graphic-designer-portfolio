import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import "./Header.scss";

interface HeaderProps {
  tone?: "default" | "inverse";
}

export default function Header({ tone = "default" }: HeaderProps) {
  const className = tone === "inverse" ? "site-header site-header--inverse" : "site-header";

  return (
    <header className={className} id="top">
      <div className="header-inner">
        <Logo tone="header" />
        <SiteNav className="nav" ariaLabel="Primary" />
      </div>
    </header>
  );
}
