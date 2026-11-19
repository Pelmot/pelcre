import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://pelmot-creativity.com";
// Brand name shown in the browser tab and link previews (independent of the architect
// name stored in Sanity, which is still used for on-page headings).
const SITE_NAME = "Revak_ArchDesign";
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  const { pathname } = useLocation();
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
