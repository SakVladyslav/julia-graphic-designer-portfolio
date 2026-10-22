// url=https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=76-5718
// source=src/components/Header/Header.tsx
// component=Header
//
// DRAFT, not published. Parserless Code Connect template (figma.code).
// Verified 2026-10-22 via get_context_for_code_connect + screenshot of the set:
//   Appearance=Dark  → dark text (var(--text) #1c1c1c) on the light home page  → tone="default"
//   Appearance=Light → light text on the dark (#1c1c1c) case pages            → tone="inverse"
// Not mapped on purpose:
//   "Breakpoint" (VARIANT 1440/1200/1024/768/390) — responsive CSS in Header.scss, not a prop.
//   "Show about" (BOOLEAN) — no prop; links come from src/constants/navigation.ts
//   (Projects / Contacts only). Every page instance in Figma has it turned off.
// Before publishing: on a page, select a Header instance → "Go to main component" and make sure
// it lands on 76:5718. get_code_connect_suggestions reported main component 76:2906 for the
// instance on Home 1440, a node that is not on a visible page of this file.
import figma from 'figma'
const instance = figma.selectedInstance

const tone = instance.getEnum('Appearance', {
  Dark: 'default',
  Light: 'inverse',
})

export default {
  example: figma.code`<Header tone="${tone}" />`,
  imports: ['import Header from "../../components/Header/Header"'],
  id: 'header',
  metadata: { nestable: false },
}
