// url=https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=74-434
// source=src/components/ProjectCard/ProjectCard.tsx
// component=ProjectCard
//
// DRAFT, not published. Figma props (get_context_for_code_connect, 2026-10-22):
//   "Project title" (TEXT) → used to pick the entry from src/constants/projects.ts
//   "Show tag 3" (BOOLEAN) → no prop: tags come from project.tags
// Nested "Cover image" (Project=…) and "Tag" instances are rendered inside ProjectCard
// (ProjectVisual + .tags li), so they are not resolved separately here.
// Before publishing: check "Go to main component" for a page instance (suggestions reported 76:3012).
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Project title')

export default {
  example: figma.code`<ProjectCard project={projects.find((project) => project.title === "${title}")!} />`,
  imports: [
    'import ProjectCard from "../../components/ProjectCard/ProjectCard"',
    'import { projects } from "../../constants/projects"',
  ],
  id: 'project-card',
  metadata: { nestable: true },
}
