---
id: T1
title: "Decide hide and pin from scroll travel"
layer: "domain"
deps: []
blocks: ["T2"]
acs: ["AC-01", "AC-02", "AC-06"]
files_hint:
  - "src/components/Header/headerScrollPhase.ts"
  - "src/tests/components/Header/headerScrollPhase.test.ts"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T1 — Decide hide and pin from scroll travel

## Place in the sequence

- **Blocked by:** none · **Blocks:** T2 — Rest the header when the page is at the top · **Wave:** 1, with T6. Nothing in the phase module exists yet.
- **Lane:** shares `src/components/Header/headerScrollPhase.ts` and its test with T2, T3, T4, and T5. Those four wait on this file. T6 does not.

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

This task is the pure decision for those two moves, and for a run that is still too short to count.

## Inlined context

> Travel in one direction adds up, and a change of direction resets that sum. Moving down once that sum passes 10 px hides the header. Moving up once that sum passes 10 px, while the page is still below the top, shows the shorter pinned header.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> Movement ignored: < 10 px in one direction. Travel in one direction adds up, and a change of direction resets that sum. The header state does not change until the sum reaches 10 px, unless the page reaches the very top.
>
> Requests added by scrolling: 0.
>
> — `spec.md §6, Movement ignored and Requests added by scrolling, abridged` · full text: [spec.md](../spec.md)

> `headerScrollPhase.ts` — pure next phase from direction, position, and holds. The direction rules live here so they can be tested without the layout. `SiteShell` does not grow a phase prop.
>
> — `sad.md §5, building block, abridged` · full text: [sad.md](../sad.md)

> Travel in this direction is still under 10 px: keep the look the header already had. Move down reaches 10 px while the menu is closed and focus is outside the header: hide the header. Move up reaches 10 px while the menu is closed, focus is outside the header, and the page stays below the top: show the pinned header.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> **Chosen:** Option 1. Keep the scroll phase in Header. A pure function next to it computes the next look.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision outcome, abridged` · full text: [adr/0001-keep-scroll-phase-in-header.md](../adr/0001-keep-scroll-phase-in-header.md)

> **Hard rule:** No React Context and no third-party store. Scrolling adds no request.
>
> — `sad.md §2, Technical, abridged` · full text: [sad.md](../sad.md)

> A Vitest test of `headerScrollPhase` asserts which motion mode applies (slide, 150 ms fade, at once, or none). It does not assert a CSS pixel value.
>
> — `sad.md §10, QG-1, abridged` · full text: [sad.md](../sad.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [adr/](../adr/)

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

### AC-06 — error

> **Given** the header is resting or pinned, and the movement does not leave the page at the very top
> **When** the running distance in the current direction is still under 10 px
> **Then** the header stays in that same state, which shows the Visitor that the movement was too small to count as a direction change. A change of direction resets that distance to the new direction's travel
>
> — `spec.md §5, AC-06, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] Add `src/components/Header/headerScrollPhase.ts`. One exported function. The caller passes the previous look and the running travel, and the function returns the next look, the next travel, and a motion. Looks are `resting`, `hidden`, and `pinned`. Motions used here are `slide` and `none` (`none` means the look stays). Later tasks add `fade` and `immediate` on this same function. Do not read the DOM, `window`, or React state.
- [ ] Downward travel adds up. At 10 px or more, with the menu closed and focus outside the header, the look becomes `hidden` and the motion is `slide`.
- [ ] Upward travel below the top adds up. At 10 px or more, under the same holds, the look becomes `pinned` and the motion is `slide`.
- [ ] Under 10 px the look stays. A direction change sets the running travel back to the new direction's delta, then the 10 px rule applies to that new sum.
- [ ] New inputs that later tasks need (`reducedMotion`, jump, focus, menu, first correction) may be added only as optional fields whose default keeps this task's results. Do not add a second function or a store.
- [ ] Unit tests in `src/tests/components/Header/headerScrollPhase.test.ts` cover AC-01, AC-02, and AC-06 by the returned look and motion. Assert `slide` or `none`, not a CSS pixel or a duration.

## Edge cases

| Case                                                | Behaviour                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 9 px down, then 9 px more down                      | The second call hides. Travel adds up. The first call stays.                        |
| 9 px down, then any px up, page still below the top | Travel resets to the upward delta. The look stays until that new sum reaches 10 px. |
| Exactly 10 px in one direction                      | The look changes. The threshold is "reaches 10 px".                                 |
| Menu open, or focus inside, on this task's inputs   | Pass them as the closed and outside defaults. Hold behaviour is T3.                 |

— `spec.md §5, AC-06, abridged` · `sad.md §6, Scroll phase, abridged` · full text: [spec.md](../spec.md) · [sad.md](../sad.md)

## Definition of Done

- [ ] `headerScrollPhase.test.ts` passes for hide after 10 px down (`hidden` + `slide`), pin after 10 px up below the top (`pinned` + `slide`), and an unchanged look while the current direction is under 10 px, including a direction change that resets the sum
- [ ] The function is pure: same input, same output, no DOM
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/headerScrollPhase.test.ts` and `npm run lint` are clean for the touched files
