---
id: T10
title: "Offset in-page targets by the pinned header height"
layer: "ui"
deps: ["T7"]
blocks: []
acs: ["AC-11"]
files_hint:
  - "src/pages/home/LandingPage.scss"
  - "src/components/Contacts/Contacts.scss"
owner: "Tech Lead"
estimate: "S"
context_budget: "M"
status: "todo"
step: ""
---

# T10 — Offset in-page targets by the pinned header height

## Place in the sequence

- **Blocked by:** T7 — Paint resting, pinned, and hidden looks · **Blocks:** none · **Wave:** 3. The pinned-height token exists. This lane does not touch `Header.scss` or `Header.tsx`, so it runs beside T3–T5 and beside T8.
- **Lane:** own lane. `LandingPage.scss` and `Contacts.scss` only.

## Why (user story)

> **As a** Visitor
> **I want** an in-page target to sit fully below the pinned header
> **So that** the bar does not cover the place I jumped to
>
> — `spec.md §4, US-08, verbatim` · full text: [spec.md](../spec.md)

This task points the two existing anchors at the pinned-height token.

## Inlined context

> An in-page target reached while the pinned header is visible stays fully visible below that bar, offset by the pinned header's height.
>
> — `spec.md §1, committed approach, abridged` · full text: [spec.md](../spec.md)

> Landing and contacts anchors already set `scroll-margin-top`. They consume the new token instead of `16px` and `5.5rem`.
>
> — `sad.md §5, building block, verbatim` · full text: [sad.md](../sad.md)

> Anchor offsets disagree today: projects use 16px and contacts use 5.5rem. Both become `scroll-margin-top` of the pinned-height token.
>
> — `sad.md §11, Risks, abridged` · full text: [sad.md](../sad.md)

> **Hard rule:** Use the token from `src/styles/_sizes.scss`. Do not leave a raw `16px` or `5.5rem` on these two anchors. A pure CSS change does not get a test that asserts a CSS value.
>
> — `sad.md §2, Conventions, abridged` · `sad.md §11, Risks, abridged` · full text: [sad.md](../sad.md)

### SCR-06 — In-page target under a pinned header

> **default** — The pinned header is visible and the visitor follows an in-page link whose jump ends still pinned (AC-11). The target is fully visible below the bar. The offset is `scroll-margin-top` equal to the pinned header's height. Components: SiteShell, SkipLink, Header, Logo, SiteNav, ProjectCard.
>
> — `screens.md §SCR-06, default, abridged` · full text: [screens.md](../screens.md)

**Fallback:** if a slice is insufficient or the code contradicts it, read the named file and follow that. Do not guess. [spec.md](../spec.md) · [sad.md](../sad.md) · [screens.md](../screens.md)

## Data delta

No DB changes.

## API contract

Internal — no API surface.

## Acceptance criteria

### AC-11 — domain invariant

> **Given** the pinned header is visible
> **When** the Visitor follows an in-page link to a target on the same page
> **Then** the target is fully visible below the pinned header, offset by that bar's height (`scroll-margin-top` equal to the pinned header's height), so the target is not hidden under the bar
>
> — `spec.md §5, AC-11, verbatim` · full text: [spec.md](../spec.md)

## Checklist

- [ ] In `src/pages/home/LandingPage.scss`, set `.home-projects` `scroll-margin-top` to `$header-pinned-height`. `@use` sizes if that file does not already. Keep the existing `@use` order.
- [ ] In `src/components/Contacts/Contacts.scss`, set `.contacts` `scroll-margin-top` to the same token. The file already uses sizes.
- [ ] Do not add a new anchor, a new component, or a spacer in the page.
- [ ] No new test. Do not assert the computed margin.

## Edge cases

| Case                           | Behaviour                                                         |
| ------------------------------ | ----------------------------------------------------------------- |
| Jump ends hidden or at the top | SCR-02 or SCR-01. This offset is for a landing that stays pinned. |
| Projects anchor                | Uses the token, not `$space-16`.                                  |
| Contacts anchor                | Uses the token, not `5.5rem`.                                     |

— `screens.md §SCR-06, other-landing, abridged` · `sad.md §11, Risks, abridged` · full text: [screens.md](../screens.md)

## Definition of Done

- [ ] `.home-projects` and `.contacts` set `scroll-margin-top` to `$header-pinned-height`
- [ ] No new test asserts a CSS value
- [ ] Every Hard Rule inlined above still holds
- [ ] `npm run lint` is clean for the touched files
