---
id: T8
title: "Apply the scroll phase when the page is interactive"
layer: "ui"
deps: ["T5", "T7"]
blocks: ["T9"]
acs: ["AC-01", "AC-02", "AC-13", "AC-14", "AC-16"]
files_hint:
  - "src/components/Header/Header.tsx"
  - "src/tests/components/Header/Header.test.tsx"
owner: "Tech Lead"
estimate: "M"
context_budget: "M"
status: "todo"
step: ""
---

# T8 — Apply the scroll phase when the page is interactive

## Place in the sequence

- **Blocked by:** T5 — Choose slide, fade, or no motion, and T7 — Paint resting, pinned, and hidden looks · **Blocks:** T9 — Keep the header on screen while it is in use · **Wave:** 6. The function and the classes both exist.
- **Lane:** shares `Header.tsx` and `Header.test.tsx` with T9. T9 extends this listener. T10 does not touch these files and can run beside this task.

## Why (user story)

> **As a** Visitor
> **I want** the header to leave the screen when I move down the page past 10 px
> **So that** the work is not covered while I read downward
>
> — `spec.md §4, US-01, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the shorter pinned header with a divider when I move up while the page is below the top
> **So that** I can reach navigation without returning to the very top
>
> — `spec.md §4, US-02, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the pinned header when the page opens already below the top, and the resting header on the saved first view
> **So that** navigation is there on arrival, and the page does not jump when the browser applies that position
>
> — `spec.md §4, US-09, verbatim` · full text: [spec.md](../spec.md)

This task connects window scroll to the pure function and writes the class T7 defined. Holds and focus entry are T9.

## Inlined context

> `Header` listens to window scroll, holds the phase beside the menu state it already owns, and applies the look. Scroll show and hide run only after the page is interactive in the browser. That first correction does not move the page content and does not play the slide or the fade.
>
> — `sad.md §4, Keep the scroll phase in Header, abridged` · `spec.md §1, committed approach, abridged` · full text: [sad.md](../sad.md)

> The page becomes interactive and reads the browser position. Position is the very top: keep the resting header. Position is below the top: show the pinned header with no slide and no fade. A new qualifying move arrives while the header is still moving: head for the new look and drop the unfinished move.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> After `SiteShell` scrolls to the top, `Header` must read the window position itself. A missed read would leave the previous page's phase on screen.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Consequences, abridged` · full text: [adr/0001-keep-scroll-phase-in-header.md](../adr/0001-keep-scroll-phase-in-header.md)

> **Hard rule:** Do not read the phase in `SiteShell` and do not add a prop for it. The listener is on `window`, which stays the scrollport. The first correction uses motion `none`. No request.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision outcome, abridged` · `spec.md §6, First correction, abridged` · full text: [spec.md](../spec.md)

### SCR-01 and SCR-03 — first correction

> SCR-01 `first-correction` — browser position is the top. End picture is the resting header. No slide and no fade.
> SCR-03 `first-correction` — browser position is already below the top. End picture is the pinned header. No slide and no fade.
> SCR-02 default — a downward move past 10 px slides the header off.
>
> — `screens.md §SCR-01, SCR-02, SCR-03, abridged` · full text: [screens.md](../screens.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [screens.md](../screens.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-01 — happy path

> **Given** a Visitor is on a page that can scroll, the narrow-screen menu is closed, keyboard focus is not inside the header, and the system does not ask for less motion
> **When** the Visitor moves down past 10 px
> **Then** the header slides off the screen and no longer covers the work
>
> — `spec.md §5, AC-01, verbatim` · full text: [spec.md](../spec.md)

### AC-02 — happy path

> **Given** a Visitor is on a page below the top, the narrow-screen menu is closed, keyboard focus is not inside the header, and the system does not ask for less motion
> **When** the Visitor moves up past 10 px
> **Then** the Visitor sees the pinned header with a divider and a solid ground in that page's opening tone
>
> — `spec.md §5, AC-02, verbatim` · full text: [spec.md](../spec.md)

### AC-13 — happy path

> **Given** the saved view showed the resting header, and the browser's position is already below the top, including a restored place or an address that opens below the top
> **When** the page becomes interactive
> **Then** the Visitor sees the pinned header with a divider and a solid ground, the page content stays where it was, and the header does not play the slide or the fade
>
> — `spec.md §5, AC-13, verbatim` · full text: [spec.md](../spec.md)

### AC-14 — domain invariant

> **Given** the saved view showed the resting header, and the browser's position is the very top
> **When** the page becomes interactive
> **Then** the Visitor still sees the resting header with no divider and no solid ground, and the page content does not move
>
> — `spec.md §5, AC-14, verbatim` · full text: [spec.md](../spec.md)

### AC-16 — error

> **Given** the header is still moving toward hidden, pinned, or resting
> **When** the Visitor moves past 10 px in the other direction
> **Then** the header heads for the state that matches the new direction, and it does not finish the move it had started
>
> — `spec.md §5, AC-16, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] In `Header.tsx`, keep the initial look as resting with no motion class, so the saved render (T6, AC-12) stays resting. Import `./headerScrollPhase` with the component imports. Styles stay last.
- [ ] After mount, in the browser only, call the function once with `firstCorrection` and `window` scroll position. Map the result onto classes: `hidden` → `site-header--hidden`, `pinned` → `site-header--pinned`, `resting` → neither. Motion `slide` → `site-header--slide`, `fade` → `site-header--fade`, `none` or `immediate` → no motion class. Keep `site-header--inverse` when `tone` is `inverse`.
- [ ] Subscribe to window `scroll`. Pass the delta and the position. A hash change and a scroll that `SiteShell` performs to the top are kind `jump`. An ordinary scroll is kind `scroll`. On each result, replace the phase classes immediately, including when a transition is still running (AC-16).
- [ ] Read `prefers-reduced-motion` and pass `reducedMotion`. Do not add a fetch or a context.
- [ ] Leave focus-entry and the menu hold for T9, but accept the function's existing focus and menu inputs. Pass the menu from `menuOpen` and focus-inside as false until T9.
- [ ] Add `src/tests/components/Header/Header.test.tsx`. Cover a downward scroll past 10 px (`--hidden` and `--slide`), an upward scroll past 10 px below the top (`--pinned` and `--slide`), a first correction below the top (`--pinned` and no motion class), and a first correction at the top (neither pinned nor hidden). Follow `Footer.test.tsx`. Do not assert a CSS pixel.

## Edge cases

| Case                                           | Behaviour                                                      |
| ---------------------------------------------- | -------------------------------------------------------------- |
| Render before the effect                       | Resting classes only. No pinned, hidden, slide, or fade class. |
| `scrollY` already below the top at mount       | Pinned, no motion class, content box unchanged.                |
| `scrollY` is 0 at mount                        | Resting, no motion class.                                      |
| A second scroll the other way during the slide | The class list becomes the new look on that event.             |
| Route tone `inverse`                           | `site-header--inverse` stays while phase classes change.       |

— `spec.md §5, AC-13, AC-14, AC-16, abridged` · full text: [spec.md](../spec.md)

## Definition of Done

- [ ] `Header.test.tsx` passes for hide on a downward scroll, pin on an upward scroll below the top, pinned with no motion class when the mount position is below the top, and resting when the mount position is the top
- [ ] The phase is not a `SiteShell` prop, and the scroll listener is removed on unmount
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/Header.test.tsx` and `npm run lint` are clean for the touched files
