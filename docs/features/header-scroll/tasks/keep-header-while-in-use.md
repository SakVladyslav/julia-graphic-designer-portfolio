---
id: T9
title: "Keep the header on screen while it is in use"
layer: "ui"
deps: ["T8"]
blocks: []
acs: ["AC-04", "AC-07", "AC-15", "AC-18"]
files_hint:
  - "src/components/Header/Header.tsx"
  - "src/tests/components/Header/Header.test.tsx"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T9 — Keep the header on screen while it is in use

## Place in the sequence

- **Blocked by:** T8 — Apply the scroll phase when the page is interactive · **Blocks:** none · **Wave:** 7. The listener and the class map already exist.
- **Lane:** shares `Header.tsx` and `Header.test.tsx` with T8. Serialized on those files.

## Why (user story)

> **As a** Visitor
> **I want** the header to stay visible while keyboard focus is inside it or the narrow-screen menu is open, and to show at once as the pinned header with a divider when focus enters it while it is hidden
> **So that** I can finish choosing a destination
>
> — `spec.md §4, US-04, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the shorter pinned header with a divider when I move up while the page is below the top
> **So that** I can reach navigation without returning to the very top
>
> — `spec.md §4, US-02, verbatim` · full text: [spec.md](../spec.md)

This task passes focus and the menu into the function T3 already defined, and it keeps the existing primary navigation on screen for every visitor.

## Inlined context

> The header stays on screen while the Visitor scrolls with keyboard focus inside it, or while the mobile menu is open. During that hold, and at the moment the hold ends, the header keeps the look it already had. The next scroll past 10 px is what changes it. When keyboard focus enters a hidden header, the header shows at once as the pinned header. A visitor whose system asks for less motion gets that same reveal as a fade of 150 ms. A jump started from the header follows that jump's end position, even if focus is still inside the header.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> Opening the page, the menu closes when the visitor presses Escape, presses outside the header, or chooses a navigation item. This change does not change how that menu opens and closes.
>
> — `spec.md §1, current header, abridged` · `spec.md §3, Non-goals, abridged` · full text: [spec.md](../spec.md)

> Focus entering a hidden header: at once, or a 150 ms fade when the system asks for less motion. This reveal does not use the scroll slide.
>
> — `spec.md §6, Focus entering a hidden header, abridged` · full text: [spec.md](../spec.md)

> **Hard rule:** Keep `menuOpen` local to `Header`. Do not add a store. The existing Escape, outside-press, and navigate close paths stay.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision outcome, abridged` · `spec.md §3, Non-goals, abridged` · full text: [spec.md](../spec.md)

### SCR-04 and SCR-05

> SCR-04 default — focus is inside the header below the top, and the visitor scrolls rather than jumping. The header stays in the pinned look it already had.
> SCR-04 reveal — focus enters a hidden header by Tab, the skip link, or programmatic focus. The pinned header shows at once. Reduced motion uses a 150 ms fade.
> SCR-04 released — focus has left and the menu is closed, before any new scroll. The look stays.
> SCR-05 default — the narrow-screen menu is open. The header stays in the look it already had.
> SCR-05 released — the menu has closed, before any new scroll. The look stays.
>
> — `screens.md §SCR-04 and §SCR-05, abridged` · full text: [screens.md](../screens.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [screens.md](../screens.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-04 — happy path

> **Given** keyboard focus is inside the header, or the narrow-screen menu is open, and the page is below the top
> **When** the Visitor scrolls, and this is a scroll rather than a jump started from the header
> **Then** the header stays visible in the look it already had, and that scroll does not hide it or switch its look
>
> — `spec.md §5, AC-04, verbatim` · full text: [spec.md](../spec.md)

### AC-07 — authorization

> **Given** a Visitor who reads the page and does not prepare it
> **When** the Visitor moves up while the page is below the top
> **Then** the Visitor sees the same pinned header and the same primary navigation as any other Visitor, and the page does not withhold the header
>
> — `spec.md §5, AC-07, verbatim` · full text: [spec.md](../spec.md)

### AC-15 — domain invariant

> **Given** the header was held visible, focus has left the header, and the narrow-screen menu is closed
> **When** that is the moment both holds end, before any new scroll, and the page is below the top
> **Then** the header stays in that same visible look until the Visitor next scrolls past 10 px
>
> — `spec.md §5, AC-15, verbatim` · full text: [spec.md](../spec.md)

### AC-18 — happy path

> **Given** the header is hidden, the page is below the top, and keyboard focus is outside the header
> **When** keyboard focus enters the header by Tab, by the skip link, or by programmatic focus
> **Then** the header shows at once as the pinned header with a divider and a solid ground in that page's opening tone. When the Visitor's system asks for less motion, the same pinned header appears by a fade of 150 ms
>
> — `spec.md §5, AC-18, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] On the listener T8 added, pass `menuOpen` and whether focus is inside `#top`. A scroll while either is true keeps the current classes. A jump still follows T4: replace the classes from the jump result even if focus is inside.
- [ ] When focus enters `#top` from outside, call the function with focus-entered. Apply `site-header--pinned` and no motion class. If reduced motion is on, apply `site-header--fade` instead of a slide class. Tab, the skip link moving focus into the header, and `element.focus()` share this path.
- [ ] Blur and closing the menu do not change classes by themselves. The next scroll of at least 10 px does.
- [ ] Do not change the Escape handler, the outside pointer handler, or `onNavigate`. Logo and `SiteNav` stay in the header in every look, including pinned. There is no auth check and no hidden nav.
- [ ] Extend `Header.test.tsx`. Assert the look class is unchanged on a scroll while the menu is open and while a control inside the header is focused. Assert it is unchanged on blur and on menu close before the next scroll. Assert focus entering a hidden header adds `--pinned` and not `--slide`, and adds `--fade` when reduced motion matches. Assert the primary nav is present on the pinned header.

## Edge cases

| Case                                          | Behaviour                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| Menu open, scroll down past 10 px             | Pinned (or the look already showing) stays. It does not become hidden. |
| Focus inside, jump to the top                 | Resting look. The jump wins over the hold.                             |
| Both holds end, no scroll yet                 | Classes stay.                                                          |
| Focus enters while hidden, reduced motion off | `--pinned`, no `--slide`, no `--fade`.                                 |
| Focus enters while hidden, reduced motion on  | `--pinned` and `--fade`.                                               |

— `screens.md §SCR-04 and §SCR-05, abridged` · `spec.md §5, AC-18, abridged` · full text: [screens.md](../screens.md)

## Definition of Done

- [ ] `Header.test.tsx` passes for a held scroll (focus and open menu), an unchanged look when both holds end, an immediate pinned reveal on focus entry, a fade class for that reveal under reduced motion, and the primary nav present while pinned
- [ ] Menu close on Escape, outside press, and navigate still behaves as before
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/Header.test.tsx` and `npm run lint` are clean for the touched files
