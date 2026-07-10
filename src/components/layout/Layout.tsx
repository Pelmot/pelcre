import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { ScrollToTop } from "./ScrollToTop";
import { cn } from "@/lib/cn";

// Evenly spaced from top to bottom of the full page so the accent runs the whole way
// down, alternating sides/colors for rhythm rather than a repeating mechanical pattern.
const SIDE_ACCENTS = [
  { top: "2%", side: "left" },
  { top: "16%", side: "right" },
  { top: "30%", side: "left" },
  { top: "44%", side: "right" },
  { top: "58%", side: "left" },
  { top: "72%", side: "right" },
  { top: "86%", side: "left" },
  { top: "100%", side: "right" },
] as const;

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {SIDE_ACCENTS.map((accent, i) => (
          <div
            key={i}
            className={cn(
              "absolute h-64 w-64 rounded-full blur-3xl sm:h-[420px] sm:w-[420px] lg:h-[640px] lg:w-[640px]",
              accent.side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
              i % 2 === 0 ? "bg-gold/50 dark:bg-linen/40" : "bg-ink/45 dark:bg-gold-soft/40",
            )}
            style={{ top: accent.top }}
          />
        ))}
      </div>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </div>
  );
}
