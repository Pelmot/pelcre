import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sanityClient, imageUrl, splitParagraphs } from "@/lib/sanity";
import { useLanguage } from "@/context/LanguageContext";
import type { SupportedLanguage } from "@/i18n";
import {
  HOME_SECTION_TYPES,
  ABOUT_SECTION_TYPES,
  SERVICES_SECTION_TYPES,
  CONTACT_SECTION_TYPES,
  type Project,
  type SiteData,
  type HomeSectionType,
  type AboutSectionType,
  type ServicesSectionType,
  type ContactSectionType,
} from "@/data/types";

const PROJECT_FIELDS = `
  title,
  "slug": slug.current,
  "category": category->{_id, name},
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
`;

const PROJECTS_QUERY = `*[_type == "project"] | order(year desc){${PROJECT_FIELDS}}`;

const CATEGORIES_QUERY = `*[_type == "projectCategory"] | order(order asc){_id, name}`;

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  ...,
  homeFeaturedProjects[]->{${PROJECT_FIELDS}}
}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickLocale(field: any, lang: SupportedLanguage): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field.en ?? "";
}

const DEFAULT_HOME_SECTIONS: HomeSectionType[] = [
  "homeIntroQuoteSection",
  "homeFeaturedProjectsSection",
  "homeAboutPreviewSection",
  "homeTestimonialsSection",
  "homeCtaSection",
];

const DEFAULT_ABOUT_SECTIONS: AboutSectionType[] = [
  "aboutBiographySection",
  "aboutTimelineSection",
  "aboutSkillsSection",
  "aboutSoftwareSection",
  "aboutAwardsSection",
  "aboutCtaSection",
];

const DEFAULT_SERVICES_SECTIONS: ServicesSectionType[] = ["servicesCtaSection"];

const DEFAULT_CONTACT_SECTIONS: ContactSectionType[] = [
  "contactDetailsSection",
  "contactSocialLinksSection",
  "contactStudioMapSection",
];

