"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Navbar }         from "@/app/components/Navbar";
import { Footer }         from "@/app/components/Footer";
import { Loader }         from "@/app/components/ui/Loader";
import { CustomCursor }   from "@/app/components/ui/CustomCursor";
import { Marquee }        from "@/app/components/ui/Marquee";

import { Hero }           from "@/app/components/sections/Hero";
import { Manifesto }      from "@/app/components/sections/Manifesto";
import { ProjectStory }   from "@/app/components/sections/ProjectStory";
import { Overview }       from "@/app/components/sections/Overview";
import { Modules }        from "@/app/components/sections/Modules";
import { CaYoloPipeline } from "@/app/components/sections/CaYoloPipeline";
import { Architecture }   from "@/app/components/sections/Architecture";
import { Metrics }        from "@/app/components/sections/Metrics";
import { BenchmarksReferences } from "@/app/components/sections/BenchmarksReferences";
import { TechStack }      from "@/app/components/sections/TechStack";
import { Team }           from "@/app/components/sections/Team";
import { Timeline }       from "@/app/components/sections/Timeline";
import { DemoOutputs }    from "@/app/components/sections/DemoOutputs";
import { FAQ }            from "@/app/components/sections/FAQ";
import { CTA }            from "@/app/components/sections/CTA";

export default function Home() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />

      <main className="relative" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        {/* Ambient background blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="blob-float absolute -top-32 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-600/20" />
          <div
            className="blob-float absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[90px] dark:bg-cyan-500/15"
            style={{ animationDelay: "-4s" }}
          />
          <div
            className="blob-float absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-400/10 blur-[90px] dark:bg-violet-600/15"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="grain grain-animated absolute inset-0 opacity-[0.22] dark:opacity-[0.18]"
            aria-hidden
          />
        </div>

        <Navbar dark={dark} onToggle={() => setDark((p) => !p)} progressRef={progressRef} />

        <Hero />

        {/* Marquee accent strip */}
        <Marquee
          italic
          duration={45}
          items={[
            "CA-YOLOv8",
            "No-ID detection",
            "InsightFace identification",
            "HOD / Principal alerts",
            "Face-based identification",
            "Campus vision pipeline",
          ]}
        />

        <Manifesto />

        <ProjectStory />

        <Overview />

        <Modules />

        {/* Light loud strip before the live pipeline */}
        <Marquee
          duration={32}
          invert
          items={[
            "▸ detection core",
            "10 stages",
            "With ID vs No ID",
            "InsightFace after violation",
            "auto-play",
          ]}
          separator="/"
        />

        <CaYoloPipeline />

        <Architecture />

        <Metrics />

        <BenchmarksReferences />

        <TechStack />

        {/* Marquee strip framing the team section */}
        <Marquee
          duration={42}
          italic
          items={[
            "Nithwin · model architect",
            "Dharun Raj · backend engineer",
            "Deepika · data &amp; research",
            "the people behind the system",
          ]}
          separator="✦"
        />

        <Team />

        <Timeline />

        <DemoOutputs />

        <FAQ />

        <CTA />

        <Footer />
      </main>
    </>
  );
}
