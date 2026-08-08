"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, TrendingUp, Users } from "lucide-react";
import { LinkedInMark, RedditMark } from "@/components/brand-logos";

const W = 250;

// mascot image box
const IMG_W = 150;
const IMG_H = Math.round((IMG_W * 339) / 512);
const IMG_LEFT = (W - IMG_W) / 2;
const IMG_TOP = 50;

// eye position as a fraction of the mascot image, sampled from the artwork
const EYE = { x: IMG_LEFT + IMG_W * 0.605, y: IMG_TOP + IMG_H * 0.487 };

const SOURCES = [
  { id: "linkedin", x: 22, y: 30, Icon: LinkedInMark },
  { id: "news", x: 76, y: 18, Icon: Newspaper },
  { id: "funding", x: 125, y: 15, Icon: TrendingUp },
  { id: "hiring", x: 174, y: 18, Icon: Users },
  { id: "reddit", x: 228, y: 30, Icon: RedditMark },
] as const;

const TINT_ACTIVE = "#1A3A3A";
const TINT_IDLE = "#7FAE9E";
const TINT_BG = "#EAF5F0";

const PER_SOURCE_MS = 650;
const COLLECT_END = SOURCES.length * PER_SOURCE_MS; // 3250
const ANALYZE_END = COLLECT_END + 1200; // 4450
const RANK_END = ANALYZE_END + 900; // 5350
const BEAM_END = RANK_END + 400; // 5750
const SCORE_END = BEAM_END + 1500; // 7250
const PAUSE_END = SCORE_END + 1000; // 8250
const CYCLE_MS = 9200;

type Phase = "collecting" | "analyzing" | "ranking" | "beaming" | "scoring" | "done";

export function MascotIntelligence() {
  const [activeSource, setActiveSource] = useState(0);
  const [particleKey, setParticleKey] = useState(0);
  const [phase, setPhase] = useState<Phase>("collecting");
  const [eyeFlash, setEyeFlash] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [wagKey, setWagKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      if (cancelled) return;
      setPhase("collecting");
      setActiveSource(0);

      SOURCES.forEach((_, i) => {
        timeouts.push(
          setTimeout(() => {
            if (cancelled) return;
            setActiveSource(i);
            setParticleKey((k) => k + 1);
          }, i * PER_SOURCE_MS)
        );
        // particle arrival -> mascot reacts
        timeouts.push(
          setTimeout(
            () => {
              if (cancelled) return;
              setEyeFlash((f) => f + 1);
              setPulseKey((p) => p + 1);
              setWagKey((w) => w + 1);
            },
            i * PER_SOURCE_MS + PER_SOURCE_MS * 0.75
          )
        );
      });

      timeouts.push(setTimeout(() => !cancelled && setPhase("analyzing"), COLLECT_END));
      timeouts.push(setTimeout(() => !cancelled && setPhase("ranking"), ANALYZE_END));
      timeouts.push(setTimeout(() => !cancelled && setPhase("beaming"), RANK_END));
      timeouts.push(setTimeout(() => !cancelled && setPhase("scoring"), BEAM_END));
      timeouts.push(setTimeout(() => !cancelled && setPhase("done"), PAUSE_END));
      timeouts.push(setTimeout(runCycle, CYCLE_MS));
    }

    runCycle();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const isCollecting = phase === "collecting";

  return (
    <div className="bg-white" style={{ width: W, maxWidth: W }}>
      <div className="relative" style={{ width: W, height: IMG_TOP + IMG_H + 6 }}>
        <svg width={W} height={IMG_TOP + IMG_H + 6} viewBox={`0 0 ${W} ${IMG_TOP + IMG_H + 6}`} className="absolute inset-0">
          {/* traveling particles */}
          <AnimatePresence>
            {isCollecting && (
              <motion.circle
                key={particleKey}
                r={2.2}
                fill="#22C55E"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  cx: [SOURCES[activeSource].x, EYE.x],
                  cy: [SOURCES[activeSource].y + 13, EYE.y],
                }}
                transition={{ duration: PER_SOURCE_MS / 1000, ease: "easeIn" }}
                style={{ filter: "drop-shadow(0 0 3px #22C55E)" }}
              />
            )}
          </AnimatePresence>

          {/* source nodes */}
          {SOURCES.map((s, i) => {
            const active = isCollecting && i === activeSource;
            const Icon = s.Icon;
            return (
              <g key={s.id}>
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={13}
                  fill={TINT_BG}
                  stroke={active ? TINT_ACTIVE : "#D8E9E2"}
                  strokeWidth={active ? 1.5 : 1}
                  animate={{ scale: active ? 1.15 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                />
                <foreignObject x={s.x - 8} y={s.y - 8} width={16} height={16}>
                  <Icon className="h-4 w-4" style={{ color: active ? TINT_ACTIVE : TINT_IDLE }} />
                </foreignObject>
              </g>
            );
          })}

          {/* radial pulse from the eye */}
          <AnimatePresence>
            <motion.circle
              key={pulseKey}
              cx={EYE.x}
              cy={EYE.y}
              r={6}
              fill="none"
              stroke="#A7F3D0"
              strokeWidth={1.5}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: `${EYE.x}px ${EYE.y}px` }}
            />
          </AnimatePresence>

          {/* eye glow flash overlay */}
          <motion.circle
            key={eyeFlash}
            cx={EYE.x}
            cy={EYE.y}
            r={7}
            fill="#BEF264"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ filter: "blur(3px)", mixBlendMode: "screen" }}
          />

          {/* beam to the score card */}
          <AnimatePresence>
            {(phase === "scoring" || phase === "done") && (
              <motion.line
                x1={EYE.x}
                y1={IMG_TOP + IMG_H - 6}
                x2={W / 2}
                y2={IMG_TOP + IMG_H + 4}
                stroke="#22C55E"
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 3px #22C55E)" }}
              />
            )}
          </AnimatePresence>
        </svg>

        {/* mascot: subtle float + tiny wag */}
        <motion.div
          key={wagKey}
          className="absolute"
          style={{ left: IMG_LEFT, top: IMG_TOP, width: IMG_W, height: IMG_H }}
          animate={{ y: [0, -3, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/cnvrted-logo.png"
            alt="Cnvrted"
            fill
            sizes="150px"
            priority
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
