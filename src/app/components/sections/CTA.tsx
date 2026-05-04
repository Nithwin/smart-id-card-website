"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { RevealText }     from "@/app/components/ui/RevealText";

export function CTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 pb-12 pt-28 sm:px-8">
      <div
        ref={ref}
        className="grain relative overflow-hidden rounded-[40px] px-6 py-20 text-center sm:px-12 sm:py-32"
        style={{
          background: "var(--accent)",
          color:      "#0a0a0a",
        }}
      >
        {/* Background scrolling word */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-10 select-none whitespace-nowrap font-display italic leading-none"
          style={{ x: wordX, fontSize: "clamp(8rem, 26vw, 24rem)", color: "rgba(0,0,0,0.06)" }}
        >
          smart-id · smart-id · smart-id
        </motion.div>

        <p className="relative mb-8 font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
          ▸ Talk to us
        </p>

        <RevealText
          as="h2"
          text="Want it on your campus?"
          split="word"
          stagger={0.06}
          className="relative font-display italic leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 9vw, 9rem)" }}
        />

        <p className="relative mx-auto mt-8 max-w-xl text-base leading-relaxed opacity-80">
          Tell us about your gates, your camera setup, and how alerts should reach the HOD or
          Principal. We&apos;ll share the model, the backend, and what it takes to run it cleanly.
        </p>

        <div className="relative mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="mailto:vmnithwin@gmail.com"
            style={{ background: "#0a0a0a", color: "var(--accent)" }}
          >
            Email the team
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="#overview"
            style={{ background: "transparent", color: "#0a0a0a", border: "1px solid #0a0a0a33" }}
          >
            Back to top
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
