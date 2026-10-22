import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SkipLink from "../SkipLink/SkipLink";

import { getProjectCase } from "../../constants/projectCases";

import { useDocumentHead } from "../../utils/useDocumentHead";

import "./SiteShell.scss";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function SiteShell() {
  const projectMatch = useMatch("/projects/:projectId");
  const projectId = projectMatch?.params.projectId;
  const isProjectPage = projectId !== undefined && getProjectCase(projectId) !== undefined;
  const { pathname, hash } = useLocation();
  const locationKey = `${pathname}${hash}`;

  useDocumentHead(pathname);

  useBrowserLayoutEffect(() => {
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
      </div>
      <Footer tone={isProjectPage ? "light" : "inverse"} />
    </div>
  );
}
