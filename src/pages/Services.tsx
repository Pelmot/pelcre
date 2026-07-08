import { Box, Compass, Hammer, MessageCircle, Sofa, Trees, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SEO } from "@/components/ui/SEO";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/ui/CTASection";
import { services } from "@/data/content";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  Compass,
  Sofa,
  Trees,
  Hammer,
  Box,
  MessageCircle,
};

export function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Architectural design, interior design, landscape design, renovation, visualization, and consultation services from Pelmot Creativity."
      />

      <PageHero
        eyebrow="What We Do"
        title="Services"
        description="From first sketch to final finish, Pelmot Creativity offers a full range of architectural and design services tailored to the scale of your project."
        image="https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=2400&q=80"
        short
      />

      <section className="container-lux py-28 sm:py-36">
        <div className="divide-y divide-mist">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? Compass;
            const reverse = i % 2 === 1;
            return (
              <div
                key={service.title}
                className={cn(
                  "grid gap-10 py-16 first:pt-0 sm:grid-cols-[auto_1fr_1.2fr] sm:items-center sm:gap-14",
                )}
              >
                <ScrollReveal className={cn("order-1", reverse && "sm:order-3")}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-mist text-gold">
                    <Icon size={26} strokeWidth={1.25} />
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.05} className={cn("order-2", reverse && "sm:order-2")}>
                  <span className="mb-2 block text-xs font-medium tracking-[0.2em] text-stone uppercase">
                    0{i + 1}
                  </span>
                  <h2 className="font-serif text-3xl text-ink sm:text-4xl dark:text-bone">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md leading-relaxed text-stone">
                    {service.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1} className={cn("order-3", reverse && "sm:order-1")}>
                  <ul className="space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-stone">
                        <Check size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.75} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection
        title="Not sure where to start?"
        description="Book an introductory consultation and we'll help you scope the right service for your project."
        buttonLabel="Book a Consultation"
        buttonTo="/contact"
      />
    </>
  );
}