// Sanity array items only carry `_type` (the block acts as a marker, not a content container) —
// content still comes from the existing siteSettings/project data. `raw == null` (field never
// touched in Studio) falls back to the default order; an explicit empty array means the site
// owner intentionally removed every section, and that must be respected, not overridden.
function pickSections<T extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any[] | null | undefined,
  validTypes: T[],
  fallback: T[],
): T[] {
  if (raw == null) return fallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return raw.map((item: any) => item._type).filter((type): type is T => validTypes.includes(type));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(doc: any, lang: SupportedLanguage): Project {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category?._id ?? "",
    categoryName: pickLocale(doc.category?.name, lang),
    location: doc.location ?? "",
    year: doc.year,
    area: doc.area ?? "",
    client: doc.client ?? "",
    status: doc.status ?? "Completed",
    featured: !!doc.featured,
    cover: imageUrl(doc.coverImage, 1600),
    heroImage: imageUrl(doc.coverImage, 2400),
    excerpt: pickLocale(doc.excerpt, lang),
    description: splitParagraphs(pickLocale(doc.description, lang)),
    challenge: pickLocale(doc.challenge, lang),
    solution: pickLocale(doc.solution, lang),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gallery: (doc.gallery ?? []).map((img: any) => imageUrl(img, 1600)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    floorPlans: (doc.floorPlans ?? []).map((img: any) => imageUrl(img, 1800)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renders: (doc.renders ?? []).map((img: any) => imageUrl(img, 1600)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    materials: (doc.materials ?? []).map((m: any) => ({
      name: pickLocale(m.name, lang),
      detail: pickLocale(m.detail, lang),
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSiteData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawProjects: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawCategories: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any,
  lang: SupportedLanguage,
): SiteData {
  return {
    architect: {
      name: settings.name,
      studio: settings.name,
      title: pickLocale(settings.title, lang),
      tagline: pickLocale(settings.tagline, lang),
      location: pickLocale(settings.location, lang),
      founderPhoto: imageUrl(settings.founderPhoto, 1400),
      studioPhoto: imageUrl(settings.studioPhoto, 1400),
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      social: settings.social ?? { instagram: "", linkedin: "", behance: "", x: "" },
    },
    heroImages: {
      home: settings.homeHeroImage ? imageUrl(settings.homeHeroImage, 2400) : "",
      about: settings.aboutHeroImage ? imageUrl(settings.aboutHeroImage, 2400) : "",
      projects: settings.projectsHeroImage ? imageUrl(settings.projectsHeroImage, 2400) : "",
      services: settings.servicesHeroImage ? imageUrl(settings.servicesHeroImage, 2400) : "",
      contact: settings.contactHeroImage ? imageUrl(settings.contactHeroImage, 2400) : "",
    },
    pageContent: {
      home: {
        seoTitle: pickLocale(settings.pageContent?.home?.seoTitle, lang),
        seoDescription: pickLocale(settings.pageContent?.home?.seoDescription, lang),
        heroBadge: pickLocale(settings.pageContent?.home?.heroBadge, lang),
        heroTaglineSuffix: pickLocale(settings.pageContent?.home?.heroTaglineSuffix, lang),
        quote: pickLocale(settings.pageContent?.home?.quote, lang),
        selectedWork: pickLocale(settings.pageContent?.home?.selectedWork, lang),
        featuredProjectsTitle: pickLocale(settings.pageContent?.home?.featuredProjectsTitle, lang),
        featuredProjectsDescription: pickLocale(settings.pageContent?.home?.featuredProjectsDescription, lang),
        theStudio: pickLocale(settings.pageContent?.home?.theStudio, lang),
        studioHeading: pickLocale(settings.pageContent?.home?.studioHeading, lang),
        ctaEyebrow: pickLocale(settings.pageContent?.home?.ctaEyebrow, lang),
        ctaTitle: pickLocale(settings.pageContent?.home?.ctaTitle, lang),
        ctaDescription: pickLocale(settings.pageContent?.home?.ctaDescription, lang),
      },
      about: {
        seoTitle: pickLocale(settings.pageContent?.about?.seoTitle, lang),
        seoDescription: pickLocale(settings.pageContent?.about?.seoDescription, lang),
        aboutTheStudio: pickLocale(settings.pageContent?.about?.aboutTheStudio, lang),
        biography: pickLocale(settings.pageContent?.about?.biography, lang),
        designAsAct: pickLocale(settings.pageContent?.about?.designAsAct, lang),
        designPhilosophy: pickLocale(settings.pageContent?.about?.designPhilosophy, lang),
        career: pickLocale(settings.pageContent?.about?.career, lang),
        experienceEducation: pickLocale(settings.pageContent?.about?.experienceEducation, lang),
        expertise: pickLocale(settings.pageContent?.about?.expertise, lang),
        coreSkills: pickLocale(settings.pageContent?.about?.coreSkills, lang),
        toolkit: pickLocale(settings.pageContent?.about?.toolkit, lang),
        softwareTitle: pickLocale(settings.pageContent?.about?.softwareTitle, lang),
        softwareDescription: pickLocale(settings.pageContent?.about?.softwareDescription, lang),
        recognition: pickLocale(settings.pageContent?.about?.recognition, lang),
        awardsTitle: pickLocale(settings.pageContent?.about?.awardsTitle, lang),
        ctaTitle: pickLocale(settings.pageContent?.about?.ctaTitle, lang),
        ctaDescription: pickLocale(settings.pageContent?.about?.ctaDescription, lang),
      },
      services: {
        seoTitle: pickLocale(settings.pageContent?.services?.seoTitle, lang),
        seoDescription: pickLocale(settings.pageContent?.services?.seoDescription, lang),
        whatWeDo: pickLocale(settings.pageContent?.services?.whatWeDo, lang),
        title: pickLocale(settings.pageContent?.services?.title, lang),
        description: pickLocale(settings.pageContent?.services?.description, lang),
        ctaTitle: pickLocale(settings.pageContent?.services?.ctaTitle, lang),
        ctaDescription: pickLocale(settings.pageContent?.services?.ctaDescription, lang),
      },
      projects: {
        seoTitle: pickLocale(settings.pageContent?.projects?.seoTitle, lang),
        seoDescription: pickLocale(settings.pageContent?.projects?.seoDescription, lang),
        portfolio: pickLocale(settings.pageContent?.projects?.portfolio, lang),
        selectedProjects: pickLocale(settings.pageContent?.projects?.selectedProjects, lang),
        description: pickLocale(settings.pageContent?.projects?.description, lang),
      },
      contact: {
        seoTitle: pickLocale(settings.pageContent?.contact?.seoTitle, lang),
        seoDescription: pickLocale(settings.pageContent?.contact?.seoDescription, lang),
        getInTouch: pickLocale(settings.pageContent?.contact?.getInTouch, lang),
        letsStart: pickLocale(settings.pageContent?.contact?.letsStart, lang),
        description: pickLocale(settings.pageContent?.contact?.description, lang),
        contactDetails: pickLocale(settings.pageContent?.contact?.contactDetails, lang),
        followTheStudio: pickLocale(settings.pageContent?.contact?.followTheStudio, lang),
      },
    },
    sectionOrder: {
      home: pickSections(settings.sectionOrder?.home, HOME_SECTION_TYPES, DEFAULT_HOME_SECTIONS),
      about: pickSections(settings.sectionOrder?.about, ABOUT_SECTION_TYPES, DEFAULT_ABOUT_SECTIONS),
      services: pickSections(settings.sectionOrder?.services, SERVICES_SECTION_TYPES, DEFAULT_SERVICES_SECTIONS),
      contact: pickSections(settings.sectionOrder?.contact, CONTACT_SECTION_TYPES, DEFAULT_CONTACT_SECTIONS),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    homeFeaturedProjects: (settings.homeFeaturedProjects ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((doc: any) => doc && doc.slug)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((doc: any) => mapProject(doc, lang)),
    categories: rawCategories.map((doc) => ({
      id: doc._id,
      name: pickLocale(doc.name, lang),
    })),
    bio: {
      paragraphs: splitParagraphs(pickLocale(settings.bioParagraphs, lang)),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      philosophy: (settings.philosophy ?? []).map((item: any) => ({
        title: pickLocale(item.title, lang),
        text: pickLocale(item.text, lang),
      })),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeline: (settings.timeline ?? []).map((item: any) => ({
      year: item.year,
      title: pickLocale(item.title, lang),
      place: item.place,
      description: pickLocale(item.description, lang),
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: (settings.skills ?? []).map((item: any) => ({
      name: pickLocale(item.name, lang),
      level: item.level,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    software: (settings.software ?? []).map((item: any) => ({
      name: item.name,
      category: pickLocale(item.category, lang),
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    awards: (settings.awards ?? []).map((item: any) => ({
      year: item.year,
      title: pickLocale(item.title, lang),
      organization: item.organization,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    services: (settings.services ?? []).map((item: any) => ({
      icon: item.icon,
      title: pickLocale(item.title, lang),
      description: pickLocale(item.description, lang),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      points: (item.points ?? []).map((p: any) => pickLocale(p, lang)),
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testimonials: (settings.testimonials ?? []).map((item: any) => ({
      name: item.name,
      role: pickLocale(item.role, lang),
      quote: pickLocale(item.quote, lang),
    })),
    projects: rawProjects.map((doc) => mapProject(doc, lang)),
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

interface RawData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawProjects: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawCategories: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [raw, setRaw] = useState<RawData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      sanityClient.fetch(PROJECTS_QUERY),
      sanityClient.fetch(CATEGORIES_QUERY),
      sanityClient.fetch(SETTINGS_QUERY),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]).then(([rawProjects, rawCategories, settings]: [any[], any[], any]) => {
      if (cancelled) return;
      if (!settings) {
        setError("Site settings haven't been published in Sanity yet.");
        return;
      }
      setRaw({ rawProjects, rawCategories, settings });
    }).catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err.message : String(err));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const data = useMemo(
    () => (raw ? buildSiteData(raw.rawProjects, raw.rawCategories, raw.settings, language) : null),
    [raw, language],
  );

  if (error) return <ErrorScreen message={error} />;
  if (!data) return <LoadingScreen />;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSiteData must be used within DataProvider");
  return ctx;
}
