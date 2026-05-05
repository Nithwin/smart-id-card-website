"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";

import { ScenarioToggle }            from "@/app/components/yolo-stages/ScenarioToggle";
import { TimelineBar }               from "@/app/components/yolo-stages/TimelineBar";
import { Stage1_InputPreprocessing } from "@/app/components/yolo-stages/stages/Stage1_InputPreprocessing";
import { Stage2_ConvFeatures }       from "@/app/components/yolo-stages/stages/Stage2_ConvFeatures";
import { Stage3_C2fBottleneck }      from "@/app/components/yolo-stages/stages/Stage3_C2fBottleneck";
import { Stage4_SPPF }               from "@/app/components/yolo-stages/stages/Stage4_SPPF";
import { Stage5_CBAM }               from "@/app/components/yolo-stages/stages/Stage5_CBAM";
import { Stage6_CoordAttention }     from "@/app/components/yolo-stages/stages/Stage6_CoordAttention";
import { Stage7_NeckFusion }         from "@/app/components/yolo-stages/stages/Stage7_NeckFusion";
import { Stage8_P2Head }             from "@/app/components/yolo-stages/stages/Stage8_P2Head";
import { Stage9_DecoupledHead }      from "@/app/components/yolo-stages/stages/Stage9_DecoupledHead";
import { Stage10_FinalOutput }       from "@/app/components/yolo-stages/stages/Stage10_FinalOutput";

/* ─── Constants ─────────────────────────────────────────── */
const TOTAL_STAGES = 10;
/** Tuned for readability on mobile + desktop */
const STAGE_DURATION_MS = 9000;
const CA_STAGES = new Set([4, 5, 7]);

const STAGE_TITLES = [
  "Input preprocessing",
  "Convolutional features",
  "C2f bottleneck",
  "SPPF pooling",
  "CBAM attention",
  "Coordinate attention",
  "PANet neck fusion",
  "P2 micro-head",
  "Decoupled head",
  "Final output",
];

const STAGE_BLURBS = [
  "Every frame is resized to 640x640 and split into R, G, B channels.",
  "3x3 filters slide across the frame to find edges, corners, and textures.",
  "Half the features skip deep layers so fine detail is not lost.",
  "Pooling grows context from 5x5 to 13x13 for multi-scale understanding.",
  "Channel attention selects what matters, spatial attention selects where.",
  "Directional pooling tracks horizontal and vertical card position precisely.",
  "Top-down semantics and bottom-up detail are fused in both directions.",
  "Stride-4 detection keeps tiny ID cards visible in dense scenes.",
  "Classification and box regression split into independent expert branches.",
  "NMS keeps best boxes, then rules route ID-OK or no-ID workflow.",
];

const STAGE_SIMPLE_EXPLANATIONS = [
  "We standardize each camera frame so the model gets clean, consistent input.",
  "The model scans the image and starts learning basic patterns like edges and shapes.",
  "Some features are preserved directly while others go deeper, then both are merged.",
  "The model checks both nearby detail and wider context at the same time.",
  "This layer learns what features matter most and where to focus.",
  "It improves position accuracy by learning horizontal and vertical cues separately.",
  "It combines detail and context from different scales before final detection.",
  "This extra head helps detect very small ID cards that are easy to miss.",
  "One branch predicts class type, the other branch predicts box location.",
  "The model keeps the best boxes and sends the final decision for routing.",
];

