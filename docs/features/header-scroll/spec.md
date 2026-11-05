---
status: Draft
owner: "Site owner"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-11-05"
feature_size: XS
---

# Spec — header-scroll

> **Glossary:** [project](../../CONTEXT.md), [feature](./CONTEXT.md).
> **Reference module / docs / channels used:** `docs/_review/header-scroll.md`; `src/components/Header/Header.tsx`; `src/components/Header/Header.scss`. Architecture map read at the start of specify. Design frame [Fixed header](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=196-2798) (`196:2798`).

## 1. Context

A visitor reading a long page keeps the header in view the whole time. The bar does not step aside while they move down, and it does not return as a shorter bar when they move up, so the work and the navigation compete for the same space. The people affected are visitors of the portfolio, on every page that already shows this header.

The trigger is the owner's written review of header behavior, together with the design frame for height, divider, spacing, and colors. The header on the site today does not follow that review.

Every page keeps a single header with two looks. At the very top the visitor sees the taller resting header and no bottom divider. The resting header has no ground: the page shows through, matching the resting header in the design frame, which has no fill. Travel in one direction adds up, and a change of direction resets that sum. Moving down once that sum passes 10 px hides the header. Moving up once that sum passes 10 px, while the page is still below the top, shows the shorter pinned header with a divider and a solid ground. Reaching the very top shows the resting header even when the movement that got there is shorter than 10 px. An in-page jump or a return to the top follows the same direction and end position: the top shows the resting header with no divider, a downward move hides the header, and an upward move that ends below the top shows the pinned header with a divider. Opening the page, or restoring a place, already below the top shows the pinned header. The header stays on screen while the Visitor scrolls with keyboard focus inside it, or while the mobile menu is open. During that hold, and at the moment the hold ends, the header keeps the look it already had. The next scroll past 10 px is what changes it. When keyboard focus enters a hidden header, by Tab, by the skip link, or by programmatic focus, the header shows at once as the pinned header with a divider and a solid ground. A visitor whose system asks for less motion gets that same reveal as a fade of 150 ms. The very top still shows the resting header. A jump started from the header follows that jump's end position, even if focus is still inside the header. Show and hide slide for a visitor whose system does not ask for less motion. A visitor whose system asks for less motion gets the same show and hide as a short fade of 150 ms, not a slide. A new move past 10 px in the other direction, while the header is still moving, sends it toward the new state without finishing the move it had started. Gesture rules come from the written review; height, divider thickness, spacing, and colors come from the design frame. The pinned header lies over the page and does not push the content down. The resting header is seen at the top of the page. Hiding the header, bringing it back, or shortening it does not move the work. When the pinned header becomes the resting header at the very top, the bar changes height and loses its solid ground. That height change is not animated, and the work does not move.

The saved page, the one prepared before any browser has a scroll position, shows the resting header. Scroll show and hide run only after the page is interactive in the browser. That first correction does not move the page content and does not play the slide or the fade. An in-page target reached while the pinned header is visible stays fully visible below that bar, offset by the pinned header's height.

The header's marks, and the pinned header's ground and divider, stay the opening tone that page declares once. The header does not read the painted background, and it does not change tone in a later section.

| Page                                     | Route                                                                                                                    | Opening tone | Declared by                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------ | ----------------------------------------------------------------------------- |
| Home                                     | `/`                                                                                                                      | light        | the index route; the shell passes the header's default tone prop              |
| Published case                           | `/projects/lovespace`, `/projects/molfaria`, `/projects/amaryllis`, `/projects/bbg`, `/projects/olx`, `/projects/novyny` | dark         | a published-case route; the shell passes the header's inverse tone prop       |
| Any other path, including a missing page | any path that is not the home and not a published case                                                                   | light        | the same declaration as home; the shell passes the header's default tone prop |

A light opening tone uses dark marks. Its pinned header has a light solid ground and a dark divider. A dark opening tone uses light marks. Its pinned header has a dark solid ground and a light divider. In the design frame the light pinned ground is the page's light surface and the dark pinned ground is the page's dark surface; both pinned bars carry a solid fill and a bottom divider, and both resting bars carry no fill. The resting header stays transparent on every row of this table.

The behavior text is the owner's review in `docs/_review/header-scroll.md`. The current header, read from `src/components/Header/Header.tsx` and `src/components/Header/Header.scss`, already carries the logo and the primary navigation. On a narrow screen the navigation sits behind an open and close control; the menu closes when the visitor presses Escape, presses outside the header, or chooses a navigation item. The same header already uses a light or dark set of marks to match the page, and its ground is clear, so the page shows through. It does not hide, pin, or draw a divider. This change adds the hide and the pin, the divider, and a solid ground on the pinned header only, taken from the opening tone the route declares, so a pinned header lying over a later section does not pick up that section's color. No outside sites could be compared in this run.

