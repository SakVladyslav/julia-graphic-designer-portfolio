---
slug: case-chunk-error
date: 2026-11-03
triage: no-spec
acs: []
commit: 1163b05
recurrence_of: none
---

# Fix: case chunk failure leaves a dead prerender

## Symptom

Doing a direct visit to `/projects/...`, or a move from the home page onto a case, expected the app to mount when the case chunk `import()` fails and to show the same NotFoundPage with a reload and a live menu; expected `pending` to clear after rejection so a later call can import again; expected `Suspense fallback={null}` only on the first frame where the case HTML is already in the document, so the region between the header and the footer is not empty while the chunk loads. Got: no error boundary and no `errorElement`; `start()` waits for the chunk before `hydrateRoot`; a rejected import is dropped by `void start()`, hydration never starts, and `#root` stays prerendered without a live menu; `pending` stays rejected; client navigation uses `fallback={null}` and the outlet is empty until the chunk arrives. Scope: every visitor. Reported in the 2026-11-03 audit.

## Root cause

`start()` in `src/main.tsx` awaited `loadProjectCasePage()` before `hydrateRoot` and did not catch a rejection, so `void start()` dropped the error and `#root` stayed prerendered. `loadProjectCasePage` stored that rejected promise in `pending` and never cleared it (`src/pages/project/loadProjectCasePage.ts`). `ProjectRoute` always used `Suspense fallback={null}` (`src/App.tsx`), so a client navigation unmounted the home page and left the outlet empty until the chunk resolved. No test imported `main.tsx`, rejected the dynamic import, or asserted a fallback. `docs/features/` has no `spec.md` for this path (`case-ids-lock` and `person-jsonld-dup` do not own it).

## The pinning test

`src/tests/pages/project/caseChunkError.test.tsx`. First run, before the fix, three GOOD reds:

```
AssertionError: expected [ { resolve: [Function], …(1) } ] to have a length of 2 but got 1
 ❯ src/tests/pages/project/caseChunkError.test.tsx:48:24
     48|       expect(attempts).toHaveLength(2);
```

```
TestingLibraryElementError: Unable to find role="heading" and name "This page does not exist."
 ❯ src/tests/pages/project/caseChunkError.test.tsx:80:22
```

The document still contained the prerendered `<article class="case-page">`.

```
TestingLibraryElementError: Unable to find an element with the text: Loading the project.
 ❯ src/tests/pages/project/caseChunkError.test.tsx:105:19
```

Header and footer were present; the outlet between them was empty.

## Spec patch

no spec to patch — brownfield; survey recommended

## Follow-ups

- `<Route errorElement>` does nothing under `BrowserRouter`. `CaseChunkBoundary` is the catch that works with the current router. A data router (`createBrowserRouter`) would make `errorElement` live.
- A successful direct visit still awaits the chunk before `hydrateRoot`, so the menu stays the prerender until that import finishes.
- `consumeNullCaseFallback` flips a module flag during render. Strict Mode's second render therefore does not take the null fallback; the awaited chunk means that render does not suspend.
