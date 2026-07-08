import type { TimelineItem } from "@/data/types";
import { ScrollReveal } from "./ScrollReveal";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-0 w-px bg-mist sm:left-[11rem]" />
      <div className="space-y-14">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.05}>
            <div className="relative grid gap-2 pl-8 sm:grid-cols-[11rem_1fr] sm:gap-10 sm:pl-0">
              <span className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold sm:left-[11rem]" />
              <p className="text-sm font-medium tracking-wide text-stone uppercase sm:text-right sm:pr-10">
                {item.year}
              </p>
              <div className="sm:pl-10">
                <h3 className="font-serif text-2xl text-ink dark:text-bone">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">
                  {item.place}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
