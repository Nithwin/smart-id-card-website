"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { Parallax }     from "@/app/components/ui/Parallax";
import { overviewFacts } from "@/app/data";

export function Overview() {
  const factsRef = useRef<HTMLDivElement | null>(null);
  const inView   = useInView(factsRef, { amount: 0.3 });

  return (
    <section id="overview" className="relative mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="01" label="Overview" className="mb-12" />

      {/* Background big number watermark */}
      <Parallax speed={60} className="pointer-events-none absolute right-0 top-12 select-none">
        <span
          className="font-display"
          style={{
            fontSize: "clamp(8rem, 18vw, 18rem)",
            color: "color-mix(in srgb, var(--text-muted) 8%, transparent)",
            lineHeight: 0.85,
          }}
        >
          01
        </span>
      </Parallax>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="From missing ID to named incident."
            split="word"
            stagger={0.05}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
          <ScrollReveal direction="lift" delay={0.1}>
            <p
              className="mt-8 max-w-2xl text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6]"
              style={{ color: "var(--text-body)" }}
            >
              Corridors and gates are busy: staff cannot catch every student who walks past without an ID.
              Our pipeline watches one camera stream, detects each person and whether an ID card is visible,
              and when the rules say <em className="font-display italic">no ID</em>, it freezes evidence and
              continues down the identification path using face matching from the enrolled gallery.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="lift" delay={0.2}>
            <p
              className="mt-5 max-w-2xl text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6]"
              style={{ color: "var(--text-body)" }}
            >
              <em className="font-display italic">InsightFace</em> then answers who was in the frame by matching
              the face to an enrolled gallery. The backend packages timestamp, snapshot, match score, and student
              fields for the <em className="font-display italic">HOD or Principal</em>. CA-YOLOv8 is upgraded with{" "}
              <em className="font-display italic">CBAM</em>, <em className="font-display italic">Coordinate Attention</em>, and a{" "}
              <em className="font-display italic">P2 head</em> so small, distant cards still register when they are worn.
            </p>
          </ScrollReveal>
        </div>

        <div ref={factsRef} className="grid grid-cols-2 gap-3 md:col-span-5 md:self-end">
          {overviewFacts.map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="relative cursor-default rounded-3xl p-5"
              style={{
                background: i % 3 === 0 ? "var(--accent)" : "var(--bg-raised)",
                color:      i % 3 === 0 ? "#0a0a0a"      : "var(--text-primary)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "var(--border)",
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                ▸ {label}
              </p>
              <p className="mt-2 text-base font-medium leading-snug">{value}</p>
              <span
                className="absolute bottom-2 right-2 font-mono text-[9px] tabular-nums opacity-40"
              >
                {String(i + 1).padStart(2, "0")} / {String(overviewFacts.length).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
