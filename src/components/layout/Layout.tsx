import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { useOutlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { ScrollToTop } from "./ScrollToTop";
import { PageLoader } from "@/components/ui/PageLoader";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/cn";

// Evenly spaced from top to bottom of the full page so the accent runs the whole way
// down, alternating sides/colors for rhythm rather than a repeating mechanical pattern.
// Kept behind all page content (-z-10) so it can never sit on top of text or buttons —
// it will naturally be hidden behind photos and solid-color sections, which is expected.
// Colors cycle through the three Pantone accents (Mother of Pearl, Mystic Navy, Red Inferno).
// Navy and Red Inferno are kept translucent so page text on top of them stays readable.
const BUBBLE_COLORS = [
  "bg-pearl dark:bg-pearl/25",
  "bg-navy/25 dark:bg-navy/60",
  "bg-inferno/20 dark:bg-inferno/60",
] as const;

const SIDE_ACCENTS = [
  { top: "6%", side: "left" },
  { top: "27%", side: "right" },
  { top: "48%", side: "left" },
  { top: "69%", side: "right" },
  { top: "90%", side: "left" },
] as const;

// Same ease-out-expo curve ScrollReveal uses elsewhere, so page transitions read as the
// same motion language rather than a different animation vocabulary.
const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_MS = 260;
const SLIDE_PX = 28;

// Mirrors the Navbar's link order — moving to a page further along this list slides the
// incoming page in from that same side, so the motion echoes the site's own nav structure
// instead of a generic fade every time.
const NAV_ORDER = ["/", "/about", "/projects", "/services", "/contact"];

function getNavIndex(pathname: string): number {
  const exact = NAV_ORDER.indexOf(pathname);
  if (exact !== -1) return exact;
  if (pathname.startsWith("/projects/")) return NAV_ORDER.indexOf("/projects");
  return -1;
}

type Phase = { opacity: number; x: number; y: number; duration: number };

const INITIAL_PHASE: Phase = { opacity: 1, x: 0, y: 0, duration: 0 };

// Deliberately not AnimatePresence + key-based remount (see below) — this defers *when*
// the new outlet gets committed instead, so `motion.main` never unmounts and there's
// nothing for a suspending child to corrupt. The old page's content stays put and slides/
// fades out first; only once that finishes does the new (possibly still-loading) route
// swap in underneath and slide/fade up, matching how a considered, unhurried transition
// should feel. `phase` drives `motion.main`'s `animate` prop declaratively — imperative
// AnimationControls (`.set()` immediately followed by `.start()`) don't animate reliably
// here, so this sticks to the same plain-state-driven approach as the original fade.
// `flushSync` forces the "teleport to the off-screen entry position" to commit as its own
// render, so the very next setState (animate toward 0) doesn't get batched into the same
// commit and silently skip past the jump.
function useDeferredOutlet(pathname: string, outlet: ReactNode, dir: "ltr" | "rtl") {
  const [displayed, setDisplayed] = useState({ pathname, outlet });
  const [phase, setPhase] = useState<Phase>(INITIAL_PHASE);
  const latestOutlet = useRef(outlet);
  latestOutlet.current = outlet;
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === displayed.pathname) return;

    const fromIndex = getNavIndex(prevPathname.current);
    const toIndex = getNavIndex(pathname);
    // Only slide horizontally between pages that actually have a place in the nav order —
    // otherwise (privacy, 404, two project details in a row) fall back to the original
    // plain fade+rise rather than implying a direction that doesn't exist.
    const known = fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex;
    const navDirection = toIndex > fromIndex ? 1 : -1;
    // RTL mirrors the nav itself, so "forward" should enter from the opposite physical side.
    const sign = dir === "rtl" ? -1 : 1;
    // Nav links are laid out in NAV_ORDER along the reading direction, so moving forward
    // pans "the camera" toward later links: the outgoing page recedes back the way we came
    // (negative), the incoming page slides in from ahead (positive, then settles to 0).
    const exitX = known ? -navDirection * sign * SLIDE_PX : 0;
    const entryX = -exitX;

    prevPathname.current = pathname;

    setPhase({ opacity: 0, x: exitX, y: known ? 0 : 10, duration: EXIT_MS / 1000 });

    const timer = setTimeout(() => {
      flushSync(() => {
        setDisplayed({ pathname, outlet: latestOutlet.current });
        setPhase({ opacity: 0, x: entryX, y: 0, duration: 0 });
      });
      setPhase({ opacity: 1, x: 0, y: 0, duration: 0.5 });
    }, EXIT_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { outlet: displayed.outlet, phase };
}

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { dir } = useLanguage();
  const { outlet: displayedOutlet, phase } = useDeferredOutlet(location.pathname, outlet, dir);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {SIDE_ACCENTS.map((accent, i) => (
          <div
            key={i}
            className={cn(
              "absolute h-64 w-64 rounded-full sm:h-96 sm:w-96 lg:h-[480px] lg:w-[480px]",
              accent.side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
              BUBBLE_COLORS[i % BUBBLE_COLORS.length],
            )}
            style={{ top: accent.top }}
          />
        ))}
      </div>
      <ScrollToTop />
      <Navbar />
      <motion.main
        className="flex-1"
        animate={{ opacity: phase.opacity, x: phase.x, y: phase.y }}
        transition={{ duration: phase.duration, ease: TRANSITION_EASE }}
      >
        <Suspense fallback={<PageLoader />}>{displayedOutlet}</Suspense>
      </motion.main>
      <Footer />
      <BackToTop />
    </div>
  );
}
