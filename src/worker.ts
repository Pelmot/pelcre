interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

// Minimal ambient types for the HTMLRewriter runtime global (not part of TS's DOM lib,
// and this repo has no @cloudflare/workers-types dependency). Named to avoid colliding
// with the standard DOM `Element` interface, since this file is typechecked in the same
// program as the rest of the React app.
interface HTMLRewriterElement {
  setInnerContent(content: string, options?: { html?: boolean }): void;
  append(content: string, options?: { html?: boolean }): void;
}

interface HTMLRewriterElementHandler {
  element?(element: HTMLRewriterElement): void | Promise<void>;
}

declare class HTMLRewriter {
  on(selector: string, handlers: HTMLRewriterElementHandler): HTMLRewriter;
  transform(response: Response): Response;
}

interface SitemapProject {
  slug?: string;
  updatedAt?: string;
}

const SANITY_API_BASE = "https://cmdikf3a.apicdn.sanity.io/v2024-01-01/data/query/production";

function sanityQueryUrl(query: string, params?: Record<string, string>): URL {
  const url = new URL(SANITY_API_BASE);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }
  return url;
}

const SITEMAP_QUERY_URL = sanityQueryUrl(
  '*[_type == "project" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }',
);

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/services", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.2", changefreq: "yearly" },
];

const ONE_HOUR = 60 * 60;

function escapeText(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
}

