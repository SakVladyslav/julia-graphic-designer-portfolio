---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-11-05"
feature_size: XS
ticket: "none"
---

# 0002 — Fix the header to the viewport

- **Status:** Accepted
- **Date:** 2026-11-05
- **Deciders:** Architect / Tech Lead, Site owner

## Context

The header is in normal flow today, and `.site-shell` sets `overflow-x: clip`. The spec says the pinned header lies over the page, and that hiding the header, bringing it back, or shortening it at the top does not move the work. A bar that still occupies flow will pull the work when it hides. A `position: fixed` bar inside the clipping shell can be clipped, or the shell can become the scrollport, so the phase would no longer follow the window.

## Decision drivers

- Spec §6, "Pinned header becoming the resting header": no height animation, and the page content does not move.
- Spec §6, "First correction after the saved view": 0 ms of slide or fade, and the page content does not move.
- Spec AC-17: hiding, pinning, and returning to rest do not move the work.
- §2: `.site-shell` already clips horizontal overflow. That clip has to keep working for wide case pages.

## Considered options

1. **Fix the header to the viewport and move the clip** — `Header` stays after the skip link in source order. It is `position: fixed` to the viewport and uses `.container`'s max-width and horizontal padding. `overflow-x: clip` moves onto a wrapper that contains the page outlet and the footer and does not contain the header.
2. **Lift the header out of the clipping shell** — render `Header` as a sibling before `.site-shell`, and leave `overflow-x: clip` on `.site-shell`.

## Decision outcome

**Chosen:** Option 1. Source order of the skip link and the header stays put, and the window stays the scrollport `Header` listens to. The clip still covers the outlet and the footer. Lifting the header out would force a second copy of the container inset and a second path for the route tone.

## Consequences

**Positive**

- Hide, pin, and the height change at the top do not change the content box.
- The scroll listener keeps reading the window, which is the same scrollport `SiteShell` already uses for scroll-to-top.
- Wide pages can still be clipped, as long as the wrapper includes the outlet and the footer.

**Negative**

- The top of every page, including the hero, sits under the resting header. Today the bar takes space in the flow, so this is a visible shift upward. It is required by the "work does not move" driver.
- The fixed header must repeat the container's max-width and horizontal padding. Missing that, the logo will not line up with the column.

**Neutral**

- Choosing option 2 later is a render-site move, not a data migration. The tone prop would have to be passed across that new boundary.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0001-keep-scroll-phase-in-header.md]]
