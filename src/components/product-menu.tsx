"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PRODUCT_GROUPS as GROUPS, type ProductFeature } from "@/lib/product-features";

function FeatureItem({
  feature,
  active,
  onToggle,
}: {
  feature: ProductFeature;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm text-body smooth-transition transition-colors hover:bg-surface-soft hover:text-ink"
      >
        {feature.title}
      </button>
      <AnimatePresence>
        {active && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden px-2 pb-1.5 text-xs leading-relaxed text-muted"
          >
            {feature.description}
          </motion.p>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ProductMenu() {
  const [open, setOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm text-muted smooth-transition transition-colors hover:text-ink"
      >
        Product
        <ChevronDown className={cn("h-3.5 w-3.5 smooth-transition transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            /* pt-3 (not mt-3) so the hoverable box is contiguous with the trigger button —
               a margin gap here is dead space that fires onMouseLeave before the cursor
               ever reaches the panel below. */
            className="absolute left-1/2 top-full z-50 w-[90vw] max-w-[560px] -translate-x-1/2 pt-3"
          >
            <div className="rounded-2xl border border-hairline bg-canvas p-5 shadow-soft">
              <div className="grid grid-cols-3 gap-5">
                {GROUPS.map((group) => {
                  const shipped = group.features.filter((f) => f.soon === false);
                  const soon = group.features.filter((f) => f.soon !== false);
                  return (
                    <div key={group.label}>
                      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-soft">
                        {group.label}
                      </p>
                      {shipped.length > 0 && (
                        <ul className="space-y-1">
                          {shipped.map((feature) => (
                            <FeatureItem
                              key={feature.title}
                              feature={feature}
                              active={activeFeature === feature.title}
                              onToggle={() =>
                                setActiveFeature((cur) => (cur === feature.title ? null : feature.title))
                              }
                            />
                          ))}
                        </ul>
                      )}
                      {soon.length > 0 && (
                        <>
                          <p
                            className={cn(
                              "mb-1.5 text-[11px] font-medium text-muted-soft",
                              shipped.length > 0 && "mt-3"
                            )}
                          >
                            Coming soon
                          </p>
                          <ul className="space-y-1">
                            {soon.map((feature) => (
                              <FeatureItem
                                key={feature.title}
                                feature={feature}
                                active={activeFeature === feature.title}
                                onToggle={() =>
                                  setActiveFeature((cur) => (cur === feature.title ? null : feature.title))
                                }
                              />
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
