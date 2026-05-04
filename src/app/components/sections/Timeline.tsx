"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { timeline }     from "@/app/data";

function PhaseRow({
  index,
  total,
  phase,
  weeks,
  label,
  desc,
  scrollYProgress,
}: {
  index: number;
  total: number;
  phase: string;
  weeks: string;
  label: string;
  desc:  string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end   = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.05], [0.45, 1]);
  const x       = useTransform(scrollYProgress, [start - 0.1, start + 0.1],  [-30, 0]);
  const dotScale = useTransform(scrollYProgress, [start - 0.05, start + 0.02, end], [1, 1.6, 1]);
  const dotBg    = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.02],
    ["var(--border-strong)", "var(--accent)"],
  );

  return (
    <motion.li
      style={{ opacity, x }}
      data-cursor="hover"
      className="group relative grid grid-cols-12 items-baseline gap-4 border-t py-8"
    >
      {/* Dot on the timeline line */}
      <motion.span
        className="absolute -left-[8px] top-9 h-3 w-3 rounded-full md:-left-[34px]"
        style={{ scale: dotScale, background: dotBg }}
      />

      <span className="col-span-3 font-mono text-[11px] tabular-nums sm:col-span-2" style={{ color: "var(--text-muted)" }}>
        {phase} · {weeks}
      </span>
      <div className="col-span-9 sm:col-span-10">
        <h3
          className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:-translate-x-1 sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          <WordMark text={label} />
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
          {desc}
        </p>
      </div>
    </motion.li>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="08" label="Timeline" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="Twelve weeks. Five phases."
            split="word"
            stagger={0.06}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-6">
        {/* Stage column */}
        <ScrollReveal direction="lift" className="col-span-12 md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            ▸ How we built it
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            From the first dataset pass to the live dashboard. Each phase had a single clear
            deliverable, so we always knew what good looked like before we started building.
          </p>
        </ScrollReveal>

        {/* Editorial timeline with scroll-driven progress line */}
        <div ref={ref} className="relative col-span-12 md:col-span-8 md:pl-10">
          {/* Background rail */}
          <span
            className="absolute left-0 top-0 hidden h-full w-px md:block"
            style={{ background: "var(--border-strong)" }}
          />
          {/* Filled rail */}
          <motion.span
            className="absolute left-0 top-0 hidden w-px md:block"
            style={{ background: "var(--text-primary)", height: lineHeight }}
          />

          <ol className="relative">
            {timeline.map((t, i) => (
              <PhaseRow
                key={t.phase}
                index={i}
                total={timeline.length}
                phase={String(i + 1).padStart(2, "0")}
                weeks={t.weeks}
                label={t.label}
                desc={t.desc}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
