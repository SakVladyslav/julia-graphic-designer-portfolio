// url=https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=74-468
// source=src/components/Footer/Footer.tsx
// component=Footer
//
// DRAFT, not published. Figma "Contacts" = whole code <Footer /> (Contacts block + logo/nav/
// copyright/to-top row). Verified 2026-10-22 via screenshot + get_design_context of the Home instance:
//   Appearance=Light → light background (#ededef)            → tone="light"   ($surface-muted)
//   Appearance=Dark  → dark background (#1c1c1c, hardcoded)   → tone="inverse" ($surface-inverse)
// Home page uses Dark, case pages use Light (matches SiteShell.tsx).
// "Breakpoint" is not mapped: layout lives in Contacts.scss / Footer.scss.
// Contact texts are data (src/constants/contacts.ts), so they are not read from layers.
// Before publishing: check "Go to main component" for a page instance (suggestions reported 76:5870).
import figma from 'figma'
const instance = figma.selectedInstance

const tone = instance.getEnum('Appearance', {
  Light: 'light',
  Dark: 'inverse',
})

export default {
  example: figma.code`<Footer tone="${tone}" />`,
  imports: ['import Footer from "../../components/Footer/Footer"'],
  id: 'footer',
  metadata: { nestable: false },
}
