"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText } from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import {
  detectionBenchmarks,
  faceBenchmarks,
  researchReferences,
} from "@/app/data";

type ViewMode = "detection" | "face";

export function BenchmarksReferences() {
  const [mode, setMode] = useState<ViewMode>("detection");

  const chartRows = useMemo(
    () => (mode === "detection" ? detectionBenchmarks : faceBenchmarks),
    [mode],
  );

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
          className="award-surface overflow-hidden rounded-3xl p-5 sm:p-7 xl:col-span-8"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              ▸ Model comparison tables
            </p>
            <div className="flex items-center gap-1 rounded-full p-1" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
              <button
                type="button"
                onClick={() => setMode("detection")}
                className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{
                  background: mode === "detection" ? "var(--text-primary)" : "transparent",
                  color: mode === "detection" ? "var(--bg-base)" : "var(--text-muted)",
                }}
              >
                Detection
              </button>
              <button
                type="button"
                onClick={() => setMode("face")}
                className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{
                  background: mode === "face" ? "var(--text-primary)" : "transparent",
                  color: mode === "face" ? "var(--bg-base)" : "var(--text-muted)",
                }}
              >
                Face ID
              </button>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                    Model
                  </th>
                  {mode === "detection" ? (
                    <>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Init</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Epochs</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Setup</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Params</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>mAP@50</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>mAP50-95</th>
                      <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>Latency</th>
                    </>
                  ) : (
                    <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                      Backbone
                    </th>
                  )}
                  <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {mode === "detection"
                  ? detectionBenchmarks.map((row, i) => (
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
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.init}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.epochs}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.setup}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.params}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.valMap50}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.valMap5095 ?? "—"}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.latency}</td>
                        <td className="px-3 py-3 text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>
                          {row.notes}
                          {row.status === "experiment" && (
                            <span
                              className="ml-2 inline-flex rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                              style={{ color: "var(--accent-2)", background: "color-mix(in srgb, var(--accent-2) 14%, transparent)" }}
                            >
                              experiment
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  : faceBenchmarks.map((row, i) => (
                      <motion.tr
                        key={row.model}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.03 }}
                        className="border-b"
                        style={{
                          borderColor: "var(--border)",
                          background: row.highlight
                            ? "color-mix(in srgb, var(--accent-3) 14%, transparent)"
                            : "transparent",
                        }}
                      >
                        <td className="px-3 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.model}</td>
                        <td className="px-3 py-3 font-mono text-[12px]" style={{ color: "var(--text-body)" }}>{row.backbone}</td>
                        <td className="px-3 py-3 text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>{row.notes}</td>
                      </motion.tr>
                    ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Scores in the chart below are project fit scores (0-100) balancing accuracy,
            small-object reliability, speed, and deployment practicality for this campus setup.
          </p>
        </div>

        <div
          className="award-surface rounded-3xl p-5 sm:p-7 xl:col-span-4"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            ▸ Animated fit chart
          </p>
          <div className="space-y-4">
            {chartRows.map((row) => {
              const performance =
                mode === "detection"
                  ? (row.smallObjectReadiness === null || row.deploymentFit === null
                      ? null
                      : (row.smallObjectReadiness + row.deploymentFit) / 2)
                  : (row.identificationFit + row.speedFit + row.edgeReadiness) / 3;
              return (
                <div key={row.model}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {row.model}
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {performance === null ? "pending" : Math.round(performance)}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                    {performance === null ? (
                      <div
                        className="h-full w-1/3 rounded-full"
                        style={{ background: "repeating-linear-gradient(90deg, var(--border-strong), var(--border-strong) 6px, transparent 6px, transparent 12px)" }}
                      />
                    ) : (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${performance}%` }}
                        viewport={{ amount: 0.4, once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: row.highlight
                            ? "linear-gradient(90deg, var(--accent), var(--accent-2))"
                            : "linear-gradient(90deg, var(--accent-3), var(--accent-2))",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
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