## 2. Goals

- A visitor can move the header off the screen while traveling down a page, and bring the pinned header back by traveling up.
- At the top of a page the visitor sees the resting header, with no divider and no solid ground, including on a page that does not scroll.
- For the whole page, the header's marks and the pinned header's ground stay the opening tone that page's route declares.
- A visitor whose system asks for less motion still gets the same show and hide, through a 150 ms fade.
- An in-page target stays fully visible below the pinned header.
- Opening a page already below the top shows the pinned header. The saved first view shows the resting header, and applying the browser's position does not move the page.
- Keyboard focus that enters a hidden header, by Tab, by the skip link, or by programmatic focus, shows the pinned header at once, or by a 150 ms fade when the system asks for less motion.
- Hiding the header, bringing the pinned header back, or returning to the resting header does not move the work. The change from the pinned header to the resting header at the top changes height and ground without animating the height.

## 3. Non-goals

- Recoloring the header from later sections, such as more projects, contacts, or the footer. The route declares the opening tone once.
- Playing the slide for a visitor whose system asks for less motion. That visitor gets a 150 ms fade. The header still hides and returns.
- Leaving the header hidden when the page opens already below the top. That arrival shows the pinned header.
- Leaving the header hidden when keyboard focus enters it. That entry shows the pinned header.
- Animating the header's height when the pinned header becomes the resting header at the very top. The height and the ground change, and the work does not move.
- Giving the resting header a solid ground. In the design frame the resting header has no fill, and the page shows through. The solid ground belongs to the pinned header only.
- Changing the logo, the primary links, or how the narrow-screen menu opens and closes. This change only decides when that header is shown and which look it uses.

## 4. User stories

### US-01: Hide while moving down

**As a** Visitor
**I want** the header to leave the screen when I move down the page past 10 px
**So that** the work is not covered while I read downward

### US-02: Bring the pinned header back

**As a** Visitor
**I want** the shorter pinned header with a divider when I move up while the page is below the top
**So that** I can reach navigation without returning to the very top

### US-03: Rest at the top

**As a** Visitor
**I want** the taller resting header with no divider and no solid ground when the page is at the very top, including a page that does not scroll, and when I arrive there from the pinned header I want the height and the ground to change without the height animating
**So that** the opening of the page matches the original header and the work stays put

### US-04: Stay while in use

**As a** Visitor
**I want** the header to stay visible while keyboard focus is inside it or the narrow-screen menu is open, and to show at once as the pinned header with a divider when focus enters it while it is hidden
**So that** I can finish choosing a destination

### US-05: Keep the opening tone

**As a** Visitor
**I want** the header's marks and the pinned header's ground to stay the opening tone declared for this page
**So that** later sections do not restyle the bar

### US-06: Jumps match the move

**As a** Visitor
**I want** an in-page jump or a return to the top to leave the header in the state that matches the direction and the end position
**So that** the bar is not stuck in the state from before the jump

### US-07: Less motion fades

**As a** Visitor
**I want** a short fade instead of a slide when my system asks for less motion
**So that** the header still hides and returns without a large movement

### US-08: Anchors stay clear

**As a** Visitor
**I want** an in-page target to sit fully below the pinned header
**So that** the bar does not cover the place I jumped to

### US-09: Open below the top

**As a** Visitor
**I want** the pinned header when the page opens already below the top, and the resting header on the saved first view
**So that** navigation is there on arrival, and the page does not jump when the browser applies that position

## 5. Acceptance criteria

### AC-01 (US-01) — happy path

**Given** a Visitor is on a page that can scroll, the narrow-screen menu is closed, keyboard focus is not inside the header, and the system does not ask for less motion
**When** the Visitor moves down past 10 px
**Then** the header slides off the screen and no longer covers the work

### AC-02 (US-02) — happy path

**Given** a Visitor is on a page below the top, the narrow-screen menu is closed, keyboard focus is not inside the header, and the system does not ask for less motion
**When** the Visitor moves up past 10 px
**Then** the Visitor sees the pinned header with a divider and a solid ground in that page's opening tone

### AC-03 (US-03) — happy path

**Given** a Visitor is on a page at the very top, including a page that does not scroll
**When** the page is shown
**Then** the Visitor sees the resting header, no divider, and no solid ground, so the page shows through

