"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaPython } from "react-icons/fa";
import { SiPytorch, SiOpencv, SiFastapi, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { MdOutlineTrackChanges } from "react-icons/md";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { TiltCard }     from "@/app/components/ui/TiltCard";
import { techStack }    from "@/app/data";

function renderStackIcon(name: string) {
  switch (name) {
    case "Python + PyTorch":
      return (
        <div className="flex items-center gap-1.5">
          <FaPython size={18} color="#3776AB" />
          <SiPytorch size={16} color="#EE4C2C" />
        </div>
      );
    case "YOLOv8 + Custom Modules":
      return <MdOutlineTrackChanges size={22} color="#7c9cff" />;
    case "OpenCV":
      return <SiOpencv size={20} color="#5C3EE8" />;
    case "InsightFace":
      return <SiPytorch size={20} color="#EE4C2C" />;
    case "Next.js + Tailwind CSS":
      return (
        <div className="flex items-center gap-1.5">
          <SiNextdotjs size={16} color="#111827" />
          <SiTailwindcss size={18} color="#06B6D4" />
        </div>
      );
    case "FastAPI + SQLite":
      return <SiFastapi size={20} color="#009688" />;
    default:
      return null;
  }
}

export function TechStack() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <section id="stack" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="06" label="Stack" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="A lean, hybrid stack with real tooling."
            split="word"
            stagger={0.06}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            The detector runs in Python, the experience runs in the browser, and FastAPI connects
            everything in real-time. Each layer is selected for speed, clarity, and deployment practicality.
          </p>
        </ScrollReveal>
      </div>

      <div
        ref={ref}
        className="mt-16 grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-3"
        style={{ background: "var(--border-strong)" }}
      >
        {techStack.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 30, filter: "blur(8px)" }
            }
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard
              maxTilt={8}
              className="group relative flex min-h-[200px] flex-col justify-between p-7 transition-colors duration-300"
              style={{ background: "var(--bg-raised)" } as React.CSSProperties}
              data-cursor="VIEW"
            >
              {/* hover halo */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(280px circle at 50% 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)",
                }}
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <span className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5">
                  {renderStackIcon(t.name)}
                </span>
              </div>
              <div className="relative">
                <h3 className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>
                  <WordMark text={t.name} />
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  {t.desc}
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ color: "var(--text-primary)" }}
                >
                  ▸ used in this project
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
