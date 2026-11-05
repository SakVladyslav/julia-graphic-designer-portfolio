---
status: draft
feature_size: XS
updated_at: "2026-11-05"
---

# UX flows — header-scroll

> User flows for every UI-touching §4 user story, produced by `ux-flows` (after `clarify`, before
> `design`) and read by `design` (evidence for the target-surface + UI-architecture decisions),
> `sequences` (UI-driven flows align on SCR ids), `screens` (details every inventory row) and
> `plan-tests` (the e2e-through-UI paths). **Always markdown + mermaid `flowchart`**, whatever the
> design tool — this artifact is flow-altitude, not visual design.

## Platform decisions

- **Posture:** desktop-first — per `docs/design-system.md`. No deviation. The narrow-screen menu hold is a specified behavior on the same page, not a second posture and not a phone-first layout.
- The header is chrome on the page the visitor is already reading. These flows do not add a route, a dialog, or a wizard.
- Show, hide, pin, and rest are states of that same page. Reaching one does not move the work.
- Flagged for `design`, not decided here: how the slide and the 150 ms fade are built, how the in-page target is offset by the pinned header's height, and how the first correction after the saved view applies with no motion. The visitor-visible results are already fixed by the spec.

## Screen inventory

| ID     | Screen                                | Purpose                                                                                                                                                    | Entry                                                                                                                                                                            | Exit                                                                                                                               |
| ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| SCR-01 | Page at the top                       | Taller resting header, no divider, no solid ground, including a page that does not scroll                                                                  | Open at the top, return to the top, or a move that arrives at the top. Arrival from the pinned header changes height and ground with no height animation, and the work stays put | Down past 10 px to SCR-02, or stay while the page does not scroll                                                                  |
| SCR-02 | Page below the top, header hidden     | Header off screen so the work is not covered                                                                                                               | Down past 10 px from SCR-01 or SCR-03, or a downward jump past 10 px                                                                                                             | Up past 10 px to SCR-03, on to the top at SCR-01, or keyboard focus entering the header to SCR-04                                  |
| SCR-03 | Page below the top, header pinned     | Shorter header with a divider and a solid ground in the page's opening tone                                                                                | Up past 10 px while still below the top, an upward jump that ends below the top, or arrival already below the top                                                                | Down past 10 px to SCR-02, or to the top at SCR-01, where height and ground change with no height animation and the work stays put |
| SCR-04 | Page with focus held in the header    | Keyboard focus inside the header. A visible header keeps the look it already had. Focus that enters a hidden header shows the pinned header with a divider | Tab, the skip link, or programmatic focus. From a hidden header this entry shows the pinned header at once, or by a 150 ms fade when the system asks for less motion             | Focus leaves, a jump started from the header, or the page reaches the top                                                          |
| SCR-05 | Page with the narrow-screen menu open | Header stays on screen in the look it already had while that menu is open                                                                                  | Visitor opens the narrow-screen menu                                                                                                                                             | Menu closes, or the page reaches the top                                                                                           |
| SCR-06 | In-page target under a pinned header  | The place an in-page link lands, fully visible below the pinned header                                                                                     | In-page link while SCR-03 is visible and the jump ends still pinned                                                                                                              | Further scroll uses SCR-02, SCR-03, or SCR-01                                                                                      |
| SCR-07 | Saved first view                      | Prepared page before any browser has a scroll position; resting header                                                                                     | The saved page is shown                                                                                                                                                          | The page becomes interactive and resolves to SCR-01 or SCR-03                                                                      |
| SCR-08 | Later section                         | A section farther down the same page whose background may be the opposite tone                                                                             | Visitor moves into that section                                                                                                                                                  | Header marks, pinned ground, and divider stay the opening tone on SCR-01, SCR-02, or SCR-03                                        |

## Flows

No §4 user story is backend-only. US-01 through US-09 all touch the header the visitor sees, so each has a flow.

### Flow: US-01 — Hide while moving down

```mermaid
flowchart TD
    ready["SCR-01 or SCR-03 Menu closed, focus outside the header, motion allowed"] --> down["Visitor moves down"]
    down --> tally{"Distance in the current direction"}
    tally -->|"direction changes"| reset["Sum resets and counts the new direction"]
    reset --> tally
    tally -->|"still under 10 px"| stay["Header keeps the look it had"]
    tally -->|"reaches 10 px"| hidden["SCR-02 Header slides off, work stays put"]
    hidden --> interrupt{"Still moving, and a new qualifying move arrives"}
    interrupt -->|"down past 10 px"| towardHidden["SCR-02 Heads toward hidden, unfinished move dropped"]
    interrupt -->|"up past 10 px, page stays below the top"| towardPinned["SCR-03 Heads toward pinned, unfinished move dropped"]
    interrupt -->|"page reaches the top"| towardRest["SCR-01 Heads toward resting, see US-03"]
    interrupt -->|"no new qualifying move"| settled["Header finishes hidden, work stays put"]
```

