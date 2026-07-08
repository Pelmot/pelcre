import { motion } from "framer-motion";
import type { Skill } from "@/data/types";

export function SkillBars({ skills }: { skills: Skill[] }) {
  return (
    <div className="space-y-7">
      {skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="text-sm font-medium text-ink dark:text-bone">
              {skill.name}
            </p>
            <p className="text-xs text-stone">{skill.level}%</p>
          </div>
          <div className="h-px w-full bg-mist">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gold"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
