"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { team, type TeamMember } from "@/app/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

/* ─── Member portrait — photo with editorial frame ────── */
function MemberPortrait({
  src,
  name,
  accent,
  priority,
}: {
  src:      string;
  name:     string;
  accent:   string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={`${name} — Smart-ID Detection team`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 480px"
        className="team-portrait-photo object-cover object-[center_20%] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04]"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-0 right-0 z-[1] h-[2px] opacity-70"
        style={{ background: accent }}
        animate={{ top: ["12%", "88%", "12%"] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />

      {[
        "top-3 left-3 border-l-2 border-t-2",
        "top-3 right-3 border-r-2 border-t-2",
        "bottom-3 left-3 border-l-2 border-b-2",
        "bottom-3 right-3 border-r-2 border-b-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute z-[1] h-3 w-3 ${cls}`}
          style={{ borderColor: accent }}
        />
      ))}
    </div>
  );
}

function MemberCard({ m, index }: { m: TeamMember; index: number }) {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-8 border-t pt-12 md:grid-cols-12 md:gap-10 md:pt-16"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Portrait */}
      <motion.div
        className="md:col-span-5 lg:col-span-4"
        style={{ y: portraitY }}
      >
        <div className="group aspect-[4/5] overflow-hidden rounded-3xl">
          <MemberPortrait
            src={m.photo}
            name={m.name}
            accent={m.accent}
            priority={index === 0}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            ▸ Member 0{index + 1} / {String(team.length).padStart(2, "0")}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: m.accent }}
          >
            {m.shortRole}
          </span>
        </div>
      </motion.div>

      {/* Body */}
      <div className="md:col-span-7 lg:col-span-8 lg:pl-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: m.accent }}>
          ▸ {m.role}
        </p>
        <RevealText
          as="h3"
          text={m.name}
          split="char"
          stagger={0.03}
          className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight"
          style={{ color: "var(--text-primary)" }}
        />

        {/* Highlights chips */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {m.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-4"
              style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                {h.label}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {h.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contributions list */}
        <div className="mt-8 space-y-3">
          {m.contributions.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-[var(--bg-subtle)]"
            >
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: m.accent }}
              />
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-body)" }}>
                {c}
              </p>
              <ArrowUpRight
                className="ml-auto mt-1 h-4 w-4 shrink-0 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                style={{ color: m.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative mx-auto max-w-[1600px] px-5 py-32 sm:px-8">
      <SectionLabel number="07" label="Team" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="The people who built this."
            split="word"
            stagger={0.05}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            Three people, three honest scopes — model architecture, backend systems, and dataset
            engineering. Everything below maps to real files in the repository, not slides.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-20 space-y-20 md:space-y-24">
        {team.map((m, i) => (
          <MemberCard key={m.name} m={m} index={i} />
        ))}
      </div>
    </section>
  );
}
