# Joe Webb Designs — Portfolio Site

Personal portfolio and marketing site for [Joe Webb Designs](https://www.joewebbdesigns.com), rebuilt as a [Next.js](https://nextjs.org) application. The UI and layout come from an exported [Webflow](https://webflow.com) site; content is served from local JSON files instead of Webflow CMS at runtime.

## Tech stack

- **Next.js 16** (App Router)
- **React 19** with **TypeScript**
- **Framer Motion** for scroll and entrance animations
- **Webflow CSS** (`styles/webflow/`) plus legacy client scripts (`public/js/joe-webb.js`) for interactions that match the original site

## Features

- Static marketing pages (home, about, projects, contact, YouTube hub)
- CMS-style detail pages for projects, blog posts, and YouTube videos
- File-based content in `content/` (exported from Webflow collections)
- SEO metadata aligned with the original Webflow page config
- Internal links mapped from Webflow `.html` paths to Next.js routes

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/about` | About |
| `/projects` | Project listing |
| `/project/[slug]` | Project case study |
| `/post/[slug]` | Blog post |
| `/contact` | Contact |
| `/joe-webb-youtube-videos` | YouTube video listing |
| `/youtube-video/[slug]` | Single video |

## Project structure

```
app/                    # Next.js routes (thin wrappers)
components/
  webflow/              # Page layouts migrated from Webflow HTML
  cms/                  # Cards and detail views for CMS content
  motion/               # Framer Motion wrappers
  ui/                   # Shared layout primitives
content/                # JSON data (projects, posts, videos, services)
lib/
  cms/                  # Data loaders, types, URL helpers
  webflow/              # Route mapping, page metadata, styles
public/
  images/               # Site assets
  js/                   # Webflow legacy scripts
styles/webflow/         # normalize, components, joe-webb theme CSS
```

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/WebbDeveloping/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production server locally |
| `npm run lint` | Run ESLint |

## Updating content

Content lives in `content/` as JSON:

- `projects.json` — case studies (images, copy, featured flag, live link)
- `posts.json` — blog posts
- `videos.json` — YouTube entries
- `services.json` — service offerings (used on the home page)

After editing a file, restart the dev server if a page does not pick up changes during development. New slugs need a matching entry in the JSON and will be available at `/project/[slug]`, `/post/[slug]`, or `/youtube-video/[slug]` on the next build.

Data loaders and types are in `lib/cms/` (`data.ts`, `types.ts`, `paths.ts`).

## Webflow migration notes

- Page components under `components/webflow/` mirror the exported Webflow markup and class names so existing CSS continues to apply.
- `lib/webflow/routes.ts` maps legacy links like `about.html` to App Router paths.
- `lib/webflow/page-config.ts` holds per-page metadata and Webflow `data-wf-page` IDs used by `WebflowPageShell`.
- Animations that do not depend on Webflow IX2 use `components/motion/` (Framer Motion).

## Deployment

The app is a standard Next.js project and deploys cleanly to [Vercel](https://vercel.com) or any Node host that supports `next build` / `next start`. Set the production URL in `app/layout.tsx` (`metadataBase`) if the canonical domain changes.

## License

Private repository — all rights reserved unless otherwise noted.
