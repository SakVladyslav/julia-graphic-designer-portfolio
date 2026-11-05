---
id: T4
title: "Match jumps and replace an unfinished move"
layer: "domain"
deps: ["T3"]
blocks: ["T5"]
acs: ["AC-05", "AC-16"]
files_hint:
  - "src/components/Header/headerScrollPhase.ts"
  - "src/tests/components/Header/headerScrollPhase.test.ts"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T4 — Match jumps and replace an unfinished move

## Place in the sequence

- **Blocked by:** T3 — Hold the phase and reveal a hidden header on focus · **Blocks:** T5 — Choose slide, fade, or no motion · **Wave:** 4. A jump has to win over the hold T3 just added.
- **Lane:** shares `headerScrollPhase.ts` and its test with T1, T2, T3, and T5. Serialized on that file.

## Why (user story)

> **As a** Visitor
> **I want** an in-page jump or a return to the top to leave the header in the state that matches the direction and the end position
> **So that** the bar is not stuck in the state from before the jump
>
> — `spec.md §4, US-06, verbatim` · full text: [spec.md](../spec.md)

This task returns the look a jump ends on, and the look a reversing move asks for, without waiting for the previous motion to finish.

## Inlined context

> An in-page jump or a return to the top follows the same direction and end position: the top shows the resting header with no divider, a downward move hides the header, and an upward move that ends below the top shows the pinned header with a divider. A jump started from the header follows that jump's end position, even if focus is still inside the header. A new move past 10 px in the other direction, while the header is still moving, sends it toward the new state without finishing the move it had started.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> A jump ends, including a jump started from inside the header: match the jump direction and the end position. A new qualifying move arrives while the header is still moving: head for the new look and drop the unfinished move.
>
> — `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

> **Hard rule:** The function stays pure. It returns the new look immediately. It does not model an in-flight clock. Dropping the unfinished CSS move is T8 applying this return at once.
>
> — `adr/0001-keep-scroll-phase-in-header.md, Decision outcome, abridged` · `sad.md §6, Scroll phase, abridged` · full text: [sad.md](../sad.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-05 — happy path

> **Given** the Visitor jumps within the page or returns to the top, including a jump started from inside the header
> **When** the jump ends
> **Then** an ending at the top shows the resting header with no divider and no solid ground, a downward jump past 10 px hides the header, and an upward jump that ends below the top shows the pinned header with a divider and a solid ground, even if focus is still inside the header
>
> — `spec.md §5, AC-05, verbatim` · full text: [spec.md](../spec.md)

### AC-16 — error

> **Given** the header is still moving toward hidden, pinned, or resting
> **When** the Visitor moves past 10 px in the other direction
> **Then** the header heads for the state that matches the new direction, and it does not finish the move it had started
>
> — `spec.md §5, AC-16, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] Add an optional input for kind: `scroll` or `jump`. Default `scroll`, so T1–T3 tests stay valid. `Header` (T8) decides which events are jumps. This function does not read the URL.
- [ ] A jump to position 0 returns `resting`, including when focus is inside the header. The hold does not apply to a jump.
- [ ] A downward jump of 10 px or more that ends below the top returns `hidden`. An upward jump of 10 px or more that ends below the top returns `pinned`, including when focus is inside.
- [ ] A qualifying move in the other direction returns that new look on this call. There is no "finish the previous motion" result.
- [ ] Unit tests cover AC-05's three endings and AC-16's reverse, with focus inside on the jump cases.

## Edge cases

| Case                                                                 | Behaviour                                                               |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Jump shorter than 10 px, end still below the top                     | Look stays. Same threshold as AC-06.                                    |
| Jump to the top from inside the header                               | Look `resting`, even though focus is inside.                            |
| Downward slide still in progress, then 10 px up, still below the top | This call returns `pinned`. It does not return the old `hidden` target. |
| Upward slide still in progress, then 10 px down                      | This call returns `hidden`.                                             |

— `spec.md §5, AC-05 and AC-16, abridged` · full text: [spec.md](../spec.md)

## Definition of Done

- [ ] Unit tests assert `resting` at the end of a jump to the top, `hidden` after a downward jump of at least 10 px, `pinned` after an upward jump that ends below the top even with focus inside, and the opposite look on a reversing move of at least 10 px
- [ ] T1–T3 tests still pass
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm test -- src/tests/components/Header/headerScrollPhase.test.ts` and `npm run lint` are clean for the touched files
