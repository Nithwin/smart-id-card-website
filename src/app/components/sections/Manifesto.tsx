"use client";

import { motion } from "framer-motion";

import { ScrollWordFill } from "@/app/components/ui/ScrollWordFill";
import { ScrollReveal }   from "@/app/components/ui/ScrollReveal";
import { SectionLabel }   from "@/app/components/ui/SectionLabel";
import { Parallax }       from "@/app/components/ui/Parallax";
import { easeOutExpo }    from "@/app/lib/motion";

export function Manifesto() {
  return (
    <section className="relative mx-auto max-w-[1600px] overflow-hidden px-5 py-32 sm:px-8 sm:py-44">
      <SectionLabel number="00" label="Manifesto" className="mb-16" />

      {/* Decorative parallax accent number */}
      <Parallax speed={140} className="pointer-events-none absolute -right-8 top-0 select-none">
        <span
          className="font-display italic"
          style={{
            fontSize: "clamp(10rem, 30vw, 28rem)",
            color: "color-mix(in srgb, var(--text-muted) 12%, transparent)",
            lineHeight: 0.8,
          }}
        >
          /00
        </span>
      </Parallax>

      <ScrollWordFill
        as="h2"
        text="A camera is just glass and silicon — until you teach it to see."
        className="font-display italic leading-[1.05]"
        style={{
          fontSize: "clamp(2.2rem, 6.5vw, 6.5rem)",
          letterSpacing: "-0.02em",
        }}
      />

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <ScrollReveal direction="lift" className="md:col-start-4 md:col-span-7">
          <p
            className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6]"
            style={{ color: "var(--text-body)" }}
          >
            We rebuilt YOLOv8 into <em className="font-display italic">CA-YOLOv8</em> so the camera reliably sees
            people and whether an ID card is actually on them — then we close the loop: violation → capture →{" "}
            <em className="font-display italic">InsightFace</em> → alert to <em className="font-display italic">HOD / Principal</em>.
            There is no OCR on the card; identity comes from the face gallery. This is a working campus story,
            not a slide-deck fantasy.
          </p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
          >
            {["+CBAM", "+Coord-Attn", "+P2 Head", "+Wise-IoU"].map((chip) => (
              <motion.span
                key={chip}
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: easeOutExpo } },
                }}
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                className="inline-flex items-center rounded-full px-4 py-1.5 font-mono text-xs"
                style={{
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-primary)",
                  background: "var(--bg-raised)",
                }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
