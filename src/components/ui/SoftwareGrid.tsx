import type { SoftwareItem } from "@/data/types";
import { ScrollRevealGroup, ScrollRevealItem } from "./ScrollReveal";

export function SoftwareGrid({ items }: { items: SoftwareItem[] }) {
  return (
    <ScrollRevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-mist bg-mist sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <ScrollRevealItem key={item.name}>
          <div className="group relative flex h-full flex-col justify-between gap-8 bg-linen p-6 transition-all hover:z-10 hover:bg-paper hover:shadow-sm dark:bg-ink-soft dark:hover:bg-ink">
            <p className="text-xs tracking-[0.2em] text-stone uppercase">
              {item.category}
            </p>
            <p className="font-serif text-xl text-ink dark:text-bone">
              {item.name}
            </p>
          </div>
        </ScrollRevealItem>
      ))}
    </ScrollRevealGroup>
  );
}
