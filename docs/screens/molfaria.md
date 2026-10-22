# Molfaria (case page)

- Figma section: `100:10100` · frames: 1440 `100:10101` · 1200 `100:10250` · 1024 `100:10655` · 768 `100:10396` · 390 `100:10542`
- Last read from Figma: 2026-10-22 (768 structure via get_metadata; variables 1440/768/390; screenshot 1440; design_context of Project Header 1440)
- Code: `src/constants/cases/molfaria.ts`, styles: `src/components/ProjectCase/_molfaria.scss` (`.case-page--molfaria`)

## Page colors
Background `#1c1c1c` (hardcoded in Figma → `$surface-inverse`), light text `#f6f6f6` (hardcoded; code uses `$paper` #f3f3f4),
Header Appearance=Light → `tone="inverse"`, Footer (Contacts) Appearance=Light → `tone="light"`.

## Project Header at 1440 (`100:10106`) → `CaseIntro`
- Two columns, px 88, pt 64, gap 32 (`$case-column-gap`).
- Left `Project Title` (gap 16 = `$case-title-gap`): `Brand Name` (gap 4 = `$case-eyebrow-gap`) = eyebrow
  `[Self-initiated project]` Regular 16/1.4 opacity 0.8 + title `Molfaria` Medium 80/1.1; subtitle
  `Specialty Coffee Branding` Medium 28/1.3 opacity 0.8.
- Right `Project Details`: pt 40, pb 48 (`$case-intro-padding-y`), gap 32, bottom border 2 px light text color;
  description Regular 18/1.5 opacity 0.8 (3 paragraphs with empty lines between); 3 `Tag` (Appearance=Light, Size=16), gap 8.
- Text styles here are the **unprefixed** set (`Case title`, `Case Subtitle`, `Body`, `Tag`).

## Structure at 768 (top → bottom), side padding 40 px, content width 688 px
1. `Header` instance (`100:10398`) → `Header` (rendered by `SiteShell`)
2. Cover image (`100:10399`, 688×430) → section `media`
3. Intro (`100:10401`): eyebrow `[Self-initiated project]`, title `Molfaria`, subtitle
   `Specialty Coffee Branding`, copy, 3 `Tag` instances → section `intro` (`CaseIntro`)
4. Logo board (`100:10414`, 688×430) → logo media
5. 2×2 logo grid (`100:10438`, cells 340×182, 8 px gap) → logo grid section
6. Media stack (`100:10493`): mockups 688×430, 16 px apart; two poster frames
   (`100:10508` "Можна не поспішати / Допивай каву спокійно", `100:10526` "Смакуй по-своєму /
   Навіть якщо це фільтр з молоком") → `media` / `poster`
7. `Projects Section` (`100:10536`): `Section Title` + 2 `Project Card` (336 wide, 16 px gap) → `CaseRelated`
8. `Contacts` instance (`100:10541`) → `Footer`

## Text styles
| Style | 1440 | 768 | 390 |
|---|---|---|---|
| Case title | 80/1.1 | 52/1.1 | 48/1.1 |
| Case Subtitle | 28/1.3 | 20/1.3 | 20/1.3 |
| Body | 18/1.5 | 16/1.5 | 16/1.5 |
| Section title | 72/1.1 | 56/1.1 | 40/1.1 |
| Content Title | 40/1.2 | 28/1.2 | 24/1.2 |
| Tag | 16/1.4 | 14/1.4 | 14/1.4 |
| Contact Link | 56/1.2 | 48/1.2 | 30/1.2 |

Colors: `Main` (#f24281), `Text` (#1c1c1c).
Brand palette (content, in molfaria.ts): cream `#FFF4F2`, blue `#335978`.