### AC-04 (US-04) — happy path

**Given** keyboard focus is inside the header, or the narrow-screen menu is open, and the page is below the top
**When** the Visitor scrolls, and this is a scroll rather than a jump started from the header
**Then** the header stays visible in the look it already had, and that scroll does not hide it or switch its look

### AC-05 (US-06) — happy path

**Given** the Visitor jumps within the page or returns to the top, including a jump started from inside the header
**When** the jump ends
**Then** an ending at the top shows the resting header with no divider and no solid ground, a downward jump past 10 px hides the header, and an upward jump that ends below the top shows the pinned header with a divider and a solid ground, even if focus is still inside the header

### AC-06 (US-01) — error

**Given** the header is resting or pinned, and the movement does not leave the page at the very top
**When** the running distance in the current direction is still under 10 px
**Then** the header stays in that same state, which shows the Visitor that the movement was too small to count as a direction change. A change of direction resets that distance to the new direction's travel

### AC-07 (US-02) — authorization

**Given** a Visitor who reads the page and does not prepare it
**When** the Visitor moves up while the page is below the top
**Then** the Visitor sees the same pinned header and the same primary navigation as any other Visitor, and the page does not withhold the header

### AC-08 (US-03) — domain invariant

**Given** the page is at the very top, including when a movement shorter than 10 px is what brought it there
**When** the header is shown
**Then** the Visitor sees the resting header and no divider, because the resting header never carries the divider or a solid ground, and the very top overrides the 10 px rule. When that resting header replaces the pinned header, the bar's height and its ground change, the height does not animate, and the work stays where it was

### AC-09 (US-05) — cross-context

**Given** a page whose route declares a dark opening tone, or a page whose route declares a light opening tone, as in the table in §1
**When** the Visitor moves into a later section whose background is the opposite tone, including more projects, contacts, or the footer
**Then** the header keeps the marks of the declared opening tone, the pinned header keeps that tone's solid ground, and the divider keeps the contrasting tone: a light divider on a dark pinned header, a dark divider on a light pinned header

### AC-10 (US-07) — happy path

**Given** the Visitor's system asks for less motion, the narrow-screen menu is closed, and keyboard focus is not inside the header
**When** the Visitor moves down or up past 10 px
**Then** the header reaches the same hidden, pinned, or resting result as it would for any other Visitor, and it gets there by a fade of 150 ms rather than a slide

### AC-11 (US-08) — domain invariant

**Given** the pinned header is visible
**When** the Visitor follows an in-page link to a target on the same page
**Then** the target is fully visible below the pinned header, offset by that bar's height (`scroll-margin-top` equal to the pinned header's height), so the target is not hidden under the bar

### AC-12 (US-09) — happy path

**Given** a page has been saved for a first view, before any browser has a scroll position
**When** that saved view is shown
**Then** the Visitor sees the resting header, no divider, and no solid ground

### AC-13 (US-09) — happy path

**Given** the saved view showed the resting header, and the browser's position is already below the top, including a restored place or an address that opens below the top
**When** the page becomes interactive
**Then** the Visitor sees the pinned header with a divider and a solid ground, the page content stays where it was, and the header does not play the slide or the fade

### AC-14 (US-09) — domain invariant

**Given** the saved view showed the resting header, and the browser's position is the very top
**When** the page becomes interactive
**Then** the Visitor still sees the resting header with no divider and no solid ground, and the page content does not move

### AC-15 (US-04) — domain invariant

**Given** the header was held visible, focus has left the header, and the narrow-screen menu is closed
**When** that is the moment both holds end, before any new scroll, and the page is below the top
**Then** the header stays in that same visible look until the Visitor next scrolls past 10 px

### AC-16 (US-01) — error

**Given** the header is still moving toward hidden, pinned, or resting
**When** the Visitor moves past 10 px in the other direction
**Then** the header heads for the state that matches the new direction, and it does not finish the move it had started

### AC-17 (US-01) — domain invariant

**Given** a Visitor is reading a page
**When** the header hides, returns as the pinned header, or returns as the resting header
**Then** the work stays where it was. The header does not pull the work up and does not push it down. When the pinned header becomes the resting header at the very top, the bar changes height and loses its solid ground, and that height change is not animated

### AC-18 (US-04) — happy path

**Given** the header is hidden, the page is below the top, and keyboard focus is outside the header
**When** keyboard focus enters the header by Tab, by the skip link, or by programmatic focus
**Then** the header shows at once as the pinned header with a divider and a solid ground in that page's opening tone. When the Visitor's system asks for less motion, the same pinned header appears by a fade of 150 ms

