import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/ui/SEO";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MasonryGallery } from "@/components/projects/MasonryGallery";
import { CTASection } from "@/components/ui/CTASection";
import { getProjectBySlug, projects } from "@/data/projects";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const facts = [
    { label: "Location", value: project.location },
    { label: "Year", value: String(project.year) },
    { label: "Area", value: project.area },
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      <SEO
        title={project.title}
        description={project.excerpt}
        image={project.heroImage}
      />

      {/* Hero */}
      <section className="relative flex h-[85vh] min-h-[560px] items-end overflow-hidden bg-ink">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-ink/40" />

        <div className="container-lux relative z-10 pb-16 sm:pb-20">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-mist uppercase transition-colors hover:text-bone"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-gold-soft uppercase">
            {project.category} — {project.location}
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] font-medium text-balance text-bone sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Facts + description */}
      <section className="container-lux grid gap-16 py-28 sm:py-36 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <ScrollReveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-mist pt-8 sm:grid-cols-1">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium tracking-[0.2em] text-stone uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-ink dark:text-bone">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-stone uppercase">
              Overview
            </p>
          </ScrollReveal>
          <div className="space-y-6">
            {project.description.map((p) => (
              <ScrollReveal key={p}>
                <p className="leading-relaxed text-stone">{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-lux pb-28 sm:pb-36">
        <SectionTitle eyebrow="Gallery" title="Photography" className="mb-14" />
        <MasonryGallery images={project.gallery} title={project.title} />
      </section>

      {/* Challenge & Solution */}
      <section className="bg-linen py-28 sm:py-36 dark:bg-ink-soft">
        <div className="container-lux grid gap-12 sm:grid-cols-2 sm:gap-16">
          <ScrollReveal>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-gold uppercase">
              The Challenge
            </p>
            <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl dark:text-bone">
              {project.challenge}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-gold uppercase">
              The Solution
            </p>
            <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl dark:text-bone">
              {project.solution}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Floor plans */}
      <section className="container-lux py-28 sm:py-36">
        <SectionTitle eyebrow="Documentation" title="Floor Plans" className="mb-14" />
        <ScrollRevealGroup className="grid gap-8 sm:grid-cols-2">
          {project.floorPlans.map((src, i) => (
            <ScrollRevealItem key={src + i}>
              <div className="overflow-hidden rounded-lg border border-mist bg-linen dark:bg-ink-soft">
                <img
                  src={src}
                  alt={`${project.title} floor plan ${i + 1}`}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* Renders */}
      <section className="container-lux pb-28 sm:pb-36">
        <SectionTitle eyebrow="Visualization" title="Renders" className="mb-14" />
        <ScrollRevealGroup className="grid gap-8 sm:grid-cols-2">
          {project.renders.map((src, i) => (
            <ScrollRevealItem key={src + i}>
              <div className="aspect-16/10 overflow-hidden rounded-lg border border-mist bg-linen dark:bg-ink-soft">
                <img
                  src={src}
                  alt={`${project.title} render ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* Materials */}
      <section className="container-lux pb-28 sm:pb-36">
        <SectionTitle eyebrow="Specification" title="Materials" className="mb-14" />
        <div className="divide-y divide-mist border-t border-b border-mist">
          {project.materials.map((material, i) => (
            <ScrollReveal key={material.name} delay={i * 0.04}>
              <div className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-serif text-xl text-ink dark:text-bone">
                  {material.name}
                </p>
                <p className="text-sm text-stone sm:text-right">
                  {material.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Next project */}
      <Link
        to={`/projects/${nextProject.slug}`}
        className="group relative block h-[50vh] min-h-[380px] overflow-hidden bg-ink"
      >
        <img
          src={nextProject.cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="container-lux relative z-10 flex h-full flex-col items-center justify-center text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-gold-soft uppercase">
            Next Project
          </p>
          <h2 className="font-serif text-4xl text-bone sm:text-6xl">
            {nextProject.title}
          </h2>
          <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-mist text-bone transition-transform duration-500 group-hover:translate-x-2">
            <ArrowRight size={18} />
          </span>
        </div>
      </Link>

      <CTASection
        title="Imagining something similar?"
        description="Every commission begins with a conversation about your site and how you want to live within it."
        buttonLabel="Start a Conversation"
        buttonTo="/contact"
      />
    </>
  );
}
