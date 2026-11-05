---
id: T5
title: "Choose slide, fade, or no motion"
layer: "domain"
deps: ["T4"]
blocks: ["T8"]
acs: ["AC-10", "AC-13", "AC-14"]
files_hint:
  - "src/components/Header/headerScrollPhase.ts"
  - "src/tests/components/Header/headerScrollPhase.test.ts"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T5 — Choose slide, fade, or no motion

## Place in the sequence

- **Blocked by:** T4 — Match jumps and replace an unfinished move · **Blocks:** T8 — Apply the scroll phase when the page is interactive · **Wave:** 5. Motion is the last branch on the pure function, and T8 applies it.
- **Lane:** shares `headerScrollPhase.ts` and its test with T1–T4. Serialized on that file. T7 paints the durations this task only names.

## Why (user story)

> **As a** Visitor
> **I want** a short fade instead of a slide when my system asks for less motion
> **So that** the header still hides and returns without a large movement
>
> — `spec.md §4, US-07, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the pinned header when the page opens already below the top, and the resting header on the saved first view
> **So that** navigation is there on arrival, and the page does not jump when the browser applies that position
>
> — `spec.md §4, US-09, verbatim` · full text: [spec.md](../spec.md)

This task picks the motion for a qualifying scroll and for the first correction. The saved HTML staying at rest is T6. Applying the correction in the browser is T8.

## Inlined context

> When the system does not ask for less motion, the header is fully settled within ≤ 300 ms. When the system asks for less motion, the same look is a 150 ms fade, not a slide. After the page becomes interactive, the client applies the pinned header or the resting header to match the browser position and plays 0 ms of slide or fade.
>
> — `sad.md §4, Paint with CSS, abridged` · full text: [sad.md](../sad.md)

> The system asks for less motion: reach the same look by a 150 ms fade instead of a slide. Position is the very top: keep the resting header and do not move the work. Position is below the top: show the pinned header with a divider and a solid ground, with no slide and no fade.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> Reduced-motion fade: 150 ms. First correction after the saved view: 0 ms of slide or fade. The header matches the browser's position without playing the slide or the fade, and the page content does not move.
>
> — `spec.md §6, Reduced-motion fade and First correction, abridged` · full text: [spec.md](../spec.md)

> A Vitest test of `headerScrollPhase` asserts which motion mode applies (slide, 150 ms fade, at once, or none). It does not assert a CSS pixel value.
>
> — `sad.md §10, QG-1, abridged` · full text: [sad.md](../sad.md)

> **Hard rule:** The first correction is motion `none`, including when reduced motion is on. It is not a fade. No request is added.
>
> — `spec.md §6, First correction and Requests added by scrolling, abridged` · full text: [spec.md](../spec.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-10 — happy path

> **Given** the Visitor's system asks for less motion, the narrow-screen menu is closed, and keyboard focus is not inside the header
> **When** the Visitor moves down or up past 10 px
> **Then** the header reaches the same hidden, pinned, or resting result as it would for any other Visitor, and it gets there by a fade of 150 ms rather than a slide
>
> — `spec.md §5, AC-10, verbatim` · full text: [spec.md](../spec.md)

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

## Checklist

- [ ] Extend the same function. Optional `reducedMotion` defaults to false. Optional `firstCorrection` defaults to false. Defaults keep T1–T4 green.
- [ ] A qualifying scroll with `reducedMotion` returns the same look T1 or T2 would return, with motion `fade` instead of `slide`. The 150 ms duration is T7.
- [ ] `firstCorrection` below the top returns look `pinned` and motion `none`. `firstCorrection` at position 0 returns look `resting` and motion `none`. Do this even when `reducedMotion` is true.
- [ ] A held scroll (T3) stays motion `none` under reduced motion. The fade does not run while the menu is open or focus is inside.
- [ ] Unit tests cover AC-10 (down, up, and the top), AC-13, and AC-14. Assert the motion name, not a millisecond value.

## Edge cases

| Case                                              | Behaviour                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Reduced motion, 10 px down                        | Look `hidden`, motion `fade`.                                                                    |
| Reduced motion, 10 px up, below the top           | Look `pinned`, motion `fade`.                                                                    |
| Reduced motion, position becomes 0                | Look `resting`, motion `fade` on a scroll. Motion `none` when this call is the first correction. |
| First correction below the top, reduced motion on | Look `pinned`, motion `none`. Not `fade`.                                                        |
| First correction at 0                             | Look `resting`, motion `none`.                                                                   |

— `spec.md §5, AC-10, AC-13, AC-14, abridged` · full text: [spec.md](../spec.md)

## Definition of Done

- [ ] Unit tests assert `fade` (not `slide`) for a qualifying scroll when reduced motion is on, `pinned` + `none` for a first correction below the top, and `resting` + `none` for a first correction at the top
- [ ] T1–T4 tests still pass
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/headerScrollPhase.test.ts` and `npm run lint` are clean for the touched files
