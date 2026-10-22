# Design system snapshot — julia-site

Snapshot of the Figma file **Website-Julia** (`mz08gQQzJrizSqgUvdmxgw`), owned by the team
**"Julia's Starter team"** (Professional plan). Read on 2026-10-22 (get_metadata, get_variable_defs,
get_design_context, get_screenshot, get_context_for_code_connect), mapped onto the code in this repo.
Read this file **before** calling the Figma MCP. Re-query Figma only for a node that changed after this date.

## 1. Breakpoints

| Token (`src/styles/_breakpoints.scss`) | Value | Figma frame |
|---|---|---|
| `$bp-desktop` | 1440px | `1440 px` |
| `$bp-laptop` | 1200px | `1200 px` |
| `$bp-tablet` | 1024px | `1024 px` |
| `$bp-stack` | 768px | `768 px` |
| `$bp-single` | 599px | — (code only) |
| `$bp-phone` | 479px | — (code only) |
| literal `390px` | 390px | `390 px` (no token; used as `fluid(..., 390px, $bp-stack)`) |

Between frames sizes are bridged with `fluid($from, $to, $from-viewport, $to-viewport)`, desktop-first `max-width` queries.

## 2. Colors

### Figma variables
| Figma variable | Value | Sass token (`src/styles/_colors.scss`) | Where Figma uses it |
|---|---|---|---|
| `Main` | `#f24281` | `$accent` | logo brackets, Contacts title, annotations, CV/LinkedIn borders |
| `Text` | `#1c1c1c` | `$text` | dark text on the light home page, Tag Dark, Project Card |
| `Background` | `#f3f3f4` | `$paper` | **light text on dark** (Contacts Dark labels, footer logo/nav/copyright). Despite the name it is *not* the page background |

### Colors that are hardcoded in Figma (no variable)
| Value | Where | Code token |
|---|---|---|
| `#ededef` | home page background, Contacts Light background | `$bg` / `$surface-muted` |
| `#1c1c1c` (raw, not `Text`) | dark case page background, Contacts Dark background, Project Card bottom border | `$surface-inverse` |
| `#f6f6f6` | light text on case pages (Project Header), Tag Light border/text | **none** — code uses `$paper` `#f3f3f4` (≈ match, 3 units lighter in Figma) |
| `#f3f3f4` (raw) | Telegram / email text in Contacts Dark | `$paper` |
| `#5d5d5d` | footer top rule | `$footer-line` |

Code-only colors (no Figma source seen): `$accent-hover` `#ff4fa3`, `$accent-wash`, `$hero-glow-*`
(the Figma hero glow is `Ellipse 65`, 400×400, = `$hero-glow-size`), `$case-frame*`, `$case-banner-ink`.

### Brand palettes (content, not tokens)
| Case | Figma variables | Code |
|---|---|---|
| BBG | `gray` `#EEF1F2`, `blue` `#003879`, `dark gray` `#313335` | `paper` / `blue` / `ink` in `src/constants/cases/bbg.ts` — match |
| OLX | `Fill/Digital/Charcoal` `#002F34`, `Fill/Digital/Teal` `#23E5DB` | not in code (only inside mockup images) |
| Molfaria | — | `cream` `#FFF4F2`, `blue` `#335978` in `molfaria.ts` |

No spacing / radius / size variables exist in Figma (none in any frame read). `_spacing.scss` and
`_sizes.scss` are measured values; checked values below match Figma auto layout.

## 3. Text styles (Min Sans; Medium = 500, Regular = 400; letter-spacing 0)

