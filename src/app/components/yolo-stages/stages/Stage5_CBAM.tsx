"use client";

import { motion } from "framer-motion";
import { CBAMPathLines } from "./stage5/CBAMPathLines";
import { CBAMStaticNodes } from "./stage5/CBAMStaticNodes";
import { CBAMLiveTensors } from "./stage5/CBAMLiveTensors";

interface Props { scenario: "detected" | "not_detected" }

export function Stage5_CBAM({ scenario }: Props) {
  const detected = scenario === "detected";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative w-full max-w-5xl h-[240px] sm:h-[280px]">

        {/* --- SCHEMATIC SVG PATHS --- */}
        <CBAMPathLines />

        {/* --- STATIC MACHINE NODES --- */}
        <CBAMStaticNodes scenario={scenario} />

        {/* --- LIVE TENSOR DATA BLOCKS --- */}
        <CBAMLiveTensors scenario={scenario} />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className={`mx-auto mb-1 block font-bold ${detected ? "text-[color:var(--ca-mark)]" : "text-[color:var(--ca-alert)]"}`}>
          {detected ? "CBAM is amplifying card-relevant channels and regions" : "CBAM finds no strong card signal to amplify"}
        </strong>
        {detected ? (
          <>Channel attention boosts useful feature maps, then spatial attention highlights where the card likely appears.</>
        ) : (
          <>Without a visible card, attention stays diffuse and the block behaves close to identity.</>
        )}
      </motion.div>
    </div>
  );
}
