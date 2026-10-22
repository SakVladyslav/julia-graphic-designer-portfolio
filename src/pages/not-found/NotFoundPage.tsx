import { Link } from "react-router-dom";

import { SITE_OWNER } from "../../constants/site";

import { usePageTitle } from "../../utils/usePageTitle";

import "./NotFoundPage.scss";

export default function NotFoundPage() {
  usePageTitle(`Page not found — ${SITE_OWNER}`);

  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <h1>This page does not exist.</h1>
      <Link to="/">Back to the homepage</Link>
    </main>
  );
}
