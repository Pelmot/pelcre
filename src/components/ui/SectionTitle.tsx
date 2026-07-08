import { cn } from "@/lib/cn";
import { ScrollReveal } from "./ScrollReveal";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <ScrollReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-medium tracking-[0.3em] uppercase",
            light ? "text-mist" : "text-stone",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-4xl leading-[1.1] font-medium text-balance sm:text-5xl",
          light ? "text-bone" : "text-ink dark:text-bone",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            light ? "text-mist" : "text-stone",
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
