# BBG and OLX case pages

## BBG
- Figma section `76:6261` · 1440 `76:6262` ("1441") · 1200 `76:6398` · 1024 `76:6774` · 768 `76:6528` · 390 `76:6651`
- Code: `src/constants/cases/bbg.ts`, `src/components/ProjectCase/_bbg.scss` (`.case-page--bbg`)
- Text styles (1440): `1440/Case title` 80/1.1, `1440/Case Subtitle` 28/1.3, `1440/Body` 18/1.5,
  `1440/Content Title` 40/1.2, `1440/Section title` 72/1.1, `1440/Tag` 16/1.4, `1440/Contact Link` 56/1.2
- Brand variables: `gray` #EEF1F2, `blue` #003879, `dark gray` #313335 = `paper` / `blue` / `ink` in `bbg.ts`

## OLX
- Figma section `76:7038` · 1440 `76:7186` ("1443") · 1200 `76:7039` · 1024 `76:7148` · 768 `76:7077` · 390 `76:7115`
- Code: `src/constants/cases/olx.ts`, `src/components/ProjectCase/_olx-novyny.scss` (`.case-page--olx`)
- Same 1440 text styles as BBG. Extra variables `Fill/Digital/Charcoal` #002F34, `Fill/Digital/Teal` #23E5DB
  (OLX brand, only inside mockups; not in code).
- ⚠ Figma bug: in `768 px` (`76:7077`) the Header instance `76:7079` is 1200 px wide (wrong Breakpoint variant).

Structure of these pages was not read in detail (only metadata outline). Before changing them, read the
specific block node with get_design_context and add its structure here.
