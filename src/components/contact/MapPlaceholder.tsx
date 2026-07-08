import { MapPin } from "lucide-react";
import { architect } from "@/data/content";

export function MapPlaceholder() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    architect.address,
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative block h-full min-h-[320px] w-full overflow-hidden rounded-lg border border-mist bg-linen dark:bg-ink-soft"
      aria-label="Open studio location in Google Maps"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40 dark:opacity-20"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-mist" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#grid)" />
        <path d="M0 60 Q 120 20 200 90 T 400 70" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-gold/50" />
        <path d="M0 220 Q 140 260 240 200 T 400 230" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-gold/50" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center transition-transform duration-500 group-hover:-translate-y-1">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bone shadow-sm dark:bg-bone dark:text-ink">
          <MapPin size={22} strokeWidth={1.5} />
        </span>
        <p className="font-serif text-lg text-ink dark:text-bone">
          {architect.address}
        </p>
        <span className="link-underline text-xs font-medium tracking-[0.2em] text-gold uppercase">
          Get directions
        </span>
      </div>
    </a>
  );
}
