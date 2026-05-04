"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { TiltCard }     from "@/app/components/ui/TiltCard";
import { techStack }    from "@/app/data";

export function TechStack() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="06" label="Stack" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="A lean, hybrid stack."
            split="word"
            stagger={0.06}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            The detector lives in Python. The dashboard lives in the browser. A FastAPI WebSocket
            stitches them in real-time — every layer chosen for speed and explainability.
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
              <span className="relative text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">{t.icon}</span>
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
                  ▸ live in production
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
