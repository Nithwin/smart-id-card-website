"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { CountUp }      from "@/app/components/ui/CountUp";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WordMark }     from "@/app/components/ui/WordMark";
import { TiltCard } from "@/app/components/ui/TiltCard";
import { metricBars, trainingCurve } from "@/app/data";

/* ─── Custom module breakdown ─────────────────────────────────────── */
const MODULES = [
  {
    tag: "CBAM",
    full: "Convolutional Block Attention Module",
    color: "var(--accent)",
    bg: "color-mix(in srgb, var(--accent) 10%, transparent)",
    border: "color-mix(in srgb, var(--accent) 30%, transparent)",
    what: "Channel attention + spatial attention applied after every C2f block in the backbone.",
    why: "Suppresses irrelevant background channels and focuses spatial weight on the ID card region.",
  },
  {
    tag: "Coord Attn",
    full: "Coordinate Attention",
    color: "var(--accent-3)",
    bg: "color-mix(in srgb, var(--accent-3) 10%, transparent)",
    border: "color-mix(in srgb, var(--accent-3) 30%, transparent)",
    what: "Decomposes the 2D attention map into two 1D pooling paths — one per axis (H and W).",
    why: "Preserves directional position information lost by standard global average pooling. Tells the model where horizontally and vertically the card sits.",
  },
  {
    tag: "P2 Head",
    full: "Micro-Detection Head (Stride 4)",
    color: "var(--accent-2)",
    bg: "color-mix(in srgb, var(--accent-2) 10%, transparent)",
    border: "color-mix(in srgb, var(--accent-2) 30%, transparent)",
    what: "An additional detection head operating at stride 4 (160 × 160 feature map), alongside the standard P3/P4/P5 heads.",
    why: "ID cards occupy only 16 × 16 pixels or fewer in wide-angle campus footage. Stride-4 gives the model 4× finer spatial resolution for small-object detection.",
  },
  {
    tag: "Wise-IoU",
    full: "Wise-IoU Dynamic Loss",
    color: "#a78bfa",
    bg: "color-mix(in srgb, #a78bfa 10%, transparent)",
    border: "color-mix(in srgb, #a78bfa 30%, transparent)",
    what: "Replaces CIoU with a non-monotonic focusing mechanism — high-quality anchors receive more gradient, low-quality ones are down-weighted dynamically.",
    why: "Improves mAP50-95 (tight box quality) by penalising imprecise regression more than imprecise classification. Key reason for 85.0% mAP50-95.",
  },
];

const HYPERPARAMS = [
  { k: "Base model",      v: "YOLOv8m"            },
  { k: "Parameters",      v: "25.84M"              },
  { k: "GFLOPs",          v: "78.7"                },
  { k: "Input size",      v: "640 × 640"           },
  { k: "Epochs",          v: "100"                 },
  { k: "Training time",   v: "3.936 h (Tesla T4)"  },
  { k: "Inference",       v: "11.2 ms / frame"     },
  { k: "Loss fn",         v: "Wise-IoU (dynamic)"  },
  { k: "Augmentation",    v: "Mosaic · MixUp · Copy-Paste" },
];

const DATASET = [
  { k: "Total images",     v: "~3 920 (est. 80/10/10)" },
  { k: "Val images",       v: "392"                    },
  { k: "Val instances",    v: "815"                    },
  { k: "Card instances",   v: "404 (val)"              },
  { k: "Person instances", v: "411 (val)"              },
  { k: "Annotation fmt",  v: "YOLO · cx cy w h norm"  },
  { k: "Classes",          v: "2 — person · card"      },
  { k: "Source",           v: "Campus corridor footage" },
];

/* Real results — 100-epoch CA-YOLOv8m, Tesla T4, 392-image val set */
const headlineMetrics = [
  { label: "mAP@50 all",        value: 98.6,  suffix: "%",   decimals: 1, accent: true  },
  { label: "mAP@50 person",     value: 99.1,  suffix: "%",   decimals: 1, accent: false },
  { label: "mAP@50 card",       value: 98.0,  suffix: "%",   decimals: 1, accent: false },
  { label: "Inference (T4)",    value: 11.2,  suffix: " ms", decimals: 1, accent: false },
];