## 6. Non-functional requirements

| Aspect                                                                               | Target                                                         | Measurement                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header settles after a qualifying move, when the system does not ask for less motion | ≤ 300 ms                                                       | time from the latest move past 10 px until the header is fully hidden, fully pinned, or fully resting, observed on the page. A new qualifying move in the other direction starts this clock again                 |
| Reduced-motion fade                                                                  | 150 ms                                                         | time from the latest move past 10 px until the header is fully hidden, fully pinned, or fully resting, when the system asks for less motion. A new qualifying move in the other direction starts this clock again |
| Focus entering a hidden header                                                       | at once, or a 150 ms fade when the system asks for less motion | time from Tab, the skip link, or programmatic focus entering the hidden header until the pinned header with a divider is fully shown. This reveal does not use the scroll slide                                   |
| Pinned header becoming the resting header                                            | no height animation                                            | when the page reaches the very top, the height and the ground change together, the height does not animate, and the page content does not move                                                                    |
| First correction after the saved view                                                | 0 ms of slide or fade                                          | the header matches the browser's position without playing the slide or the fade, and the page content does not move, observed when the page becomes interactive                                                   |
| Movement ignored                                                                     | < 10 px in one direction                                       | travel in one direction adds up, and a change of direction resets that sum. The header state does not change until the sum reaches 10 px, unless the page reaches the very top                                    |
| Opening-tone changes on one page                                                     | 0                                                              | the opening tone is the one the route declares, and it does not change while the Visitor moves through later sections                                                                                             |
| Requests added by scrolling                                                          | 0                                                              | moving the page does not send a request                                                                                                                                                                           |

## 6.1 Security / privacy

- **Data classification:** public. The header shows the same logo and primary navigation to every Visitor, and the page is already public.
- **Personal data touched:** none. The header does not collect a name, a message, or a preference.
- **AuthZ/AuthN impact:** none. Every Visitor sees the same header rules. Preparing the pages is not a permission checked while reading.
- **Abuse cases:**
  - A Visitor who does not prepare the pages still sees the header. Nothing is withheld, because there is no private area in the header.
  - The header holds no draft and no private page. There is nothing extra to hide.
  - The header has no text field, so there is no injected text to show.
  - Repeated scrolling creates no record and no message, so there is no flood to limit.
- **Security review:** N/A. No new permission boundary and no personal data.

## 7. Metrics / KPIs

- **Qualifying downward scrolls that leave the header visible** — baseline: all of them, because the header never hides today; target: none, in the release that ships this behavior. A scroll does not count while keyboard focus is inside the header or the narrow-screen menu is open. A jump does count.
- **Resting-header views that show a divider or a solid ground** — baseline: not ruled today; target: none, in that same release.
- **Mid-page header recolors** — baseline: none, because the header color does not follow later sections today; target: none, in that same release.
- **Arrivals already below the top that leave the header hidden** — baseline: all of them, because the header never pins today; target: none, in that same release.
- **In-page targets hidden under the pinned header** — baseline: not ruled today; target: none, in that same release.

## 8. Open questions

<!-- N/A: the owner's clarify answers are written above. An arrival below the top shows the pinned header; it is not an open question. -->

## Test plan

A visitor can hide the header while moving down, bring the pinned header back while moving up, and see the resting header at the very top. The opening tone stays the one the route declares, and the work does not move.

### Levels

| Level             | Scope                                                                                                                  | Strategy (generic — no tool names)                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Unit              | The phase rule: look and motion from travel, position, holds, and the motion preference. No page.                      | In memory. Each call gets its own inputs.                                                       |
| Component         | The header rendered alone: looks, holds, tone, the in-page offset, and the work staying put.                           | Render the header in a component harness. Assert the look and the behaviour. No full site boot. |
| E2E-through-UI    | The three spine flows: hide, pin, and rest.                                                                            | The visitor's path through the rendered page. Reset the scroll position after each test.        |
| Integration       | The header owns no store, cache, or queue.                                                                             | <!-- N/A: no owned dependency -->                                                               |
| Contract          | No API or event schema between two sides.                                                                              | <!-- N/A: no boundary between two participants -->                                              |
| E2E               | No service entry point. The page flows are E2E-through-UI.                                                             | <!-- N/A: no service entry point -->                                                            |
| Load              | §6 numbers are motion timings, not a request rate.                                                                     | <!-- N/A: no numeric NFR -->                                                                    |
| Visual-regression | Looks are checked against the design frames by eye. Tests name the look and the motion. They do not diff a screenshot. | <!-- N/A: no screenshot diff -->                                                                |

