export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Landscape"
  | "Concept";

export const categories: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Interior",
  "Landscape",
  "Concept",
];

export interface ProjectMaterial {
  name: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  area: string;
  client: string;
  status: "Completed" | "In Progress" | "Concept";
  featured?: boolean;
  cover: string;
  heroImage: string;
  excerpt: string;
  description: string[];
  challenge: string;
  solution: string;
  gallery: string[];
  floorPlans: string[];
  renders: string[];
  materials: ProjectMaterial[];
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SoftwareItem {
  name: string;
  category: string;
}

export interface Award {
  year: string;
  title: string;
  organization: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  points: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  behance: string;
  x: string;
}

export interface HeroImages {
  home: string;
  about: string;
  projects: string;
  services: string;
  contact: string;
}

export interface Architect {
  name: string;
  studio: string;
  title: string;
  tagline: string;
  location: string;
  founderPhoto: string;
  studioPhoto: string;
  email: string;
  phone: string;
  address: string;
  social: SocialLinks;
}

export interface Philosophy {
  title: string;
  text: string;
}

export interface Bio {
  paragraphs: string[];
  philosophy: Philosophy[];
}

export interface HomePageContent {
  heroBadge: string;
  heroTaglineSuffix: string;
  quote: string;
  selectedWork: string;
  featuredProjectsTitle: string;
  featuredProjectsDescription: string;
  theStudio: string;
  studioHeading: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
}

export interface AboutPageContent {
  aboutTheStudio: string;
  biography: string;
  designAsAct: string;
  designPhilosophy: string;
  career: string;
  experienceEducation: string;
  expertise: string;
  coreSkills: string;
  toolkit: string;
  softwareTitle: string;
  softwareDescription: string;
  recognition: string;
  awardsTitle: string;
  ctaTitle: string;
  ctaDescription: string;
}

export interface ServicesPageContent {
  whatWeDo: string;
  title: string;
  description: string;
  ctaTitle: string;
  ctaDescription: string;
}

export interface ProjectsPageContent {
  portfolio: string;
  selectedProjects: string;
  description: string;
}

export interface ContactPageContent {
  getInTouch: string;
  letsStart: string;
  description: string;
  contactDetails: string;
  followTheStudio: string;
}

export interface PageContent {
  home: HomePageContent;
  about: AboutPageContent;
  services: ServicesPageContent;
  projects: ProjectsPageContent;
  contact: ContactPageContent;
}

export interface SiteData {
  architect: Architect;
  heroImages: HeroImages;
  pageContent: PageContent;
  bio: Bio;
  timeline: TimelineItem[];
  skills: Skill[];
  software: SoftwareItem[];
  awards: Award[];
  services: Service[];
  testimonials: Testimonial[];
  projects: Project[];
}