| Figma style | 1440 | 1200 | 1024 | 768 | 390 | Sass token (1440) |
|---|---|---|---|---|---|---|
| Section title | 72/1.1 | 64 | 60 | 56 | 40 | `$font-size-projects` / `$font-size-contacts` ⚠ (`$font-size-section` is 56) |
| Case title | 80/1.1 | ? | ? | 52 | 48 | `$font-size-case-title` ⚠ base line-height 1 |
| Case Subtitle | 28/1.3 | ? | ? | 20 | 20 | `$font-size-case-subtitle` ⚠ base line-height 1.2 |
| Content Title | 40/1.2 | ? | ? | 28 | 24 | `$font-size-case-heading` + `$line-height-heading` |
| Subsection Title | 48/1.2 | — | — | — | — | `$font-size-project-title` |
| Contact Link | 56/1.2 | 52 | 48 | 48 | 30 | reuses `$font-size-section` |
| Body | 18/1.5 | ? | ? | 16 | 16 | `$font-size-case-body` |
| Tag | 16/1.4 | 16 | 16 | 14 | 14 | `$font-size-base` + `$line-height-annotation` |

`?` = style exists per breakpoint but was not read (1200/1024 case frames not queried).
Not a text style: nav/labels are Medium 16, uppercase, tracking 0.64 (`$letter-spacing-nav`);
logo is Medium 22 uppercase (`$font-size-logo`).

Verified against code:
- Contacts / Section title / Contact Link values at all 5 breakpoints match the `fluid()` calls in `Contacts.scss`.
- ⚠ `_case-base.scss`: `.case-intro h1 { line-height: 1 }` vs Figma 1.1; `.case-subtitle { line-height: $line-height-heading /*1.2*/ }` vs Figma 1.3. Only `_bbg`, `_molfaria`, `_olx-novyny` override to 1.1/1.3; Amaryllis and Lovespace keep the base values.
- ⚠ 768/390 sizes exist only as raw numbers inside `fluid()` in `_bbg.scss`, `_molfaria.scss`, `_olx-novyny.scss`, `LandingPage.scss`, `Contacts.scss`.
- ⚠ Two style sets with identical values: Molfaria uses unprefixed `Case title` / `Case Subtitle` / `Body` / `Tag`; BBG and OLX use `1440/Case title` etc.

## 4. Figma components → code components

Components page `74:417`. Nothing is connected via Code Connect yet (`get_code_connect_map` = `{}`).

| Figma component (set node) | Properties (exact names) | Code component | Mapping |
|---|---|---|---|
| `Header` (`76:5718`) | `Appearance` Dark/Light · `Breakpoint` 1440/1200/1024/768/390 · `Show about` BOOLEAN | `src/components/Header/Header.tsx` | `Dark` → `tone="default"` (dark text, light page); `Light` → `tone="inverse"` (light text, dark case page). Breakpoint → CSS. Show about → no prop (always off on pages) |
| `Contacts` (`74:468`) | `Appearance` Light/Dark · `Breakpoint` | `src/components/Footer/Footer.tsx` (renders `Contacts`) | `Light` → `tone="light"`, `Dark` → `tone="inverse"`. Home = Dark, case pages = Light |
| `Project Card` (`74:434`) | `Project title` TEXT · `Show tag 3` BOOLEAN · nested `Cover image`, `Tag` | `src/components/ProjectCard/ProjectCard.tsx` | content from `src/constants/projects.ts` |
| `Cover image` (`74:442`) | `Project` = Molfaria, BBG, Lovespace, Amaryllis, Book covers, OLX, Novyny LIVE, Twitchvrotfl | `src/components/ProjectCard/ProjectVisual.tsx` | `image.kind` + `crop`; Molfaria crop in Figma (131.92% / 109.93% / -16.02% / -2.13%) = `$molfaria-window-*` |
| `Tag` (`74:459`) | `Text` TEXT · `Appearance` Dark/Light · `Size` 16/14 | **no component** (`<li>` in `.tags` / `.case-tags`) | Dark = `#1c1c1c` border+text, Light = `#f6f6f6`; padding 4/12, radius 999, border 1 |

