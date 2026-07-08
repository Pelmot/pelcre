import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useTheme } from "@/context/ThemeContext";
import { architect } from "@/data/content";
import { cn } from "@/lib/cn";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useLockBodyScroll(open);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-paper/90 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md dark:bg-ink/90 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="container-lux flex h-20 items-center justify-between sm:h-24">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={cn(
            "font-serif text-xl tracking-wide transition-colors sm:text-2xl",
            solid ? "text-ink dark:text-bone" : "text-paper",
          )}
        >
          {architect.name}
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "link-underline text-sm font-medium tracking-wide uppercase",
                  solid ? "text-charcoal dark:text-bone" : "text-paper",
                  isActive && "opacity-100",
                )
              }
              data-active={pathname === link.to}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              solid
                ? "border-charcoal/20 text-charcoal hover:border-gold hover:text-gold dark:border-bone/20 dark:text-bone"
                : "border-paper/30 text-paper hover:border-paper",
            )}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border",
              solid
                ? "border-charcoal/20 text-charcoal dark:border-bone/20 dark:text-bone"
                : "border-paper/30 text-paper",
            )}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-9 w-9 items-center justify-center",
              solid ? "text-ink dark:text-bone" : "text-paper",
            )}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-paper dark:bg-ink lg:hidden"
          >
            <nav className="container-lux flex h-full flex-col justify-center gap-8 pb-24">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "font-serif text-4xl text-ink dark:text-bone",
                        isActive && "text-gold",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
