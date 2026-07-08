import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  BehanceIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { architect } from "@/data/content";

const columns = [
  {
    title: "Studio",
    links: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Residential", to: "/projects?category=Residential" },
      { label: "Commercial", to: "/projects?category=Commercial" },
      { label: "Interior", to: "/projects?category=Interior" },
      { label: "Landscape", to: "/projects?category=Landscape" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      <div className="container-lux grid gap-16 py-24 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="font-serif text-3xl">
            {architect.name}
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
            {architect.tagline}
          </p>
          <div className="mt-8 flex gap-4">
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
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-6 text-xs font-medium tracking-[0.25em] text-mist uppercase">
              {col.title}
            </p>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="link-underline text-sm text-mist hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-6 text-xs font-medium tracking-[0.25em] text-mist uppercase">
            Get in touch
          </p>
          <a
            href={`mailto:${architect.email}`}
            className="link-underline block text-sm text-mist hover:text-bone"
          >
            {architect.email}
          </a>
          <a
            href={`tel:${architect.phone.replace(/[^\d+]/g, "")}`}
            className="link-underline mt-3 block text-sm text-mist hover:text-bone"
          >
            {architect.phone}
          </a>
          <p className="mt-3 text-sm text-mist">{architect.address}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold uppercase"
          >
            Start a project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="container-lux flex flex-col items-center justify-between gap-4 border-t border-mist py-8 text-xs text-mist sm:flex-row">
        <p>
          © {year} {architect.studio}. All rights reserved.
        </p>
        <p>Architecture &amp; Interiors — Gaziantep</p>
      </div>
    </footer>
  );
}
