"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { architectureFlow } from "@/app/data";

export function Architecture() {
  const ref    = useRef<HTMLOListElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <section id="architecture" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="04" label="Architecture" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="From frame to verdict, in six steps."
            split="word"
            stagger={0.04}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            Each step is a guarded checkpoint. If the frame is unusable, confidence collapses, or InsightFace
            cannot match the gallery, the pipeline degrades cleanly — we log uncertainty instead of firing a
            bad name at the HOD or Principal.
          </p>
        </ScrollReveal>
      </div>

      <ol
        ref={ref}
        className="relative mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {architectureFlow.map((flow, i) => (
          <motion.li
            key={flow.step}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.94 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl p-7 transition-colors duration-500"
            style={{
              background: "var(--bg-raised)",
              border:     "1px solid var(--border)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl italic tabular-nums" style={{ color: "var(--text-primary)" }}>
                {flow.step}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                step
              </span>
            </div>
            <h3
              className="mt-10 text-2xl font-medium tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              <WordMark text={flow.label} />
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-body)" }}
            >
              {flow.desc}
            </p>

            {/* connecting arrow on hover */}
            <span
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
              style={{ color: "var(--text-primary)" }}
            >
              →
            </span>

            {/* hover wash */}
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
              style={{ background: i % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }}
            />
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
