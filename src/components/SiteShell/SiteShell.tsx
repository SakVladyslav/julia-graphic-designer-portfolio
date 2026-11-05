import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SkipLink from "../SkipLink/SkipLink";

import { publishedProjectIds } from "../../constants/publishedProjectIds";

import { bindDocumentCanvas } from "../../utils/dom/bindDocumentCanvas";
import { scrollToHashId } from "../../utils/dom/scrollToHashId";
import { useDocumentHead } from "../../hooks/useDocumentHead";

import "./SiteShell.scss";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function SiteShell() {
  const projectMatch = useMatch("/projects/:projectId");
  const projectId = projectMatch?.params.projectId;
  const isProjectPage = projectId !== undefined && publishedProjectIds().includes(projectId);
  const { pathname, hash } = useLocation();
  const locationKey = `${pathname}${hash}`;

  useDocumentHead(pathname);

  useBrowserLayoutEffect(() => {
    return bindDocumentCanvas("page", isProjectPage ? "inverse" : "default");
  }, [isProjectPage]);

  useBrowserLayoutEffect(() => {
    if (hash !== "") {
      scrollToHashId(hash);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, locationKey]);

  const shellClass = isProjectPage ? "site-shell site-shell--inverse" : "site-shell";

  return (
    <div className={shellClass}>
      <SkipLink />
      <Header tone={isProjectPage ? "inverse" : "default"} />
      <div className="site-shell-clip">
        <div className="container">
          <Outlet />
        </div>
        <Footer tone={isProjectPage ? "light" : "inverse"} />
      </div>
    </div>
  );
}
