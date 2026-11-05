---
id: T6
title: "Fix the header to the viewport and move the clip"
layer: "ui"
deps: []
blocks: ["T7"]
acs: ["AC-12", "AC-17"]
files_hint:
  - "src/components/SiteShell/SiteShell.tsx"
  - "src/components/SiteShell/SiteShell.scss"
  - "src/components/Header/Header.scss"
  - "src/tests/components/SiteShell/SiteShell.test.tsx"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T6 — Fix the header to the viewport and move the clip

## Place in the sequence

- **Blocked by:** none · **Blocks:** T7 — Paint resting, pinned, and hidden looks · **Wave:** 1, with T1. The clip does not need the phase function.
- **Lane:** shares `Header.scss` with T7. T7 waits. This task does not touch `headerScrollPhase.ts`.

## Why (user story)

> **As a** Visitor
> **I want** the header to leave the screen when I move down the page past 10 px
> **So that** the work is not covered while I read downward
>
> — `spec.md §4, US-01, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the pinned header when the page opens already below the top, and the resting header on the saved first view
> **So that** navigation is there on arrival, and the page does not jump when the browser applies that position
>
> — `spec.md §4, US-09, verbatim` · full text: [spec.md](../spec.md)

This task makes the bar fixed, so a later hide does not pull the work, and leaves the first render as the resting header the saved page already shows.

## Inlined context

> The pinned header lies over the page and does not push the content down. The resting header is seen at the top of the page. Hiding the header, bringing it back, or shortening it does not move the work. The saved page, the one prepared before any browser has a scroll position, shows the resting header.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> The header is `position: fixed` against the viewport, with the same max-width and horizontal padding as `.container`, so the logo stays aligned. `overflow-x: clip` leaves `.site-shell`. A wrapper that starts after the header and includes the page outlet and the footer carries that clip, so the header is not inside a clipping box and the window stays the scrollport. There is no spacer equal to the header height. The page content starts at the top, underneath the bar.
>
> — `sad.md §4, Fix the header to the viewport, abridged` · full text: [sad.md](../sad.md)

> Source order stays skip link, then `Header`, then the page. The clip wrapper does not contain `Header`. The fixed header repeats `.container`'s max-width and horizontal padding so the marks line up with the column.
>
> — `sad.md §5, building block, abridged` · full text: [sad.md](../sad.md)

> **Chosen:** Option 1. `Header` stays after the skip link. It is `position: fixed` to the viewport and uses `.container`'s max-width and horizontal padding. `overflow-x: clip` moves onto a wrapper that contains the page outlet and the footer and does not contain the header.
>
> — `adr/0002-fix-the-header-to-the-viewport.md, Decision outcome, abridged` · full text: [adr/0002-fix-the-header-to-the-viewport.md](../adr/0002-fix-the-header-to-the-viewport.md)

> **Hard rule:** Do not add a spacer equal to the header height. The top of the page, including the hero, sits under the resting header. That shift is required. Do not lift `Header` out of `SiteShell`.
>
> — `adr/0002-fix-the-header-to-the-viewport.md, Decision outcome and Consequences, abridged` · full text: [adr/0002-fix-the-header-to-the-viewport.md](../adr/0002-fix-the-header-to-the-viewport.md)

### SCR-07 — Saved first view

> **default** — The saved view is shown, before a browser position exists (AC-12). Resting header, no divider, no solid ground. Components: SiteShell, SkipLink, Header, Logo, SiteNav.
>
> — `screens.md §SCR-07, default, abridged` · full text: [screens.md](../screens.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [screens.md](../screens.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-12 — happy path

> **Given** a page has been saved for a first view, before any browser has a scroll position
> **When** that saved view is shown
> **Then** the Visitor sees the resting header, no divider, and no solid ground
>
> — `spec.md §5, AC-12, verbatim` · full text: [spec.md](../spec.md)

### AC-17 — domain invariant

> **Given** a Visitor is reading a page
> **When** the header hides, returns as the pinned header, or returns as the resting header
> **Then** the work stays where it was. The header does not pull the work up and does not push it down. When the pinned header becomes the resting header at the very top, the bar changes height and loses its solid ground, and that height change is not animated
>
> — `spec.md §5, AC-17, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] In `SiteShell.tsx`, keep source order SkipLink, then Header, then the page. Add a wrapper (class `site-shell-clip`) that contains `Outlet` and `Footer` and does not contain `SkipLink` or `Header`. Keep `Outlet` inside `.container`. Leave the route `tone` prop as it is. Do not pass a phase prop.
- [ ] Move `overflow-x: clip` from `.site-shell` to `.site-shell-clip` in `SiteShell.scss`. Keep the inverse page ground on `.site-shell`.
- [ ] In `Header.scss`, set `.site-header` to `position: fixed` against the viewport. Give it `$page-max-width` and the same horizontal padding `.container` uses (`--page-pad` / `$header-padding-x`), including the existing breakpoint steps. Keep `z-index` above the page. Reuse Logo, SiteNav, and the existing `tone` classes. Add no new component.
- [ ] Add no element whose height equals the header. The page starts at the top, under the bar.
- [ ] The first render stays the current resting bar: transparent ground, no divider class, no hidden class. Do not read `window` in render. That first render is the saved view (SCR-07).
- [ ] Add `src/tests/components/SiteShell/SiteShell.test.tsx`. Assert SkipLink, then the header, then a clip wrapper that contains the outlet and the footer and does not contain the header. Follow `src/tests/components/Footer/Footer.test.tsx` for render setup. Do not assert a CSS pixel, a color, or `overflow`.

## Edge cases

| Case                        | Behaviour                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Published case route        | Inverse shell ground and `Header` `tone="inverse"` stay. The clip wrapper still excludes the header.       |
| Wide case page              | The clip wrapper includes the outlet and the footer, which is the horizontal clip `.site-shell` has today. |
| Saved HTML                  | Header is in the document, resting, with no pinned or hidden class.                                        |
| Hero at the top of the page | It sits under the fixed bar. No spacer pushes it down.                                                     |

— `screens.md §SCR-07, default, abridged` · `adr/0002-fix-the-header-to-the-viewport.md, Consequences, abridged` · full text: [screens.md](../screens.md) · [adr/0002-fix-the-header-to-the-viewport.md](../adr/0002-fix-the-header-to-the-viewport.md)

## Definition of Done

- [ ] `SiteShell.test.tsx` passes: the header is outside `.site-shell-clip`, and the outlet and the footer are inside it
- [ ] The first render of `Header` has no pinned class and no hidden class
- [ ] No spacer element was added, and `Header` is still rendered inside `SiteShell` after `SkipLink`
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/SiteShell/SiteShell.test.tsx` and `npm run lint` are clean for the touched files
