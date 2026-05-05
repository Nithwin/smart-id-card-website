"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";
import { datasetAccess, datasetPipeline, datasetSummary } from "@/app/data";

export function DatasetSection() {
  return (
    <section id="dataset" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
      <SectionLabel number="01A" label="Dataset" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <RevealText
          as="h2"
          text="Our custom dataset, built manually."
          split="word"
          stagger={0.05}
          className="md:col-span-7 text-display-md font-display italic leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        />
        <p className="md:col-span-5 md:self-end text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          We captured real-time student scenes, annotated manually in Roboflow, and validated labels before training.
          This makes the model behavior grounded in realistic campus data.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <div className="award-surface rounded-3xl p-5 sm:p-6 lg:col-span-8" style={{ border: "1px solid var(--border)" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Dataset creation pipeline
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {datasetPipeline.map((item, i) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                  step {item.step}
                </p>
                <h3 className="mt-2 text-lg font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="award-surface rounded-3xl p-5 sm:p-6 lg:col-span-4" style={{ border: "1px solid var(--border)" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Dataset summary
          </p>
          <dl className="mt-4 space-y-3">
            {datasetSummary.map((item) => (
              <div key={item.label} className="border-b pb-3" style={{ borderColor: "var(--border)" }}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-2xl border p-3" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
              Dataset access
            </p>
            {datasetAccess.isPublic && datasetAccess.publicUrl ? (
              <a
                href={datasetAccess.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ background: "var(--text-primary)", color: "var(--bg-base)" }}
              >
                open dataset
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                <Lock className="h-3.5 w-3.5" />
                private dataset
              </div>
            )}
            <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>
              {datasetAccess.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
