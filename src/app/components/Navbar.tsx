"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/app/data";
import { Logo } from "@/app/components/ui/Logo";

interface NavbarProps {
  dark:        boolean;
  onToggle:    () => void;
  progressRef: React.RefObject<HTMLDivElement | null>;
}

export function Navbar({ dark, onToggle, progressRef }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState<string>(navLinks[0]?.href.replace("#", "") ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0, 0.2, 0.45, 0.7, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-6">
      <div
        ref={progressRef}
        className="absolute left-0 right-0 top-0 h-[2px] origin-left"
        style={{ background: "var(--accent)" }}
      />

      <nav
        className={`pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between gap-2 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-7 sm:py-3 ${
          scrolled || menuOpen ? "backdrop-blur-xl shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)]" : ""
        }`}
        style={{
          background: scrolled || menuOpen
            ? "color-mix(in srgb, var(--bg-raised) 80%, transparent)"
            : "transparent",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <a href="#" className="group flex min-w-0 items-center gap-2 sm:gap-3" data-cursor="hover" onClick={() => setMenuOpen(false)}>
          <Logo size={30} className="shrink-0" style={{ color: "var(--text-primary)" }} />
          <span className="hidden min-w-0 truncate text-[13px] font-medium tracking-tight sm:block" style={{ color: "var(--text-primary)" }}>
            smart-id
            <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}> /detection</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 md:flex md:gap-7">
          {navLinks.map((l, i) => {
            const id       = l.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="group relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                style={{ color: isActive ? "var(--text-primary)" : "var(--text-body)" }}
              >
                <span className="mr-1 opacity-50">0{i + 1}</span>
                <span className="nav-word">{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute -bottom-1 left-0 h-px w-full"
                    style={{ background: "var(--text-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={onToggle}
            data-cursor="hover"
            aria-label="Toggle theme"
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors sm:h-10 sm:w-10"
            style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
          >
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="pointer-events-auto fixed inset-0 z-[55] bg-black/45 backdrop-blur-md md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="pointer-events-auto fixed inset-x-0 bottom-0 top-[4.5rem] z-[60] mx-3 flex max-h-[min(82dvh,640px)] flex-col overflow-hidden rounded-3xl border md:hidden"
              style={{
                background: "color-mix(in srgb, var(--bg-raised) 92%, transparent)",
                borderColor: "var(--border)",
              }}
              initial={{ opacity: 0, y: -14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={onToggle}
                  aria-label="Toggle theme"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                >
                  {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  theme
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2.5 pb-4">
                {navLinks.map((l, i) => {
                  const id       = l.href.replace("#", "");
                  const isActive = activeId === id;
                  return (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl px-4 py-3.5 font-mono text-sm uppercase tracking-[0.16em] transition-colors"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: isActive ? "color-mix(in srgb, var(--bg-subtle) 84%, var(--accent) 16%)" : "transparent",
                        color:      isActive ? "var(--text-primary)" : "var(--text-body)",
                      }}
                    >
                      <span className="mr-2 opacity-45">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
