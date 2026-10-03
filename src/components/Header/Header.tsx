import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import "./Header.scss";

export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Logo tone="header" />
        <SiteNav className="nav" ariaLabel="Primary" />
      </div>
    </header>
  );
}
