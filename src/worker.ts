interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

interface SitemapProject {
  slug?: string;
  updatedAt?: string;
}

const SANITY_QUERY_URL = new URL(
  "https://cmdikf3a.apicdn.sanity.io/v2024-01-01/data/query/production",
);
SANITY_QUERY_URL.searchParams.set(
  "query",
  '*[_type == "project" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }',
);
SANITY_QUERY_URL.searchParams.set("perspective", "published");

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/services", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
];

const ONE_HOUR = 60 * 60;

function escapeXml(value: string): string {
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
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function createSitemap(origin: string): Promise<string> {
  const response = await fetch(SANITY_QUERY_URL);
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (new URL(request.url).pathname === "/sitemap.xml") {
      return handleSitemap(request, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};
