"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface StoryChapter {
  id: string;
  label: string;
  short: string;
}

interface StoryRailProps {
  chapters: StoryChapter[];
}

export function StoryRail({ chapters }: StoryRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const observedChapters = useMemo(
    () => chapters.filter((chapter) => typeof document === "undefined" || document.getElementById(chapter.id)),
    [chapters],
  );

  useEffect(() => {
    const sectionElements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;
        const bestMatchId = visible[0].target.id;
        const index = chapters.findIndex((chapter) => chapter.id === bestMatchId);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.4, 0.7] },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  if (observedChapters.length === 0) return null;

  const safeActiveIndex = Math.min(activeIndex, observedChapters.length - 1);
  const progress = observedChapters.length <= 1 ? 1 : safeActiveIndex / (observedChapters.length - 1);

  return (
    <>
      <aside className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div
          className="award-surface pointer-events-auto w-[210px] rounded-2xl p-3"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Story Chapters
          </p>

          <div className="relative">
            <div
              className="absolute left-[8px] top-[7px] h-[calc(100%-14px)] w-px rounded-full"
              style={{ background: "var(--border-strong)" }}
            />
            <motion.div
              className="absolute left-[8px] top-[7px] w-px rounded-full"
              style={{ background: "linear-gradient(180deg, var(--accent-3), var(--accent-2))" }}
              animate={{ height: `calc((100% - 14px) * ${progress})` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="space-y-1.5">
              {observedChapters.map((chapter, index) => {
                const isActive = safeActiveIndex === index;
                return (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    data-cursor="hover"
                    className="group relative flex items-center gap-3 rounded-xl px-2 py-1.5"
                    style={{
                      background: isActive ? "color-mix(in srgb, var(--bg-subtle) 82%, var(--accent) 18%)" : "transparent",
                    }}
                  >
                    <span
                      className="relative inline-flex h-4 w-4 items-center justify-center"
                      style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      <span
                        className="h-2 w-2 rounded-full transition-transform duration-300"
                        style={{
                          background: isActive ? "var(--accent-2)" : "var(--border-strong)",
                          transform: isActive ? "scale(1.15)" : "scale(1)",
                        }}
                      />
                      {isActive && (
                        <motion.span
                          className="absolute h-3.5 w-3.5 rounded-full"
                          style={{ border: "1px solid color-mix(in srgb, var(--accent-2) 60%, transparent)" }}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                      )}
                    </span>
                    <span
                      className="truncate font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                      style={{ color: isActive ? "var(--text-primary)" : "var(--text-body)" }}
                    >
                      {chapter.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-3 xl:hidden">
        <div
          className="award-surface pointer-events-auto mx-auto max-w-[420px] rounded-2xl px-3 py-2.5"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              Chapter
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
              {String(safeActiveIndex + 1).padStart(2, "0")} / {String(observedChapters.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mb-2 h-1 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--accent-3), var(--accent-2))" }}
              animate={{ width: `${Math.max(8, (safeActiveIndex + 1) / observedChapters.length * 100)}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch]">
            <div className="inline-flex gap-1">
              {observedChapters.map((chapter, index) => {
                const isActive = safeActiveIndex === index;
                return (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    data-cursor="hover"
                    className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]"
                    style={{
                      background: isActive ? "var(--text-primary)" : "var(--bg-subtle)",
                      color: isActive ? "var(--bg-base)" : "var(--text-body)",
                    }}
                  >
                    {chapter.short}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
