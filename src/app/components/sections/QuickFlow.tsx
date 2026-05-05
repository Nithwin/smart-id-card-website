"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";
import { quickFlow } from "@/app/data";

export function QuickFlow() {
  return (
    <section id="quick-flow" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8">
      <SectionLabel number="00" label="How It Works In 30 Seconds" className="mb-10" />

      <div className="grid gap-8 md:grid-cols-12">
        <RevealText
          as="h2"
          text="One camera. Five clear steps."
          split="word"
          stagger={0.05}
          className="md:col-span-7 text-display-md font-display italic leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        />
        <p className="md:col-span-5 md:self-end text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          This is the fastest way for examiners and visitors to understand your full pipeline before they dive into architecture details.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {quickFlow.map((item, i) => (
          <motion.article
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.35, once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="award-surface rounded-2xl p-4"
            style={{ border: "1px solid var(--border)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              step {item.step}
            </p>
            <h3 className="mt-2 font-display text-2xl italic leading-tight" style={{ color: "var(--text-primary)" }}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
              {item.detail}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
