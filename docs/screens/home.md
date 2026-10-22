# Home page

- Figma section `98:9319` · 1440 `98:9424` (named "1445") · 1200 `98:9398` · 1024 `98:9372` · 768 `98:9346` · 390 `98:9320`
- Last read from Figma: 2026-10-22 (metadata 1440, variables 1440/390, screenshot 1440, design_context of Header + Contacts instances)
- Code: `src/pages/home/LandingPage.tsx` + `LandingPage.scss`, data `src/constants/projects.ts` (`projects`, `projectGroups`)

## Structure at 1440 (top → bottom)
1. `Header` instance `98:9426`: Appearance=Dark, Show about=off → `<Header tone="default" />` (via `SiteShell`)
2. Hero `98:9427` (1440×444): `Julia Samchuk` (x 88, y 69, w 1076 = `$hero-title-width`, 160 px = `$font-size-hero`),
   `Graphic Designer` (x 271 = `$hero-role-margin-left`, 88 px = `$font-size-role`), arrow frame 72×72 (`$hero-arrow-size`),
   pink glow `Ellipse 65` 400×400 (`$hero-glow-size`, colors `$hero-glow-*`, not variables in Figma)
3. Projects `98:9434`: heading `Projects` (Section title 72) + count `[06]` (Main, 16) → `formatSectionCount`
   Grid `98:9438`: 6× `Project Card` 616×610, column gap 32, row gap 64 (`$project-row-gap`)
4. `[Web Design Experience]` `98:9445` (48 px = Subsection Title → `$font-size-project-title`) + 2 cards (OLX, Novyny) → `projectGroups`
5. `Contacts` instance `98:9450`: Appearance=Dark → `<Footer tone="inverse" />`

## Colors
Page background `#ededef` (hardcoded in Figma → `$bg`), text `Text` → `$text`, accent `Main` → `$accent`.

## Hidden / junk layers in this frame
`rectang` `98:9433` (hidden), `Frame 1000002544` `98:9451` (hidden).