Main component ids reported by `get_code_connect_suggestions` for page instances: Header `76:2906`,
Project Card `76:3012`, Cover image `76:2986`, Tag `76:3003`, Contacts `76:5870`. These are **not**
on a visible page of this file (get_metadata → "invalid node selection"), so instances may be linked to
another copy of the components. Check "Go to main component" before publishing Code Connect.

Measured details (get_design_context):
- Header 1440: padding 32/88 (`$header-padding-y/x`), nav gap 24 (`$nav-gap`), separator opacity 0.2.
- Contacts 1440: pt 144, gap to footer 176, heading gap 48, rows gap 32, annotation gap 2, inline gap 4,
  link panel 508 wide, cells padding 32, borders 2 `Main`; footer row: top rule 2 `#5d5d5d`, py 32,
  nav separator opacity 0.3, copyright opacity 0.7; to-top 40×40. All match `_spacing.scss` / `_sizes.scss`.
  Figma footer nav shows **Projects / About / Contacts**; code nav (`navigation.ts`) has only Projects / Contacts.
- Project Card 1440: width 616, cover 616×462, gap 20, info gap 16, tags gap 8, bottom border 2 `#1c1c1c`, pb 32.
- Case Project Header 1440 (Molfaria `100:10106`): px 88, pt 64, column gap 32; title block gap 16,
  eyebrow gap 4, eyebrow + subtitle opacity 0.8; details pt 40 / pb 48 / gap 32 / bottom border 2; body opacity 0.8.

Code-only components: `Logo`, `SiteNav`, `SiteShell`, `SkipLink`, `ContactActionItem`, `ContactDetailItem`,
`ContactArrow`, and the case sections in `src/components/ProjectCase/` (`CaseIntro`, `CaseMedia`,
`CaseComparison`, `CaseSplit`, `CasePalette`, `CaseMarks`, `CasePoster`, `CaseCluster`, `CaseStagger`,
`CaseBanner`, `CaseNote`, `CaseLogoStack`, `CaseLogoPair`, `CaseIconBoard`, `CaseTypefaces`, `CaseRelated`,
`CaseFrame`, `CaseWordmarkLogo`). Section types: `src/constants/projectCase.ts`.

## 5. Screen → node map (page `Design`, `0:1`)

| Screen | 1440 | 1200 | 1024 | 768 | 390 | Code | Spec |
|---|---|---|---|---|---|---|---|
| Home (section `98:9319`) | `98:9424` ("1445") | `98:9398` | `98:9372` | `98:9346` | `98:9320` | `src/pages/home/LandingPage.tsx` | `docs/screens/home.md` |
| Molfaria (`100:10100`) | `100:10101` | `100:10250` | `100:10655` | `100:10396` | `100:10542` | `cases/molfaria.ts`, `_molfaria.scss` | `docs/screens/molfaria.md` |
| BBG (`76:6261`) | `76:6262` ("1441") | `76:6398` | `76:6774` | `76:6528` | `76:6651` | `cases/bbg.ts`, `_bbg.scss` | `docs/screens/bbg-olx.md` |
| OLX (`76:7038`) | `76:7186` ("1443") | `76:7039` | `76:7148` | `76:7077` | `76:7115` | `cases/olx.ts`, `_olx-novyny.scss` | `docs/screens/bbg-olx.md` |
| Lovespace | `15:1144` (legacy) | — | — | — | — | `cases/lovespace.ts` | — |
| Amaryllis | `15:1872` (legacy) | — | — | — | — | `cases/amaryllis.ts` | — |
| Novyny LIVE | `43:3007` (legacy) | — | — | — | — | `cases/novyny.ts` | — |
| Header / Footer | `76:5718` / `74:468` | | | | | `Header.tsx` / `Footer.tsx` | `docs/screens/shared-header-footer.md` |

Legacy desktop-only frames `Desktop / …` (`44:4121`, `15:1653`, `43:3922`, `43:2896`) use detached
Header/Contacts frames. Prefer the sectioned frames.
