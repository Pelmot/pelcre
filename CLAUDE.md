# Pelmot Creativity — Project Context

Architecture portfolio site for **Pelmot Creativity** (real person behind it: Abdurrazzak Jazmati, "Junior Architect", based in Gaziantep, Turkey). Built as a React SPA, content is managed through Sanity CMS (no code needed to edit content), deployed to Cloudflare Workers. Fully trilingual (English/Turkish/Arabic) with RTL support.

## Live URLs

- **Live site**: https://pelcre.myworkss.workers.dev
- **Content editor (Sanity Studio)**: https://pelmot-creativity.sanity.studio/ — log in with GitHub (reiw9 / tala.wj@gmail.com)
- **GitHub repo**: https://github.com/reiw9/pelcre (branch `main`)
- **Web3Forms dashboard** (contact form submissions): https://web3forms.com — signed up with pelmot.creativity@gmail.com
- **Cloudflare Web Analytics**: Cloudflare dashboard → Analytics & Logs → Web Analytics

## Stack

- React 19 + TypeScript (strict) + Vite 8 + Tailwind CSS v4 + Framer Motion + React Router
- i18next + react-i18next for translation (see Internationalization section below)
- Content: Sanity CMS (project ID `cmdikf3a`, dataset `production`) — see `src/lib/sanity.ts` and `src/context/DataContext.tsx`
- Deploy: Cloudflare Workers with static assets (`wrangler.jsonc`, worker name `pelcre`)
- Fonts self-hosted via `@fontsource` (Cormorant Garamond serif + Inter sans), no external font requests

## Internationalization (i18n)

Site supports **English (default), Turkish, Arabic** — auto-detected from the visitor's browser/phone locale (`navigator.language`) on first visit, remembered afterward in localStorage (`pelmot-creativity-language`). A globe icon in the navbar (`LanguageSwitcher.tsx`) lets visitors switch manually at any time. Arabic gets full RTL layout mirroring, not just right-aligned text.

- `src/context/LanguageContext.tsx` — `LanguageProvider`/`useLanguage()`, sets `document.documentElement.lang` and `dir` (`rtl` for Arabic), mirrors the `ThemeContext` pattern
- `src/i18n/index.ts` — i18next init + language auto-detection logic; `src/i18n/locales/{en,tr,ar}.ts` — dictionaries for all static UI strings (nav, buttons, forms, error messages, page headings, etc.), consumed via `useTranslation()` / `t()` in every component
- **RTL implementation**: Tailwind logical properties (`ps-`/`pe-`, `start-`/`end-`, `text-start`/`text-end`) and `rtl:` variants used instead of physical `left`/`right`/`pl`/`pr` throughout; directional icons (arrows, chevrons) get `rtl:rotate-180`. `dir="rtl"` on `<html>` makes Tailwind's built-in `rtl:` variant system apply automatically.
- **CMS content translation**: translatable Sanity fields use reusable `localeString`/`localeText` object schema types holding `{ en, tr, ar }` instead of plain strings. `src/context/DataContext.tsx` fetches the raw multi-language documents *once*, then `pickLocale(field, lang)` resolves the active language via a `useMemo` keyed on `language` — switching languages re-derives data instantly with no refetch.
  - **Localized** (translated): `siteSettings.title`, `.tagline`, `.bioParagraphs`, `.philosophy[].title/.text`, `.timeline[].title/.description`, `.skills[].name`, `.software[].category`, `.awards[].title`, `.services[].title/.description/.points[]`, `.testimonials[].role/.quote`, `.pageContent.{home,about,services,projects,contact}.*` (see Data architecture section); `project.excerpt`, `.description`, `.challenge`, `.solution`, `.materials[].name/.detail`
  - **Not localized** (kept as plain strings — proper nouns / brand names by convention): architect `name`, `email`, `phone`, `address`; `siteSettings.location`; `project.title`, `.location`, `.client`, `.area`; `timeline[].place`; `awards[].organization`; `software[].name`; `testimonials[].name`; `category`/`status` enums (canonical values used for filtering/matching — their *display* labels are translated via the `categories.*`/`status.*` i18n dictionary keys instead, not by localizing the Sanity field itself)
  - **Known gap**: `siteSettings.location` ("Based in Gaziantep, Turkey — working worldwide", shown on the About page) was scoped as a place-name label rather than translatable prose, so it still shows English in all three languages. Converting it to `localeString` + translating is a small follow-up if wanted.
