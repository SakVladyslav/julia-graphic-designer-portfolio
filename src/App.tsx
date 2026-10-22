import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteShell from "./components/SiteShell/SiteShell";

import LandingPage from "./pages/home/LandingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

import { routerBasename } from "./utils/routerBasename";

const ProjectCasePage = lazy(() => import("./pages/project/ProjectCasePage"));

function ProjectRoute() {
  return (
    <Suspense fallback={null}>
      <ProjectCasePage />
    </Suspense>
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
