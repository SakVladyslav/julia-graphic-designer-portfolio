# Header and Footer (shared)

## Header — Figma `Header` set `76:5718` → `src/components/Header/Header.tsx`
Properties: `Appearance` (Dark | Light), `Breakpoint` (1440 | 1200 | 1024 | 768 | 390), `Show about` (BOOLEAN).

| Figma | Code |
|---|---|
| Appearance=Dark (text `Text` #1c1c1c, transparent bg) | `tone="default"` (home) |
| Appearance=Light (light text, transparent bg) | `tone="inverse"` (case pages, `site-header--inverse` → `$paper`) |
| Breakpoint=390 (burger icon, 75 px tall) | CSS `.nav-toggle`, `max-width: $bp-stack - 1px` |
| Show about | no prop; page instances have it off; nav = `src/constants/navigation.ts` |

1440 metrics: height 93, padding 32 / 88, logo Medium 22 uppercase (`[` `]` in `Main`), nav Medium 16 uppercase,
tracking 0.64, gap 24, separator `/` opacity 0.2. Heights: 1440/1200/1024 = 93, 768 = 91, 390 = 75.

## Footer — Figma `Contacts` set `74:468` → `src/components/Footer/Footer.tsx` (+ `Contacts.tsx`)
Properties: `Appearance` (Light | Dark), `Breakpoint` (390 | 1440 | 1200 | 1024 | 768).

| Figma | Code |
|---|---|
| Appearance=Light (bg `#ededef`, dark text) | `tone="light"` (`$surface-muted`) — case pages |
| Appearance=Dark (bg `#1c1c1c`, text `Background` #f3f3f4) | `tone="inverse"` (`$surface-inverse` / `$paper`) — home |

1440 metrics: pt 144 (`$contacts-padding-top`), gap to footer row 176 (`$contacts-footer-gap`), heading gap 48,
contact rows gap 32, annotation gap 2, link panel 508 (`$contacts-panel-width`) with 2 px `Main` borders and
padding 32, location width 130 (`$contact-location-width`). Footer row: top rule 2 px `#5d5d5d` (`$footer-line`),
py 32, nav separators opacity 0.3, copyright opacity 0.7, to-top button 40×40 (`$to-top-size`).

Heights per breakpoint: 1440 = 710, 1200 = 677, 1024 = 657, 768 = 850, 390 = 805.
Text sizes: see `docs/design-system.md` §3 (Section title / Contact Link / Tag rows, all 5 breakpoints verified).

Known differences Figma ↔ code:
- Figma footer nav has **About**; code nav has only Projects / Contacts (no About section exists).
- Layer names differ between Contacts variants (e.g. `Title` vs `Page Title`, `Label` vs `Contact Name`),
  so the variants were built separately.
