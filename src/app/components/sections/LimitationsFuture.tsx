"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";

const limitations = [
  "Heavy occlusion and very low-light scenes can reduce card visibility confidence.",
  "Face matching quality depends on enrollment quality and camera angle consistency.",
  "Extreme crowd density can increase false negatives on tiny card instances.",
];

const futureWork = [
  "Add temporal tracking across frames for stronger no-ID decision stability.",
  "Expand enrolled gallery management with quality checks and drift alerts.",
  "Deploy TensorRT-optimized inference path for lower latency edge deployments.",
];

export function LimitationsFuture() {
  return (
    <section id="limitations" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
      <SectionLabel number="10" label="Limitations & Future Work" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <RevealText
          as="h2"
          text="What works now, and what comes next."
          split="word"
          stagger={0.05}
          className="md:col-span-7 text-display-md font-display italic leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        />
        <p className="md:col-span-5 md:self-end text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          This section makes the project review-ready by showing realistic boundaries and the next technical upgrades.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          className="award-surface rounded-3xl p-5 sm:p-6"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Current limitations
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            {limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.08 }}
          className="award-surface rounded-3xl p-5 sm:p-6"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Future work
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            {futureWork.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
