# Julia Samchuk — portfolio site

Personal portfolio SPA for graphic designer Julia Samchuk.

**Live site:** https://julia-s.com

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
The production address is `https://julia-s.com`.
Build command: `npm run build`. Output directory: `dist`.

Canonical and share-card URLs use that address. Set the `SITE_ORIGIN` environment
variable (no trailing slash) when the public address changes.

Vite `base` is `/`. The build writes one HTML file per page (`dist/index.html`,
`dist/projects/lovespace/index.html`, and the other cases), plus `robots.txt` and
`sitemap.xml`. Project images already live in `dist/projects/lovespace/`, so the
page is `index.html` inside that folder. `wrangler.jsonc` serves it at
`/projects/lovespace` (`html_handling: "drop-trailing-slash"`) and answers every
other address with `dist/404.html` and HTTP 404 (`not_found_handling: "404-page"`).
The `name` in that file has to match the Worker in the Cloudflare dashboard.

## Conventions

- Import order: see `.cursor/rules/import-order.mdc`
- SCSS token `@use` order: see `.cursor/rules/scss-tokens.mdc`
- Prettier: double quotes, semicolons, trailing commas
