"use client";

import { motion } from "framer-motion";
import { P2Stack } from "./stage8/P2Stack";

interface Props { scenario: "detected" | "not_detected" }

export function Stage8_P2Head({ scenario }: Props) {
  const detected = scenario === "detected";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative flex w-full max-w-5xl h-[240px] items-center justify-center overflow-hidden perspective-[1200px] sm:h-[280px]">

        <P2Stack scenario={scenario} />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className={`mx-auto mb-1 block font-bold ${detected ? "text-[color:var(--ca-mark)]" : "text-[color:var(--ca-alert)]"}`}>
          {detected ? "P2 head keeps tiny-card structure visible" : "High-resolution P2 map scans for tiny cards"}
        </strong>
        Standard heads can lose sub-10-pixel cards. The P2 head preserves denser features so tiny cards remain detectable.
      </motion.div>
    </div>
  );
}
