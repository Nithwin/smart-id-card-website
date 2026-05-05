"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { projectModules } from "@/app/data";

/* Cursor-follow preview tile — appears next to the cursor on hover */
function HoverPreview({
  active,
  module: m,
  x,
  y,
}: {
  active: boolean;
  module: typeof projectModules[number] | null;
  x: number;
  y: number;
}) {
  const sx = useSpring(useMotionValue(x), { stiffness: 380, damping: 36, mass: 0.4 });
  const sy = useSpring(useMotionValue(y), { stiffness: 380, damping: 36, mass: 0.4 });

  useEffect(() => { sx.set(x); sy.set(y); }, [x, y, sx, sy]);

  if (!m) return null;

  const Icon = m.icon;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{ left: sx, top: sy, translateX: "-50%", translateY: "-110%" }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex h-44 w-60 flex-col justify-between rounded-2xl p-5 shadow-2xl"
        style={{
          background: "var(--text-primary)",
          color:      "var(--bg-base)",
          border:     "1px solid var(--border-strong)",
        }}
      >
        <div className="flex items-start justify-between">
          <Icon className="h-6 w-6" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">preview</span>
        </div>
        <div>
          <p className="font-display italic text-2xl leading-tight">{m.title}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">▸ Hover to inspect</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Modules() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos,    setPos]      = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="modules" className="relative mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="02" label="Modules" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="Eight modules, one signal."
            split="word"
            stagger={0.05}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-body)" }}
          >
            Every module exists for one campus story: spot a student without a visible ID, keep proof,
            identify them with InsightFace, and push a clean packet to the HOD or Principal.
          </p>
        </ScrollReveal>
      </div>

      {/* Editorial list-style modules */}
      <ul
        ref={listRef}
        className="relative mt-16 divide-y"
        style={{ borderColor: "var(--border)" }}
        onMouseLeave={() => setHovered(null)}
      >
        {projectModules.map(({ title, description, icon: Icon }, i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="hover"
            onMouseEnter={() => setHovered(i)}
            className="group relative grid grid-cols-12 items-center gap-4 border-t py-7 transition-colors duration-300 sm:py-9"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Animated background sweep */}
            <span
              className="pointer-events-none absolute inset-y-0 left-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
              style={{
                width: "4px",
                background: "var(--accent)",
              }}
            />

            <div
              className="col-span-2 font-mono text-[11px] tabular-nums sm:col-span-1"
              style={{ color: "var(--text-muted)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="col-span-10 sm:col-span-4">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" style={{ color: "var(--text-primary)" }} />
                <h3
                  className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:-translate-x-1 sm:text-3xl md:text-4xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  <WordMark text={title} />
                </h3>
              </div>
            </div>

            <p
              className="col-span-10 col-start-3 text-sm leading-relaxed sm:col-span-6 sm:col-start-auto sm:text-base"
              style={{ color: "var(--text-body)" }}
            >
              {description}
            </p>

            <div className="col-span-2 hidden justify-end sm:col-span-1 sm:flex">
              <span
                className="inline-block transition-all duration-500 group-hover:translate-x-2"
                style={{ color: "var(--text-primary)" }}
              >
                →
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      <HoverPreview
        active={hovered !== null}
        module={hovered !== null ? projectModules[hovered] : null}
        x={pos.x}
        y={pos.y}
      />
    </section>
  );
}
