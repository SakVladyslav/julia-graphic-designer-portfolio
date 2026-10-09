import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteShell from "./components/SiteShell/SiteShell";

import LandingPage from "./pages/home/LandingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import ProjectCasePage from "./pages/project/ProjectCasePage";

import { routerBasename } from "./utils/routerBasename";

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<LandingPage />} />
          <Route path="projects/:projectId" element={<ProjectCasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
