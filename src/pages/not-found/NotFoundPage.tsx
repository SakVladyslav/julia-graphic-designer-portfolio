import { Link } from "react-router-dom";

import "./NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <h1>This page does not exist.</h1>
      <Link to="/">Back to the homepage</Link>
    </main>
  );
}
