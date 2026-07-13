import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

export const SANITY_PROJECT_ID = "cmdikf3a";
export const SANITY_DATASET = "production";

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const PLACEHOLDER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1200'><rect width='100%' height='100%' fill='#E0DFD2'/></svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_SVG)}`;

export function imageUrl(source: SanityImageSource | undefined, width: number): string {
  if (!source) return PLACEHOLDER_IMAGE;
  return urlFor(source).width(width).fit("crop").auto("format").url();
}

// Routes queries through our own domain (src/worker.ts's /api/sanity handler) instead of
// fetching cmdikf3a.apicdn.sanity.io directly from the browser. Direct cross-origin fetches
// are subject to CORS, which some in-app browsers (e.g. Instagram's embedded WebView) handle
// unreliably; a same-origin request sidesteps that entirely.
export async function sanityQuery<T = unknown>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const url = new URL("/api/sanity", window.location.origin);
  url.searchParams.set("query", query);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Sanity proxy returned ${response.status}`);
  }
  const data = (await response.json()) as { result: T };
  return data.result;
}

export function splitParagraphs(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
