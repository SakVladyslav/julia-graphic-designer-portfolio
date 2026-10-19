# Julia Samchuk — portfolio site

Personal portfolio SPA for graphic designer Julia Samchuk.

**Live site:** https://julia-graphic-designer-portfolio.vladyslav-sak.workers.dev

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- Sass design tokens (`src/styles/`)
- Oxlint + Prettier
- Vitest + Testing Library

## Scripts

| Command                           | Purpose                                      |
| --------------------------------- | -------------------------------------------- |
| `npm run dev`                     | Local development server                     |
| `npm run build`                   | Typecheck + production build                 |
| `npm run preview`                 | Preview production build                     |
| `npm run lint`                    | Oxlint                                       |
| `npm run format`                  | Prettier write                               |
| `npm run format:check`            | Prettier check                               |
| `npm test`                        | Unit / smoke tests                           |
| `npm run og:image`                | Rebuild the share-card image `public/og.png` |
| `npm run optimize:images`         | Convert `public/projects` PNG/JPG → WebP     |
| `npm run optimize:images:replace` | Same, then delete originals                  |

## Project structure

```
src/
  components/     # UI pieces (Header, Contacts, ProjectCard, …)
  constants/      # Content data (projects, contacts, navigation)
  pages/          # Page composition (LandingPage)
  styles/         # Design tokens (colors, typography, spacing, sizes)
  utils/          # Pure helpers
  test/           # Test setup
public/
  fonts/          # Self-hosted Min Sans
  projects/       # Optimized project media (WebP + SVG)
scripts/
  optimize-images.mjs
```

## Content editing

- Projects → `src/constants/projects.ts`
- Contacts / social stubs → `src/constants/contacts.ts` (replace `href: null` with real URLs)
- Nav labels / anchors → `src/constants/navigation.ts`

## Deploy

Pull requests and pushes to `master` run lint, tests, and the production build.

[Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) publishes `dist` from `master`.
The production address is
`https://julia-graphic-designer-portfolio.vladyslav-sak.workers.dev`.
Build command: `npm run build`. Output directory: `dist`.

Set the `SITE_ORIGIN` environment variable to the public URL (no trailing slash)
when a custom domain replaces the `workers.dev` address. Until then the canonical
and share-card URLs use that Workers hostname.

Vite `base` is `/`. The Worker serves `index.html` for unknown paths, so a project
page keeps its address when opened directly.

## Conventions

- Import order: see `.cursor/rules/import-order.mdc`
- SCSS token `@use` order: see `.cursor/rules/scss-tokens.mdc`
- Prettier: double quotes, semicolons, trailing commas
