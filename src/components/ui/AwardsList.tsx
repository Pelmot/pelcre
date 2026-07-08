import type { Award } from "@/data/types";
import { ScrollReveal } from "./ScrollReveal";

export function AwardsList({ awards }: { awards: Award[] }) {
  return (
    <div className="divide-y divide-mist border-t border-b border-mist">
      {awards.map((award, i) => (
        <ScrollReveal key={award.title} delay={i * 0.04}>
          <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-7">
            <div className="flex items-baseline gap-6">
              <span className="w-14 shrink-0 font-serif text-2xl text-gold">
                {award.year}
              </span>
              <p className="text-base text-ink dark:text-bone">
                {award.title}
              </p>
            </div>
            <p className="pl-20 text-sm text-stone sm:pl-0">
              {award.organization}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