function urlEntry(url: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>\n    <loc>${escapeText(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function createSitemap(origin: string): Promise<string> {
  const response = await fetch(SITEMAP_QUERY_URL);
  if (!response.ok) {
    throw new Error(`Sanity returned ${response.status}`);
  }

  const data = (await response.json()) as { result?: SitemapProject[] };
  const projects = Array.isArray(data.result) ? data.result : [];
  const today = new Date().toISOString().slice(0, 10);

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changefreq }) =>
    urlEntry(`${origin}${path}`, today, changefreq, priority),
  );
  const projectEntries = projects.flatMap(({ slug, updatedAt }) => {
    if (!slug) return [];
    const lastmod = /^\d{4}-\d{2}-\d{2}/.test(updatedAt ?? "") ? updatedAt!.slice(0, 10) : today;
    return [urlEntry(`${origin}/projects/${encodeURIComponent(slug)}`, lastmod, "monthly", "0.8")];
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...projectEntries].join("\n")}\n</urlset>\n`;
}

function sitemapResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": `public, max-age=0, s-maxage=${ONE_HOUR}`,
    },
  });
}

async function handleSitemap(request: Request, ctx: ExecutionContext): Promise<Response> {
  const cache = (caches as unknown as { default: Cache }).default;
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const xml = await createSitemap(new URL(request.url).origin);
    const response = sitemapResponse(xml);
    ctx.waitUntil(cache.put(request, response.clone()));
    return response;
  } catch (error) {
    console.error("Unable to generate sitemap", error);
    return new Response("Unable to generate sitemap", { status: 502 });
  }
}

// --- Social/search crawler meta tag injection -----------------------------------------
//
// This is a CSR SPA: react-helmet-async (src/components/ui/SEO.tsx) injects per-page
// <title>/og:*/twitter:* tags client-side after React hydrates. Crawlers that don't run
// JS (Facebook, X/Twitter, WhatsApp, LinkedIn, Slack, Discord, etc.) only ever see the
// raw index.html, which carries none of that — shared links show a blank/generic card
// regardless of which page was shared. This section detects those crawlers by User-Agent
// and rewrites the static HTML's <head> with the real per-route title/description/image
// before it's served, using the same Sanity content the client would eventually render.
// Regular browsers are untouched (env.ASSETS.fetch passthrough), so react-helmet-async's
// client-side behavior is unaffected and nothing gets double-rendered.

const STUDIO_NAME = "Pelmot Creativity";
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
const OG_IMAGE_PARAMS = "w=1200&h=630&fit=crop&auto=format";

const CRAWLER_UA_PATTERN =
  /facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|redditbot|pinterest|google-inspectiontool|googlebot|bingbot|duckduckbot|applebot|skypeuripreview|vkshare|yandexbot|w3c_validator|iframely|embedly|quora link preview|nuzzel|outbrain|bitrix|tumblr/i;

function isCrawlerRequest(request: Request): boolean {
  return CRAWLER_UA_PATTERN.test(request.headers.get("User-Agent") ?? "");
}

interface PageSeoDefault {
  seoTitle: string;
  seoDescription: string;
}

const PAGE_SEO_DEFAULTS: Record<string, PageSeoDefault> = {
  home: {
    seoTitle: "Architecture & Interiors",
    seoDescription:
      "Pelmot Creativity is a studio designing quiet, material-honest residential, commercial, and landscape architecture worldwide.",
  },
  about: {
    seoTitle: "About",
    seoDescription:
      "Learn about Pelmot Creativity — our design philosophy, experience, education, and awards.",
  },
  services: {
    seoTitle: "Services",
    seoDescription:
      "Architectural design, interior design, landscape design, renovation, visualization, and consultation services from Pelmot Creativity.",
  },
  projects: {
    seoTitle: "Projects",
    seoDescription:
      "Browse residential, commercial, interior, landscape, and concept architecture projects by Pelmot Creativity.",
  },
  contact: {
    seoTitle: "Contact",
    seoDescription:
      "Get in touch with Pelmot Creativity to discuss your next architecture, interior, or landscape project.",
  },
  privacy: {
    seoTitle: "Privacy Policy",
    seoDescription: "How Pelmot Creativity collects, uses, and protects your information.",
  },
};

const PAGE_KEY_BY_PATH: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/projects": "projects",
  "/contact": "contact",
  "/privacy": "privacy",
};

const SETTINGS_SEO_QUERY_URL = sanityQueryUrl(`*[_type == "siteSettings"][0]{
  "home": {"seoTitle": pageContent.home.seoTitle.en, "seoDescription": pageContent.home.seoDescription.en, "image": homeHeroImage.asset->url},
  "about": {"seoTitle": pageContent.about.seoTitle.en, "seoDescription": pageContent.about.seoDescription.en, "image": aboutHeroImage.asset->url},
  "services": {"seoTitle": pageContent.services.seoTitle.en, "seoDescription": pageContent.services.seoDescription.en, "image": servicesHeroImage.asset->url},
  "projects": {"seoTitle": pageContent.projects.seoTitle.en, "seoDescription": pageContent.projects.seoDescription.en, "image": projectsHeroImage.asset->url},
  "contact": {"seoTitle": pageContent.contact.seoTitle.en, "seoDescription": pageContent.contact.seoDescription.en, "image": contactHeroImage.asset->url}
}`);

interface SeoMeta {
  title: string;
  description: string;
  image: string;
}

interface RawPageSeo {
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
}

function toOgImage(rawUrl: string | undefined): string {
  return rawUrl ? `${rawUrl}?${OG_IMAGE_PARAMS}` : DEFAULT_OG_IMAGE;
}

async function fetchStaticPageSeo(pageKey: string): Promise<SeoMeta> {
  const defaults = PAGE_SEO_DEFAULTS[pageKey];
  try {
    const response = await fetch(SETTINGS_SEO_QUERY_URL);
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = (await response.json()) as { result?: Record<string, RawPageSeo> };
    const page = data.result?.[pageKey] ?? {};
    return {
      title: page.seoTitle || defaults.seoTitle,
      description: page.seoDescription || defaults.seoDescription,
      image: toOgImage(page.image),
    };
  } catch (error) {
    console.error(`Unable to fetch SEO data for ${pageKey}`, error);
    return { title: defaults.seoTitle, description: defaults.seoDescription, image: DEFAULT_OG_IMAGE };
  }
}

interface RawProjectSeo {
  title?: string;
  excerpt?: string;
  image?: string;
}

async function fetchProjectSeo(slug: string): Promise<SeoMeta | null> {
  const url = sanityQueryUrl(
    '*[_type == "project" && slug.current == $slug][0]{ title, "excerpt": excerpt.en, "image": coverImage.asset->url }',
    { slug },
  );
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = (await response.json()) as { result?: RawProjectSeo };
    const project = data.result;
    if (!project?.title) return null;
    return {
      title: project.title,
      description: project.excerpt || PAGE_SEO_DEFAULTS.projects.seoDescription,
      image: toOgImage(project.image),
    };
  } catch (error) {
    console.error(`Unable to fetch SEO data for project ${slug}`, error);
    return null;
  }
}

function buildMetaTagsHtml(meta: SeoMeta, canonicalUrl: string, fullTitle: string): string {
  return [
    `<link rel="canonical" href="${escapeText(canonicalUrl)}">`,
    `<meta name="description" content="${escapeText(meta.description)}">`,
    `<meta property="og:title" content="${escapeText(fullTitle)}">`,
    `<meta property="og:description" content="${escapeText(meta.description)}">`,
    `<meta property="og:url" content="${escapeText(canonicalUrl)}">`,
    `<meta property="og:image" content="${escapeText(meta.image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeText(fullTitle)}">`,
    `<meta name="twitter:description" content="${escapeText(meta.description)}">`,
    `<meta name="twitter:image" content="${escapeText(meta.image)}">`,
  ].join("\n    ");
}

function isKnownSeoRoute(pathname: string): boolean {
  return pathname in PAGE_KEY_BY_PATH || /^\/projects\/[^/]+$/.test(pathname);
}

async function handleCrawlerSeoInjection(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  pathname: string,
): Promise<Response> {
  const cache = (caches as unknown as { default: Cache }).default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const pageKey = PAGE_KEY_BY_PATH[pathname];
  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)$/);

  const meta = pageKey
    ? await fetchStaticPageSeo(pageKey)
    : projectSlugMatch
      ? await fetchProjectSeo(decodeURIComponent(projectSlugMatch[1]))
      : null;

  const baseResponse = await env.ASSETS.fetch(request);
  if (!meta) return baseResponse;

  const fullTitle = `${meta.title} — ${STUDIO_NAME}`;
  const canonicalUrl = `${new URL(request.url).origin}${pathname}`;
  const tagsHtml = buildMetaTagsHtml(meta, canonicalUrl, fullTitle);

  const rewritten = new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(fullTitle);
      },
    })
    .on("head", {
      element(element) {
        element.append(tagsHtml, { html: true });
      },
    })
    .transform(baseResponse);

  const response = new Response(rewritten.body, rewritten);
  response.headers.set("Cache-Control", `public, max-age=0, s-maxage=${ONE_HOUR}`);
  ctx.waitUntil(cache.put(request, response.clone()));
  return response;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/sitemap.xml") {
      return handleSitemap(request, ctx);
    }

    if (isCrawlerRequest(request) && isKnownSeoRoute(pathname)) {
      return handleCrawlerSeoInjection(request, env, ctx, pathname);
    }

    return env.ASSETS.fetch(request);
  },
};