- **Translation quality**: all existing Turkish/Arabic content was machine-translated by Claude in one pass as a first draft (per user's explicit choice — draft now, refine later). Recommend a native speaker review before treating it as final professional copy, especially since this is a client-facing business site.
- To add a new translatable Sanity field later: add it as `localeString`/`localeText` in the schema (via `deploy_schema`), redeploy Studio (`deploy_studio`), then `pickLocale()` it in `DataContext.tsx`.

## Data architecture

All content (projects, bio, services, timeline, skills, software, awards, testimonials, contact info) lives in Sanity, **not** in local files. `src/data/content.ts` and `src/data/projects.ts` were deleted — don't recreate them as the source of truth.

- `src/lib/sanity.ts` — Sanity client, image URL builder, paragraph-splitting helper, placeholder image for projects with no photo yet
- `src/context/DataContext.tsx` — fetches everything once on app load (`DataProvider`), exposes `useSiteData()` hook returning `{ architect, heroImages, pageContent, bio, timeline, skills, software, awards, services, testimonials, projects }` already resolved to the active language. Shows a full-screen loading state until the fetch resolves.
- Sanity schema has two document types: `project` (repeatable) and `siteSettings` (**singleton — only one should ever exist**, don't create a second one), plus two shared object types `localeString`/`localeText` used for translatable fields (see Internationalization section)
- Images map through `imageUrl()` which returns a neutral Soft-Stone placeholder SVG data-URI if no photo has been uploaded yet — this is intentional, not a bug. Gallery/Floor Plans/Renders sections on the project detail page hide themselves entirely when empty.
- `siteSettings` has two separate photo fields — **Founder Photo** (About page portrait) and **Studio Photo** (Home page "About preview" section) — intentionally independent so the owner can use two different photos.
- **Page hero images**: `siteSettings.{home,about,projects,services,contact}HeroImage` — one banner photo per page, editable from Studio. Mapped in `DataContext.tsx` to `SiteData.heroImages.{home,about,projects,services,contact}`; each page component does `heroImages.X || <hardcoded Unsplash fallback constant in that page file>` so an empty field just keeps the current stock photo instead of breaking. (Project detail pages already had this via `project.coverImage` — unrelated to this field group.)
- **Page titles & section headings**: `siteSettings.pageContent.{home,about,services,projects,contact}.*` — an editable-from-Studio override for every visible heading/eyebrow/short description on those five pages (nav links, buttons, and form labels were deliberately left as plain i18n strings, not moved here). Fields are `localeString`/`localeText` so they're per-language like everything else in Internationalization. Mapped in `DataContext.tsx` to `SiteData.pageContent`; each page component does `pageContent.<page>.<field> || t("<page>.<key>")` — the i18n dictionary value is the fallback/default shown until the site owner overrides it in Studio. When adding a new heading to a page, add the i18n key as usual *and* add a matching field under `pageContent.<page>` in the schema + `DataContext.tsx` + the `PageContent` types in `src/data/types.ts` if it should be owner-editable.
- CORS is configured on the Sanity project for `http://localhost:5173` (dev) and `https://pelcre.myworkss.workers.dev` (prod). If the site moves to a new domain, add it via the Sanity MCP `add_cors_origin` tool or sanity.io/manage.

**Current gap**: real project gallery/floor-plan/render photos still need uploading by the site owner through Sanity Studio (Founder Photo and Studio Photo have been wired up and may already be uploaded — check before assuming they're still placeholders).

## Contact form

`src/components/contact/ContactForm.tsx` posts directly to the Web3Forms API (`https://api.web3forms.com/submit`) — no backend code needed. The access key is a hardcoded constant in that file; this is intentional and safe, not a leaked secret — Web3Forms access keys are designed to be public/client-embedded (same as how Web3Forms' own docs show it in plain HTML). Submissions currently deliver to whatever email was used to generate that key (confirm with the site owner which inbox — it was set up understanding it might need to move to the business inbox later; regenerating the key and swapping the constant is a one-line change). On failure, the form shows an inline error with a `mailto:`/`tel:` fallback to the architect's contact info instead of a silent/fake success state.

## SEO & discoverability

- `scripts/generate-sitemap.mjs` runs automatically as part of `npm run build` (wired into the `"build"` script in `package.json`), querying Sanity for live project slugs and writing `public/sitemap.xml` with all static routes + one entry per project. Regenerates fresh on every build/deploy — never hand-edit `public/sitemap.xml` (it's gitignored).
- `src/components/ui/SEO.tsx` sets canonical URL, `og:url`, and full Twitter Card tags per page (in addition to title/description/og:image), computed from the current route via `useLocation()`.

## Analytics

Cloudflare Web Analytics beacon script is embedded directly in `index.html` (`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" ...>`). Free, cookie-free, view stats in the Cloudflare dashboard under Analytics & Logs → Web Analytics. Locally on `localhost` the beacon's own analytics POST will fail (expected/harmless — it only reports from the real deployed domain).

## Contact page map

`src/components/contact/StudioMap.tsx` embeds a real interactive Google Map (via the key-free `https://www.google.com/maps/embed?pb=!1m3!2m1!1s<address>!6i15` URL format — no API key, no billing) rather than a static illustration. Has a subtle dark-mode tint overlay (`pointer-events-none` div) since Google's embed iframe itself can't be recolored.

## Design system

Strict 5-color palette (do not introduce other colors without being asked):

| Token (Tailwind) | Hex | Role |
|---|---|---|
| `paper` / `bone` | `#F3F1EC` | Primary background, light-mode default |
| `linen` | `#E0DFD2` | Secondary sections / card backgrounds |
| `mist` | `#B6B8AB` | Borders, dividers, subtle UI |
| `gold` / `gold-soft` | `#9FA3AD` / `#B6B8AB` | Accent (replaces old "gold" naming — token names are legacy, values are the cool-slate/sage palette) |
| `ink` / `charcoal` | `#3C3E4A` | Primary text, nav, buttons, dark-mode background |
| `stone` | derived `color-mix` of ink+paper | Muted body text (kept darker than raw `#9FA3AD` for WCAG AA contrast — this was a deliberate fix, don't lighten it) |

Tokens defined in `src/index.css` `@theme` block. Design rules in effect: no gradients (flat `bg-ink/N` overlays on hero photos instead), no glassmorphism (no `backdrop-blur`, solid opaque surfaces), subtle `rounded-lg` (~8px) on cards/buttons/inputs/images, thin `border-mist` over shadows, dark mode fully supported (class-based, toggle in navbar, localStorage key `pelmot-creativity-theme`). Directional Tailwind utilities should be logical (`ps-`/`pe-`/`start-`/`end-`) rather than physical (`pl-`/`pr-`/`left-`/`right-`) so RTL (Arabic) keeps working — see Internationalization section.

## Contact info (as seeded in Sanity `siteSettings`)

- Email: pelmot.creativity@gmail.com · Phone: 0530 449 94 00
- Address: Ibrahimli Mah. Sehitkamil, Gaziantep, Turkey
- Social: Instagram, LinkedIn (abdurrazzak-jazmati), Behance (abdurrajazmati), X — all real links, already wired into Footer + Contact page + `SocialIcons.tsx` (custom-drawn icons; lucide-react's current version has no brand icons)

## Deploy workflow — standing instruction

**Always commit + push to GitHub and redeploy to Cloudflare after finishing a round of edits, without being asked.** (User preference, stated explicitly.)

```bash
npm run build      # generates sitemap.xml + type-check + vite build
npm run deploy      # build + wrangler deploy (redeploys pelcre.myworkss.workers.dev)
git add -A && git commit -m "..." && git push origin main
```

Sanity content changes (via Studio) go live instantly on their own — no rebuild/redeploy needed for content edits, only for actual code changes. **Exception**: schema changes (`deploy_schema`) need a Studio redeploy (`deploy_studio`) to show correctly in the editing UI, and if a field's *type* changes (e.g. plain string → `localeString`), existing documents need their data migrated/patched to the new shape too — changing the schema alone does not transform already-stored data (Sanity is schemaless underneath; the schema only governs Studio's form UI).

## Known environment quirks (not app bugs)

- The Claude Code preview tool (`preview_screenshot`) sometimes hangs or shows stale/wrong-tab state after several calls in one session — stopping and restarting the preview server (`preview_stop` then `preview_start`) reliably fixes it. Don't chase this as a real rendering bug.
- Custom viewport sizes via `preview_resize` occasionally render only in a corner of the screenshot; using presets (`desktop`/`mobile`/`tablet`) avoids it.
- `git push` to GitHub has occasionally failed once with a connection timeout then succeeded on immediate retry — treat a single failure as transient before investigating further. The same has been observed for Sanity's API/CDN (`apicdn.sanity.io`) — if a fetch times out, check `google.com`/`github.com` too before assuming a code bug; if only some external hosts fail, it's a local network blip, not the app.
- `preview_click`'s coordinate-based clicking can be unreliable on elements inside the fixed header/nav, especially right after a viewport resize or on ambiguous selectors that match both a desktop and mobile variant of the same element (e.g. two buttons sharing one `aria-label`, only one visible at a time). If a click seems to have no effect, verify with a direct `element.click()` via `preview_eval` on a freshly-queried, confirmed-visible element before concluding something is broken.

## Reference: full walkthrough for the site owner

A step-by-step non-technical content-editing guide was published as a Claude Artifact (log into Studio, edit/add projects, upload photos, edit site-wide info, invite a collaborator). It predates the i18n work and doesn't cover the new per-language field tabs — if regenerated, mention that translatable fields now show English/Turkish/Arabic inputs. The schema itself lives only in Sanity (deployed via the Sanity MCP `deploy_schema`/`get_schema` tools), not in this repo.