/* ─── Component ─────────────────────────────────────────── */
export function CaYoloPipeline() {
  const [currentStage, setCurrentStage] = useState(0);
  const [scenario, setScenario]         = useState<"detected" | "not_detected">("detected");
  const [isPlaying, setIsPlaying]       = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScenarioChange = useCallback((s: "detected" | "not_detected") => {
    setScenario(s);
    setCurrentStage(0);
  }, []);

  const advanceStage = useCallback(() => setCurrentStage((p) => (p + 1) % TOTAL_STAGES), []);

  useEffect(() => {
    if (!isPlaying) return;
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(advanceStage, STAGE_DURATION_MS);
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [currentStage, isPlaying, advanceStage]);

  const handleJump = (stage: number) => {
    setCurrentStage(stage);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => setIsPlaying((p) => !p);

  const renderStage = () => {
    switch (currentStage) {
      case 0: return <Stage1_InputPreprocessing scenario={scenario} />;
      case 1: return <Stage2_ConvFeatures scenario={scenario} />;
      case 2: return <Stage3_C2fBottleneck />;
      case 3: return <Stage4_SPPF />;
      case 4: return <Stage5_CBAM scenario={scenario} />;
      case 5: return <Stage6_CoordAttention scenario={scenario} />;
      case 6: return <Stage7_NeckFusion />;
      case 7: return <Stage8_P2Head scenario={scenario} />;
      case 8: return <Stage9_DecoupledHead />;
      case 9: return <Stage10_FinalOutput scenario={scenario} />;
      default: return null;
    }
  };

  return (
    <section id="ca-yolo" className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 sm:py-20">
      <SectionLabel number="03" label="CA-YOLO Pipeline" className="mb-8" />

      <div className="mb-8 grid gap-8 md:grid-cols-12">
        <RevealText
          as="h2"
          text="The CA-YOLOv8 deep pipeline."
          split="word"
          stagger={0.05}
          className="md:col-span-7 text-[clamp(2rem,5.3vw,5rem)] font-display italic leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        />
        <ScrollReveal direction="lift" className="md:col-span-5 md:self-end">
          <p className="max-w-xl text-[0.98rem] leading-relaxed sm:text-base" style={{ color: "var(--text-body)" }}>
            This block is the <em className="font-display italic">detection core</em> only — how CA-YOLO
            decides person + card boxes before any InsightFace or HOD / Principal step. Ten stages,
            inline visualisers, scrubbable timeline.
          </p>
        </ScrollReveal>
      </div>

      {/* Pipeline shell — theme-aware */}
      <div className="yolo-shell flex flex-col items-center gap-2 rounded-3xl p-2.5 sm:gap-4 sm:p-4 md:p-5">
        {/* Controls row — only scenario toggle now */}
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--text-muted)" }}
            >
              ▸ Scenario
            </span>
            <ScenarioToggle scenario={scenario} onChange={handleScenarioChange} />
          </div>
          <div
            className="w-full text-right font-mono text-[11px] uppercase tracking-[0.22em] sm:w-auto"
            style={{ color: "var(--text-muted)" }}
          >
            stage {String(currentStage + 1).padStart(2, "0")} / {TOTAL_STAGES}
          </div>
        </div>

        {/* Stage label */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-muted)" }}
          >
            stage {currentStage + 1} / {TOTAL_STAGES}
          </span>
          {CA_STAGES.has(currentStage) && (
            <span
              className="mt-1 inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                color: "var(--ca-mark)",
                border: "1px solid color-mix(in srgb, var(--ca-mark) 55%, transparent)",
                background: "color-mix(in srgb, var(--ca-mark) 14%, transparent)",
              }}
            >
              ★ CA-YOLOv8 addition
            </span>
          )}
          <h3
            className="mt-1 text-center text-[1.35rem] font-medium tracking-tight sm:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            {STAGE_TITLES[currentStage]}
          </h3>
          <p
            className="mt-1 max-w-[52ch] px-2 text-center text-[0.83rem] sm:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {STAGE_BLURBS[currentStage]}
          </p>
          <p
            className="mx-auto mt-3 max-w-[64ch] rounded-xl px-3 py-2 text-center text-[0.8rem] sm:text-[0.86rem]"
            style={{
              color: "var(--text-body)",
              background: "color-mix(in srgb, var(--bg-subtle) 82%, transparent)",
              border: "1px solid var(--border)",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
              Simple explanation:
            </span>{" "}
            {STAGE_SIMPLE_EXPLANATIONS[currentStage]}
          </p>
        </motion.div>

        {/* Main visualization panel — theme-aware canvas */}
        <div className="yolo-canvas relative flex min-h-[300px] w-full flex-col sm:min-h-[420px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, scale: 0.97, x: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, x: -28, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-1 items-center justify-center px-0.5 pb-1.5 sm:px-2 sm:pb-2"
            >
              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline / playback controls */}
        <TimelineBar
          currentStage={currentStage}
          onJump={handleJump}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      </div>
    </section>
  );
}