export function Metrics() {
  return (
    <section id="metrics" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="05" label="Performance" className="mb-12" />

      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <RevealText
            as="h2"
            text="Measurably better. Every metric."
            split="word"
            stagger={0.04}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <p className="md:col-span-5 md:self-end text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          Detection accuracy on our held-out test set, gallery match rate against the enrolled
          face index, and operating speed on a CPU baseline — the numbers we keep ourselves honest with.
        </p>
      </div>

      {/* Headline counters */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4" style={{ background: "var(--border-strong)" }}>
        {headlineMetrics.map((m) => (
          <div
            key={m.label}
            className="flex min-h-[180px] flex-col justify-between p-6 sm:p-8"
            style={{
              background: m.accent ? "var(--accent)" : "var(--bg-raised)",
              color:      m.accent ? "#0a0a0a"      : "var(--text-primary)",
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
              ▸ {m.label}
            </p>
            <CountUp
              value={m.value}
              suffix={m.suffix}
              decimals={m.decimals}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-none tracking-tight"
            />
          </div>
        ))}
      </div>

      {/* Charts row — left: quality bars, right: SVG training curve */}
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Quality bars */}
        <div
          className="lg:col-span-5 rounded-3xl p-8"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
        >
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            ▸ Quality bars — real val results
          </p>
          <div className="space-y-5">
            {metricBars.map((bar) => (
              <div key={bar.name}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-medium font-mono" style={{ color: "var(--text-primary)" }}>
                    {bar.name}
                  </span>
                  <span className="font-mono text-sm tabular-nums" style={{ color: "var(--text-body)" }}>
                    {bar.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--border-strong)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.value}%` }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ background: `linear-gradient(90deg, ${bar.from}, ${bar.to})` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Model spec footer */}
          <div
            className="mt-8 rounded-2xl p-4 font-mono text-[10px] leading-relaxed"
            style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
          >
            <p>▸ CA-YOLOv8m · 25.84M params · 78.7 GFLOPs</p>
            <p>▸ Val: 392 images · 815 instances · 100 epochs</p>
            <p>▸ Hardware: Tesla T4 · 3.936 hrs training</p>
          </div>
        </div>

        {/* Training curve (SVG) */}
        <div
          className="lg:col-span-7 rounded-3xl p-8"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
        >
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            ▸ mAP@50 training curve
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            100 epochs · sampled at 1, 5, 10, 20, 30, 40, 50, 75, 100
          </p>
          <svg viewBox="0 0 440 200" className="mt-4 h-48 w-full">
            <defs>
              <linearGradient id="metricLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
              <linearGradient id="metricFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--accent-2)" stopOpacity="0.16" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="36" y1={28 + i * 38} x2="426" y2={28 + i * 38} stroke="var(--border)" strokeWidth="1" />
            ))}
            {["98.6", "90", "75", "60"].map((lbl, i) => (
              <text key={lbl} x="30" y={33 + i * 38} textAnchor="end" fontSize="8" fill="var(--text-muted)" fontFamily="monospace">{lbl}</text>
            ))}
            <polygon
              points={[
                ...trainingCurve.map((p, idx) => `${36 + idx * 49},${162 - (p - 60) * 4.15}`),
                `${36 + (trainingCurve.length - 1) * 49},162`,
                "36,162",
              ].join(" ")}
              fill="url(#metricFill)"
            />
            <polyline
              fill="none"
              stroke="url(#metricLine)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={trainingCurve.map((p, idx) => `${36 + idx * 49},${162 - (p - 60) * 4.15}`).join(" ")}
            />
            {trainingCurve.map((p, idx) => (
              <g key={`pt-${idx}`}>
                <circle cx={36 + idx * 49} cy={162 - (p - 60) * 4.15} r="3.5" fill="var(--text-primary)" />
                <text x={36 + idx * 49} y={178} textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="monospace">
                  {[1,5,10,20,30,40,50,75,100][idx]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* ── Custom module contributions ───────────────────── */}
      <ScrollReveal direction="lift" className="mt-10">
        <div
          className="rounded-3xl p-8"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
        >
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
            ▸ Why CA-YOLOv8 — module contributions
          </p>
          <p className="mb-8 text-xs" style={{ color: "var(--text-muted)" }}>
            Four custom additions on top of the YOLOv8m backbone — each solving a specific weakness for small ID-card detection.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {MODULES.map((m) => (
              <motion.div
                key={m.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
              <TiltCard
                maxTilt={7}
                className="flex flex-col gap-3 rounded-2xl p-5 h-full"
                style={{ background: m.bg, border: `1px solid ${m.border}` }}
                data-cursor={m.tag}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ background: m.color, color: "#0a0a0a" }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p className="text-[11px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {m.full}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>What:</strong> {m.what}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-body)" }}>
                  <strong style={{ color: m.color }}>Why:</strong> {m.why}
                </p>
              </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Training config + Dataset stats ───────────────── */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Hyperparameters */}
        <ScrollReveal direction="lift" delay={0.05}>
          <div
            className="h-full rounded-3xl p-8"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
              ▸ Training configuration
            </p>
            <dl className="space-y-3">
              {HYPERPARAMS.map(({ k, v }) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>{k}</dt>
                  <dd className="text-right font-mono text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>

        {/* Dataset stats */}
        <ScrollReveal direction="lift" delay={0.1}>
          <div
            className="h-full rounded-3xl p-8"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
              ▸ Dataset statistics
            </p>
            <dl className="space-y-3">
              {DATASET.map(({ k, v }) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>{k}</dt>
                  <dd className="text-right font-mono text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Annotated by <WordMark text="Deepika" /> — campus corridor footage across varied lighting, angles, and occlusion conditions. Augmented with Mosaic 4-image, MixUp, and Copy-Paste strategies to maximise small-object density.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Real chart images row */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          { src: "/charts/pr-curve.png",        label: "Precision-Recall Curve",   sub: "card 0.980 · person 0.991 · all 0.986 mAP@0.5" },
          { src: "/charts/f1-curve.png",         label: "F1-Confidence Curve",      sub: "all classes 0.97 at confidence 0.399" },
          { src: "/charts/training-results.png", label: "Training & Val Curves",    sub: "loss convergence + precision / recall / mAP over 100 epochs" },
        ].map((chart) => (
          <div
            key={chart.src}
            className="overflow-hidden rounded-3xl"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
          >
            <div className="relative aspect-[4/3] w-full bg-white">
              <Image
                src={chart.src}
                alt={chart.label}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
            <div className="px-5 py-4">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--text-primary)" }}>
                ▸ {chart.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {chart.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