### AC coverage

| AC (spec.md §5) | Test name (intent-based)                                       | Level                             | Expected outcome                                                                                        |
| --------------- | -------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| AC-01           | downward travel past the threshold hides the header            | unit + component + e2e-through-UI | The header is hidden by a slide, and the work stays put.                                                |
| AC-02           | upward travel past the threshold shows the pinned header       | unit + component + e2e-through-UI | The pinned header shows a divider and a solid ground in the opening tone.                               |
| AC-03           | a page at the top shows the resting header                     | unit + component + e2e-through-UI | The resting header has no divider and no solid ground, including a page that does not scroll.           |
| AC-04           | a scroll while the header is in use keeps the current look     | unit + component                  | Focus inside the header, or an open narrow-screen menu, blocks a hide and a look switch.                |
| AC-05           | a jump lands on the look that matches its end                  | unit + component                  | The top rests, a downward jump hides, an upward jump below the top pins, even if focus is still inside. |
| AC-06           | travel under the threshold does not change the look            | unit                              | The look stays. A direction change resets the running distance.                                         |
| AC-07           | a reader sees the same pinned header as any visitor            | component                         | The same pinned header and the same primary navigation. Nothing is withheld.                            |
| AC-08           | the very top shows the resting header even under the threshold | unit                              | The look is resting. The height change is not a slide.                                                  |
| AC-09           | a later section does not change the opening tone               | component                         | Marks, pinned ground, and divider stay the tone the route declared.                                     |
| AC-10           | less motion fades to the same look                             | unit                              | The same hidden, pinned, or resting result, reached by a fade.                                          |
| AC-11           | an in-page target sits clear of the pinned header              | component                         | The target is marked to clear the pinned header by that bar's height.                                   |
| AC-12           | the saved first view shows the resting header                  | component                         | Resting header, no divider, no solid ground, before a browser position exists.                          |
| AC-13           | an arrival below the top pins with no motion                   | unit + component                  | Pinned header, no slide and no fade, page content stays.                                                |
| AC-14           | an arrival at the top stays resting with no motion             | unit                              | Resting header, no slide and no fade, page content stays.                                               |
| AC-15           | the header stays visible after both holds end                  | unit                              | The same visible look until the next travel past the threshold.                                         |
| AC-16           | a qualifying reverse drops the unfinished move                 | unit                              | The header heads for the new direction and does not finish the move it had started.                     |
| AC-17           | hiding, pinning, or resting does not move the work             | component                         | The work stays where it was. The height change at the top is not animated.                              |
| AC-18           | focus entering a hidden header shows the pinned header         | unit + component                  | The pinned header shows at once, or by a fade when the system asks for less motion.                     |

### Edge cases / error paths

AC-06, AC-07, and AC-16 keep their own rows in the coverage table.

- Travel of 9 px, then another 9 px in the same direction → the second step changes the look. The first step leaves it unchanged.
- A change of direction before the threshold → the running distance resets. The look stays until the new direction reaches the threshold.
- Travel of exactly the threshold → the look changes.
- A jump shorter than the threshold that ends below the top → the look stays.
- Focus enters a hidden header while the page is at the very top → the resting header, not the pinned header.
- The first correction after the saved view, while the system asks for less motion → no fade. Below the top the header is pinned. At the top it stays resting.
- The narrow-screen menu is open while the system asks for less motion → the header does not hide and does not switch look.
- A position just below the top is not the top → the resting rule waits until the page is at the very top.
- An in-page jump that ends hidden or at the top → the pinned-header offset is not what places that landing.
- No outside dependency → scrolling adds no request. There is nothing to fail open or fail closed.

### Test data

- Seed strategy: in-memory fixtures for position, travel in the current direction, scroll versus jump, focus inside the header, the narrow-screen menu, the motion preference, and the route's opening tone. There is no data model and no stored entity.
- Integration dependency: none. The header owns no store, cache, or queue, so there is no throwaway container and nothing is mocked.
- Cleanup boundary: per-test. Each test supplies its own fixture. A component render is discarded at the end of the test. An e2e-through-UI test returns the page to the top and clears focus before the next test.

### NFR validation (load)

<!-- N/A: no numeric NFR -->

§6 records motion timings and that scrolling adds no request. The AC rows cover those timings by asserting the look and the motion name. There is no request rate to sustain, so this section adds no load scenario.

### CI placement

- On every PR: unit and component.
- On a schedule or before a release: e2e-through-UI.
- Load and contract are not scheduled. This plan has neither.
