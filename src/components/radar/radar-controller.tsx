"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { RadarGrid } from "./radar-grid";
import { RadarSweep } from "./radar-sweep";
import { RadarLead } from "./radar-lead";
import { LeadCard } from "./lead-card";
import { Connector } from "./connector";
import {
  RADAR_LEADS,
  RADAR_ROW_ORDER,
  SWEEP_DURATION_MS,
  CYCLE_DURATION_MS,
  POST_DETECTION_PAUSE_MS,
} from "./radar-data";

const RADAR_SIZE = 420;

export function RadarController() {
  const [detectedIds, setDetectedIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const leadRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [points, setPoints] = useState<
    Record<string, { x1: number; y1: number; x2: number; y2: number }>
  >({});

  const measure = useCallback(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    const next: typeof points = {};
    for (const lead of RADAR_LEADS) {
      const leadEl = leadRefs.current[lead.id];
      const rowEl = rowRefs.current[lead.id];
      if (!leadEl || !rowEl) continue;
      const leadRect = leadEl.getBoundingClientRect();
      const rowRect = rowEl.getBoundingClientRect();
      const cx = leadRect.left + leadRect.width / 2 - containerRect.left;
      const cy = leadRect.top + leadRect.height / 2 - containerRect.top;
      const x2 = rowRect.left - containerRect.left;
      const y2 = rowRect.top + rowRect.height / 2 - containerRect.top;

      // Push the start point out to the edge of the avatar circle, toward the card.
      const avatarRadius = leadRect.width / 2 + 4;
      const dx = x2 - cx;
      const dy = y2 - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const x1 = cx + (dx / dist) * avatarRadius;
      const y1 = cy + (dy / dist) * avatarRadius;

      next[lead.id] = { x1, y1, x2, y2 };
    }
    setPoints(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      if (cancelled) return;
      setDetectedIds([]);

      RADAR_LEADS.forEach((lead) => {
        const delay = (lead.angle / 360) * SWEEP_DURATION_MS;
        timeouts.push(
          setTimeout(() => {
            if (!cancelled) setDetectedIds((prev) => [...prev, lead.id]);
          }, delay)
        );
      });

      const lastAngle = RADAR_LEADS[RADAR_LEADS.length - 1].angle;
      const lastDelay = (lastAngle / 360) * SWEEP_DURATION_MS;
      const clearDelay = lastDelay + 1500 + POST_DETECTION_PAUSE_MS;

      timeouts.push(
        setTimeout(() => {
          if (!cancelled) setDetectedIds([]);
        }, clearDelay)
      );

      timeouts.push(setTimeout(runCycle, CYCLE_DURATION_MS));
    }

    runCycle();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    measure();
  }, [detectedIds, measure]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6"
    >
      <div
        className="relative shrink-0"
        style={{ width: RADAR_SIZE, height: RADAR_SIZE }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 30px 80px rgba(23,89,255,0.35)" }}
        />
        <RadarGrid size={RADAR_SIZE} />
        <RadarSweep />
        {RADAR_LEADS.map((lead) => (
          <RadarLead
            key={lead.id}
            lead={lead}
            active={detectedIds.includes(lead.id)}
            leadRef={(el) => {
              leadRefs.current[lead.id] = el;
            }}
          />
        ))}
      </div>

      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
        <AnimatePresence>
          {RADAR_LEADS.filter((l) => detectedIds.includes(l.id) && points[l.id]).map((lead) => (
            <Connector key={lead.id} id={lead.id} {...points[lead.id]} />
          ))}
        </AnimatePresence>
      </svg>

      <div className="flex w-full max-w-xl flex-col gap-5">
        {RADAR_ROW_ORDER.map((lead) => (
          <div
            key={lead.id}
            ref={(el) => {
              rowRefs.current[lead.id] = el;
            }}
            style={{ minHeight: 80 }}
            className="flex items-center"
          >
            <AnimatePresence>
              {detectedIds.includes(lead.id) && (
                <div className="w-full">
                  <LeadCard lead={lead} />
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
