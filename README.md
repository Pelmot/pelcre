# Pelmot Creativity — Architecture Portfolio

A premium, minimalist portfolio site for Pelmot Creativity, built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

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

All studio and project content lives in `src/data/` — update `projects.ts` and
`content.ts` to swap in real photography, bios, and copy without touching
component code.

## Deploying to Cloudflare Workers

The site deploys as a Cloudflare Worker serving static assets (see
`wrangler.jsonc`), which is Cloudflare's current recommended path for static
sites over Pages. Client-side routing is handled via
`not_found_handling: "single-page-application"`.

```bash
npm run deploy   # builds and deploys via wrangler
```

or manually:

```bash
npm run build
npx wrangler deploy
```

## Notes

- Placeholder photography is sourced from Unsplash (hotlinked via
  `images.unsplash.com`). Replace `src/data/projects.ts` image URLs with real
  project photography before launch.
- Dark mode is class-based (`.dark` on `<html>`), toggled from the navbar and
  persisted to `localStorage`.
