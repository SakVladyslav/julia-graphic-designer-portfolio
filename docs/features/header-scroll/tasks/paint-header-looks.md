---
id: T7
title: "Paint resting, pinned, and hidden looks"
layer: "ui"
deps: ["T6"]
blocks: ["T8", "T10"]
acs: ["AC-02", "AC-09", "AC-10", "AC-17"]
files_hint:
  - "src/components/Header/Header.scss"
  - "src/styles/_sizes.scss"
owner: "Tech Lead"
estimate: "M"
context_budget: "M"
status: "done"
step: "COMMIT"
---

# T7 — Paint resting, pinned, and hidden looks

## Place in the sequence

- **Blocked by:** T6 — Fix the header to the viewport and move the clip · **Blocks:** T8 — Apply the scroll phase when the page is interactive, and T10 — Offset in-page targets by the pinned header height · **Wave:** 2. The bar is already fixed, so these classes do not change the content box.
- **Lane:** shares `Header.scss` with T6. Own files besides that: `src/styles/_sizes.scss`. T10 reads the token this task adds and does not edit `Header.scss`.

## Why (user story)

> **As a** Visitor
> **I want** the shorter pinned header with a divider when I move up while the page is below the top
> **So that** I can reach navigation without returning to the very top
>
> — `spec.md §4, US-02, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** the header's marks and the pinned header's ground to stay the opening tone declared for this page
> **So that** later sections do not restyle the bar
>
> — `spec.md §4, US-05, verbatim` · full text: [spec.md](../spec.md)

> **As a** Visitor
> **I want** a short fade instead of a slide when my system asks for less motion
> **So that** the header still hides and returns without a large movement
>
> — `spec.md §4, US-07, verbatim` · full text: [spec.md](../spec.md)

This task paints those looks on the existing header. It does not decide when they apply. T8 and T9 add the classes.

## Inlined context

> Show and hide use CSS transitions in the header styles. No animation library. When the system does not ask for less motion, the header is fully settled within ≤ 300 ms. When the system asks for less motion, the same look is a 150 ms fade, not a slide. The pinned header's height is one token in `src/styles/_sizes.scss`. The opening tone stays the `tone` prop `SiteShell` already passes from the route. Height, divider thickness, spacing, and colors come from the design frame, not from a later section's background.
>
> — `sad.md §4, Paint with CSS, abridged` · full text: [sad.md](../sad.md)

> Header settles after a qualifying move, when the system does not ask for less motion: ≤ 300 ms. Reduced-motion fade: 150 ms. Pinned header becoming the resting header: no height animation. Opening-tone changes on one page: 0.
>
> — `spec.md §6, settle, fade, height, and opening tone, abridged` · full text: [spec.md](../spec.md)

> A light opening tone uses dark marks. Its pinned header has a light solid ground and a dark divider. A dark opening tone uses light marks. Its pinned header has a dark solid ground and a light divider. The resting header stays transparent on every row.
>
> — `spec.md §1, opening tone, abridged` · full text: [spec.md](../spec.md)

> **Hard rule:** No animation library. No new color hex. Token `@use` order is colors, typography, spacing, sizes. The hidden header stays in tab order so focus can enter it (AC-18, wired in T9).
>
> — `sad.md §2, Conventions, abridged` · `sad.md §4, Paint with CSS, abridged` · full text: [sad.md](../sad.md)

### SCR-01, SCR-02, SCR-03, SCR-08

> SCR-01 default — resting header, taller, no divider, no solid ground. The page shows through. Frame `98:9424`.
> SCR-02 default — header off-screen. Hiding it does not move the work. Frame `217:3286`.
> SCR-03 default — shorter pinned header, solid ground in the opening tone, bottom divider. The bar on `196:2947` is 77px tall, against 93px for the resting header. Its bottom stroke is 2px.
> SCR-08 default — a later section does not restyle the pinned bar. Frame `220:3417`.
>
> — `screens.md §SCR-01, SCR-02, SCR-03, SCR-08, default, abridged` · full text: [screens.md](../screens.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [screens.md](../screens.md) · [adr/](../adr/)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-02 — happy path

> **Given** a Visitor is on a page below the top, the narrow-screen menu is closed, keyboard focus is not inside the header, and the system does not ask for less motion
> **When** the Visitor moves up past 10 px
> **Then** the Visitor sees the pinned header with a divider and a solid ground in that page's opening tone
>
> — `spec.md §5, AC-02, verbatim` · full text: [spec.md](../spec.md)

### AC-09 — cross-context

> **Given** a page whose route declares a dark opening tone, or a page whose route declares a light opening tone, as in the table in §1
> **When** the Visitor moves into a later section whose background is the opposite tone, including more projects, contacts, or the footer
> **Then** the header keeps the marks of the declared opening tone, the pinned header keeps that tone's solid ground, and the divider keeps the contrasting tone: a light divider on a dark pinned header, a dark divider on a light pinned header
>
> — `spec.md §5, AC-09, verbatim` · full text: [spec.md](../spec.md)

### AC-10 — happy path

> **Given** the Visitor's system asks for less motion, the narrow-screen menu is closed, and keyboard focus is not inside the header
> **When** the Visitor moves down or up past 10 px
> **Then** the header reaches the same hidden, pinned, or resting result as it would for any other Visitor, and it gets there by a fade of 150 ms rather than a slide
>
> — `spec.md §5, AC-10, verbatim` · full text: [spec.md](../spec.md)

### AC-17 — domain invariant

> **Given** a Visitor is reading a page
> **When** the header hides, returns as the pinned header, or returns as the resting header
> **Then** the work stays where it was. The header does not pull the work up and does not push it down. When the pinned header becomes the resting header at the very top, the bar changes height and loses its solid ground, and that height change is not animated
>
> — `spec.md §5, AC-17, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] Add `$header-pinned-height: 77px` to `src/styles/_sizes.scss`. That is the pinned bar on frame `196:2947`. Divider thickness is the existing `$border-strong` (2px). Do not add a color token.
- [ ] `@use` sizes from `Header.scss` after the modules it already uses. Reuse `$text`, `$paper`, `$bg`, and `$surface-inverse`. Light pinned ground is `$bg`. Dark pinned ground is `$surface-inverse`. Default marks stay `$text`. `.site-header--inverse` marks stay `$paper`. The divider uses the opposite of the ground: `$text` on the light ground, `$paper` on the dark ground.
- [ ] Default `.site-header` is the resting look: transparent ground, no divider, taller than the pinned look. Do not set a solid background on it.
- [ ] `.site-header--pinned` uses `$header-pinned-height`, a solid ground from the tone above, and a bottom divider. `.site-header--hidden` moves the bar fully off-screen (`translateY(-100%)`). The hidden bar stays in tab order: no `display: none`, no `visibility: hidden`, no `inert`.
- [ ] `.site-header--slide` transitions transform and finishes within 300 ms. `.site-header--fade` transitions opacity for 150 ms and does not translate. Height, padding, and background are not part of either transition.
- [ ] A class change replaces a running transition. That is how AC-16 drops an unfinished move once T8 applies the new class. Do not add an animation library.
- [ ] No new test. Do not assert a CSS pixel, color, or duration. T8's tests assert the class names.

## Edge cases

| Case                                             | Behaviour                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Resting look                                     | Transparent. No divider. The page shows through.                                     |
| Pinned on a dark opening tone                    | Dark ground, light marks, light divider.                                             |
| Pinned over a later section of the opposite tone | The ground stays the tone class. It is not sampled from the section.                 |
| Reduced motion                                   | The fade class is opacity 150 ms. The slide class is what a non-reduced scroll uses. |
| Pinned becoming resting                          | Height and ground change with no height transition.                                  |

— `screens.md §SCR-01, SCR-03, SCR-08, abridged` · `spec.md §6, abridged` · full text: [screens.md](../screens.md) · [spec.md](../spec.md)

## Definition of Done

- [ ] `Header.scss` defines resting (the default), `--pinned`, `--hidden`, `--slide` (≤ 300 ms transform), and `--fade` (150 ms opacity), and `$header-pinned-height` exists in `_sizes.scss`
- [ ] Height and background are outside those transitions, and the hidden look stays in tab order
- [ ] No new test asserts a CSS value
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm run lint` is clean for the touched files
