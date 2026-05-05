"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import {
  primaryComparison,
  faceModelChoice,
  researchReferences,
} from "@/app/data";

export function BenchmarksReferences() {
  return (
    <section id="benchmarks" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="06" label="Benchmarks & References" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="Side-by-side comparisons, with sources."
            split="word"
            stagger={0.04}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
            This block shows where the final stack stands: standard YOLO variants versus
            CA-YOLO, and face-model options versus the InsightFace pipeline used in the
            final system.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-12">
        <div
          className="award-surface overflow-hidden rounded-3xl p-5 sm:p-7 xl:col-span-7"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Before vs after CA-YOLO
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                    Model
                  </th>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>mAP@50</th>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>mAP50-95</th>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Latency</th>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Tiny-card recall</th>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                    Why it matters
                  </th>
                </tr>
              </thead>
              <tbody>
                {primaryComparison.map((row, i) => (
                  <motion.tr
                    key={row.model}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      background: row.highlight
                        ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                        : "transparent",
                    }}
                  >
                    <td className="px-3 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.model}</td>
                    <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.map50}</td>
                    <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.map5095}</td>
                    <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.latency}</td>
                    <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.tinyRecall}</td>
                    <td className="px-3 py-3 text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            This is the primary detector comparison used in viva: baseline YOLOv8m versus CA-YOLOv8m.
          </p>
        </div>

        <div
          className="award-surface rounded-3xl p-5 sm:p-7 xl:col-span-5"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Why InsightFace?
          </p>
          <h3 className="mt-2 text-xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
            Face model comparison
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
            We compared common alternatives and selected InsightFace because it gives the best
            identity quality-to-speed balance for this campus pipeline.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="px-2 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Model</th>
                  <th className="px-2 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Strength</th>
                  <th className="px-2 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Weakness</th>
                  <th className="px-2 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Decision</th>
                </tr>
              </thead>
              <tbody>
                {faceModelChoice.map((row) => (
                  <tr
                    key={row.model}
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      background: row.highlight ? "color-mix(in srgb, var(--accent-3) 12%, transparent)" : "transparent",
                    }}
                  >
                    <td className="px-2 py-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.model}</td>
                    <td className="px-2 py-2 text-xs" style={{ color: "var(--text-body)" }}>{row.strength}</td>
                    <td className="px-2 py-2 text-xs" style={{ color: "var(--text-body)" }}>{row.weakness}</td>
                    <td className="px-2 py-2 text-xs font-medium" style={{ color: row.highlight ? "var(--accent-2)" : "var(--text-body)" }}>{row.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="award-surface mt-6 rounded-3xl p-5 sm:p-7"
        style={{ border: "1px solid var(--border)" }}
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
          ▸ References used in this project
        </p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {researchReferences.map((ref, i) => (
            <motion.a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group rounded-2xl p-4"
              style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                  {ref.venue} · {ref.year}
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-2 text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                {ref.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>
                {ref.usedFor}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
