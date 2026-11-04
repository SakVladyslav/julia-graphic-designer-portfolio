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
- SEO and prerender: src/utils/, src/vite/, scripts/prerender.mjs
- Images: public/projects/ — always webp, processed via scripts in scripts/

## Rules

- Detailed rules: .cursor/rules/*.mdc
- Architecture: docs/architecture-map.md (after survey)
- Work in a branch and open a PR, never commit to master directly
- Commit messages: type(scope): what and why
- After editing files, run `npm run format` on changed files
