import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTASection } from "@/components/ui/CTASection";
import { SEO } from "@/components/ui/SEO";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Testimonials } from "@/components/ui/Testimonials";
import { useSiteData } from "@/context/DataContext";

const HOME_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80";

export function Home() {
  const { t } = useTranslation();
  const { architect, heroImages, pageContent, bio, testimonials, projects } = useSiteData();
  const pc = pageContent.home;
  const featuredProjects = projects.filter((p) => p.featured);
  const heroImage = heroImages.home || HOME_HERO_FALLBACK;

  return (
    <>
      <SEO
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        image={heroImage}
      />

      {/* Hero */}
      <section className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-ink">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          src={heroImage}
          alt="Meridian House, a minimalist concrete residence overlooking the coast"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-ink/45" />

        <div className="container-lux relative z-10 pb-20 sm:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-block rounded-full bg-[#9FA3AD] px-4 py-1.5 text-xs font-medium tracking-[0.35em] text-ink uppercase"
          >
            {pc.heroBadge || t("home.heroBadge")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-serif text-6xl leading-[1.02] font-medium text-balance text-bone sm:text-7xl lg:text-8xl"
          >
            {architect.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-base leading-relaxed text-mist sm:text-lg"
          >
            {architect.tagline} {pc.heroTaglineSuffix || t("home.heroTaglineSuffix")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11"
          >
            <Button to="/projects" className="!bg-bone !text-ink hover:!bg-gold-soft">
              {t("home.viewProjects")}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute end-8 bottom-8 hidden text-mist sm:block"
        >
          <ChevronDown className="animate-bounce" size={22} strokeWidth={1.25} />
        </motion.div>
      </section>

      {/* Intro strip */}
      <section className="container-lux py-28 sm:py-36">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl leading-snug text-balance text-ink sm:text-4xl dark:text-bone">
            "{pc.quote || t("home.quote")}"
          </p>
          <p className="mt-6 text-sm font-medium tracking-[0.2em] text-stone uppercase">
            {architect.name}, {architect.title}
          </p>
        </ScrollReveal>
      </section>

      {/* Featured projects */}
      <section className="container-lux pb-28 sm:pb-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <SectionTitle
            eyebrow={pc.selectedWork || t("home.selectedWork")}
            title={pc.featuredProjectsTitle || t("home.featuredProjectsTitle")}
            description={pc.featuredProjectsDescription || t("home.featuredProjectsDescription")}
          />
          <ScrollReveal delay={0.15}>
            <Button to="/projects" variant="outline" className="text-ink dark:text-bone">
              {t("home.allProjects")}
            </Button>
          </ScrollReveal>
        </div>

        <ScrollRevealGroup className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ScrollRevealItem key={project.slug}>
              <ProjectCard project={project} index={i} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* About preview */}
      <section className="container-lux grid gap-16 pb-28 sm:pb-36 lg:grid-cols-2 lg:gap-24">
        <ScrollReveal>
          <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-mist">
            <img
              src={architect.studioPhoto}
              alt={architect.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="flex flex-col justify-center">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-stone uppercase">
            {pc.theStudio || t("home.theStudio")}
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] font-medium text-balance text-ink sm:text-5xl dark:text-bone">
            {pc.studioHeading || t("home.studioHeading")}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-stone">
            {bio.paragraphs[0]}
          </p>
          <div className="mt-9">
            <Button to="/about" variant="outline" className="text-ink dark:text-bone">
              {t("home.aboutTheStudio")}
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonials */}
      <section className="bg-linen py-28 sm:py-36 dark:bg-ink-soft">
        <div className="container-lux">
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* Contact preview */}
      <CTASection
        eyebrow={pc.ctaEyebrow || t("home.ctaEyebrow")}
        title={pc.ctaTitle || t("home.ctaTitle")}
        description={pc.ctaDescription || t("home.ctaDescription")}
        buttonLabel={t("home.getInTouch")}
        buttonTo="/contact"
      />
    </>
  );
}
