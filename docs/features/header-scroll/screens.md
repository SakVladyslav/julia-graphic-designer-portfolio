---
status: draft
feature_size: XS
tool: figma
updated_at: "2026-11-05"
---

# Screens — header-scroll

> The canonical screen manifest — every screen in every state — produced by `screens` and read by
> `tasks`, `implement`, and `review`. Downstream stages reference only this manifest.

## Source

- **Tool:** figma (from `docs/design-system.md`)
- **File:** [Website Julia](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia)
- **Reuse:** SCR-01 and SCR-07 use the existing 1440 home frame. That frame already shows the resting header (transparent, no divider, no solid ground).
- **Reuse:** SCR-03, SCR-04, and SCR-06 use the existing Fixed header frame `196:2947`. It already shows the shorter pinned bar over a scrolled page.
- **Reuse:** SCR-05 uses the existing open menu frame `196:3139` in the Menu section. No desktop menu was invented.
- **Drawn:** SCR-02 is a copy of the 1440 home frame in the `header-scroll` section. The header is shifted above the clip. The original home frame was not moved.
- **Drawn:** SCR-08 is a copy of the pinned home viewport in that same section, scrolled so the dark contacts section sits behind the light pinned header.

## Screens

### SCR-01 — Page at the top

The page is at the very top, including a page that does not scroll. The visitor sees the taller resting header: no divider, no solid ground, so the page shows through. Every row below ends on that same picture. `from-pinned`, `reduced-motion`, `first-correction`, and `under-threshold` are arrival rules, not separate layouts. A move that reverses while the bar is still moving (AC-16) ends on `default` or `from-pinned`. Keyboard focus inside the header is SCR-04. The open narrow-screen menu is SCR-05.

The desktop frame is [1445](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=98-9424) (`98:9424`) in the Home page section. The bar on that frame is the Header instance `98:9426`, whose component is `76:2967` (`Appearance=Dark, Breakpoint=1440`). The light resting bar already exists as `76:2975` (`Appearance=Light, Breakpoint=1440`). No second page frame was added for the light tone, and no phone frame was invented. The 390 header variants `76:2907` and `76:2913` already exist in the Header component set.

| State            | Trigger / condition                                                                                                                                                                                                            | Components (from the inventory)            | Source-ref |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------- |
| default          | The page is at the very top, including a page that does not scroll (AC-03). The resting header is taller, with no divider and no solid ground. The opening tone is the one the route declared: Header `default` or `inverse`.  | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| from-pinned      | The pinned header is what arrived at the top, including when the last travel was under 10 px (AC-08, AC-17). The end picture is `default`. Height and ground change together. The height does not animate. The work stays put. | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| reduced-motion   | The system asks for less motion and the end position is the top (AC-10). The end picture is `default`. The look changes by a 150 ms fade, not a slide. The height still does not animate.                                      | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| first-correction | The saved view showed the resting header, and the browser position is the top when the page becomes interactive (AC-14). The end picture is `default`. No slide and no fade. The page content does not move.                   | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| under-threshold  | Travel in the current direction is still under 10 px and the page stays at the top (AC-06). The picture stays `default`. A change of direction resets that running distance.                                                   | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| loading          | N/A: scrolling adds no request (spec §6). The saved first view is SCR-07.                                                                                                                                                      | —                                          | N/A        |
| empty            | N/A: the header chrome is always on the page. This design system has no empty state.                                                                                                                                           | —                                          | N/A        |
| error            | N/A: the scroll phase adds no error channel (SAD §8). A move that is too small is `under-threshold`, not an error screen.                                                                                                      | —                                          | N/A        |
| validation       | N/A: the header has no form.                                                                                                                                                                                                   | —                                          | N/A        |

### SCR-02 — Page below the top, header hidden

The page is below the top and the header is off-screen, so the work is not covered. Hiding the header does not move the work (AC-17). `reduced-motion` and `under-threshold` end on the same picture. A move that reverses while the bar is still moving (AC-16) stays on this picture only when the new direction is still down. An upward end is SCR-03. Focus entering the hidden header is SCR-04. The narrow-screen menu cannot be opened while the bar is off-screen.

