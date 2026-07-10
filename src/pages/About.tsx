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
import type { Award, Philosophy, Skill, SoftwareItem, TimelineItem } from "@/data/types";

const ABOUT_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80";

function BiographySection({
  founderPhoto,
  portraitAlt,
  biographyEyebrow,
  headline,
  paragraphs,
  philosophyEyebrow,
  philosophy,
}: {
  founderPhoto: string;
  portraitAlt: string;
  biographyEyebrow: string;
  headline: string;
  paragraphs: string[];
  philosophyEyebrow: string;
  philosophy: Philosophy[];
}) {
  return (
    <section className="container-lux grid gap-16 py-28 sm:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <ScrollReveal>
        <div className="sticky top-32">
          <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-mist">
            <img
              src={founderPhoto}
              alt={portraitAlt}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </ScrollReveal>
      <div>
        <p className="mb-4 text-xs font-medium tracking-[0.3em] text-stone uppercase">{biographyEyebrow}</p>
        <h2 className="font-serif text-4xl leading-[1.1] font-medium text-balance text-ink sm:text-5xl dark:text-bone">
          {headline}
        </h2>
        <div className="mt-8 space-y-6">
          {paragraphs.map((p) => (
            <ScrollReveal key={p}>
              <p className="max-w-xl leading-relaxed text-stone">{p}</p>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-8 text-xs font-medium tracking-[0.3em] text-stone uppercase">{philosophyEyebrow}</p>
          <ScrollRevealGroup className="grid gap-8 sm:grid-cols-3">
            {philosophy.map((item) => (
              <ScrollRevealItem key={item.title}>
                <h3 className="font-serif text-xl text-ink dark:text-bone">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{item.text}</p>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: TimelineItem[] }) {
  return (
    <section className="bg-linen py-28 sm:py-36 dark:bg-ink-soft">
      <div className="container-lux">
        <SectionTitle eyebrow={eyebrow} title={title} className="mb-16" />
        <Timeline items={items} />
      </div>
    </section>
  );
}

function SkillsSection({ eyebrow, title, skills }: { eyebrow: string; title: string; skills: Skill[] }) {
  return (
    <section className="container-lux py-28 sm:py-36">
      <SectionTitle eyebrow={eyebrow} title={title} className="mb-12" />
      <SkillBars skills={skills} />
    </section>
  );
}

function SoftwareSection({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: SoftwareItem[];
}) {
  return (
    <section className="container-lux py-28 sm:py-36">
      <SectionTitle eyebrow={eyebrow} title={title} description={description} className="mb-12" />
      <SoftwareGrid items={items} />
    </section>
  );
}

// Rendered instead of SkillsSection + SoftwareSection whenever the two sit next to each
// other in sectionOrder.about, so they keep sharing one side-by-side row (matching the
// original design) rather than each taking a full-width section of their own.
function SkillsAndSoftwareSection({
  skillsFirst,
  skillsEyebrow,
  skillsTitle,
  skills,
  softwareEyebrow,
  softwareTitle,
  softwareDescription,
  software,
}: {
  skillsFirst: boolean;
  skillsEyebrow: string;
  skillsTitle: string;
  skills: Skill[];
  softwareEyebrow: string;
  softwareTitle: string;
  softwareDescription: string;
  software: SoftwareItem[];
}) {
  const skillsColumn = (
    <div>
      <SectionTitle eyebrow={skillsEyebrow} title={skillsTitle} className="mb-12" />
      <SkillBars skills={skills} />
    </div>
  );
  const softwareColumn = (
    <div>
      <SectionTitle
        eyebrow={softwareEyebrow}
        title={softwareTitle}
        description={softwareDescription}
        className="mb-12"
      />
    </div>
  );
  return (
    <section className="container-lux py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {skillsFirst ? skillsColumn : softwareColumn}
        {skillsFirst ? softwareColumn : skillsColumn}
      </div>
      <div className="mt-4">
        <SoftwareGrid items={software} />
      </div>
    </section>
  );
}

function AwardsSection({ eyebrow, title, awards }: { eyebrow: string; title: string; awards: Award[] }) {
  return (
    <section className="container-lux py-28 sm:py-36">
      <SectionTitle eyebrow={eyebrow} title={title} className="mb-14" />
      <AwardsList awards={awards} />
    </section>
  );
}

export function About() {
  const { t } = useTranslation();
  const { architect, heroImages, pageContent, sectionOrder, bio, timeline, skills, software, awards } =
    useSiteData();
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

      {(() => {
        const nodes = [];
        const order = sectionOrder.about;
        for (let i = 0; i < order.length; i++) {
          const type = order[i];
          const next = order[i + 1];
          const key = `${type}-${i}`;

          // Keep Skills and Software side by side (like the original layout) whenever
          // they're next to each other in the order, in whichever direction.
          if (
            (type === "aboutSkillsSection" && next === "aboutSoftwareSection") ||
            (type === "aboutSoftwareSection" && next === "aboutSkillsSection")
          ) {
            nodes.push(
              <SkillsAndSoftwareSection
                key={`${type}-${next}-${i}`}
                skillsFirst={type === "aboutSkillsSection"}
                skillsEyebrow={pc.expertise || t("about.expertise")}
                skillsTitle={pc.coreSkills || t("about.coreSkills")}
                skills={skills}
                softwareEyebrow={pc.toolkit || t("about.toolkit")}
                softwareTitle={pc.softwareTitle || t("about.softwareTitle")}
                softwareDescription={pc.softwareDescription || t("about.softwareDescription")}
                software={software}
              />,
            );
            i++;
            continue;
          }

          switch (type) {
            case "aboutBiographySection":
              nodes.push(
                <BiographySection
                  key={key}
                  founderPhoto={architect.founderPhoto}
                  portraitAlt={t("about.portraitAlt", { name: architect.name })}
                  biographyEyebrow={pc.biography || t("about.biography")}
                  headline={pc.designAsAct || t("about.designAsAct")}
                  paragraphs={bio.paragraphs}
                  philosophyEyebrow={pc.designPhilosophy || t("about.designPhilosophy")}
                  philosophy={bio.philosophy}
                />,
              );
              break;
            case "aboutTimelineSection":
              nodes.push(
                <TimelineSection
                  key={key}
                  eyebrow={pc.career || t("about.career")}
                  title={pc.experienceEducation || t("about.experienceEducation")}
                  items={timeline}
                />,
              );
              break;
            case "aboutSkillsSection":
              nodes.push(
                <SkillsSection
                  key={key}
                  eyebrow={pc.expertise || t("about.expertise")}
                  title={pc.coreSkills || t("about.coreSkills")}
                  skills={skills}
                />,
              );
              break;
            case "aboutSoftwareSection":
              nodes.push(
                <SoftwareSection
                  key={key}
                  eyebrow={pc.toolkit || t("about.toolkit")}
                  title={pc.softwareTitle || t("about.softwareTitle")}
                  description={pc.softwareDescription || t("about.softwareDescription")}
                  items={software}
                />,
              );
              break;
            case "aboutAwardsSection":
              nodes.push(
                <AwardsSection
                  key={key}
                  eyebrow={pc.recognition || t("about.recognition")}
                  title={pc.awardsTitle || t("about.awardsTitle")}
                  awards={awards}
                />,
              );
              break;
            case "aboutCtaSection":
              nodes.push(
                <CTASection
                  key={key}
                  title={pc.ctaTitle || t("about.ctaTitle")}
                  description={pc.ctaDescription || t("about.ctaDescription")}
                  buttonLabel={t("about.startAProject")}
                  buttonTo="/contact"
                />,
              );
              break;
          }
        }
        return nodes;
      })()}
    </>
  );
}
