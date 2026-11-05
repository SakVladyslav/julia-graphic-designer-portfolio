---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-11-05"
feature_size: XS
ticket: "none"
---

# 0001 — Keep the scroll phase in Header

- **Status:** Accepted
- **Date:** 2026-11-05
- **Deciders:** Architect / Tech Lead, Site owner

## Context

The header hides, pins, and rests from the direction of travel and the end position. `Header` already owns the narrow-screen menu (`menuOpen`) and the DOM node `id="top"`. `SiteShell` already sends the window to the top on a navigation that has no hash. The phase has to live in one of those two modules, because both already touch scroll or the header, and the repo has no shared store.

## Decision drivers

- Spec §6, "Movement ignored": < 10 px in one direction. Travel adds up, and a change of direction resets that sum.
- Spec §6, "Requests added by scrolling": 0. The phase is not a server concern.
- The hold while keyboard focus is inside the header, or the narrow-screen menu is open, reads DOM and menu state that `Header` already has.
- §2: no React Context and no third-party store. A new shared store would be a second state style.

## Considered options

1. **Keep the scroll phase in Header** — `Header` listens to window scroll and keeps the phase beside `menuOpen`. A pure function next to it computes the next look.
2. **Keep the scroll phase in SiteShell** — `SiteShell` listens to scroll and passes the phase into `Header` as a prop, next to the scroll-to-top it already runs on navigation.

## Decision outcome

**Chosen:** Option 1. The hold, the menu, and the focus target are already in `Header`. No other module reads the phase. Putting it in `SiteShell` would make every page shell know the resting, hidden, and pinned looks, and the hold would still have to be asked of `Header` and passed back up.

## Consequences

**Positive**

- The direction rules sit in a pure function, testable without layout.
- `SiteShell` stays the owner of route tone and of scroll-to-top on navigation.
- No new store. This matches §2.

**Negative**

- After `SiteShell` scrolls to the top, `Header` must read the window position itself. A missed read would leave the previous page's phase on screen.
- A later feature that needs the same phase outside `Header` will have to lift this decision. Nothing in the current spec does.

**Neutral**

- Moving the phase into `SiteShell` later is a prop change, not a data migration. It is still a contract both modules would then share.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0002-fix-the-header-to-the-viewport.md]]
