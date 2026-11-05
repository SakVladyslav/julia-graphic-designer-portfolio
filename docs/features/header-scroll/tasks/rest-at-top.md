---
id: T2
title: "Rest the header when the page is at the top"
layer: "domain"
deps: ["T1"]
blocks: ["T3"]
acs: ["AC-03", "AC-08"]
files_hint:
  - "src/components/Header/headerScrollPhase.ts"
  - "src/tests/components/Header/headerScrollPhase.test.ts"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T2 — Rest the header when the page is at the top

## Place in the sequence

- **Blocked by:** T1 — Decide hide and pin from scroll travel · **Blocks:** T3 — Hold the phase and reveal a hidden header on focus · **Wave:** 2. The travel sum from T1 has to exist before the top can override it.
- **Lane:** shares `headerScrollPhase.ts` and its test with T1, T3, T4, and T5. Serialized on that file.

## Why (user story)

> **As a** Visitor
> **I want** the taller resting header with no divider and no solid ground when the page is at the very top, including a page that does not scroll, and when I arrive there from the pinned header I want the height and the ground to change without the height animating
> **So that** the opening of the page matches the original header and the work stays put
>
> — `spec.md §4, US-03, verbatim` · full text: [spec.md](../spec.md)

This task makes the very top return `resting`, including when the last travel is under 10 px. Painting the height change is T7.

## Inlined context

> Reaching the very top shows the resting header even when the movement that got there is shorter than 10 px. The resting header has no ground: the page shows through. The very top still shows the resting header.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> The header state does not change until the sum reaches 10 px, unless the page reaches the very top.
>
> Pinned header becoming the resting header: no height animation. When the page reaches the very top, the height and the ground change together, the height does not animate, and the page content does not move.
>
> — `spec.md §6, Movement ignored and Pinned header becoming the resting header, abridged` · full text: [spec.md](../spec.md)

> The very top shows the resting header. Under 10 px the look stays, and the very top shows the resting header.
>
> — `sad.md §4, Keep the scroll phase in Header, abridged` · full text: [sad.md](../sad.md)

> The page reaches the very top: show the resting header, change height and ground, and do not animate the height.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> **Hard rule:** The function stays pure and beside `Header`. `SiteShell` does not grow a phase prop. No new store.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision outcome, abridged` · full text: [adr/0001-keep-scroll-phase-in-header.md](../adr/0001-keep-scroll-phase-in-header.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-03 — happy path

> **Given** a Visitor is on a page at the very top, including a page that does not scroll
> **When** the page is shown
> **Then** the Visitor sees the resting header, no divider, and no solid ground, so the page shows through
>
> — `spec.md §5, AC-03, verbatim` · full text: [spec.md](../spec.md)

### AC-08 — domain invariant

> **Given** the page is at the very top, including when a movement shorter than 10 px is what brought it there
> **When** the header is shown
> **Then** the Visitor sees the resting header and no divider, because the resting header never carries the divider or a solid ground, and the very top overrides the 10 px rule. When that resting header replaces the pinned header, the bar's height and its ground change, the height does not animate, and the work stays where it was
>
> — `spec.md §5, AC-08, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] Extend the T1 function. Scroll position `0` returns look `resting`. Do this even when the running travel is under 10 px, and even when the previous look was `pinned` or `hidden`.
- [ ] A page that does not scroll stays at position `0`, so the look stays `resting`.
- [ ] The top branch does not return a motion that means "animate height". Return `resting` with motion `none`. T7 owns the un-animated height and the transparent ground.
- [ ] Keep T1's tests passing. A move that stays below the top still uses the 10 px rule.
- [ ] Add unit tests for AC-03 and AC-08: position `0` from `pinned`, from `hidden`, and after a delta under 10 px, all return `resting`.

## Edge cases

| Case                                            | Behaviour                                                                         |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Pinned, then 4 px up, and the position is now 0 | Look is `resting`. The top wins over the 10 px sum.                               |
| Position stays 0 and the delta is 0             | Look stays `resting`.                                                             |
| Position is below the top                       | T1's rule still applies. This task does not treat a near-top position as the top. |

— `spec.md §5, AC-08, abridged` · full text: [spec.md](../spec.md)

## Definition of Done

- [ ] The unit tests assert look `resting` at scroll position 0, including a last travel under 10 px and a previous look of `pinned`
- [ ] T1's hide, pin, and under-10 px tests still pass
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/headerScrollPhase.test.ts` and `npm run lint` are clean for the touched files
