import { cn } from "@/lib/cn";
import type { ProjectCategory } from "@/data/types";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: ProjectCategory | "All";
  onChange: (category: ProjectCategory | "All") => void;
  counts: Record<string, number>;
}

export function ProjectFilter({
  categories,
  active,
  onChange,
  counts,
}: ProjectFilterProps) {
  const options: (ProjectCategory | "All")[] = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filter projects by category">
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300",
              isActive
                ? "border-ink bg-ink text-paper dark:border-bone dark:bg-bone dark:text-ink"
                : "border-mist text-stone hover:border-ink hover:text-ink dark:hover:text-bone",
            )}
          >
            {option}
            <span className="ml-1.5 opacity-60">({counts[option] ?? 0})</span>
          </button>
        );
      })}
    </div>
  );
}