The frame is [1440 px — header hidden](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=217-3286) (`217:3286`) in the `header-scroll` section (`217:3285`). It is a copy of the 1440 home frame. The Header instance `217:3292` sits at y -93, above the clipped frame, and the hero starts at y 0. No phone frame was added.

| State           | Trigger / condition                                                                                                                                                                                                                                           | Components (from the inventory)            | Source-ref |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| default         | The visitor moves down past 10 px from the resting or pinned header, the narrow-screen menu is closed, and keyboard focus is outside the header (AC-01). A downward jump past 10 px ends here too (AC-05). The header slides off. The work stays put (AC-17). | SiteShell, SkipLink, Header, Logo, SiteNav | `217:3286` |
| reduced-motion  | The system asks for less motion and the end is still hidden (AC-10). The end picture is `default`. The header leaves by a 150 ms fade, not a slide.                                                                                                           | SiteShell, SkipLink, Header, Logo, SiteNav | `217:3286` |
| under-threshold | The visitor moves up, travel in that direction is still under 10 px, and the page stays below the top (US-02, SAD §6). The picture stays `default`. A change of direction resets that running distance.                                                       | SiteShell, SkipLink, Header, Logo, SiteNav | `217:3286` |
| loading         | N/A: scrolling adds no request (spec §6). The saved first view is SCR-07.                                                                                                                                                                                     | —                                          | N/A        |
| empty           | N/A: the header is still in the document. This design system has no empty state.                                                                                                                                                                              | —                                          | N/A        |
| error           | N/A: the scroll phase adds no error channel (SAD §8). A move that is too small is `under-threshold`, not an error screen.                                                                                                                                     | —                                          | N/A        |
| validation      | N/A: the header has no form.                                                                                                                                                                                                                                  | —                                          | N/A        |

### SCR-03 — Page below the top, header pinned

The page is below the top. The visitor sees the shorter pinned header: a solid ground in the page's opening tone and a bottom divider. The primary navigation is the same for every visitor (AC-07). `first-correction`, `reduced-motion`, and `under-threshold` end on that same picture. Reaching the top is SCR-01. Focus inside the header is SCR-04. The open narrow-screen menu is SCR-05. An in-page target sitting clear of this bar is SCR-06.

The home frame is [1440 px](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=196-2947) (`196:2947`) in the Fixed header section. The page is scrolled. The bar `196:2976` is 77px tall, against 93px for the resting header. Its ground is light and its bottom stroke is 2px and dark, which is the light opening tone: dark marks, light ground, dark divider. The Figma variant is `Appearance=Dark, Breakpoint=1440`. The dark opening tone already exists on the case frame `196:2799` (bar `196:2946`: dark ground, light divider, variant `Appearance=Light`). No new frame was drawn, and no phone frame was added.

| State            | Trigger / condition                                                                                                                                                                                                                      | Components (from the inventory)            | Source-ref |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| default          | The visitor moves up past 10 px while the page stays below the top, the menu is closed, and keyboard focus is outside the header (AC-02). An upward jump that ends below the top lands here too (AC-05). The work does not move (AC-17). | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| first-correction | The saved view showed the resting header, and the browser position is already below the top when the page becomes interactive (AC-13). The end picture is `default`. No slide and no fade. The page content stays where it was.          | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| reduced-motion   | The system asks for less motion and the end is still pinned (AC-10). The end picture is `default`. The bar arrives by a 150 ms fade, not a slide.                                                                                        | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| under-threshold  | Travel in the current direction is still under 10 px, and the page does not reach the top (AC-06). The picture stays `default`. A change of direction resets that running distance.                                                      | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| loading          | N/A: scrolling adds no request (spec §6). The saved first view is SCR-07.                                                                                                                                                                | —                                          | N/A        |
| empty            | N/A: the header is on the page. This design system has no empty state.                                                                                                                                                                   | —                                          | N/A        |
| error            | N/A: the scroll phase adds no error channel (SAD §8). A move that reverses while the bar is still moving (AC-16) ends here only when the new direction brings the pinned header back.                                                    | —                                          | N/A        |
| validation       | N/A: the header has no form.                                                                                                                                                                                                             | —                                          | N/A        |

