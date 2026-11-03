---
slug: person-jsonld-dup
date: 2026-11-03
triage: no-spec
acs: []
commit: 2bbcb9a
recurrence_of: none
---

# Fix: prerendered Person JSON-LD is duplicated

## Symptom

Doing: open the prerendered homepage, let the page hydrate, then open a project case. Expected: one Person JSON-LD script in `<head>` on the homepage, and none after the case navigation. Got: two Person blocks — the prerender script has no `id`, the hook looks up `#person-jsonld`, misses it, and appends a second script; opening a case removes only the script with that `id`, and the identifier-less script from the homepage HTML stays. Scope: every visitor of the prerendered homepage. Present in the current source (audit 2026-11-03); no earlier fix record.

## Root cause

`siteHeadTags` builds the homepage Person script at `src/utils/siteHeadTags.ts:45`. Before this fix that tag had no `id`. `upsertJsonLd` only finds or removes `document.getElementById("person-jsonld")` (`src/utils/useDocumentHead.ts:61-64`) and appends a new script when that lookup misses (`src/utils/useDocumentHead.ts:72-73`). Prerender writes that head string into the shipped HTML (`scripts/prerender.mjs`). Existing tests check Person text on the home head string, or `#person-jsonld` on a fresh client render, and never seed the prerender tag before hydration.

## The pinning test

Integration-style unit tests in `src/tests/personJsonLdHead.test.tsx`. They seed `document.head` with the real homepage `siteHeadTags` string, render `App`, and count `script[type="application/ld+json"]`. First run, before the id was added, was a GOOD red:

```
AssertionError: expected <script …(1)></script>
…(1) to have a length of 1 but got 2

 ❯ src/tests/personJsonLdHead.test.tsx:44:29
     44|     expect(jsonLdScripts()).toHaveLength(1);
```

The case-navigation test reached the Lovespace heading, then failed because the identifier-less script was still there:

```
AssertionError: expected <script …(1)></script> to have a length of +0 but got 1

 ❯ src/tests/personJsonLdHead.test.tsx:57:29
     57|     expect(jsonLdScripts()).toHaveLength(0);
```

## Spec patch

no spec to patch — brownfield; survey recommended

## Follow-ups

- `upsertJsonLd` still ignores a Person script that has no id (`src/utils/useDocumentHead.ts:61`). Homepage HTML cached from before this change still hydrates into two scripts until that file is replaced.