Start: the page can scroll, the narrow-screen menu is closed, keyboard focus is outside the header, and the system does not ask for less motion. The visitor sees the resting header on SCR-01 or the pinned header on SCR-03. Action: the visitor moves down. End: travel in one direction adds up, and a change of direction resets that sum. Under 10 px, the header stays in the look it had, on SCR-01 or SCR-03. At 10 px the header slides off to SCR-02 and the work does not move. If a new move past 10 px the other way arrives while the header is still moving, it heads for hidden, pinned, or resting to match that new direction and end position, and it does not finish the move it had started. The same retarget applies when the header was moving toward pinned or resting. The very top still ends on the resting header. When that end replaces a pinned header, the height and the ground change with no height animation, and the work stays put, as in US-03.

### Flow: US-02 — Bring the pinned header back

```mermaid
flowchart TD
    below["SCR-02 Page below the top, header hidden"] --> up["Visitor moves up"]
    up --> tally{"Distance upward, and where the page is"}
    tally -->|"still under 10 px, page stays below the top"| stay["SCR-02 Header stays hidden"]
    tally -->|"reaches 10 px, page stays below the top"| pin["SCR-03 Pinned header, divider, solid ground"]
    pin --> reader{"Is this visitor only reading the page?"}
    reader -->|"yes"| same["Same pinned header and same primary navigation"]
    reader -->|"no, they prepare pages"| same
    tally -->|"the page reaches the top"| rest["SCR-01 Resting header, see US-03"]
```

Start: the page is below the top and the header is hidden on SCR-02. The menu is closed, focus is outside the header, and the system does not ask for less motion. Action: the visitor moves up. End: under 10 px, while the page stays below the top, the header stays hidden. At 10 px, still below the top, the visitor sees the pinned header on SCR-03, with a divider and a solid ground in that page's opening tone, and the work does not move. A visitor who only reads the page sees that same pinned header and the same primary navigation as any other visitor. If the upward move reaches the very top, the end state is the resting header on SCR-01, including when the last bit of travel is shorter than 10 px. When the header was pinned before that arrival, the height and the ground change with no height animation, and the work stays put, as in US-03.

### Flow: US-03 — Rest at the top

```mermaid
flowchart TD
    shown["Page is shown"] --> where{"Is the page at the very top?"}
    where -->|"yes, including a page that does not scroll"| rest["SCR-01 Resting header, no divider, no solid ground"]
    where -->|"the pinned header arrived, including under 10 px"| snap["SCR-01 Height and ground change, height does not animate, work stays put"]
    where -->|"the page is below the top"| other["SCR-02 or SCR-03 See US-01 and US-02"]
```

Start: a page is shown. One start is already the resting header, including a page that does not scroll. The other start is the pinned header on SCR-03, shorter, with a divider and a solid ground. Action: the page is at the very top, including when a move shorter than 10 px is what brought it there. End: the visitor sees the resting header on SCR-01, with no divider and no solid ground, so the page shows through. The top overrides the 10 px rule. When this end replaces the pinned header, the bar becomes the taller resting height and loses its solid ground. That height change is not animated. The work stays where it was. Below the top, this flow does not apply: the header is hidden or pinned.

### Flow: US-04 — Stay while in use

```mermaid
flowchart TD
    hidden["SCR-02 Header hidden, page below the top"] --> how{"Focus enters by Tab, skip link, or programmatic focus"}
    how -->|"system does not ask for less motion"| reveal["SCR-04 Pinned header with a divider shows at once"]
    how -->|"system asks for less motion"| fade["SCR-04 Same pinned header by a 150 ms fade"]
    reveal --> held["SCR-04 or SCR-05 Focus is inside, or the narrow menu is open"]
    fade --> held
    visible["Header already visible below the top"] --> held
    held --> kind{"What the visitor does while the page is below the top"}
    kind -->|"scrolls, not a jump from the header"| keep["Header stays visible in the look it already had"]
    kind -->|"scrolls until the page is at the top"| top["SCR-01 Height and ground change, height does not animate, work stays put"]
    kind -->|"starts a jump from the header"| jump["See US-06, even if focus remains inside"]
    keep --> release{"Focus has left and the menu has closed, before any new scroll"}
    release -->|"yes, page still below the top"| same["Same visible look until the next scroll past 10 px"]
    release -->|"a new scroll past 10 px"| change["SCR-02 or SCR-03 See US-01 and US-02"]
```

