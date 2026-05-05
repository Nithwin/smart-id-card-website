"use client";

import { motion } from "framer-motion";
import { SPPFPathLines } from "./stage4/SPPFPathLines";
import { SPPFStaticNodes } from "./stage4/SPPFStaticNodes";
import { SPPFLiveTensors } from "./stage4/SPPFLiveTensors";

export function Stage4_SPPF() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative w-full max-w-5xl h-[240px] sm:h-[280px]">

        {/* --- SCHEMATIC SVG PATHS --- */}
        <SPPFPathLines />

        {/* --- STATIC MACHINE NODES --- */}
        <SPPFStaticNodes />

        {/* --- LIVE TENSOR DATA BLOCKS --- */}
        <SPPFLiveTensors />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className="mx-auto mb-1 block font-bold text-[color:var(--ca-neutral)]">Watch for:</strong>
        Three pooling windows expand context from local texture to full-scene awareness before fusion.
      </motion.div>
    </div>
  );
}
