"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SIGNALS = [
  "VP Sales viewed pricing",
  "Company announced funding",
  "Hiring 8 Account Executives",
  "CTO liked competitor content",
  "New integration launched",
  "Downloaded ROI calculator",
  'Mentioned "switching CRM"',
];

const VISIBLE_ROWS = 4;
const INTERVAL_MS = 2000;

interface FeedItem {
  key: number;
  text: string;
}

export function LiveSignalsWidget() {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    let i = 0;
    let key = 0;
    const id = setInterval(() => {
      const text = SIGNALS[i % SIGNALS.length];
      i += 1;
      key += 1;
      setItems((prev) => [{ key, text }, ...prev].slice(0, VISIBLE_ROWS));
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(15,23,42,0.10)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full max-w-[340px] cursor-pointer rounded-[18px] border bg-white p-[18px]"
      style={{ borderColor: "#ECECEC", boxShadow: "0 4px 16px rgba(15,23,42,0.05)", height: 180 }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
          Live signals
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-soft">Watching the internet&hellip;</p>

      <div className="relative mt-3 h-[70px] overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item, idx) => (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1 - idx * 0.18, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-1.5 py-1 text-[13px] text-body"
            >
              <span className="text-emerald-600">✓</span>
              <span className="truncate">{item.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-2">
        <p className="text-[11px] text-muted-soft">Scanning&hellip;</p>
        <div className="relative mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-surface-soft">
          <motion.div
            className="absolute inset-y-0 w-1/3 rounded-full bg-brand-teal/70"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