Start: either the header is hidden on SCR-02, below the top, or it is already visible below the top with keyboard focus inside it on SCR-04 or with the narrow-screen menu open on SCR-05. Action, from hidden: keyboard focus enters the header by Tab, by the skip link, or by programmatic focus. End of that entry: the header shows as the pinned header with a divider and a solid ground in the page's opening tone, and the visitor is on SCR-04. When the system does not ask for less motion, that pinned header shows at once. When the system asks for less motion, the same pinned header appears by a fade of 150 ms. Action, once focus is inside or the menu is open: the visitor scrolls, and this is a scroll rather than a jump started from the header. End: the header stays visible in the look it already had. That scroll does not hide it and does not switch its look. If that scroll reaches the very top, the pinned header becomes the resting header on SCR-01: the height and the ground change, the height does not animate, and the work stays put. A jump started from the header does not use this hold: it follows US-06 even when focus is still inside the header. When focus has left and the menu is closed, at that moment and before any new scroll, the header keeps the same visible look while the page stays below the top. The next scroll past 10 px is what changes it.

### Flow: US-05 — Keep the opening tone

```mermaid
flowchart TD
    declared["Page whose route declared a light or a dark opening tone"] --> later["SCR-08 Visitor moves into a later section with the opposite background"]
    later --> keep["Marks, pinned ground, and divider stay the opening tone"]
```

Start: the visitor is on a page whose route declared one opening tone, light or dark, as in the spec table. Action: the visitor moves into a later section whose background is the opposite tone, including more projects, contacts, or the footer. End: on SCR-08 the header keeps the marks of the declared opening tone, the pinned header keeps that tone's solid ground, and the divider keeps the contrasting tone. The header does not take the later section's background.

### Flow: US-06 — Jumps match the move

```mermaid
flowchart TD
    from["Any current look, including focus still inside the header"] --> jump["Visitor jumps within the page or returns to the top"]
    jump --> endpos{"Direction and end position"}
    endpos -->|"ends at the top"| rest["SCR-01 Resting header, no divider, no solid ground"]
    endpos -->|"downward past 10 px"| hide["SCR-02 Header hidden"]
    endpos -->|"upward, ends below the top"| pin["SCR-03 Pinned header, divider, solid ground"]
    endpos -->|"travel still under 10 px, and not at the top"| stay["Header keeps the look from before the jump"]
```

Start: the header is in whatever look it had, and the jump may start from inside the header while focus stays there. Action: the visitor jumps within the page or returns to the top. End: an ending at the top shows the resting header on SCR-01, with no divider and no solid ground. When that ending replaces a pinned header, the height and the ground change with no height animation, and the work stays put, as in US-03. A downward jump past 10 px hides the header on SCR-02. An upward jump that ends below the top shows the pinned header on SCR-03, with a divider and a solid ground. A jump whose travel in that direction is still under 10 px, and which does not reach the top, leaves the header in the look it had before the jump. Focus still inside the header does not block these endings.

### Flow: US-07 — Less motion fades

```mermaid
flowchart TD
    rm["System asks for less motion, menu closed, focus outside the header"] --> move["Visitor moves down or up past 10 px"]
    move --> result{"End position"}
    result -->|"down, page stays below the top"| hide["SCR-02 Hidden, by a 150 ms fade"]
    result -->|"up, page stays below the top"| pin["SCR-03 Pinned, by a 150 ms fade"]
    result -->|"page reaches the top"| rest["SCR-01 Resting, by a 150 ms fade"]
    result -->|"another qualifying move while the fade is still running"| retarget["Heads for the new state, unfinished fade dropped"]
```

Start: the visitor's system asks for less motion, the narrow-screen menu is closed, and keyboard focus is outside the header. Action: the visitor moves down or up past 10 px. End: the header reaches the same hidden, pinned, or resting result as it would for any other visitor, on SCR-02, SCR-03, or SCR-01, and it gets there by a fade of 150 ms rather than a slide. When that resting result replaces a pinned header, the height still does not animate. The fade is the change of look, not an animation of the height, and the work stays put. A new move past 10 px the other way, while that fade is still running, sends the header toward the new state and does not finish the fade it had started. While focus is inside the header or the narrow-screen menu is open, US-04 applies instead, and this fade does not hide the header.

### Flow: US-08 — Anchors stay clear