### SCR-04 — Page with focus held in the header

Keyboard focus is inside the header, or it has just entered a hidden header. Below the top, the visible look is the pinned header. A scroll that is not a jump does not hide that bar and does not switch its look (AC-04). A jump started from the header follows the jump's end and leaves this screen. Reaching the top leaves for SCR-01.

No focus frame was drawn. The pinned picture is the same frame as SCR-03. The skip-link focus ring is not a Figma frame. It stays the existing focus treatment.

| State          | Trigger / condition                                                                                                                                                                                  | Components (from the inventory)            | Source-ref |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| default        | Keyboard focus is inside the header, the page is below the top, and the visitor scrolls rather than jumping from the header (AC-04). The header stays in the pinned look it already had.             | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| reveal         | Focus enters a hidden header by Tab, by the skip link, or by programmatic focus, and the system does not ask for less motion (AC-18). The pinned header shows at once. The end picture is `default`. | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| reduced-motion | The same entry when the system asks for less motion (AC-18). The same pinned header appears by a 150 ms fade. The end picture is `default`.                                                          | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| released       | Focus has left and the narrow-screen menu is closed, before any new scroll, and the page is still below the top (AC-15). The header keeps the same visible look.                                     | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| loading        | N/A: focus adds no request (spec §6).                                                                                                                                                                | —                                          | N/A        |
| empty          | N/A: the header is on the page. This design system has no empty state.                                                                                                                               | —                                          | N/A        |
| error          | N/A: the scroll phase adds no error channel (SAD §8).                                                                                                                                                | —                                          | N/A        |
| validation     | N/A: the header has no form.                                                                                                                                                                         | —                                          | N/A        |

### SCR-05 — Page with the narrow-screen menu open

The narrow-screen menu is open. The header stays on screen in the look it already had. A scroll that is not a jump does not hide it and does not switch that look (AC-04). Closing the menu, or reaching the top, leaves this screen. The top exit is SCR-01.

The picture is the existing [390 px](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=196-3139) open menu (`196:3139`) in the Menu section. The Menu section also holds `196:3197`, `196:3255`, and `196:3312`. No 1440 menu was drawn. While this menu is open, a less-motion fade does not hide the header (US-07).

| State          | Trigger / condition                                                                                                                                                                                            | Components (from the inventory)            | Source-ref |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| default        | The visitor opens the narrow-screen menu, and the page is below the top (AC-04). The header stays in the look it already had.                                                                                  | SiteShell, SkipLink, Header, Logo, SiteNav | `196:3139` |
| released       | The menu has closed and focus is outside the header, before any new scroll, and the page is still below the top (AC-15). The header keeps the same visible look. Below the top that look is the pinned header. | SiteShell, SkipLink, Header, Logo, SiteNav | `196:2947` |
| reduced-motion | N/A: while the menu is open, the 150 ms fade does not hide the header or switch its look (US-07). The picture stays `default`.                                                                                 | —                                          | N/A        |
| loading        | N/A: opening the menu adds no request (spec §6).                                                                                                                                                               | —                                          | N/A        |
| empty          | N/A: the menu opens over a page that already has a header. This design system has no empty state.                                                                                                              | —                                          | N/A        |
| error          | N/A: the scroll phase adds no error channel (SAD §8).                                                                                                                                                          | —                                          | N/A        |
| validation     | N/A: the header has no form.                                                                                                                                                                                   | —                                          | N/A        |

### SCR-06 — In-page target under a pinned header

The pinned header is visible, and an in-page link ends with that bar still pinned. The target is fully visible below the bar, offset by the pinned header's height (AC-11). A landing that hides the header or returns to the top is SCR-02 or SCR-01, not this screen.

