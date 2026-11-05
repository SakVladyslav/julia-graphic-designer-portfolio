import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteShell from "./components/SiteShell/SiteShell";

import LandingPage from "./pages/home/LandingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import CaseChunkBoundary from "./pages/project/CaseChunkBoundary";
import ProjectRouteFallback from "./pages/project/ProjectRouteFallback";

import { loadProjectCasePage } from "./pages/project/loadProjectCasePage";

import { caseHtmlAlreadyInDocument } from "./utils/ssr/caseHtmlAlreadyInDocument";
import { consumeNullCaseFallback } from "./utils/ssr/consumeNullCaseFallback";
import { routerBasename } from "./utils/url/routerBasename";

const ProjectCasePage = lazy(loadProjectCasePage);

function ProjectRoute() {
  const fallback = consumeNullCaseFallback(caseHtmlAlreadyInDocument()) ? null : (
    <ProjectRouteFallback />
  );

  return (
    <CaseChunkBoundary>
      <Suspense fallback={fallback}>
        <ProjectCasePage />
      </Suspense>
    </CaseChunkBoundary>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<LandingPage />} />
        <Route path="projects/:projectId" element={<ProjectRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <AppRoutes />
    </BrowserRouter>
  );
}
