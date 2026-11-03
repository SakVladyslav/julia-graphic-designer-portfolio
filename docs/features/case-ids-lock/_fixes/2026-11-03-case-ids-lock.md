---
slug: case-ids-lock
date: 2026-11-03
triage: no-spec
acs: []
commit: db4d000
recurrence_of: none
---

# Fix: drifted case ids still build

## Symptom

Doing a case-id drift — an id missing from `caseCopy`, or an id present only in `caseCopy` — expected the build to fail because `publishedProjectIds`, `listProjectCases`, and `caseCopy` are one list, so a card or sitemap URL always has `projects/{id}/index.html`, and a copy-only id is not written as HTTP 200 with the case title and a NotFoundPage body. Got: HTML is written from `caseCopy`, card links and the sitemap from `publishedProjectIds`, and the page body from `getProjectCase`; the test only equated the first two lists; the build succeeded. Scope: every visitor of a drifted URL. The six live ids still matched on 2026-11-03, so the hole was latent.

## Root cause

`prerenderPages` built project HTML only by walking `caseCopy` (`src/utils/prerenderPages.ts:106`), while `ProjectCard` links from `publishedProjectIds()` (`src/components/ProjectCard/ProjectCard.tsx:20`) and `ProjectCasePage` renders `getProjectCase` (`src/pages/project/ProjectCasePage.tsx:19-26`). Sitemap paths use the same published list (`src/vite/siteDiscovery.ts:30`). `src/tests/utils/indexablePaths.test.ts` compared `publishedProjectIds()` to `listProjectCases()` and never imported `caseCopy`, so either drift left `npm test` and `npm run build` green.

## The pinning test

Integration-style unit test `fails the build when case copy drops a published id and adds an unknown one` in `src/tests/utils/caseIdsLock.test.ts`. It mocks `caseCopy` without `novyny` and with `only-copy`, then expects `prerenderPages()` to throw. First run, before the lock, was a GOOD red:

```
AssertionError: expected [Function] to throw an error
 ❯ src/tests/utils/caseIdsLock.test.ts:28:36
     28|     expect(() => prerenderPages()).toThrow(
```

A check in that same run showed the mock was live: prerender wrote `projects/only-copy/index.html` and did not write `projects/novyny/index.html`.

## Spec patch

no spec to patch — brownfield; survey recommended

## Follow-ups

- Call `assertCaseIdsLocked` from `siteFiles` in `src/vite/siteDiscovery.ts` so the client Vite build fails before it writes `sitemap.xml`. Today the throw happens later, in prerender, and a failed `dist/` can already contain the sitemap.
- `ProjectCard` still decides the link from `publishedProjectIds()` alone. The lock makes a drifted link unshippable; also requiring `getProjectCase` would keep the card closed if that throw is removed.
- Project HTML is still walked from `caseCopy` after the lists match (`src/utils/prerenderPages.ts:106`). That is safe only while the lock stays.
- `docs/architecture-map.md` still describes the test lock as `publishedProjectIds` versus `listProjectCases` only. Refresh it on the next survey.
