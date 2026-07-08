import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/data/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  const go = (dir: 1 | -1) =>
    setIndex((prev) => (prev + dir + items.length) % items.length);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Quote className="mx-auto mb-8 text-gold" size={32} strokeWidth={1.25} />
      <div className="relative min-h-[13rem] sm:min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl dark:text-bone">
              “{active.quote}”
            </p>
            <p className="mt-7 text-sm font-medium tracking-wide text-ink uppercase dark:text-bone">
              {active.name}
            </p>
            <p className="mt-1 text-sm text-stone">{active.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-mist"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mist transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
