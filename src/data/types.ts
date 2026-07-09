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

export interface Architect {
  name: string;
  studio: string;
  title: string;
  tagline: string;
  location: string;
  photo: string;
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

export interface SiteData {
  architect: Architect;
  bio: Bio;
  timeline: TimelineItem[];
  skills: Skill[];
  software: SoftwareItem[];
  awards: Award[];
  services: Service[];
  testimonials: Testimonial[];
  projects: Project[];
}
