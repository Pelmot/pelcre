import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SEO } from "@/components/ui/SEO";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Timeline } from "@/components/ui/Timeline";
import { SkillBars } from "@/components/ui/SkillBar";
import { SoftwareGrid } from "@/components/ui/SoftwareGrid";
import { AwardsList } from "@/components/ui/AwardsList";
import { CTASection } from "@/components/ui/CTASection";
import { architect, bio, timeline, skills, software, awards } from "@/data/content";

export function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Pelmot Creativity — our design philosophy, experience, education, and awards."
      />

      <PageHero
        eyebrow="About the Studio"
        title={architect.name}
        description={`${architect.title} — ${architect.location}`}
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80"
      />

      {/* Biography */}
      <section className="container-lux grid gap-16 py-28 sm:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <ScrollReveal>
          <div className="sticky top-32">
            <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-mist">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=1200&q=80"
                alt={`Portrait of ${architect.name}`}
                loading="lazy"
                className="h-full w-full object-cover object-top grayscale"
              />
            </div>
          </div>
        </ScrollReveal>
        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-stone uppercase">
            Biography
          </p>
          <h2 className="font-serif text-4xl leading-[1.1] font-medium text-balance text-ink sm:text-5xl dark:text-bone">
            Design as an act of listening.
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
              Design Philosophy
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
            eyebrow="Career"
            title="Experience & Education"
            className="mb-16"
          />
          <Timeline items={timeline} />
        </div>
      </section>

      {/* Skills & Software */}
      <section className="container-lux py-28 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionTitle eyebrow="Expertise" title="Core Skills" className="mb-12" />
            <SkillBars skills={skills} />
          </div>
          <div>
            <SectionTitle
              eyebrow="Toolkit"
              title="Software"
              description="The tools used daily across design, documentation, and visualization."
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
        <SectionTitle eyebrow="Recognition" title="Awards" className="mb-14" />
        <AwardsList awards={awards} />
      </section>

      <CTASection
        title="Ready to design something lasting?"
        description="Every project starts with a conversation about the site and how you want to live within it."
        buttonLabel="Start a Project"
        buttonTo="/contact"
      />
    </>
  );
}
