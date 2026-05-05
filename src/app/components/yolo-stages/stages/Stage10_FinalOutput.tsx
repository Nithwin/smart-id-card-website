"use client";

import { motion } from "framer-motion";
import { FinalImageRender } from "./stage10/FinalImageRender";
import { VerdictBanner } from "./stage10/VerdictBanner";

interface Props { scenario: "detected" | "not_detected" }

export function Stage10_FinalOutput({ scenario }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative flex w-full max-w-5xl h-[240px] flex-col items-center justify-center overflow-hidden sm:h-[280px]">

        <FinalImageRender scenario={scenario} />
        <VerdictBanner scenario={scenario} />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className="mx-auto mb-1 block font-bold text-[color:var(--ca-neutral)]">Watch for:</strong>
        NMS keeps the strongest boxes, then rule logic routes either ID-OK or no-ID incident handling.
      </motion.div>
    </div>
  );
}
