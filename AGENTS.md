# Julia — graphic designer portfolio

React 19 + TypeScript (strict) + Vite + Sass. Static prerender (SSR build + scripts/prerender.mjs), deployed to Cloudflare Workers static assets.

## Commands

- Node 22+ (see .node-version)
- npm run lint — oxlint
- npm run format:check — Prettier
- npm test — Vitest + Testing Library
- npm run build — typecheck, build, SSR, prerender

Before finishing any task: lint, format:check and test must pass.

## Where things live

- Project cases: src/constants/cases/, src/components/ProjectCase/, src/pages/project/
- Published cases list: src/constants/publishedProjectIds.ts
- Design tokens: src/styles/ — use tokens, never hardcoded values
- SEO and prerender: src/utils/seo/, src/hooks/, src/vite/, scripts/prerender.mjs
- Images: public/projects/ — always webp, processed via scripts in scripts/

## Rules

- Detailed rules: .cursor/rules/*.mdc
- Architecture: docs/architecture-map.md (after survey)
- Work in a branch and open a PR, never commit to master directly
- After editing files, run `npm run format` on changed files

## Tests for visual fixes

- Pure CSS/SCSS changes (spacing, font, sizes, media queries): NO new tests. Verify visually against Figma.
- Add a test only if markup, logic or accessibility changes.
- Never write tests that assert CSS values.

## Git

- Never commit on your own. After changes: show diff, list files, stop and wait.
- Commit ONLY after the user explicitly approves in the current message ("ок, коміть" / "ok, commit").
- Commit format: `fix(<scope>): <what>`; one commit per VF item.
- After commit: in `docs/_review/visual-fixes.md` set the item to `[x]` and write the commit hash in **Commit**.
- Never run `git push`, `reset`, `rebase`, `stash`.
