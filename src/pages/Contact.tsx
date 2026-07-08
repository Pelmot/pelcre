import { Mail, MapPin, Phone } from "lucide-react";
import {
  BehanceIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { PageHero } from "@/components/ui/PageHero";
import { SEO } from "@/components/ui/SEO";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { architect } from "@/data/content";

export function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Pelmot Creativity to discuss your next architecture, interior, or landscape project."
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Let's start a conversation"
        description="Tell us about your site, your timeline, and the life you want the space to hold. We reply to every inquiry within two business days."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
        short
      />

      <section className="container-lux grid gap-16 py-28 sm:py-36 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        <div className="space-y-10">
          <ScrollReveal delay={0.05}>
            <p className="mb-6 text-xs font-medium tracking-[0.2em] text-stone uppercase">
              Contact Details
            </p>
            <ul className="space-y-5">
              <li>
                <a
                  href={`mailto:${architect.email}`}
                  className="flex items-center gap-4 text-ink transition-colors hover:text-gold dark:text-bone"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mist">
                    <Mail size={16} strokeWidth={1.5} />
                  </span>
                  {architect.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${architect.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-4 text-ink transition-colors hover:text-gold dark:text-bone"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mist">
                    <Phone size={16} strokeWidth={1.5} />
                  </span>
                  {architect.phone}
                </a>
              </li>
              <li className="flex items-start gap-4 text-ink dark:text-bone">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mist">
                  <MapPin size={16} strokeWidth={1.5} />
                </span>
                <span className="pt-2 leading-snug">{architect.address}</span>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-stone uppercase">
              Follow the Studio
            </p>
            <div className="flex gap-3">
              <a
                href={architect.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={architect.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={architect.social.behance}
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
              >
                <BehanceIcon size={16} />
              </a>
              <a
                href={architect.social.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
              >
                <XIcon size={16} />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <MapPlaceholder />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
