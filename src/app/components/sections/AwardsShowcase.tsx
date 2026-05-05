"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";

const scenes = [
  {
    id: "01",
    title: "Campus signal to machine vision.",
    body: "The system reads live corridor frames and detects person-card relationships before anything else.",
    image: "/showcase/scene-campus.svg",
    accent: "var(--accent-3)",
    kicker: "Scene 01 · Acquisition",
  },
  {
    id: "02",
    title: "Attention where small cards get lost.",
    body: "CBAM, Coordinate Attention, and the P2 head increase confidence on tiny ID regions in noisy frames.",
    image: "/showcase/scene-attention.svg",
    accent: "var(--accent-2)",
    kicker: "Scene 02 · Detection Core",
  },
  {
    id: "03",
    title: "Evidence packet, ready for action.",
    body: "The output is a clean incident bundle with match score, snapshot, and role-based routing for staff.",
    image: "/showcase/scene-incident.svg",
    accent: "var(--accent)",
    kicker: "Scene 03 · Delivery",
  },
];

function SceneCard({
  scene,
  index,
}: {
  scene: (typeof scenes)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 35%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [56, -18]);
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.94, 1, 1.01]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.45, 1, 1]);

  return (
    <div ref={ref} className="relative h-[120vh]">
      <motion.article
        style={{ y, scale, opacity }}
        className="award-stage-card sticky top-24 mx-auto grid max-w-[1320px] gap-5 rounded-[28px] p-4 md:grid-cols-12 md:gap-8 md:p-6"
      >
        <div className="relative overflow-hidden rounded-2xl border md:col-span-7" style={{ borderColor: "var(--border)" }}>
          <Image
            src={scene.image}
            alt={scene.title}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            priority={index === 0}
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
            style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.34))" }}
          />
        </div>
        <div className="flex flex-col justify-between rounded-2xl border p-5 md:col-span-5 md:p-6" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg-raised) 92%, transparent)" }}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              {scene.kicker}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.65rem,3.6vw,3rem)] leading-[1.04] tracking-tight" style={{ color: "var(--text-primary)" }}>
              {scene.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-body)" }}>
              {scene.body}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: scene.accent }}>
              /{scene.id}
            </span>
            <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}>
              Story frame
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function AwardsShowcase() {
  return (
    <section id="experience" className="relative mx-auto max-w-[1600px] px-5 pb-6 pt-20 sm:px-8 sm:pt-28">
      <SectionLabel number="00A" label="Cinematic Experience" className="mb-12" />

      <div className="grid gap-8 md:grid-cols-12">
        <RevealText
          as="h2"
          text="Awwwards-inspired visual storytelling."
          split="word"
          stagger={0.05}
          className="md:col-span-7 text-display-md font-display italic leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        />
        <p className="md:col-span-5 md:self-end text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          Three animated scenes translate your pipeline into cinematic moments that are easier to present in viva and stronger for awards submissions.
        </p>
      </div>

      <div className="mt-10">
        {scenes.map((scene, i) => (
          <SceneCard key={scene.id} scene={scene} index={i} />
        ))}
      </div>
    </section>
  );
}