No anchor frame was drawn. In `196:2947` the project titles sit fully below the 77px bar, so the bar does not cover them. The offset in implementation is `scroll-margin-top` equal to the pinned header's height.

| State         | Trigger / condition                                                                                                                                   | Components (from the inventory)                         | Source-ref |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------- |
| default       | The pinned header is visible and the visitor follows an in-page link whose jump ends still pinned (AC-11). The target is fully visible below the bar. | SiteShell, SkipLink, Header, Logo, SiteNav, ProjectCard | `196:2947` |
| other-landing | N/A: a jump that ends hidden or at the top is SCR-02 or SCR-01 (US-06). This offset is not what keeps a pinned bar off those landings.                | —                                                       | N/A        |
| loading       | N/A: an in-page jump adds no request (spec §6).                                                                                                       | —                                                       | N/A        |
| empty         | N/A: the target is a section that already exists on the page. This design system has no empty state.                                                  | —                                                       | N/A        |
| error         | N/A: the scroll phase adds no error channel (SAD §8). A missed offset is this screen's failure, and the passing picture is `default`.                 | —                                                       | N/A        |
| validation    | N/A: the header has no form.                                                                                                                          | —                                                       | N/A        |

### SCR-07 — Saved first view

The prepared page, before any browser has a scroll position. The visitor sees the resting header, with no divider and no solid ground (AC-12). When the page becomes interactive, this screen ends: the top becomes SCR-01, and a position already below the top becomes SCR-03. That correction is not a state of this screen.

The picture is the same home frame as SCR-01. No frame was drawn.

| State      | Trigger / condition                                                                                             | Components (from the inventory)            | Source-ref |
| ---------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| default    | The saved view is shown, before a browser position exists (AC-12). Resting header, no divider, no solid ground. | SiteShell, SkipLink, Header, Logo, SiteNav | `98:9424`  |
| loading    | N/A: this is the first paint. The design system has no skeleton and no spinner.                                 | —                                          | N/A        |
| empty      | N/A: the saved page includes the header. This design system has no empty state.                                 | —                                          | N/A        |
| error      | N/A: preparing the page adds no error channel (SAD §8).                                                         | —                                          | N/A        |
| validation | N/A: the header has no form.                                                                                    | —                                          | N/A        |

### SCR-08 — Later section

The visitor has moved into a later section whose background is the opposite of the page's opening tone, including contacts or the footer (AC-09). The header keeps the marks of the declared opening tone. The pinned header keeps that tone's solid ground, and the divider keeps the contrasting tone. The bar does not take the later section's background.

The frame is [1440 px — later section](https://www.figma.com/design/mz08gQQzJrizSqgUvdmxgw/Website-Julia?node-id=220-3417) (`220:3417`) in the `header-scroll` section. It is the pinned home viewport scrolled to contacts. Home's opening tone is light, so the bar stays light with dark marks and a dark divider. Contacts behind it is dark. A hidden header over that same section is SCR-02. It does not create a second tone.

| State      | Trigger / condition                                                                                                                                          | Components (from the inventory)                              | Source-ref |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| default    | The visitor moves into a later section whose background is the opposite tone (AC-09). The pinned header keeps the opening tone's marks, ground, and divider. | SiteShell, SkipLink, Header, Logo, SiteNav, Contacts, Footer | `220:3417` |
| loading    | N/A: moving into the section adds no request (spec §6).                                                                                                      | —                                                            | N/A        |
| empty      | N/A: the later section is part of the page. This design system has no empty state.                                                                           | —                                                            | N/A        |
| error      | N/A: the scroll phase adds no error channel (SAD §8). Taking the later section's color would fail AC-09, and the passing picture is `default`.               | —                                                            | N/A        |
| validation | N/A: the header has no form.                                                                                                                                 | —                                                            | N/A        |

## New components

None. Every screen uses SiteShell, SkipLink, Header, Logo, and SiteNav. SCR-06 also uses ProjectCard. SCR-08 also uses Contacts and Footer. Resting, hidden, and pinned are looks of Header, not new components.
