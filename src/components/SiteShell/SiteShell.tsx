import { useLayoutEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SkipLink from "../SkipLink/SkipLink";

import "./SiteShell.scss";

export default function SiteShell() {
  const isProjectPage = useMatch("/projects/:projectId") !== null;
  const { pathname, hash } = useLocation();
  const locationKey = `${pathname}${hash}`;

  useLayoutEffect(() => {
    if (locationKey.includes("#")) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [locationKey]);

  const shellClass = isProjectPage ? "site-shell site-shell--inverse" : "site-shell";

  return (
    <div className={shellClass}>
      <div className="container">
        <SkipLink />
        <Header tone={isProjectPage ? "inverse" : "default"} />
        <Outlet />
        <Footer tone={isProjectPage ? "light" : "inverse"} />
      </div>
    </div>
  );
}
