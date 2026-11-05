import { Link, useLocation } from "react-router-dom";

import { SITE_OWNER } from "../../constants/site";

import { usePageTitle } from "../../hooks/usePageTitle";

import "./NotFoundPage.scss";

interface NotFoundPageProps {
  reload?: boolean;
}

export default function NotFoundPage({ reload = false }: NotFoundPageProps) {
  const { pathname, search, hash } = useLocation();
  usePageTitle(`Page not found — ${SITE_OWNER}`);

  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <h1>This page does not exist.</h1>
      <Link to="/">Back to the homepage</Link>
      {reload ? (
        <Link to={`${pathname}${search}${hash}`} reloadDocument>
          Reload
        </Link>
      ) : null}
    </main>
  );
}
