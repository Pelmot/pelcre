import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/ui/PageHero";
import { SEO } from "@/components/ui/SEO";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { useSiteData } from "@/context/DataContext";
import { categories, type ProjectCategory } from "@/data/types";

const PROJECTS_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2400&q=80";

export function Projects() {
  const { t } = useTranslation();
  const { projects, heroImages, pageContent } = useSiteData();
  const pc = pageContent.projects;
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as ProjectCategory | null;
  const [active, setActive] = useState<ProjectCategory | "All">(
    categoryParam && categories.includes(categoryParam) ? categoryParam : "All",
  );

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActive(categoryParam);
    }
  }, [categoryParam]);

  const handleChange = (category: ProjectCategory | "All") => {
    setActive(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const counts = useMemo(() => {
    const acc: Record<string, number> = { All: projects.length };
    categories.forEach((c) => {
      acc[c] = projects.filter((p) => p.category === c).length;
    });
    return acc;
  }, []);

  return (
    <>
      <SEO
        title={t("projects.seoTitle")}
        description={t("projects.seoDescription")}
      />

      <PageHero
        eyebrow={pc.portfolio || t("projects.portfolio")}
        title={pc.selectedProjects || t("projects.selectedProjects")}
        description={pc.description || t("projects.description")}
        image={heroImages.projects || PROJECTS_HERO_FALLBACK}
        short
      />

      <section className="container-lux py-20 sm:py-28">
        <div className="mb-14">
          <ProjectFilter
            categories={categories}
            active={active}
            onChange={handleChange}
            counts={counts}
            filterLabel={t("projects.filterLabel")}
            allLabel={t("categories.all")}
            categoryLabel={(c) => t(`categories.${c}`)}
          />
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-stone">
            {t("projects.noProjectsFound")}
          </p>
        )}
      </section>
    </>
  );
}
