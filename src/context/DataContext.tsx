import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sanityClient, imageUrl, splitParagraphs } from "@/lib/sanity";
import type { Project, SiteData } from "@/data/types";

const PROJECTS_QUERY = `*[_type == "project"] | order(year desc){
  title,
  "slug": slug.current,
  category,
  location,
  year,
  area,
  client,
  status,
  featured,
  coverImage,
  excerpt,
  description,
  challenge,
  solution,
  gallery,
  floorPlans,
  renders,
  materials
}`;

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(doc: any): Project {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    location: doc.location ?? "",
    year: doc.year,
    area: doc.area ?? "",
    client: doc.client ?? "",
    status: doc.status ?? "Completed",
    featured: !!doc.featured,
    cover: imageUrl(doc.coverImage, 1600),
    heroImage: imageUrl(doc.coverImage, 2400),
    excerpt: doc.excerpt ?? "",
    description: splitParagraphs(doc.description),
    challenge: doc.challenge ?? "",
    solution: doc.solution ?? "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gallery: (doc.gallery ?? []).map((img: any) => imageUrl(img, 1600)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    floorPlans: (doc.floorPlans ?? []).map((img: any) => imageUrl(img, 1800)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renders: (doc.renders ?? []).map((img: any) => imageUrl(img, 1600)),
    materials: doc.materials ?? [],
  };
}

const DataContext = createContext<SiteData | null>(null);

function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center bg-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl text-bone uppercase"
        >
          Pelmot Creativity
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <p className="font-serif text-2xl text-ink">Couldn't load the site content</p>
      <p className="max-w-md text-sm text-stone">{message}</p>
    </div>
  );
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      sanityClient.fetch(PROJECTS_QUERY),
      sanityClient.fetch(SETTINGS_QUERY),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]).then(([rawProjects, settings]: [any[], any]) => {
      if (cancelled) return;
      if (!settings) {
        setError("Site settings haven't been published in Sanity yet.");
        return;
      }
      setData({
        architect: {
          name: settings.name,
          studio: settings.name,
          title: settings.title,
          tagline: settings.tagline,
          location: settings.location,
          photo: imageUrl(settings.founderPhoto, 1400),
          email: settings.email,
          phone: settings.phone,
          address: settings.address,
          social: settings.social ?? { instagram: "", linkedin: "", behance: "", x: "" },
        },
        bio: {
          paragraphs: splitParagraphs(settings.bioParagraphs),
          philosophy: settings.philosophy ?? [],
        },
        timeline: settings.timeline ?? [],
        skills: settings.skills ?? [],
        software: settings.software ?? [],
        awards: settings.awards ?? [],
        services: settings.services ?? [],
        testimonials: settings.testimonials ?? [],
        projects: rawProjects.map(mapProject),
      });
    }).catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err.message : String(err));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSiteData must be used within DataProvider");
  return ctx;
}
