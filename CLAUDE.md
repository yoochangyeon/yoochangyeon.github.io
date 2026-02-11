# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Korean-language tech blog ("개발하는 유에녹") built on the AstroWind template. Static site using Astro 5 + Tailwind CSS 3, deployed to GitHub Pages via GitHub Actions on push to `main`.

Live site: https://yoochangyeon.github.io

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run all checks (astro + eslint + prettier) |
| `npm run check:astro` | Type checking only |
| `npm run check:eslint` | Lint only |
| `npm run check:prettier` | Format check only |
| `npm run fix` | Auto-fix lint + formatting |

## Architecture

### Configuration System

The site is configured through `src/config.yaml`, which is loaded by a custom Astro integration (`vendor/integration/`). This integration creates a Vite virtual module `astrowind:config` that exposes `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, and `ANALYTICS` as importable constants throughout the codebase.

Key settings in `src/config.yaml`: site metadata, SEO defaults, blog permalink patterns, Giscus comment system config, and analytics IDs.

### Content & Blog Posts

- Posts live in `src/data/post/` as `.md` or `.mdx` files (NOT in `src/content/` directly)
- Content collection is defined in `src/content/config.ts` using Astro's `glob` loader pointing to `src/data/post`
- Post frontmatter schema: `title` (required), `publishDate`, `updateDate`, `draft`, `excerpt`, `image`, `category`, `tags`, `author`, `metadata`
- Posts with `draft: true` are filtered from production builds
- Post permalink pattern is configured in `src/config.yaml` under `apps.blog.post.permalink` (currently `/%slug%`)
- Blog utility functions in `src/utils/blog.ts` handle fetching, sorting (newest first), and generating static paths

### Routing

- `src/pages/index.astro` - Homepage with profile + latest posts
- `src/pages/[...blog]/` - Blog routes (list, individual posts)
- `src/pages/category/` - Category listing
- `src/pages/about.astro` - About page
- `src/pages/rss.xml.ts` - RSS feed
- `src/pages/search-index.json.ts` - Search index for client-side search

### Component Organization

- `src/components/widgets/` - Page-level sections (Header, Footer, Hero, Profile, etc.)
- `src/components/blog/` - Blog-specific components (SinglePost, TableOfContents, Comments, Sidebar)
- `src/components/ui/` - Reusable UI primitives (Button, Form, Headline, ItemGrid)
- `src/components/common/` - Shared infrastructure (Metadata, Analytics, SearchModal, Image)
- `src/components/seo/` - Structured data schemas (ArticleSchema, WebsiteSchema, BreadcrumbSchema)

### Layout Hierarchy

`Layout.astro` (base HTML) -> `PageLayout.astro` / `MarkdownLayout.astro` / `LandingLayout.astro`

Layout.astro includes: CommonMeta, Favicons, CustomStyles, Metadata, SiteVerification, Analytics, WebsiteSchema, and Astro View Transitions.

### Styling

- Tailwind CSS 3 with `@tailwindcss/typography` plugin
- Dark mode via `class` strategy
- CSS custom properties defined in `src/components/CustomStyles.astro` (colors, fonts for light/dark)
- Font: Inter Variable
- Color variables: `--aw-color-primary`, `--aw-color-secondary`, `--aw-color-accent`, etc.
- Path alias: `~` maps to `src/` (configured in both `tsconfig.json` and `astro.config.ts`)

### Markdown Processing

Custom remark/rehype plugins in `src/utils/frontmatter.ts`:
- `readingTimeRemarkPlugin` - Calculates reading time and injects into frontmatter
- `responsiveTablesRehypePlugin` - Wraps tables in scrollable div
- `lazyImagesRehypePlugin` - Adds `loading="lazy"` to images

### Navigation

Site navigation (header links, footer links, social links) is defined in `src/navigation.ts`.

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node 20.

### Key Integrations

- `@astrojs/sitemap` - Auto-generated sitemap
- `astro-icon` with `@iconify-json/tabler` - Icon system
- `astro-compress` - HTML/CSS/JS minification (Image/SVG compression disabled)
- `@astrolib/seo` - SEO meta tags
- Giscus - Comment system (configured in `src/config.yaml`)
- `unpic` - Universal image CDN support

## Conventions

- UI language is Korean (i18n language: `ko`)
- ESLint flat config with TypeScript and Astro parsers
- Unused vars prefixed with `_` are allowed
- Prettier for formatting (with `prettier-plugin-astro`)
