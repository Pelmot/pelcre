# Pelmot Creativity— Architecture Portfolio

A premium, minimalist portfolio site for architect Elena Voss / Voss Atelier, built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **React 19 + TypeScript** (strict mode)
- **Vite** for dev/build tooling
- **Tailwind CSS v4** for styling (design tokens in `src/index.css`)
- **Framer Motion** for page transitions and scroll reveals
- **React Router** for client-side routing
- Self-hosted fonts via `@fontsource` (Cormorant Garamond + Inter) — no external font requests

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, PageLoader, BackToTop, page transition wrapper
    ui/         Design-system pieces: buttons, section titles, scroll reveal,
                timeline, skill bars, FAQ accordion, testimonials, lightbox...
    projects/   ProjectCard, ProjectFilter, MasonryGallery
    contact/    ContactForm, MapPlaceholder
  pages/        One file per route (Home, About, Projects, ProjectDetail, ...)
  data/         Content & project data (types.ts, projects.ts, content.ts)
  context/      Theme (dark mode) context
  hooks/        Small reusable hooks (scroll position, body scroll lock)
```

All project and studio content lives in `src/data/` — update `projects.ts` and
`content.ts` to swap in real photography, bios, and copy without touching
component code.

## Deploying to Cloudflare Pages

The repo includes `public/_redirects` (SPA fallback routing) and a
`wrangler.toml` pointing at `dist`. Connect the repo in the Cloudflare Pages
dashboard, or deploy via Wrangler:

```bash
npm run build
npx wrangler pages deploy dist
```

Build command: `npm run build` · Output directory: `dist`.

## Notes

- Placeholder photography is sourced from Unsplash (hotlinked via
  `images.unsplash.com`). Replace `src/data/projects.ts` image URLs with real
  project photography before launch.
- Dark mode is class-based (`.dark` on `<html>`), toggled from the navbar and
  persisted to `localStorage`.