```mermaid
flowchart TD
    pin["SCR-03 Pinned header is visible"] --> link["Visitor follows an in-page link"]
    link --> landing{"Header look when the jump ends"}
    landing -->|"still pinned"| clear["SCR-06 Target fully visible below the pinned header"]
    landing -->|"hidden or resting"| other["SCR-02 or SCR-01 See US-06"]
```

Start: the pinned header is visible on SCR-03. Action: the visitor follows an in-page link to a target on the same page. End: when the jump ends with the pinned header still visible, the target on SCR-06 is fully visible below that bar, offset by the pinned header's height, so the bar does not cover it. When the jump ends hidden or at the top, the header look comes from US-06, and this offset is not the thing keeping a pinned bar off the target.

### Flow: US-09 — Open below the top

```mermaid
flowchart TD
    saved["SCR-07 Saved first view shows the resting header"] --> live{"Browser position when the page becomes interactive"}
    live -->|"below the top, including back, restore, or an address that opens there"| pin["SCR-03 Pinned header, no slide, no fade, content stays"]
    live -->|"the very top"| rest["SCR-01 Resting header, content stays"]
```

Start: the saved first view is shown on SCR-07, before any browser has a scroll position, and the visitor sees the resting header, with no divider and no solid ground. Action: the page becomes interactive and the browser's position is applied. End: if that position is already below the top, including a restored place, the back control, or an address that opens below the first screen, the visitor sees the pinned header on SCR-03, with a divider and a solid ground. The page content stays where it was, and the header does not play the slide or the fade. If that position is the very top, the visitor still sees the resting header on SCR-01, and the page content does not move.

## AC coverage

| AC    | Shown by                                                       | Notes                                                                                                                                                                                                  |
| ----- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | Flow US-01 → reaches 10 px → SCR-02                            | Slide off when motion is allowed. The hold in US-04 and the fade in US-07 are separate givens.                                                                                                         |
| AC-02 | Flow US-02 → reaches 10 px → SCR-03                            | Pinned header, divider, and solid ground while the page stays below the top.                                                                                                                           |
| AC-03 | Flow US-03 → at the top → SCR-01                               | Includes a page that does not scroll.                                                                                                                                                                  |
| AC-04 | Flow US-04 → scrolls → header stays in the look it already had | Scroll only. A jump started from the header is US-06.                                                                                                                                                  |
| AC-05 | Flow US-06 → three end positions                               | Top, downward past 10 px, upward ending below the top. Focus still inside the header does not change the ending.                                                                                       |
| AC-06 | Flow US-01 → still under 10 px, and the direction-change reset | Also the under-10 px branches on US-02 and US-06. The top is not this branch.                                                                                                                          |
| AC-07 | Flow US-02 → reader → same pinned header                       | A visitor who only reads is not withheld a different header.                                                                                                                                           |
| AC-08 | Flow US-03 → pinned header arrived → SCR-01                    | The top overrides the 10 px rule. Height and ground change with no height animation. Also the top exits on US-01, US-02, and US-04.                                                                    |
| AC-09 | Flow US-05 → SCR-08 → opening tone kept                        | Light and dark declared tones. Later sections do not restyle the bar.                                                                                                                                  |
| AC-10 | Flow US-07 → 150 ms fade to SCR-02, SCR-03, or SCR-01          | Same end states as a visitor without that setting.                                                                                                                                                     |
| AC-11 | Flow US-08 → still pinned → SCR-06                             | Target offset by the pinned header's height. Other landings follow US-06.                                                                                                                              |
| AC-12 | Flow US-09 → SCR-07                                            | Saved view, before a browser position exists.                                                                                                                                                          |
| AC-13 | Flow US-09 → below the top → SCR-03                            | Back, restore, or an address that opens below the top. No slide, no fade, content stays.                                                                                                               |
| AC-14 | Flow US-09 → the very top → SCR-01                             | Interactive at the top keeps the resting header. Content stays.                                                                                                                                        |
| AC-15 | Flow US-04 → both holds end → same visible look                | Until the next scroll past 10 px. The page is still below the top.                                                                                                                                     |
| AC-16 | Flow US-01 → still moving → unfinished move dropped            | Also the retarget branch on US-07 while a fade is running.                                                                                                                                             |
| AC-17 | Flow US-01 settled, Flow US-02 pin, Flow US-03 snap            | Hiding, pinning, and returning to rest do not move the work. Pinned to resting changes height and ground with no height animation. Repeated on US-04 at the top and on US-09 for the first correction. |
| AC-18 | Flow US-04 → focus enters SCR-02 → SCR-04                      | Tab, skip link, or programmatic focus. Pinned header at once, or a 150 ms fade when the system asks for less motion.                                                                                   |
