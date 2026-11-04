---
slug: breakpoint-tokens
date: 2026-11-04
triage: no-spec
acs: []
commit: skipped
recurrence_of: none
---

# Fix: breakpoint tokens 759, 360, and 320 were missing

## Symptom

Reading `src/styles/_breakpoints.scss`, expected `$bp-narrow` 759px, `$bp-small` 360px, and `$bp-mini` 320px beside the existing `$bp-*` tokens, and the same three names in the breakpoint list in `docs/design-system.md`. Got only `$bp-desktop` 1440, `$bp-laptop` 1200, `$bp-tablet` 1024, `$bp-stack` 768, `$bp-compact` 660, `$bp-single` 599, `$bp-phone` 479, and a canon list that also skipped `$bp-compact`. Scope: the token file and that list. Components must not use the new tokens yet. Julia approved the widths in VF-00; names were confirmed before the edit.

## Root cause

`_breakpoints.scss` stopped at `$bp-phone: 479px` (`src/styles/_breakpoints.scss:7-13` before the edit). No test compiled the partial, so a missing Sass variable stayed green. `docs/features/` has fix records and no `spec.md` that owns breakpoint tokens.

## The pinning test

Unit tests in `src/tests/styles/breakpoints.test.ts`. `declares the narrow, small, and mini widths` compiles `@use "breakpoints"` and expects each variable to be that length. `lists those widths in the design canon` expects the canon sentence to contain the same names. First run, before the tokens existed, was a GOOD red:

```
AssertionError: expected 'Undefined variable.\n  ╷\n2 │ .probe …' to be '759px'

 ❯ src/tests/styles/breakpoints.test.ts:20:40
     20|     expect(compiledWidth("bp-narrow")).toBe("759px");
```

```
AssertionError: expected '---\nstatus: Living\n…' to contain '`$bp-narrow` 759'

 ❯ src/tests/styles/breakpoints.test.ts:28:19
     28|     expect(canon).toContain("`$bp-narrow` 759");
```

## Spec patch

no spec to patch — brownfield; survey recommended

## Follow-ups

- Case skins and `src/index.scss` still use raw `360px` (and `800px` / `700px`). VF-00 forbids wiring `$bp-small` into those rules in this change.
- `docs/architecture-map.md` still describes the scale as `$bp-desktop` 1440 through `$bp-phone` 479.
- `docs/design-system.md` spacing bullet still cites `_breakpoints.scss:6`, which is the fluid-frame comment, not the token block.
