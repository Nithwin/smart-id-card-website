"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Crosshair, ShieldCheck } from "lucide-react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";

const outputs = [
  {
    title: "Raw detection",
    icon:  Camera,
    desc:  "Person and ID-card boxes from CA-YOLO on the live stream — the first signal that someone is visible.",
    tag:   "live frame",
  },
  {
    title: "Violation bundle",
    icon:  Crosshair,
    desc:  "When no ID is visible: saved frame path, spatial flags, timestamp — ready for InsightFace and staff routing.",
    tag:   "incident json",
  },
  {
    title: "Staff packet",
    icon:  ShieldCheck,
    desc:  "Matched student record, InsightFace score, snapshot URI, and channel to HOD or Principal.",
    tag:   "escalation",
  },
];

export function DemoOutputs() {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25 });

  return (
    <section id="demo" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="09" label="Outputs" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="Three artefacts per incident."
            split="word"
            stagger={0.06}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            Every flagged frame leaves three things behind: the live detection, a structured
            violation bundle, and a clean staff packet. One incident, one paper trail.
          </p>
        </ScrollReveal>
      </div>

      <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-3">
        {outputs.map(({ title, icon: Icon, desc, tag }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }}
            animate={inView
              ? { opacity: 1, y: 0, rotate: 0 }
              : { opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }
            }
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
            data-cursor="hover"
            className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl p-7 transition-colors duration-500"
            style={{
              background: i === 1 ? "var(--text-primary)" : "var(--bg-raised)",
              color:      i === 1 ? "var(--bg-base)"      : "var(--text-primary)",
              border:     "1px solid var(--border)",
            }}
          >
            <div className="flex items-start justify-between">
              <Icon className="h-6 w-6" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                /{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                ▸ {tag}
              </p>
              <h3 className="mt-2 font-display text-4xl italic leading-[1] sm:text-5xl">
                <WordMark text={title} />
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                {desc}
              </p>
            </div>

            {/* corner accent */}
            <span
              className="pointer-events-none absolute right-7 bottom-7 h-1 w-0 transition-all duration-700 group-hover:w-12"
              style={{ background: i === 1 ? "var(--accent)" : "var(--accent-2)" }}
            />
          </motion.article>
        ))}
      </div>

      <div
        className="award-surface mt-8 rounded-3xl p-4 sm:p-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
          ▸ Real pipeline output sample
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <div className="overflow-hidden rounded-2xl border lg:col-span-8" style={{ borderColor: "var(--border)" }}>
            <Image
              src="/showcase/pipeline-output-sample.svg"
              alt="Annotated pipeline output with incident packet preview"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="rounded-2xl border p-4 lg:col-span-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              packet fields
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
              <li>incident id + timestamp</li>
              <li>person/card detections + confidence</li>
              <li>no-id verdict from rules</li>
              <li>face match score (InsightFace)</li>
              <li>routing target (HOD/Principal)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
