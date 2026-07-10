import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SEO } from "@/components/ui/SEO";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Timeline } from "@/components/ui/Timeline";
import { SkillBars } from "@/components/ui/SkillBar";
import { SoftwareGrid } from "@/components/ui/SoftwareGrid";
import { AwardsList } from "@/components/ui/AwardsList";
import { CTASection } from "@/components/ui/CTASection";
import { useSiteData } from "@/context/DataContext";

const ABOUT_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80";

export function About() {
  const { t } = useTranslation();
  const { architect, heroImages, pageContent, bio, timeline, skills, software, awards } = useSiteData();
  const pc = pageContent.about;

  return (
    <>
      <SEO
        title={t("about.seoTitle")}
        description={t("about.seoDescription")}
      />

      <PageHero
        eyebrow={pc.aboutTheStudio || t("about.aboutTheStudio")}
        title={architect.name}
        description={`${architect.title} — ${architect.location}`}
        image={heroImages.about || ABOUT_HERO_FALLBACK}
      />

      {/* Biography */}
      <section className="container-lux grid gap-16 py-28 sm:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <ScrollReveal>
          <div className="sticky top-32">
            <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-mist">
              <img
                src={architect.founderPhoto}
                alt={t("about.portraitAlt", { name: architect.name })}
                loading="lazy"
                className="h-full w-full object-cover object-top grayscale"
              />
            </div>
          </div>
        </ScrollReveal>
        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-stone uppercase">
            {pc.biography || t("about.biography")}
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] font-medium text-balance text-ink sm:text-5xl dark:text-bone">
            {pc.designAsAct || t("about.designAsAct")}
          </h2>
          <div className="mt-8 space-y-6">
            {bio.paragraphs.map((p) => (
              <ScrollReveal key={p}>
                <p className="max-w-xl leading-relaxed text-stone">{p}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16">
            <p className="mb-8 text-xs font-medium tracking-[0.3em] text-stone uppercase">
              {pc.designPhilosophy || t("about.designPhilosophy")}
            </p>
            <ScrollRevealGroup className="grid gap-8 sm:grid-cols-3">
              {bio.philosophy.map((item) => (
                <ScrollRevealItem key={item.title}>
                  <h3 className="font-serif text-xl text-ink dark:text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {item.text}
                  </p>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section className="bg-linen py-28 sm:py-36 dark:bg-ink-soft">
        <div className="container-lux">
          <SectionTitle
            eyebrow={pc.career || t("about.career")}
            title={pc.experienceEducation || t("about.experienceEducation")}
            className="mb-16"
          />
          <Timeline items={timeline} />
        </div>
      </section>

      {/* Skills & Software */}
      <section className="container-lux py-28 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionTitle
              eyebrow={pc.expertise || t("about.expertise")}
              title={pc.coreSkills || t("about.coreSkills")}
              className="mb-12"
            />
            <SkillBars skills={skills} />
          </div>
          <div>
            <SectionTitle
              eyebrow={pc.toolkit || t("about.toolkit")}
              title={pc.softwareTitle || t("about.softwareTitle")}
              description={pc.softwareDescription || t("about.softwareDescription")}
              className="mb-12"
            />
          </div>
        </div>
        <div className="mt-4">
          <SoftwareGrid items={software} />
        </div>
      </section>

      {/* Awards */}
      <section className="container-lux pb-28 sm:pb-36">
        <SectionTitle
          eyebrow={pc.recognition || t("about.recognition")}
          title={pc.awardsTitle || t("about.awardsTitle")}
          className="mb-14"
        />
        <AwardsList awards={awards} />
      </section>

      <CTASection
        title={pc.ctaTitle || t("about.ctaTitle")}
        description={pc.ctaDescription || t("about.ctaDescription")}
        buttonLabel={t("about.startAProject")}
        buttonTo="/contact"
      />
    </>
  );
}
