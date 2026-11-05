---
id: T3
title: "Hold the phase and reveal a hidden header on focus"
layer: "domain"
deps: ["T2"]
blocks: ["T4"]
acs: ["AC-04", "AC-15", "AC-18"]
files_hint:
  - "src/components/Header/headerScrollPhase.ts"
  - "src/tests/components/Header/headerScrollPhase.test.ts"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T3 — Hold the phase and reveal a hidden header on focus

## Place in the sequence

- **Blocked by:** T2 — Rest the header when the page is at the top · **Blocks:** T4 — Match jumps and replace an unfinished move · **Wave:** 3. Holds apply to a look the top rule can already return.
- **Lane:** shares `headerScrollPhase.ts` and its test with T1, T2, T4, and T5. Serialized on that file. T9 wires the same flags in `Header.tsx` later.

## Why (user story)

> **As a** Visitor
> **I want** the header to stay visible while keyboard focus is inside it or the narrow-screen menu is open, and to show at once as the pinned header with a divider when focus enters it while it is hidden
> **So that** I can finish choosing a destination
>
> — `spec.md §4, US-04, verbatim` · full text: [spec.md](../spec.md)

This task is that decision in the pure function. `Header` learns to pass focus and the menu in T9.

## Inlined context

> The header stays on screen while the Visitor scrolls with keyboard focus inside it, or while the mobile menu is open. During that hold, and at the moment the hold ends, the header keeps the look it already had. The next scroll past 10 px is what changes it. When keyboard focus enters a hidden header, by Tab, by the skip link, or by programmatic focus, the header shows at once as the pinned header with a divider and a solid ground. A visitor whose system asks for less motion gets that same reveal as a fade of 150 ms.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> Focus entering a hidden header: at once, or a 150 ms fade when the system asks for less motion. This reveal does not use the scroll slide.
>
> — `spec.md §6, Focus entering a hidden header, abridged` · full text: [spec.md](../spec.md)

> Focus is inside the header or the narrow-screen menu is open, and this is a scroll rather than a jump: keep the visible look the header already had.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> The hold while keyboard focus is inside the header, or the narrow-screen menu is open, reads DOM and menu state that `Header` already has. The pure function computes the next look. `Header` listens and keeps the phase beside `menuOpen`.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision drivers and Considered options, abridged` · full text: [adr/0001-keep-scroll-phase-in-header.md](../adr/0001-keep-scroll-phase-in-header.md)

> **Hard rule:** No React Context and no third-party store. The function stays pure. 150 ms is the CSS fade T7 paints; this task only chooses motion `immediate` or `fade`.
>
> — `sad.md §2, Technical, abridged` · `sad.md §10, QG-1, abridged` · full text: [sad.md](../sad.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [adr/](../adr/)

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

- [ ] Extend the same function with optional inputs: focus is inside, the menu is open, and focus has just entered. Defaults keep T1 and T2 green.
- [ ] A scroll (not a jump; jump is T4) while focus is inside or the menu is open, and the page is below the top, returns the previous look and motion `none`.
- [ ] Releasing both holds without a new scroll returns the previous look and motion `none`. The next call that is a scroll of 10 px or more uses T1's rule again.
- [ ] Focus entering while the look is `hidden` and the page is below the top returns `pinned`. Motion is `immediate` when reduced motion is off, and `fade` when it is on. Do not return `slide` for this reveal.
- [ ] Tab, the skip link, and programmatic focus are the same input for this function. T9 tells them apart in the DOM. One flag is enough here.
- [ ] Unit tests cover AC-04, AC-15, and AC-18, including the reduced-motion reveal as `fade`.

## Edge cases

| Case                                            | Behaviour                                             |
| ----------------------------------------------- | ----------------------------------------------------- |
| Menu open and the scroll would otherwise hide   | Look stays. Motion `none`.                            |
| Focus inside and the scroll would otherwise pin | Look stays. Motion `none`.                            |
| Both holds end, delta is 0, page below the top  | Look stays until a later scroll reaches 10 px.        |
| Focus enters a hidden header at the top         | T2 wins: look `resting`. AC-18 is the below-top case. |
| Focus enters while reduced motion is on         | Motion `fade`, look `pinned`.                         |

— `spec.md §5, AC-04, AC-15, AC-18, abridged` · full text: [spec.md](../spec.md)

## Definition of Done

- [ ] Unit tests assert an unchanged look on a held scroll, an unchanged look when both holds end before a new scroll, `pinned` + `immediate` when focus enters a hidden header, and `pinned` + `fade` for that entry under reduced motion
- [ ] T1 and T2 tests still pass
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/headerScrollPhase.test.ts` and `npm run lint` are clean for the touched files
