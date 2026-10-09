import { useEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SkipLink from "../SkipLink/SkipLink";

import "./SiteShell.scss";

export default function SiteShell() {
  const isProjectPage = useMatch("/projects/:projectId") !== null;
  const { pathname, hash } = useLocation();
  const locationKey = `${pathname}${hash}`;

  useEffect(() => {
    if (locationKey.includes("#")) {
      return;
    }
    window.scrollTo(0, 0);
  }, [locationKey]);

  const shellClass = isProjectPage ? "container site-shell site-shell--inverse" : "container";

  return (
    <div className={shellClass}>
      <SkipLink />
      <Header tone={isProjectPage ? "inverse" : "default"} />
      <Outlet />
      <Footer tone={isProjectPage ? "light" : "inverse"} />
    </div>
  );
}
